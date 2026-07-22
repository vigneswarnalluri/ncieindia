export interface Tranche {
  name: string;
  stage: string;
  amount: string;
  note?: string;
  trigger: string;
}

export interface Program {
  id: string;
  title: string;
  subtitle: string;
  category: "student" | "startup" | "institution" | "corporate";
  budget: string;
  duration: string;
  description: string;
  benefits: string[];
  courseCode?: string;
  tranches?: Tranche[];
  stages?: { title: string; desc: string }[];
  pdfUrl?: string;
  pdfName?: string;
}

export const PROGRAMS_DATA: Program[] = [
  // --- OFFICIAL 45-DAY CERTIFICATE COURSES (NCIE-IEDP) ---
  {
    id: "ncie-iedp-101",
    title: "Innovation, Design Thinking & Start-up Development",
    subtitle: "Course Code: NCIE-IEDP-101 | 45-Day National Certificate Programme",
    courseCode: "NCIE-IEDP-101",
    category: "student",
    budget: "60% Blended (Offline + Online + Practical)",
    duration: "45 Days (90 Hours) | 3 Credits",
    description: "National 45-day certificate course enabling engineering & science students to apply Design Thinking, empathy mapping, MVP prototyping, Lean Startup frameworks, and pitch decks for DPIIT recognition.",
    pdfUrl: "/NCIE_Student_Startup_Grants_Guidelines.pdf",
    pdfName: "NCIE-IEDP-101 Guidelines & Curriculum.pdf",
    benefits: [
      "3 Academic Credits (Recommended by NCIE Framework)",
      "Covers 5 Core Modules: Innovation Ecosystem, Design Thinking Sprints, Prototype Development, Lean Startup BMC, and Startup Launch",
      "Hands-on practical components: Customer Interviews, Wireframing, MVP Building, and Investor Pitch Deck",
      "Comprehensive evaluation: Attendance (10%), Assignments (20%), Practical Activities (20%), Prototype (20%), Demo Day Pitch (30%)"
    ]
  },
  {
    id: "ncie-iedp-102",
    title: "Emerging Technologies, Product Innovation & Entrepreneurship",
    subtitle: "Course Code: NCIE-IEDP-102 | 45-Day National Certificate Programme",
    courseCode: "NCIE-IEDP-102",
    category: "student",
    budget: "60% Blended (Offline + Online + Practical)",
    duration: "45 Days (90 Hours) | 3 Credits",
    description: "Advanced 45-day course focusing on commercializing AI/ML, IoT, Robotics, Cyber Security, Digital Twins, and branch-specific smart applications for CSE, ECE, Mechanical, EEE, Civil, and H&S streams.",
    pdfUrl: "/NCIE_Student_Startup_Grants_Guidelines.pdf",
    pdfName: "NCIE-IEDP-102 Guidelines & Curriculum.pdf",
    benefits: [
      "Branch-Specific Smart Tech Modules (AI, Embedded Systems, Smart Manufacturing, Smart Grids, Digital Infrastructure)",
      "Hands-on CAD modeling, simulation tools, AI tools, and product ideation workshops",
      "Go-to-Market strategies, product-market fit validation, and Start-up India Portal integration",
      "Capstone laboratory projects evaluated by national mentors and industry experts"
    ]
  },
  {
    id: "ncie-iedp-103",
    title: "Technology Commercialization, IPR & Business Model Innovation",
    subtitle: "Course Code: NCIE-IEDP-103 | 45-Day National Certificate Programme",
    courseCode: "NCIE-IEDP-103",
    category: "student",
    budget: "60% Blended (Offline + Online + Practical)",
    duration: "45 Days (90 Hours) | 3 Credits",
    description: "Specialized 45-day curriculum guiding student innovators from lab research to market commercialization through Technology Readiness Levels (TRL), IPR protection, and venture capital fundraising.",
    pdfUrl: "/NCIE_Student_Startup_Grants_Guidelines.pdf",
    pdfName: "NCIE-IEDP-103 Guidelines & Curriculum.pdf",
    benefits: [
      "Comprehensive IPR Coverage: Patents, Copyrights, Trademarks, Industrial Design, and Tech Transfer Licensing",
      "Business Model Innovation: Lean Canvas, Platform Business Models, and Subscription Revenue Architectures",
      "Startup Finance & Fundraising: Angel Investment, Venture Capital, CSR Funding, and Financial Projections",
      "Experiential Learning: Patent Search, Market Research, Financial Planning, and Investor Pitch Competition"
    ]
  },

  // --- CORE INSTITUTIONAL & STUDENT SCHEMES ---
  {
    id: "student-internships",
    title: "NCIE Viksit Bharat 2047 Innovation Leadership Programs",
    subtitle: "Structured national leadership framework across undergraduate sectors",
    category: "student",
    budget: "Paid stipends",
    duration: "2–6 months per course",
    description: "A structured national leadership framework established across 10 core sectors, ensuring that every undergraduate student in India gains real-time industry exposure and skill-based learning opportunities.",
    pdfUrl: "/NCIE_Viksit_Bharat_2047_Innovation_Leadership_Programmes.pdf",
    pdfName: "NCIE – Viksit Bharat 2047 Innovation Leadership Programmes.pdf",
    benefits: [
      "Real-time industry exposure and hands-on skill development",
      "Covers 10 core sectors (Engineering, Research, Finance, Agriculture, Healthcare, IT & AI, etc.)",
      "Paid, structured, and practical learning experiences to make students industry-ready"
    ]
  },
  {
    id: "student-fellowships",
    title: "Innovation India Student Fellowships",
    subtitle: "Advanced learning opportunities for selected research scholars",
    category: "student",
    budget: "Stipends & Research allowances",
    duration: "12-month cycle",
    description: "Advanced learning opportunities for selected student research scholars to work closely with national experts, serial innovators, and mentors on social impact and technology development projects.",
    pdfUrl: "/NCIE_Viksit_Bharat_2047_Innovation_Leadership_Programmes.pdf",
    pdfName: "Innovation India Student Fellowships Guidelines.pdf",
    benefits: [
      "Mentorship and direct guidance from industry and research experts",
      "Focus on solving critical social impact and technical problems",
      "Exposure to advanced laboratory and rapid prototyping ecosystems"
    ]
  },
  {
    id: "student-scholarships",
    title: "Student Annual Scholarships",
    subtitle: "Merit-based and need-based annual financial support",
    category: "student",
    budget: "Annual stipends",
    duration: "Annual allocation",
    description: "Annual merit-based and need-based scholarships provided to talented students from diverse and marginalized backgrounds, ensuring equal access to innovation and quality education opportunities.",
    pdfUrl: "/NCIE_Viksit_Bharat_2047_Innovation_Leadership_Programmes.pdf",
    pdfName: "Student Annual Scholarships Framework.pdf",
    benefits: [
      "Ensures accessibility and equal opportunities for students of all backgrounds",
      "Financial assistance to support educational and project expenses",
      "Pre-qualification for national-level innovation bootcamps"
    ]
  },
  {
    id: "student-startup-grants",
    title: "Student Startup Grants",
    subtitle: "Direct financial support for early-stage conceptual ideas",
    category: "startup",
    budget: "Prototype validation grants",
    duration: "6–12 months milestone cycle",
    description: "Selected student entrepreneurs receive direct financial support to develop and execute their startup ideas, helping them transition smoothly from concept to execution and validation.",
    pdfUrl: "/NCIE_Student_Startup_Grants_Guidelines.pdf",
    pdfName: "Rules, Regulations & Guidelines - NCIE Student Startup Grants Program.pdf",
    benefits: [
      "Equity-free financial support for raw material and tooling purchases",
      "Mentoring support to validate early proofs of concept (POC)",
      "Direct pathway to national pre-incubation cells and labs"
    ]
  },
  {
    id: "startup-seed-funding",
    title: "Startup Seed Funding",
    subtitle: "Up to ₹5,00,000 equity-free grant per student startup",
    category: "startup",
    budget: "₹5,00,000 per startup",
    duration: "12–24 months milestone cycle",
    description: "A structured seed funding program offering up to ₹5,00,000 per student startup without requiring student equity or ownership dilution. This ensures young innovators can focus on building their ventures without financial pressure.",
    pdfUrl: "/Kalam_Startup_Seed_Funding_Scheme.pdf",
    pdfName: "Dr. A.P.J. Abdul Kalam Startup Validation & Seed Funding Scheme.pdf",
    benefits: [
      "Equity-free seed funding of up to ₹5 Lakhs per startup",
      "Released in five structured stages based on progress and performance",
      "Dedicated entrepreneurship support including legal, business setup, and IP filing guidance"
    ],
    stages: [
      { title: "Stage 1: Concept Validation", desc: "Release of 10% fund upon successful screening and approval of prototype plans." },
      { title: "Stage 2: MVP Development", desc: "Release of 25% fund for building the Minimum Viable Product and early testing." },
      { title: "Stage 3: Pilot Run & Testing", desc: "Release of 25% fund for launching pilot trials and gathering feedback." },
      { title: "Stage 4: Legal & IP Setup", desc: "Release of 20% fund to support legal incorporation and patent/IP filing." },
      { title: "Stage 5: Scale & Market Launch", desc: "Release of final 20% fund upon meeting the pre-commercial scaling milestones." }
    ],
    tranches: [
      {
        name: "Tranche 1",
        stage: "Stage 1: Explore → Idea",
        amount: "₹10,000",
        trigger: "Released after idea screening and selection"
      },
      {
        name: "Tranche 2",
        stage: "Stage 2: Idea → Ideation",
        amount: "₹25,000 × shortlisted startups (based on performance)",
        trigger: "Released after concept validation and feasibility approval"
      },
      {
        name: "Tranche 3",
        stage: "Stage 3: Ideation → Prototype",
        amount: "₹75,000 × selected startups",
        trigger: "Released after ideation review and prototype approval"
      },
      {
        name: "Tranche 4",
        stage: "Stage 4: Prototype → Commercialization",
        amount: "₹1,50,000 × top-performing startups",
        trigger: "Released after prototype validation and market readiness"
      },
      {
        name: "Tranche 5",
        stage: "Stage 5: Commercialization → Establishment",
        amount: "₹2,40,000 × final selected startups",
        trigger: "Released after final establishment milestone approval"
      }
    ]
  },
  {
    id: "institutional-incubation-support",
    title: "Institutional Incubation & Development Support",
    subtitle: "dedicated funding ranging from ₹20 Lakhs to ₹50 Lakhs",
    category: "institution",
    budget: "₹20 Lakhs to ₹50 Lakhs",
    duration: "12–18 months infrastructure cycle",
    description: "Selected and recognized educational institutions are provided with dedicated funding support strictly allocated for building incubation centers, innovation labs, and entrepreneurship infrastructure.",
    pdfUrl: "/Institutional_Incubation_Development_Support_Scheme.pdf",
    pdfName: "Institutional Incubation & Development Support Scheme (IIDSS).pdf",
    benefits: [
      "Financial grants up to ₹50 Lakhs for setup and tooling",
      "Strict allocation for rapid prototyping labs, makerspaces, and incubation offices",
      "Integrates campus innovators into a unified regional incubation network"
    ]
  },
  {
    id: "csr-rural-support",
    title: "CSR Support for Rural & Semi-Urban Institutions",
    subtitle: "Facilitating corporate CSR partnerships for regional development",
    category: "corporate",
    budget: "CSR capital matching",
    duration: "Annual alignment cycle",
    description: "Innovation India facilitates CSR partnerships for reputed institutions and organizations to promote innovation ecosystems in rural and semi-urban areas, fostering local student startups and capacity building.",
    pdfUrl: "/Institutional_Incubation_Development_Support_Scheme.pdf",
    pdfName: "CSR Support Guidelines for Rural Institutions.pdf",
    benefits: [
      "Direct connection with corporate social responsibility (CSR) funds",
      "Empowerment of tier-2 and tier-3 colleges with funding and mentorship",
      "Strengthening of localized grassroots ecosystems to solve regional challenges"
    ]
  },
  {
    id: "iic-recognition-program",
    title: "Innovation India Recognition Program",
    subtitle: "Formal benchmarking framework for high-performing institutions",
    category: "institution",
    budget: "Accreditation & Rewards",
    duration: "Annual evaluation",
    description: "Institutions and organizations contributing significantly to innovation, entrepreneurship, and student development are formally recognized under the Innovation India Recognition Framework to encourage excellence.",
    pdfUrl: "/Institutional_Incubation_Development_Support_Scheme.pdf",
    pdfName: "Innovation India Recognition Framework.pdf",
    benefits: [
      "Formal national recognition and star accreditation under the framework",
      "Benchmark metrics to improve student innovation output year-on-year",
      "Preferential eligibility for special infrastructure grants and pilot allocations"
    ]
  },
  {
    id: "free-training-program",
    title: "Free Entrepreneurship Training Programs",
    subtitle: "Fully sponsored entrepreneurship education and workshops",
    category: "student",
    budget: "Fully sponsored",
    duration: "Continuous availability",
    description: "Institutions are supported in delivering free entrepreneurship education, skill development workshops, and startup training programs for students, ensuring accessibility to quality innovation learning for all.",
    pdfUrl: "/NCIE_Student_Startup_Grants_Guidelines.pdf",
    pdfName: "Free Entrepreneurship Training Program Guidelines.pdf",
    benefits: [
      "Access to structured entrepreneurship courses at no cost to students",
      "Practical workshops in design thinking, marketing, and business planning",
      "Direct mentorship from seasoned founders and incubation experts"
    ]
  }
];
