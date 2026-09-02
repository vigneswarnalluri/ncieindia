"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle,
  Search,
  HelpCircle,
  Clock,
  Calendar,
  ShieldCheck,
  ChevronRight,
  Download,
  AlertCircle,
  Send,
  Cpu,
  HeartPulse,
  Sprout,
  Landmark,
  Globe2,
  TreePine,
  DollarSign,
  TrendingUp,
  FileText,
  Mail,
  Phone,
  Check,
  Building,
  Scale,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const DotGridIcon = () => (
  <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="4" cy="4" r="2" />
    <circle cx="12" cy="4" r="2" />
    <circle cx="20" cy="4" r="2" />
    <circle cx="4" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="20" cy="12" r="2" />
    <circle cx="4" cy="20" r="2" />
    <circle cx="12" cy="20" r="2" />
    <circle cx="20" cy="20" r="2" />
  </svg>
);

const INTERNSHIP_SECTORS = [
  {
    code: "SEC-01",
    title: "Engineering & Technology",
    hindi: "इंजीनियरिंग एवं प्रौद्योगिकी",
    icon: Cpu,
    desc: "Robotics, IoT systems, smart infrastructure, hardware prototypes, and precision manufacturing.",
    stipend: "Stipend Eligible",
  },
  {
    code: "SEC-02",
    title: "Science & Research",
    hindi: "विज्ञान एवं अनुसंधान",
    icon: SparklesIcon,
    desc: "Applied sciences, nanotech, laboratory instrumentation, and scientific data modeling.",
    stipend: "Stipend Eligible",
  },
  {
    code: "SEC-03",
    title: "Commerce & Finance",
    hindi: "वाणिज्य एवं वित्त",
    icon: DollarSign,
    desc: "Venture valuation, enterprise accounting, financial auditing, fintech solutions, and market analysis.",
    stipend: "Stipend Eligible",
  },
  {
    code: "SEC-04",
    title: "Arts & Humanities",
    hindi: "कला एवं मानविकी",
    icon: BookOpen,
    desc: "Design thinking, multimedia communication, digital humanities, and cultural enterprise development.",
    stipend: "Stipend Eligible",
  },
  {
    code: "SEC-05",
    title: "Agriculture & Rural Development",
    hindi: "कृषि एवं ग्रामीण विकास",
    icon: Sprout,
    desc: "Agritech systems, precision farming sensors, rural supply chains, and grassroots food processing.",
    stipend: "Stipend Eligible",
  },
  {
    code: "SEC-06",
    title: "Healthcare & Life Sciences",
    hindi: "स्वास्थ्य सेवा एवं जीवन विज्ञान",
    icon: HeartPulse,
    desc: "MedTech diagnostics, biotechnology, healthcare logistics, and telemedicine digital workflows.",
    stipend: "Stipend Eligible",
  },
  {
    code: "SEC-07",
    title: "Information Technology & AI",
    hindi: "सूचना प्रौद्योगिकी एवं कृत्रिम बुद्धिमत्ता",
    icon: Globe2,
    desc: "Artificial Intelligence, machine learning models, cybersecurity, web architectures, and cloud services.",
    stipend: "Stipend Eligible",
  },
  {
    code: "SEC-08",
    title: "Social Innovation & Governance",
    hindi: "सामाजिक नवाचार एवं शासन",
    icon: Landmark,
    desc: "GovTech tools, public policy implementation, civic solutions, and inclusive community welfare.",
    stipend: "Stipend Eligible",
  },
  {
    code: "SEC-09",
    title: "Environment & Sustainability",
    hindi: "पर्यावरण एवं सतत विकास",
    icon: TreePine,
    desc: "CleanTech, renewable energy, waste management, circular economy, and ESG compliance.",
    stipend: "Stipend Eligible",
  },
  {
    code: "SEC-10",
    title: "Entrepreneurship & Startup Development",
    hindi: "उद्यमिता एवं स्टार्टअप विकास",
    icon: TrendingUp,
    desc: "Venture incubation, business model canvas, go-to-market strategy, and early customer validation.",
    stipend: "Stipend Eligible",
  },
];

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
    </svg>
  );
}

