"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Filter } from "lucide-react";
import ApplyNowButton from "@/components/ApplyNowButton";
import { useLanguage } from "@/contexts/LanguageContext";

interface Opportunity {
  id: string;
  title: string;
  type: "internship" | "fellowship" | "grant";
  company: string;
  location: string;
  duration: string;
  compensation: string;
  deadline: string;
  description: string;
}

const OPPORTUNITIES_DATA: Opportunity[] = [
  {
    id: "ncie-fellowship-2026",
    title: "Centenary Research Fellowship",
    type: "fellowship",
    company: "NCIE National Research Council",
    location: "Hybrid / Delhi Desk",
    duration: "12 Months",
    compensation: "₹45,000 / month stipend",
    deadline: "July 15, 2026",
    description: "Supports PG research fellows working on scalable deep-tech applications in quantum computing, agritech sensors, and renewable systems.",
  },
  {
    id: "deeptech-internship-01",
    title: "Ecosystem Management Intern",
    type: "internship",
    company: "NCIE Startup Hubs",
    location: "Remote",
    duration: "3 Months",
    compensation: "₹15,000 / month stipend",
    deadline: "June 30, 2026",
    description: "Gain experience in startup operations, regional chapter coordination, and database indexing for student projects.",
  },
  {
    id: "micro-prototyping-grant",
    title: "Hardware Prototyping Soft Grant",
    type: "grant",
    company: "NCIE Innovation Desk",
    location: "Institutional Lab",
    duration: "One-time grant",
    compensation: "Up to ₹1,50,000",
    deadline: "Rolling applications",
    description: "Micro-funding for raw material purchases, PCB fabrication, and CNC machining trials for early-stage physical proof of concepts.",
  },
  {
    id: "innovational-tech-management-internship",
    title: "Innovational & Technology Management Course",
    type: "internship",
    company: "NCIE Engineering & Technology Board",
    location: "Online / Remote",
    duration: "8 Weeks",
    compensation: "Registration Fee: ₹700",
    deadline: "July 31, 2026",
    description: "Specialized NCIE Viksit Bharat 2047 Innovation Leadership Programs course in the engineering & technology domain. Focused on innovation management, technology lifecycle development, and academic-to-market translation.",
  },
  {
    id: "ai-business-startup-innovation-internship",
    title: "AI Business & Startup Innovation Course",
    type: "internship",
    company: "NCIE AI & DeepTech Division",
    location: "Online / Remote",
    duration: "8 Weeks",
    compensation: "Registration Fee: ₹700",
    deadline: "July 31, 2026",
    description: "Action-oriented NCIE Viksit Bharat 2047 Innovation Leadership Programs course focused on AI-powered business models, generative AI architectures, and deep-tech startup creation.",
  },
  {
    id: "climate-fellowship",
    title: "Sustainable Infrastructure Fellowship",
    type: "fellowship",
    company: "NCIE Climate Coalition",
    location: "On-site / Bangalore Hub",
    duration: "6 Months",
    compensation: "₹30,000 / month stipend",
    deadline: "August 10, 2026",
    description: "For student innovators building solutions for rural water filtration, bio-gas microgrids, and local waste processing systems.",
  },
];

