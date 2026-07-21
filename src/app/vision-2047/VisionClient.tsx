"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
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
    description: "A structured national leadership framework established across 10 core sectors, ensuring that every undergraduate student in India gains real-time industry exposure and skill-based learning.",
    strategy: "Implement structured leadership program templates and placement credits integration across Engineering, Science, Finance, Agriculture, Healthcare, IT & AI, etc.",
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
    description: "A large-scale startup ecosystem created to support student innovators across India, converting ideas into scalable business models.",
    strategy: "Distribute seed grants and establish strict progress audits to build viable enterprise models.",
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
    description: "A dedicated national fund of ₹1,000 Crore to support student innovation projects, entrepreneurship development, incubation, and research/prototyping.",
    strategy: "Establish prototyping facilities and release milestone grants for high-impact hardware and deep-tech projects.",
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
    description: "A parallel ₹1,000 Crore infrastructure fund to support educational institutions and organizations in developing incubation centers, innovation labs, and entrepreneurship development cells.",
    strategy: "Disburse capital grants to transform standard educational institutions into centers of innovation excellence.",
    targets: [
      "₹1,000 Crore parallel infrastructure fund",
      "Accredited incubation centers and innovation labs in HEIs",
      "Self-sustaining college Entrepreneurship Development Cells (EDC)",
    ],
  },
];

export default function Vision2047Page() {
  const { t } = useLanguage();

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
      
      {/* Page Header (Gov/Institutional style) */}
      <div className="relative bg-[#0A5D45] py-16 text-white border-b border-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs md:text-sm text-emerald-100 font-semibold mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <Link href="/" className="hover:underline hover:text-white transition-colors">{t("vis_home")}</Link>
            <span>/</span>
            <span className="text-white/60">{t("vis_slash")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t("vis_title")}
          </h1>
          <p className="text-emerald-100/80 text-xs sm:text-sm max-w-3xl mt-3 leading-relaxed">
            {t("vis_desc")}
          </p>
        </div>
      </div>

      {/* Milestones Registry Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12">
        <div className="bg-white border border-zinc-200 p-6 sm:p-8 space-y-6">
          
          <div className="flex items-center gap-2 pb-4 border-b border-zinc-200 border-l-4 border-primary pl-3">
            <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900">
              {t("vis_table_title")}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-zinc-200">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-xs">
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-24 text-center">{t("vis_col_year")}</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-52">{t("vis_col_scope")}</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-72">{t("vis_col_focus")}</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700">{t("vis_col_targets")}</th>
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
                      <div className="font-semibold text-zinc-750 mb-1">{t("vis_methodology")}</div>
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
