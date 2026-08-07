"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, CheckCircle, Calendar, ShieldCheck, Mail, Users, ArrowRight, Coins, Download, Scroll, FileText, Award } from "lucide-react";
import { supabase, getStorageUrl } from "@/lib/supabase";
import { PROGRAMS_DATA, Program } from "@/data/programsData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const INTERNSHIP_SECTORS_EN = [
  "Engineering & Technology",
  "Science & Research",
  "Commerce & Finance",
  "Arts & Humanities",
  "Agriculture & Rural Development",
  "Healthcare & Life Sciences",
  "Information Technology & AI",
  "Social Innovation & Governance",
  "Environment & Sustainability",
  "Entrepreneurship & Startup Development"
];

const INTERNSHIP_SECTORS_HI = [
  "इंजीनियरिंग और प्रौद्योगिकी",
  "विज्ञान और अनुसंधान",
  "वाणिज्य और वित्त",
  "कला और मानविकी",
  "कृषि और ग्रामीण विकास",
  "स्वास्थ्य सेवा और जीवन विज्ञान",
  "सूचना प्रौद्योगिकी और एआई",
  "सामाजिक नवाचार और शासन",
  "पर्यावरण और स्थिरता",
  "उद्यमिता और स्टार्टअप विकास"
];

const SEED_FUNDING_STAGES_EN = [
  { title: "Stage 1: Concept Validation (10% Release)", desc: "Release of 10% fund upon successful screening and approval of prototype plans." },
  { title: "Stage 2: MVP Development (25% Release)", desc: "Release of 25% fund for building the Minimum Viable Product and early testing." },
  { title: "Stage 3: Pilot Run & Testing (25% Release)", desc: "Release of 25% fund for launching pilot trials and gathering feedback." },
  { title: "Stage 4: Legal & IP Setup (20% Release)", desc: "Release of 20% fund to support legal incorporation and patent/IP filing." },
  { title: "Stage 5: Scale & Market Launch (20% Release)", desc: "Release of final 20% fund upon meeting the pre-commercial scaling milestones." }
];

const SEED_FUNDING_STAGES_HI = [
  { title: "चरण 1: संकल्प सत्यापन (10% संवितरण)", desc: "प्रोटोटाइप योजनाओं की सफल स्क्रीनिंग और अनुमोदन पर 10% निधि जारी करना।" },
  { title: "चरण 2: एमवीपी विकास (25% संवितरण)", desc: "न्यूनतम व्यवहार्य उत्पाद (MVP) के निर्माण और प्रारंभिक परीक्षण के लिए 25% निधि जारी करना।" },
  { title: "चरण 3: पायलट रन और परीक्षण (25% संवितरण)", desc: "पायलट परीक्षण शुरू करने और प्रतिक्रिया एकत्र करने के लिए 25% निधि जारी करना।" },
  { title: "चरण 4: कानूनी और आईपी सेटअप (20% संवितरण)", desc: "कानूनी निगमन और पेटेंट/आईपी फाइलिंग का समर्थन करने के लिए 20% निधि जारी करना।" },
  { title: "चरण 5: स्केल और बाजार लॉन्च (20% संवितरण)", desc: "पूर्व-व्यावसायिक स्केलिंग मील के पत्थर को पूरा करने पर अंतिम 20% निधि जारी करना।" }
];

