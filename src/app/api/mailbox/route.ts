import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const MAILBOX_STORE_PATH = path.join(process.cwd(), "src", "data", "mailbox_store.json");

export interface StoredMail {
  id: string;
  sender: string;
  senderEmail: string;
  senderRole?: string;
  senderAvatarBg?: string;
  recipient: string;
  recipientEmail?: string;
  subject: string;
  snippet?: string;
  body: string;
  category: string;
  date: string;
  fullDate?: string;
  read: boolean;
  starred: boolean;
  important?: boolean;
  folder: "inbox" | "sent" | "starred" | "drafts" | "trash";
  refNumber?: string;
  institutionName?: string;
  aisheCode?: string;
  attachments?: { name: string; size: string; type?: string; dataUrl?: string }[];
  createdAt?: string;
}

function getStoredMails(): StoredMail[] {
  try {
    if (fs.existsSync(MAILBOX_STORE_PATH)) {
      const data = fs.readFileSync(MAILBOX_STORE_PATH, "utf8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Failed to read server mailbox store:", err);
  }
  return [];
}

function saveStoredMails(mails: StoredMail[]): void {
  try {
    const dir = path.dirname(MAILBOX_STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(MAILBOX_STORE_PATH, JSON.stringify(mails, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to write server mailbox store:", err);
  }
}

export async function GET(req: NextRequest) {
  try {
    const mails = getStoredMails();
    return NextResponse.json({ success: true, mails });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, mails: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mail } = body;
    if (!mail || !mail.subject) {
      return NextResponse.json({ success: false, error: "Invalid mail payload" }, { status: 400 });
    }

    const mails = getStoredMails();
    // Check if mail already exists
    const existingIndex = mails.findIndex((m) => m.id === mail.id);
    if (existingIndex >= 0) {
      mails[existingIndex] = { ...mails[existingIndex], ...mail };
    } else {
      mails.unshift({
        ...mail,
        createdAt: mail.createdAt || new Date().toISOString(),
      });
    }

    saveStoredMails(mails);
    return NextResponse.json({ success: true, mails });
  } catch (err: any) {
    console.error("Error in POST /api/mailbox:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, updates, ids } = body;

    const mails = getStoredMails();
    let updated = false;

    if (Array.isArray(ids) && updates) {
      for (let i = 0; i < mails.length; i++) {
        if (ids.includes(mails[i].id)) {
          mails[i] = { ...mails[i], ...updates };
          updated = true;
        }
      }
    } else if (id && updates) {
      const idx = mails.findIndex((m) => m.id === id);
      if (idx >= 0) {
        mails[idx] = { ...mails[idx], ...updates };
        updated = true;
      }
    }

    if (updated) {
      saveStoredMails(mails);
    }
    return NextResponse.json({ success: true, mails });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });
    }

    let mails = getStoredMails();
    mails = mails.filter((m) => m.id !== id);
    saveStoredMails(mails);

    return NextResponse.json({ success: true, mails });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
