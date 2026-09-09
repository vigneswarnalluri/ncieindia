export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ResourceAttachment {
  title: string;
  type: "pdf" | "template" | "doc" | "link";
  url: string;
  size?: string;
}

export type UnitContentType = "video" | "reading" | "quiz" | "transcript" | "book" | "download";

export interface LMSLesson {
  id: string;
  moduleIndex: number;
  lessonIndex: number;
  weekNumber: number;
  title: string;
  contentType?: UnitContentType;
  duration: string;
  durationMinutes: number;
  youtubeId?: string;
  youtubeTitle?: string;
  summary: string;
  objectives: string[];
  takeaways: string[];
  resources: ResourceAttachment[];
  quiz?: QuizQuestion[];
  readingContent?: {
    overview: string;
    actionLinkText: string;
    actionLinkUrl: string;
    sections: { heading: string; body: string }[];
  };
}

export interface LMSModule {
  id: string;
  moduleIndex: number;
  week: number | string;
  title: string;
  subtitle: string;
  theme: string;
  isSpecialCategory?: boolean;
  lessons: LMSLesson[];
}

export type CurriculumModule = LMSModule;

export interface CourseDefinition {
  courseCode: string;
  title: string;
  duration: string;
  credits: string;
  description: string;
}

export const NCIE_COURSES: CourseDefinition[] = [
  {
    courseCode: "NCIE-AIB-201",
    title: "AI Business & Startup Innovation",
    duration: "8 Weeks (60 Hours)",
    credits: "3 AICTE Credits",
    description: "Enterprise applications of generative AI, automated business models, machine learning monetization, and AI-first venture building."
  },
  {
    courseCode: "NCIE-EIS-101",
    title: "Entrepreneurship, Innovation and Startup Development",
    duration: "8 Weeks (60 Hours)",
    credits: "3 AICTE Credits",
    description: "End-to-end entrepreneurial journey: ideation, customer discovery, validation, business modeling, regulatory compliance, and venture financing."
  },
  {
    courseCode: "NCIE-DTT-102",
    title: "Design Thinking, Technology Innovation and Product Development",
    duration: "8 Weeks (60 Hours)",
    credits: "3 AICTE Credits",
    description: "Human-centered design thinking, empathetic problem solving, technology integration, and physical/digital product prototyping."
  },
  {
    courseCode: "NCIE-IDS-103",
    title: "Innovation, Design Thinking & Start-up Development",
    duration: "8 Weeks (60 Hours)",
    credits: "3 AICTE Credits",
    description: "Integrating creative design thinking principles with scalable startup development, intellectual property creation, and commercialization pathways."
  },
  {
    courseCode: "NCIE-ETP-104",
    title: "Emerging Technologies, Product Innovation & Entrepreneurship",
    duration: "8 Weeks (60 Hours)",
    credits: "3 AICTE Credits",
    description: "Commercialization pathways for IoT, Robotics, CleanTech, Blockchain, and Cyber-physical systems with startup incubation frameworks."
  },
  {
    courseCode: "NCIE-ITM-105",
    title: "Innovational & Technology Management",
    duration: "8 Weeks (60 Hours)",
    credits: "3 AICTE Credits",
    description: "Managing collegiate and institutional R&D, technology life cycles, open innovation pipelines, agile tech execution, and innovation governance."
  },
  {
    courseCode: "NCIE-TCP-106",
    title: "Technology Commercialization, IPR & Business Model Innovation",
    duration: "8 Weeks (60 Hours)",
    credits: "3 AICTE Credits",
    description: "From lab research to commercial marketplace: patent searches, IPR drafting, technology licensing agreements, and spin-off formation."
  },
  {
    courseCode: "NCIE-SDB-107",
    title: "Startup Development, Business Models and Technology Commercialization",
    duration: "8 Weeks (60 Hours)",
    credits: "3 AICTE Credits",
    description: "Comprehensive venture acceleration: business model formulation, technology transfer, seed fundraising, and scaling operations."
  }
];

export interface StudentProfile {
  appId: string;
  rollNo: string;
  name: string;
  email: string;
  mobile: string;
  institution: string;
  aisheCode: string;
  sectorTrack: string;
  cohort: string;
  enrolledDate: string;
  status: "Active" | "Completed";
  progressPercentage: number;
  hoursLogged: number;
  totalRequiredHours: number;
  completedLessons: string[];
  quizScores: Record<string, number>;
  enrolledCourseCode?: string;
  enrolledCourseTitle?: string;
  department?: string;
  specialization?: string;
  stream?: string;
  yearOfStudy?: string;
  defaultPassword?: string;
}

export interface FacultyProfile {
  id: string;
  facultyId: string;
  name: string;
  email: string;
  institution: string;
  designation: string;
  role: "Industry Mentor" | "Faculty Coordinator";
  assignedCohort: string;
  pendingLogbooksCount: number;
  reviewedStudentsCount: number;
}

export interface AdminProfile {
  id: string;
  adminId: string;
  name: string;
  email: string;
  role: "NCIE Super Admin" | "Course Director" | "Academic Coordinator";
  institution: string;
  department: string;
}

export interface LogbookEntry {
  id: string;
  week: number;
  dateRange: string;
  hoursLogged: number;
  activitiesCompleted: string;
  learningsAndSkills: string;
  challengesFaced: string;
  mentorFeedback?: string;
  status: "Draft" | "Submitted" | "Verified by Mentor";
  submittedAt: string;
}

export interface CapstoneProject {
  title: string;
  sector: string;
  abstract: string;
  problemStatement: string;
  solutionArchitecture: string;
  githubUrl: string;
  demoUrl: string;
  slideDeckUrl: string;
  status: "Not Started" | "Draft" | "Under Review" | "Approved" | "Distinction";
  submittedAt?: string;
  evaluatedGrade?: string;
  reviewerRemarks?: string;
}

// 10 Core Internship Tracks
export const SECTOR_TRACKS = [
  { id: "SEC-01", name: "Engineering & Technology", code: "ENG-TECH", color: "#2563EB" },
  { id: "SEC-02", name: "Science & Applied Research", code: "SCI-RES", color: "#7C3AED" },
  { id: "SEC-03", name: "Commerce & Venture Finance", code: "FIN-VENT", color: "#059669" },
  { id: "SEC-04", name: "Arts & Digital Humanities", code: "HUM-ARTS", color: "#D97706" },
  { id: "SEC-05", name: "Agriculture & Rural Tech", code: "AGRI-TECH", color: "#16A34A" },
  { id: "SEC-06", name: "Healthcare & Life Sciences", code: "HEALTH-SCI", color: "#E11D48" },
  { id: "SEC-07", name: "Information Technology & AI", code: "IT-AI", color: "#4F46E5" },
  { id: "SEC-08", name: "Social Innovation & GovTech", code: "GOV-TECH", color: "#0891B2" },
  { id: "SEC-09", name: "Environment & Clean Energy", code: "ENV-CLEAN", color: "#0D9488" },
  { id: "SEC-10", name: "Entrepreneurship & Startups", code: "ENT-DEV", color: "#EA580C" },
];

