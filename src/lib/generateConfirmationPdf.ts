import fs from "fs";
import path from "path";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export interface GeneratePdfOptions {
  regId: string;
  studentName: string;
  date?: string;
  courseName?: string;
}

/**
 * Formats a Date object or ISO string to DD-MM-YYYY format
 */
export function formatConfirmationDate(inputDate?: string | Date): string {
  const d = inputDate ? new Date(inputDate) : new Date();
  if (isNaN(d.getTime())) {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    return `${day}-${month}-${year}`;
  }
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

/**
 * Loads the master REGISTRATION CONFIRMATION LETTER.pdf template,
 * fills in the dynamic student details, and returns the modified PDF buffer.
 */
export async function generateConfirmationPdf(options: GeneratePdfOptions): Promise<Uint8Array> {
  const { regId, studentName, date, courseName } = options;
  const formattedDate = formatConfirmationDate(date);

  // Locate the master PDF template in public or root directory
  const possiblePaths = [
    path.join(process.cwd(), "public", "REGISTRATION_CONFIRMATION_LETTER.pdf"),
    path.join(process.cwd(), "REGISTRATION CONFIRMATION LETTER.pdf"),
    path.join(process.cwd(), "public", "REGISTRATION CONFIRMATION LETTER.pdf"),
  ];

  let templateBytes: Buffer | null = null;
  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      templateBytes = fs.readFileSync(filePath);
      break;
    }
  }

  if (!templateBytes) {
    throw new Error("Master Registration Confirmation Letter PDF template not found.");
  }

  const pdfDoc = await PDFDocument.load(templateBytes);
  const page = pdfDoc.getPages()[0];
  const fontBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

  // 1. Registration ID & Date Line
  // Mask the placeholder line '{ id ......... }' and '{ date ........... }'
  page.drawRectangle({
    x: 65,
    y: 640,
    width: 480,
    height: 22,
    color: rgb(1, 1, 1),
  });

  page.drawText(`Registration ID: ${regId || "REG-2026-0000"}`, {
    x: 68,
    y: 644,
    size: 13,
    font: fontBold,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Date: ${formattedDate}`, {
    x: 375,
    y: 644,
    size: 13,
    font: fontBold,
    color: rgb(0, 0, 0),
  });

  // 2. Student Name Line: 'Mr./Ms { name ............ }'
  page.drawRectangle({
    x: 65,
    y: 597,
    width: 350,
    height: 18,
    color: rgb(1, 1, 1),
  });

  page.drawText(`Mr./Ms  ${studentName || "Student / Participant"}`, {
    x: 68,
    y: 601,
    size: 13,
    font: fontBold,
    color: rgb(0, 0, 0),
  });

  // 3. Subject block
  page.drawRectangle({
    x: 65,
    y: 538,
    width: 480,
    height: 38,
    color: rgb(1, 1, 1),
  });

  const subjectPrefix = "Subject: Confirmation of Successful Registration – ";
  page.drawText(subjectPrefix, {
    x: 68,
    y: 560,
    size: 12,
    font: fontBold,
    color: rgb(0, 0, 0),
  });

  const prefixWidth = fontBold.widthOfTextAtSize(subjectPrefix, 12);
  page.drawText("Viksit Bharat ", {
    x: 68 + prefixWidth,
    y: 560,
    size: 12,
    font: fontBold,
    color: rgb(0.85, 0.55, 0.1), // NCIE Gold/Amber
  });

  const vbWidth = fontBold.widthOfTextAtSize("Viksit Bharat ", 12);
  page.drawText("@2047", {
    x: 68 + prefixWidth + vbWidth,
    y: 560,
    size: 12,
    font: fontBold,
    color: rgb(0.1, 0.2, 0.8), // NCIE Blue
  });

  const courseDisplay = courseName && !courseName.toLowerCase().includes("innovation leadership") && courseName !== "Viksit Bharat @2047"
    ? `${courseName} / On Dated: ${formattedDate}`
    : `Innovation Leadership Programme / On Dated: ${formattedDate}`;

  page.drawText(courseDisplay, {
    x: 68,
    y: 544,
    size: 12,
    font: fontBold,
    color: rgb(0, 0, 0),
  });

  const modifiedPdfBytes = await pdfDoc.save();
  return modifiedPdfBytes;
}
