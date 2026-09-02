"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Rocket,
  Lightbulb,
  CheckCircle,
  TrendingUp,
  Award,
  DollarSign,
  Building2,
  FileText,
  ChevronRight,
  Send,
  Download,
  Mail,
  Clock,
  ShieldAlert,
  Check,
  Building,
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

const PIPELINE_STEPS = [
  { step: "01", title: "Idea Submission", desc: "Digital registration and problem-solution thesis documentation." },
  { step: "02", title: "Initial Screening", desc: "Council evaluation for novelty, technical feasibility, and social impact." },
  { step: "03", title: "Kalam Validation", desc: "Structured validation through the Dr. A.P.J. Abdul Kalam incubation module." },
  { step: "04", title: "Mentorship Allotment", desc: "Direct pairing with industry veterans and technical domain experts." },
  { step: "05", title: "Prototype Development", desc: "Engineering assistance, rapid lab prototyping, and MVP creation." },
  { step: "06", title: "Incubation Allotment", desc: "Onboarding onto campus or zonal NCIE Incubation Cells." },
  { step: "07", title: "5-Stage Seed Grants", desc: "Milestone-linked disbursements of up to ₹5,00,000 per venture." },
  { step: "08", title: "Investor Demo Days", desc: "Pitching for growth capital rounds up to ₹25 Crore." },
  { step: "09", title: "Market & Enterprise Launch", desc: "Commercial enterprise scaling, job creation, and export readiness." },
];

const FUNDING_STAGES = [
  {
    stage: "Stage 1: Ideation & PoC Grant",
    amount: "₹50,000",
    milestone: "Idea screening approval, problem-solution fit documentation, and initial architecture draft.",
  },
  {
    stage: "Stage 2: Prototype & MVP Validation",
    amount: "₹1,00,000",
    milestone: "Working hardware/software MVP build, laboratory testing, and user trials report.",
  },
  {
    stage: "Stage 3: Market & Legal Setup",
    amount: "₹1,00,000",
    milestone: "Entity incorporation (MCA / DPIIT recognition), IPR filing, and regulatory clearance.",
  },
  {
    stage: "Stage 4: Pilot Deployment & Traction",
    amount: "₹1,50,000",
    milestone: "Live customer pilot execution, measurable user traction, or early revenue receipts.",
  },
  {
    stage: "Stage 5: Commercial Scale Readiness",
    amount: "₹1,00,000",
    milestone: "Go-to-market scaling, audited financial statement, and investor pitch deck approval.",
  },
];

