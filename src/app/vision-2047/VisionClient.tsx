"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Download,
  Sparkles,
  Rocket,
  Building2,
  GraduationCap,
  Briefcase,
  Cpu,
  Sprout,
  HeartPulse,
  Scale,
  Globe,
  Award,
  Layers,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Milestone {
  year: string;
  title: string;
  phase: string;
  description: string;
  targets: string[];
  strategy: string;
}

const MILESTONES_DATA: Milestone[] = [
  {
    year: "2027",
    title: "NCIE Viksit Bharat 2047 Innovation Leadership Programs",
    phase: "Pillar 1: Undergraduate Sector Training",
    description:
      "A structured national leadership framework established across 10 core sectors, ensuring that every undergraduate student in India gains real-time industry exposure and skill-based learning.",
    strategy:
      "Implement structured leadership program templates and placement credits integration across Engineering, Science, Finance, Agriculture, Healthcare, IT & AI, etc.",
    targets: [
      "Real-time industry exposure for all UG branches",
      "Establishment of regional training coordination boards",
      "Unified placement credits integration with universities",
    ],
  },
  {
    year: "2032",
    title: "Mass Student Startup Funding",
    phase: "Pillar 2: Venture Scalability",
    description:
      "A large-scale startup ecosystem created to support student innovators across India, converting ideas into scalable business models.",
    strategy:
      "Distribute seed grants and establish strict progress audits to build viable enterprise models.",
    targets: [
      "₹1,000 Crore total allocation",
      "₹5,00,000 seed funding per student startup",
      "Target support for over 20,000 student-led startups",
    ],
  },
  {
    year: "2040",
    title: "Student Innovation Support Fund",
    phase: "Pillar 3: Research & Prototyping",
    description:
      "A dedicated national fund of ₹1,000 Crore to support student innovation projects, entrepreneurship development, incubation, and research/prototyping.",
    strategy:
      "Establish prototyping facilities and release milestone grants for high-impact hardware and deep-tech projects.",
    targets: [
      "₹1,000 Crore dedicated national support pool",
      "Continuous funding for research and validation schemes",
      "Establishment of cross-institutional research links",
    ],
  },
  {
    year: "2047",
    title: "Institutional Development Fund",
    phase: "Pillar 4: Infrastructure & Ecosystems",
    description:
      "A parallel ₹1,000 Crore infrastructure fund to support educational institutions and organizations in developing incubation centers, innovation labs, and entrepreneurship development cells.",
    strategy:
      "Disburse capital grants to transform standard educational institutions into centers of innovation excellence.",
    targets: [
      "₹1,000 Crore parallel infrastructure fund",
      "Accredited incubation centers and innovation labs in HEIs",
      "Self-sustaining college Entrepreneurship Development Cells (EDC)",
    ],
  },
];

const TEN_SECTORS = [
  { icon: Layers, name: "Engineering & Technology", desc: "Hardware prototypes, IoT, robotics, and industrial engineering." },
  { icon: Cpu, name: "Artificial Intelligence & Data Science", desc: "Deep-tech AI models, big data analytics, and computational intelligence." },
  { icon: Sparkles, name: "Science & Advanced Research", desc: "Fundamental science, materials research, and nanotechnology." },
  { icon: TrendingUp, name: "Commerce & Financial Tech", desc: "Digital finance, fintech ventures, market systems, and accounting innovation." },
  { icon: Globe, name: "Arts, Humanities & Social Sciences", desc: "Creative tech, heritage preservation, and behavioral sciences." },
  { icon: Sprout, name: "Agriculture & Rural Innovation", desc: "Agritech, soil health monitoring, smart irrigation, and rural enterprise." },
  { icon: HeartPulse, name: "Healthcare & Life Sciences", desc: "Medical devices, telemedicine, biotechnology, and wellness solutions." },
  { icon: Globe, name: "Environment & Sustainability", desc: "Renewable energy, circular economy, waste-to-wealth, and climate action." },
  { icon: Scale, name: "Public Policy & Social Innovation", desc: "Civic governance, e-service delivery, and social enterprise models." },
  { icon: Rocket, name: "Entrepreneurship & Startup Dev", desc: "Venture incubation, business acceleration, and commercial scaling." },
];

