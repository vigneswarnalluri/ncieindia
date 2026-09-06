const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

const DOCUMENTS_META = [
  {
    fileName: 'NCIE_Institutional_Profile.pdf',
    title: 'NCIE Institutional Profile',
    subtitle: 'Statutory Positioning Charter & Foundational Mandate',
    docId: 'NCIE/DOC/2026/IP-01',
    category: 'DPR & Vision Document',
    pagesBadge: '12 Pages Official Charter',
    summary: 'Foundational charter defining NCIE\'s institutional mandate, non-governmental status, core intervention areas, flagship initiatives, multi-mode delivery mechanisms, beneficiary classification, and formal disclaimers.'
  },
  {
    fileName: 'NCIE_Governance_Organisational_Structure.pdf',
    title: 'NCIE Governance Architecture',
    subtitle: 'Organisational Structure & Administrative Hierarchy',
    docId: 'NCIE/DOC/2026/GOV-02',
    category: 'Institutional Governance',
    pagesBadge: '15 Pages Governance Charter',
    summary: 'Comprehensive 10-tier institutional hierarchy, functional divisions (Admin, Finance, Programmes, Technology, M&E, Compliance), advisory council terms, regional coordinators, and formal decision-making workflows.'
  },
  {
    fileName: 'NCIE_Vision_2047.pdf',
    title: 'NCIE Vision 2047',
    subtitle: 'Building an Innovation-Driven & Future-Ready India',
    docId: 'NCIE/DOC/2026/VIS-03',
    category: 'DPR & Vision Document',
    pagesBadge: '12 Pages Strategic Roadmap',
    summary: 'Long-term institutional vision comprising 8 strategic pillars, student-to-enterprise progression pipeline, and 4-phase national rollout roadmap from Foundation 2026-30 to National Scale Impact 2040-47.'
  },
  {
    fileName: 'NCIE_Viksit_Bharat_2047_Alignment_Framework.pdf',
    title: 'Viksit Bharat @2047 Alignment Framework',
    subtitle: 'National Development Roadmap & Collegiate Action Plan',
    docId: 'NCIE/DOC/2026/VBA-04',
    category: 'National Policy Alignment',
    pagesBadge: '17 Pages Policy Framework',
    summary: 'Operational framework linking collegiate youth skilling, experiential innovation, AI literacy, and enterprise incubation directly with the national development aspiration of Viksit Bharat @2047.'
  },
  {
    fileName: 'NCIE_Government_Policy_Alignment_Matrix.pdf',
    title: 'Government & National Policy Alignment Matrix',
    subtitle: 'Mapping Across Central Ministries, National Missions & UN SDGs',
    docId: 'NCIE/DOC/2026/PAM-05',
    category: 'Policy Alignment',
    pagesBadge: '15 Pages Alignment Matrix',
    summary: 'Structured thematic mapping across 15 national missions: NEP 2020, Startup India, Skill India, Digital India, Make in India, Atmanirbhar Bharat, and UN Sustainable Development Goals (SDGs 4, 5, 8, 9, 10, 11, 17).'
  },
  {
    fileName: 'NCIE_Programme_Framework.pdf',
    title: 'Comprehensive Programme Framework',
    subtitle: 'Delivery Architecture & Institutional Operational SOPs',
    docId: 'NCIE/DOC/2026/PRG-06',
    category: 'Programmes Architecture',
    pagesBadge: '18 Pages Operational Framework',
    summary: 'Standardized programme lifecycle across 6 interconnected streams (Youth, Innovation, Startups, Digital, Institutional, Ecosystem), multi-format delivery, collegiate onboarding SOPs, and quality assurance.'
  },
  {
    fileName: 'NCIE_Flagship_Innovation_and_Startup_Programmes.pdf',
    title: 'Flagship Innovation Leadership Guidelines',
    subtitle: 'Dr. A.P.J. Abdul Kalam Startup Validation & Grant Lifecycle',
    docId: 'NCIE/DOC/2026/FIP-07',
    category: 'Flagship Programmes',
    pagesBadge: '15 Pages Guidelines',
    summary: 'Detailed operational guidelines for course-integrated tracks, 8-stage startup validation lifecycle, Rs. 5 Lakh milestone seed grant model, and follow-on venture capital / investor connectivity pipeline.'
  },
  {
    fileName: 'NCIE_Innovation_Startup_Policy.pdf',
    title: 'Institutional Innovation & Startup Policy',
    subtitle: 'Student IP Protection, Incubation Protocols & Venture Ethics',
    docId: 'NCIE/DOC/2026/ISP-08',
    category: 'Statutory Policies',
    pagesBadge: '25 Pages Statutory Policy',
    summary: 'Authoritative policy governing student venture creation, intellectual property protection (participants retain 100% IP ownership), responsible AI ethics, confidentiality covenants, and campus scorecards.'
  },
  {
    fileName: 'NCIE_Collaboration_Partnership_Framework.pdf',
    title: 'Institutional Collaboration & Strategic Partnership',
    subtitle: 'Multi-Stakeholder Engagement Models & MoU Guidelines',
    docId: 'NCIE/DOC/2026/CPF-09',
    category: 'Partnerships & MoUs',
    pagesBadge: '25 Pages Partnership Framework',
    summary: 'Formal framework governing 12 partnership categories across universities, industry, accelerators, CSR trusts, and public agencies; includes 7 collaboration models, due diligence protocols, and MoU guidelines.'
  },
  {
    fileName: 'NCIE_CSR_Partnership_Framework.pdf',
    title: 'Corporate Social Responsibility (CSR) Framework',
    subtitle: 'Section 135 Compliance, Collegiate Skilling & Incubation Grants',
    docId: 'NCIE/DOC/2026/CSR-10',
    category: 'CSR & Industry',
    pagesBadge: '22 Pages CSR Framework',
    summary: 'Companies Act Section 135-compliant CSR engagement guidelines for collegiate skilling, incubation lab infrastructure grants (Rs. 20L - 50L), startup seed funds, project budgeting, and impact audit standards.'
  },
  {
    fileName: 'NCIE_Funding_Resource_Mobilisation_Framework.pdf',
    title: 'Funding & Resource Mobilisation Framework',
    subtitle: 'Capital Allocations, Financial Controls & MIS Governance',
    docId: 'NCIE/DOC/2026/FRM-11',
    category: 'Finance & Grants',
    pagesBadge: '25 Pages Financial Governance',
    summary: '7-stage rigorous funding status classification (Pipeline to Utilised), campus project facilitation SOPs (Rs. 5L - 25L), internal financial controls, procurement rules, and Resource Mobilisation MIS tracking.'
  },
  {
    fileName: 'NCIE_Monitoring_Evaluation_Framework.pdf',
    title: 'Monitoring & Evaluation (M&E) Results Architecture',
    subtitle: 'Performance Indicators, Dashboards & Outcome Verification',
    docId: 'NCIE/DOC/2026/MEF-12',
    category: 'Monitoring & Evaluation',
    pagesBadge: '30 Pages Results Architecture',
    summary: '5-level monitoring framework (Participant to Impact), KPIs for skills and startup outcomes, digital MIS dashboards, pre/post learning gain assessment, and root-cause corrective action mechanisms.'
  },
  {
    fileName: 'NCIE_Transparency_Public_Disclosure_Policy.pdf',
    title: 'Institutional Transparency & Public Disclosure Policy',
    subtitle: 'Statutory Communications, Non-Gov Disclaimers & Ethics Norms',
    docId: 'NCIE/DOC/2026/TPD-13',
    category: 'Compliance & Disclosure',
    pagesBadge: '26 Pages Compliance Policy',
    summary: 'Statutory standards for official communications, mandatory non-governmental representation disclaimers, accurate government alignment terminology, fee transparency, privacy protection, and prohibited claims.'
  },
  {
    fileName: 'NCIE_Grievance_Redressal_Policy.pdf',
    title: 'Grievance Redressal & Stakeholder Protection',
    subtitle: 'Multi-Tier Escalation Ladder, Time-Bound SLAs & Whistleblower Rights',
    docId: 'NCIE/DOC/2026/GRP-14',
    category: 'Stakeholder Protection',
    pagesBadge: '24 Pages Protection Mechanism',
    summary: 'Structured complaint redressal mechanism across 10 grievance categories; time-bound SLAs (2-3 days acknowledgement, 15-30 days resolution), 5-tier escalation ladder, and whistleblower non-retaliation protections.'
  },
  {
    fileName: 'NCIE_Master_Policy_Compendium.pdf',
    title: 'NCIE Master Policy Compendium',
    subtitle: 'Comprehensive Apex Compendium & Statutory Policy Register',
    docId: 'NCIE/DOC/2026/MPC-15',
    category: 'Apex Compendium',
    pagesBadge: '281 Pages Master Compendium',
    summary: 'Comprehensive 281-page master compendium integrating all operational frameworks, governance charters, statutory disclosures, institutional guidelines, and national development instruments.'
  }
];