// Comprehensive 8-Week Curriculum with NPTEL Structure
export const CURRICULUM_MODULES: LMSModule[] = [
  {
    id: "mod-about",
    moduleIndex: 0,
    week: "About",
    title: "About NCIE & Innovation Mandate",
    subtitle: "National Council for Innovation & Entrepreneurship official charter, vision, and governance.",
    theme: "About NCIE",
    isSpecialCategory: true,
    lessons: [
      {
        id: "les-about-1",
        moduleIndex: 0,
        lessonIndex: 1,
        weekNumber: 0,
        title: "NCIE Initiative & Vision 2047",
        contentType: "reading",
        duration: "15 mins",
        durationMinutes: 15,
        summary: "Comprehensive briefing on the NCIE Initiative, statutory objectives, and the Viksit Bharat @2047 transformation charter.",
        objectives: [
          "Understand the core mandate of NCIE across university incubators.",
          "Examine the 4 pillars of the National Entrepreneurship Mission.",
          "Review government-industry linkages facilitating venture grants."
        ],
        takeaways: [
          "NCIE acts as the national bridge between collegiate R&D and commercialization.",
          "Students retain 100% IP rights developed during the 8-week internship program."
        ],
        resources: [
          { title: "NCIE National Initiative Whitepaper (PDF)", type: "pdf", url: "#", size: "3.2 MB" },
          { title: "Viksit Bharat Centenary Blueprint", type: "doc", url: "#", size: "1.8 MB" }
        ],
        readingContent: {
          overview: "The National Council for Innovation & Entrepreneurship (NCIE) serves as India's premier catalytic council fostering collegiate innovation, deep-tech research, and entrepreneurial leadership under the aegis of the Viksit Bharat @2047 mandate.",
          actionLinkText: "Click here to view the NCIE and its initiative",
          actionLinkUrl: "https://ncie.org.in/initiative",
          sections: [
            {
              heading: "1. The Centenary National Mandate",
              body: "As India approaches its centenary year of independence in 2047, the national economy requires a decisive shift from job-seeking paradigms to scalable, venture-driven leadership. NCIE spearheads collegiate incubation across 10 mission-critical economic sectors."
            },
            {
              heading: "2. The 'One Family – One Entrepreneur' Mission",
              body: "By integrating real-world project development, patent filing support, and AICTE collegiate credits, this internship cultivates grassroots entrepreneurial capability across every district and university ecosystem."
            },
            {
              heading: "3. Industry Mentorship & Venture Grants",
              body: "Interns are paired with senior venture capitalists, IIT/IIM alumni mentors, and corporate CSR partners to evaluate feasibility, stress-test business models, and present to seed investors during the Capstone Defense."
            }
          ]
        }
      },
      {
        id: "les-about-2",
        moduleIndex: 0,
        lessonIndex: 2,
        weekNumber: 0,
        title: "Innovation Leadership Framework",
        contentType: "reading",
        duration: "20 mins",
        durationMinutes: 20,
        summary: "Detailed overview of the 8-phase Innovation Leadership Framework deployed in this program.",
        objectives: [
          "Navigate the TRL (Technology Readiness Level) progression.",
          "Align prototype development with AICTE internship credit benchmarks."
        ],
        takeaways: [
          "Weekly milestones must be documented in your Student Mentor Logbook."
        ],
        resources: [
          { title: "Innovation Framework Manual", type: "pdf", url: "#", size: "2.1 MB" }
        ],
        readingContent: {
          overview: "The Innovation Leadership Framework establishes standardized milestones for turning novel hypotheses into validated prototypes, defensible intellectual property, and scalable venture proposals.",
          actionLinkText: "Click here to view the complete Innovation Leadership Framework",
          actionLinkUrl: "https://ncie.org.in/framework",
          sections: [
            {
              heading: "Milestone Progression",
              body: "From problem discovery in Week 1 to the final investor defense in Week 8, each student progresses systematically through industry-verified stages."
            }
          ]
        }
      }
    ]
  },
  {
    id: "mod-how-it-works",
    moduleIndex: 0,
    week: "Orientation",
    title: "How does an NCIE online course work?",
    subtitle: "Essential onboarding instructions, evaluation metrics, forum etiquette, and credit guidelines.",
    theme: "Course Guide",
    isSpecialCategory: true,
    lessons: [
      {
        id: "les-how-1",
        moduleIndex: 0,
        lessonIndex: 1,
        weekNumber: 0,
        title: "Information about the course and accessing the content",
        contentType: "reading",
        duration: "10 mins",
        durationMinutes: 10,
        summary: "A quick walk-through on how to consume lectures, access transcripts, and download assignment materials.",
        objectives: ["Access course lectures and lecture notes seamlessly on web and mobile."],
        takeaways: ["Lectures are released weekly and can be viewed at any time."],
        resources: [{ title: "Student Quickstart Guide (PDF)", type: "pdf", url: "#", size: "1.2 MB" }],
        readingContent: {
          overview: "All course contents including video lectures, lecture notes, assignments, and discussion boards are accessible through this portal.",
          actionLinkText: "Click here to read the detailed course access instructions",
          actionLinkUrl: "#",
          sections: [
            {
              heading: "Weekly Release Schedule",
              body: "New weekly modules are released every Monday at 00:00 IST. You may view the video lectures asynchronously at your own pace."
            }
          ]
        }
      },
      {
        id: "les-how-2",
        moduleIndex: 0,
        lessonIndex: 2,
        weekNumber: 0,
        title: "Welcome to NCIE open online course",
        contentType: "reading",
        duration: "8 mins",
        durationMinutes: 8,
        summary: "Welcome message from the NCIE Academic Council and National Steering Committee.",
        objectives: ["Understand the national mission and student cohort expectations."],
        takeaways: ["You are part of a national cohort of 50,000+ student innovators."],
        resources: [],
        readingContent: {
          overview: "Welcome to the NCIE Open Online Internship and Certification portal! We are delighted to guide you through this transformative journey.",
          actionLinkText: "Click here to view the Welcome Address from the Director General",
          actionLinkUrl: "#",
          sections: [
            {
              heading: "Message from Academic Council",
              body: "This course has been crafted in collaboration with senior educators and industry veterans to give you practical, hands-on entrepreneurial tools."
            }
          ]
        }
      },
      {
        id: "les-how-3",
        moduleIndex: 0,
        lessonIndex: 3,
        weekNumber: 0,
        title: "Announcement",
        contentType: "reading",
        duration: "5 mins",
        durationMinutes: 5,
        summary: "Guidelines on checking official circulars, exam notices, and live AMA sessions.",
        objectives: ["Keep track of program deadlines and circulars."],
        takeaways: ["Always check the Announcements tab at the beginning of each week."],
        resources: [],
        readingContent: {
          overview: "All critical notices such as assignment deadlines, live Q&A webinar links, and proctored defense dates will be posted in the Announcements section.",
          actionLinkText: "Click here to view active course announcements",
          actionLinkUrl: "#",
          sections: [
            {
              heading: "Notification Channels",
              body: "In addition to this portal, key circulars are transmitted via official email and SMS alerts."
            }
          ]
        }
      },
      {
        id: "les-how-4",
        moduleIndex: 0,
        lessonIndex: 4,
        weekNumber: 0,
        title: "Discussion Forum: Do you have a doubt or question",
        contentType: "reading",
        duration: "10 mins",
        durationMinutes: 10,
        summary: "Etiquette and procedures for raising academic doubts and connecting with mentors in the forum.",
        objectives: ["Effectively use the Q&A forum to ask questions and search prior answers."],
        takeaways: ["Mentors and Teaching Assistants answer all doubts within 24 business hours."],
        resources: [],
        readingContent: {
          overview: "The discussion forum allows you to interact with fellow students, instructors, and industry mentors.",
          actionLinkText: "Click here to open the Discussion Forum / Q&A",
          actionLinkUrl: "#",
          sections: [
            {
              heading: "Forum Etiquette",
              body: "Search existing threads before posting a new question. Keep discussions focused on course concepts and technical queries."
            }
          ]
        }
      },
      {
        id: "les-how-5",
        moduleIndex: 0,
        lessonIndex: 5,
        weekNumber: 0,
        title: "Know your scores in the Assignments",
        contentType: "reading",
        duration: "10 mins",
        durationMinutes: 10,
        summary: "How weekly assignment scores are calculated, weighted, and normalized for your final grade.",
        objectives: ["Understand the Best 6 out of 8 assignments rule."],
        takeaways: ["Assignments carry 25% weightage toward your final course score."],
        resources: [],
        readingContent: {
          overview: "Every week concludes with an online assessment. Your top 6 highest scores will be factored into your final grade.",
          actionLinkText: "Click here to check your live Progress & Assessment Scores",
          actionLinkUrl: "#",
          sections: [
            {
              heading: "Calculation Policy",
              body: "Average of Best 6 out of 8 assignments = 25% of total score. Minimum required: 40% in assignments."
            }
          ]
        }
      },
      {
        id: "les-how-6",
        moduleIndex: 0,
        lessonIndex: 6,
        weekNumber: 0,
        title: "What you should know about the final certification exam",
        contentType: "reading",
        duration: "12 mins",
        durationMinutes: 12,
        summary: "Details about the proctored Capstone Defense and comprehensive final certification assessment.",
        objectives: ["Prepare for the proctored assessment and capstone presentation."],
        takeaways: ["The capstone defense carries 75% weightage."],
        resources: [{ title: "Exam Center Guidelines (PDF)", type: "pdf", url: "#", size: "850 KB" }],
        readingContent: {
          overview: "The final evaluation comprises a proctored capstone defense conducted virtually or at authorized university nodal centers.",
          actionLinkText: "Click here to view Exam & Defense details",
          actionLinkUrl: "#",
          sections: [
            {
              heading: "Defense Format",
              body: "Submit your capstone prototype, GitHub repo, and pitch deck. The review panel evaluates innovation, technical depth, and market viability."
            }
          ]
        }
      },
      {
        id: "les-how-7",
        moduleIndex: 0,
        lessonIndex: 7,
        weekNumber: 0,
        title: "Certification criteria",
        contentType: "reading",
        duration: "10 mins",
        durationMinutes: 10,
        summary: "Eligibility criteria for Elite, Silver, and Gold badges, and AICTE credit transfer.",
        objectives: ["Know the grade cut-offs for NPTEL/NCIE certificates."],
        takeaways: [
          ">= 90%: Elite + Gold Badge",
          "75% - 89%: Elite + Silver Badge",
          "60% - 74%: Elite Badge",
          "40% - 59%: Successfully Completed"
        ],
        resources: [],
        readingContent: {
          overview: "Official e-certificates with verifiable QR codes are issued to all qualifying students, recognized for 2 AICTE collegiate credits.",
          actionLinkText: "Click here to view sample Certificate and verification",
          actionLinkUrl: "#",
          sections: [
            {
              heading: "Credit Transfer",
              body: "Certificates feature student roll number, AISHE code, sector specialization, and consolidated marks."
            }
          ]
        }
      }
    ]
  },
  {
    id: "mod-0",
    moduleIndex: 0,
    week: 0,
    title: "Week 0: Orientation & Baseline Diagnostic",
    subtitle: "Setting up your digital incubator environment and completing the baseline diagnostic survey.",
    theme: "Week 0",
    lessons: [
      {
        id: "les-0-1",
        moduleIndex: 0,
        lessonIndex: 1,
        weekNumber: 0,
        title: "Week 0 Lecture: Internship Ecosystem Orientation",
        contentType: "video",
        duration: "24 mins",
        durationMinutes: 24,
        youtubeId: "V_P_8mQZ4kE",
        youtubeTitle: "NCIE Internship Orientation & Tooling Setup",
        summary: "Orientation on the internship workspace, cloud tooling, collaborative GitHub workflows, and AICTE credit tracking.",
        objectives: [
          "Configure development and prototyping tooling.",
          "Understand weekly submission deadlines and mentor check-ins."
        ],
        takeaways: [
          "Complete the Assignment 0 diagnostic survey to calibrate your sector track."
        ],
        resources: [
          { title: "Internship Handbook (PDF)", type: "pdf", url: "#", size: "4.1 MB" }
        ],
        quiz: [
          {
            id: "q0-1",
            question: "How many weekly assignment scores are considered for the final 25% assignment weightage?",
            options: ["All 8 assignments", "Best 6 out of 8 assignments", "Only the final 2 assignments", "Any 4 assignments"],
            correctIndex: 1,
            explanation: "As per NPTEL/NCIE academic policy, the Best 6 out of 8 weekly assignments are computed."
          },
          {
            id: "q0-2",
            question: "What is the minimum passing score in both assignments and the final defense?",
            options: ["25%", "33%", "40%", "50%"],
            correctIndex: 2,
            explanation: "Students must achieve at least 40% in assignments AND 40% in the final capstone defense."
          }
        ]
      },
      {
        id: "les-0-2",
        moduleIndex: 0,
        lessonIndex: 2,
        weekNumber: 0,
        title: "Assignment 0: Baseline Aptitude & Diagnostic Survey",
        contentType: "quiz",
        duration: "15 mins",
        durationMinutes: 15,
        summary: "Diagnostic baseline assessment to evaluate pre-existing entrepreneurial and analytical competencies.",
        objectives: ["Assess pre-internship competencies."],
        takeaways: ["Ungraded practice assignment to familiarize you with the quiz format."],
        resources: [],
        quiz: [
          {
            id: "q0-3",
            question: "Which national initiative aims to make India a developed nation by 2047?",
            options: ["Digital India 2.0", "Viksit Bharat @2047", "Startup India Seed", "Skill India Mission"],
            correctIndex: 1,
            explanation: "Viksit Bharat @2047 is the Government of India's vision to transform India into a developed nation."
          }
        ]
      }
    ]
  },
  {
    id: "mod-1",
    moduleIndex: 1,
    week: 1,
    title: "Week 1: Ideation & Problem Discovery",
    subtitle: "Understanding India's socio-economic trajectory and the national innovation framework.",
    theme: "Week 1",
    lessons: [
      {
        id: "les-1-1",
        moduleIndex: 1,
        lessonIndex: 1,
        weekNumber: 1,
        title: "Introduction to Viksit Bharat @2047 & NCIE Mandate",
        duration: "32 mins",
        durationMinutes: 32,
        youtubeId: "V_P_8mQZ4kE", // Replaceable with official channel video ID
        youtubeTitle: "NCIE National Orientation: Vision for a Developed India @2047",
        summary: "This opening masterclass contextualizes the four execution phases of Viksit Bharat 2047, the national mission of 'One Family – One Entrepreneur', and how student innovators fit into India's centenary roadmap.",
        objectives: [
          "Understand the 4 foundational pillars of Viksit Bharat @2047.",
          "Identify how collegiate incubation chapters translate research to enterprise.",
          "Familiarize with the AICTE/UGC internship standards and credit allocations.",
        ],
        takeaways: [
          "The Viksit Bharat blueprint targets a multi-trillion dollar digital innovation economy by 2047.",
          "NCIE acts as the national apex bridge uniting academia, industry labs, and venture capital.",
          "Active intern participation demands maintaining a digital work diary and completing milestones.",
        ],
        resources: [
          { title: "NCIE Viksit Bharat @2047 Official Vision Document.pdf", type: "pdf", url: "/NCIE_Vision_Document_2047.pdf", size: "7.8 MB" },
          { title: "Internship Academic Guidelines & AICTE Credit Framework.pdf", type: "pdf", url: "/NCIE_Viksit_Bharat_2047_Innovation_Leadership_Programmes.pdf", size: "868 KB" }
        ],
        quiz: [
          {
            id: "q-1-1",
            question: "What is the primary socio-economic mission timeline targeted by Viksit Bharat?",
            options: ["Centenary of India's Independence in 2047", "Vision 2030 Sustainable Development Goals", "Golden Jubilee 2050", "Five-Year Plan 2029"],
            correctIndex: 0,
            explanation: "Viksit Bharat is the apex national mission aiming for India to become a fully developed nation by 2047, the centenary of independence."
          },
          {
            id: "q-1-2",
            question: "Under the NCIE collegiate framework, what is the core philosophy regarding youth employment?",
            options: ["Job Seekers Only", "One Family – One Entrepreneur", "Exclusive Overseas Placement", "Civil Services Preparation"],
            correctIndex: 1,
            explanation: "NCIE promotes the grassroots philosophy of 'One Family – One Entrepreneur' to cultivate homegrown enterprise builders."
          },
          {
            id: "q-1-3",
            question: "What is a mandatory requirement for students to receive UGC/AICTE internship credits?",
            options: ["Attending in-person only", "Maintaining a verifiable weekly work logbook and capstone defense", "Writing a 100-page book", "Paying commercial tuition fees"],
            correctIndex: 1,
            explanation: "Credit-linked internships require maintaining a verified weekly work logbook, structured module completion, and a capstone submission."
          }
        ]
      },
      {
        id: "les-1-2",
        moduleIndex: 1,
        lessonIndex: 2,
        weekNumber: 1,
        title: "Ecosystem Deep-Dive: Innovation Indices, IPR & Institutional Growth",
        duration: "38 mins",
        durationMinutes: 38,
        youtubeId: "PkZNo7MFNFg",
        youtubeTitle: "Masterclass: India's Global Innovation Rank & Deep-Tech Policy",
        summary: "An analytical study of India's leap in the Global Innovation Index (GII), the role of university patent filings, and state innovation hubs.",
        objectives: [
          "Explore the metrics powering the Global Innovation Index.",
          "Learn how intellectual property creates defensible national wealth.",
          "Identify regional incubation networks and grant funding mechanisms."
        ],
        takeaways: [
          "Filing provisional patents early safeguards collegiate prototypes.",
          "Government grants like Kalam Seed Scheme provide non-dilutive seed funding."
        ],
        resources: [
          { title: "Dr. A.P.J. Abdul Kalam Seed Funding Guidelines.pdf", type: "pdf", url: "/Kalam_Startup_Seed_Funding_Scheme.pdf", size: "941 KB" }
        ],
        quiz: [
          {
            id: "q-1-4",
            question: "What type of patent filing allows student innovators to establish priority date at lowest initial cost?",
            options: ["Non-provisional specification", "Provisional patent application", "Design registration only", "Copyright certificate"],
            correctIndex: 1,
            explanation: "A provisional patent gives inventors 12 months to refine the full specification while locking in an immediate priority date."
          }
        ]
      }
    ]
  },
  {
    id: "mod-2",
    moduleIndex: 2,
    week: 2,
    title: "Design Thinking, Need Discovery & Problem Scoping",
    subtitle: "Moving from vague ideas to sharply defined, high-impact societal and industrial problems.",
    theme: "Design Thinking & Research",
    lessons: [
      {
        id: "les-2-1",
        moduleIndex: 2,
        lessonIndex: 1,
        weekNumber: 2,
        title: "The 5-Stage Stanford d.school Design Thinking Framework",
        duration: "45 mins",
        durationMinutes: 45,
        youtubeId: "bEusrD8g-dM",
        youtubeTitle: "Design Thinking in Practice: Empathize, Define, Ideate, Prototype, Test",
        summary: "A practical guide to empathetic user research, root cause analysis (5 Whys), problem statement articulation, and avoiding premature solution trap.",
        objectives: [
          "Master user persona interviewing techniques without leading questions.",
          "Construct actionable 'How Might We' (HMW) challenge questions.",
          "Synthesize empathy maps and user journey pain points."
        ],
        takeaways: [
          "Fall in love with the problem, not your initial prototype.",
          "Real innovation addresses unarticulated latent customer needs."
        ],
        resources: [
          { title: "NCIE Problem Statement Definition & Empathy Canvas.pdf", type: "template", url: "/documents/empathy_canvas.pdf", size: "340 KB" }
        ],
        quiz: [
          {
            id: "q-2-1",
            question: "What is the primary danger of skipping the 'Empathize' stage in Design Thinking?",
            options: ["Building a technically sound product that nobody actually needs", "Overspending on cloud compute", "Missing the filing deadline", "Violating copyright laws"],
            correctIndex: 0,
            explanation: "Skipping empathy leads to building solutions looking for a problem, resulting in zero user adoption."
          }
        ]
      }
    ]
  },
  {
    id: "mod-3",
    moduleIndex: 3,
    week: 3,
    title: "Emerging Technologies, AI Architectures & Industry 4.0",
    subtitle: "Leveraging AI, IoT, cloud engineering, and data systems in sector-specific solutions.",
    theme: "Deep Tech & Modern Tools",
    lessons: [
      {
        id: "les-3-1",
        moduleIndex: 3,
        lessonIndex: 1,
        weekNumber: 3,
        title: "Modern AI Stack: LLMs, Automation & Enterprise Workflows",
        duration: "50 mins",
        durationMinutes: 50,
        youtubeId: "zjkBMFhNj_g",
        youtubeTitle: "Architecting Generative AI & Automation for Real-World Systems",
        summary: "How to integrate AI APIs, vector retrieval, and automated intelligence into real-world applications across engineering, agriculture, and finance.",
        objectives: [
          "Evaluate when to use AI vs traditional deterministic software.",
          "Architect robust data pipelines with privacy & edge compute.",
          "Design fail-safe user interfaces with human-in-the-loop oversight."
        ],
        takeaways: [
          "AI should augment domain-specific human intelligence, not replace verification.",
          "Focus on domain-specific proprietary workflows rather than generic wrappers."
        ],
        resources: [
          { title: "AI Business & Technology Implementation Blueprint.pdf", type: "pdf", url: "/NCIE_3_COURSES.pdf", size: "150 KB" }
        ],
        quiz: [
          {
            id: "q-3-1",
            question: "In deep-tech ventures, what provides long-term defensibility against commoditized AI models?",
            options: ["Proprietary domain data & workflow integration", "Buying more GPU credits", "Hiding the code", "Changing the UI theme"],
            correctIndex: 0,
            explanation: "Proprietary domain datasets, tight customer workflow integration, and unique distribution provide true defensibility."
          }
        ]
      }
    ]
  },
  {
    id: "mod-4",
    moduleIndex: 4,
    week: 4,
    title: "Rapid Prototyping, MVP Engineering & Feasibility",
    subtitle: "Building testable Proof of Concepts (POC) with minimal cost and maximum agility.",
    theme: "Prototyping & Tech Lifecycle",
    lessons: [
      {
        id: "les-4-1",
        moduleIndex: 4,
        lessonIndex: 1,
        weekNumber: 4,
        title: "Minimum Viable Product (MVP) Engineering & Validation Loops",
        duration: "40 mins",
        durationMinutes: 40,
        youtubeId: "0p7Z4lI2U3M",
        youtubeTitle: "Zero to Prototype: Rapid MVP Development & User Testing Cycles",
        summary: "Step-by-step methodologies to build functional prototypes in 7 to 14 days, measure feedback metrics, and iterate before heavy code investment.",
        objectives: [
          "Differentiate between a prototype, POC, and a production MVP.",
          "Set up automated feedback collection and usage telemetry.",
          "Prepare engineering architecture documentation for project reviews."
        ],
        takeaways: [
          "An MVP must test the single riskiest assumption first.",
          "Measure quantifiable user engagement, not verbal compliments."
        ],
        resources: [
          { title: "NCIE Engineering Architecture & MVP Checklist.pdf", type: "template", url: "/NCIE_DPR.pdf", size: "1.2 MB" }
        ],
        quiz: [
          {
            id: "q-4-1",
            question: "What is the primary objective of a Minimum Viable Product (MVP)?",
            options: ["Testing the riskiest value hypothesis with minimal resources", "Making immediate revenue", "Winning hackathons", "Filing international trademarks"],
            correctIndex: 0,
            explanation: "An MVP exists to validate or invalidate the fundamental value proposition with real users as fast as possible."
          }
        ]
      }
    ]
  },
  {
    id: "mod-5",
    moduleIndex: 5,
    week: 5,
    title: "Business Modeling, Unit Economics & Market Validation",
    subtitle: "Translating technical prototypes into sustainable, scalable economic ventures.",
    theme: "Commercialization & Economics",
    lessons: [
      {
        id: "les-5-1",
        moduleIndex: 5,
        lessonIndex: 1,
        weekNumber: 5,
        title: "Business Model Canvas (BMC) & Value Proposition Design",
        duration: "44 mins",
        durationMinutes: 44,
        youtubeId: "IP0cUBWTgpY",
        youtubeTitle: "Business Model Canvas: Monetization, Cost Structures & Growth Channels",
        summary: "Detailed breakdown of the 9 building blocks of the Business Model Canvas with live case studies of successful Indian tech and social enterprises.",
        objectives: [
          "Map customer segments, cost structures, and revenue streams.",
          "Calculate Customer Acquisition Cost (CAC) and Lifetime Value (LTV).",
          "Formulate strategic academic-to-market translation plans."
        ],
        takeaways: [
          "Sustainable enterprise requires positive unit economics from early milestones.",
          "Identify channels that allow high organic word-of-mouth distribution."
        ],
        resources: [
          { title: "Viksit Bharat Student Startup Grant Application Canvas.pdf", type: "template", url: "/NCIE_Student_Startup_Grants_Guidelines.pdf", size: "925 KB" }
        ],
        quiz: [
          {
            id: "q-5-1",
            question: "For a viable venture, how should Lifetime Value (LTV) compare to Customer Acquisition Cost (CAC)?",
            options: ["LTV should be significantly higher than CAC (ideally > 3x)", "CAC should exceed LTV", "They must always be exactly equal", "CAC does not matter in business"],
            correctIndex: 0,
            explanation: "A healthy sustainable business generally maintains an LTV to CAC ratio of 3:1 or higher."
          }
        ]
      }
    ]
  },
  {
    id: "mod-6",
    moduleIndex: 6,
    week: 6,
    title: "Intellectual Property, Governance & Regulatory Compliance",
    subtitle: "Protecting inventions, copyright, open source licensing, and legal standards.",
    theme: "IPR & Legal Framework",
    lessons: [
      {
        id: "les-6-1",
        moduleIndex: 6,
        lessonIndex: 1,
        weekNumber: 6,
        title: "Patents, Trademarks, Copyrights & Indian Patent Office Workflows",
        duration: "36 mins",
        durationMinutes: 36,
        youtubeId: "Z1BCujX3pw8",
        youtubeTitle: "IPR Protection for Student Innovators: Filing & Prior Art Search",
        summary: "Navigating the Indian Patent Office (IPO), conducting prior art searches on Google Patents and InPASS, and utilizing collegiate IPR facilitation cells.",
        objectives: [
          "Perform comprehensive prior art patent searches.",
          "Draft initial provisional patent specifications and claims.",
          "Understand open source vs proprietary IP licensing strategies."
        ],
        takeaways: [
          "Never publish in a research journal or public repo before filing a provisional patent if commercial novelty exists.",
          "NCIE provides institutional support for collegiate IPR filings."
        ],
        resources: [
          { title: "Indian Patent Office Prior Art Search Guidelines.pdf", type: "pdf", url: "/Circular_Guidelines_2026.pdf", size: "925 KB" }
        ],
        quiz: [
          {
            id: "q-6-1",
            question: "Why should you NOT publicly disclose an invention on social media or in a conference paper before filing?",
            options: ["It destroys the legal novelty requirement for patentability", "It reduces social media followers", "It is banned by the college library", "It requires higher internet bandwidth"],
            correctIndex: 0,
            explanation: "Public disclosure prior to filing enters the invention into prior art and destroys novelty in absolute novelty jurisdictions."
          }
        ]
      }
    ]
  },
  {
    id: "mod-7",
    moduleIndex: 7,
    week: 7,
    title: "Capstone Project Preparation, Mentorship & Review",
    subtitle: "Consolidating your 8-week work into a high-caliber project defense and documentation.",
    theme: "Capstone Execution",
    lessons: [
      {
        id: "les-7-1",
        moduleIndex: 7,
        lessonIndex: 1,
        weekNumber: 7,
        title: "Structuring Your Final Capstone Dossier & Demonstration",
        duration: "40 mins",
        durationMinutes: 40,
        youtubeId: "5qap5aO4i9A",
        youtubeTitle: "How to Build a World-Class Capstone Project Deck & Technical Demo",
        summary: "Preparing the comprehensive project report: Executive Summary, Problem Definition, Solution Architecture, GitHub repository cleanliness, and video demonstration.",
        objectives: [
          "Organize repository code with clear README, setup guides, and architectural diagrams.",
          "Record a crisp 3-minute video walk-through demonstrating working features.",
          "Prepare defense answers for evaluators and industry mentors."
        ],
        takeaways: [
          "A clean, reproducible demonstration is worth more than 100 pages of theoretical writing.",
          "Highlight quantifiable performance benchmarks and measurable impact."
        ],
        resources: [
          { title: "Official Capstone Project Report Template.pdf", type: "template", url: "/REGISTRATION_CONFIRMATION_LETTER.pdf", size: "939 KB" }
        ],
        quiz: [
          {
            id: "q-7-1",
            question: "What is the most critical element of an engineering project's GitHub repository for evaluator review?",
            options: ["Clear README with architecture diagram, installation steps, and demo link", "Over 1,000 commits", "Having a dark mode theme only", "Hiding the source files"],
            correctIndex: 0,
            explanation: "Evaluators need an immediate, reproducible roadmap with installation steps, architecture diagrams, and a working demo."
          }
        ]
      }
    ]
  },
  {
    id: "mod-8",
    moduleIndex: 8,
    week: 8,
    title: "Final Capstone Defense, National Registry & Certification",
    subtitle: "Formal evaluation, certificate generation, and seed grant nomination.",
    theme: "Graduation & National Certification",
    lessons: [
      {
        id: "les-8-1",
        moduleIndex: 8,
        lessonIndex: 1,
        weekNumber: 8,
        title: "Internship Defense, AICTE/UGC Credit Approval & Next Steps",
        duration: "30 mins",
        durationMinutes: 30,
        youtubeId: "V_P_8mQZ4kE",
        youtubeTitle: "Viksit Bharat Internship Convocation & National Innovation Opportunities",
        summary: "Closing ceremony masterclass on translating your completed internship into academic credits, startup incubation, Kalam Seed grants, and corporate placements.",
        objectives: [
          "Submit the completed weekly logbook for digital institutional sign-off.",
          "Download your digitally signed Viksit Bharat Certificate of Completion.",
          "Apply for the ₹5 Lakhs Kalam Seed Funding round for top-graded capstones."
        ],
        takeaways: [
          "All verified certificates carry a unique cryptographic QR verification code.",
          "Top 10% capstone innovations receive direct fast-track incubation entry."
        ],
        resources: [
          { title: "National Incubation & Development Scheme (IIDSS).pdf", type: "pdf", url: "/Institutional_Incubation_Development_Support_Scheme.pdf", size: "950 KB" }
        ],
        quiz: [
          {
            id: "q-8-1",
            question: "How can future employers or universities verify the authenticity of your NCIE certificate?",
            options: ["By scanning the digital QR code or entering the Certificate ID in the official portal", "By mailing a paper letter", "By telephone call only", "Certificates cannot be verified"],
            correctIndex: 0,
            explanation: "All NCIE Viksit Bharat certificates are permanently recorded in the National Innovation Registry and verifiable 24/7 via QR code."
          }
        ]
      }
    ]
  },
  {
    id: "mod-transcripts",
    moduleIndex: 9,
    week: "Resources",
    title: "Text Transcripts",
    subtitle: "Verbatim lecture transcripts in English and Hindi for offline study and revision.",
    theme: "Text Transcripts",
    isSpecialCategory: true,
    lessons: [
      {
        id: "les-trans-en",
        moduleIndex: 9,
        lessonIndex: 1,
        weekNumber: 0,
        title: "English Transcripts: Complete Course Compilation (PDF)",
        contentType: "transcript",
        duration: "PDF Document",
        durationMinutes: 0,
        summary: "Full English verbatim transcript of all 8 weeks of video lectures, categorized by module and timestamp.",
        objectives: ["Review lecture notes offline in text format."],
        takeaways: ["Searchable text index with key formula references."],
        resources: [
          { title: "English_Lecture_Transcripts_NOC26_Complete.pdf", type: "pdf", url: "#", size: "8.4 MB" }
        ],
        readingContent: {
          overview: "Download the complete verbatim English transcripts covering Weeks 1 through 8. These transcripts are indexed by lecture timestamp.",
          actionLinkText: "Click here to download English Text Transcripts (PDF)",
          actionLinkUrl: "#",
          sections: [
            {
              heading: "About the Transcripts",
              body: "Transcripts are generated and verified by the NCIE Editorial Board to assist students with hearing impairments, low-bandwidth internet connectivity, and fast revision."
            }
          ]
        }
      },
      {
        id: "les-trans-hi",
        moduleIndex: 9,
        lessonIndex: 2,
        weekNumber: 0,
        title: "Hindi Transcripts: सम्पूर्ण पाठ्यक्रम प्रतिलेख (PDF)",
        contentType: "transcript",
        duration: "PDF Document",
        durationMinutes: 0,
        summary: "सप्ताह 1 से 8 तक के सभी वीडियो व्याख्यानों का हिंदी अनुवादित प्रतिलेख।",
        objectives: ["हिंदी माध्यम में पाठ्यक्रम सामग्री का अध्ययन करें।"],
        takeaways: ["तकनीकी शब्दावली और परिभाषाओं का द्विभाषी संग्रह।"],
        resources: [
          { title: "Hindi_Transcripts_NOC26_Complete.pdf", type: "pdf", url: "#", size: "9.1 MB" }
        ],
        readingContent: {
          overview: "राष्ट्रीय शिक्षा नीति (NEP 2020) के अनुरूप सभी व्याख्यानों का हिंदी अनुवाद उपलब्ध कराया गया है।",
          actionLinkText: "Click here to download Hindi Text Transcripts (PDF)",
          actionLinkUrl: "#",
          sections: [
            {
              heading: "NEP 2020 बहुभाषी पहल",
              body: "छात्रों की सुगमता के लिए प्रमुख तकनीकी अवधारणाओं को हिंदी और अंग्रेजी दोनों में समझाया गया है।"
            }
          ]
        }
      }
    ]
  },
  {
    id: "mod-books",
    moduleIndex: 10,
    week: "Resources",
    title: "Books",
    subtitle: "Recommended textbooks, case studies, and reference manuals recognized by AICTE.",
    theme: "Books & References",
    isSpecialCategory: true,
    lessons: [
      {
        id: "les-books-1",
        moduleIndex: 10,
        lessonIndex: 1,
        weekNumber: 0,
        title: "Recommended Reference Books & Reading Material",
        contentType: "book",
        duration: "Reference Library",
        durationMinutes: 0,
        summary: "Standard reference reading list approved by the NCIE Board of Studies and AICTE curriculum committee.",
        objectives: ["Access foundational literature in entrepreneurship, IPR, and venture creation."],
        takeaways: ["Access free open-access e-books through the National Digital Library of India."],
        resources: [
          { title: "AICTE Recommended Reading Syllabus.pdf", type: "pdf", url: "#", size: "1.4 MB" }
        ],
        readingContent: {
          overview: "Explore curated reading materials recommended by faculty from IITs, IIMs, and NCIE Academic Council.",
          actionLinkText: "Click here to access the National Digital Library of India (NDLI)",
          actionLinkUrl: "https://ndl.iitkgp.ac.in",
          sections: [
            {
              heading: "Core References",
              body: "1. 'Disciplined Entrepreneurship: 24 Steps to a Successful Startup' by Bill Aulet (MIT Sloan).\n2. 'The Lean Startup' by Eric Ries.\n3. 'Intellectual Property Rights in India' by V. K. Ahuja.\n4. 'Viksit Bharat @2047: Transforming India into a Global Superpower' (Govt of India Whitepaper)."
            }
          ]
        }
      }
    ]
  },
  {
    id: "mod-downloads",
    moduleIndex: 11,
    week: "Resources",
    title: "Download Videos",
    subtitle: "Offline high-definition video archives for low-bandwidth environments.",
    theme: "Download Videos",
    isSpecialCategory: true,
    lessons: [
      {
        id: "les-dl-1",
        moduleIndex: 11,
        lessonIndex: 1,
        weekNumber: 0,
        title: "Download Video Lectures (MP4 / High Definition)",
        contentType: "download",
        duration: "Offline Archives",
        durationMinutes: 0,
        summary: "Direct download links for all weekly lectures in 720p and 1080p MP4 format for offline viewing.",
        objectives: ["Download lectures for offline study when traveling or in areas with intermittent connectivity."],
        takeaways: ["Offline viewing is synchronized when reconnecting to verify completion."],
        resources: [
          { title: "Week 1 - 4 Lecture Pack (ZIP, 1.2 GB)", type: "link", url: "#" },
          { title: "Week 5 - 8 Lecture Pack (ZIP, 1.4 GB)", type: "link", url: "#" }
        ],
        readingContent: {
          overview: "Download compressed video packages for offline studying. Once downloaded, you can watch lectures without consuming internet data.",
          actionLinkText: "Click here to view official NCIE YouTube Channel Playlists",
          actionLinkUrl: "https://www.youtube.com/@NCIEIndia",
          sections: [
            {
              heading: "Offline Synchronization",
              body: "When you reconnect to the portal, the anti-cheat verification system records your offline study logs."
            }
          ]
        }
      }
    ]
  }
];

