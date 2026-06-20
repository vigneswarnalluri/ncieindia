"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Filter, DatabaseBackup, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/contexts/LanguageContext";
import { PROGRAMS_DATA, Program } from "@/data/programsData";

export default function ProgramsPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [programs, setPrograms] = useState<Program[]>(PROGRAMS_DATA);
  const [dbOffline, setDbOffline] = useState<boolean>(false);

  useEffect(() => {
    async function loadPrograms() {
      try {
        const { data, error } = await supabase
          .from("programs")
          .select("*")
          .order("created_at", { ascending: true });
        
        if (error) throw error;
        if (data && data.length > 0) {
          setPrograms(data as Program[]);
        }
      } catch (err) {
        console.warn("Supabase fetch failed. Falling back to code-level PROGRAMS_DATA.", err);
        setDbOffline(true);
      }
    }
    loadPrograms();
  }, []);

  const mapIdToKey = (id: string) => {
    return id.replace(/-/g, "_");
  };

  const getProgramTitle = (program: Program) => {
    const key = `prog_${mapIdToKey(program.id)}_title`;
    return t(key) || program.title;
  };

  const getProgramSubtitle = (program: Program) => {
    const key = `prog_${mapIdToKey(program.id)}_subtitle`;
    return t(key) || program.subtitle;
  };

  const getProgramDesc = (program: Program) => {
    const key = `prog_${mapIdToKey(program.id)}_desc`;
    return t(key) || program.description;
  };

  const getProgramBudget = (program: Program) => {
    const key = `prog_${mapIdToKey(program.id)}_budget`;
    return t(key) || program.budget;
  };

  const getProgramDuration = (program: Program) => {
    const key = `prog_${mapIdToKey(program.id)}_duration`;
    return t(key) || program.duration;
  };

  const getProgramBenefits = (program: Program) => {
    return program.benefits.map((benefit, i) => {
      const key = `prog_${mapIdToKey(program.id)}_benefit_${i}`;
      return t(key) || benefit;
    });
  };

  const getCategoryLabel = (category: string) => {
    const key = `prog_cat_${category}`;
    return t(key) || category;
  };

  const CATEGORIES = [
    { id: "all", name: t("prog_cat_all"), icon: Filter },
    { id: "student", name: t("prog_cat_student") },
    { id: "startup", name: t("prog_cat_startup") },
    { id: "institution", name: t("prog_cat_institution") },
    { id: "corporate", name: t("prog_cat_corporate") },
  ];

  const filteredPrograms =
    activeCategory === "all"
      ? programs
      : programs.filter((p) => p.category === activeCategory);

  return (
    <div className="flex-1 bg-[#F9FAFB] pb-16">
      
      {/* Page Header (Gov/Institutional style) */}
      <div className="relative bg-[#0A5D45] py-16 text-white border-b border-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs md:text-sm text-emerald-100 font-semibold mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <Link href="/" className="hover:underline hover:text-white transition-colors">{t("prog_home")}</Link>
            <span>/</span>
            <span className="text-white/60">{t("prog_slash")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t("prog_title")}
          </h1>
          <p className="text-emerald-100/80 text-xs sm:text-sm max-w-3xl mt-3 leading-relaxed">
            {t("prog_desc")}
          </p>
        </div>
      </div>

      {/* Filters Segment (Flat tabs) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-[#074733] border border-[#0d6b4f]/25 rounded-none shadow-md overflow-hidden">
          <div className="flex items-center gap-2 md:gap-4 overflow-x-auto whitespace-nowrap scrollbar-none px-4 py-3">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-4.5 py-2 text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? "bg-[#0A5D45] text-white font-bold border-b-2 border-accent" 
                      : "text-emerald-100/70 hover:text-white"
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Programs Index Card Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="space-y-6">
          
          {dbOffline && (
            <div className="bg-amber-50 border border-amber-250 p-4 text-xs rounded text-amber-800 flex items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-2">
                <DatabaseBackup className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <span className="font-bold">{t("prog_offline_title")}</span> {t("prog_offline_desc")}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
            <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 border-l-4 border-[#0D6B4F] pl-3">
              {t("prog_directory_title")}
            </h2>
            <span className="text-xs text-zinc-500 font-bold bg-zinc-100 px-3 py-1 rounded-full uppercase tracking-wider">
              {filteredPrograms.length} {filteredPrograms.length === 1 ? "Scheme" : "Schemes"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <div 
                key={program.id} 
                className="bg-white border border-zinc-200 hover:border-primary/20 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Section */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="bg-[#0D6B4F]/10 text-primary border border-primary/10 text-[10px] font-extrabold uppercase px-2.5 py-0.5 tracking-wider font-mono rounded">
                      {getCategoryLabel(program.category)}
                    </span>
                    <span className="text-[10px] text-zinc-450 font-bold font-mono bg-zinc-50 border border-zinc-200/50 px-2 py-0.5 rounded">
                      {getProgramDuration(program)}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-bold text-zinc-900 leading-snug">
                      {getProgramTitle(program)}
                    </h3>
                    <p className="text-[10px] text-primary font-bold tracking-wider font-mono uppercase">
                      {getProgramSubtitle(program)}
                    </p>
                  </div>

                  <p className="text-xs text-zinc-500 leading-relaxed text-justify line-clamp-3">
                    {getProgramDesc(program)}
                  </p>

                  <div className="h-px bg-zinc-150" />

                  {/* Highlights / Budget */}
                  <div className="bg-zinc-50 border border-zinc-150 p-3 rounded-lg flex items-center justify-between gap-2">
                    <span className="text-[9px] font-bold text-zinc-450 uppercase tracking-widest">{t("prog_col_budget")}</span>
                    <span className="text-xs font-extrabold text-primary font-sans">{getProgramBudget(program)}</span>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{t("prog_col_benefits")}</h4>
                    <ul className="space-y-1.5">
                      {getProgramBenefits(program).map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-zinc-650 leading-relaxed">
                          <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="border-t border-zinc-150 p-4 bg-zinc-50/50 grid grid-cols-2 gap-3 shrink-0">
                  <Link href={`/programs/${program.id}`} className="block">
                    <button className="w-full border border-zinc-200 hover:bg-zinc-50 text-zinc-700 font-bold text-[10px] uppercase py-2 transition-colors cursor-pointer text-center">
                      {t("prog_btn_details")}
                    </button>
                  </Link>
                  <Link href="/join" className="block">
                    <button className="w-full bg-[#0D6B4F] hover:bg-[#074733] text-white font-bold text-[10px] uppercase py-2 transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5">
                      <span>{t("prog_btn_apply")}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredPrograms.length === 0 && (
            <div className="text-center py-16 bg-white border border-zinc-200">
              <p className="text-sm text-zinc-400 font-bold uppercase tracking-wider">No schemes available in this category</p>
              <p className="text-xs text-zinc-400 mt-1">Please select another program category tab above.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
