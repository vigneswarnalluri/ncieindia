"use client";

import React from "react";
import Link from "next/link";
import { Landmark, Users, ArrowRight, CheckSquare } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ChaptersClient() {
  const { t } = useLanguage();

  return (
    <div className="flex-1 bg-[#F9FAFB] pb-16">
      
      {/* Page Header (Gov/Institutional style) */}
      <div className="relative bg-[#0A5D45] py-16 text-white border-b border-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs md:text-sm text-emerald-100 font-semibold mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <Link href="/" className="hover:underline hover:text-white transition-colors">{t("chapters_home")}</Link>
            <span>/</span>
            <span className="text-white/60">{t("chapters_slash_chapters")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t("chapters_title")}
          </h1>
          <p className="text-emerald-100/80 text-xs sm:text-sm max-w-3xl mt-3 leading-relaxed">
            {t("chapters_desc")}
          </p>
        </div>
      </div>

      {/* Structured Comparison Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12">
        <div className="bg-white border border-zinc-200 p-6 sm:p-8 space-y-8">
          
          <div className="flex items-center gap-2 pb-4 border-b border-zinc-200 border-l-4 border-primary pl-3">
            <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900">
              {t("chapters_framework_title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 divide-y md:divide-y-0 md:divide-x divide-zinc-200">
            
            {/* State Chapters */}
            <div className="space-y-6 pr-0 md:pr-6">
              <div className="flex items-center gap-3 border-b border-zinc-150 pb-3">
                <Landmark className="w-6 h-6 text-accent-dark" />
                <h3 className="text-lg font-bold text-zinc-900 uppercase tracking-wide">{t("chapters_state_title")}</h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-650 leading-relaxed text-justify">
                {t("chapters_state_desc")}
              </p>
              
              <div className="space-y-3 pt-2">
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">{t("chapters_state_mandates_title")}</span>
                {[0, 1, 2].map((idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-700">
                    <CheckSquare className="w-4 h-4 text-accent-dark mt-0.5 shrink-0" />
                    <span className="leading-normal">{t(`chapters_state_mandate_${idx}`)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link href="/join">
                  <button className="border border-zinc-350 hover:bg-zinc-50 text-zinc-700 font-bold text-xs uppercase tracking-wider px-5 py-2.5 cursor-pointer w-full text-center">
                    {t("chapters_state_btn")}
                  </button>
                </Link>
              </div>
            </div>

            {/* College Chapters */}
            <div className="space-y-6 pt-8 md:pt-0 pl-0 md:pl-8">
              <div className="flex items-center gap-3 border-b border-zinc-150 pb-3">
                <Users className="w-6 h-6 text-[#0D6B4F]" />
                <h3 className="text-lg font-bold text-zinc-900 uppercase tracking-wide">{t("chapters_college_title")}</h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-650 leading-relaxed text-justify">
                {t("chapters_college_desc")}
              </p>
              
              <div className="space-y-3 pt-2">
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">{t("chapters_college_deliverables_title")}</span>
                {[0, 1, 2].map((idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-700">
                    <CheckSquare className="w-4 h-4 text-[#0D6B4F] mt-0.5 shrink-0" />
                    <span className="leading-normal">{t(`chapters_college_deliverable_${idx}`)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link href="/join">
                  <button className="bg-[#0D6B4F] hover:bg-[#074733] text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 cursor-pointer w-full text-center inline-flex items-center justify-center gap-1">
                    <span>{t("chapters_college_btn")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* Chapters FAQs Section */}
        <div className="bg-white border border-zinc-200 p-6 sm:p-8 mt-8 space-y-6">
          <h2 className="text-base font-bold text-zinc-900 uppercase tracking-wider text-center border-b border-zinc-100 pb-3">
            {t("chapters_faq_title")}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-zinc-600">
            <div className="space-y-2">
              <h3 className="font-bold text-zinc-900 uppercase tracking-wide border-l-2 border-accent-dark pl-2">
                {t("chapters_faq_q1")}
              </h3>
              <p className="leading-relaxed text-justify pl-2">
                {t("chapters_faq_a1")}
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-bold text-zinc-900 uppercase tracking-wide border-l-2 border-accent-dark pl-2">
                {t("chapters_faq_q2")}
              </h3>
              <p className="leading-relaxed text-justify pl-2">
                {t("chapters_faq_a2")}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