export default function ProgramDetailPage() {
  const { t, language } = useLanguage();
  const params = useParams();
  const id = params.id as string;
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProgram() {
      try {
        const { data, error } = await supabase
          .from("programs")
          .select("*")
          .eq("id", id)
          .single();
        
        const fallback = PROGRAMS_DATA.find((p) => p.id === id);
        if (data) {
          setProgram({
            ...fallback,
            ...data,
            pdfUrl: data.pdfUrl || data.pdf_url || fallback?.pdfUrl || "/NCIE_Student_Startup_Grants_Guidelines.pdf",
            pdfName: data.pdfName || data.pdf_name || fallback?.pdfName,
          } as Program);
        } else {
          setProgram(fallback || null);
        }
      } catch (err) {
        console.warn("Supabase single program fetch failed, using fallback:", err);
        const fallback = PROGRAMS_DATA.find((p) => p.id === id);
        setProgram(fallback || null);
      } finally {
        setLoading(false);
      }
    }
    loadProgram();
  }, [id]);

  const mapIdToKey = (id: string) => {
    return id.replace(/-/g, "_");
  };

  const getProgramTitle = (p: Program) => {
    const key = `prog_${mapIdToKey(p.id)}_title`;
    const val = t(key);
    return val !== key ? val : p.title;
  };

  const getProgramSubtitle = (p: Program) => {
    const key = `prog_${mapIdToKey(p.id)}_subtitle`;
    const val = t(key);
    return val !== key ? val : p.subtitle;
  };

  const getProgramDesc = (p: Program) => {
    const key = `prog_${mapIdToKey(p.id)}_desc`;
    const val = t(key);
    return val !== key ? val : p.description;
  };

  const getProgramBudget = (p: Program) => {
    const key = `prog_${mapIdToKey(p.id)}_budget`;
    const val = t(key);
    return val !== key ? val : p.budget;
  };

  const getProgramDuration = (p: Program) => {
    const key = `prog_${mapIdToKey(p.id)}_duration`;
    const val = t(key);
    return val !== key ? val : p.duration;
  };

  const getProgramBenefits = (p: Program) => {
    return p.benefits.map((benefit, i) => {
      const key = `prog_${mapIdToKey(p.id)}_benefit_${i}`;
      const val = t(key);
      return val !== key ? val : benefit;
    });
  };

  interface TrancheItem {
    name: string;
    stage: string;
    trigger: string;
    amount: string;
    note?: string;
  }

  const getTrancheName = (p: Program, tranche: TrancheItem, idx: number) => {
    const key = `prog_${mapIdToKey(p.id)}_tranche_${idx}_name`;
    const val = t(key);
    return val !== key ? val : tranche.name;
  };

  const getTrancheStage = (p: Program, tranche: TrancheItem, idx: number) => {
    const key = `prog_${mapIdToKey(p.id)}_tranche_${idx}_stage`;
    const val = t(key);
    return val !== key ? val : tranche.stage;
  };

  const getTrancheTrigger = (p: Program, tranche: TrancheItem, idx: number) => {
    const key = `prog_${mapIdToKey(p.id)}_tranche_${idx}_trigger`;
    const val = t(key);
    return val !== key ? val : tranche.trigger;
  };

  const getTrancheAmount = (p: Program, tranche: TrancheItem, idx: number) => {
    const key = `prog_${mapIdToKey(p.id)}_tranche_${idx}_amount`;
    const val = t(key);
    return val !== key ? val : tranche.amount;
  };

  const getTrancheNote = (p: Program, tranche: TrancheItem, idx: number) => {
    const key = `prog_${mapIdToKey(p.id)}_tranche_${idx}_note`;
    const val = t(key);
    return val !== key ? val : (tranche.note || "");
  };

  const getCategoryLabel = (category: string) => {
    const key = `prog_cat_${category}`;
    return t(key) || category;
  };

  if (loading) {
    return (
      <div className="flex-1 bg-zinc-50 min-h-screen flex items-center justify-center">
        <div className="text-zinc-500 font-bold text-sm animate-pulse">
          {t("prog_details_loading")}
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="flex-1 bg-zinc-50 min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-zinc-800 mb-2">{t("prog_details_not_found")}</h2>
        <p className="text-sm text-zinc-500 mb-6">{t("prog_details_not_found_desc")}</p>
        <Link href="/programs">
          <Button variant="primary">{t("prog_details_back")}</Button>
        </Link>
      </div>
    );
  }

  const programIndex = PROGRAMS_DATA.findIndex((p) => p.id === program.id) + 1;

  return (
    <div className="flex-1 bg-zinc-50 min-h-screen py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <div className="mb-6">
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t("prog_details_back")}</span>
          </Link>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Info - Styled like an Official Circular Paper Document */}
          <div className="lg:col-span-2 bg-white border border-zinc-350 shadow-xl rounded-sm p-6 sm:p-12 relative overflow-hidden">
            {/* Top Tri-color Accent Bar to resemble official National Portal styling */}
            <div className="absolute top-0 left-0 right-0 h-1.5 flex">
              <div className="flex-1 bg-[#FF9933]" />
              <div className="flex-1 bg-white" />
              <div className="flex-1 bg-[#138808]" />
            </div>

            {/* Official Gazette Header */}
            <div className="border-b-2 border-zinc-900 pb-6 mb-8 text-center relative mt-4">
              <div className="flex justify-center mb-4">
                <img src="/gov-emblem.png" alt="Gov Emblem" className="h-16 opacity-90 object-contain" />
              </div>
              <h2 className="text-sm sm:text-base font-extrabold tracking-wider text-zinc-800 uppercase font-sans">
                {language === "hi" 
                  ? "राष्ट्रीय नवाचार और उद्यमिता परिषद" 
                  : "National Council for Innovation and Entrepreneurship"}
              </h2>
              <div className="text-[11px] font-bold text-primary tracking-wide uppercase font-mono mt-0.5">
                {language === "hi" 
                  ? "सचिवालय समन्वय डेस्क, भारत" 
                  : "Secretariat Coordination Desk, India"}
              </div>
              
              <h1 className="text-xl sm:text-2xl font-black text-zinc-900 mt-5 uppercase tracking-tight font-sans leading-tight">
                {getProgramTitle(program)}
              </h1>
              
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-6 pt-3 border-t border-dashed border-zinc-300 text-[11px] text-zinc-500 font-mono w-full">
                <div>
                  <span className="font-semibold text-zinc-700">
                    {t("prog_details_ref_no")}{programIndex}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-zinc-700">
                    {language === "hi" ? "दिनांक: 22 जून 2026" : "Date: 22 June 2026"}
                  </span>
                </div>
              </div>
            </div>

            {/* Scheme Reference Parameters Sheet */}
            <div className="mb-8">
              <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2 font-mono">
                {language === "hi" ? "योजना संदर्भ पत्रक" : "SCHEME REFERENCE PARAMETERS SHEET"}
              </h3>
              <div className="overflow-x-auto border border-zinc-300 rounded-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <tbody>
                    <tr className="border-b border-zinc-200">
                      <td className="w-1/3 p-3 bg-zinc-50 font-bold text-zinc-700 border-r border-zinc-200">
                        {t("prog_details_authority")}
                      </td>
                      <td className="p-3 text-zinc-900 font-semibold">
                        {t("prog_details_authority_val")}
                      </td>
                    </tr>
                    <tr className="border-b border-zinc-200">
                      <td className="p-3 bg-zinc-50 font-bold text-zinc-700 border-r border-zinc-200">
                        {t("prog_details_mandate")}
                      </td>
                      <td className="p-3 text-zinc-900 font-semibold capitalize">
                        {getCategoryLabel(program.category)}
                      </td>
                    </tr>
                    <tr className="border-b border-zinc-200">
                      <td className="p-3 bg-zinc-50 font-bold text-zinc-700 border-r border-zinc-200">
                        {t("prog_details_allocation")}
                      </td>
                      <td className="p-3 text-zinc-900 font-extrabold font-mono text-[#0D6B4F]">
                        {getProgramBudget(program)}
                      </td>
                    </tr>
                    <tr className="border-b border-zinc-200">
                      <td className="p-3 bg-zinc-50 font-bold text-zinc-700 border-r border-zinc-200">
                        {t("prog_details_duration")}
                      </td>
                      <td className="p-3 text-zinc-900 font-semibold">
                        {getProgramDuration(program)}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 bg-zinc-50 font-bold text-zinc-700 border-r border-zinc-200">
                        {t("prog_details_liaison")}
                      </td>
                      <td className="p-3 text-zinc-900 font-mono font-semibold">
                        {t("prog_details_liaison_val")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 1. Overview Section */}
            <div className="space-y-4 mb-8">
              <h3 className="text-sm font-bold text-zinc-900 border-b border-zinc-200 pb-1.5 uppercase tracking-wide">
                1. {t("prog_details_overview")}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {getProgramDesc(program)} {t("prog_details_overview_body_1")}
              </p>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {t("prog_details_overview_body_2")}
              </p>
            </div>

            {/* Core Sectors (If Student Internships) */}
            {program.id === "student-internships" && (
              <div className="space-y-3 bg-zinc-50/50 border border-zinc-200 rounded-sm p-5 mb-8">
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider font-mono">
                  {language === "hi" ? "10 कोर नेतृत्व कार्यक्रम क्षेत्र" : "10 Core Leadership Program Sectors"}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(language === "hi" ? INTERNSHIP_SECTORS_HI : INTERNSHIP_SECTORS_EN).map((sector, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center gap-2.5 p-2 bg-white border border-zinc-200 rounded-sm"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#0D6B4F]/10 text-primary flex items-center justify-center font-mono text-[9px] font-bold shrink-0">
                        {idx + 1}
                      </div>
                      <span className="text-[11px] font-semibold text-zinc-700">{sector}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Core Benefits */}
            <div className="space-y-4 mb-8">
              <h3 className="text-sm font-bold text-zinc-900 border-b border-zinc-200 pb-1.5 uppercase tracking-wide">
                2. {t("prog_details_benefits")}
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {getProgramBenefits(program).map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-600 bg-zinc-50/40 p-3 border border-zinc-200 rounded-sm">
                    <CheckCircle className="w-4 h-4 text-[#0D6B4F] mt-0.5 shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Milestone Disbursement Registry Table */}
            {program.tranches && (
              <div className="space-y-4 mb-8">
                <h3 className="text-sm font-bold text-zinc-900 border-b border-zinc-200 pb-1.5 uppercase tracking-wide">
                  3. {t("prog_details_milestones_title")}
                </h3>
                <div className="overflow-x-auto border border-zinc-300 rounded-sm">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-zinc-50 border-b border-zinc-300 text-zinc-700 font-bold uppercase tracking-wider font-mono text-[10px]">
                        <th className="p-3 border-r border-zinc-200">{t("prog_details_col_tranche")}</th>
                        <th className="p-3 border-r border-zinc-200 whitespace-nowrap">{t("prog_details_col_stage")}</th>
                        <th className="p-3 border-r border-zinc-200">{t("prog_details_col_trigger")}</th>
                        <th className="p-3">{t("prog_details_col_amount")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {program.tranches.map((tranche, idx) => {
                        const trancheName = getTrancheName(program, tranche, idx);
                        const trancheStage = getTrancheStage(program, tranche, idx);
                        const trancheTrigger = getTrancheTrigger(program, tranche, idx);
                        const trancheAmount = getTrancheAmount(program, tranche, idx);
                        const trancheNote = getTrancheNote(program, tranche, idx);
                        return (
                          <tr key={idx} className="border-b border-zinc-200 hover:bg-zinc-50/50 transition-colors">
                            <td className="p-3 font-mono font-bold text-zinc-600 border-r border-zinc-200 shrink-0 whitespace-nowrap">
                              {trancheName}
                            </td>
                            <td className="p-3 font-semibold text-zinc-800 border-r border-zinc-200 whitespace-nowrap">
                              {trancheStage}
                            </td>
                            <td className="p-3 text-zinc-500 border-r border-zinc-200 leading-relaxed font-medium">
                              {trancheTrigger}
                            </td>
                            <td className="p-3 font-mono font-bold text-[#0D6B4F] shrink-0 whitespace-nowrap">
                              <div>{trancheAmount.split(" × ")[0]}</div>
                              {trancheAmount.includes(" × ") && (
                                <div className="text-[9px] text-zinc-400 font-sans tracking-wide uppercase mt-0.5">
                                  × {trancheAmount.split(" × ")[1]}
                                </div>
                              )}
                              {trancheNote && (
                                <div className="text-[9px] text-zinc-400 font-sans font-normal italic mt-0.5">
                                  {trancheNote}
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Course Objectives and Outcomes Grid */}
            {(program.courseObjectives || program.courseOutcomes) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {program.courseObjectives && (
                  <div className="space-y-3 bg-zinc-50/50 border border-zinc-200 p-5 rounded-sm">
                    <h4 className="text-xs font-bold text-zinc-550 uppercase tracking-wider font-mono border-b border-zinc-200 pb-2 flex items-center gap-1.5">
                      <Scroll className="w-3.5 h-3.5 text-primary" />
                      {t("prog_details_course_objectives")}
                    </h4>
                    <ul className="space-y-2">
                      {program.courseObjectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] sm:text-xs text-zinc-650 leading-relaxed">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {program.courseOutcomes && (
                  <div className="space-y-3 bg-zinc-50/50 border border-zinc-200 p-5 rounded-sm">
                    <h4 className="text-xs font-bold text-zinc-550 uppercase tracking-wider font-mono border-b border-zinc-200 pb-2 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-accent" />
                      {t("prog_details_course_outcomes")}
                    </h4>
                    <ul className="space-y-2">
                      {program.courseOutcomes.map((out, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] sm:text-xs text-zinc-650 leading-relaxed">
                          <CheckCircle className="w-3.5 h-3.5 text-[#FF9933] shrink-0 mt-0.5" />
                          <span>{out}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Course Syllabus & Modules */}
            {program.syllabusModules && (
              <div className="space-y-4 mb-8">
                <h3 className="text-sm font-bold text-zinc-900 border-b border-zinc-200 pb-1.5 uppercase tracking-wide">
                  3. {t("prog_details_syllabus_modules")}
                </h3>
                <div className="space-y-4">
                  {program.syllabusModules.map((mod, idx) => (
                    <div key={idx} className="bg-zinc-50/60 border border-zinc-250 p-4 rounded-sm hover:bg-zinc-50 transition-colors">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2.5 pb-2 border-b border-zinc-200">
                        <h4 className="text-xs sm:text-sm font-bold text-zinc-800 uppercase tracking-wide">
                          {mod.title}
                        </h4>
                        {mod.duration && (
                          <span className="text-[10px] font-bold font-mono text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded">
                            {mod.duration}
                          </span>
                        )}
                      </div>
                      <ul className="list-disc pl-4 space-y-1.5 text-[11px] sm:text-xs text-zinc-600 leading-relaxed">
                        {mod.topics.map((topic, i) => (
                          <li key={i}>{topic}</li>
                        ))}
                      </ul>
                      {mod.activity && (
                        <div className="text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 p-2.5 flex items-start gap-2 mt-3 font-medium">
                          <span className="font-extrabold uppercase tracking-wider text-[9px] bg-emerald-850 text-white px-1.5 py-0.5 mt-0.5 shrink-0 rounded-sm">Activity</span>
                          <span className="leading-relaxed">{mod.activity}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Audit Stages Timeline (Default when no syllabus modules exist) */}
            {!program.syllabusModules && (
              <div className="space-y-4 mb-8">
                <h3 className="text-sm font-bold text-zinc-900 border-b border-zinc-200 pb-1.5 uppercase tracking-wide">
                  {program.tranches ? "4." : "3."} {program.id === "startup-seed-funding"
                    ? (language === "hi" ? "5-चरण निधि जारी करने का मॉडल" : "5-Stage Funding Release Model")
                    : t("prog_details_evaluation")}
                </h3>
                
                <div className="relative pl-6 border-l border-zinc-300 ml-3 space-y-6">
                  {(program.id === "startup-seed-funding"
                    ? (language === "hi" ? SEED_FUNDING_STAGES_HI : SEED_FUNDING_STAGES_EN)
                    : (program.stages || [
                        { title: t("prog_details_stage_1_title"), desc: t("prog_details_stage_1_desc") },
                        { title: t("prog_details_stage_2_title"), desc: t("prog_details_stage_2_desc") },
                        { title: t("prog_details_stage_3_title"), desc: t("prog_details_stage_3_desc") },
                      ])
                  ).map((step, idx) => (
                    <div key={idx} className="relative">
                      {/* Circle marker with audit-like numbers */}
                      <div className="absolute -left-[35px] top-0.5 w-4.5 h-4.5 rounded-full bg-white border border-zinc-400 text-zinc-550 flex items-center justify-center font-mono text-[9px] font-bold shadow-sm">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-zinc-800 leading-snug">{step.title}</h4>
                      <p className="text-[11px] sm:text-xs text-zinc-500 mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Course Assessment Pattern (custom) */}
            {program.assessmentPattern && (
              <div className="space-y-4 mb-8">
                <h3 className="text-sm font-bold text-zinc-900 border-b border-zinc-200 pb-1.5 uppercase tracking-wide">
                  {program.syllabusModules ? "4." : "3."} {t("prog_details_assessment_pattern")}
                </h3>
                <div className="border border-zinc-300 rounded-sm overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-zinc-50 border-b border-zinc-300 text-zinc-700 font-bold font-mono text-[10px] uppercase tracking-wider">
                        <th className="p-3 border-r border-zinc-200">Assessment Component</th>
                        <th className="p-3 w-36 text-center">Marks Allocated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {program.assessmentPattern.map((item, idx) => (
                        <tr key={idx} className="border-b border-zinc-200 last:border-b-0 hover:bg-zinc-50/50">
                          <td className="p-3 border-r border-zinc-200 font-semibold text-zinc-850">{item.component}</td>
                          <td className="p-3 text-center font-mono font-bold text-primary">{item.marks} / 100</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Books, Software & Pedagogy Block */}
            {(program.textBooks || program.referenceBooks || program.recommendedSoftware || program.pedagogy) && (
              <div className="space-y-6 border-t border-zinc-200 pt-6 mb-8">
                <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wide">
                  {program.syllabusModules ? "5." : "4."} Reference Books, Software & Pedagogy
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {program.pedagogy && (
                    <div className="space-y-2.5 md:col-span-2">
                      <h4 className="text-xs font-bold text-zinc-550 uppercase tracking-wider font-mono flex items-center gap-1.5 border-b border-zinc-150 pb-1">
                        <Scroll className="w-3.5 h-3.5 text-primary" />
                        {t("prog_details_pedagogy")}
                      </h4>
                      <ul className="space-y-1.5 list-disc pl-4 text-[11px] sm:text-xs text-zinc-600 leading-relaxed font-semibold">
                        {program.pedagogy.map((ped, idx) => (
                          <li key={idx}>{ped}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {program.recommendedSoftware && (
                    <div className="space-y-2.5 md:col-span-2 border-t border-zinc-150 pt-4">
                      <h4 className="text-xs font-bold text-zinc-550 uppercase tracking-wider font-mono flex items-center gap-1.5 border-b border-zinc-150 pb-2">
                        <Coins className="w-3.5 h-3.5 text-[#0D6B4F]" />
                        {t("prog_details_recommended_software")}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {program.recommendedSoftware.map((soft, idx) => (
                          <span key={idx} className="bg-zinc-100 text-zinc-800 border border-zinc-200 text-[10px] font-extrabold uppercase px-3 py-1 tracking-wide font-mono rounded">
                            {soft}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {program.textBooks && (
                    <div className="space-y-2.5 md:col-span-2 border-t border-zinc-150 pt-4">
                      <h4 className="text-xs font-bold text-zinc-550 uppercase tracking-wider font-mono flex items-center gap-1.5 border-b border-zinc-150 pb-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#FF9933]" />
                        {t("prog_details_text_books")}
                      </h4>
                      <ol className="list-decimal pl-4 space-y-2 text-[11px] sm:text-xs text-zinc-650 leading-relaxed font-semibold">
                        {program.textBooks.map((book, idx) => (
                          <li key={idx}>{book}</li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {program.referenceBooks && (
                    <div className="space-y-2.5 md:col-span-2 border-t border-zinc-150 pt-4">
                      <h4 className="text-xs font-bold text-zinc-550 uppercase tracking-wider font-mono flex items-center gap-1.5 border-b border-zinc-150 pb-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#138808]" />
                        {t("prog_details_reference_books")}
                      </h4>
                      <ol className="list-decimal pl-4 space-y-2 text-[11px] sm:text-xs text-zinc-650 leading-relaxed font-medium">
                        {program.referenceBooks.map((book, idx) => (
                          <li key={idx}>{book}</li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {program.webResources && (
                    <div className="space-y-2.5 md:col-span-2 border-t border-zinc-150 pt-4">
                      <h4 className="text-xs font-bold text-zinc-550 uppercase tracking-wider font-mono flex items-center gap-1.5 border-b border-zinc-150 pb-1.5">
                        <FileText className="w-3.5 h-3.5 text-zinc-550" />
                        {t("prog_details_web_resources")}
                      </h4>
                      <ul className="space-y-2 text-[11px] sm:text-xs text-zinc-600">
                        {program.webResources.map((res, idx) => {
                          const parts = res.split(" – ");
                          return (
                            <li key={idx} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 leading-relaxed">
                              <span className="font-bold text-zinc-800 shrink-0">{parts[0]}</span>
                              <span className="hidden sm:inline text-zinc-300">|</span>
                              <a href={parts[1]} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-mono text-[10px] sm:text-[11px] truncate">
                                {parts[1]}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* FAQs Section */}
            <div className="space-y-4 mb-8 pt-6 border-t border-zinc-200">
              <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wide">
                {program.syllabusModules ? "6." : program.tranches ? "5." : "4."} {t("prog_details_faq")}
              </h3>
              <div className="space-y-4">
                {[
                  { q: t("prog_details_faq_q1"), a: t("prog_details_faq_a1") },
                  { q: t("prog_details_faq_q2"), a: t("prog_details_faq_a2") },
                ].map((faq, idx) => (
                  <div key={idx} className="border-b border-zinc-100 pb-3 last:border-0 last:pb-0">
                    <h4 className="text-xs sm:text-sm font-bold text-zinc-800 mb-1">Q: {faq.q}</h4>
                    <p className="text-[11px] sm:text-xs text-zinc-550 leading-relaxed">A: {faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Administrative Secretariat Seal Block */}
            <div className="border-t border-zinc-300 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center sm:items-start gap-8">
              
              {/* Signature Line */}
              <div className="text-center sm:text-left space-y-1.5 mt-2">
                <div className="h-10 flex items-end justify-center sm:justify-start">
                  <div className="w-48 border-b border-dashed border-zinc-400 text-[10px] text-zinc-400 font-mono italic text-center pb-0.5">
                    {language === "hi" ? "प्राधिकृत हस्ताक्षर" : "Authorized Signature"}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-wide">
                    {t("prog_details_secretariat_seal")}
                  </h4>
                  <p className="text-[10px] font-semibold text-zinc-500 tracking-wider font-mono">
                    {language === "hi" ? "सचिवालय समन्वय डेस्क" : "Secretariat Coordination Desk"}
                  </p>
                  <p className="text-[9px] text-zinc-400">
                    {language === "hi" ? "राष्ट्रीय परिषद (NCIE) मुख्यालय, गुंटूर" : "NCIE Head Office, Guntur"}
                  </p>
                </div>
              </div>

              {/* Ink Stamp Seal */}
              <div className="relative">
                <div className="w-40 h-40 rounded-full border-4 border-dashed border-emerald-700/80 p-1 flex flex-col items-center justify-center text-center text-emerald-800/90 font-bold uppercase rotate-[-3deg] select-none shadow-[0_0_15px_rgba(4,120,87,0.05)] bg-[#10b981]/5 shrink-0">
                  <div className="w-full h-full rounded-full border border-emerald-700/80 p-2 flex flex-col items-center justify-center">
                    <span className="text-[6.5px] tracking-wider font-mono block mb-0.5">
                      {language === "hi" ? "★ राष्ट्रीय परिषद ★" : "★ NATIONAL COUNCIL ★"}
                    </span>
                    <span className="text-[8.5px] font-black leading-tight block">
                      NCIE INDIA
                    </span>
                    <span className="text-[6.5px] tracking-tighter text-emerald-700 leading-none block my-1 font-mono">
                      {t("prog_details_verification_stamp")}
                    </span>
                    <span className="text-[5.5px] text-emerald-600/80 tracking-normal leading-tight block font-mono border-t border-emerald-600/40 pt-1 mt-0.5">
                      {t("prog_details_stamp_ref")}
                    </span>
                    <span className="text-[7.5px] tracking-wide font-extrabold text-emerald-800/90 font-mono block mt-1.5 border border-emerald-700 px-1 py-0.5 rounded-sm">
                      {language === "hi" ? "अनुमोदित" : "APPROVED"}
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-white/5 to-white/10 pointer-events-none rounded-full" />
              </div>

            </div>

          </div>

          {/* Sidebar Actions Card */}
          <div className="space-y-6 lg:sticky lg:top-28">
            <Card className="border border-zinc-300 shadow-lg rounded-sm bg-white overflow-hidden">
              <div className="h-1 bg-primary" />
              <CardContent className="p-6 space-y-6">
                <div className="space-y-1 pb-4 border-b border-zinc-150">
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block font-mono">
                    {t("prog_details_app_desk")}
                  </span>
                  <span className="text-sm font-extrabold text-primary flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#0D6B4F] animate-pulse" />
                    {t("prog_details_active")}
                  </span>
                </div>
                
                <div className="space-y-3 text-xs text-zinc-600 font-medium">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span>{t("prog_details_closes")}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span>{t("prog_details_mentors")}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span>{t("prog_details_ip")}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <Link href={`/join?role=internship&course=${program.courseCode || program.id}`} className="block">
                    <Button variant="primary" className="w-full justify-center text-xs font-bold py-2.5 gap-1.5 shadow-sm rounded-sm">
                      {t("prog_details_start_app")}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>

                  <a href={getStorageUrl(program.pdfUrl)} target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" className="w-full justify-center text-xs font-bold py-2.5 gap-2 border-zinc-300 hover:bg-zinc-50 hover:text-primary transition-all text-zinc-700 rounded-sm">
                      <Download className="w-3.5 h-3.5 text-zinc-500" />
                      {t("prog_details_download_guidelines")}
                    </Button>
                  </a>
                </div>

                <div className="h-px bg-zinc-150" />

                <div className="flex items-center gap-2 text-xs text-zinc-500 justify-center font-mono">
                  <Mail className="w-3.5 h-3.5" />
                  <span>office@ncieindia.org</span>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>

      </div>
    </div>
  );
}
