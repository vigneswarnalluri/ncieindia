import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { generateConfirmationPdf, formatConfirmationDate } from "@/lib/generateConfirmationPdf";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, fullName, regId, course, orgName, paymentId, date } = body;

    if (!email || !fullName || !regId) {
      return NextResponse.json(
        { error: "Missing required fields: email, fullName, and regId are required." },
        { status: 400 }
      );
    }

    const formattedDate = formatConfirmationDate(date);
    const courseTitle = course || "Viksit Bharat @2047 Innovation Leadership Programme";

    // 1. Generate customized PDF confirmation letter
    const pdfBytes = await generateConfirmationPdf({
      regId,
      studentName: fullName,
      date: formattedDate,
      courseName: courseTitle,
    });

    const pdfBuffer = Buffer.from(pdfBytes);

    // 2. Configure SMTP transporter
    const smtpHost = process.env.SMTP_HOST || "smtp.hostinger.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM || `"National Council for Innovation & Entrepreneurship (NCIE)" <info@ncieindia.org>`;

    if (!smtpUser || !smtpPass) {
      console.warn(
        "⚠️ [SMTP WARNING] SMTP_USER and/or SMTP_PASS are not configured in environment variables. Email could not be sent over live SMTP. Returning PDF base64."
      );
      return NextResponse.json({
        success: true,
        emailSent: false,
        warning: "SMTP credentials not configured. PDF generated successfully.",
        regId,
        pdfBase64: pdfBuffer.toString("base64"),
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
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
    });

    // 3. Compose rich, official HTML email
    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NCIE Registration Confirmation Letter</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 0; color: #1e293b; }
    .container { max-width: 620px; margin: 24px auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background: #0D6B4F; color: #ffffff; padding: 28px 24px; text-align: center; border-bottom: 4px solid #C9A24B; }
    .header h1 { margin: 0; font-size: 19px; letter-spacing: 0.5px; font-weight: 800; text-transform: uppercase; }
    .header p { margin: 6px 0 0; font-size: 12px; color: #e2e8f0; letter-spacing: 0.5px; }
    .content { padding: 32px 28px; line-height: 1.6; font-size: 14px; }
    .salutation { font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 12px; }
    .badge { display: inline-block; background-color: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; padding: 4px 10px; border-radius: 4px; font-weight: 700; font-size: 13px; margin: 8px 0; }
    .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; font-size: 13px; }
    .details-table th, .details-table td { padding: 10px 14px; text-align: left; border-bottom: 1px solid #e2e8f0; }
    .details-table th { width: 38%; color: #64748b; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; }
    .details-table td { color: #0f172a; font-weight: 600; }
    .details-table tr:last-child th, .details-table tr:last-child td { border-bottom: none; }
    .notice-box { background-color: #fffbeb; border-left: 4px solid #C9A24B; padding: 14px 16px; margin: 20px 0; font-size: 13px; color: #92400e; border-radius: 0 6px 6px 0; }
    .footer { background: #0f172a; color: #94a3b8; padding: 24px; text-align: center; font-size: 11px; line-height: 1.5; }
    .footer strong { color: #f8fafc; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>National Council for Innovation & Entrepreneurship</h1>
      <p>Empowering Ideas • Viksit Bharat @2047 Innovation Leadership Initiative</p>
    </div>
    <div class="content">
      <div class="salutation">Dear ${fullName},</div>
      <p>Greetings from the <strong>National Council for Innovation & Entrepreneurship (NCIE)</strong>.</p>
      <p>We are pleased to inform you that your registration for the <strong>Viksit Bharat @2047 Innovation Leadership Programme</strong> has been successfully processed and verified.</p>
      
      <table class="details-table">
        <tr>
          <th>Registration ID</th>
          <td><span class="badge">${regId}</span></td>
        </tr>
        <tr>
          <th>Candidate Name</th>
          <td>${fullName}</td>
        </tr>
        <tr>
          <th>Course / Programme</th>
          <td>${courseTitle}</td>
        </tr>
        ${orgName ? `<tr><th>Institution / College</th><td>${orgName}</td></tr>` : ""}
        ${paymentId ? `<tr><th>Payment Transaction ID</th><td>${paymentId}</td></tr>` : ""}
        <tr>
          <th>Registration Date</th>
          <td>${formattedDate}</td>
        </tr>
      </table>

      <div class="notice-box">
        <strong>Official Confirmation Attached:</strong> Your formal <strong>Registration Confirmation Letter</strong> has been attached to this email as a PDF document. Please download and preserve it for your institutional submissions and verification.
      </div>

      <p>You are requested to actively participate in all programme sessions, coursework, assignments, and innovation-related engagements as communicated by the council.</p>

      <p style="margin-top: 24px; font-style: italic; color: #0D6B4F; font-weight: 700; text-align: center;">
        “Innovate. Lead. Create. Contribute to Viksit Bharat @2047.”
      </p>

      <p style="margin-top: 28px; margin-bottom: 0;">
        With Best Wishes,<br>
        <strong>Director – Academics</strong><br>
        National Council for Innovation & Entrepreneurship (NCIE)<br>
        New Delhi, India
      </p>
    </div>
    <div class="footer">
      <strong>National Council for Innovation & Entrepreneurship (NCIE) – India</strong><br>
      Official Communication: <a href="mailto:office@ncieindia.org" style="color: #38bdf8; text-decoration: none;">office@ncieindia.org</a> | <a href="mailto:info@ncieindia.org" style="color: #38bdf8; text-decoration: none;">info@ncieindia.org</a><br>
      Website: <a href="https://ncieindia.org" style="color: #38bdf8; text-decoration: none;">www.ncieindia.org</a>
    </div>
  </div>
</body>
</html>
    `;

    // 4. Send email with attachment
    const info = await transporter.sendMail({
      from: smtpFrom,
      to: email,
      subject: `Registration Confirmation Letter - ${regId} | NCIE Viksit Bharat @2047`,
      text: `Dear ${fullName},\n\nWe are pleased to inform you that your registration for the Viksit Bharat @2047 Innovation Leadership Programme has been successfully completed.\n\nRegistration ID: ${regId}\nCourse: ${courseTitle}\nDate: ${formattedDate}\n\nPlease find your official Registration Confirmation Letter attached as a PDF.\n\nNational Council for Innovation & Entrepreneurship (NCIE)\nNew Delhi, India`,
      html: emailHtml,
      attachments: [
        {
          filename: `REGISTRATION_CONFIRMATION_LETTER_${regId}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    console.log(`✅ [EMAIL SENT] Registration confirmation letter sent to ${email} (Message ID: ${info.messageId})`);

    return NextResponse.json({
      success: true,
      emailSent: true,
      messageId: info.messageId,
      regId,
      pdfBase64: pdfBuffer.toString("base64"),
    });
  } catch (error: any) {
    console.error("❌ [EMAIL ERROR] Failed to send registration confirmation letter:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to process registration confirmation letter.",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const regId = searchParams.get("regId") || "REG-2026-0000";
    const studentName = searchParams.get("name") || "Student / Participant";
    const date = searchParams.get("date") || undefined;
    const courseName = searchParams.get("course") || undefined;

    const pdfBytes = await generateConfirmationPdf({
      regId,
      studentName,
      date,
      courseName,
    });

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="REGISTRATION_CONFIRMATION_LETTER_${regId}.pdf"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to generate confirmation PDF." },
      { status: 500 }
    );
  }
}
