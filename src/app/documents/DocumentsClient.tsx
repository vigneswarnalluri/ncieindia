"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Download,
  Search,
  Calendar,
  ChevronRight,
  Mail,
  Clock,
  Building,
  Eye,
  ShieldCheck,
  Award,
  BookOpen,
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

const DOCUMENTS_LIST = [
  {
    title: "NCIE Detailed Project Report (DPR) 2025–2047",
    category: "DPR & Vision",
    size: "1.2 MB PDF",
    date: "January 2025",
    desc: "Master organizational overview, major national initiatives, macro financial allocations, and 2047 institutional outcome projections.",
    url: "/NCIE_DPR.pdf",
  },
  {
    title: "NCIE Institutional Profile & Statutory Positioning Charter",
    category: "DPR & Vision",
    size: "248 KB PDF (12 Pages)",
    date: "2026 Edition",
    desc: "Foundational charter defining NCIE's institutional mandate, core intervention areas, flagship initiatives, multi-mode delivery mechanisms, beneficiary classification, and formal institutional disclaimers.",
    url: "/documents/NCIE_Institutional_Profile.pdf",
  },
  {
    title: "NCIE Governance Architecture & Organisational Structure",
    category: "Institutional",
    size: "149 KB PDF (15 Pages)",
    date: "2026 Edition",
    desc: "Comprehensive 10-tier institutional hierarchy, functional divisions (Admin/HR, Finance, Programmes, Tech, M&E, Compliance), advisory council terms, regional coordinators, and formal decision-making workflows.",
    url: "/documents/NCIE_Governance_Organisational_Structure.pdf",
  },
  {
    title: "NCIE Vision 2047: Building an Innovation-Driven & Future-Ready India",
    category: "DPR & Vision",
    size: "251 KB PDF (12 Pages)",
    date: "2026 Edition",
    desc: "Long-term institutional vision comprising 8 strategic pillars, student-to-enterprise progression pipeline, and 4-phase national rollout roadmap (Foundation 2026–30 to National Impact 2040–47).",
    url: "/documents/NCIE_Vision_2047.pdf",
  },
  {
    title: "NCIE Viksit Bharat @2047 National Alignment Framework",
    category: "DPR & Vision",
    size: "258 KB PDF (17 Pages)",
    date: "2026 Edition",
    desc: "Operational framework linking collegiate youth skilling, experiential innovation, AI literacy, and enterprise incubation directly with the national development aspiration of Viksit Bharat @2047.",
    url: "/documents/NCIE_Viksit_Bharat_2047_Alignment_Framework.pdf",
  },
  {
    title: "NCIE Government & National Policy Alignment Matrix",
    category: "Policies",
    size: "254 KB PDF (15 Pages)",
    date: "2026 Edition",
    desc: "Structured thematic mapping across 15 national missions and priorities: NEP 2020, Startup India, Skill India, Digital India, Make in India, Atmanirbhar Bharat, and UN SDGs (4, 5, 8, 9, 10, 11, 17).",
    url: "/documents/NCIE_Government_Policy_Alignment_Matrix.pdf",
  },
  {
    title: "NCIE Comprehensive Programme Framework & Delivery Architecture",
    category: "Programmes",
    size: "258 KB PDF (18 Pages)",
    date: "2026 Edition",
    desc: "Standardized programme lifecycle across 6 interconnected streams (Youth, Innovation, Startups, Digital, Institutional, Ecosystem), multi-format delivery, institutional onboarding SOPs, and quality assurance.",
    url: "/documents/NCIE_Programme_Framework.pdf",
  },
  {
    title: "Flagship Innovation Leadership & Dr. A.P.J. Abdul Kalam Startup Validation Guidelines",
    category: "Programmes",
    size: "252 KB PDF (15 Pages)",
    date: "2026 Edition",
    desc: "Detailed operational guidelines for course-integrated tracks (₹700 one-time fee), 8-stage startup validation lifecycle, ₹5 Lakh indicative seed support, and ₹25 Crore potential investor connectivity pipeline.",
    url: "/documents/NCIE_Flagship_Innovation_and_Startup_Programmes.pdf",
  },
  {
    title: "NCIE Institutional Innovation & Startup Policy",
    category: "Policies",
    size: "276 KB PDF (25 Pages)",
    date: "2026 Edition",
    desc: "Authoritative policy governing student venture creation, intellectual property protection (participants retain 100% IP ownership), responsible AI ethics, confidentiality covenants, and campus innovation scorecards.",
    url: "/documents/NCIE_Innovation_Startup_Policy.pdf",
  },
  {
    title: "NCIE Institutional Collaboration & Strategic Partnership Framework",
    category: "Institutional",
    size: "275 KB PDF (25 Pages)",
    date: "2026 Edition",
    desc: "Formal framework governing 12 partnership categories across universities, industry, accelerators, CSR trusts, and public agencies; includes 7 collaboration models, due diligence protocols, and MoU guidelines.",
    url: "/documents/NCIE_Collaboration_Partnership_Framework.pdf",
  },
  {
    title: "NCIE Corporate Social Responsibility (CSR) Partnership Framework",
    category: "Institutional",
    size: "268 KB PDF (22 Pages)",
    date: "2026 Edition",
    desc: "Companies Act Section 135-compliant CSR engagement guidelines for collegiate skilling, incubation lab setup (₹5L–₹25L), startup grants, project budgeting, audit verification, and independent impact audits.",
    url: "/documents/NCIE_CSR_Partnership_Framework.pdf",
  },
  {
    title: "NCIE Funding & Resource Mobilisation Framework",
    category: "Institutional",
    size: "272 KB PDF (25 Pages)",
    date: "2026 Edition",
    desc: "7-stage rigorous funding status classification (Pipeline to Utilised), campus project facilitation SOPs (₹5L–₹25L), internal financial controls, procurement rules, and Resource Mobilisation MIS tracking.",
    url: "/documents/NCIE_Funding_Resource_Mobilisation_Framework.pdf",
  },
  {
    title: "NCIE Monitoring & Evaluation (M&E) Results Architecture",
    category: "Policies",
    size: "283 KB PDF (30 Pages)",
    date: "2026 Edition",
    desc: "5-level monitoring framework (Participant to Impact), KPIs for skills and startup outcomes, digital MIS dashboards, pre/post learning gain assessment, and root-cause corrective action mechanisms.",
    url: "/documents/NCIE_Monitoring_Evaluation_Framework.pdf",
  },
  {
    title: "NCIE Institutional Transparency, Public Disclosure & Representation Policy",
    category: "Policies",
    size: "277 KB PDF (26 Pages)",
    date: "2026 Edition",
    desc: "Statutory standards for official communications, mandatory non-governmental representation disclaimers, accurate government alignment terminology, fee transparency, privacy protection, and prohibited claims.",
    url: "/documents/NCIE_Transparency_Public_Disclosure_Policy.pdf",
  },
  {
    title: "NCIE Grievance Redressal Policy & Stakeholder Protection Mechanism",
    category: "Policies",
    size: "270 KB PDF (24 Pages)",
    date: "2026 Edition",
    desc: "Structured complaint redressal mechanism across 10 grievance categories; time-bound SLAs (2-3 days acknowledgement, 15-30 days resolution), 5-tier escalation ladder, and whistleblower non-retaliation protections.",
    url: "/documents/NCIE_Grievance_Redressal_Policy.pdf",
  },
  {
    title: "Day-Wise Curriculum Syllabus & Modular Timeline",
    category: "Programmes",
    size: "150 KB PDF",
    date: "Session 2025-26",
    desc: "Detailed modular syllabus breakdown across Innovation Ecosystem, Design Thinking, Prototyping, and Startup Launch.",
    url: "/NCIE_3_COURSES.pdf",
  },
  {
    title: "Dr. A.P.J. Abdul Kalam Startup Validation Programme & Grant Manual",
    category: "Programmes",
    size: "941 KB PDF",
    date: "January 2025",
    desc: "5-Stage milestone seed grant disbursement rules (up to ₹5,00,000) and evaluation benchmarks.",
    url: "/Kalam_Startup_Seed_Funding_Scheme.pdf",
  },
  {
    title: "Institutional Incubation & Development Fund Proposal Guide",
    category: "Institutional",
    size: "950 KB PDF",
    date: "November 2024",
    desc: "Application SOPs for universities and colleges applying for ₹20L–₹50L campus incubation grants.",
    url: "/Institutional_Incubation_Development_Support_Scheme.pdf",
  },
  {
    title: "Student Startup Grants: Rules, Regulations & Guidelines",
    category: "Programmes",
    size: "925 KB PDF",
    date: "Session 2025-26",
    desc: "Operational guidelines, eligible expenditure, and evaluation benchmarks for student startup grants.",
    url: "/NCIE_Student_Startup_Grants_Guidelines.pdf",
  },
  {
    title: "Innovation India Council Annual Activity Circular 2025-26",
    category: "Circulars",
    size: "3.2 MB PDF",
    date: "January 2025",
    desc: "Annual circular on collegiate chapter registrations, innovation challenges, and hackathon schedules.",
    url: "/Innovation_India_Council.pdf",
  },
];