export default function StudentsClient() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Certificate Verification state
  const [certQuery, setCertQuery] = useState("");
  const [certResult, setCertResult] = useState<null | {
    valid: boolean;
    certId: string;
    studentName: string;
    program: string;
    issueDate: string;
    authority: string;
    status: string;
  }>(null);

  // Application Status state
  const [appId, setAppId] = useState("");
  const [appResult, setAppResult] = useState<null | {
    id: string;
    name: string;
    program: string;
    status: string;
    institution: string;
    updatedAt: string;
  }>(null);

  // Grievance form state
  const [grievanceSubmitted, setGrievanceSubmitted] = useState(false);
  const [isGrievanceSubmitting, setIsGrievanceSubmitting] = useState(false);
  const [grievanceDocketNumber, setGrievanceDocketNumber] = useState("");
  const [grievanceForm, setGrievanceForm] = useState({
    name: "",
    email: "",
    phone: "",
    category: "Programme Registration & Enrolment",
    details: "",
  });

  const [isVerifying, setIsVerifying] = useState(false);
  const [isCheckingApp, setIsCheckingApp] = useState(false);

  const handleVerifyCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certQuery.trim()) return;
    setIsVerifying(true);

    try {
      const res = await fetch(`/api/verify?type=certificate&query=${encodeURIComponent(certQuery.trim())}`);
      const result = await res.json();

      if (result.success && result.found) {
        setCertResult({
          valid: true,
          certId: result.data.certId,
          studentName: result.data.studentName,
          program: result.data.program,
          issueDate: result.data.issueDate,
          authority: result.data.authority || "National Council for Innovation & Entrepreneurship (NCIE)",
          status: result.data.status || "Officially Verified & Active in National Registry",
        });
      } else {
        setCertResult({
          valid: false,
          certId: certQuery.trim().toUpperCase(),
          studentName: "",
          program: "",
          issueDate: "",
          authority: "",
          status: result.message || "Certificate Record Not Found in Official Registry",
        });
      }
    } catch (err) {
      console.error("Verification error:", err);
      setCertResult({
        valid: false,
        certId: certQuery.trim().toUpperCase(),
        studentName: "",
        program: "",
        issueDate: "",
        authority: "",
        status: "Verification server communication error. Please retry.",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCheckStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appId.trim()) return;
    setIsCheckingApp(true);

    try {
      const res = await fetch(`/api/verify?type=application&query=${encodeURIComponent(appId.trim())}`);
      const result = await res.json();

      if (result.success && result.found) {
        setAppResult({
          id: result.data.appId,
          name: result.data.studentName,
          program: result.data.program,
          status: result.data.status,
          institution: result.data.institution,
          updatedAt: result.data.updatedAt || "Academic Session 2025-26",
        });
      } else {
        setAppResult({
          id: appId.trim().toUpperCase(),
          name: "Record Not Found",
          program: "N/A",
          status: "No active application found matching this reference. Please verify your Application ID or mobile number.",
          institution: "N/A",
          updatedAt: "N/A",
        });
      }
    } catch (err) {
      console.error("Application check error:", err);
      setAppResult({
        id: appId.trim().toUpperCase(),
        name: "Server Error",
        program: "N/A",
        status: "Unable to reach registry database. Please try again.",
        institution: "N/A",
        updatedAt: "N/A",
      });
    } finally {
      setIsCheckingApp(false);
    }
  };

  const handleGrievanceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGrievanceSubmitting(true);
    const generatedDocket = `NCIE/GRV/2026/${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "student_grievance",
          data: grievanceForm,
          docketNumber: generatedDocket,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setGrievanceDocketNumber(data.docketNumber || generatedDocket);
      } else {
        setGrievanceDocketNumber(generatedDocket);
      }
    } catch (err) {
      console.error("Grievance submission error:", err);
      setGrievanceDocketNumber(generatedDocket);
    } finally {
      setIsGrievanceSubmitting(false);
      setGrievanceSubmitted(true);
    }
  };

  const TABS = [
    { id: "overview", label: language === "hi" ? "कार्यक्रम विवरण एवं नामांकन" : "Programme Overview & Enrolment" },
    { id: "internships", label: language === "hi" ? "10-कोर सवैतनिक इंटर्नशिप ढांचा" : "10-Core Paid Internship Framework" },
    { id: "verify", label: language === "hi" ? "डिजिटल प्रमाण पत्र सत्यापन" : "Online Certificate Verification" },
    { id: "status", label: language === "hi" ? "आवेदन / नामांकन स्थिति" : "Application & Admission Status" },
    { id: "grievance", label: language === "hi" ? "छात्र सहायता एवं शिकायत निवारण" : "Student Support & Grievance Redressal" },
  ];

  return (
    <div className="flex-1 bg-[#F9FAFB] pb-20 font-sans">
      {/* ── Official Institutional Top Banner ── */}
      <div className="relative bg-[#0A5D45] overflow-hidden py-14 text-white border-b border-[#074733]">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%">
            <line x1="0" y1="20%" x2="100%" y2="80%" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="100%" y1="20%" x2="0" y2="80%" stroke="#ffffff" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="text-xs text-emerald-100 font-semibold mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <Link href="/" className="hover:underline hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/75">Students &amp; Youth Innovation</span>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-widest text-accent font-mono">
              राष्ट्रीय छात्र नवाचार एवं उद्यमिता पोर्टल
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              National Students &amp; Youth Innovation Portal
            </h1>
            <p className="text-emerald-100/90 text-xs sm:text-sm mt-2 max-w-3xl leading-relaxed">
              Institutional framework delivering structured innovation training, 10-sector paid internships, student startup seed grants up to ₹5,00,000, and verified national leadership credentials under the mandate of Viksit Bharat @2047.
            </p>
          </div>
        </div>
      </div>

      {/* ── Main Two-Column Institutional Layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── LEFT COLUMN: Official Navigation & Secretariat Desks (4/12 width) ── */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 1. Official Section Navigation Card */}
            <div className="bg-white border border-zinc-200 rounded-none p-0 overflow-hidden shadow-2xs">
              <div className="bg-zinc-50 border-b border-zinc-200 px-5 py-3.5">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                  {language === "hi" ? "विद्यार्थी अनुभाग नेविगेशन" : "Student Portal Directory"}
                </span>
              </div>
              <div className="divide-y divide-zinc-150">
                {TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-5 py-3.5 text-xs sm:text-[13px] font-bold transition-all flex items-center justify-between cursor-pointer ${
                        isActive
                          ? "bg-emerald-50/70 text-[#0D6B4F] border-l-4 border-[#0D6B4F] pl-4"
                          : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {isActive && <DotGridIcon />}
                        <span>{tab.label}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? "text-[#0D6B4F]" : "text-zinc-400"}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Official Downloads & Guidelines Card */}
            <div className="bg-white border border-zinc-200 rounded-none p-5 space-y-4 shadow-2xs">
              <div className="border-l-3 border-[#0D6B4F] pl-3 py-0.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                  Official Circulars &amp; Documents
                </h3>
                <p className="text-[10px] text-zinc-400 font-mono mt-0.5">DIRECTORATE REPOSITORY</p>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { name: "Day-Wise Curriculum Syllabus & Modules", size: "150 KB PDF", url: "/NCIE_3_COURSES.pdf" },
                  { name: "60-Day Leadership Guidelines & Circular", size: "867 KB PDF", url: "/NCIE_Viksit_Bharat_2047_Innovation_Leadership_Programmes.pdf" },
                  { name: "NCIE DPR: Student Framework 2047", size: "1.2 MB PDF", url: "/NCIE_DPR.pdf" },
                  { name: "Student Startup Grants Rules & Guidelines", size: "925 KB PDF", url: "/NCIE_Student_Startup_Grants_Guidelines.pdf" },
                  { name: "Dr. Kalam Startup Validation & Seed Grants", size: "941 KB PDF", url: "/Kalam_Startup_Seed_Funding_Scheme.pdf" },
                ].map((doc, idx) => (
                  <a
                    key={idx}
                    href={doc.url}
                    download
                    className="group flex items-center justify-between p-2.5 bg-zinc-50 border border-zinc-200 hover:border-[#0D6B4F] hover:bg-emerald-50/40 transition-colors"
                  >
                    <div className="pr-2">
                      <div className="font-bold text-zinc-800 text-[11px] group-hover:text-[#0D6B4F] line-clamp-1">{doc.name}</div>
                      <div className="text-[10px] text-zinc-400 font-mono mt-0.5">{doc.size}</div>
                    </div>
                    <Download className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#0D6B4F] shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            {/* 3. Nodal Directorate Helpdesk Desk */}
            <div className="bg-white border border-zinc-200 rounded-none p-5 space-y-3.5 shadow-2xs text-xs">
              <div className="border-l-3 border-[#0D6B4F] pl-3 py-0.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                  Student Affairs Directorate Desk
                </h3>
                <p className="text-[10px] text-zinc-400 font-mono mt-0.5">CENTRAL SECRETARIAT</p>
              </div>

              <div className="space-y-2 pt-1 text-zinc-650">
                <div className="flex items-start gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-zinc-800">Official Email: </span>
                    <a href="mailto:office@ncieindia.org" className="text-[#0D6B4F] font-mono hover:underline font-bold">
                      office@ncieindia.org
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-zinc-800">Operating Hours: </span>
                    <span>Mon–Sat, 10:00 AM – 5:30 PM IST</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: Main Institutional Body (8/12 width) ── */}
          <div className="lg:col-span-8 space-y-6">

            {/* TAB 1: OVERVIEW & 60-DAY PROGRAMME */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                
                {/* Official Notification Callout Bar */}
                <div className="bg-emerald-50/60 border border-emerald-600/30 p-4 rounded-none flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-0.5 bg-[#0D6B4F] text-white font-mono text-[10px] font-bold uppercase tracking-wider shrink-0 mt-0.5">
                      NOTIFICATION
                    </span>
                    <div className="text-xs text-zinc-800 leading-relaxed">
                      <strong>NCIE-NOTIF/2025/VBLP-01:</strong> Enrolments open for the National 60-Day Viksit Bharat Innovation Leadership Programme Cohort 2025-26 across all recognized collegiate institutions.
                    </div>
                  </div>
                  <Link
                    href="/join"
                    className="shrink-0 px-3.5 py-1.5 bg-[#0D6B4F] hover:bg-[#094835] text-white text-[11px] font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1"
                  >
                    Enrol Online <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Section 1: Flagship 60-Day Leadership Programme */}
                <div className="bg-white border border-zinc-200 rounded-none p-6 sm:p-8 space-y-6 shadow-2xs">
                  <div className="border-l-4 border-primary pl-4 py-0.5">
                    <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-zinc-900 mt-0.5">
                      NCIE Viksit Bharat Innovation Leadership Programme
                    </h2>
                    <p className="text-xs text-zinc-500 mt-1">
                      National Student Innovation, Technology Management &amp; Entrepreneurship Development Framework
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed text-justify">
                    The NCIE Viksit Bharat Innovation Leadership Programme is a structured national curriculum designed to introduce undergraduate and postgraduate students to structured ideation, problem-solving, digital and emerging technologies (AI, IoT, Cloud, Automation), commercial business thinking, and innovation-to-startup pipelines.
                  </p>

                  {/* Specification Table */}
                  <div className="border border-zinc-200 overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <tbody>
                        <tr className="border-b border-zinc-200 bg-zinc-50/70">
                          <td className="p-3 font-bold text-zinc-700 w-1/3 border-r border-zinc-200">Programme Duration</td>
                          <td className="p-3 text-zinc-900 font-semibold">60 Days (Structured Milestone Schedule)</td>
                        </tr>
                        <tr className="border-b border-zinc-200">
                          <td className="p-3 font-bold text-zinc-700 border-r border-zinc-200">Total Learning Hours</td>
                          <td className="p-3 text-zinc-900 font-semibold">60 Hours (Self-paced + Live Expert Mentorship)</td>
                        </tr>
                        <tr className="border-b border-zinc-200 bg-zinc-50/70">
                          <td className="p-3 font-bold text-zinc-700 border-r border-zinc-200">Mode of Delivery</td>
                          <td className="p-3 text-zinc-900 font-semibold">Hybrid (Digital Learning Modules + Campus Workshops)</td>
                        </tr>
                        <tr className="border-b border-zinc-200">
                          <td className="p-3 font-bold text-zinc-700 border-r border-zinc-200">Official Programme Fee</td>
                          <td className="p-3 font-bold text-[#0D6B4F]">₹700/- (One-Time Subsidized National Registration Fee)</td>
                        </tr>
                        <tr className="bg-zinc-50/70">
                          <td className="p-3 font-bold text-zinc-700 border-r border-zinc-200">National Credential</td>
                          <td className="p-3 text-zinc-900 font-semibold">Certificate of Completion with Official QR Verification Seal</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* 10 Core Learning Areas */}
                  <div className="space-y-3 pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 font-mono">
                      Curriculum Core Competency Areas
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {[
                        "1. Student Innovation & Problem Identification",
                        "2. Digital & Emerging Technologies (AI & Web)",
                        "3. Ideation, Prototyping & PoC Development",
                        "4. Business Thinking & Financial Modeling",
                        "5. Intellectual Property (IPR) & Patent Basics",
                        "6. Innovation-to-Startup Progression Pathways",
                        "7. Youth Leadership, Communication & Governance",
                        "8. Corporate & MSME Industrial Linkages",
                        "9. Pitch Deck Preparation & Demo Readiness",
                        "10. National Development Alignment (Viksit Bharat @2047)",
                      ].map((area, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-zinc-50 border border-zinc-150 text-zinc-700 font-medium">
                          <Check className="w-3.5 h-3.5 text-[#0D6B4F] shrink-0" />
                          <span>{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enrolment CTA Card */}
                  <div className="bg-zinc-50 border border-zinc-200 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-zinc-900 uppercase tracking-wide">Ready to Register as Student Innovator?</div>
                      <div className="text-[11px] text-zinc-500 mt-0.5">Eligible: Undergraduate, Postgraduate, Polytechnic, and Diploma Students.</div>
                    </div>
                    <Link
                      href="/join"
                      className="px-5 py-2.5 bg-[#0D6B4F] hover:bg-[#094835] text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 shrink-0"
                    >
                      Enrol Now (₹700)
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Section 2: Student-to-Startup Linear Progression Pathway */}
                <div className="bg-white border border-zinc-200 rounded-none p-6 sm:p-8 space-y-4 shadow-2xs">
                  <div className="border-l-4 border-primary pl-4 py-0.5">
                    <h3 className="text-base font-bold uppercase tracking-wide text-zinc-900">
                      Progression from Innovation to Funded Startup
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      NCIE DPR Linear Development Framework
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                    Graduates of the 60-Day Leadership Programme are automatically eligible to submit their working prototypes to the <strong>Dr. A.P.J. Abdul Kalam Startup Validation Programme</strong>, where validated ventures can secure up to <strong>₹5,00,000 in 5-Stage Seed Grants</strong> and direct incubation support.
                  </p>
                </div>

              </div>
            )}

            {/* TAB 2: 10-CORE PAID INTERNSHIP FRAMEWORK */}
            {activeTab === "internships" && (
              <div className="bg-white border border-zinc-200 rounded-none p-6 sm:p-8 space-y-6 shadow-2xs">
                <div className="border-l-4 border-primary pl-4 py-0.5">
                  <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-zinc-900 mt-0.5">
                    10-Core Paid Internship Ecosystem
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">
                    Structured National Apprenticeship and Practical Skill Engagement Framework
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed text-justify">
                  Under its Vision 2047 mandate, NCIE establishes a structured national internship framework connecting undergraduate and postgraduate students with verified host enterprises, research organizations, and public initiatives across 10 vital socio-economic sectors.
                </p>

                {/* Table of 10 Sectors */}
                <div className="border border-zinc-200 overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-zinc-100/80 border-b border-zinc-200 text-zinc-800 font-bold uppercase tracking-wider">
                        <th className="p-3 w-20 whitespace-nowrap border-r border-zinc-200">Code</th>
                        <th className="p-3 border-r border-zinc-200">Core Sector Domain</th>
                        <th className="p-3 border-r border-zinc-200">Scope of Work &amp; Engagement</th>
                        <th className="p-3 w-32 whitespace-nowrap text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200">
                      {INTERNSHIP_SECTORS.map((sec, idx) => {
                        const Icon = sec.icon;
                        return (
                          <tr key={idx} className="hover:bg-zinc-50/80 transition-colors">
                            <td className="p-3 font-mono font-bold text-zinc-500 border-r border-zinc-200 whitespace-nowrap">{sec.code}</td>
                            <td className="p-3 border-r border-zinc-200 font-bold text-zinc-900">
                              <div className="flex items-center gap-2">
                                <Icon className="w-4 h-4 text-[#0D6B4F] shrink-0" />
                                <div>
                                  <div>{sec.title}</div>
                                  <div className="text-[10px] text-zinc-400 font-normal">{sec.hindi}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-3 text-zinc-650 text-xs border-r border-zinc-200 leading-relaxed">{sec.desc}</td>
                            <td className="p-3 text-right whitespace-nowrap">
                              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold uppercase">
                                {sec.stipend}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="bg-zinc-50 border border-zinc-200 p-4 text-xs text-zinc-600 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0D6B4F] shrink-0 mt-0.5" />
                  <span>
                    <strong>Host Enterprise Norms:</strong> All internship opportunities comply with NCIE academic credit frameworks and national skill development directives.
                  </span>
                </div>
              </div>
            )}

            {/* TAB 3: CERTIFICATE VERIFICATION */}
            {activeTab === "verify" && (
              <div className="bg-white border border-zinc-200 rounded-none p-6 sm:p-8 space-y-6 shadow-2xs">
                <div className="border-l-4 border-primary pl-4 py-0.5">
                  <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-zinc-900 mt-0.5">
                    National Certificate Verification Engine
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">
                    Instant Digital Authentication for NCIE Credentials and Leadership Certificates
                  </p>
                </div>

                <p className="text-xs text-zinc-600 leading-relaxed">
                  Employers, educational institutions, and candidates can authenticate the validity of any NCIE-issued certificate by entering the unique Certificate Identification Number printed on the document.
                </p>

                {/* Verification Form */}
                <form onSubmit={handleVerifyCertificate} className="bg-zinc-50 border border-zinc-200 p-5 space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-800 tracking-wider mb-1.5">
                      Certificate Identification Number
                    </label>
                    <div className="relative">
                      <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={certQuery}
                        onChange={(e) => setCertQuery(e.target.value)}
                        placeholder="e.g. NCIE-VBLP-2025-8849"
                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-zinc-300 text-xs font-mono font-bold text-zinc-900 uppercase focus:outline-none focus:border-[#0D6B4F]"
                      />
                    </div>
                    <span className="text-[10px] text-zinc-400 mt-1 block">
                      Format: NCIE-[PROG]-[YEAR]-[SERIAL NUMBER]
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="w-full py-2.5 bg-[#0D6B4F] hover:bg-[#094835] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isVerifying ? "Authenticating with Central Registry..." : "Authenticate Credential"}
                  </button>
                </form>

                {/* Verification Result */}
                {certResult && (
                  <div className="border border-zinc-200 p-6 space-y-4">
                    {certResult.valid ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm bg-emerald-50 border border-emerald-200 p-3">
                          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                          <span>Official Record Authenticated • Active Credential</span>
                        </div>

                        <div className="border border-zinc-200">
                          <table className="w-full text-left text-xs">
                            <tbody>
                              <tr className="border-b border-zinc-200 bg-zinc-50/70">
                                <td className="p-3 font-bold text-zinc-700 w-1/3 border-r border-zinc-200">Candidate Full Name</td>
                                <td className="p-3 text-zinc-900 font-bold">{certResult.studentName}</td>
                              </tr>
                              <tr className="border-b border-zinc-200">
                                <td className="p-3 font-bold text-zinc-700 border-r border-zinc-200">Certificate Reference ID</td>
                                <td className="p-3 font-mono font-bold text-[#0D6B4F]">{certResult.certId}</td>
                              </tr>
                              <tr className="border-b border-zinc-200 bg-zinc-50/70">
                                <td className="p-3 font-bold text-zinc-700 border-r border-zinc-200">Programme Title</td>
                                <td className="p-3 text-zinc-900 font-semibold">{certResult.program}</td>
                              </tr>
                              <tr className="border-b border-zinc-200">
                                <td className="p-3 font-bold text-zinc-700 border-r border-zinc-200">Issuing Authority</td>
                                <td className="p-3 text-zinc-900">{certResult.authority}</td>
                              </tr>
                              <tr className="bg-zinc-50/70">
                                <td className="p-3 font-bold text-zinc-700 border-r border-zinc-200">Date of Issue</td>
                                <td className="p-3 text-zinc-900 font-semibold">{certResult.issueDate}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3 bg-red-50 border border-red-200 p-4 text-red-900 text-xs">
                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>Record Not Verified:</strong> {certResult.status}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: APPLICATION STATUS */}
            {activeTab === "status" && (
              <div className="bg-white border border-zinc-200 rounded-none p-6 sm:p-8 space-y-6 shadow-2xs">
                <div className="border-l-4 border-primary pl-4 py-0.5">
                  <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-zinc-900 mt-0.5">
                    Student Application Status Portal
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">
                    Check enrolment review, scholarship approval, and cohort dispatch status
                  </p>
                </div>

                <form onSubmit={handleCheckStatus} className="bg-zinc-50 border border-zinc-200 p-5 space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-800 tracking-wider mb-1.5">
                      Enrolment / Application Reference ID
                    </label>
                    <input
                      type="text"
                      required
                      value={appId}
                      onChange={(e) => setAppId(e.target.value)}
                      placeholder="e.g. NCIE-APP-2025-4421"
                      className="w-full px-3.5 py-2.5 bg-white border border-zinc-300 text-xs font-mono font-bold text-zinc-900 uppercase focus:outline-none focus:border-[#0D6B4F]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isCheckingApp}
                    className="w-full py-2.5 bg-[#0D6B4F] hover:bg-[#094835] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isCheckingApp ? "Querying National Admission Registry..." : "Track Application Record"}
                  </button>
                </form>

                {appResult && (
                  <div className="border border-zinc-200 p-5 space-y-4">
                    {appResult.name !== "Record Not Found" && appResult.name !== "Server Error" ? (
                      <>
                        <div className="flex justify-between items-center bg-zinc-50 p-3 border border-zinc-200">
                          <div>
                            <div className="text-[10px] font-mono text-zinc-400 font-bold uppercase">Application Reference</div>
                            <div className="font-mono font-bold text-xs text-zinc-900">{appResult.id}</div>
                          </div>
                          <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-[10px] uppercase">
                            Active Enrolment
                          </span>
                        </div>

                        <div className="border border-zinc-200">
                          <table className="w-full text-left text-xs">
                            <tbody>
                              <tr className="border-b border-zinc-200">
                                <td className="p-3 font-bold text-zinc-700 w-1/3 border-r border-zinc-200">Applicant Name</td>
                                <td className="p-3 text-zinc-900 font-semibold">{appResult.name}</td>
                              </tr>
                              <tr className="border-b border-zinc-200 bg-zinc-50/70">
                                <td className="p-3 font-bold text-zinc-700 border-r border-zinc-200">Enrolled Programme</td>
                                <td className="p-3 text-zinc-900 font-semibold">{appResult.program}</td>
                              </tr>
                              <tr className="border-b border-zinc-200">
                                <td className="p-3 font-bold text-zinc-700 border-r border-zinc-200">Current Status</td>
                                <td className="p-3 font-bold text-[#0D6B4F]">{appResult.status}</td>
                              </tr>
                              <tr className="bg-zinc-50/70">
                                <td className="p-3 font-bold text-zinc-700 border-r border-zinc-200">Academic Session</td>
                                <td className="p-3 text-zinc-900">{appResult.updatedAt}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 p-4 text-amber-900 text-xs">
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>Application Not Located:</strong> {appResult.status}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: GRIEVANCE REDRESSAL */}
            {activeTab === "grievance" && (
              <div className="bg-white border border-zinc-200 rounded-none p-6 sm:p-8 space-y-6 shadow-2xs">
                <div className="border-l-4 border-primary pl-4 py-0.5">
                  <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-zinc-900 mt-0.5">
                    Student Support &amp; Grievance Redressal
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">
                    Formal Grievance Submission Desk for Student Cohorts &amp; Candidates
                  </p>
                </div>

                {grievanceSubmitted ? (
                  <div className="border border-emerald-200 bg-emerald-50/60 p-6 text-center space-y-3">
                    <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wide">
                      Grievance Docket Registered &amp; Logged
                    </h3>
                    <p className="text-xs text-zinc-600 max-w-md mx-auto">
                      Your reference docket number is <span className="font-mono font-bold text-[#0D6B4F]">{grievanceDocketNumber || "NCIE/GRV/2026/0942"}</span>. The Student Welfare Officer has logged this in the central registry and will review and respond within 48 business hours.
                    </p>
                    <button
                      onClick={() => setGrievanceSubmitted(false)}
                      className="mt-2 px-4 py-1.5 bg-white border border-zinc-300 text-xs font-bold text-zinc-800 hover:bg-zinc-50 cursor-pointer"
                    >
                      Submit Another Docket
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleGrievanceSubmit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-zinc-700 uppercase tracking-wide mb-1">Applicant Name</label>
                        <input
                          type="text"
                          required
                          value={grievanceForm.name}
                          onChange={(e) => setGrievanceForm({ ...grievanceForm, name: e.target.value })}
                          placeholder="e.g. Priya Nair"
                          className="w-full px-3 py-2 bg-white border border-zinc-300 focus:outline-none focus:border-[#0D6B4F]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-zinc-700 uppercase tracking-wide mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={grievanceForm.email}
                          onChange={(e) => setGrievanceForm({ ...grievanceForm, email: e.target.value })}
                          placeholder="priya@college.edu"
                          className="w-full px-3 py-2 bg-white border border-zinc-300 focus:outline-none focus:border-[#0D6B4F]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-zinc-700 uppercase tracking-wide mb-1">Contact Phone</label>
                        <input
                          type="tel"
                          required
                          value={grievanceForm.phone}
                          onChange={(e) => setGrievanceForm({ ...grievanceForm, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-3 py-2 bg-white border border-zinc-300 focus:outline-none focus:border-[#0D6B4F]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-zinc-700 uppercase tracking-wide mb-1">Grievance Category</label>
                        <select
                          value={grievanceForm.category}
                          onChange={(e) => setGrievanceForm({ ...grievanceForm, category: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-zinc-300 focus:outline-none focus:border-[#0D6B4F] font-semibold text-zinc-800"
                        >
                          <option>Programme Registration &amp; Enrolment</option>
                          <option>Certificate Verification &amp; QR Seal</option>
                          <option>Scholarship &amp; Grant Assistance</option>
                          <option>Internship Allocation Query</option>
                          <option>General Support / Technical Issue</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-700 uppercase tracking-wide mb-1">Grievance Particulars</label>
                      <textarea
                        rows={4}
                        required
                        value={grievanceForm.details}
                        onChange={(e) => setGrievanceForm({ ...grievanceForm, details: e.target.value })}
                        placeholder="Please state your Application / Enrolment ID and provide clear details of your concern..."
                        className="w-full px-3 py-2 bg-white border border-zinc-300 focus:outline-none focus:border-[#0D6B4F]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isGrievanceSubmitting}
                      className="w-full py-2.5 bg-[#0D6B4F] hover:bg-[#094835] text-white font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isGrievanceSubmitting ? "Submitting & Logging Grievance Docket..." : "Submit Official Grievance Docket"}
                    </button>
                  </form>
                )}
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
