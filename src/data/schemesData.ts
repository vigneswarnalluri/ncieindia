export interface SchemeItem {
  id: string;
  title: string;
  subtitle: string;
  category: "initiatives" | "loans" | "scholarships" | "entrepreneurship" | "women-rural" | "resources";
  logo: string;
  portalUrl: string;
  ministry: string;
  overview: string;
  highlights: string[];
  eligibility: string[];
  benefits: string[];
  applicationSteps: string[];
}

export interface GovernmentPortal {
  name: string;
  logo: string;
  url: string;
  description: string;
}

export const GOVERNMENT_PORTALS: GovernmentPortal[] = [
  {
    name: "Startup India",
    logo: "/schemes/startup-india.svg",
    url: "https://www.startupindia.gov.in",
    description: "Official portal for DPIIT startup recognition, tax exemptions, and seed funding."
  },
  {
    name: "MSME Udyam Registration",
    logo: "/schemes/udyam.svg",
    url: "https://udyamregistration.gov.in",
    description: "Free online registration portal for Micro, Small & Medium Enterprises."
  },
  {
    name: "National Scholarship Portal (NSP)",
    logo: "/schemes/nsp.svg",
    url: "https://scholarships.gov.in",
    description: "Single window portal for Central and State government scholarships."
  },
  {
    name: "Vidya Lakshmi Portal",
    logo: "/schemes/vidya-lakshmi.svg",
    url: "https://www.vidyalakshmi.co.in",
    description: "First-of-its-kind portal for students seeking education loans and subsidies."
  },
  {
    name: "National Career Service (NCS)",
    logo: "/schemes/ncs.svg",
    url: "https://www.ncs.gov.in",
    description: "Mission Mode Project for career counseling, job matching, and employment services."
  },
  {
    name: "Skill India Digital",
    logo: "/schemes/skill-india.svg",
    url: "https://www.skillindiadigital.gov.in",
    description: "Unified portal for digital skill development courses and NAPS apprenticeships."
  },
  {
    name: "AICTE Portal",
    logo: "/schemes/aicte.svg",
    url: "https://www.aicte-india.org",
    description: "All India Council for Technical Education student & institutional grant schemes."
  },
  {
    name: "Women Entrepreneurship Platform (WEP)",
    logo: "/schemes/wep.svg",
    url: "https://wep.gov.in",
    description: "NITI Aayog initiative empowering women entrepreneurs with funding & mentorship."
  }
];

