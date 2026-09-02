import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const REGISTRY_PATH = path.join(process.cwd(), "src", "data", "student_registry.json");

function getRegistry(): any[] {
  try {
    if (fs.existsSync(REGISTRY_PATH)) {
      const data = fs.readFileSync(REGISTRY_PATH, "utf8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Error reading student_registry.json:", err);
  }
  return [];
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = (searchParams.get("query") || "").trim().toLowerCase();
    const type = searchParams.get("type") || "certificate"; // "certificate" or "application"

    if (!query) {
      return NextResponse.json({ success: false, error: "Search query is required." }, { status: 400 });
    }

    const registry = getRegistry();

    if (type === "certificate") {
      const match = registry.find(
        (r) =>
          r.type === "certificate" &&
          (r.certId.toLowerCase() === query ||
            r.certId.toLowerCase().includes(query) ||
            r.studentName.toLowerCase().includes(query))
      );

      if (match) {
        return NextResponse.json({
          success: true,
          found: true,
          data: match,
        });
      } else {
        return NextResponse.json({
          success: true,
          found: false,
          message: "Certificate record not found in official NCIE National Registry.",
          searchedQuery: query,
        });
      }
    } else {
      // Application status search
      const match = registry.find(
        (r) =>
          r.type === "application" &&
          (r.appId.toLowerCase() === query ||
            r.appId.toLowerCase().includes(query) ||
            r.studentName.toLowerCase().includes(query) ||
            (r.phone && r.phone.includes(query)) ||
            (r.email && r.email.toLowerCase() === query))
      );

      if (match) {
        return NextResponse.json({
          success: true,
          found: true,
          data: match,
        });
      } else {
        return NextResponse.json({
          success: true,
          found: false,
          message: "Application reference not found. Please check your Application ID.",
          searchedQuery: query,
        });
      }
    }
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