function cleanAscii(str) {
  if (!str) return '';
  return String(str)
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\u2022/g, '|')
    .replace(/₹/g, 'Rs. ')
    .replace(/[^\x20-\x7E]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function drawSafeText(page, text, opts) {
  const safe = cleanAscii(text);
  page.drawText(safe, opts);
}

function drawTextCentered(page, text, y, size, font, color) {
  const safe = cleanAscii(text);
  const textWidth = font.widthOfTextAtSize(safe, size);
  const x = (page.getWidth() - textWidth) / 2;
  page.drawText(safe, { x, y, size, font, color });
}

async function enhancePdf(meta) {
  const filePath = path.join(process.cwd(), 'public', 'documents', meta.fileName);
  if (!fs.existsSync(filePath)) {
    console.log('Skipping missing file:', meta.fileName);
    return;
  }

  const existingBytes = fs.readFileSync(filePath);
  const pdfDoc = await PDFDocument.load(existingBytes);

  // Load fonts
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontTimesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

  // Load Logos
  const publicDir = path.join(process.cwd(), 'public');
  const emblemBytes = fs.readFileSync(path.join(publicDir, 'emblem-dark.png'));
  const logoBytes = fs.readFileSync(path.join(publicDir, 'logo.png'));
  const viksitBytes = fs.readFileSync(path.join(publicDir, 'viksit-bharat.png'));
  const azadiBytes = fs.readFileSync(path.join(publicDir, 'azadi-ka-amrit-mahotsav.png'));
  const digitalBytes = fs.readFileSync(path.join(publicDir, 'digital-india.png'));
  const makeInIndiaBytes = fs.readFileSync(path.join(publicDir, 'make-in-india.png'));
  const startupJpgBytes = fs.readFileSync(path.join(publicDir, 'logos', 'startup india.jpg'));
  const msdeLogoBytes = fs.readFileSync(path.join(publicDir, 'msde-logo.png'));

  const imgEmblem = await pdfDoc.embedPng(emblemBytes);
  const imgLogo = await pdfDoc.embedPng(logoBytes);
  const imgViksit = await pdfDoc.embedPng(viksitBytes);
  const imgAzadi = await pdfDoc.embedPng(azadiBytes);
  const imgDigital = await pdfDoc.embedPng(digitalBytes);
  const imgMakeInIndia = await pdfDoc.embedPng(makeInIndiaBytes);
  const imgStartup = await pdfDoc.embedJpg(startupJpgBytes);
  const imgMsde = await pdfDoc.embedPng(msdeLogoBytes);

  // Insert brand new cover page at index 0 and remove old blank cover page
  const coverPage = pdfDoc.insertPage(0, [595.2, 841.92]);
  pdfDoc.removePage(1);

  const width = 595.2;
  const height = 841.92;

  // ── 1. BACKGROUND & PREMIUM BORDERS ──
  coverPage.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: rgb(0.985, 0.988, 0.99)
  });

  coverPage.drawRectangle({
    x: 20,
    y: 20,
    width: width - 40,
    height: height - 40,
    color: rgb(1, 1, 1),
    borderColor: rgb(0.05, 0.35, 0.25),
    borderWidth: 2
  });

  coverPage.drawRectangle({
    x: 25,
    y: 25,
    width: width - 50,
    height: height - 50,
    borderColor: rgb(0.79, 0.64, 0.29),
    borderWidth: 0.75
  });

  // Top Tricolor Banner Strip
  coverPage.drawRectangle({ x: 25, y: height - 29, width: (width - 50) / 3, height: 4, color: rgb(1, 0.6, 0.2) });
  coverPage.drawRectangle({ x: 25 + (width - 50) / 3, y: height - 29, width: (width - 50) / 3, height: 4, color: rgb(0.9, 0.9, 0.9) });
  coverPage.drawRectangle({ x: 25 + ((width - 50) / 3) * 2, y: height - 29, width: (width - 50) / 3, height: 4, color: rgb(0.07, 0.53, 0.03) });

  // ── 2. TOP HEADER BRANDING BAND (Apex Government & Council Insignia) ──
  const headerTopY = height - 35;

  coverPage.drawImage(imgEmblem, {
    x: 45,
    y: headerTopY - 55,
    width: 31,
    height: 52
  });

  drawSafeText(coverPage, 'GOVERNMENT OF INDIA', {
    x: 84,
    y: headerTopY - 18,
    size: 9.5,
    font: fontBold,
    color: rgb(0.08, 0.12, 0.1)
  });
  drawSafeText(coverPage, 'MINISTRY OF SKILL DEVELOPMENT & ENTREPRENEURSHIP', {
    x: 84,
    y: headerTopY - 30,
    size: 7,
    font: fontBold,
    color: rgb(0.18, 0.35, 0.25)
  });
  drawSafeText(coverPage, 'Skill India Mission | National Council for Innovation & Entrepreneurship', {
    x: 84,
    y: headerTopY - 42,
    size: 6.5,
    font: fontRegular,
    color: rgb(0.35, 0.4, 0.38)
  });

  coverPage.drawLine({
    start: { x: 340, y: headerTopY - 10 },
    end: { x: 340, y: headerTopY - 52 },
    thickness: 0.75,
    color: rgb(0.8, 0.82, 0.8)
  });

  coverPage.drawImage(imgLogo, {
    x: 355,
    y: headerTopY - 55,
    width: 145,
    height: 48
  });

  coverPage.drawImage(imgAzadi, {
    x: 512,
    y: headerTopY - 48,
    width: 44,
    height: 38
  });

  coverPage.drawLine({
    start: { x: 35, y: headerTopY - 65 },
    end: { x: width - 35, y: headerTopY - 65 },
    thickness: 1,
    color: rgb(0.05, 0.35, 0.25)
  });
  coverPage.drawLine({
    start: { x: 35, y: headerTopY - 67.5 },
    end: { x: width - 35, y: headerTopY - 67.5 },
    thickness: 0.5,
    color: rgb(0.79, 0.64, 0.29)
  });

  // ── 3. DOCUMENT CLASSIFICATION & REF BADGE (Minimal & Clean) ──
  const ribbonY = headerTopY - 95;
  coverPage.drawRectangle({
    x: 45,
    y: ribbonY,
    width: width - 90,
    height: 22,
    color: rgb(0.04, 0.32, 0.22)
  });
  drawSafeText(coverPage, meta.category.toUpperCase() + ' | ' + meta.pagesBadge.toUpperCase(), {
    x: 55,
    y: ribbonY + 6.5,
    size: 7.5,
    font: fontBold,
    color: rgb(1, 1, 1)
  });
  const docIdText = 'REF: ' + cleanAscii(meta.docId);
  const docIdWidth = fontBold.widthOfTextAtSize(docIdText, 7.5);
  drawSafeText(coverPage, docIdText, {
    x: width - 55 - docIdWidth,
    y: ribbonY + 6.5,
    size: 7.5,
    font: fontBold,
    color: rgb(0.85, 0.72, 0.35)
  });

  // ── 4. APEX COUNCIL BANNER ──
  const councilY = ribbonY - 32;
  drawTextCentered(coverPage, 'NATIONAL COUNCIL FOR INNOVATION & ENTREPRENEURSHIP (NCIE) INDIA', councilY, 11, fontBold, rgb(0.05, 0.35, 0.25));

  // ── 5. MAIN DOCUMENT TITLE BLOCK (MINIMAL, NO HEAVY BOXES!) ──
  coverPage.drawRectangle({
    x: 50,
    y: councilY - 22,
    width: 45,
    height: 2.5,
    color: rgb(0.79, 0.64, 0.29)
  });

  const titleLines = [];
  const words = cleanAscii(meta.title).split(' ');
  let currentLine = '';
  for (const w of words) {
    const testLine = currentLine ? currentLine + ' ' + w : w;
    if (fontTimesBold.widthOfTextAtSize(testLine, 22) < width - 110) {
      currentLine = testLine;
    } else {
      titleLines.push(currentLine);
      currentLine = w;
    }
  }
  if (currentLine) titleLines.push(currentLine);

  let curTitleY = councilY - 52;
  for (const tl of titleLines) {
    drawSafeText(coverPage, tl, {
      x: 50,
      y: curTitleY,
      size: 22,
      font: fontTimesBold,
      color: rgb(0.04, 0.22, 0.16)
    });
    curTitleY -= 28;
  }

  curTitleY -= 4;
  drawSafeText(coverPage, meta.subtitle, {
    x: 50,
    y: curTitleY,
    size: 10.5,
    font: fontBold,
    color: rgb(0.72, 0.52, 0.18)
  });

  curTitleY -= 18;
  const summaryWords = cleanAscii(meta.summary).split(' ');
  let sumLine = '';
  const sumLines = [];
  for (const sw of summaryWords) {
    const tLine = sumLine ? sumLine + ' ' + sw : sw;
    if (fontRegular.widthOfTextAtSize(tLine, 8.5) < width - 110) {
      sumLine = tLine;
    } else {
      sumLines.push(sumLine);
      sumLine = sw;
    }
  }
  if (sumLine) sumLines.push(sumLine);

  for (let sIdx = 0; sIdx < Math.min(3, sumLines.length); sIdx++) {
    drawSafeText(coverPage, sumLines[sIdx], {
      x: 50,
      y: curTitleY,
      size: 8.5,
      font: fontRegular,
      color: rgb(0.35, 0.4, 0.38)
    });
    curTitleY -= 13;
  }

  // ── 6. MINISTERIAL COORDINATION (MINIMAL TYPOGRAPHIC SECTION) ──
  const minLineY = curTitleY - 28;
  coverPage.drawLine({
    start: { x: 50, y: minLineY },
    end: { x: width - 50, y: minLineY },
    thickness: 0.5,
    color: rgb(0.85, 0.88, 0.85)
  });

  drawSafeText(coverPage, 'GOVERNMENT OF INDIA MINISTERIAL COORDINATION & ALIGNMENT', {
    x: 50,
    y: minLineY - 14,
    size: 7,
    font: fontBold,
    color: rgb(0.05, 0.35, 0.25)
  });

  const minCols = [
    { code: 'MSDE', line1: 'Skill Development &', line2: 'Entrepreneurship' },
    { code: 'MSME', line1: 'Micro, Small &', line2: 'Medium Enterprises' },
    { code: 'MeitY', line1: 'Electronics &', line2: 'Information Technology' },
    { code: 'MCA', line1: 'Ministry of', line2: 'Corporate Affairs' }
  ];
  const colWidth = (width - 100) / 4;
  minCols.forEach((mc, idx) => {
    const colX = 50 + idx * colWidth;
    drawSafeText(coverPage, mc.code, {
      x: colX,
      y: minLineY - 30,
      size: 9,
      font: fontBold,
      color: rgb(0.05, 0.35, 0.25)
    });
    drawSafeText(coverPage, mc.line1, {
      x: colX,
      y: minLineY - 42,
      size: 6.5,
      font: fontRegular,
      color: rgb(0.35, 0.4, 0.38)
    });
    drawSafeText(coverPage, mc.line2, {
      x: colX,
      y: minLineY - 52,
      size: 6.5,
      font: fontRegular,
      color: rgb(0.35, 0.4, 0.38)
    });
  });

  coverPage.drawLine({
    start: { x: 50, y: minLineY - 64 },
    end: { x: width - 50, y: minLineY - 64 },
    thickness: 0.5,
    color: rgb(0.85, 0.88, 0.85)
  });

  // ── 7. DOCUMENT SPECIFICATIONS (CLEAN SINGLE LINE, NO BOX) ──
  const specTextY = minLineY - 95;
  drawSafeText(coverPage, 'Document ID: ' + cleanAscii(meta.docId) + '   |   Edition: 2026 Master Edition   |   National Vision: Viksit Bharat @2047 Framework', {
    x: 50,
    y: specTextY,
    size: 7.5,
    font: fontRegular,
    color: rgb(0.4, 0.45, 0.42)
  });

  // ── 8. SUPPORTING NATIONAL INITIATIVES LOGOS ROW ──
  const logoRowY = 105;
  drawSafeText(coverPage, 'SUPPORTING NATIONAL INITIATIVES & STRATEGIC ALLIANCES', {
    x: 50,
    y: logoRowY + 42,
    size: 7,
    font: fontBold,
    color: rgb(0.45, 0.5, 0.48)
  });

  coverPage.drawImage(imgViksit, { x: 50, y: logoRowY, width: 80, height: 32 });
  coverPage.drawImage(imgStartup, { x: 150, y: logoRowY, width: 85, height: 32 });
  coverPage.drawImage(imgMakeInIndia, { x: 255, y: logoRowY + 2, width: 75, height: 28 });
  coverPage.drawImage(imgDigital, { x: 355, y: logoRowY + 2, width: 75, height: 28 });
  coverPage.drawImage(imgMsde, { x: 450, y: logoRowY, width: 85, height: 32 });

  // ── 9. OFFICIAL BOTTOM FOOTER BAR ──
  coverPage.drawRectangle({
    x: 25,
    y: 25,
    width: width - 50,
    height: 38,
    color: rgb(0.04, 0.25, 0.18)
  });

  drawSafeText(coverPage, 'NATIONAL COUNCIL FOR INNOVATION & ENTREPRENEURSHIP (NCIE) INDIA', {
    x: 40,
    y: 48,
    size: 7.5,
    font: fontBold,
    color: rgb(1, 1, 1)
  });
  drawSafeText(coverPage, 'Official Publications Vault | Confidential & Public Disclosure Document | All Rights Reserved', {
    x: 40,
    y: 35,
    size: 6.5,
    font: fontRegular,
    color: rgb(0.8, 0.88, 0.85)
  });

  const webContactText = 'www.ncieindia.org | info@ncieindia.org';
  const webWidth = fontBold.widthOfTextAtSize(webContactText, 7.5);
  drawSafeText(coverPage, webContactText, {
    x: width - 40 - webWidth,
    y: 42,
    size: 7.5,
    font: fontBold,
    color: rgb(0.85, 0.72, 0.35)
  });

  // ── 10. RUNNING BORDERS, HEADER & FOOTER ON SUBSEQUENT PAGES (Pages 2 to N) ──
  const totalPages = pdfDoc.getPageCount();
  for (let pIdx = 1; pIdx < totalPages; pIdx++) {
    const page = pdfDoc.getPages()[pIdx];
    const pSize = page.getSize();
    const pW = pSize.width;
    const pH = pSize.height;

    // Outer Primary Border (Emerald Green)
    page.drawRectangle({
      x: 20,
      y: 20,
      width: pW - 40,
      height: pH - 40,
      borderColor: rgb(0.05, 0.35, 0.25),
      borderWidth: 1.5
    });

    // Inner Accent Border (Refined Gold)
    page.drawRectangle({
      x: 23.5,
      y: 23.5,
      width: pW - 47,
      height: pH - 47,
      borderColor: rgb(0.79, 0.64, 0.29),
      borderWidth: 0.6
    });

    // Running Header Divider Line
    page.drawLine({
      start: { x: 24, y: pH - 40 },
      end: { x: pW - 24, y: pH - 40 },
      thickness: 0.5,
      color: rgb(0.8, 0.82, 0.8)
    });

    // Running Header Text
    drawSafeText(page, 'NATIONAL COUNCIL FOR INNOVATION & ENTREPRENEURSHIP (NCIE)', {
      x: 35,
      y: pH - 34,
      size: 6.5,
      font: fontBold,
      color: rgb(0.05, 0.35, 0.25)
    });

    // Running Footer Divider Line
    page.drawLine({
      start: { x: 24, y: 38 },
      end: { x: pW - 24, y: 38 },
      thickness: 0.5,
      color: rgb(0.8, 0.82, 0.8)
    });

    // Running Footer Text
    drawSafeText(page, 'Official NCIE Publication | www.ncieindia.org | info@ncieindia.org', {
      x: 35,
      y: 28,
      size: 6.5,
      font: fontRegular,
      color: rgb(0.4, 0.45, 0.42)
    });
    const pageStr = `Page ${pIdx + 1} of ${totalPages}`;
    const pStrWidth = fontBold.widthOfTextAtSize(pageStr, 7);
    drawSafeText(page, pageStr, {
      x: pW - 35 - pStrWidth,
      y: 28,
      size: 7,
      font: fontBold,
      color: rgb(0.05, 0.35, 0.25)
    });
  }

  const outputBytes = await pdfDoc.save();
  fs.writeFileSync(filePath, outputBytes);
  console.log(`Successfully enhanced: ${meta.fileName} (Total pages: ${totalPages})`);
}

async function main() {
  console.log('Starting enhancement of all NCIE documents in public/documents/ ...');
  for (const docMeta of DOCUMENTS_META) {
    try {
      await enhancePdf(docMeta);
    } catch (err) {
      console.error(`Error enhancing ${docMeta.fileName}:`, err);
    }
  }
  console.log('All documents successfully enhanced!');
}

main().catch(console.error);
