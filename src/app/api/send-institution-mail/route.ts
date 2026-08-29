import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import dns from "dns";

// Ensure IPv4 first DNS lookup to prevent timeouts on SMTP
try {
  if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder("ipv4first");
  }
} catch (e) {}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      recipientEmail,
      recipientName,
      institutionName,
      aisheCode,
      subject,
      message,
      templateType = "general",
      senderRole = "Nodal Officer",
    } = body;

    if (!recipientEmail || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields: recipientEmail, subject, and message are required." },
        { status: 400 }
      );
    }

    // Internal Portal Mailbox mode: Do not send external Hostinger emails when using the portal mailbox
    if (process.env.ENABLE_EXTERNAL_SMTP !== "true") {
      console.log(`[PORTAL MAILBOX] Dispatch logged for ${recipientEmail}. External Hostinger SMTP skipped.`);
      return NextResponse.json({
        success: true,
        emailSent: false,
        internalRouted: true,
        messageId: `PORTAL-MAIL-${Date.now()}`,
        recipient: recipientEmail,
        note: "Dispatched within internal portal mailbox network.",
      });
    }

    // Configure SMTP transporter
    const smtpHost = process.env.SMTP_HOST || "smtp.hostinger.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpUser = process.env.SMTP_USER || "info@ncieindia.org";
    const smtpPass = process.env.SMTP_PASS || "Ncie@2026";
    const smtpFrom = process.env.SMTP_FROM || `"National Council for Innovation & Entrepreneurship (NCIE)" <info@ncieindia.org>`;

    if (!smtpUser || !smtpPass) {
      return NextResponse.json({
        success: true,
        emailSent: false,
        error: "SMTP credentials not configured on server.",
      });
    }

    const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 45000,
    });

    const currentDate = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // Format paragraphs from plain message
    const formattedParagraphs = message
      .split("\n\n")
      .filter((p: string) => p.trim().length > 0)
      .map((p: string) => `<p style="margin: 0 0 14px 0; line-height: 1.65;">${p.replace(/\n/g, "<br/>")}</p>`)
      .join("");

    // HTML Email Template
    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 0; color: #1e293b; }
    .container { max-width: 640px; margin: 24px auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #cbd5e1; box-shadow: 0 4px 10px rgba(0,0,0,0.06); }
    .header { background: #0D6B4F; color: #ffffff; padding: 26px 24px; text-align: center; border-bottom: 4px solid #C9A24B; }
    .header h1 { margin: 0; font-size: 18px; letter-spacing: 0.5px; font-weight: 800; text-transform: uppercase; }
    .header p { margin: 5px 0 0; font-size: 11px; color: #e2e8f0; letter-spacing: 0.5px; }
    .content { padding: 30px 26px; font-size: 13.5px; line-height: 1.6; color: #334155; }
    .salutation { font-size: 15px; font-weight: 700; color: #0f172a; margin-bottom: 16px; }
    .meta-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px 16px; margin: 18px 0; font-size: 12.5px; }
    .meta-box table { width: 100%; border-collapse: collapse; }
    .meta-box td { padding: 4px 6px; }
    .meta-box td.label { color: #64748b; font-weight: 600; width: 35%; text-transform: uppercase; font-size: 10.5px; }
    .meta-box td.val { color: #0f172a; font-weight: 700; }
    .message-body { background: #ffffff; margin: 16px 0; color: #1e293b; }
    .badge { display: inline-block; background-color: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; padding: 3px 8px; border-radius: 4px; font-weight: 700; font-size: 11px; }
    .sign-off { margin-top: 26px; padding-top: 18px; border-top: 1px solid #e2e8f0; }
    .footer { background: #0f172a; color: #94a3b8; padding: 22px; text-align: center; font-size: 11px; line-height: 1.5; }
    .footer a { color: #38bdf8; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>National Council for Innovation & Entrepreneurship</h1>
      <p>Institutional Innovation Bureau • Viksit Bharat @2047 Initiative</p>
    </div>
    <div class="content">
      <div class="salutation">Dear ${recipientName || "Institutional Coordinator / SPOC"},</div>

      ${
        institutionName || aisheCode
          ? `
      <div class="meta-box">
        <table>
          ${institutionName ? `<tr><td class="label">Institution / Entity</td><td class="val">${institutionName}</td></tr>` : ""}
          ${aisheCode ? `<tr><td class="label">AISHE / Accreditation Code</td><td class="val"><span class="badge">${aisheCode}</span></td></tr>` : ""}
          <tr><td class="label">Dispatch Date</td><td class="val">${currentDate}</td></tr>
          <tr><td class="label">Communication Desk</td><td class="val">${senderRole}</td></tr>
        </table>
      </div>
      `
          : ""
      }

      <div class="message-body">
        ${formattedParagraphs}
      </div>

      <div class="sign-off">
        <p style="margin: 0; color: #0f172a; font-weight: 700;">With Best Regards,</p>
        <p style="margin: 4px 0 0; color: #0D6B4F; font-weight: 700;">Bureau of Institutional Relations &amp; Innovation</p>
        <p style="margin: 2px 0 0; font-size: 12px; color: #64748b;">National Council for Innovation &amp; Entrepreneurship (NCIE)<br/>New Delhi, India</p>
      </div>
    </div>
    <div class="footer">
      <strong>National Council for Innovation &amp; Entrepreneurship (NCIE) – India</strong><br/>
      Official Contact: <a href="mailto:office@ncieindia.org">office@ncieindia.org</a> | <a href="mailto:info@ncieindia.org">info@ncieindia.org</a><br/>
      Official Portal: <a href="https://ncieindia.org">www.ncieindia.org</a>
    </div>
  </div>
</body>
</html>
`;

    // Plain text fallback
    const plainText = `Dear ${recipientName || "Institutional Coordinator"},\n\nInstitution: ${institutionName || "N/A"}\nDate: ${currentDate}\n\n${message}\n\nWith Best Regards,\nBureau of Institutional Relations\nNational Council for Innovation & Entrepreneurship (NCIE)\nNew Delhi, India`;

    // SAFETY GUARD: Prevent sending real emails to official external college / university inboxes during testing.
    const lowerEmail = recipientEmail.trim().toLowerCase();
    const ALLOWED_REAL_TEST_EMAILS = [
      "vigneswarnalluri10@gmail.com",
      "ncie.ap.gov@gmail.com",
      "info@ncieindia.org",
      "admin@ncieindia.org",
    ];

    const isAuthorizedTestEmail = ALLOWED_REAL_TEST_EMAILS.includes(lowerEmail);

    if (!isAuthorizedTestEmail && process.env.ENABLE_REAL_COLLEGE_DISPATCH !== "true") {
      console.log(`[SAFE MODE] Real college inbox protected (${recipientEmail}). External SMTP skipped; internal mailbox delivery active.`);
      return NextResponse.json({
        success: true,
        emailSent: false,
        simulated: true,
        messageId: `SIM-DISP-${Date.now()}`,
        recipient: recipientEmail,
        note: "Real college inbox protected. External SMTP skipped and routed to internal portal mailbox.",
      });
    }

    const info = await transporter.sendMail({
      from: smtpFrom,
      to: recipientEmail,
      bcc: smtpUser, // Archival copy for official records
      replyTo: smtpUser,
      subject: subject,
      text: plainText,
      html: emailHtml,
    });

    console.log(`[INSTITUTION EMAIL SENT] Sent to ${recipientEmail} (ID: ${info.messageId})`);

    return NextResponse.json({
      success: true,
      emailSent: true,
      messageId: info.messageId,
      recipient: recipientEmail,
    });
  } catch (error: any) {
    console.error("[INSTITUTION EMAIL ERROR] Failed to send email:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send email to institution." },
      { status: 500 }
    );
  }
}