export interface ExamCenter {
  city: string;
  state: string;
  centerCode: string;
  venue: string;
  slots: string[];
}

export const EXAM_CENTERS: ExamCenter[] = [
  { city: "New Delhi", state: "Delhi NCR", centerCode: "DEL-01", venue: "IIT Delhi Campus, Hauz Khas", slots: ["Session 1: 09:00 - 12:00", "Session 2: 14:00 - 17:00"] },
  { city: "Mumbai", state: "Maharashtra", centerCode: "MUM-01", venue: "IIT Bombay, Powai", slots: ["Session 1: 09:00 - 12:00", "Session 2: 14:00 - 17:00"] },
  { city: "Bengaluru", state: "Karnataka", centerCode: "BLR-01", venue: "IISc Bengaluru, Malleshwaram", slots: ["Session 1: 09:00 - 12:00", "Session 2: 14:00 - 17:00"] },
  { city: "Hyderabad", state: "Telangana", centerCode: "HYD-01", venue: "IIT Hyderabad, Kandi", slots: ["Session 1: 09:00 - 12:00", "Session 2: 14:00 - 17:00"] },
  { city: "Chennai", state: "Tamil Nadu", centerCode: "CHE-01", venue: "IIT Madras, Guindy", slots: ["Session 1: 09:00 - 12:00", "Session 2: 14:00 - 17:00"] },
  { city: "Kolkata", state: "West Bengal", centerCode: "KOL-01", venue: "Jadavpur University Campus", slots: ["Session 1: 09:00 - 12:00", "Session 2: 14:00 - 17:00"] },
  { city: "Pune", state: "Maharashtra", centerCode: "PUN-01", venue: "COEP Technological University", slots: ["Session 1: 09:00 - 12:00", "Session 2: 14:00 - 17:00"] },
  { city: "Surat / Ahmedabad", state: "Gujarat", centerCode: "GUJ-01", venue: "SVNIT Surat / IIT Gandhinagar", slots: ["Session 1: 09:00 - 12:00", "Session 2: 14:00 - 17:00"] }
];

