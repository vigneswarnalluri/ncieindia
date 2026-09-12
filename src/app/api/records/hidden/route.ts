import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const HIDDEN_STORE_PATH = path.join(process.cwd(), "src", "data", "hidden_records.json");

interface HiddenStoreData {
  hiddenIds: string[];
  updatedAt: string;
  lastModifiedBy?: string;
}

function readHiddenStore(): HiddenStoreData {
  try {
    if (fs.existsSync(HIDDEN_STORE_PATH)) {
      const content = fs.readFileSync(HIDDEN_STORE_PATH, "utf8");
      const parsed = JSON.parse(content);
      if (parsed && Array.isArray(parsed.hiddenIds)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("[HIDDEN_STORE] Failed to read hidden records file:", err);
  }
  return { hiddenIds: [], updatedAt: new Date().toISOString() };
}

function writeHiddenStore(data: HiddenStoreData): boolean {
  try {
    const dir = path.dirname(HIDDEN_STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(HIDDEN_STORE_PATH, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("[HIDDEN_STORE] Failed to write hidden records file:", err);
    return false;
  }
}

export async function GET() {
  try {
    const data = readHiddenStore();
    return NextResponse.json({
      success: true,
      hiddenIds: data.hiddenIds,
      updatedAt: data.updatedAt,
      lastModifiedBy: data.lastModifiedBy,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to fetch hidden records" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, userEmail } = body as {
      action: "hide" | "unhide" | "toggle" | "batch_hide" | "batch_unhide" | "set";
      regIds?: string[];
      regId?: string;
      userEmail?: string;
    };

    const targetIds: string[] = Array.isArray(body.regIds)
      ? body.regIds
      : body.regId
      ? [body.regId]
      : [];

    if (!action || (action !== "set" && targetIds.length === 0)) {
      return NextResponse.json(
        { success: false, error: "Invalid payload: action and at least one target registration ID are required" },
        { status: 400 }
      );
    }

    const currentData = readHiddenStore();
    let hiddenSet = new Set<string>(currentData.hiddenIds);

    if (action === "hide" || action === "batch_hide") {
      targetIds.forEach((id) => {
        if (id) hiddenSet.add(String(id).trim());
      });
    } else if (action === "unhide" || action === "batch_unhide") {
      targetIds.forEach((id) => {
        if (id) hiddenSet.delete(String(id).trim());
      });
    } else if (action === "toggle") {
      targetIds.forEach((id) => {
        const cleanId = String(id).trim();
        if (cleanId) {
          if (hiddenSet.has(cleanId)) {
            hiddenSet.delete(cleanId);
          } else {
            hiddenSet.add(cleanId);
          }
        }
      });
    } else if (action === "set") {
      hiddenSet = new Set(targetIds.map((id) => String(id).trim()).filter(Boolean));
    }

    const updatedData: HiddenStoreData = {
      hiddenIds: Array.from(hiddenSet),
      updatedAt: new Date().toISOString(),
      lastModifiedBy: userEmail || "vigneswarnalluri10@gmail.com",
    };

    const saved = writeHiddenStore(updatedData);
    if (!saved) {
      return NextResponse.json(
        { success: false, error: "Failed to persist hidden records to server storage" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      hiddenIds: updatedData.hiddenIds,
      updatedAt: updatedData.updatedAt,
      lastModifiedBy: updatedData.lastModifiedBy,
      count: updatedData.hiddenIds.length,
    });
  } catch (err: any) {
    console.error("[HIDDEN_STORE] Error in POST /api/records/hidden:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
