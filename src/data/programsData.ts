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
    id: "smart-india-hackathon",
    title: "Smart India Hackathon (SIH)",
    subtitle: "World's largest open innovation platform for students",
    category: "student",
    budget: "Prize pool ₹1,00,000+ per team",
    duration: "36-hour hackathon format",
    description: "SIH is a nationwide initiative to provide students a platform to solve pressing problems faced by government ministries, departments, PSUs, and industries. It fosters a culture of product innovation and problem-solving mindset.",
    benefits: [
      "Cash prizes of ₹1 Lakh+ for winning teams at each nodal centre",
      "Direct interface with problem statement owners from Central Ministries & PSUs",
      "Winning solutions considered for pilot deployment by respective ministries",
    ],
    stages: [
      { title: "Stage 1: Problem Statement Registration", desc: "Ministries, PSUs, and industries submit problem statements on the SIH portal. Teams from IIC-registered institutions apply." },
      { title: "Stage 2: Idea Submission & Screening", desc: "Teams submit initial solutions. Shortlisted teams invited to participate in the 36-hour grand finale hackathon." },
      { title: "Stage 3: Grand Finale", desc: "Teams build and present working solutions to a jury at nodal centres. Winners receive cash prizes and recognition." },
    ]
  },
  {
    id: "iic-network",
    title: "Institution's Innovation Council (IIC)",
    subtitle: "Pan-India institutional innovation network — 16,000+ HEIs",
    category: "institution",
    budget: "Activity-based grants & incentives",
    duration: "Annual cycle (IIC 6.0: 2024-25)",
    description: "IICs are established within Higher Education Institutions in coordination with AICTE to systematically foster innovation and startup activities. 16,000+ IICs are active and rated annually on a 1–5 star system.",
    benefits: [
      "Annual star-rating (1–5 stars) with rewards for top-performing IICs",
      "Access to MoE Innovation Cell resources, toolkits, and mentor networks",
      "Preferential eligibility for SIH, KAPILA, YUKTI, and IDE Bootcamp programs",
    ],
    stages: [
      { title: "Step 1: IIC Registration", desc: "Institution nominates a SPOC and registers on iic.mic.gov.in with complete institutional details." },
      { title: "Step 2: Annual Activity Calendar", desc: "IIC conducts mandatory activities — idea competitions, workshops, bootcamps, hackathons — and earns activity points." },
      { title: "Step 3: Annual Star Rating", desc: "MoE evaluates IIC performance and assigns 1–5 star rating. Top-rated IICs receive recognition and preferential grant access." },
    ]
  },
  {
    id: "kapila",
    title: "KAPILA — Kalam Program for IP Literacy",
    subtitle: "IP awareness & patent filing support for HEIs",
    category: "student",
    budget: "Patent filing fee reimbursement",
    duration: "Year-round (quarterly drives)",
    description: "KAPILA (Kalam Program for IP Literacy and Awareness) is a national initiative to spread awareness about Intellectual Property rights and support patent filing within Higher Education Institutions. Faculty and students are trained on IP basics and provided filing support.",
    benefits: [
      "IP literacy workshops and training sessions in IIC institutions",
      "Patent filing fee reimbursement for faculty and student innovators",
      "Access to national patent data and prior art search tools",
    ],
    stages: [
      { title: "Step 1: IP Awareness Workshop", desc: "KAPILA-certified trainer conducts IP basics, patent search, and filing process workshop at the institution." },
      { title: "Step 2: Innovation Disclosure", desc: "Faculty or student files a formal invention disclosure form; screened for patentability by IP expert panel." },
      { title: "Step 3: Patent Filing Support", desc: "Selected innovations receive fee reimbursement and expert assistance through the patent filing process." },
    ]
  },
  {
    id: "yukti",
    title: "YUKTI National Innovation Repository",
    subtitle: "National database of academic innovations & startups",
    category: "startup",
    budget: "Platform access + mentoring support",
    duration: "Continuous (YUKTI 3.0 live)",
    description: "YUKTI (Young India Combating COVID with Knowledge, Technology and Innovation) is a national digital repository to scout, register, and commercially scale innovations and startups from HEIs. 1,00,000+ innovations registered; 10,050+ startups mentored.",
    benefits: [
      "National visibility for registered innovations and student startups",
      "Connect with investors, incubators, and industry partners via YUKTI portal",
      "State-wise innovation leaderboard and IIC performance benchmarking",
    ],
  },
  {
    id: "ide-bootcamp",
    title: "IDE Bootcamp — Innovation, Design & Entrepreneurship",
    subtitle: "Residential bootcamps to nurture student innovators",
    category: "student",
    budget: "Fully funded (travel & accommodation covered)",
    duration: "5–7 Day residential bootcamps",
    description: "IDE Bootcamps are residential immersive programs designed to nurture early-stage student innovators. Bootcamps are held at IITs, IIMs, and partner institutions. Participants receive design thinking, lean startup, and business modelling mentoring.",
    benefits: [
      "Fully funded residential experience at IITs / IIMs (travel + stay)",
      "Intensive mentoring by industry experts, VCs, and serial entrepreneurs",
      "Top bootcamp teams gain direct seed funding access and incubation support",
    ],
    stages: [
      { title: "Stage 1: Application & Screening", desc: "Students apply via IIC portal with a brief innovation pitch. Shortlisted candidates receive bootcamp invitation." },
      { title: "Stage 2: Residential Bootcamp", desc: "5–7 day immersive program: design thinking, prototyping, business modelling, and investor pitch workshops." },
      { title: "Stage 3: Demo Day", desc: "Teams present to a jury of investors and industry leaders. Top teams selected for incubation and seed support." },
    ]
  },
  {
    id: "udyamotsav",
    title: "Udyamotsav & NISP Implementation",
    subtitle: "National startup festival & HEI startup policy mandate",
    category: "institution",
    budget: "Institution grants under NISP framework",
    duration: "Annual event + ongoing NISP mandate",
    description: "Udyamotsav is an annual national event to celebrate, support, and promote startups from academic institutions. The National Innovation and Start-up Policy (NISP) mandates all HEIs to create structural startup support including pre-incubation cells, IP units, and seed fund access.",
    benefits: [
      "NISP compliance unlocks grant eligibility for IIC institutions",
      "Annual Udyamotsav provides national showcase platform for student startups",
      "Structural support mandate: pre-incubation cells, IP units, and seed fund access",
    ],
    stages: [
      { title: "Step 1: NISP Adoption", desc: "Institution formally adopts and notifies the National Innovation & Start-up Policy (NISP) for its students and faculty." },
      { title: "Step 2: Infrastructure Setup", desc: "HEI establishes pre-incubation facility, IP Cell, and Entrepreneurship Development Cell per NISP guidelines." },
      { title: "Step 3: Udyamotsav Participation", desc: "Registered student startups participate in annual Udyamotsav showcase, gaining visibility and investor connections." },
    ]
  },
  {
    id: "nidhi-cis",
    title: "NIDHI College Innovation (NIDHI-CIS)",
    subtitle: "Prototype validation grants for student innovators",
    category: "student",
    budget: "Prototype validation grants up to ₹5 Lakh",
    duration: "12–18 month milestone cycle",
    description: "NIDHI College Innovation (NIDHI-CIS) is a national initiative to support undergraduate and postgraduate student teams in validating their proofs of concept. Selected teams receive prototype development funding, access to fabrication facilities, and commercialization mentoring.",
    benefits: [
      "Equity-free prototype development grants up to ₹5,00,000",
      "Dedicated technical mentoring from NCIE academic and industry networks",
      "Direct fast-track nomination to regional NCIE incubation centers",
    ],
    stages: [
      { title: "Step 1: Application Screening", desc: "Submission of project proposal, POC documentation, and endorsement letter from HEI Chapter." },
      { title: "Step 2: Prototyping Phase", desc: "Milestone-linked disbursement of funds to build and test the prototype." },
      { title: "Step 3: Demo Day & Mentorship", desc: "Presentation of the working prototype to the evaluation panel and onboarding to a partner incubator." },
    ]
  },
  {
    id: "seed-pipeline",
    title: "Seed Capital Pipeline",
    subtitle: "Pre-seed and seed-stage funding for academic startups",
    category: "startup",
    budget: "Equity-free setup allowances up to ₹25 Lakh",
    duration: "24-month startup incubator program",
    description: "The Seed Capital Pipeline provides critical funding to early-stage student and faculty startups emerging from NCIE institutional chapters. It bridges the gap between proof of concept and market-ready MVP, ensuring startups have the runway to scale.",
    benefits: [
      "Seed funding up to ₹25,00,000 for infrastructure, hiring, and pilot trials",
      "Free co-working space and legal assistance at NCIE-affiliated hubs",
      "Quarterly investor pitch sessions with angel networks and venture funds",
    ],
    stages: [
      { title: "Step 1: Pitch Deck Screening", desc: "Startups present business plans and MVP demonstration to the evaluation committee." },
      { title: "Step 2: Incubation Agreement", desc: "Signing of formal incubation terms and milestone plans with the partner center." },
      { title: "Step 3: Scale & Fundraising", desc: "Release of seed tranches linked to business growth, revenue, or product milestones." },
    ]
  },
  {
    id: "makerspace-empowerment",
    title: "Makerspace Fabrication Program",
    subtitle: "STEM lab setup and fabrication grants for institutional chapters",
    category: "institution",
    budget: "STEM lab setup grants up to ₹50 Lakh",
    duration: "Annual infrastructure development cycle",
    description: "The Makerspace Fabrication Program provides capital grants to accredited Higher Education Institutions to build advanced prototyping, rapid manufacturing, and hardware verification laboratories on campus.",
    benefits: [
      "Infrastructure grants up to ₹50,00,000 for purchasing 3D printers, CNC machinery, and electronic benches",
      "Standardized design blueprints and curriculum integration support",
      "National certification and inter-makerspace collaborative portal access",
    ],
    stages: [
      { title: "Step 1: Infrastructure Proposals", desc: "HEIs submit space specifications, equipment requirements, and operational plans." },
      { title: "Step 2: Lab Setup & Audit", desc: "Disbursement of equipment procurement funds followed by NCIE technical site inspection." },
      { title: "Step 3: Launch & Certification", desc: "Makerspace becomes operational, integrating with local student ideation and hackathon programs." },
    ]
  },
];