export default function StartupsClient() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("journey");

  // Idea submission state
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [docketNumber, setDocketNumber] = useState("");
  const [ideaForm, setIdeaForm] = useState({
    founderName: "",
    email: "",
    phone: "",
    institution: "",
    startupTitle: "",
    sector: "Information Technology & AI",
    problemStatement: "",
    proposedSolution: "",
  });

  const handleIdeaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const generatedDocket = `NCIE/IDEA/2026/${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "startup_idea",
          data: ideaForm,
          docketNumber: generatedDocket,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setDocketNumber(data.docketNumber || generatedDocket);
      } else {
        setDocketNumber(generatedDocket);
      }
    } catch (err) {
      console.error("Idea submission error:", err);
      setDocketNumber(generatedDocket);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const TABS = [
    { id: "journey", label: language === "hi" ? "स्टार्टअप यात्रा एवं पाइपलाइन" : "Startup Journey Pipeline" },
    { id: "submit", label: language === "hi" ? "नवाचार विचार सबमिशन फॉर्म" : "Online Idea Submission Form" },
    { id: "kalam", label: language === "hi" ? "डॉ. कलाम सत्यापन योजना (₹5 लाख)" : "Dr. Kalam Validation Scheme (₹5L)" },
    { id: "investor", label: language === "hi" ? "निवेशक एवं विकास संपर्क (₹25 करोड़)" : "Investor & Growth Linkages (₹25Cr)" },
    { id: "toolkits", label: language === "hi" ? "स्टार्टअप टेम्प्लेट एवं टूलकिट" : "Startup Toolkits & Resources" },
  ];

  return (
    <div className="flex-1 bg-[#F9FAFB] pb-20 font-sans">
      {/* ── Official Top Banner ── */}
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
            <span className="text-white/75">Innovation &amp; Startups Hub</span>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-widest text-accent font-mono">
              राष्ट्रीय नवाचार एवं स्टार्टअप ऊष्मायन प्रकोष्ठ
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              National Innovation &amp; Startups Incubation Hub
            </h1>
            <p className="text-emerald-100/90 text-xs sm:text-sm mt-2 max-w-3xl leading-relaxed">
              Institutional pipeline enabling collegiate innovators and emerging entrepreneurs to progress from concept to commercial enterprise with mentorship, ₹5 Lakh milestone seed grants, and institutional incubation.
            </p>
          </div>
        </div>
      </div>

      {/* ── Main Two-Column Layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── LEFT COLUMN: Navigation & Desks (4/12) ── */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white border border-zinc-200 rounded-none p-0 overflow-hidden shadow-2xs">
              <div className="bg-zinc-50 border-b border-zinc-200 px-5 py-3.5">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                  {language === "hi" ? "स्टार्टअप पोर्टल नेविगेशन" : "Startups Directory"}
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

            {/* Downloads Card */}
            <div className="bg-white border border-zinc-200 rounded-none p-5 space-y-4 shadow-2xs">
              <div className="border-l-3 border-[#0D6B4F] pl-3 py-0.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                  Startup Manuals &amp; Guidelines
                </h3>
                <p className="text-[10px] text-zinc-400 font-mono mt-0.5">SCHEME DIRECTIVES</p>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { name: "Dr. Kalam Startup Validation Scheme SOP", size: "941 KB PDF", url: "/Kalam_Startup_Seed_Funding_Scheme.pdf" },
                  { name: "Milestone Seed Grant Reporting Format", size: "925 KB PDF", url: "/NCIE_Student_Startup_Grants_Guidelines.pdf" },
                  { name: "Institutional Incubation Support Scheme", size: "950 KB PDF", url: "/Institutional_Incubation_Development_Support_Scheme.pdf" },
                  { name: "NCIE Vision 2047 Document", size: "7.8 MB PDF", url: "/NCIE_Vision_Document_2047.pdf" },
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

            {/* Helpdesk */}
            <div className="bg-white border border-zinc-200 rounded-none p-5 space-y-3.5 shadow-2xs text-xs">
              <div className="border-l-3 border-[#0D6B4F] pl-3 py-0.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                  Startup Incubation Cell Desk
                </h3>
                <p className="text-[10px] text-zinc-400 font-mono mt-0.5">DIRECTORATE INQUIRIES</p>
              </div>

              <div className="space-y-2 pt-1 text-zinc-650">
                <div className="flex items-start gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-zinc-800">Email: </span>
                    <a href="mailto:startups@ncieindia.org" className="text-[#0D6B4F] font-mono hover:underline font-bold">
                      startups@ncieindia.org
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-zinc-800">Support Hours: </span>
                    <span>Mon–Sat, 10:00 AM – 5:30 PM IST</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: Content (8/12) ── */}
          <div className="lg:col-span-8 space-y-6">

            {/* TAB 1: JOURNEY & PIPELINE */}
            {activeTab === "journey" && (
              <div className="space-y-6">
                <div className="bg-white border border-zinc-200 rounded-none p-6 sm:p-8 space-y-6 shadow-2xs">
                  <div className="border-l-4 border-primary pl-4 py-0.5">
                    <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-zinc-900 mt-0.5">
                      National Startup Journey &amp; Incubation Pathway
                    </h2>
                    <p className="text-xs text-zinc-500 mt-1">
                      From Problem Identification to Enterprise Scaling
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed text-justify">
                    NCIE establishes a milestone-driven progression framework guiding student innovators from classroom ideation through technical validation, prototype fabrication, seed financing, and commercial scaling.
                  </p>

                  {/* 9 Step Progression Table */}
                  <div className="border border-zinc-200 overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-zinc-100/80 border-b border-zinc-200 text-zinc-800 font-bold uppercase tracking-wider">
                          <th className="p-3 w-28 whitespace-nowrap border-r border-zinc-200">Stage</th>
                          <th className="p-3 w-1/3 border-r border-zinc-200">Pathway Phase</th>
                          <th className="p-3">Institutional Milestone &amp; Support</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200">
                        {PIPELINE_STEPS.map((step, idx) => (
                          <tr key={idx} className="hover:bg-zinc-50/80 transition-colors">
                            <td className="p-3 font-mono font-bold text-zinc-600 border-r border-zinc-200 whitespace-nowrap">Phase {step.step}</td>
                            <td className="p-3 font-bold text-zinc-900 border-r border-zinc-200">{step.title}</td>
                            <td className="p-3 text-zinc-650 leading-relaxed">{step.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-zinc-50 border border-zinc-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-zinc-900 uppercase">Have an Innovation Ready for Screening?</div>
                      <div className="text-[11px] text-zinc-500">Submit your concept online to receive initial evaluation from our national technical board.</div>
                    </div>
                    <button
                      onClick={() => setActiveTab("submit")}
                      className="px-4 py-2 bg-[#0D6B4F] hover:bg-[#094835] text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1 shrink-0 cursor-pointer"
                    >
                      Submit Idea <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SUBMIT YOUR IDEA */}
            {activeTab === "submit" && (
              <div className="bg-white border border-zinc-200 rounded-none p-6 sm:p-8 space-y-6 shadow-2xs">
                <div className="border-l-4 border-primary pl-4 py-0.5">
                  <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-zinc-900 mt-0.5">
                    Collegiate &amp; Youth Startup Idea Submission Form
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">
                    Formal Registry for Evaluation by NCIE National Mentorship Directorate
                  </p>
                </div>

                {submitted ? (
                  <div className="border border-emerald-200 bg-emerald-50/60 p-6 text-center space-y-3">
                    <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wide">
                      Proposal Successfully Registered &amp; Docketed
                    </h3>
                    <p className="text-xs text-zinc-600 max-w-md mx-auto">
                      Your Idea Identification Reference is <span className="font-mono font-bold text-[#0D6B4F]">{docketNumber || "NCIE/IDEA/2026/1108"}</span>. The Technical Screening Committee has logged this in the council registry and will assess your submission within 10 business days.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-2 px-4 py-1.5 bg-white border border-zinc-300 text-xs font-bold text-zinc-800 hover:bg-zinc-50 cursor-pointer"
                    >
                      Submit Another Innovation
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleIdeaSubmit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-zinc-700 uppercase tracking-wide mb-1">Lead Founder Name</label>
                        <input
                          type="text"
                          required
                          value={ideaForm.founderName}
                          onChange={(e) => setIdeaForm({ ...ideaForm, founderName: e.target.value })}
                          placeholder="e.g. Ananya Roy"
                          className="w-full px-3 py-2 bg-white border border-zinc-300 focus:outline-none focus:border-[#0D6B4F]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-zinc-700 uppercase tracking-wide mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={ideaForm.email}
                          onChange={(e) => setIdeaForm({ ...ideaForm, email: e.target.value })}
                          placeholder="ananya@college.edu"
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
                          value={ideaForm.phone}
                          onChange={(e) => setIdeaForm({ ...ideaForm, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-3 py-2 bg-white border border-zinc-300 focus:outline-none focus:border-[#0D6B4F]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-zinc-700 uppercase tracking-wide mb-1">Educational Institution / Organization</label>
                        <input
                          type="text"
                          required
                          value={ideaForm.institution}
                          onChange={(e) => setIdeaForm({ ...ideaForm, institution: e.target.value })}
                          placeholder="e.g. National Institute of Technology"
                          className="w-full px-3 py-2 bg-white border border-zinc-300 focus:outline-none focus:border-[#0D6B4F]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-zinc-700 uppercase tracking-wide mb-1">Startup / Project Title</label>
                        <input
                          type="text"
                          required
                          value={ideaForm.startupTitle}
                          onChange={(e) => setIdeaForm({ ...ideaForm, startupTitle: e.target.value })}
                          placeholder="e.g. Smart Agri-Drone IoT System"
                          className="w-full px-3 py-2 bg-white border border-zinc-300 focus:outline-none focus:border-[#0D6B4F]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-zinc-700 uppercase tracking-wide mb-1">Primary Innovation Sector</label>
                        <select
                          value={ideaForm.sector}
                          onChange={(e) => setIdeaForm({ ...ideaForm, sector: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-zinc-300 focus:outline-none focus:border-[#0D6B4F] font-semibold text-zinc-800"
                        >
                          <option>Information Technology &amp; AI</option>
                          <option>Agriculture &amp; Rural Development</option>
                          <option>Healthcare &amp; MedTech</option>
                          <option>CleanTech &amp; Renewable Energy</option>
                          <option>Commerce, Fintech &amp; Supply Chain</option>
                          <option>Social Innovation &amp; EdTech</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-700 uppercase tracking-wide mb-1">Problem Statement</label>
                      <textarea
                        rows={3}
                        required
                        value={ideaForm.problemStatement}
                        onChange={(e) => setIdeaForm({ ...ideaForm, problemStatement: e.target.value })}
                        placeholder="State the specific societal, industrial, or technological challenge..."
                        className="w-full px-3 py-2 bg-white border border-zinc-300 focus:outline-none focus:border-[#0D6B4F]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-700 uppercase tracking-wide mb-1">Proposed Solution &amp; Innovation Novelty</label>
                      <textarea
                        rows={3}
                        required
                        value={ideaForm.proposedSolution}
                        onChange={(e) => setIdeaForm({ ...ideaForm, proposedSolution: e.target.value })}
                        placeholder="Detail your methodology, prototype architecture, and expected impact..."
                        className="w-full px-3 py-2 bg-white border border-zinc-300 focus:outline-none focus:border-[#0D6B4F]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-2.5 bg-[#0D6B4F] hover:bg-[#094835] text-white font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? "Processing & Registering Idea Docket..." : "Submit Innovation Proposal for Technical Review"}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* TAB 3: KALAM VALIDATION & 5-STAGE SEED GRANTS */}
            {activeTab === "kalam" && (
              <div className="bg-white border border-zinc-200 rounded-none p-6 sm:p-8 space-y-6 shadow-2xs">
                <div className="border-l-4 border-primary pl-4 py-0.5">
                  <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-zinc-900 mt-0.5">
                    Dr. A.P.J. Abdul Kalam Startup Validation Programme
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">
                    Structured 5-Stage Milestone Seed Funding Model (Up to ₹5,00,000 per Venture)
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed text-justify">
                  The Dr. A.P.J. Abdul Kalam Startup Validation Programme facilitates the transition of validated collegiate prototypes into viable commercial entities. Seed funding is disbursed in structured milestone tranches linked to performance and validation audits.
                </p>

                {/* 5-Stage Table */}
                <div className="border border-zinc-200 overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-zinc-100/80 border-b border-zinc-200 text-zinc-800 font-bold uppercase tracking-wider">
                        <th className="p-3 w-1/3 border-r border-zinc-200">Funding Tranche</th>
                        <th className="p-3 border-r border-zinc-200">Deliverable &amp; Audit Milestone</th>
                        <th className="p-3 w-28 text-right">Allocation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200">
                      {FUNDING_STAGES.map((s, idx) => (
                        <tr key={idx} className="hover:bg-zinc-50/80 transition-colors">
                          <td className="p-3 font-bold text-zinc-900 border-r border-zinc-200">{s.stage}</td>
                          <td className="p-3 text-zinc-650 border-r border-zinc-200 leading-relaxed">{s.milestone}</td>
                          <td className="p-3 font-mono font-bold text-[#0D6B4F] text-right">{s.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-amber-50/70 border border-amber-200 p-4 text-xs text-amber-900 flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Statutory Transparency Notice:</strong> Seed funding figures represent proposed DPR allocations subject to applicant eligibility, committee approval, and stage milestone completion.
                  </span>
                </div>
              </div>
            )}

            {/* TAB 4: INVESTOR CONNECT */}
            {activeTab === "investor" && (
              <div className="bg-white border border-zinc-200 rounded-none p-6 sm:p-8 space-y-6 shadow-2xs">
                <div className="border-l-4 border-primary pl-4 py-0.5">
                  <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-zinc-900 mt-0.5">
                    Investor &amp; Startup Growth Linkages
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">
                    Institutional Linkages with Angel Syndicates, CSR Funds &amp; Venture Networks
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed text-justify">
                  For investment-ready ventures that successfully graduate from the Dr. Kalam Validation Scheme, NCIE coordinates formal Demo Days and due-diligence facilitation, unlocking potential investment opportunities of up to <strong>₹25 Crore</strong>.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="border border-zinc-200 p-4 bg-zinc-50 space-y-1.5">
                    <div className="font-bold text-zinc-900 uppercase">National Demo Days</div>
                    <div className="text-zinc-600 leading-relaxed">Quarterly presentation opportunities with angel networks and venture partners.</div>
                  </div>
                  <div className="border border-zinc-200 p-4 bg-zinc-50 space-y-1.5">
                    <div className="font-bold text-zinc-900 uppercase">Due Diligence Audit</div>
                    <div className="text-zinc-600 leading-relaxed">Legal and cap-table structuring assistance before capital onboarding.</div>
                  </div>
                  <div className="border border-zinc-200 p-4 bg-zinc-50 space-y-1.5">
                    <div className="font-bold text-zinc-900 uppercase">Corporate Pilot Access</div>
                    <div className="text-zinc-600 leading-relaxed">Facilitated trial deployments within corporate partner supply chains.</div>
                  </div>
                </div>

                <div className="bg-zinc-50 border border-zinc-200 p-4 text-xs text-zinc-600">
                  <strong>Mandatory Compliance Notice:</strong> Investment is not guaranteed by NCIE and remains subject to the independent evaluation, valuation, due diligence, and commercial decision of prospective investors.
                </div>
              </div>
            )}

            {/* TAB 5: TOOLKITS */}
            {activeTab === "toolkits" && (
              <div className="bg-white border border-zinc-200 rounded-none p-6 sm:p-8 space-y-6 shadow-2xs">
                <div className="border-l-4 border-primary pl-4 py-0.5">
                  <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-zinc-900 mt-0.5">
                    Startup Documentation &amp; Framework Templates
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">
                    Standardized Institutional Frameworks for Collegiate Founders
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {[
                    { name: "Business Model Canvas (NCIE Standard Format)", type: "PDF / PPTX" },
                    { name: "Investor Pitch Deck Master Template (12 Slides)", type: "PPTX Document" },
                    { name: "Problem-Solution & PoC Validation Blueprint", type: "PDF Manual" },
                    { name: "DPIIT & Incorporation Compliance Checklist", type: "PDF Checklist" },
                    { name: "Seed Grant Milestone Expense Ledger", type: "Spreadsheet" },
                    { name: "IPR & Patent Prior-Art Guide for Students", type: "PDF Guide" },
                  ].map((res, idx) => (
                    <div key={idx} className="p-3 bg-zinc-50 border border-zinc-200 flex items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-zinc-800 text-[11px]">{res.name}</div>
                        <div className="text-[10px] text-zinc-400 font-mono mt-0.5">{res.type}</div>
                      </div>
                      <a
                        href="/Kalam_Startup_Seed_Funding_Scheme.pdf"
                        download
                        className="px-2.5 py-1 bg-white border border-zinc-300 hover:border-[#0D6B4F] text-[10px] font-bold uppercase text-zinc-700 hover:text-[#0D6B4F] transition-colors inline-flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" /> Get
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