// Pre-registered mock students for instant demonstration and testing across each course
export const DEMO_STUDENTS: StudentProfile[] = [
  {
    appId: "NCIE/APP/2026/1024",
    rollNo: "22BCE1042",
    name: "Rohan Patel",
    email: "rohan.patel@college.edu",
    mobile: "+91 98765 43210",
    institution: "National Institute of Technology, Surat",
    aisheCode: "C-12849",
    sectorTrack: "Information Technology & AI",
    cohort: "Cohort 2026-A (Spring)",
    enrolledDate: "12 Jan 2026",
    status: "Active",
    progressPercentage: 45,
    hoursLogged: 32,
    totalRequiredHours: 60,
    completedLessons: ["les-1-1", "les-1-2", "les-2-1"],
    quizScores: { "les-1-1": 100, "les-1-2": 100, "les-2-1": 100 },
    enrolledCourseCode: "NCIE-IEDP-101",
    enrolledCourseTitle: "Innovation, Design Thinking & Start-up Development"
  },
  {
    appId: "NCIE/APP/2026/2180",
    rollNo: "COEP-EN-2024",
    name: "Sneha Kulkarni",
    email: "sneha.k@univ.edu.in",
    mobile: "+91 91234 56789",
    institution: "College of Engineering, Pune",
    aisheCode: "C-45892",
    sectorTrack: "Engineering & Technology",
    cohort: "Cohort 2026-A (Spring)",
    enrolledDate: "18 Jan 2026",
    status: "Active",
    progressPercentage: 75,
    hoursLogged: 48,
    totalRequiredHours: 60,
    completedLessons: ["les-1-1", "les-1-2", "les-2-1", "les-3-1", "les-4-1", "les-5-1"],
    quizScores: { "les-1-1": 100, "les-1-2": 100, "les-2-1": 100, "les-3-1": 100, "les-4-1": 100, "les-5-1": 100 },
    enrolledCourseCode: "NCIE-IEDP-102",
    enrolledCourseTitle: "Emerging Technologies, Product Innovation & Entrepreneurship"
  },
  {
    appId: "NCIE/APP/2026/3310",
    rollNo: "IITD-DES-889",
    name: "Aakash Sharma",
    email: "aakash.sharma@ncie.gov.in",
    mobile: "+91 99887 76655",
    institution: "Indian Institute of Technology, Delhi",
    aisheCode: "U-0219",
    sectorTrack: "Entrepreneurship & Startups",
    cohort: "Cohort 2026-A (Spring)",
    enrolledDate: "05 Jan 2026",
    status: "Completed",
    progressPercentage: 100,
    hoursLogged: 60,
    totalRequiredHours: 60,
    completedLessons: ["les-1-1", "les-1-2", "les-2-1", "les-3-1", "les-4-1", "les-5-1", "les-6-1", "les-7-1", "les-8-1"],
    quizScores: { "les-1-1": 100, "les-1-2": 100, "les-2-1": 100, "les-3-1": 100, "les-4-1": 100, "les-5-1": 100, "les-6-1": 100, "les-7-1": 100, "les-8-1": 100 },
    enrolledCourseCode: "NCIE-IEDP-103",
    enrolledCourseTitle: "Technology Commercialization, IPR & Business Model Innovation"
  },
  {
    appId: "NCIE/APP/2026/4405",
    rollNo: "GP-MUM-2024",
    name: "Priya Nair",
    email: "priya.nair@polytechnic.edu.in",
    mobile: "+91 97766 55443",
    institution: "Government Polytechnic, Mumbai",
    aisheCode: "S-33102",
    sectorTrack: "Science & Applied Research",
    cohort: "Polytechnic Batch 2026",
    enrolledDate: "20 Jan 2026",
    status: "Active",
    progressPercentage: 60,
    hoursLogged: 38,
    totalRequiredHours: 60,
    completedLessons: ["les-1-1", "les-1-2", "les-2-1", "les-3-1"],
    quizScores: { "les-1-1": 100, "les-1-2": 100, "les-2-1": 100, "les-3-1": 100 },
    enrolledCourseCode: "NCIE-POLY-101",
    enrolledCourseTitle: "Polytechnic Innovation & Startup Development"
  }
];

