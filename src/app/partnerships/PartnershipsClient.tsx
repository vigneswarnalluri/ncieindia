"use client";

import React from "react";
import Link from "next/link";
import { Landmark, Building, Users, ArrowRight, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const COHORT_BENEFITS = [
  {
    type: "Academic Institutions",
    icon: Landmark,
    desc: "Empowering university deans and R&D wings to deploy accredited chapters and unlock grant funnels for student prototypes.",
    points: ["Setup official student maker clubs", "Direct access to prototype seed funds", "Faculty mentoring validation seminars"],
  },
  {
    type: "Corporate Stakeholders",
    icon: Building,
    desc: "Aligning company CSR strategies with high-impact collegiate hardware research and thematic sector hackathons.",
    points: ["CSR fund auditing and tracking", "Thematic prototype challenge briefs", "Early vendor screening access"],
  },
  {
    type: "Investor Networks",
    icon: Users,
    desc: "Connecting angel syndicates, micro-VCs, and seed networks directly with verified, campus-incubated startup leads.",
    points: ["Vetted proof-of-concept pipelines", "Quarterly demo days and showcase rooms", "Co-investment matching programs"],
  },
];

export default function PartnershipsClient() {
  const { t } = useLanguage();

  return (
    <div className="flex-1 bg-[#F9FAFB] pb-16">
      
      {/* Page Header (Gov/Institutional style) */}
      <div className="relative bg-[#0A5D45] py-16 text-white border-b border-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs md:text-sm text-emerald-100 font-semibold mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <Link href="/" className="hover:underline hover:text-white transition-colors">{t("part_home")}</Link>
            <span>/</span>
            <span className="text-white/60">{t("part_slash")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t("part_title")}
          </h1>
          <p className="text-emerald-100/80 text-xs sm:text-sm max-w-3xl mt-3 leading-relaxed">
            {t("part_desc")}
          </p>
        </div>
      </div>

      {/* Structured Collaboration Tracks */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12">
        <div className="bg-white border border-zinc-200 p-6 sm:p-8 space-y-8">
          
          <div className="flex items-center gap-2 pb-4 border-b border-zinc-200 border-l-4 border-primary pl-3">
            <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900">
              {t("part_tracks_title")}
            </h2>
          </div>

          <div className="divide-y divide-zinc-250">
            {COHORT_BENEFITS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className={`py-6 first:pt-0 last:pb-0 flex flex-col md:flex-row gap-6 items-start justify-between`}>
                  {/* Left Column: Track Info */}
                  <div className="space-y-3 max-w-xl">
                    <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                      <Icon className="w-5 h-5 text-primary" />
                      <span>{t(`part_benefit_${idx}_type`) || item.type}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-650 leading-relaxed text-justify pr-4">
                      {t(`part_benefit_${idx}_desc`) || item.desc}
                    </p>
                  </div>
                  
                  {/* Middle Column: Focus Parameters */}
                  <div className="space-y-2.5 w-full md:w-72 shrink-0">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">{t("part_col_param_title")}</span>
                    <div className="space-y-1.5 text-xs text-zinc-700">
                      {item.points.map((pt, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <ShieldCheck className="w-4 h-4 text-accent-dark shrink-0 mt-0.5" />
                          <span>{t(`part_benefit_${idx}_pt_${i}`) || pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Inquire Button */}
                  <div className="w-full md:w-44 shrink-0 pt-2 md:pt-4">
                    <Link href="/contact" className="w-full">
                      <button className="border border-zinc-350 hover:bg-zinc-50 text-zinc-700 font-bold text-xs uppercase tracking-wider px-4 py-2 cursor-pointer w-full text-center">
                        {t("part_btn_inquire")}
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Callout Panel */}
        <div className="mt-8 bg-[#083D2D] p-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5">
          <div className="space-y-2 relative z-10 text-center md:text-left max-w-2xl">
            <h3 className="text-lg font-bold uppercase tracking-tight">{t("part_callout_title")}</h3>
            <p className="text-xs text-emerald-150/80 leading-relaxed">
              {t("part_callout_desc")}
            </p>
          </div>
          <Link href="/contact" className="relative z-10 shrink-0">
            <button className="flex items-center gap-2 bg-[#C9A24B] hover:bg-[#A68034] active:scale-[0.98] text-white font-bold text-xs uppercase tracking-wider px-5 py-3 transition-colors cursor-pointer">
              <span>{t("part_callout_btn")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
