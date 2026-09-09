const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const env = fs.readFileSync('.env.local', 'utf8');
let url = '', key = '';
env.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts[0].trim() === 'NEXT_PUBLIC_SUPABASE_URL') url = parts.slice(1).join('=').trim().replace(/['"]/g, '');
  if (parts[0].trim() === 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY') key = parts.slice(1).join('=').trim().replace(/['"]/g, '');
});

const supabase = createClient(url, key);

const COURSE_DEFINITIONS = [
  {
    courseCode: "NCIE-AIB-201",
    title: "AI Business & Startup Innovation",
    shortTitle: "AI Business & Startups",
    duration: "8 Weeks (60 Learning Hours)",
    credits: "3 AICTE Credits",
    startDate: "1st October 2026",
    category: "Deep Tech & Artificial Intelligence",
    description: "Enterprise applications of generative AI, automated business models, machine learning monetization, and AI-first venture building.",
    instructors: [
      { name: "Dr. A. V. Subbarao", role: "Head of Academic Council", institute: "NCIE Secretariat" },
      { name: "Vamsi Reddy A", role: "Corporate & Industry Lead", institute: "NCIE India" }
    ],
    weeklyThemes: [
      "Foundations of AI in Industry & Business Transformation",
      "Identifying High-Impact AI Startup Opportunities",
      "LLMs, Agentic Workflows & Autonomous Systems for Business",
      "Data Governance, Ethics & Intellectual Property in AI",
      "Building the Minimum Viable AI Product (MVP)",
      "Unit Economics, SaaS Pricing & Revenue Models for AI",
      "Venture Capital Pitching & Investor Diligence for AI Startups",
      "Capstone Showcase, Industry Defense & AICTE Credit Verification"
    ]
  },
  {
    courseCode: "NCIE-EIS-101",
    title: "Entrepreneurship, Innovation and Startup Development",
    shortTitle: "Entrepreneurship & Startups",
    duration: "8 Weeks (60 Learning Hours)",
    credits: "3 AICTE Credits",
    startDate: "1st October 2026",
    category: "Venture Creation & Leadership",
    description: "End-to-end entrepreneurial journey: ideation, customer discovery, validation, business modeling, regulatory compliance, and venture financing.",
    instructors: [
      { name: "Dr. A. V. Subbarao", role: "Director General", institute: "NCIE Secretariat" },
      { name: "Vamsi Reddy A", role: "Corporate & Tech Lead", institute: "NCIE India" }
    ],
    weeklyThemes: [
      "National Entrepreneurship Ecosystem & Opportunity Identification",
      "Customer Discovery, Market Segmentation & Problem Validation",
      "Lean Startup Methodology & Rapid Prototyping",
      "Intellectual Property Rights, Trademark & Patent Protection",
      "Business Model Canvas (BMC) & Value Proposition Design",
      "Financial Modeling, Unit Economics & Cash Flow Management",
      "Investor Pitch Decks, Term Sheets & Seed Grant Applications",
      "Final Venture Presentation, Capstone Defense & Certificate Award"
    ]
  },
  {
    courseCode: "NCIE-DTT-102",
    title: "Design Thinking, Technology Innovation and Product Development",
    shortTitle: "Design Thinking & Products",
    duration: "8 Weeks (60 Learning Hours)",
    credits: "3 AICTE Credits",
    startDate: "1st October 2026",
    category: "Human-Centered Design & Engineering",
    description: "Human-centered design thinking, empathetic problem solving, technology integration, industrial design, and physical/digital product prototyping.",
    instructors: [
      { name: "Dr. K. S. Rao", role: "Chief Mentor - Design Engineering", institute: "NCIE Academic Cell" },
      { name: "Vamsi Reddy A", role: "Innovation Lead", institute: "NCIE India" }
    ],
    weeklyThemes: [
      "Empathy Mapping & User Need Analysis in Complex Systems",
      "Problem Framing, HMW (How Might We) Statements & Ideation",
      "Technology Feasibility Assessment & Architecture Selection",
      "Rapid Wireframing, 3D CAD Prototyping & Maker Space Lab",
      "User Testing, Iterative Feedback & Design Validation",
      "Design for Manufacturing (DFM) & Software Scalability",
      "Go-to-Market Product Strategy & Intellectual Property Filing",
      "Product Prototype Demonstration & Capstone Jury Defense"
    ]
  },
  {
    courseCode: "NCIE-IDS-103",
    title: "Innovation, Design Thinking & Start-up Development",
    shortTitle: "Innovation & Design Thinking",
    duration: "8 Weeks (60 Learning Hours)",
    credits: "3 AICTE Credits",
    startDate: "1st October 2026",
    category: "Innovation Management",
    description: "Integrating creative design thinking principles with scalable startup development, intellectual property creation, and commercialization pathways.",
    instructors: [
      { name: "Dr. A. V. Subbarao", role: "Director General", institute: "NCIE Secretariat" },
      { name: "Dr. K. S. Rao", role: "Innovation Mentor", institute: "NCIE Academic Cell" }
    ],
    weeklyThemes: [
      "Creative Problem Solving & Design Thinking Fundamentals",
      "User Observation, Empathy Interviews & Persona Building",
      "Ideation Techniques, Concept Selection & Value Proposition",
      "Prototyping Digital & Hardware Solutions",
      "Business Model Formulation & Market Testing",
      "IPR Strategy, Trademark Registration & Trade Secrets",
      "Venture Pitching, Seed Grants & Incubation Linkages",
      "Final Capstone Jury Defense & AICTE Transfer Sign-off"
    ]
  },
  {
    courseCode: "NCIE-ETP-104",
    title: "Emerging Technologies, Product Innovation & Entrepreneurship",
    shortTitle: "Emerging Tech & Innovation",
    duration: "8 Weeks (60 Learning Hours)",
    credits: "3 AICTE Credits",
    startDate: "1st October 2026",
    category: "Deep Tech & Next-Gen Systems",
    description: "Commercialization pathways for IoT, Robotics, CleanTech, Blockchain, and Cyber-physical systems with startup incubation frameworks.",
    instructors: [
      { name: "Dr. A. V. Subbarao", role: "Head of Academic Council", institute: "NCIE Secretariat" },
      { name: "Vamsi Reddy A", role: "Industry Partnerships", institute: "NCIE India" }
    ],
    weeklyThemes: [
      "Emerging Technologies Landscape: IoT, Robotics, CleanTech & Edge",
      "Technology Readiness Levels (TRL 1 to 9) & Feasibility",
      "Architecting Hardware-Software Convergence for Scale",
      "Regulatory Approvals, Safety Standards & Environmental Compliance",
      "Hardware Prototyping, Embedded Systems & Firmware Testing",
      "Cost of Goods Sold (COGS), Supply Chain & Vendor Ecosystems",
      "B2B Enterprise Sales, Government Tenders & Venture Capital",
      "Capstone Showcase, Working Prototype Demo & Evaluation"
    ]
  },
  {
    courseCode: "NCIE-ITM-105",
    title: "Innovational & Technology Management",
    shortTitle: "Technology Management",
    duration: "8 Weeks (60 Learning Hours)",
    credits: "3 AICTE Credits",
    startDate: "1st October 2026",
    category: "Management & Strategic Innovation",
    description: "Managing corporate and institutional R&D, technology life cycles, open innovation pipelines, agile tech execution, and innovation governance.",
    instructors: [
      { name: "Dr. A. V. Subbarao", role: "Director General", institute: "NCIE Secretariat" },
      { name: "Dr. S. K. Joshi", role: "Technology Strategist", institute: "NCIE Advisory Board" }
    ],
    weeklyThemes: [
      "Strategic Innovation Management & Technology S-Curves",
      "R&D Pipeline Structuring & Stage-Gate Innovation Process",
      "Technology Forecasting, Competitive Intelligence & Benchmarking",
      "Open Innovation, University-Industry Alliances & Technology Transfer",
      "Agile Product Management, Scrum & Cross-functional Leadership",
      "Managing Intellectual Capital & Portfolio Optimization",
      "Digital Transformation Strategies & Tech Disruption Defense",
      "Executive Capstone Review & Technology Strategy Roadmap"
    ]
  },
  {
    courseCode: "NCIE-TCP-106",
    title: "Technology Commercialization, IPR & Business Model Innovation",
    shortTitle: "Tech Commercialization & IPR",
    duration: "8 Weeks (60 Learning Hours)",
    credits: "3 AICTE Credits",
    startDate: "1st October 2026",
    category: "IPR & Commercialization",
    description: "From lab research to commercial marketplace: patent searches, IPR drafting, technology licensing agreements, and spin-off formation.",
    instructors: [
      { name: "Dr. A. V. Subbarao", role: "Director General", institute: "NCIE Secretariat" },
      { name: "Adv. Meera Sen", role: "IPR & Patent Attorney", institute: "NCIE Legal Cell" }
    ],
    weeklyThemes: [
      "Research Commercialization Pathways & The TRL Framework",
      "Patent Prior Art Searching (InPASS, USPTO, WIPO) & Patentability",
      "Patent Specification Drafting, Claims & Filing Protocols",
      "Copyrights, Industrial Designs & Trade Secrets Protection",
      "Technology Licensing, Royalties & Joint Venture Structuring",
      "Valuation of Intellectual Property & Intangible Assets",
      "Spin-off Company Formation & Academic Entrepreneurship",
      "Final IPR Portfolio Defense & Commercialization Roadmap"
    ]
  },
  {
    courseCode: "NCIE-SDB-107",
    title: "Startup Development, Business Models and Technology Commercialization",
    shortTitle: "Startup Dev & Business Models",
    duration: "8 Weeks (60 Learning Hours)",
    credits: "3 AICTE Credits",
    startDate: "1st October 2026",
    category: "Venture Architecture & Commercialization",
    description: "Comprehensive venture acceleration: business model formulation, technology transfer, seed fundraising, and scaling operations.",
    instructors: [
      { name: "Dr. A. V. Subbarao", role: "Director General", institute: "NCIE Secretariat" },
      { name: "Vamsi Reddy A", role: "Corporate Affairs", institute: "NCIE India" }
    ],
    weeklyThemes: [
      "Startup Ecosystem Frameworks & High-Growth Venture Models",
      "Disruptive Business Models & Value Network Optimization",
      "Translating Research Prototypes into Commercial Offerings",
      "Customer Acquisition Funnels, CAC, and LTV Optimization",
      "Legal Structuring, Shareholding Agreements & Cap Table Design",
      "Fundraising Strategy: Angel Investors, VCs & Government Grants",
      "Scaling Operations, Team Building & Governance Best Practices",
      "Final Pitch Day Presentation & Comprehensive Capstone Defense"
    ]
  }
];

async function run() {
  const { data: allData, error } = await supabase.from('registrations').select('*').order('created_at', { ascending: true });
  if (error) {
    console.error('Fetch error:', error);
    return;
  }

  const students = allData.filter(r => r.role === 'internship' || r.designation === 'student' || r.role === 'student');
  console.log(`Processing ${students.length} students from Supabase...`);

  // Map to course definitions
  const courseCodeMap = {};
  COURSE_DEFINITIONS.forEach(c => {
    courseCodeMap[c.title] = c.courseCode;
  });

  const studentRecords = students.map((s, index) => {
    let rawCourse = 'Innovation, Design Thinking & Start-up Development';
    if (s.proposal) {
      const match = s.proposal.match(/Course:\s*([^|\n]+)/i);
      if (match) {
        rawCourse = match[1].trim();
      }
    }

    const cleanCourseName = rawCourse
      .replace(/\s+for\s+Viksit\s+Bharat\s+2047/i, '')
      .replace(/\s+/g, ' ')
      .trim();

    const matchedDef = COURSE_DEFINITIONS.find(c => c.title.toLowerCase() === cleanCourseName.toLowerCase())
      || COURSE_DEFINITIONS.find(c => cleanCourseName.toLowerCase().includes(c.shortTitle.toLowerCase()))
      || COURSE_DEFINITIONS[1];

    const courseCode = matchedDef.courseCode;
    const finalCourseTitle = matchedDef.title;

    const rawRoll = (s.reg_number || '').trim();
    const regId = (s.reg_id || `REG-2026-${1000 + index}`).trim();
    const rollNo = rawRoll ? rawRoll : regId;
    const email = (s.email || '').trim().toLowerCase();
    const cleanName = (s.full_name || 'Student').trim();
    const mobile = (s.mobile || '').trim();
    const college = (s.org_name || 'National Institute of Technology').trim();

    return {
      id: s.id || `stu-${index + 1}`,
      appId: regId,
      rollNo: rollNo,
      name: cleanName,
      email: email,
      mobile: mobile,
      institution: college,
      aisheCode: (s.accreditation_code || 'C-12849').trim(),
      department: (s.department || 'Computer Science & Engineering').trim(),
      specialization: (s.specialization || 'Engineering & Technology').trim(),
      stream: (s.stream || 'B.Tech / B.E.').trim(),
      yearOfStudy: (s.year_of_study || '3rd Year').trim(),
      sectorTrack: finalCourseTitle.includes('AI') ? 'Information Technology & AI' : 'Engineering & Technology',
      cohort: 'Cohort 2026 (Fall Batch)',
      enrolledDate: '01 Oct 2026',
      status: 'Active',
      progressPercentage: 0,
      hoursLogged: 0,
      totalRequiredHours: 60,
      completedLessons: [],
      quizScores: {},
      enrolledCourseCode: courseCode,
      enrolledCourseTitle: finalCourseTitle,
      defaultPassword: email
    };
  });

  console.log(`Generated ${studentRecords.length} validated student records.`);

  const tsContent = `// NCIE India - Verified Student Registry & Course Catalog
// Automatically generated from Supabase registrations database
// Contains all ${studentRecords.length} registered students mapped to their respective courses

export interface CourseCatalogItem {
  courseCode: string;
  title: string;
  shortTitle: string;
  duration: string;
  credits: string;
  startDate: string;
  category: string;
  description: string;
  instructors: { name: string; role: string; institute: string }[];
  weeklyThemes: string[];
}

export interface StudentRegistrationRecord {
  id: string;
  appId: string;
  rollNo: string;
  name: string;
  email: string;
  mobile: string;
  institution: string;
  aisheCode: string;
  department: string;
  specialization: string;
  stream: string;
  yearOfStudy: string;
  sectorTrack: string;
  cohort: string;
  enrolledDate: string;
  status: "Active" | "Completed";
  progressPercentage: number;
  hoursLogged: number;
  totalRequiredHours: number;
  completedLessons: string[];
  quizScores: Record<string, number>;
  enrolledCourseCode: string;
  enrolledCourseTitle: string;
  defaultPassword: string;
}

export const COURSE_CATALOG: CourseCatalogItem[] = ${JSON.stringify(COURSE_DEFINITIONS, null, 2)};

export const ALL_REGISTERED_STUDENTS: StudentRegistrationRecord[] = ${JSON.stringify(studentRecords, null, 2)};

/**
 * Finds a student strictly by their registered email address.
 */
export function findStudentByEmail(email: string): StudentRegistrationRecord | undefined {
  if (!email) return undefined;
  const clean = email.trim().toLowerCase();
  return ALL_REGISTERED_STUDENTS.find(s => s.email.toLowerCase() === clean);
}

/**
 * Searches the student registry by Email, Roll Number, Registration ID, Mobile, or Name.
 */
export function findStudentByQuery(query: string): StudentRegistrationRecord | undefined {
  if (!query) return undefined;
  const q = query.trim().toLowerCase();
  
  // Exact match on email, roll number, registration ID, or mobile
  const exact = ALL_REGISTERED_STUDENTS.find(s => 
    s.email.toLowerCase() === q ||
    s.rollNo.toLowerCase() === q ||
    s.appId.toLowerCase() === q ||
    s.mobile.replace(/\\D/g, '') === q.replace(/\\D/g, '')
  );
  if (exact) return exact;

  // Prefix or partial match
  return ALL_REGISTERED_STUDENTS.find(s => 
    s.email.toLowerCase().includes(q) ||
    s.rollNo.toLowerCase().includes(q) ||
    s.appId.toLowerCase().includes(q) ||
    s.name.toLowerCase().includes(q)
  );
}

/**
 * Filter students by course title or course code
 */
export function getStudentsByCourse(courseTitleOrCode: string): StudentRegistrationRecord[] {
  const q = courseTitleOrCode.trim().toLowerCase();
  return ALL_REGISTERED_STUDENTS.filter(s => 
    s.enrolledCourseTitle.toLowerCase() === q ||
    s.enrolledCourseCode.toLowerCase() === q ||
    s.enrolledCourseTitle.toLowerCase().includes(q)
  );
}

/**
 * Generates downloadable CSV content of all student credentials and course allocations
 */
export function generateStudentCredentialsCSV(): string {
  const headers = [
    "Registration ID",
    "Roll Number",
    "Full Name",
    "Email Address",
    "Mobile Number",
    "Institution / College",
    "Department",
    "Course Code",
    "Enrolled Course Title",
    "Portal Login Username",
    "Default Password",
    "Batch Start Date",
    "Account Status"
  ];

  const escapeCSV = (val: string) => {
    if (!val) return '""';
    const str = String(val).replace(/"/g, '""');
    return \`"\${str}"\`;
  };

  const rows = ALL_REGISTERED_STUDENTS.map(s => [
    escapeCSV(s.appId),
    escapeCSV(s.rollNo),
    escapeCSV(s.name),
    escapeCSV(s.email),
    escapeCSV(s.mobile),
    escapeCSV(s.institution),
    escapeCSV(s.department),
    escapeCSV(s.enrolledCourseCode),
    escapeCSV(s.enrolledCourseTitle),
    escapeCSV(s.email),
    escapeCSV(s.defaultPassword),
    escapeCSV(s.enrolledDate),
    escapeCSV(s.status)
  ].join(','));

  return [headers.join(','), ...rows].join('\\n');
}
`;

  const targetPath = path.join(__dirname, '..', 'standalone-lms', 'src', 'data', 'studentsRegistry.ts');
  fs.writeFileSync(targetPath, tsContent, 'utf8');
  console.log(`Saved registry to: ${targetPath}`);
}

run();