export const DEMO_FACULTY: FacultyProfile[] = [
  {
    id: "fac-1",
    facultyId: "AIM-NITI-2026",
    name: "Dr. Ramanathan Ramanan",
    email: "r.ramanan@niti.gov.in",
    institution: "Atal Innovation Mission, NITI Aayog",
    designation: "Mission Director & National Innovation Mentor",
    role: "Industry Mentor",
    assignedCohort: "Cohort 2026-A (National Track)",
    pendingLogbooksCount: 4,
    reviewedStudentsCount: 38
  },
  {
    id: "fac-2",
    facultyId: "SVNIT-DEAN-042",
    name: "Prof. K. Sundararajan",
    email: "sundararajan@svnit.ac.in",
    institution: "National Institute of Technology, Surat",
    designation: "Dean of Academic Affairs & Nodal Officer",
    role: "Faculty Coordinator",
    assignedCohort: "NIT Surat Regional Cohort",
    pendingLogbooksCount: 2,
    reviewedStudentsCount: 45
  }
];

export const DEMO_ADMIN: AdminProfile = {
  id: "admin-1",
  adminId: "NCIE-ADM-001",
  name: "Dr. Abhay Jere",
  email: "admin@ncieindia.org",
  role: "NCIE Super Admin",
  institution: "National Council for Innovation & Entrepreneurship",
  department: "National Council Secretariat & Academic Governance"
};

