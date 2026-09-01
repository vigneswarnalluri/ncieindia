"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Landmark,
  CheckCircle,
  FileText,
  AlertTriangle,
  Building,
  Cpu,
  GraduationCap,
  ChevronRight,
  Download,
  Mail,
  Clock,
  Check,
  ShieldCheck,
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

const MINISTRIES = [
  {
    name: "Ministry of Corporate Affairs (MCA)",
    hindi: "कॉर्पोरेट कार्य मंत्रालय",
    scope: "Corporate and institutional ecosystem development, governance, CSR partnership facilitation, and ethical business practices.",
    alignmentPoints: [
      "Promotion of responsible Corporate Social Responsibility (CSR) investments in collegiate innovation.",
      "Guidance for student enterprises on statutory incorporation and formal governance.",
      "Capacity building for institutional and organizational frameworks across states.",
    ],
    icon: Building,
  },
  {
    name: "Ministry of Electronics & Information Technology (MeitY)",
    hindi: "इलेक्ट्रॉनिक्स और सूचना प्रौद्योगिकी मंत्रालय",
    scope: "Digital technology adoption, Artificial Intelligence, software innovation, and emerging tech entrepreneurship.",
    alignmentPoints: [
      "National student awareness programs in Artificial Intelligence, Cloud, and Web technologies.",
      "Support for tech-driven student prototypes, hackathons, and software innovation challenges.",
      "Digital skill-building for rural, semi-urban, and grassroots youth innovators.",
    ],
    icon: Cpu,
  },
  {
    name: "Ministry of Micro, Small & Medium Enterprises (MSME)",
    hindi: "सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय",
    scope: "Grassroots entrepreneurship, enterprise creation, youth-led business ventures, and MSME ecosystem integration.",
    alignmentPoints: [
      "Fostering grassroots entrepreneurial mindset and micro-enterprise development among youth.",
      "Structured ideation-to-enterprise pathways for scalable local innovations.",
      "Connecting promising student ventures with regional MSME industrial clusters.",
    ],
    icon: Landmark,
  },
  {
    name: "Ministry of Skill Development & Entrepreneurship (MSDE)",
    hindi: "कौशल विकास और उद्यमशीलता मंत्रालय",
    scope: "Vocational upskilling, practical learning exposure, leadership training, and youth employability.",
    alignmentPoints: [
      "Delivery of the 60-Day Viksit Bharat Innovation Leadership Programme (60 Hours).",
      "Implementation of the 10-Core sector paid internship and practical apprenticeship frameworks.",
      "Bridging the academia-industry skill divide through mentorship and competency training.",
    ],
    icon: GraduationCap,
  },
];