export default function DocumentsClient() {
  const { language } = useLanguage();
  const categories = ["DPR & Vision", "Programmes", "Institutional", "Policies", "Circulars"];
  const [selectedCategory, setSelectedCategory] = useState("DPR & Vision");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocs = DOCUMENTS_LIST.filter((doc) => {
    const matchesCategory = doc.category === selectedCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 bg-[#F9FAFB] pb-20 font-sans">
      {/* ── Official Banner ── */}
      <div className="relative bg-[#0A5D45] overflow-hidden py-14 text-white border-b border-[#074733]">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%">
            <line x1="0" y1="20%" x2="100%" y2="80%" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="100%" y1="20%" x2="0" y2="80%" stroke="#ffffff" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-xs text-emerald-100 font-semibold mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <Link href="/" className="hover:underline hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/75">Documents &amp; Publications</span>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-widest text-accent font-mono">
              आधिकारिक दस्तावेज़ एवं प्रकाशन भंडार
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Official Documents &amp; Publications Vault
            </h1>
            <p className="text-emerald-100/90 text-xs sm:text-sm mt-2 max-w-3xl leading-relaxed">
              Official public repository of the NCIE Detailed Project Report (DPR), Vision 2047 blueprint, programme curriculum manuals, grant regulations, circulars, and institutional policy charters.
            </p>
          </div>
        </div>
      </div>

      {/* ── Two-Column Layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── LEFT COLUMN (4/12) ── */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white border border-zinc-200 rounded-none p-0 overflow-hidden shadow-2xs">
              <div className="bg-zinc-50 border-b border-zinc-200 px-5 py-3.5">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                  {language === "hi" ? "दस्तावेज़ श्रेणियां" : "Publication Categories"}
                </span>
              </div>
              <div className="divide-y divide-zinc-150">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-5 py-3 text-xs sm:text-[13px] font-bold transition-all flex items-center justify-between cursor-pointer ${
                        isActive
                          ? "bg-emerald-50/70 text-[#0D6B4F] border-l-4 border-[#0D6B4F] pl-4"
                          : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {isActive && <DotGridIcon />}
                        <span>{cat}</span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400 font-normal">
                        {DOCUMENTS_LIST.filter(d => d.category === cat).length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Secretariat Notice */}
            <div className="bg-white border border-zinc-200 rounded-none p-5 space-y-3.5 shadow-2xs text-xs">
              <div className="border-l-3 border-[#0D6B4F] pl-3 py-0.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                  Secretariat Publications Cell
                </h3>
                <p className="text-[10px] text-zinc-400 font-mono mt-0.5">ARCHIVAL INQUIRIES</p>
              </div>

              <div className="space-y-2 pt-1 text-zinc-650">
                <div className="flex items-start gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-zinc-800">Email: </span>
                    <a href="mailto:office@ncieindia.org" className="text-[#0D6B4F] font-mono hover:underline font-bold">
                      office@ncieindia.org
                    </a>
                  </div>
                </div>
              </div>
            </div></div>

          {/* ── RIGHT COLUMN (8/12) ── */}
          <div className="lg:col-span-8 space-y-6">

            <div className="bg-white border border-zinc-200 rounded-none p-6 sm:p-8 space-y-6 shadow-2xs">
              <div className="border-l-4 border-primary pl-4 py-0.5">
                <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-zinc-900 mt-0.5">
                  Publications, DPR &amp; Policy Guidelines Archive
                </h2>
                <p className="text-xs text-zinc-500 mt-1">
                  Download authenticated PDF documents, manuals, and statutory notifications
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by document title, reference number, or keywords..."
                  className="w-full pl-8 pr-3 py-2 bg-white border border-zinc-300 text-xs text-zinc-800 focus:outline-none focus:border-[#0D6B4F]"
                />
              </div>

              {/* Documents List */}
              <div className="border border-zinc-200 overflow-hidden">
                <div className="divide-y divide-zinc-200">
                  {filteredDocs.map((doc, idx) => (
                    <div key={idx} className="p-4 sm:p-5 hover:bg-zinc-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.2 bg-zinc-100 text-zinc-700 font-mono text-[10px] font-bold">
                            {doc.category}
                          </span>
                        </div>
                        <h3 className="text-xs sm:text-sm font-bold text-zinc-900 leading-snug">
                          {doc.title}
                        </h3>
                        <p className="text-xs text-zinc-600 leading-relaxed max-w-xl">{doc.desc}</p>
                        <div className="text-[10px] text-zinc-400 flex items-center gap-3 pt-1">
                          <span>Date: {doc.date}</span>
                          <span>•</span>
                          <span className="font-mono">{doc.size}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-zinc-50 border border-zinc-300 hover:border-[#0D6B4F] hover:bg-emerald-50 text-zinc-700 hover:text-[#0D6B4F] font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                          title="View PDF document in browser"
                        >
                          <Eye className="w-3.5 h-3.5" /> View
                        </a>
                        <a
                          href={doc.url}
                          download
                          className="px-3 py-1.5 bg-white border border-zinc-300 hover:border-[#0D6B4F] hover:bg-[#0D6B4F] hover:text-white text-zinc-800 font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                          title="Download PDF file"
                        >
                          <Download className="w-3.5 h-3.5" /> Download
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 p-4 text-xs text-zinc-600">
                <strong>Publication Notice:</strong> All documents published herein represent official publications of the National Council for Innovation &amp; Entrepreneurship.
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