export const DEFAULT_LOGBOOK_ENTRIES: LogbookEntry[] = [
  {
    id: "log-w1",
    week: 1,
    dateRange: "Week 1: Jan 12 - Jan 18, 2026",
    hoursLogged: 8,
    activitiesCompleted: "Completed National Vision masterclass, studied the 4 pillars of Viksit Bharat 2047, and analyzed Global Innovation Index metrics.",
    learningsAndSkills: "Understanding national deep-tech translation pipelines, patent priority locking, and university incubation frameworks.",
    challengesFaced: "Initial scoping of the project theme across interdisciplinary domains.",
    mentorFeedback: "Strong start. Focus on addressing a specific regional problem in your chosen sector track.",
    status: "Verified by Mentor",
    submittedAt: "18 Jan 2026, 18:30 IST"
  },
  {
    id: "log-w2",
    week: 2,
    dateRange: "Week 2: Jan 19 - Jan 25, 2026",
    hoursLogged: 8,
    activitiesCompleted: "Conducted 6 stakeholder user interviews to validate the problem statement using the Stanford d.school Empathy Canvas.",
    learningsAndSkills: "Empathy mapping, user journey synthesis, and formulating actionable How-Might-We statements.",
    challengesFaced: "Users had conflicting pain points; filtered noise using frequency-severity matrices.",
    mentorFeedback: "Excellent user research documentation. Good transition to problem formulation.",
    status: "Verified by Mentor",
    submittedAt: "25 Jan 2026, 19:15 IST"
  }
];