export default function GovernmentAlignmentClient() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("ministries");

  const TABS = [
    { id: "ministries", label: language === "hi" ? "मंत्रालयी नीति संरेखण" : "Central Ministries Policy Alignment" },
    { id: "viksit", label: language === "hi" ? "विकसित भारत @2047 ढांचा" : "Viksit Bharat @2047 Framework" },
    { id: "transparency", label: language === "hi" ? "संस्थान की वैधानिक स्थिति एवं पारदर्शिता" : "Institutional Status & Transparency" },
  ];

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
            <span className="text-white/75">Government &amp; Policy Alignment</span>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-widest text-accent font-mono">
              राष्ट्रीय नीति एवं विकास संरेखण
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Government &amp; Policy Alignment Framework
            </h1>
            <p className="text-emerald-100/90 text-xs sm:text-sm mt-2 max-w-3xl leading-relaxed">
              NCIE aligns its nationwide student innovation, startup incubation, and skill development programmes with the national priorities of the Government of India and the long-term vision of Viksit Bharat @2047.
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
                  {language === "hi" ? "नीति संरेखण अनुभाग" : "Policy Directory"}
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

            {/* National Values Box */}
            <div className="bg-white border border-zinc-200 rounded-none p-5 space-y-3 shadow-2xs">
              <div className="border-l-3 border-[#0D6B4F] pl-3 py-0.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                  Core National Value
                </h3>
                <p className="text-[10px] text-zinc-400 font-mono mt-0.5">GOVERNING PRINCIPLE</p>
              </div>
              <p className="text-xs text-zinc-800 font-serif italic border-l-2 border-emerald-600 pl-3 py-1 bg-emerald-50/40">
                &ldquo;Sabka Saath, Sabka Vikas, Sabka Vishwas, Sabka Prayas&rdquo;
              </p>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Together with all, development for all, trust of all, and collaborative effort of all stakeholders.
              </p>
            </div>

            {/* Secretariat Desk */}
            <div className="bg-white border border-zinc-200 rounded-none p-5 space-y-3.5 shadow-2xs text-xs">
              <div className="border-l-3 border-[#0D6B4F] pl-3 py-0.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                  Policy &amp; Compliance Cell
                </h3>
                <p className="text-[10px] text-zinc-400 font-mono mt-0.5">CENTRAL REGISTRY</p>
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
            </div>

          </div>

          {/* ── RIGHT COLUMN (8/12) ── */}
          <div className="lg:col-span-8 space-y-6">

            {/* TAB 1: MINISTRIES */}
            {activeTab === "ministries" && (
              <div className="space-y-6">
                <div className="bg-white border border-zinc-200 rounded-none p-6 sm:p-8 space-y-6 shadow-2xs">
                  <div className="border-l-4 border-primary pl-4 py-0.5">
                    <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-widest block">
                      SECTION 1 • MINISTERIAL DOMAINS
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-zinc-900 mt-0.5">
                      Central Ministries Policy Alignment Matrix
                    </h2>
                    <p className="text-xs text-zinc-500 mt-1">
                      Aligning Collegiate Programmes with Key Government of India Mandates
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed text-justify">
                    NCIE conducts its institutional, training, and startup support initiatives in thematic alignment with four core central government ministries, establishing structured touchpoints across digital tech, vocational skilling, micro-enterprises, and corporate governance.
                  </p>

                  <div className="space-y-4">
                    {MINISTRIES.map((m, idx) => {
                      const Icon = m.icon;
                      return (
                        <div key={idx} className="border border-zinc-200 p-5 bg-zinc-50/50 space-y-3">
                          <div className="flex items-center gap-3">
                            <span className="p-2 bg-white border border-zinc-200 text-[#0D6B4F]">
                              <Icon className="w-5 h-5" />
                            </span>
                            <div>
                              <h3 className="text-sm font-bold text-zinc-900">{m.name}</h3>
                              <div className="text-[11px] text-zinc-500 font-medium">{m.hindi}</div>
                            </div>
                          </div>
                          <p className="text-xs text-zinc-650 leading-relaxed">{m.scope}</p>
                          <div className="space-y-1.5 pt-2 border-t border-zinc-200 text-xs">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono">Key Programme Alignments:</div>
                            {m.alignmentPoints.map((pt, pIdx) => (
                              <div key={pIdx} className="flex items-start gap-2 text-zinc-700">
                                <Check className="w-3.5 h-3.5 text-[#0D6B4F] shrink-0 mt-0.5" />
                                <span>{pt}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: VIKSIT BHARAT @2047 */}
            {activeTab === "viksit" && (
              <div className="bg-white border border-zinc-200 rounded-none p-6 sm:p-8 space-y-6 shadow-2xs">
                <div className="border-l-4 border-primary pl-4 py-0.5">
                  <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-widest block">
                    SECTION 2 • CENTENARY ROADMAP
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-zinc-900 mt-0.5">
                    Viksit Bharat @2047 National Vision &amp; Macro Pathways
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">
                    Building a Self-Reliant, Innovation-Driven Economy Powered by Youth
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed text-justify">
                  NCIE&apos;s long-term framework is designed to contribute to transforming India into a fully developed nation by 2047, the centenary year of India&apos;s independence, by nurturing a generation of skilled, innovative, technology-enabled, and responsible youth.
                </p>

                {/* Macro Progression Steps */}
                <div className="border border-zinc-200 p-5 bg-zinc-50 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-800 font-mono">
                      Macro Socio-Economic Development Pathway
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase">7-Phase Progression</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                    {[
                      { step: "01", title: "Education", desc: "Foundational Mindset" },
                      { step: "02", title: "Skills", desc: "Applied Training" },
                      { step: "03", title: "Innovation", desc: "Problem Solving" },
                      { step: "04", title: "Enterprise", desc: "Campus Incubation" },
                      { step: "05", title: "Startups", desc: "Seed Grants & PoC" },
                      { step: "06", title: "Employment", desc: "Job Creation" },
                      { step: "07", title: "Social Impact", desc: "National Growth" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-zinc-200 p-3 text-center flex flex-col items-center justify-between min-h-[86px] hover:border-[#0D6B4F] hover:shadow-2xs transition-all"
                      >
                        <span className="text-[10px] font-mono font-bold text-[#0D6B4F] bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                          {item.step}
                        </span>
                        <div className="font-bold text-zinc-900 text-xs mt-1.5 leading-tight">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-zinc-400 font-medium leading-tight mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2047 Envisioned Outcomes */}
                <div className="space-y-3 border border-zinc-200 p-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-zinc-800 font-mono">
                    Envisioned DPR Outcomes by 2047:
                  </div>
                  <div className="space-y-2 text-xs text-zinc-700">
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0D6B4F] shrink-0 mt-0.5" />
                      <span><strong>Connected National Network:</strong> Unifying collegiate institutions across urban, rural, and grassroots districts.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0D6B4F] shrink-0 mt-0.5" />
                      <span><strong>Millions of Job-Ready Youth:</strong> Skilled in digital, emerging, and entrepreneurial competencies.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0D6B4F] shrink-0 mt-0.5" />
                      <span><strong>20,000+ Student-Led Startups:</strong> Supported through milestone seed grants, incubation, and investor connects.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: TRANSPARENCY & STATUTORY STATUS */}
            {activeTab === "transparency" && (
              <div className="bg-white border border-zinc-200 rounded-none p-6 sm:p-8 space-y-6 shadow-2xs">
                <div className="border-l-4 border-primary pl-4 py-0.5">
                  <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-widest block">
                    SECTION 3 • STATUTORY DISCLOSURE
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-zinc-900 mt-0.5">
                    Institutional Status &amp; Transparency Statement
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">
                    Formal Legal Declaration and Governance Norms
                  </p>
                </div>

                <div className="border-2 border-amber-300/80 bg-amber-50/70 p-5 space-y-3 text-xs text-amber-950">
                  <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    Mandatory Policy Alignment &amp; Verification Disclaimer
                  </div>
                  <p className="leading-relaxed">
                    The National Council for Innovation &amp; Entrepreneurship (NCIE) is an independent, non-governmental, not-for-profit organisation working to promote innovation, entrepreneurship, youth leadership, skill development, digital transformation, and institutional capacity building.
                  </p>
                  <p className="leading-relaxed font-semibold">
                    Policy alignment with a Government of India ministry or national initiative should not be interpreted as a formal government partnership, approval, statutory affiliation, or endorsement unless supported by a specific official document, executed MoU, sanction order, or competent-authority record.
                  </p>
                </div>

                <div className="border border-zinc-200 p-5 space-y-3 text-xs text-zinc-700">
                  <div className="font-bold text-zinc-900 uppercase font-mono">Principles of Public Disclosure:</div>
                  <div className="p-3 bg-zinc-50 border border-zinc-200 font-mono text-[11px] text-zinc-700">
                    Established Facts → Formal Partnerships → Proposed Initiatives → Funding Targets → Long-Term Vision
                  </div>
                  <p className="leading-relaxed">
                    All financial targets, including the ₹1,000 Crore Student Innovation Support Fund and ₹12,000+ Crore annual resource mobilisation targets, represent proposed DPR frameworks subject to independent due diligence, CSR partnerships, and formal programme sanction.
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
