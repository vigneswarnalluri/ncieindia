"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Filter, DatabaseBackup } from "lucide-react";
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
    if (id === "smart-india-hackathon") return "sih";
    if (id === "iic-network") return "iic";
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

      {/* Programs Index Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white border border-zinc-200 p-6 sm:p-8">
          
          {dbOffline && (
            <div className="mb-6 bg-amber-50 border border-amber-250 p-4 text-xs rounded text-amber-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <DatabaseBackup className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <span className="font-bold">{t("prog_offline_title")}</span> {t("prog_offline_desc")}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 pb-4 mb-6 border-b border-zinc-200 border-l-4 border-primary pl-3">
            <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900">
              {t("prog_directory_title")}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-zinc-200">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-xs">
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-16 text-center">{t("prog_col_sno")}</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-64">{t("prog_col_title")}</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-36">{t("prog_col_cat")}</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-48">{t("prog_col_budget")}</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-36">{t("prog_col_duration")}</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200">{t("prog_col_benefits")}</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 text-center">{t("prog_col_action")}</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrograms.map((program, idx) => (
                  <tr key={program.id} className="border-b border-zinc-200 last:border-b-0 hover:bg-zinc-50/50 odd:bg-white even:bg-zinc-50/20 text-xs">
                    <td className="px-4 py-4 text-center font-mono font-bold text-zinc-500 border-r border-zinc-200">0{idx + 1}</td>
                    <td className="px-4 py-4 border-r border-zinc-200">
                      <div className="font-bold text-zinc-900 leading-snug">{getProgramTitle(program)}</div>
                      <div className="text-[10px] text-zinc-400 mt-1 uppercase font-semibold tracking-wider font-mono">{getProgramSubtitle(program)}</div>
                      <p className="text-[11px] text-zinc-500 mt-2 leading-relaxed text-justify pr-2">{getProgramDesc(program)}</p>
                    </td>
                    <td className="px-4 py-4 border-r border-zinc-200 font-mono font-bold uppercase text-zinc-500">
                      <span className="bg-zinc-50 border border-zinc-200 px-2 py-0.5 rounded">
                        {getCategoryLabel(program.category)}
                      </span>
                    </td>
                    <td className="px-4 py-4 border-r border-zinc-200 font-bold text-primary font-sans leading-snug">{getProgramBudget(program)}</td>
                    <td className="px-4 py-4 border-r border-zinc-200 font-mono font-medium text-zinc-500">{getProgramDuration(program)}</td>
                    <td className="px-4 py-4 border-r border-zinc-200 text-zinc-650 leading-relaxed">
                      <ul className="list-disc list-inside space-y-1">
                        {getProgramBenefits(program).map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-4 text-center space-y-2">
                      <Link href={`/programs/${program.id}`} className="block">
                        <button className="w-full border border-zinc-200 hover:bg-zinc-50 text-zinc-700 font-bold text-[10px] uppercase px-3 py-1.5 cursor-pointer text-center">
                          {t("prog_btn_details")}
                        </button>
                      </Link>
                      <Link href="/join" className="block">
                        <button className="w-full bg-[#0D6B4F] hover:bg-[#074733] text-white font-bold text-[10px] uppercase px-3 py-1.5 cursor-pointer text-center inline-flex items-center justify-center gap-1">
                          <span>{t("prog_btn_apply")}</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </button>
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
