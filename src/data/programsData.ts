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
  // Rich curriculum data fields
  courseObjectives?: string[];
  courseOutcomes?: string[];
  syllabusModules?: { title: string; duration?: string; topics: string[]; activity?: string }[];
  assessmentPattern?: { component: string; marks: number }[];
  recommendedSoftware?: string[];
  referenceBooks?: string[];
  pedagogy?: string[];
  textBooks?: string[];
  webResources?: string[];
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
    pdfUrl: "/NCIE_3_COURSES.pdf",
    pdfName: "NCIE_3_COURSES.pdf",
    benefits: [
      "3 Academic Credits (Recommended by NCIE Framework)",
      "Covers 5 Core Modules: Innovation Ecosystem, Design Thinking Sprints, Prototype Development, Lean Startup BMC, and Startup Launch",
      "Hands-on practical components: Customer Interviews, Wireframing, MVP Building, and Investor Pitch Deck",
      "Comprehensive evaluation: Attendance (10%), Assignments (20%), Practical Activities (20%), Prototype (20%), Demo Day Pitch (30%)"
    ],
    courseObjectives: [
      "Know about innovation and entrepreneurial ecosystems.",
      "Implement Design Thinking approaches to addressing real-world problems.",
      "Create new and creative products and services.",
      "Build entrepreneurial mind-set and leadership skills.",
      "Create start up ideas using Lean Start-up methodology."
    ],
    courseOutcomes: [
      "CO1: To understand the principles of innovation and entrepreneurial mind-set.",
      "CO2: Use Design Thinking to solve a problem.",
      "CO3: Design products from a customer perspective.",
      "CO4: Create Business Model Canvas.",
      "CO5: Pitch up an idea to investors."
    ],
    syllabusModules: [
      {
        title: "Module-I: Innovation Ecosystem (Days 1–5)",
        topics: [
          "Introduction to Innovation",
          "Innovation Ecosystem in India",
          "Start-up India Mission",
          "Atal Innovation Mission",
          "National Innovation Policy",
          "How does IIC, Incubators, and Accelerators work?",
          "What is the role of IIC, Incubators and Accelerators?",
          "Case Studies of successful Indian Start-up"
        ],
        activity: "Idea Identification Workshop"
      },
      {
        title: "Module-II: Design Thinking (Days 6–12)",
        topics: [
          "Empathy Mapping",
          "Problem Identification",
          "User Research",
          "Ideation Techniques",
          "Brainstorming",
          "Customer Persona"
        ],
        activity: "Design Thinking Sprint"
      },
      {
        title: "Module-III: Prototype Development (Days 13–22)",
        topics: [
          "Product Design",
          "Digital Prototyping",
          "Wire framing",
          "Rapid Prototyping",
          "MVP Development",
          "User Testing"
        ],
        activity: "Prototype Demonstration"
      },
      {
        title: "Module-IV: Start-up Development (Days 23–34)",
        topics: [
          "Lean Start-up",
          "Business Model Canvas",
          "Value Proposition Canvas",
          "Customer Discovery",
          "Revenue Models",
          "Team Building"
        ],
        activity: "Business Model Preparation"
      },
      {
        title: "Module-V: Start-up Launch (Days 35–45)",
        topics: [
          "Start-up Registration",
          "DPIIT Recognition",
          "Funding Opportunities",
          "Angel Investors",
          "Venture Capital",
          "Government Schemes",
          "Pitch Deck Preparation"
        ],
        activity: "Demo Day"
      }
    ],
    assessmentPattern: [
      { component: "Attendance", marks: 10 },
      { component: "Assignments", marks: 20 },
      { component: "Practical Activities", marks: 20 },
      { component: "Prototype", marks: 20 },
      { component: "Final Startup Pitch", marks: 30 }
    ],
    recommendedSoftware: [
      "Canva",
      "Figma",
      "Miro",
      "ChatGPT",
      "Google Workspace",
      "Notion"
    ],
    referenceBooks: [
      "The Lean Startup – Eric Ries",
      "Business Model You – Kenny U.S. Lee & Alex Ogilvy",
      "Zero to One – Peter Thiel & Blake Masters",
      "Strategic Innovation Design Thinking Class (Course 4)",
      "Technology Services and Support – Joyce and James Lipsman",
      "The Business of the Future – Peter F. Drucker",
      "AICTE Innovation & Entrepreneurship Policy (AIEP)",
      "National Education Policy (NEP 2020)",
      "Startup India Learning Program",
      "WIPO Academy – Intellectual Property Learning Resources"
    ],
    pedagogy: [
      "Expert lectures",
      "Design thinking workshops",
      "Case studies",
      "Industry mentoring",
      "Hands-on prototype development",
      "Field visits to incubators/stratus to review work and offerings",
      "Innovation challenges and hackathons",
      "Team-based capstone projects",
      "Final start-up/demo day – Jury evaluation"
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
    pdfUrl: "/NCIE_3_COURSES.pdf",
    pdfName: "NCIE_3_COURSES.pdf",
    benefits: [
      "Branch-Specific Smart Tech Modules (AI, Embedded Systems, Smart Manufacturing, Smart Grids, Digital Infrastructure)",
      "Hands-on CAD modeling, simulation tools, AI tools, and product ideation workshops",
      "Go-to-Market strategies, product-market fit validation, and Start-up India Portal integration",
      "Capstone laboratory projects evaluated by national mentors and industry experts"
    ],
    courseObjectives: [
      "Understand emerging technologies.",
      "Develop innovative products.",
      "Learn digital transformation.",
      "Commercialize technology.",
      "Build technology startups."
    ],
    courseOutcomes: [
      "CO1: Give an explanation of emerging technologies.",
      "CO2: Design products using Design technology.",
      "CO3: Build prototypes.",
      "CO4: Identify commercialisation opportunities.",
      "CO5: Make plans for a technology venture."
    ],
    syllabusModules: [
      {
        title: "Module-I: Emerging Technologies (Days 1–8)",
        topics: [
          "Artificial Intelligence",
          "Machine Learning",
          "Internet of Things",
          "Robotics",
          "Industry 4.0",
          "Blockchain",
          "Cloud Computing",
          "Cyber Security",
          "Digital Twins"
        ]
      },
      {
        title: "Module-II: Product Innovation (Days 9–18)",
        topics: [
          "Product Lifecycle",
          "Product Design",
          "User Experience",
          "Product Validation",
          "Innovation Frameworks"
        ],
        activity: "Product Ideation Workshop"
      },
      {
        title: "Module-III: Smart Technologies (Days 19–28)",
        topics: [
          "Branch-Specific Applications:",
          "CSE: AI Applications, Data Science, Cloud Services",
          "ECE: Embedded Systems, IoT Devices",
          "Mechanical: Smart Manufacturing",
          "EEE: Smart Grid",
          "Civil: Smart Infrastructure",
          "H&S: Digital Business"
        ]
      },
      {
        title: "Module-IV: Entrepreneurship (Days 29–38)",
        topics: [
          "Start-up Lifecycle",
          "Product-Market Fit",
          "Go-to-Market Strategy",
          "Branding",
          "Digital Marketing"
        ]
      },
      {
        title: "Module-V: Technology Ventures (Days 39–45)",
        topics: [
          "Funding",
          "Technology Licensing",
          "Incubation",
          "Start-up India Portal",
          "Technology Pitch"
        ]
      }
    ],
    assessmentPattern: [
      { component: "Quiz", marks: 10 },
      { component: "Assignments", marks: 20 },
      { component: "Practical", marks: 20 },
      { component: "Product Prototype", marks: 20 },
      { component: "Final Presentation", marks: 30 }
    ],
    recommendedSoftware: [
      "Canva",
      "Figma",
      "Miro",
      "ChatGPT",
      "Google Workspace",
      "Notion"
    ],
    referenceBooks: [
      "The Lean Startup – Eric Ries",
      "Business Model You – Kenny U.S. Lee & Alex Ogilvy",
      "Zero to One – Peter Thiel & Blake Masters",
      "Strategic Innovation Design Thinking Class (Course 4)",
      "Technology Services and Support – Joyce and James Lipsman",
      "The Business of the Future – Peter F. Drucker",
      "AICTE Innovation & Entrepreneurship Policy (AIEP)",
      "National Education Policy (NEP 2020)",
      "Startup India Learning Program",
      "WIPO Academy – Intellectual Property Learning Resources"
    ],
    pedagogy: [
      "Expert lectures",
      "Design thinking workshops",
      "Case studies",
      "Industry mentoring",
      "Hands-on prototype development",
      "Field visits to incubators/stratus to review work and offerings",
      "Innovation challenges and hackathons",
      "Team-based capstone projects",
      "Final start-up/demo day – Jury evaluation"
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
    pdfUrl: "/NCIE_3_COURSES.pdf",
    pdfName: "NCIE_3_COURSES.pdf",
    benefits: [
      "Comprehensive IPR Coverage: Patents, Copyrights, Trademarks, Industrial Design, and Tech Transfer Licensing",
      "Business Model Innovation: Lean Canvas, Platform Business Models, and Subscription Revenue Architectures",
      "Startup Finance & Fundraising: Angel Investment, Venture Capital, CSR Funding, and Financial Projections",
      "Experiential Learning: Patent Search, Market Research, Financial Planning, and Investor Pitch Competition"
    ],
    courseObjectives: [
      "Understand commercialization.",
      "Protect Intellectual Property.",
      "Develop business models.",
      "Prepare investment proposals.",
      "Launch technology ventures."
    ],
    courseOutcomes: [
      "CO1: To be familiar with commercialization process.",
      "CO2: Safeguard and preserve innovation via IPR.",
      "CO3: Create viable business plans.",
      "CO4: Make startups ready for investment.",
      "CO5: Turn research into products."
    ],
    syllabusModules: [
      {
        title: "Module-I: Technology Commercialization (Days 1–8)",
        topics: [
          "Research to Market",
          "Innovation Pipeline",
          "Technology Readiness Level (TRL)",
          "Product Commercialization"
        ]
      },
      {
        title: "Module-II: Intellectual Property Rights (Days 9–16)",
        topics: [
          "Patents",
          "Copyright",
          "Trademark",
          "Industrial Design",
          "Technology Transfer",
          "Licensing"
        ]
      },
      {
        title: "Module-III: Business Model Innovation (Days 17–28)",
        topics: [
          "Business Model Canvas",
          "Lean Canvas",
          "Platform Business",
          "Subscription Models",
          "Digital Business Models"
        ],
        activity: "Business Model Workshop"
      },
      {
        title: "Module-IV: Start-up Finance (Days 29–37)",
        topics: [
          "Bootstrapping",
          "Angel Investment",
          "Venture Capital",
          "Government Funding",
          "CSR Funding",
          "Financial Projections"
        ]
      },
      {
        title: "Module-V: Commercialization Strategy (Days 38–45)",
        topics: [
          "Market Entry",
          "Go-to-Market Strategy",
          "Sales Strategy",
          "Investor Pitch",
          "Startup Launch"
        ]
      }
    ],
    assessmentPattern: [
      { component: "Attendance", marks: 10 },
      { component: "Case Studies", marks: 20 },
      { component: "Practical", marks: 20 },
      { component: "Business Plan", marks: 20 },
      { component: "Investor Pitch", marks: 30 }
    ],
    recommendedSoftware: [
      "Canva",
      "Figma",
      "Miro",
      "ChatGPT",
      "Google Workspace",
      "Notion"
    ],
    referenceBooks: [
      "The Lean Startup – Eric Ries",
      "Business Model You – Kenny U.S. Lee & Alex Ogilvy",
      "Zero to One – Peter Thiel & Blake Masters",
      "Strategic Innovation Design Thinking Class (Course 4)",
      "Technology Services and Support – Joyce and James Lipsman",
      "The Business of the Future – Peter F. Drucker",
      "AICTE Innovation & Entrepreneurship Policy (AIEP)",
      "National Education Policy (NEP 2020)",
      "Startup India Learning Program",
      "WIPO Academy – Intellectual Property Learning Resources"
    ],
    pedagogy: [
      "Expert lectures",
      "Design thinking workshops",
      "Case studies",
      "Industry mentoring",
      "Hands-on prototype development",
      "Field visits to incubators/stratus to review work and offerings",
      "Innovation challenges and hackathons",
      "Team-based capstone projects",
      "Final start-up/demo day – Jury evaluation"
    ]
  },

  // --- OFFICIAL POLYTECHNIC CURRICULUM COURSES ---
  {
    id: "ncie-poly-101",
    title: "Entrepreneurship, Innovation and Startup Development for Viksit Bharat 2047",
    subtitle: "Course Code: NCIE-POLY-101 | Polytechnic Curriculum (Year I)",
    courseCode: "NCIE-POLY-101",
    category: "student",
    budget: "Online Delivery Framework",
    duration: "40 Hours | Polytechnic Year I",
    description: "An introductory course tailored for first-year polytechnic students to cover the fundamentals of entrepreneurship, creative design thinking, lean business planning, and initial startup registrations.",
    pdfUrl: "/POLYTECHNIC_CURRICULUM_I_Year.pdf",
    pdfName: "POLYTECHNIC_CURRICULUM_I_Year.pdf",
    benefits: [
      "Aligned with national objectives of Viksit Bharat 2047 & Atmanirbhar Bharat",
      "Introduction to design thinking sprints and startup feasibility analytics",
      "Understanding forms of business organization, MSME, and Startup India benefits",
      "Grade allocation: Attendance (10%), Assignments (20%), Practical (20%), Prototype (20%), Pitch (30%)"
    ],
    courseObjectives: [
      "Understand the fundamentals of entrepreneurship, innovation, and the role of startups in achieving the vision of Viksit Bharat 2047.",
      "Develop creative thinking and apply Design Thinking principles to identify and solve real-world problems.",
      "Analyze business opportunities and develop sustainable business models for innovative ventures.",
      "Develop the knowledge and skills required to establish and manage a startup, including business planning, funding options, legal requirements, and government support schemes.",
      "Enhance leadership, communication, teamwork, and business pitching skills for successful entrepreneurial ventures."
    ],
    courseOutcomes: [
      "CO1: Explain the concepts of entrepreneurship, innovation, startup ecosystems, and entrepreneurial competencies for creating sustainable business ventures.",
      "CO2: Apply creativity and Design Thinking principles to identify opportunities and develop innovative solutions for real-world problems.",
      "CO3: Develop a Business Model Canvas and prepare a feasible business plan for a startup venture using appropriate entrepreneurial tools.",
      "CO4: Demonstrate an understanding of startup establishment procedures, business registration, intellectual property rights, funding sources, financial planning, and government support schemes.",
      "CO5: Present and evaluate a startup idea through an effective business pitch by applying leadership, teamwork, communication, and digital marketing strategies."
    ],
    syllabusModules: [
      {
        title: "UNIT–I: Entrepreneurship and Startup Ecosystem (8 Hours)",
        topics: [
          "Concept, characteristics and importance of entrepreneurship",
          "Entrepreneur vs. Intrapreneur; Types of entrepreneurs; Competencies and mindset",
          "Role of entrepreneurship in economic development and Viksit Bharat 2047",
          "Startup ecosystem in India; Startup India, Stand-Up India and MSME initiatives",
          "Success stories of Indian entrepreneurs and startups"
        ]
      },
      {
        title: "UNIT–II: Creativity, Innovation and Design Thinking (8 Hours)",
        topics: [
          "Creativity and innovation: Concepts and significance; Innovation process",
          "Idea generation techniques including Brainstorming and SCAMPER",
          "Design Thinking process—Empathize, Define, Ideate, Prototype and Test",
          "Problem identification and opportunity recognition",
          "Customer discovery and market need analysis",
          "Developing innovative solutions for societal and industrial problems"
        ]
      },
      {
        title: "UNIT–III: Business Model and Startup Planning (8 Hours)",
        topics: [
          "Business opportunity identification; Value proposition; Customer segmentation",
          "Lean Startup methodology; Minimum Viable Product (MVP)",
          "Business Model Canvas—nine building blocks",
          "Feasibility analysis; SWOT analysis; Market research",
          "Business plan preparation and startup proposal development"
        ]
      },
      {
        title: "UNIT–IV: Startup Establishment and Business Management (8 Hours)",
        topics: [
          "Procedures for establishing a startup; Forms of business organizations",
          "Business registration and DPIIT recognition; Intellectual Property Rights (IPR), patents, copyrights and trademarks",
          "Financial planning; Cost estimation, pricing and break-even analysis",
          "Sources of funding including bootstrapping, angel investors, venture capital, crowdfunding and government support schemes"
        ]
      },
      {
        title: "UNIT–V: Startup Growth, Marketing and Business Pitching (8 Hours)",
        topics: [
          "Branding and digital marketing; Social media marketing strategies",
          "Customer relationship management; Leadership and team building",
          "Business communication and negotiation skills; Legal and ethical aspects of entrepreneurship",
          "Startup scaling strategies; Preparation of investor pitch deck; Elevator pitch; Business plan presentation and evaluation"
        ]
      }
    ],
    assessmentPattern: [
      { component: "Attendance", marks: 10 },
      { component: "Assignments", marks: 20 },
      { component: "Practical Activities", marks: 20 },
      { component: "Prototype", marks: 20 },
      { component: "Final Startup Pitch", marks: 30 }
    ],
    textBooks: [
      "S.S. Khanka - Entrepreneurship Development, S. Chand Publishing, New Delhi",
      "Vasant Desai - Dynamics of Entrepreneurial Development and Management, Himalaya Publishing House",
      "Alexander Osterwalder and Yves Pigneur - Business Model Generation: A Handbook for Visionaries, Game Changers, and Challengers"
    ],
    referenceBooks: [
      "Donald F. Kuratko - Entrepreneurship: Theory, Process and Practice, Cengage Learning",
      "Eric Ries - The Lean Startup, Crown Business",
      "Peter Thiel and Blake Masters - Zero to One, Crown Business",
      "Guy Kawasaki - The Art of the Start 2.0, Portfolio/Penguin",
      "Tim Brown - Change by Design, Harper Business",
      "Rashmi Bansal - Stay Hungry Stay Foolish, Westland Publications"
    ],
    webResources: [
      "Startup India Portal – https://www.startupindia.gov.in",
      "MSME Ministry – https://msme.gov.in",
      "Atal Innovation Mission – https://aim.gov.in",
      "Skill India Digital – https://www.skillindiadigital.gov.in",
      "National Innovation Foundation – https://nif.org.in"
    ]
  },
  {
    id: "ncie-poly-102",
    title: "Design Thinking, Technology Innovation and Product Development",
    subtitle: "Course Code: NCIE-POLY-102 | Polytechnic Curriculum (Year II)",
    courseCode: "NCIE-POLY-102",
    category: "student",
    budget: "Online Delivery Framework",
    duration: "40 Hours | Polytechnic Year II",
    description: "An intermediate curriculum focusing on engineering design principles, customer validation, sustainable business plans, and technological product establishment for second-year polytechnic streams.",
    pdfUrl: "/POLYTECHNIC_CURRICULUM_II_Year.pdf",
    pdfName: "POLYTECHNIC_CURRICULUM_II_Year.pdf",
    benefits: [
      "Develops opportunity identification skills through advanced design thinking",
      "Guides students to formulate comprehensive business plans and cost estimations",
      "Covers risk assessment, digital marketing, and investor readiness",
      "Direct pathway to national pre-incubation cells and labs"
    ],
    courseObjectives: [
      "To understand the principles of entrepreneurship and innovation in the context of national development.",
      "To develop creative thinking and opportunity identification skills using Design Thinking principles.",
      "To enable students to prepare business models and business plans for startup ventures.",
      "To provide knowledge of startup establishment, financial planning, legal compliance, and government support mechanisms.",
      "To develop leadership, communication, and entrepreneurial skills required for establishing and managing successful startups."
    ],
    courseOutcomes: [
      "CO1: Explain the fundamentals of entrepreneurship, innovation, and the startup ecosystem.",
      "CO2: Identify business opportunities and apply Design Thinking to develop innovative solutions.",
      "CO3: Prepare a Business Model Canvas and formulate a comprehensive business plan.",
      "CO4: Demonstrate knowledge of startup registration, intellectual property rights, financial planning, and funding mechanisms.",
      "CO5: Develop and present a startup proposal using effective communication, leadership, and business pitching skills."
    ],
    syllabusModules: [
      {
        title: "UNIT-I: Fundamentals of Entrepreneurship and Innovation (8 Hours)",
        topics: [
          "Concept and importance of entrepreneurship; Characteristics and competencies",
          "Types of entrepreneurs; Entrepreneurship as a career option; Role in development",
          "Viksit Bharat 2047 and Atmanirbhar Bharat; Innovation and ecosystem",
          "Startup ecosystem in India; Government initiatives (Startup India, Stand-Up India, MSME, Skill India, AIM)"
        ]
      },
      {
        title: "UNIT-II: Opportunity Identification and Design Thinking (8 Hours)",
        topics: [
          "Creativity and innovation; Design Thinking methodology",
          "Problem identification and need analysis; Opportunity recognition techniques",
          "Customer discovery and customer validation; Market survey methods",
          "Value proposition design; Idea screening and feasibility analysis; Lean Startup & MVP"
        ]
      },
      {
        title: "UNIT-III: Business Planning and Venture Creation (8 Hours)",
        topics: [
          "Business planning process; Business Model Canvas; Types of business models",
          "Market analysis and competitor analysis; Revenue models; Cost estimation & pricing",
          "Business plan preparation; Risk assessment; Sustainable & social entrepreneurship; Case studies"
        ]
      },
      {
        title: "UNIT-IV: Startup Establishment and Financial Management (8 Hours)",
        topics: [
          "Forms of business organizations; Business registration procedures; IPR (patents, trademarks, copyrights)",
          "Legal and regulatory compliance; Sources of startup finance; Bootstrapping, Angel, VC, Incubators & Accelerators",
          "Government funding schemes; Budget preparation; Financial planning and break-even analysis"
        ]
      },
      {
        title: "UNIT-V: Business Growth, Digital Entrepreneurship and Startup Pitching (8 Hours)",
        topics: [
          "Digital entrepreneurship; E-commerce business models; Branding and personal branding",
          "Digital marketing using social media; Leadership & team management; Negotiation skills",
          "Startup scaling strategies; Investor readiness; Pitch Deck, Elevator Pitch, project presentation"
        ]
      }
    ],
    textBooks: [
      "S.S. Khanka - Entrepreneurship Development, S. Chand Publishing, Latest Edition",
      "Vasant Desai - Dynamics of Entrepreneurial Development and Management, Himalaya Publishing House",
      "Donald F. Kuratko - Entrepreneurship: Theory, Process and Practice, Cengage Learning"
    ],
    referenceBooks: [
      "Alexander Osterwalder and Yves Pigneur - Business Model Generation, Wiley",
      "Eric Ries - The Lean Startup, Crown Business",
      "Guy Kawasaki - The Art of the Start 2.0, Portfolio",
      "Peter Thiel and Blake Masters - Zero to One, Crown Business",
      "Tim Brown - Change by Design, Harper Business",
      "Rashmi Bansal - Stay Hungry Stay Foolish, Westland Publications"
    ]
  },
  {
    id: "ncie-poly-103",
    title: "Startup Development, Business Models and Technology Commercialization",
    subtitle: "Course Code: NCIE-POLY-103 | Polytechnic Curriculum (Year III)",
    courseCode: "NCIE-POLY-103",
    category: "student",
    budget: "Online Delivery Framework",
    duration: "40 Hours | Polytechnic Year III",
    description: "An advanced third-year course outlining technology commercialization methods, business model creation, resource management, risk management, and pitching to investors.",
    pdfUrl: "/POLYTECHNIC_CURRICULUM_III_Year.pdf",
    pdfName: "POLYTECHNIC_CURRICULUM_III_Year.pdf",
    benefits: [
      "Focuses on technology transfer, legal compliance, and venture establishment",
      "IPR protection, patents, and trademarks management in startups",
      "Provides hands-on business modeling and startup scaling scenarios",
      "Fosters leadership and entrepreneurial communication for final pitch decks"
    ],
    courseObjectives: [
      "Understand the concepts of entrepreneurship, innovation, and the startup ecosystem in the context of Viksit Bharat 2047.",
      "Develop entrepreneurial thinking by identifying business opportunities and applying Design Thinking to solve real-world problems.",
      "Design sustainable business models and prepare viable business plans for innovative startup ventures.",
      "Acquire knowledge of startup establishment, resource management, funding mechanisms, legal compliance, and government support schemes.",
      "Develop leadership, communication, digital marketing, and business pitching skills for establishing and scaling startup ventures."
    ],
    courseOutcomes: [
      "CO1: Explain the fundamentals of entrepreneurship, innovation, entrepreneurial competencies, and the startup ecosystem.",
      "CO2: Identify business opportunities by applying creativity, Design Thinking, and customer validation techniques.",
      "CO3: Develop a Business Model Canvas and prepare a feasible business plan for a startup venture.",
      "CO4: Demonstrate knowledge of startup establishment procedures, financial planning, intellectual property rights, funding sources, and government support mechanisms.",
      "CO5: Present a startup idea using effective leadership, teamwork, communication, digital marketing, and business pitching skills."
    ],
    syllabusModules: [
      {
        title: "UNIT-I: Entrepreneurial Mindset and Innovation (8 Hours)",
        topics: [
          "Concept of entrepreneurship; Characteristics and competencies of successful founders",
          "Types of entrepreneurs; Entrepreneurial mindset; Innovation and creativity",
          "Role of entrepreneurship in economic development; Viksit Bharat 2047; Atmanirbhar Bharat",
          "Startup ecosystem in India; Government initiatives (Startup India, Stand-Up India, MSME, Skill India, AIM)"
        ]
      },
      {
        title: "UNIT-II: Opportunity Identification and Design Thinking (8 Hours)",
        topics: [
          "Problem identification; Need analysis; Opportunity recognition; Creativity techniques",
          "Brainstorming; Design Thinking process (Empathize, Define, Ideate, Prototype and Test)",
          "Customer discovery; Market survey; Customer validation; Value proposition; Feasibility analysis"
        ]
      },
      {
        title: "UNIT-III: Business Model Development (8 Hours)",
        topics: [
          "Lean Startup methodology; Minimum Viable Product (MVP); Business Model Canvas",
          "Customer segments; Value propositions; Channels; Relationships; Revenue streams",
          "Key resources, activities, and partnerships; Cost structure; Market & SWOT analysis; Business plan"
        ]
      },
      {
        title: "UNIT-IV: Startup Establishment and Resource Management (8 Hours)",
        topics: [
          "Forms of business organizations; Startup registration process; DPIIT recognition; IPR",
          "Patents, trademarks and copyrights; Financial planning; Pricing strategies; Break-even analysis",
          "Sources of startup funding; Bootstrapping; Angel investors; Venture capital; Incubators & Accelerators; Government schemes"
        ]
      },
      {
        title: "UNIT-V: Startup Growth and Entrepreneurial Leadership (8 Hours)",
        topics: [
          "Leadership and team building; Business ethics; Communication and negotiation skills",
          "Branding and digital marketing; Social media marketing; Customer relationship management",
          "Startup scaling strategies; Risk management; Investor pitch; Pitch deck preparation; Elevator pitch; Startup case studies; Future trends"
        ]
      }
    ],
    textBooks: [
      "S.S. Khanka - Entrepreneurship Development, S. Chand Publishing, Latest Edition",
      "Vasant Desai - Dynamics of Entrepreneurial Development and Management, Himalaya Publishing House",
      "Donald F. Kuratko - Entrepreneurship: Theory, Process and Practice, Cengage Learning"
    ],
    referenceBooks: [
      "Alexander Osterwalder and Yves Pigneur - Business Model Generation, Wiley",
      "Eric Ries - The Lean Startup, Crown Business",
      "Guy Kawasaki - The Art of the Start 2.0, Portfolio",
      "Peter Thiel and Blake Masters - Zero to One, Crown Business",
      "Tim Brown - Change by Design, Harper Business",
      "Rashmi Bansal - Stay Hungry Stay Foolish, Westland Publications"
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
    pdfName: "NCIE_Viksit_Bharat_2047_Innovation_Leadership_Programmes.pdf",
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
    pdfName: "NCIE_Viksit_Bharat_2047_Innovation_Leadership_Programmes.pdf",
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
    pdfName: "NCIE_Viksit_Bharat_2047_Innovation_Leadership_Programmes.pdf",
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
    pdfName: "NCIE_Student_Startup_Grants_Guidelines.pdf",
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
    pdfName: "Kalam_Startup_Seed_Funding_Scheme.pdf",
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
    pdfName: "Institutional_Incubation_Development_Support_Scheme.pdf",
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
    pdfName: "Institutional_Incubation_Development_Support_Scheme.pdf",
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
    pdfName: "Institutional_Incubation_Development_Support_Scheme.pdf",
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
    pdfName: "NCIE_Student_Startup_Grants_Guidelines.pdf",
    benefits: [
      "Access to structured entrepreneurship courses at no cost to students",
      "Practical workshops in design thinking, marketing, and business planning",
      "Direct mentorship from seasoned founders and incubation experts"
    ]
  }
];