export const SCHEMES_DATA: SchemeItem[] = [
  // 1. Government Initiatives
  {
    id: "startup-india",
    title: "Startup India Initiative",
    subtitle: "DPIIT Recognition, Tax Benefits & Seed Fund Scheme",
    category: "initiatives",
    logo: "/schemes/startup-india.svg",
    portalUrl: "https://www.startupindia.gov.in",
    ministry: "Ministry of Commerce & Industry (DPIIT)",
    overview: "Startup India is a flagship initiative of the Government of India intended to build a strong ecosystem for nurturing innovation and startups in the country to drive sustainable economic growth and generate large scale employment opportunities.",
    highlights: [
      "DPIIT Startup Recognition",
      "3-Year Tax Exemption under Section 80-IAC",
      "Self-Certification under 9 Environmental & Labor Laws",
      "Startup India Seed Fund Scheme (SISFS) up to ₹50 Lakhs",
      "Fast-Track Patent Examination & 80% Rebate on IPR Fees"
    ],
    eligibility: [
      "Incorporated as a Private Limited Company, Registered Partnership Firm, or LLP in India",
      "Turnover less than ₹100 Crores in any financial year",
      "Entity active for less than 10 years from date of incorporation",
      "Working towards innovation, development, or improvement of products/services"
    ],
    benefits: [
      "Access to Startup India Seed Fund Scheme (SISFS)",
      "Exemption from capital gains tax and Angel Tax provisions",
      "Easier public procurement norms (relaxation in EMD and prior experience)",
      "Listing on Govt e-Marketplace (GeM) with dedicated startup badge"
    ],
    applicationSteps: [
      "Register entity as Pvt Ltd / LLP / Partnership",
      "Visit www.startupindia.gov.in and create user account",
      "Fill DPIIT recognition form with pitch deck & certificate of incorporation",
      "Receive DPIIT Recognition Certificate within 3-5 working days upon verification"
    ]
  },
  {
    id: "standup-india",
    title: "Stand-Up India Scheme",
    subtitle: "Bank Loans between ₹10 Lakhs to ₹1 Crore for SC/ST & Women",
    category: "initiatives",
    logo: "/schemes/standup-india.svg",
    portalUrl: "https://www.standupmitra.in",
    ministry: "Department of Financial Services, Ministry of Finance",
    overview: "Stand-Up India facilitates bank loans between ₹10 Lakh to ₹1 Crore to at least one Scheduled Caste (SC) or Scheduled Tribe (ST) borrower and at least one woman borrower per bank branch for setting up a greenfield enterprise.",
    highlights: [
      "Loan Range: ₹10 Lakhs to ₹1 Crore",
      "Targeted for SC/ST and Women Entrepreneurs",
      "Composite Loan covering Working Capital & Fixed Assets",
      "Repayment period up to 7 years with maximum 18 months moratorium",
      "Credit Guarantee Scheme for Stand Up India Loans (CGSIL)"
    ],
    eligibility: [
      "SC/ST and/or Women entrepreneurs above 18 years of age",
      "Greenfield enterprise in manufacturing, services, or trading sector",
      "In non-individual enterprises, 51% shareholding & controlling stake held by SC/ST/Woman",
      "Borrower should not be in default to any bank/financial institution"
    ],
    benefits: [
      "Low collateral requirements backed by Credit Guarantee Fund",
      "Pre-loan handholding support through Stand-Up Connect Centers",
      "Margin money support linked with eligible government capital subsidies"
    ],
    applicationSteps: [
      "Visit www.standupmitra.in portal",
      "Register as a borrower and complete eligibility self-assessment",
      "Choose preferred bank branch and submit online loan application",
      "Track loan status online through Stand-Up Mitra portal dashboard"
    ]
  },
  {
    id: "pm-mudra-yojana",
    title: "PM Mudra Yojana (MUDRA)",
    subtitle: "Collateral-Free Micro Business Loans up to ₹10 Lakhs",
    category: "initiatives",
    logo: "/schemes/mudra.svg",
    portalUrl: "https://www.mudra.org.in",
    ministry: "Ministry of Finance & SIDBI",
    overview: "Pradhan Mantri MUDRA Yojana (PMMY) provides loans up to ₹10 Lakhs to non-corporate, non-farm small/micro enterprises across three categories: Shishu (up to ₹50k), Kishore (₹50k to ₹5L), and Tarun (₹5L to ₹10L).",
    highlights: [
      "Shishu: Loans up to ₹50,000 for starting new micro units",
      "Kishore: Loans above ₹50,000 up to ₹5 Lakhs for scaling up",
      "Tarun: Loans above ₹5 Lakhs up to ₹10 Lakhs for established units",
      "Zero collateral or third-party guarantee required",
      "MUDRA Card for seamless working capital withdrawals"
    ],
    eligibility: [
      "Any Indian Citizen running a non-farm income-generating micro enterprise",
      "Artisans, small manufacturers, shopkeepers, service providers, agricultural allied activities",
      "Good credit history without existing bank defaults"
    ],
    benefits: [
      "Collateral-free credit backed by CGFMU guarantee",
      "Flexible repayment schedule matching business cash flows",
      "Issued MUDRA RuPay Debit Card for instant cash access"
    ],
    applicationSteps: [
      "Prepare business project report and identity/address proof",
      "Apply through JanSamarth portal (www.jansamarth.in) or nearby bank branch",
      "Submit Mudra application form along with business registration documents",
      "Loan sanctioned directly into bank account upon verification"
    ]
  },
  {
    id: "pmegp",
    title: "PMEGP (Prime Minister's Employment Generation Programme)",
    subtitle: "Credit-Linked Capital Subsidy up to 35% for New Enterprises",
    category: "initiatives",
    logo: "/schemes/pmegp.svg",
    portalUrl: "https://www.kviconline.gov.in/pmegpeportal",
    ministry: "Ministry of MSME & KVIC",
    overview: "PMEGP is a credit-linked subsidy programme administered by KVIC to generate self-employment opportunities through establishment of micro-enterprises in non-farm sector.",
    highlights: [
      "Project cost up to ₹50 Lakhs for Manufacturing & ₹20 Lakhs for Service sector",
      "Subsidy Rate: 15% to 25% (General) and 25% to 35% (Special Categories & Rural)",
      "Implemented by KVIC, KVIB, and District Industries Centres (DIC)",
      "Mandatory Entrepreneurship Development Programme (EDP) training"
    ],
    eligibility: [
      "Individuals above 18 years of age",
      "Minimum 8th standard pass for project cost above ₹10L (Mfg) / ₹5L (Service)",
      "Self Help Groups, Charitable Trusts, and Co-operative Societies"
    ],
    benefits: [
      "Substantial upfront capital margin money subsidy credited directly to lock-in account",
      "Bank loan covers 90% to 95% of total project cost"
    ],
    applicationSteps: [
      "Apply online on KVIC PMEGP e-Portal (kviconline.gov.in)",
      "Fill online application form and upload EDP project report & certificates",
      "District Level Task Force Committee (DLTFC) reviews & forwards to bank",
      "Bank sanctions loan and releases margin money subsidy upon EDP training completion"
    ]
  },

  // 2. Student Loans & Education Finance
  {
    id: "vidya-lakshmi",
    title: "Vidya Lakshmi Portal",
    subtitle: "Unified Single Window Platform for Bank Education Loans",
    category: "loans",
    logo: "/schemes/vidya-lakshmi.svg",
    portalUrl: "https://www.vidyalakshmi.co.in",
    ministry: "Department of Higher Education & NSDL",
    overview: "Vidya Lakshmi is a first-of-its-kind portal for students seeking education loans. Developed under the guidance of Department of Higher Education, Ministry of Education, it enables students to view, apply, and track education loan applications to multiple banks anytime, anywhere.",
    highlights: [
      "Common Educational Loan Application Form (CELAF)",
      "Access to 40+ Banks offering 120+ Loan Schemes",
      "Apply to 3 different banks simultaneously with a single form",
      "Direct integration with Central Sector Interest Subsidy (CSIS) Scheme",
      "Real-time tracking of loan status & bank responses"
    ],
    eligibility: [
      "Indian National pursuing Higher Education in India or Abroad",
      "Secured admission to higher education course through Merit/Entrance Test",
      "Recognized University / Institution (UGC, AICTE, Govt approved)"
    ],
    benefits: [
      "No physical visits required to multiple bank branches",
      "Interest subsidy benefit during moratorium period for annual income up to ₹4.5 Lakhs",
      "Credit Guarantee Fund Scheme for Educational Loans (CGFSEL) coverage up to ₹7.5 Lakhs"
    ],
    applicationSteps: [
      "Register on www.vidyalakshmi.co.in with email ID and phone number",
      "Fill Common Educational Loan Application Form (CELAF)",
      "Search & select suitable loan schemes from up to 3 banks",
      "Upload admission letter, fee structure, and income proof to submit application"
    ]
  },
  {
    id: "cgfsel-education-loan",
    title: "Credit Guarantee Fund Scheme for Education Loans",
    subtitle: "Guarantee Coverage for Collateral-Free Student Loans up to ₹7.5 Lakhs",
    category: "loans",
    logo: "/schemes/vidya-lakshmi.svg",
    portalUrl: "https://www.vidyalakshmi.co.in",
    ministry: "Ministry of Education & NCGTC",
    overview: "CGFSEL provides credit guarantee cover for educational loans sanctioned by Member Lending Institutions (MLIs) up to ₹7.5 Lakhs without collateral security or third-party guarantee.",
    highlights: [
      "Collateral-free education loans up to ₹7.5 Lakhs",
      "No third-party guarantee required from student or parents",
      "Covers domestic and foreign higher education degree/diploma programs",
      "Interest rate capped as per RBI guidelines"
    ],
    eligibility: [
      "Students pursuing technical/professional courses in India or abroad",
      "Loan amount up to ₹7.5 Lakhs sanctioned by eligible commercial banks",
      "Admitted through competitive selection process"
    ],
    benefits: [
      "Removes collateral barrier for deserving economically weaker students",
      "Moratorium period: Course duration + 1 year"
    ],
    applicationSteps: [
      "Apply for education loan through Vidya Lakshmi portal",
      "Select CGFSEL backed collateral-free loan scheme",
      "Bank automatically enrolls the eligible loan under NCGTC credit guarantee cover"
    ]
  },

  // 3. Scholarships
  {
    id: "nsp-scholarship-portal",
    title: "National Scholarship Portal (NSP)",
    subtitle: "Single Window Portal for Central, State & AICTE Scholarships",
    category: "scholarships",
    logo: "/schemes/nsp.svg",
    portalUrl: "https://scholarships.gov.in",
    ministry: "Ministry of Electronics & IT (MeitY)",
    overview: "National Scholarship Portal (NSP) is a one-stop digital platform that integrates scholarship schemes offered by Central Ministries, State Governments, and AICTE. It ensures direct benefit transfer (DBT) into student bank accounts.",
    highlights: [
      "Central Sector Scheme of Scholarships for College & University Students",
      "AICTE Pragati Scholarship (for Girl Students in Technical Education)",
      "AICTE Saksham Scholarship (for Specially-Abled Students)",
      "Post-Matric Scholarships & Merit-cum-Means Financial Assistance",
      "Aadhaar-seeded Direct Benefit Transfer (DBT) directly into bank account"
    ],
    eligibility: [
      "Indian students enrolled in recognized school, college, or university",
      "Meeting annual family income limits specified under respective scheme guidelines (e.g. ₹2.5L to ₹8L)",
      "Minimum qualifying percentage marks in previous academic examination"
    ],
    benefits: [
      "Financial assistance up to ₹50,000/year for tuition fees & maintenance allowance",
      "Transparent online tracking and instant SMS notifications"
    ],
    applicationSteps: [
      "Register on NSP Portal (scholarships.gov.in) with OTR (One Time Registration)",
      "Complete e-KYC using Aadhaar number",
      "Select eligible scholarship scheme based on qualification & family income",
      "Upload marksheets & institute verification form for Institute Verification Officer approval"
    ]
  },
  {
    id: "aicte-pragati-saksham",
    title: "AICTE Pragati & Saksham Scholarships",
    subtitle: "Financial Assistance up to ₹50,000/Year for Girls & Differently-Abled Students",
    category: "scholarships",
    logo: "/schemes/aicte.svg",
    portalUrl: "https://www.aicte-india.org",
    ministry: "Ministry of Education & AICTE",
    overview: "AICTE Pragati Scheme provides scholarship to eligible girl students admitted to AICTE approved Diploma/Degree institutes, while Saksham Scheme empowers specially-abled students pursuing technical education.",
    highlights: [
      "₹50,000 per annum scholarship for tuition fee & books/stationery/equipment",
      "Pragati: 10,000 scholarships reserved annually for female technical students",
      "Saksham: Covers all eligible differently-abled students (disability >= 40%)",
      "Disbursed directly via DBT through National Scholarship Portal"
    ],
    eligibility: [
      "Girls (Pragati) or Specially-Abled Students (Saksham) admitted to 1st year of Degree/Diploma in AICTE approved institute",
      "Family annual income should not exceed ₹8.0 Lakhs per annum"
    ],
    benefits: [
      "Direct financial support towards college fees, laptop purchase, and hostel expenses"
    ],
    applicationSteps: [
      "Apply through National Scholarship Portal (NSP) under AICTE Scheme section",
      "Upload disability certificate (for Saksham) and income certificate",
      "Institutional verification completed by Institute Nodal Officer"
    ]
  },
  {
    id: "inspire-scholarship",
    title: "DST INSPIRE Scholarship (SHE)",
    subtitle: "₹80,000/Year for Students Pursuing Basic & Natural Sciences",
    category: "scholarships",
    logo: "/schemes/inspire.svg",
    portalUrl: "https://online-inspire.gov.in",
    ministry: "Department of Science & Technology (DST)",
    overview: "Innovation in Science Pursuit for Inspired Research (INSPIRE) is an innovative programme sponsored by DST to attract talent to science. Scholarship for Higher Education (SHE) offers 10,000 scholarships every year to talented youth.",
    highlights: [
      "Scholarship value: ₹80,000 per annum (₹60k cash + ₹20k mentorship grant)",
      "For B.Sc., B.Sc. (Hons), B.S., and Integrated M.Sc. students",
      "Top 1% rankers in 12th Board examinations or JEE/NEET rank holders"
    ],
    eligibility: [
      "Top 1% performance in Class 12th Board Examination of any state/central board",
      "Enrolled in Basic and Natural Science courses at B.Sc. / M.Sc. level"
    ],
    benefits: [
      "Substantial annual stipend + Summer Research Project mentorship allowance under top scientists"
    ],
    applicationSteps: [
      "Submit online application on INSPIRE Web Portal (online-inspire.gov.in)",
      "Upload 12th marksheet, Board Endorsement Certificate, and college admission proof",
      "Selection list published by DST science committee"
    ]
  },

  // 4. Entrepreneurship & Innovation
  {
    id: "atal-innovation-mission",
    title: "Atal Innovation Mission (AIM)",
    subtitle: "Atal Tinkering Labs, Incubation Centers & Innovation Challenges",
    category: "entrepreneurship",
    logo: "/schemes/aim.svg",
    portalUrl: "https://aim.gov.in",
    ministry: "NITI Aayog",
    overview: "Atal Innovation Mission (AIM) is Government of India's flagship initiative to promote a culture of innovation and entrepreneurship in the country, fostering world-class Atal Incubation Centres (AICs) and Atal Tinkering Labs (ATLs).",
    highlights: [
      "Atal Incubation Centres (AICs): Grant up to ₹10 Crores for setting up incubators",
      "Atal Tinkering Labs (ATLs): Grants for school & college STEM/Robotics labs",
      "Atal New India Challenges (ANIC): Grants up to ₹1 Crore for product technology commercialization",
      "Mentor India Network: Access to industry experts and venture leaders"
    ],
    eligibility: [
      "Higher educational institutions, research bodies, corporate entities, and tech startups",
      "Innovators with working prototypes addressing national grand challenges"
    ],
    benefits: [
      "Incubation space, lab equipment, prototyping facilities, and seed capital mentorship"
    ],
    applicationSteps: [
      "Apply through AIM NITI Aayog portal (aim.gov.in) during open application calls",
      "Submit detailed proposal & business strategy presentation",
      "Present before National Selection Committee"
    ]
  },
  {
    id: "startup-ipr-protection",
    title: "SIPP Scheme (Intellectual Property Protection)",
    subtitle: "Fast-Track Patents, Trademarks & 80% Rebate for Startups",
    category: "entrepreneurship",
    logo: "/schemes/startup-india.svg",
    portalUrl: "https://www.startupindia.gov.in",
    ministry: "DPIIT & Controller General of Patents",
    overview: "Scheme for Facilitating Startups Intellectual Property Protection (SIPP) encourages innovation by providing free facilitator services for filing patent, trademark, and design applications with government fee rebates.",
    highlights: [
      "80% rebate on Patent filing fees and 50% rebate on Trademark filing fees",
      "Panel of empaneled IP Facilitators paid directly by the Government",
      "Fast-track expedited examination of patent applications"
    ],
    eligibility: [
      "DPIIT recognized startups with valid certificate of recognition"
    ],
    benefits: [
      "Zero facilitator fees for patent/trademark drafting and prosecution"
    ],
    applicationSteps: [
      "Select empaneled facilitator from DPIIT IP Facilitator list",
      "Submit DPIIT startup recognition certificate and patent disclosure details",
      "Facilitator files application with Intellectual Property Office"
    ]
  },

  // 5. Women & Rural Entrepreneurship
  {
    id: "women-entrepreneurship-platform",
    title: "Women Entrepreneurship Platform (WEP)",
    subtitle: "NITI Aayog Unified Platform for Women Founders",
    category: "women-rural",
    logo: "/schemes/wep.svg",
    portalUrl: "https://wep.gov.in",
    ministry: "NITI Aayog",
    overview: "WEP is a flagship NITI Aayog initiative designed to build a vibrant ecosystem for women entrepreneurs across India, offering funding linkage, incubation, legal guidance, and mentorship.",
    highlights: [
      "Three Pillars: Iccha Shakti (Motivating), Gyaan Shakti (Knowledge), Karma Shakti (Hands-on support)",
      "Direct connection with venture funds, angel investors, and government loan schemes",
      "Free credit score assessment & MSME compliance assistance"
    ],
    eligibility: [
      "Women entrepreneurs, women-led startups, and aspiring female founders across India"
    ],
    benefits: [
      "Dedicated mentorship from top corporate leaders & access to exclusive women startup grants"
    ],
    applicationSteps: [
      "Register on WEP Portal (wep.gov.in)",
      "Complete founder profile and business stage details",
      "Access curated funding programs, legal templates, and mentor masterclasses"
    ]
  },
  {
    id: "odop-pmfme-scheme",
    title: "ODOP & PMFME Scheme",
    subtitle: "One District One Product & Micro Food Processing Credit Subsidy",
    category: "women-rural",
    logo: "/schemes/odop.svg",
    portalUrl: "https://pmfme.mofpi.gov.in",
    ministry: "Ministry of Food Processing Industries (MoFPI)",
    overview: "PM Formalisation of Micro food processing Enterprises (PMFME) scheme provides financial, technical, and business support for micro food processing units under the One District One Product (ODOP) framework.",
    highlights: [
      "35% capital subsidy up to ₹10 Lakhs for credit-linked micro food processing units",
      "Seed capital of ₹40,000 per SHG member for working capital and small tools",
      "Branding & Marketing support up to 50% for ODOP products"
    ],
    eligibility: [
      "Existing or new micro food processing entrepreneurs, Self Help Groups (SHGs), Producer Cooperatives"
    ],
    benefits: [
      "Capital subsidy + technical training + FSSAI & GST registration guidance"
    ],
    applicationSteps: [
      "Apply through PMFME Portal (pmfme.mofpi.gov.in)",
      "Select district specific ODOP product category",
      "District Resource Person (DRP) assists with DPR preparation & bank submission"
    ]
  },

  // 6. Startup Resources & Guidance
  {
    id: "startup-compliance-guide",
    title: "Company Registration & Tax Compliance Guide",
    subtitle: "Step-by-Step Guidance for Private Limited, GST, PAN & TAN",
    category: "resources",
    logo: "/schemes/startup-india.svg",
    portalUrl: "https://www.mca.gov.in",
    ministry: "Ministry of Corporate Affairs (MCA)",
    overview: "Comprehensive guidance for student founders on selecting entity structure (Pvt Ltd, LLP, OPC), obtaining Digital Signature Certificate (DSC), Director Identification Number (DIN), SPICe+ registration, GSTIN, and PAN/TAN.",
    highlights: [
      "SPICe+ Integrated Incorporation Form",
      "Free Name Reservation & Zero MCA Incorporation Fee for capital up to ₹15L",
      "Instant GSTIN, EPFO, ESIC, and Bank Account opening via SPICe+ Part B"
    ],
    eligibility: [
      "Any aspiring founder or student team incorporating a business in India"
    ],
    benefits: [
      "Streamlined single-window corporate incorporation within 48 hours"
    ],
    applicationSteps: [
      "Apply for DSC and reserve company name on MCA Portal (mca.gov.in)",
      "Fill SPICe+ Part A & Part B electronic incorporation forms",
      "Receive Certificate of Incorporation (CoI) with PAN and TAN"
    ]
  }
];