export default function OpportunitiesPage() {
  const { t } = useLanguage();
  const [activeType, setActiveType] = useState<string>("all");

  const getOppTitle = (opp: Opportunity) => {
    const key = `opp_${opp.id.toLowerCase().replace(/-/g, "_")}_title`;
    return t(key) || opp.title;
  };

  const getOppDesc = (opp: Opportunity) => {
    const key = `opp_${opp.id.toLowerCase().replace(/-/g, "_")}_desc`;
    return t(key) || opp.description;
  };

  const getOppLocation = (opp: Opportunity) => {
    const key = `opp_${opp.id.toLowerCase().replace(/-/g, "_")}_location`;
    return t(key) || opp.location;
  };

  const getOppDuration = (opp: Opportunity) => {
    const key = `opp_${opp.id.toLowerCase().replace(/-/g, "_")}_duration`;
    return t(key) || opp.duration;
  };

  const getOppComp = (opp: Opportunity) => {
    const key = `opp_${opp.id.toLowerCase().replace(/-/g, "_")}_comp`;
    return t(key) || opp.compensation;
  };

  const getOppDeadline = (opp: Opportunity) => {
    const key = `opp_${opp.id.toLowerCase().replace(/-/g, "_")}_deadline`;
    return t(key) || opp.deadline;
  };

  const getOppTypeLabel = (type: string) => {
    if (type === "internship") return t("opp_internships");
    if (type === "fellowship") return t("opp_fellowships");
    if (type === "grant") return t("opp_grants");
    return type;
  };

  const filteredOpps =
    activeType === "all"
      ? OPPORTUNITIES_DATA
      : OPPORTUNITIES_DATA.filter((o) => o.type === activeType);

  return (
    <div className="flex-1 bg-[#F9FAFB] pb-16">
      
      {/* Page Header (Gov/Institutional style) */}
      <div className="relative bg-[#0A5D45] py-16 text-white border-b border-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs md:text-sm text-emerald-100 font-semibold mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <Link href="/" className="hover:underline hover:text-white transition-colors">{t("opp_home")}</Link>
            <span>/</span>
            <span className="text-white/60">{t("opp_slash")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t("opp_title")}
          </h1>
          <p className="text-emerald-100/80 text-xs sm:text-sm max-w-3xl mt-3 leading-relaxed">
            {t("opp_desc")}
          </p>
        </div>
      </div>

      {/* Filters Segment (Flat tabs) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-[#074733] border border-[#0d6b4f]/25 rounded-none shadow-md overflow-hidden">
          <div className="flex items-center gap-2 md:gap-4 overflow-x-auto whitespace-nowrap scrollbar-none px-4 py-3">
            {[
              { id: "all", name: t("opp_all_schemes"), icon: Filter },
              { id: "internship", name: t("opp_internships") },
              { id: "fellowship", name: t("opp_fellowships") },
              { id: "grant", name: t("opp_grants") },
            ].map((type) => {
              const isActive = activeType === type.id;
              return (
                <button
                   key={type.id}
                   onClick={() => setActiveType(type.id)}
                   className={`flex items-center gap-1.5 px-4.5 py-2 text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                     isActive 
                       ? "bg-[#0A5D45] text-white font-bold border-b-2 border-accent" 
                       : "text-emerald-100/70 hover:text-white"
                   }`}
                >
                  <span>{type.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Opportunities Table Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white border border-zinc-200 p-6 sm:p-8">
          
          <div className="flex items-center gap-2 pb-4 mb-6 border-b border-zinc-200 border-l-4 border-primary pl-3">
            <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900">
              {t("opp_index_title")}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-zinc-200">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-xs">
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-16 text-center">{t("opp_col_sno")}</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-64">{t("opp_col_opp")}</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-52">{t("opp_col_sponsor")}</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-48">{t("opp_col_params")}</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-44">{t("opp_col_comp")}</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-40">{t("opp_col_deadline")}</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 text-center">{t("opp_col_action")}</th>
                </tr>
              </thead>
              <tbody>
                {filteredOpps.map((opp, idx) => (
                  <tr key={opp.id} className="border-b border-zinc-200 last:border-b-0 hover:bg-zinc-50/50 odd:bg-white even:bg-zinc-50/20 text-xs">
                    <td className="px-4 py-4 text-center font-mono font-bold text-zinc-550 border-r border-zinc-200">0{idx + 1}</td>
                    <td className="px-4 py-4 border-r border-zinc-200">
                      <div className="font-bold text-zinc-900 flex items-center gap-1.5">
                        <span className="text-[9px] bg-zinc-100 border border-zinc-200 text-zinc-600 px-1.5 py-0.5 uppercase tracking-wide">
                          {getOppTypeLabel(opp.type)}
                        </span>
                        <span>{getOppTitle(opp)}</span>
                      </div>
                      <p className="text-[11px] text-zinc-500 mt-2 leading-relaxed text-justify pr-2">{getOppDesc(opp)}</p>
                    </td>
                    <td className="px-4 py-4 border-r border-zinc-200 font-bold text-zinc-800">{opp.company}</td>
                    <td className="px-4 py-4 border-r border-zinc-200 font-medium">
                      <div className="text-zinc-700">{getOppLocation(opp)}</div>
                      <div className="text-[10px] text-zinc-400 font-mono mt-0.5">{getOppDuration(opp)}</div>
                    </td>
                    <td className="px-4 py-4 border-r border-zinc-200 font-mono font-bold text-[#0D6B4F]">{getOppComp(opp)}</td>
                    <td className="px-4 py-4 border-r border-zinc-200 text-zinc-500 font-bold font-mono">{getOppDeadline(opp)}</td>
                    <td className="px-4 py-4 text-center">
                      <Link href="/join">
                        <ApplyNowButton icon={ArrowRight} className="bg-primary hover:bg-primary-dark text-white font-bold text-[10px] uppercase px-4 py-2 cursor-pointer w-full text-center inline-block" />
                      </Link>
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