export const DEFAULT_CAPSTONE_PROJECT: CapstoneProject = {
  title: "AI-Assisted Precision Irrigation & Soil Nutrient Optimizer for Agro-Ecosystems",
  sector: "Information Technology & AI",
  abstract: "An edge-compute IoT sensor network combined with predictive microclimate forecasting to optimize water consumption by 35% in semi-arid agricultural farming clusters.",
  problemStatement: "Smallholder farmers face severe water table depletion and crop loss due to uncalibrated flood irrigation and erratic rainfall patterns.",
  solutionArchitecture: "Low-power ESP32 moisture & NPK telemetry nodes transmitting to a central LoRa gateway, paired with a Next.js real-time analytics dashboard and SMS advisory bot.",
  githubUrl: "https://github.com/ncie-innovator/viksit-bharat-agro-iot",
  demoUrl: "https://agro-precision-ncie.vercel.app",
  slideDeckUrl: "https://drive.google.com/file/d/sample-agro-presentation/view",
  status: "Under Review",
  submittedAt: "28 Feb 2026, 14:20 IST",
  reviewerRemarks: "Innovative edge-architecture with tangible rural impact. Recommended for Kalam Seed Funding evaluation."
};

export interface AnnouncementItem {
  id: string;
  title: string;
  date: string;
  relativeTime: string;
  author: string;
  category: "Important" | "Assignment" | "Exam" | "General";
  content: string;
  refNumber: string;
  isPinned?: boolean;
  pdfAttachment?: {
    filename: string;
    filesize: string;
  };
  keyPoints?: string[];
  actionBtn?: {
    label: string;
    actionType: "tab" | "exam" | "external";
    target?: string;
  };
}

