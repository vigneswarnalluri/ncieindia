export interface NoticeItem {
  id: string;
  noticeNo: string;
  title: string;
  date: string;
  category: "Applications" | "Recruitment" | "Fellowships" | "Policy Docs" | "Events" | "Public Announcements";
  description: string;
  issuingAuthority: string;
  fileUrl?: string;
  fileSize?: string;
  isNew?: boolean;
  isImportant?: boolean;
  tags?: string[];
}

export const NOTICES_DATA: NoticeItem[] = [
  {
    id: "ncie-dpr-2026",
    noticeNo: "NCIE-DPR-2026",
    date: "August 10, 2026",
    title: "Release of NCIE Detailed Project Report (DPR) for National Startup & Innovation Ecosystem",
    description: "Official Detailed Project Report (DPR) detailing the comprehensive structure, state-wide programs, funding allocations, and 2047 roadmap of the National Council for Innovation & Entrepreneurship.",
    category: "Policy Docs",
    issuingAuthority: "Office of the Executive Director",
    fileUrl: "/NCIE_DPR.pdf",
    fileSize: "1.2 MB",
    isNew: true,
    isImportant: true,
    tags: ["DPR", "Policy", "Viksit Bharat 2047", "Ecosystem"],
  },
  {
    id: "ncie-vb-2026-124",
    noticeNo: "Lt.No: 124/08/26/NCIE",
    date: "August 10, 2026",
    title: "Notice: Implementation of NCIE Activities under Viksit Bharat @2047 Innovation Mission in Affiliated HEIs",
    description: "Official directive notice for member colleges and universities to initiate student registrations, appoint Nodal Officers, establish Innovation & Entrepreneurship Development Centres (IEDCs), and facilitate Kalam Startup Validation.",
    category: "Policy Docs",
    issuingAuthority: "NCIE Central Secretariat",
    fileUrl: "/Lt_No_124_08_26_NCIE_Viksit_Bharat_2047_Innovation_Mission.pdf",
    fileSize: "856 KB",
    isNew: true,
    isImportant: true,
    tags: ["Viksit Bharat", "HEI Mandatory", "IEDC", "Kalam Validation"],
  },
  {
    id: "iic-int-2026-001",
    noticeNo: "IIC-INT-2026-001",
    date: "June 18, 2026",
    title: "NCIE Viksit Bharat 2047 Innovation Leadership Programs Registrations Open",
    description: "Enrolment opened for 3 specialized course-integrated certification tracks: Innovation & Technology Management, AI Business & Startup Innovation, and IP & Commercialization. One-time registration fee: ₹700 per course.",
    category: "Applications",
    issuingAuthority: "Academic Council & Skill Desk",
    fileUrl: "/NCIE_3_COURSES.pdf",
    fileSize: "150 KB",
    isNew: false,
    isImportant: true,
    tags: ["Courses", "Viksit Bharat", "Skill Certification"],
  },
  {
    id: "iic-cal-2025-147",
    noticeNo: "IIC-CAL-2025-147",
    date: "June 10, 2025",
    title: "Innovation India Council Annual Activity Calendar & Accreditation Guidelines 2025-26",
    description: "Publication of the official annual calendar for hackathons, regional star accreditation, quarterly reporting deadlines, and institutional evaluation metrics.",
    category: "Events",
    issuingAuthority: "National Innovation Rating Cell",
    fileUrl: "/Innovation_India_Council.pdf",
    fileSize: "3.1 MB",
    isNew: false,
    isImportant: false,
    tags: ["Annual Calendar", "Accreditation", "IIC Activities"],
  },
  {
    id: "iic-seed-2025-089",
    noticeNo: "IIC-SEED-2025-089",
    date: "May 22, 2025",
    title: "Startup Seed Funding Stage-1 Applications Open: ₹5,00,000 Equity-Free Grants",
    description: "Student startups and early-stage innovators are invited to apply for concept validation grants under the Kalam Seed Support Fund. Grants are non-dilutive and distributed in 3 milestone tranches.",
    category: "Applications",
    issuingAuthority: "NCIE Funding & Investment Cell",
    fileUrl: "/Kalam_Startup_Seed_Funding_Scheme.pdf",
    fileSize: "941 KB",
    isNew: false,
    isImportant: true,
    tags: ["Seed Funding", "Grants", "Student Startups"],
  },
  {
    id: "iic-incub-2025-063",
    noticeNo: "IIC-INCUB-2025-063",
    date: "April 15, 2025",
    title: "Institutional Incubation Support Applications: Grants up to ₹50 Lakhs for HEI Prototyping Labs",
    description: "Higher Educational Institutions registered under NCIE network can submit proposals for establishing maker spaces, fab labs, and startup incubators. Selected institutions receive capital & operational funding.",
    category: "Applications",
    issuingAuthority: "Infrastructure & Incubation Bureau",
    fileUrl: "/Institutional_Incubation_Development_Support_Scheme.pdf",
    fileSize: "950 KB",
    isNew: false,
    isImportant: false,
    tags: ["Incubation", "Lab Infrastructure", "HEI Grants"],
  },
  {
    id: "iic-fellow-2025-041",
    noticeNo: "IIC-FELLOW-2025-041",
    date: "March 28, 2025",
    title: "Innovation India National Student Fellowship 2025-26 Nominations",
    description: "Call for nominations for the prestigious 12-month Student Fellowship program. Fellows work directly with state innovation officers, industry leaders, and research labs with a monthly stipend of ₹15,000.",
    category: "Fellowships",
    issuingAuthority: "Fellowship & Leadership Board",
    fileUrl: "/programs",
    fileSize: "Web Portal",
    isNew: false,
    isImportant: false,
    tags: ["Fellowship", "Stipend", "Student Leadership"],
  },
  {
    id: "ncie-pub-2025-012",
    noticeNo: "NCIE-PUB-2025-012",
    date: "January 14, 2025",
    title: "Public Advisory: Verification of Authorized Regional Innovation Chapters & Official Communication Channels",
    description: "Official advisory issued to all stakeholders regarding verified chapter emails, bank account details for course registrations, and anti-fraud guidelines.",
    category: "Public Announcements",
    issuingAuthority: "Public Relations & Legal Cell",
    fileUrl: "/contact",
    fileSize: "Web Portal",
    isNew: false,
    isImportant: true,
    tags: ["Public Notice", "Advisory", "Verification"],
  }
];
