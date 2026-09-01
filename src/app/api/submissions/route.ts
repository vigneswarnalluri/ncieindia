import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const MAILBOX_STORE_PATH = path.join(process.cwd(), "src", "data", "mailbox_store.json");

interface SubmissionPayload {
  type: "collaboration_proposal" | "startup_idea" | "student_grievance";
  data: Record<string, any>;
  docketNumber: string;
}

function getStoredMails(): any[] {
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

function saveStoredMails(mails: any[]): void {
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

export async function POST(req: NextRequest) {
  try {
    const body: SubmissionPayload = await req.json();
    const { type, data, docketNumber } = body;

    if (!type || !data) {
      return NextResponse.json({ success: false, error: "Invalid submission payload" }, { status: 400 });
    }

    const currentDate = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    let subject = "";
    let sender = "";
    let senderEmail = "";
    let formattedBody = "";
    let category = "General";

    if (type === "collaboration_proposal") {
      subject = `[NEW PROPOSAL] ${data.orgName || "Institution"} - ${data.collaborationArea || "MoU Collaboration"}`;
      sender = data.repName || "Institutional Representative";
      senderEmail = data.email || "partner@institution.ac.in";
      category = "Institutional Collaborations";
      formattedBody = `
<strong>OFFICIAL INSTITUTIONAL COLLABORATION PROPOSAL</strong><br/>
<strong>Docket Reference:</strong> ${docketNumber}<br/>
<strong>Organization / Institution:</strong> ${data.orgName || "N/A"}<br/>
<strong>Category:</strong> ${data.orgType || "Educational Institution"}<br/>
<strong>Focus Area:</strong> ${data.collaborationArea || "General"}<br/>
<strong>Nodal Representative:</strong> ${data.repName || "N/A"} (${data.designation || "Representative"})<br/>
<strong>Email:</strong> ${data.email || "N/A"} | <strong>Phone:</strong> ${data.phone || "N/A"}<br/><br/>
<strong>Proposal Summary:</strong><br/>
${data.details || "No additional details provided."}
      `.trim();
    } else if (type === "startup_idea") {
      subject = `[STARTUP IDEA] ${data.startupTitle || "Collegiate Project"} (${data.sector || "Innovation"})`;
      sender = data.founderName || "Founder";
      senderEmail = data.email || "founder@college.edu";
      category = "Startup Applications";
      formattedBody = `
<strong>COLLEGIATE STARTUP / INNOVATION PROPOSAL</strong><br/>
<strong>Docket Reference:</strong> ${docketNumber}<br/>
<strong>Founder Name:</strong> ${data.founderName || "N/A"}<br/>
<strong>Institution:</strong> ${data.institution || "N/A"}<br/>
<strong>Contact:</strong> ${data.email || "N/A"} | ${data.phone || "N/A"}<br/>
<strong>Project Title:</strong> ${data.startupTitle || "N/A"}<br/>
<strong>Sector:</strong> ${data.sector || "Information Technology"}<br/><br/>
<strong>Problem Statement:</strong><br/>
${data.problemStatement || "N/A"}<br/><br/>
<strong>Proposed Solution & Novelty:</strong><br/>
${data.proposedSolution || "N/A"}
      `.trim();
    } else if (type === "student_grievance") {
      subject = `[STUDENT GRIEVANCE] ${data.nature || "Grievance"} - ${docketNumber}`;
      sender = data.name || "Student Applicant";
      senderEmail = data.email || "student@institution.edu";
      category = "Student Affairs & Grievances";
      formattedBody = `
<strong>STUDENT GRIEVANCE & SUPPORT DOCKET</strong><br/>
<strong>Docket Reference:</strong> ${docketNumber}<br/>
<strong>Student Name:</strong> ${data.name || "N/A"}<br/>
<strong>Enrollment / App ID:</strong> ${data.enrollmentNo || "N/A"}<br/>
<strong>Institution:</strong> ${data.institution || "N/A"}<br/>
<strong>Contact:</strong> ${data.email || "N/A"} | ${data.phone || "N/A"}<br/>
<strong>Nature of Grievance:</strong> ${data.nature || "General Assistance"}<br/><br/>
<strong>Description:</strong><br/>
${data.description || "N/A"}
      `.trim();
    } else if (type === "contact_inquiry") {
      const deskName = data.desk ? data.desk.toUpperCase() : "GENERAL";
      subject = `[INQUIRY - ${deskName}] ${data.name || "Citizen/Student"} (${data.org || "Individual"})`;
      sender = data.name || "Inquirer";
      senderEmail = data.email || "inquiry@ncieindia.org";
      category = `Public Desk Inquiry (${deskName})`;
      formattedBody = `
<strong>OFFICIAL INQUIRY DESK SUBMISSION</strong><br/>
<strong>Docket Reference:</strong> ${docketNumber}<br/>
<strong>Inquiry Desk:</strong> ${deskName} DESK<br/>
<strong>Name:</strong> ${data.name || "N/A"}<br/>
<strong>Institution / Organization:</strong> ${data.org || "N/A"}<br/>
<strong>Email:</strong> ${data.email || "N/A"} | <strong>Phone:</strong> ${data.phone || "N/A"}<br/><br/>
<strong>Message Particulars:</strong><br/>
${data.message || "N/A"}
      `.trim();
    }

    // Push into Mailbox Store so it shows in Official Portal Inbox
    const mails = getStoredMails();
    const newMail = {
      id: `SUB-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      sender: sender,
      senderEmail: senderEmail,
      senderRole: type.replace(/_/g, " ").toUpperCase(),
      senderAvatarBg: "#0D6B4F",
      recipient: "National Council Directorate",
      recipientEmail: "office@ncieindia.org",
      subject: subject,
      snippet: subject,
      body: formattedBody,
      category: category,
      date: currentDate,
      fullDate: new Date().toISOString(),
      read: false,
      starred: false,
      important: true,
      folder: "inbox",
      refNumber: docketNumber,
      institutionName: data.orgName || data.institution || "Collegiate Applicant",
      createdAt: new Date().toISOString(),
    };

    mails.unshift(newMail);
    saveStoredMails(mails);

    console.log(`[SUBMISSION STORED] Type: ${type}, Docket: ${docketNumber}, Subject: ${subject}`);

    return NextResponse.json({
      success: true,
      docketNumber,
      timestamp: new Date().toISOString(),
      message: "Submission successfully logged in official council repository.",
    });
  } catch (err: any) {
    console.error("Error in POST /api/submissions:", err);
    return NextResponse.json({ success: false, error: err.message || "Failed to process submission" }, { status: 500 });
  }
}
