export interface OrderItem {
  id: string;
  orderNo: string;
  date: string;
  effectiveDate: string;
  title: string;
  description: string;
  category: "Office Memorandums" | "Policy Directives" | "Executive Orders" | "Institutional Guidelines" | "Gazette Notifications";
  signedBy: string;
  department: string;
  fileUrl?: string;
  fileSize?: string;
  pages?: number;
  isUrgent?: boolean;
  status: "Active" | "Superseded" | "Archived";
  tags?: string[];
}

export const ORDERS_DATA: OrderItem[] = [
  {
    id: "ord-ncie-2026-124",
    orderNo: "Lt.No. 124/08/26/NCIE",
    date: "August 10, 2026",
    effectiveDate: "August 10, 2026",
    title: "Executive Directive on Viksit Bharat @2047 Innovation Mission Mandate across Member Institutions",
    description: "Official executive order detailing the mandatory adoption of NCIE innovation protocols, appointment of Institutional Nodal Officers, establishment of Kalam Innovation Labs, and submission of quarterly innovation audits by all affiliated universities and polytechnics.",
    category: "Executive Orders",
    signedBy: "Executive Director, NCIE Central Headquarters",
    department: "Executive Secretariat",
    fileUrl: "/Lt_No_124_08_26_NCIE_Viksit_Bharat_2047_Innovation_Mission.pdf",
    fileSize: "856 KB",
    pages: 4,
    isUrgent: true,
    status: "Active",
    tags: ["Viksit Bharat", "HEI Mandate", "Nodal Officers", "Directive"],
  },
  {
    id: "ord-ncie-dpr-policy",
    orderNo: "OM No. NCIE/POLICY/2026/01",
    date: "August 01, 2026",
    effectiveDate: "August 01, 2026",
    title: "Office Memorandum: Notification & Implementation of the NCIE Detailed Project Report (DPR) 2026-2047",
    description: "Office Memorandum formally notifying the adoption of the ₹3,000 Crore multi-phased innovation framework covering Student Startup Grants, Infrastructure Grants, and Regional Chapter Operations.",
    category: "Office Memorandums",
    signedBy: "Member Secretary, Governing Board",
    department: "Policy & Planning Wing",
    fileUrl: "/NCIE_DPR.pdf",
    fileSize: "1.2 MB",
    pages: 18,
    isUrgent: false,
    status: "Active",
    tags: ["DPR", "Policy Memorandum", "Funding Structure"],
  },
  {
    id: "ord-ncie-curr-poly-2026",
    orderNo: "OM No. NCIE/ACAD/POLY/2026-27",
    date: "July 15, 2026",
    effectiveDate: "Academic Year 2026-27",
    title: "Notification of Standardized Technical & Polytechnic Entrepreneurship Curriculum (Years I, II, & III)",
    description: "Directive issued to all polytechnic colleges introducing course-aligned innovation leadership modules, practical lab credits, and startup incubation pathways.",
    category: "Institutional Guidelines",
    signedBy: "Dean, Academic & Vocational Board",
    department: "Academic Council",
    fileUrl: "/POLYTECHNIC_CURRICULUM_I_Year.pdf",
    fileSize: "115 KB",
    pages: 12,
    isUrgent: false,
    status: "Active",
    tags: ["Curriculum", "Polytechnic", "Technical Education"],
  },
  {
    id: "ord-ncie-rec-rules-2026",
    orderNo: "Order No. NCIE/HR/RULES/2026-07",
    date: "June 25, 2026",
    effectiveDate: "July 01, 2026",
    title: "Rules & Operational Guidelines for 773 Contractual Staff Engagements (AP Region)",
    description: "Government order specifying remuneration structure, service conditions, performance metrics, and reporting hierarchy for contractual administrative and technical appointees.",
    category: "Policy Directives",
    signedBy: "Director (HR & Legal Affairs)",
    department: "Human Resources Department",
    fileUrl: "/careers",
    fileSize: "Web Document",
    pages: 6,
    isUrgent: false,
    status: "Active",
    tags: ["HR Rules", "Recruitment Directives", "AP State"],
  },
  {
    id: "ord-ncie-ip-policy-2025",
    orderNo: "OM No. NCIE/IPR/2025/08",
    date: "November 12, 2025",
    effectiveDate: "December 01, 2025",
    title: "National Student Patent Reimbursement & Intellectual Property Facilitation Policy Order",
    description: "Orders governing 100% patent filing fee reimbursement for student inventors, fast-track IP filing via NCIE Patent Cell, and joint IP ownership models.",
    category: "Policy Directives",
    signedBy: "Director (Intellectual Property & Commercialization)",
    department: "IPR Facilitation Bureau",
    fileUrl: "/schemes",
    fileSize: "Web Document",
    pages: 8,
    isUrgent: false,
    status: "Active",
    tags: ["IP Policy", "Patent Grant", "Reimbursement"],
  },
  {
    id: "ord-ncie-fund-sanction-2025",
    orderNo: "Sanction Order No. NCIE/FIN/GRANT/2025-42",
    date: "August 20, 2025",
    effectiveDate: "Immediate",
    title: "Sanction of Disbursement Framework for Kalam Student Startup Seed Fund (Tranche-I)",
    description: "Financial order prescribing banking procedures, fund release milestones, audit documentation, and Utilization Certificate (UC) formats for seed funded startups.",
    category: "Office Memorandums",
    signedBy: "Chief Financial Officer (CFO)",
    department: "Finance & Accounts Wing",
    fileUrl: "/schemes",
    fileSize: "Web Document",
    pages: 5,
    isUrgent: false,
    status: "Active",
    tags: ["Sanction Order", "Disbursement", "Financial Audit"],
  },
  {
    id: "ord-ncie-chap-accred-2025",
    orderNo: "Order No. NCIE/ECHO/2025/03",
    date: "February 10, 2025",
    effectiveDate: "Academic Year 2025-26",
    title: "Institutional Chapter Star Rating & Accreditation Framework Guidelines",
    description: "Executive directive outlining evaluation criteria (1 to 5 Star ratings) for college innovation cells, incentive schemes for top performing HEIs, and penalty terms for non-compliance.",
    category: "Institutional Guidelines",
    signedBy: "Head, Chapter Ratings & Quality Assurance",
    department: "Regional Ecosystem Division",
    fileUrl: "/chapters",
    fileSize: "Web Document",
    pages: 10,
    isUrgent: false,
    status: "Active",
    tags: ["Accreditation", "Star Rating", "HEI Evaluation"],
  }
];