export type Announcement = AnnouncementItem;

export const COURSE_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: "ann-2",
    title: "Live Doubt Clearing & Industry Mentorship Session with NITI Aayog Experts",
    date: "28 Feb 2026, 17:30 IST",
    relativeTime: "1 week ago",
    author: "Academic Advisory Desk",
    category: "Important",
    refNumber: "NCIE/NITI-AIM/AMA-2026/02",
    isPinned: true,
    content: "A live interactive session covering IPR filing, prior art patent searches, and the Dr. A.P.J. Abdul Kalam Seed Grant application will take place this Friday at 5:00 PM IST on our official YouTube channel.",
    keyPoints: [
      "Keynote Mentors: Mission Director (Atal Innovation Mission) & Senior Patent Examiners (Indian Patent Office).",
      "Agenda: Fast-track provisional patent drafting, seed grant disbursement criteria, and university IP sharing norms.",
      "Attendance is strongly recommended for all student innovators working on prototype validation."
    ],
    pdfAttachment: {
      filename: "NITI_NCIE_Mentorship_Schedule_2026.pdf",
      filesize: "485 KB"
    },
    actionBtn: {
      label: "Watch Recorded Stream ↗",
      actionType: "external",
      target: "https://www.youtube.com"
    }
  },
  {
    id: "ann-1",
    title: "Week 4 Assignment Deadline & Progress Submissions",
    date: "04 Mar 2026, 10:00 IST",
    relativeTime: "3 days ago",
    author: "Course Coordinator, NCIE",
    category: "Assignment",
    refNumber: "NCIE/VB2047/CIR-2026-041",
    content: "Dear Candidates, the submission deadline for Week 4 Rapid Prototyping assignment has been set for Sunday 23:59 IST. Please ensure all code repositories and MVP canvases are attached.",
    keyPoints: [
      "Hard deadline: Sunday 23:59 IST (no grace extension per National Academic Council bylaws).",
      "Required attachments: Functional Git repository URL and public MVP demonstration canvas.",
      "Weightage: Carries 15% towards the final Internship Certification grade."
    ],
    pdfAttachment: {
      filename: "Week4_Assignment_Submission_Guidelines.pdf",
      filesize: "320 KB"
    },
    actionBtn: {
      label: "Go to Week 4 Assignment →",
      actionType: "tab",
      target: "course"
    }
  },
  {
    id: "ann-4",
    title: "Proctored Final Certification Exam & Slot Booking Window Open",
    date: "06 Mar 2026, 11:30 IST",
    relativeTime: "Just now",
    author: "Secretariat Examination Cell",
    category: "Exam",
    refNumber: "NCIE/EXAM-CELL/NPTEL-CERT/2026-01",
    content: "Slot reservation is now active for the Viksit Bharat @2047 National Proctored Assessment across 140+ TCS iON examination centers. Please confirm your primary test city and session timing.",
    keyPoints: [
      "Computer-based proctored exam dates: 28th & 29th March 2026 (Morning and Afternoon slots).",
      "Eligibility criteria: Continuous weekly assignment score of at least 40% is mandatory to appear.",
      "Admit Card download will commence on 18th March 2026 under the 'Manage Exam' section."
    ],
    pdfAttachment: {
      filename: "NCIE_Proctored_Exam_Regulations_2026.pdf",
      filesize: "890 KB"
    },
    actionBtn: {
      label: "Open Manage Exam Portal →",
      actionType: "exam"
    }
  },
  {
    id: "ann-3",
    title: "Release of Weekly Logbook Template & AICTE Credit Transfer Guidelines",
    date: "15 Feb 2026, 09:00 IST",
    relativeTime: "3 weeks ago",
    author: "Secretariat Examination Cell",
    category: "General",
    refNumber: "NCIE/AICTE/NEP-CREDIT/2026-09",
    content: "The official institutional format for weekly work diary and college coordinator sign-offs has been updated under the 'Work Logbook' section in compliance with UGC/AICTE norms.",
    keyPoints: [
      "Accredited under AICTE Internship Guidelines 2026 for 4 to 6 academic credit transfers.",
      "Requires weekly digital supervisor sign-offs and mentor review records.",
      "Standard PDF/Word templates are available for direct print and faculty submission."
    ],
    pdfAttachment: {
      filename: "AICTE_Internship_Credit_Transfer_Norms.pdf",
      filesize: "1.1 MB"
    },
    actionBtn: {
      label: "Open Work Logbook Tab →",
      actionType: "tab",
      target: "logbook"
    }
  }
];

export interface ForumThread {
  id: string;
  week: number;
  title: string;
  author: string;
  date: string;
  repliesCount: number;
  resolved: boolean;
  question: string;
  topReply?: {
    author: string;
    role: string;
    answer: string;
    date: string;
  };
}

export const COURSE_FORUM_THREADS: ForumThread[] = [
  {
    id: "th-1",
    week: 1,
    title: "How to conduct prior art patent search using InPASS vs Google Patents?",
    author: "Priya Nair (SEC-02)",
    date: "01 Mar 2026",
    repliesCount: 4,
    resolved: true,
    question: "While investigating novel methods for precision sensors, what key classification codes (IPC) should we prioritize in the Indian Patent database?",
    topReply: {
      author: "Dr. K. S. Rao (Teaching Assistant)",
      role: "NCIE Mentor",
      answer: "In InPASS, utilize the Abstract and Claims boolean operators (AND/OR). Cross-verify International Patent Classification (IPC) sub-class G01N for sensors and B82Y for nanotech.",
      date: "02 Mar 2026"
    }
  },
  {
    id: "th-2",
    week: 3,
    title: "Deployment architecture for Edge IoT devices under unstable rural 4G networks",
    author: "Rohan Patel (SEC-07)",
    date: "26 Feb 2026",
    repliesCount: 3,
    resolved: true,
    question: "If telemetry data packets drop during network blackouts, is SQLite or flash buffer caching recommended for the ESP32 gateway node?",
    topReply: {
      author: "Vamsi Reddy (Industry Lead)",
      role: "CSR & Tech Lead",
      answer: "Use local ring-buffer flash logging with MQTT QoS Level 1. Once connectivity re-establishes, publish the timestamped buffer queue sequentially to avoid data loss.",
      date: "27 Feb 2026"
    }
  },
  {
    id: "th-3",
    week: 5,
    title: "Clarification on Unit Economics calculation for collegiate startup grants",
    author: "Sneha Kulkarni (SEC-01)",
    date: "20 Feb 2026",
    repliesCount: 2,
    resolved: false,
    question: "Should student labor costs be factored into COGS when applying for the Kalam Seed Fund prototype validation round?"
  }
];

export const COURSE_INFO = {
  courseCode: "NCIE-IEDP-101",
  title: "Innovation Leadership & Entrepreneurship",
  startDate: "1st October 2026",
  duration: "8 Weeks (60 Learning Hours)",
  creditEquivalency: "2 to 3 AICTE Credits (National Elective)",
  type: "National Flagship Program",
  coordinatingInstitute: "National Council for Innovation & Entrepreneurship (NCIE)",
  instructors: [
    { name: "Dr. A. V. Subbarao", role: "Director General & Head of Academic Council", institute: "NCIE Secretariat" },
    { name: "Vamsi Reddy A", role: "Head – CSR, Partnerships & Corporate Affairs", institute: "NCIE India" }
  ],
  gradingPolicy: {
    assignmentWeightage: "25% (Best 6 out of 8 Weekly Assignments)",
    capstoneWeightage: "75% (Final Capstone Project Defense & Review)",
    passingScore: "40% in Assignments AND 40% in Capstone Project"
  }
};

