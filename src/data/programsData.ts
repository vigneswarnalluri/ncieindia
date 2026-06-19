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
  tranches?: Tranche[];
  stages?: { title: string; desc: string }[];
}

export const PROGRAMS_DATA: Program[] = [
  {
    id: "student-internships",
    title: "10-Core Paid Internship Ecosystem",
    subtitle: "Structured national internship framework across undergraduate sectors",
    category: "student",
    budget: "Paid stipends",
    duration: "2–6 months per course",
    description: "A structured national internship framework established across 10 core sectors, ensuring that every undergraduate student in India gains real-time industry exposure and skill-based learning opportunities.",
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
    category: "institution",
    budget: "CSR capital matching",
    duration: "Annual alignment cycle",
    description: "Innovation India facilitates CSR partnerships for reputed institutions and organizations to promote innovation ecosystems in rural and semi-urban areas, fostering local student startups and capacity building.",
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
    benefits: [
      "Access to structured entrepreneurship courses at no cost to students",
      "Practical workshops in design thinking, marketing, and business planning",
      "Direct mentorship from seasoned founders and incubation experts"
    ]
  }
];