export default function Vision2047Page() {
  const { t, language } = useLanguage();

  const getMilestoneTitle = (m: Milestone) => {
    const key = `vis_milestone_${m.year}_title`;
    return t(key) || m.title;
  };

  const getMilestonePhase = (m: Milestone) => {
    const key = `vis_milestone_${m.year}_phase`;
    return t(key) || m.phase;
  };

  const getMilestoneDesc = (m: Milestone) => {
    const key = `vis_milestone_${m.year}_desc`;
    return t(key) || m.description;
  };

  const getMilestoneStrategy = (m: Milestone) => {
    const key = `vis_milestone_${m.year}_strategy`;
    return t(key) || m.strategy;
  };

  const getMilestoneTargets = (m: Milestone) => {
    return m.targets.map((tgt, i) => {
      const key = `vis_milestone_${m.year}_target_${i}`;
      return t(key) || tgt;
    });
  };

  return (
    <div className="flex-1 bg-[#F9FAFB] pb-16">
      
      {/* ── 1. Page Header (Gov/Institutional style) ── */}
      <div className="relative bg-gradient-to-br from-[#063B2C] via-[#0A5D45] to-[#04281E] py-16 text-white border-b border-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <div className="text-xs md:text-sm text-emerald-200 font-semibold mb-2 flex items-center gap-1.5 uppercase tracking-wider">
              <Link href="/" className="hover:underline hover:text-white transition-colors">{t("vis_home") || "Home"}</Link>
              <span>/</span>
              <span className="text-white/60">{t("vis_slash") || "Vision 2047"}</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-xs font-mono inline-flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>80th Year of Independence &bull; 150 Years of Vande Mataram</span>
              </span>
              <span className="bg-emerald-950/70 text-emerald-200 border border-emerald-500/30 text-[10px] font-semibold px-2.5 py-1 rounded-xs">
                Launched by Hon&apos;ble PM Shri Narendra Modi
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {t("vis_title") || "Viksit Bharat @ 2047 Vision Document"}
            </h1>
            <p className="text-emerald-100/90 text-xs sm:text-sm max-w-3xl mt-3 leading-relaxed">
              Official Vision Document unveiled and launched by <strong>Hon&apos;ble Prime Minister Shri Narendra Modi</strong> on the landmark occasion of the <strong>80th Year of Independence</strong> and <strong>150 Years of Vande Mataram</strong>, setting the national blueprint to empower students, startups, and higher education institutions under the vision of <em>&ldquo;One Family – One Entrepreneur&rdquo;</em>.
            </p>
          </div>

          {/* Download Action Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 shrink-0">
            <a
              href="/NCIE_Vision_Document_2047.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#C9A24B] hover:bg-[#b08d3d] text-[#063b2c] font-bold text-xs uppercase px-4 py-3.5 rounded-xs shadow-md transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Vision Document (PDF)</span>
            </a>
            <a
              href="/NCIE_DPR.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#0D6B4F] hover:bg-[#074733] text-white font-bold text-xs uppercase px-4 py-3.5 rounded-xs shadow-md transition-all cursor-pointer border border-emerald-400/30"
            >
              <Download className="w-4 h-4" />
              <span>Detailed Project Report (DPR)</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── 2. Core Mottos & National Mandates Banner ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white border border-zinc-200 p-6 sm:p-8 shadow-sm rounded-xs space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Motto 1 */}
            <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-xs text-center space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-[#0D6B4F] uppercase tracking-wider">Apex Aspiration</span>
              <h3 className="text-sm font-extrabold text-emerald-950">One Family – One Entrepreneur</h3>
              <p className="text-[11px] text-zinc-600 leading-snug">Sustainable livelihoods through grassroots venture creation.</p>
            </div>

            {/* Motto 2 */}
            <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-xs text-center space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-[#8B6E30] uppercase tracking-wider">Campus Target</span>
              <h3 className="text-sm font-extrabold text-amber-950">Every Campus an Innovation Hub</h3>
              <p className="text-[11px] text-zinc-600 leading-snug">Empowering every higher education institution with incubators.</p>
            </div>

            {/* Motto 3 */}
            <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-xs text-center space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-wider">Youth Focus</span>
              <h3 className="text-sm font-extrabold text-zinc-900">Every Student an Innovator</h3>
              <p className="text-[11px] text-zinc-600 leading-snug">Fostering design thinking and practical problem solving.</p>
            </div>

            {/* Motto 4 */}
            <div className="bg-emerald-900 text-white p-4 rounded-xs text-center space-y-1.5 border border-emerald-700">
              <span className="text-[10px] font-mono font-bold text-emerald-300 uppercase tracking-wider">Core Formula</span>
              <h3 className="text-sm font-extrabold text-white">Innovate • Inspire • Incubate • Impact</h3>
              <p className="text-[11px] text-emerald-100/80 leading-snug">Transforming ideas into global enterprises.</p>
            </div>
          </div>

          {/* Slogan Quote Strip */}
          <div className="bg-gradient-to-r from-emerald-950 via-zinc-900 to-emerald-950 text-white p-4 sm:p-5 rounded-xs border border-emerald-800/40 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div>
              <p className="text-xs sm:text-sm font-bold text-amber-300 tracking-wide font-sans">
                &ldquo;Innovate Today. Lead Tomorrow. Build Viksit Bharat @2047.&rdquo;
              </p>
              <p className="text-[11px] text-emerald-200/90 mt-1">
                From Idea to Prototype &bull; From Prototype to Startup &bull; From Startup to Investment &bull; From Investment to Global Enterprise
              </p>
            </div>
            <img src="/gov-emblem.png" alt="Emblem of India" className="h-8 w-auto opacity-70 brightness-0 invert shrink-0 hidden sm:block" />
          </div>

        </div>
      </div>

      {/* ── 3. Three Core Operational Pillars from the Vision Document ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold font-mono text-[#0D6B4F] uppercase tracking-widest bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-xs">
              Operational Framework
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
              Three Strategic Operational Sections
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Directly established under the NCIE Vision Document to mobilize students, early-stage startups, and educational institutions nationwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Section 1 */}
            <div className="bg-white border border-zinc-200 p-6 rounded-xs space-y-4 hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#0D6B4F]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold text-[#0D6B4F] uppercase tracking-wider">Section 01</span>
                <h3 className="text-base font-bold text-zinc-900">Student Innovation Section</h3>
                <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                  Builds <strong>India&apos;s Largest Student Innovation Network</strong> across IITs, NITs, universities, engineering, polytechnic, and ITI colleges. Provides structured 10-sector internships, fellowships, hackathons, and annual scholarships.
                </p>
              </div>
              <div className="pt-3 border-t border-zinc-100 text-[11px] font-semibold text-[#0D6B4F]">
                &bull; 10 Core UG Sector Internships &bull; Fellowships &bull; EDCs
              </div>
            </div>

            {/* Section 2 */}
            <div className="bg-white border border-zinc-200 p-6 rounded-xs space-y-4 hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-[#8B6E30]">
                  <Rocket className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold text-[#8B6E30] uppercase tracking-wider">Section 02</span>
                <h3 className="text-base font-bold text-zinc-900">Young Entrepreneurs Section</h3>
                <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                  Empowers startup founders through <strong>Student Startup Grants</strong> and <strong>₹5,00,000 Seed Funding</strong> via the structured <strong>5-Stage Milestone Growth Model</strong>, connecting validated startups to ₹25 Lakhs – ₹25 Crores growth capital pools.
                </p>
              </div>
              <div className="pt-3 border-t border-zinc-100 text-[11px] font-semibold text-[#8B6E30]">
                &bull; Up to ₹5L Seed Grants &bull; 5-Stage Model &bull; Investor Connect
              </div>
            </div>

            {/* Section 3 */}
            <div className="bg-white border border-zinc-200 p-6 rounded-xs space-y-4 hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold text-blue-700 uppercase tracking-wider">Section 03</span>
                <h3 className="text-base font-bold text-zinc-900">Institutions &amp; Organizations</h3>
                <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                  Provides <strong>₹20 Lakhs to ₹50 Lakhs</strong> development funding for campus incubators, makerspaces, and AI labs. Facilitates CSR partnerships for rural/tribal institutions and confers the <strong>Institutional Excellence Recognition</strong>.
                </p>
              </div>
              <div className="pt-3 border-t border-zinc-100 text-[11px] font-semibold text-blue-700">
                &bull; ₹20L–₹50L Incubation Grants &bull; CSR Alignment &bull; Star Awards
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. Ten Core Undergraduate Sectors Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white border border-zinc-200 p-6 sm:p-8 space-y-6 rounded-xs shadow-xs">
          <div className="border-l-4 border-primary pl-3">
            <span className="text-[10px] font-mono font-bold text-[#0D6B4F] uppercase tracking-wider">National Leadership Coverage</span>
            <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-zinc-900 mt-0.5">
              10 Core Undergraduate Sectors (National Internship Mission)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {TEN_SECTORS.map((sec, idx) => {
              const IconComp = sec.icon;
              return (
                <div key={idx} className="bg-zinc-50 border border-zinc-200 p-3.5 rounded-xs space-y-2 hover:bg-emerald-50/40 hover:border-emerald-300 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="w-7 h-7 rounded bg-white border border-zinc-200 flex items-center justify-center text-[#0D6B4F]">
                      <IconComp className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[9px] font-mono font-bold text-zinc-400">0{idx + 1}</span>
                  </div>
                  <h4 className="text-xs font-bold text-zinc-900 leading-snug">{sec.name}</h4>
                  <p className="text-[10px] text-zinc-500 leading-relaxed">{sec.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 5. Milestones Registry Table ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white border border-zinc-200 p-6 sm:p-8 space-y-6 rounded-xs shadow-xs">
          
          <div className="flex items-center gap-2 pb-4 border-b border-zinc-200 border-l-4 border-primary pl-3">
            <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900">
              {t("vis_table_title") || "Centennial Milestone Roadmap (2027–2047)"}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-zinc-200">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-xs">
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-24 text-center">{t("vis_col_year") || "Year"}</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-52">{t("vis_col_scope") || "Phase & Initiative"}</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-72">{t("vis_col_focus") || "Strategic Strategy"}</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700">{t("vis_col_targets") || "Key Output Indicators"}</th>
                </tr>
              </thead>
              <tbody>
                {MILESTONES_DATA.map((milestone, idx) => (
                  <tr key={idx} className="border-b border-zinc-200 last:border-b-0 hover:bg-zinc-50/50 odd:bg-white even:bg-zinc-50/20 text-xs">
                    <td className="px-4 py-5 font-mono font-bold text-center border-r border-zinc-200 text-accent-dark bg-zinc-50/20 text-sm">
                      {milestone.year}
                    </td>
                    <td className="px-4 py-5 border-r border-zinc-200">
                      <div className="font-bold text-zinc-900 leading-snug">{getMilestoneTitle(milestone)}</div>
                      <div className="text-[10px] text-zinc-450 mt-1 uppercase font-semibold font-mono">{getMilestonePhase(milestone)}</div>
                      <p className="text-[11px] text-zinc-500 mt-2 leading-relaxed text-justify pr-2">{getMilestoneDesc(milestone)}</p>
                    </td>
                    <td className="px-4 py-5 border-r border-zinc-200 text-zinc-650 leading-relaxed text-justify pr-2">
                      <div className="font-semibold text-zinc-750 mb-1">{t("vis_methodology") || "Methodology & Scope"}</div>
                      {getMilestoneStrategy(milestone)}
                    </td>
                    <td className="px-4 py-5 text-zinc-700 font-medium">
                      <ul className="space-y-2">
                        {getMilestoneTargets(milestone).map((tgt, i) => (
                          <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                            <ShieldCheck className="w-4 h-4 text-[#0D6B4F] shrink-0 mt-0.5" />
                            <span>{tgt}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
