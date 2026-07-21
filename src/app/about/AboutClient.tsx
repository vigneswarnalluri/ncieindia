"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Download,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  Building2
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import ExecutiveCouncil from "@/components/ExecutiveCouncil";

// Custom 3x3 Dot Grid Icon prefix for active tab matching the MSDE portal
const DotGridIcon = () => (
  <svg className="w-3.5 h-3.5 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
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

export default function AboutPage() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const tabParam = searchParams?.get("tab");
  const [activeTab, setActiveTab] = useState<string>(tabParam || "about");

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const TABS = [
    { id: "about", label: t("tab_about") },
    { id: "team", label: t("tab_team") },
    { id: "orgs", label: t("tab_orgs") },
    { id: "performance", label: t("tab_performance") },
    { id: "directory", label: t("tab_directory") }
  ];

  const activeTabLabel = TABS.find((tab) => tab.id === activeTab)?.label || t("tab_about");

  const OBJECTIVES = [
    t("about_obj_1"),
    t("about_obj_2"),
    t("about_obj_3"),
    t("about_obj_4")
  ];

  const DOWNLOADS = [
    { title: t("about_manual_1"), size: "2.8 MB", type: "PDF Manual" },
    { title: t("about_manual_2"), size: "1.4 MB", type: "Circular Document" },
    { title: t("about_manual_3"), size: "1.9 MB", type: "Policy Brief" }
  ];

  // Tab Content Renderers
  const renderAboutContent = () => (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Introduction */}
      <div className="bg-white border border-zinc-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 border-l-4 border-primary pl-3 py-0.5">
          {language === "hi" ? "1. परिचय" : "1. Introduction"}
        </h2>
        <div className="space-y-4 text-xs sm:text-sm text-zinc-700 leading-relaxed font-sans">
          <p className="indent-8 text-justify">{t("about_intro_p1")}</p>
          <p className="indent-8 text-justify">{t("about_intro_p2")}</p>

          <div className="bg-emerald-50/50 border border-primary/10 p-4 rounded-sm flex items-center justify-between gap-4 mt-6 select-none">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 border border-emerald-200/50">
                <span className="text-primary font-bold text-xs">★</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-800 font-bold leading-relaxed">
                {language === "hi" 
                  ? "विकसित भारत के दृष्टिकोण के साथ गठबंधन।" 
                  : "Aligned with the Vision of Viksit Bharat."}
              </p>
            </div>
            <Link href="/vision-2047" className="text-xs font-bold text-primary hover:underline shrink-0 flex items-center gap-1">
              <span>{language === "hi" ? "विज़न 2047 देखें" : "Explore Vision 2047"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* NITI Aayog Accreditation Banner */}
        <div className="bg-gradient-to-r from-emerald-50/60 via-white to-emerald-50/40 border border-emerald-600/30 p-5 rounded-sm shadow-2xs relative overflow-hidden mt-6">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-emerald-600 to-emerald-700" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-300/60 shadow-xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-zinc-900">
                    {language === "hi" ? "नीति आयोग पंजीकरण एवं मान्यता" : "NITI Aayog Accreditation"}
                  </h3>
                  <span className="px-2 py-0.5 bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider rounded-xs">
                    Government of India
                  </span>
                </div>
                <p className="text-xs text-zinc-600 font-sans leading-relaxed">
                  {language === "hi" 
                    ? "नीति आयोग के एनजीओ दर्पण पोर्टल, भारत सरकार पर आधिकारिक रूप से पंजीकृत।" 
                    : "Officially Registered on the NGO DARPAN Portal of NITI Aayog, Government of India."}
                </p>
              </div>
            </div>

            <div className="bg-white border border-emerald-200/80 px-3.5 py-2 rounded-xs shadow-2xs flex items-center gap-2.5 shrink-0 self-stretch sm:self-auto justify-between sm:justify-start">
              <span className="text-xs font-bold text-zinc-600">
                {language === "hi" ? "यूनीक दर्पण आईडी:" : "Unique DARPAN ID:"}
              </span>
              <span className="font-mono font-bold text-xs bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-xs border border-emerald-300">
                1124993
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Vision & Mission Split Layout */}
      <div className="bg-white border border-zinc-200 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-zinc-200">
        {/* Vision Box */}
        <div className="space-y-3 pr-0 md:pr-4">
          <h3 className="text-sm font-bold text-primary uppercase tracking-wider">
            {t("about_vision_title")}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed text-justify">
            {t("about_vision_text")}
          </p>
        </div>

        {/* Mission Box */}
        <div className="space-y-3 pt-6 md:pt-0 pl-0 md:pl-8">
          <h3 className="text-sm font-bold text-accent-dark uppercase tracking-wider">
            {t("about_mission_title")}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed text-justify">
            {t("about_mission_text")}
          </p>
        </div>
      </div>

      {/* 3. Key Objectives List Table */}
      <div className="bg-white border border-zinc-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 border-l-4 border-primary pl-3 py-0.5">
          {t("about_objectives_title")}
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-zinc-200">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-16 text-center">
                  {language === "hi" ? "क्र.सं." : "S.No."}
                </th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700">
                  {language === "hi" ? "मुख्य उद्देश्य / विवरण" : "Key Objective / Description"}
                </th>
              </tr>
            </thead>
            <tbody>
              {OBJECTIVES.map((obj, idx) => (
                <tr key={idx} className="border-b border-zinc-200 last:border-b-0 hover:bg-zinc-50/50 odd:bg-white even:bg-zinc-50/20">
                  <td className="px-4 py-3.5 text-xs sm:text-sm text-zinc-600 font-mono border-r border-zinc-200 text-center font-bold">
                    0{idx + 1}
                  </td>
                  <td className="px-4 py-3.5 text-xs sm:text-sm text-zinc-650 leading-relaxed">
                    {obj}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTeamContent = () => (
    <div className="animate-fadeIn">
      <ExecutiveCouncil />
    </div>
  );

  const renderOrgsContent = () => (
    <div className="space-y-8 animate-fadeIn">
      {/* ── Organizational Structure Header & Hierarchy Tree ── */}
      <div className="bg-white border border-zinc-200 p-6 sm:p-8 space-y-6">
        <div className="border-l-4 border-primary pl-3 py-0.5">
          <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-zinc-900">
            {language === "hi" ? "एनसीआईई संगठनात्मक संरचना" : "NCIE Organizational Structure"}
          </h2>
          <p className="text-xs text-zinc-500 font-medium mt-0.5">
            {language === "hi"
              ? "भारत भर में क्रियान्वयन, राज्य समन्वय और परिसर आउटरीच की प्रशासनिक रूपरेखा"
              : "Administrative governance framework of implementation, state coordination, and campus outreach"}
          </p>
        </div>

        {/* Nodal Agency Official Card */}
        <div className="bg-gradient-to-r from-emerald-900 via-[#074733] to-emerald-950 text-white p-5 sm:p-6 rounded-sm shadow-md border border-emerald-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 text-emerald-300 flex items-center justify-center shrink-0 border border-white/20">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold uppercase tracking-wider rounded-xs">
                {language === "hi" ? "नोडल एवं कार्यान्वयन एजेंसी" : "Nodal & Implementing Agency"}
              </span>
              <h3 className="text-base sm:text-lg font-black tracking-tight text-white mt-1">
                Bharath Cares Life Line Foundation
              </h3>
              <p className="text-xs text-emerald-100/80">
                {language === "hi"
                  ? "राष्ट्रीय परिषद के लिए राष्ट्रीय संचालन और परियोजना कार्यान्वयन का निष्पादन"
                  : "Executes national operations and project implementation for the council"}
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs border border-white/20 px-3.5 py-2 text-center rounded-xs text-xs font-mono shrink-0">
            <span className="text-emerald-200 block text-[10px] uppercase tracking-widest">{language === "hi" ? "संरचना स्तर" : "Apex Framework"}</span>
            <span className="font-bold text-white">NCIE Governance</span>
          </div>
        </div>

        {/* Visual Hierarchy Tree */}
        <div className="bg-zinc-50 border border-zinc-200 p-6 sm:p-8 space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 text-center border-b border-zinc-200 pb-3">
            {language === "hi" ? "प्रशासनिक एवं कार्यान्वयन पदानुक्रम" : "Administrative & Implementation Hierarchy Tree"}
          </h3>

          {/* Level 1: Apex Council */}
          <div className="flex justify-center">
            <div className="bg-[#0A5D45] text-white px-6 py-3 rounded-xs shadow-sm text-center border border-emerald-700 max-w-md w-full">
              <div className="text-[10px] text-emerald-200 uppercase tracking-widest font-bold">Apex Body</div>
              <div className="text-sm font-black tracking-wide">NCIE (National Council for Innovation & Entrepreneurship)</div>
            </div>
          </div>

          {/* Vertical Line */}
          <div className="w-0.5 h-6 bg-emerald-600 mx-auto" />

          {/* Level 2: Nodal Agency */}
          <div className="flex justify-center">
            <div className="bg-emerald-50 border-2 border-emerald-600 text-emerald-950 px-6 py-3 rounded-xs text-center shadow-2xs max-w-lg w-full">
              <div className="text-[10px] text-emerald-700 uppercase tracking-widest font-bold">Nodal & Implementing Agency</div>
              <div className="text-sm font-extrabold text-emerald-900">Bharath Cares Life Line Foundation</div>
            </div>
          </div>

          {/* Vertical Line */}
          <div className="w-0.5 h-6 bg-emerald-600 mx-auto" />

          {/* Level 3: Executive & Governance Boards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
            <div className="bg-white border border-emerald-300 p-3 text-center rounded-xs shadow-2xs">
              <div className="text-[9px] text-emerald-700 font-bold uppercase tracking-wider">Leadership</div>
              <div className="text-xs font-bold text-zinc-900">Executive Director</div>
              <div className="text-[10px] text-emerald-800 font-bold mt-0.5">Dr. Elia Thagaram</div>
            </div>
            <div className="bg-white border border-zinc-300 p-3 text-center rounded-xs shadow-2xs">
              <div className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Governance</div>
              <div className="text-xs font-bold text-zinc-900">National Governing Body</div>
            </div>
            <div className="bg-white border border-zinc-300 p-3 text-center rounded-xs shadow-2xs">
              <div className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Execution</div>
              <div className="text-xs font-bold text-zinc-900">Project Directorate</div>
            </div>
            <div className="bg-white border border-zinc-300 p-3 text-center rounded-xs shadow-2xs">
              <div className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Advisory</div>
              <div className="text-xs font-bold text-zinc-900">Advisory Board</div>
            </div>
          </div>

          {/* Vertical Line */}
          <div className="w-0.5 h-6 bg-emerald-600 mx-auto" />

          {/* Level 4: State Coordinators */}
          <div className="max-w-4xl mx-auto bg-white border border-emerald-200 p-4 rounded-xs shadow-2xs space-y-3">
            <div className="text-center">
              <div className="text-[10px] text-emerald-800 uppercase tracking-widest font-bold">State Program Coordinators</div>
              <p className="text-xs text-zinc-600 font-medium">Regional Administrative & Sectoral Operations</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              {[
                "Andhra Pradesh",
                "Telangana",
                "Karnataka",
                "Tamil Nadu",
                "Kerala",
                "Gujarat"
              ].map((state) => (
                <span
                  key={state}
                  className="px-3 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold rounded-xs font-sans"
                >
                  {state}
                </span>
              ))}
            </div>
          </div>

          {/* Vertical Line */}
          <div className="w-0.5 h-6 bg-emerald-600 mx-auto" />

          {/* Level 5: Grassroots Outreach & Institutional Coordinators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
            <div className="bg-emerald-900 text-white p-3 text-center rounded-xs shadow-2xs border border-emerald-800">
              <div className="text-[9px] text-emerald-300 font-bold uppercase tracking-wider">District Level</div>
              <div className="text-xs font-bold">District Coordinators</div>
            </div>
            <div className="bg-emerald-900 text-white p-3 text-center rounded-xs shadow-2xs border border-emerald-800">
              <div className="text-[9px] text-emerald-300 font-bold uppercase tracking-wider">Campus Level</div>
              <div className="text-xs font-bold">Institutional Coordinators</div>
            </div>
            <div className="bg-emerald-900 text-white p-3 text-center rounded-xs shadow-2xs border border-emerald-800">
              <div className="text-[9px] text-emerald-300 font-bold uppercase tracking-wider">Academic Mentors</div>
              <div className="text-xs font-bold">Faculty Innovation Coordinators</div>
            </div>
            <div className="bg-amber-600 text-white p-3 text-center rounded-xs shadow-2xs border border-amber-700">
              <div className="text-[9px] text-amber-200 font-bold uppercase tracking-wider">Student Leaders</div>
              <div className="text-xs font-bold">Student Innovation Ambassadors</div>
            </div>
          </div>
        </div>
      </div>

      {/* Attached Wings Table */}
      <div className="bg-white border border-zinc-200 p-6 sm:p-8 space-y-4">
        <div className="border-l-4 border-primary pl-3 py-0.5">
          <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900">
            {t("about_structure_title")}
          </h2>
          <p className="text-[10px] text-zinc-500 font-semibold mt-0.5 uppercase tracking-widest">
            {t("about_structure_subtitle")}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-zinc-200">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-16 text-center">
                  {language === "hi" ? "क्र.सं." : "S.No."}
                </th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-52">
                  {language === "hi" ? "संबद्ध विंग / सेल" : "Attached Wing / Cell"}
                </th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200">
                  {language === "hi" ? "मुख्य भूमिका और विवरण" : "Key Function & Description"}
                </th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 w-44">
                  {language === "hi" ? "शासी प्राधिकरण" : "Governing Desk"}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-200 hover:bg-zinc-50/50 bg-white">
                <td className="px-4 py-3.5 text-xs sm:text-sm text-zinc-600 font-mono border-r border-zinc-200 text-center font-bold">1</td>
                <td className="px-4 py-3.5 text-xs sm:text-sm text-zinc-900 font-bold border-r border-zinc-200">{t("about_wing_1_name")}</td>
                <td className="px-4 py-3.5 text-xs sm:text-sm text-zinc-650 border-r border-zinc-200 leading-relaxed">{t("about_wing_1_desc")}</td>
                <td className="px-4 py-3.5 text-xs sm:text-sm text-zinc-500 font-medium font-mono">
                  {language === "hi" ? "अध्याय महानिदेशालय" : "Directorate General of Chapters"}
                </td>
              </tr>
              <tr className="border-b border-zinc-200 hover:bg-zinc-50/50 bg-zinc-50/20">
                <td className="px-4 py-3.5 text-xs sm:text-sm text-zinc-600 font-mono border-r border-zinc-200 text-center font-bold">2</td>
                <td className="px-4 py-3.5 text-xs sm:text-sm text-zinc-900 font-bold border-r border-zinc-200">{t("about_wing_2_name")}</td>
                <td className="px-4 py-3.5 text-xs sm:text-sm text-zinc-650 border-r border-zinc-200 leading-relaxed">{t("about_wing_2_desc")}</td>
                <td className="px-4 py-3.5 text-xs sm:text-sm text-zinc-500 font-medium font-mono">
                  {language === "hi" ? "राष्ट्रीय सैंडबॉक्स समिति" : "National Sandbox Committee"}
                </td>
              </tr>
              <tr className="hover:bg-zinc-50/50 bg-white">
                <td className="px-4 py-3.5 text-xs sm:text-sm text-zinc-600 font-mono border-r border-zinc-200 text-center font-bold">3</td>
                <td className="px-4 py-3.5 text-xs sm:text-sm text-zinc-900 font-bold border-r border-zinc-200">{t("about_wing_3_name")}</td>
                <td className="px-4 py-3.5 text-xs sm:text-sm text-zinc-650 border-r border-zinc-200 leading-relaxed">{t("about_wing_3_desc")}</td>
                <td className="px-4 py-3.5 text-xs sm:text-sm text-zinc-500 font-medium font-mono">
                  {language === "hi" ? "राष्ट्रीय संपर्क सचिवालय" : "National Liaison Secretariat"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPerformanceContent = () => (
    <div className="space-y-8 animate-fadeIn">
      {/* Roadmap milestones */}
      <div className="bg-white border border-zinc-200 p-6 sm:p-8 space-y-4">
        <div className="border-l-4 border-primary pl-3 py-0.5">
          <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900">
            {t("about_roadmap_title")}
          </h2>
          <p className="text-[10px] text-zinc-500 font-semibold mt-0.5 uppercase tracking-widest">
            {t("about_roadmap_sub")}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-zinc-200">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-28 text-center">
                  {language === "hi" ? "चरण / अवधि" : "Phase / Timeline"}
                </th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-52">
                  {language === "hi" ? "शीर्षक / मील का पत्थर" : "Milestone Objective"}
                </th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700">
                  {language === "hi" ? "रणनीतिक वितरण और क्रियान्वयन योजना" : "Strategic Deliverables & Scope"}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-200 hover:bg-zinc-50/50 bg-white">
                <td className="px-4 py-3.5 text-xs sm:text-sm text-zinc-650 font-mono border-r border-zinc-200 text-center font-bold">
                  {language === "hi" ? "चरण I (2024-2026)" : "Phase I (2024-2026)"}
                </td>
                <td className="px-4 py-3.5 text-xs sm:text-sm text-zinc-900 font-bold border-r border-zinc-200">
                  {t("about_phase_1_title").split(":")[1]?.trim() || t("about_phase_1_title")}
                </td>
                <td className="px-4 py-3.5 text-xs sm:text-sm text-zinc-600 leading-relaxed">{t("about_phase_1_desc")}</td>
              </tr>
              <tr className="border-b border-zinc-200 hover:bg-zinc-50/50 bg-zinc-50/20">
                <td className="px-4 py-3.5 text-xs sm:text-sm text-zinc-650 font-mono border-r border-zinc-200 text-center font-bold">
                  {language === "hi" ? "चरण II (2026-2030)" : "Phase II (2026-2030)"}
                </td>
                <td className="px-4 py-3.5 text-xs sm:text-sm text-zinc-900 font-bold border-r border-zinc-200">
                  {t("about_phase_2_title").split(":")[1]?.trim() || t("about_phase_2_title")}
                </td>
                <td className="px-4 py-3.5 text-xs sm:text-sm text-zinc-600 leading-relaxed">{t("about_phase_2_desc")}</td>
              </tr>
              <tr className="hover:bg-zinc-50/50 bg-white">
                <td className="px-4 py-3.5 text-xs sm:text-sm text-zinc-650 font-mono border-r border-zinc-200 text-center font-bold">
                  {language === "hi" ? "चरण III (2030-2035)" : "Phase III (2030-2035)"}
                </td>
                <td className="px-4 py-3.5 text-xs sm:text-sm text-zinc-900 font-bold border-r border-zinc-200">
                  {t("about_phase_3_title").split(":")[1]?.trim() || t("about_phase_3_title")}
                </td>
                <td className="px-4 py-3.5 text-xs sm:text-sm text-zinc-600 leading-relaxed">{t("about_phase_3_desc")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderDirectoryContent = () => {
    return (
      <div className="space-y-8 animate-fadeIn">
        {/* Liaison Zones Table */}
        <div className="bg-white border border-zinc-200 p-6 sm:p-8 space-y-4">
          <div className="border-l-4 border-primary pl-3 py-0.5">
            <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900">
              {t("about_liaison_title")}
            </h2>
            <p className="text-[10px] text-zinc-500 font-semibold mt-0.5 uppercase tracking-widest">
              {t("about_liaison_sub")}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-zinc-200">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200">
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-16 text-center">
                    {language === "hi" ? "क्र.सं." : "S.No."}
                  </th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-44">
                    {language === "hi" ? "क्षेत्रीय संपर्क डेस्क" : "Regional Liaison Desk"}
                  </th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200">
                    {language === "hi" ? "भौतिक पता / कार्यालय" : "Physical Address / Location"}
                  </th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 w-56">
                    {language === "hi" ? "आधिकारिक ईमेल संपर्क" : "Official Liaison Email"}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-zinc-400">
                    <p className="text-xs font-semibold uppercase tracking-wider">No regional contacts added yet</p>
                    <p className="text-[11px] mt-1">Regional liaison desks will be listed here once officially designated.</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 bg-[#F9FAFB] pb-16">
      
      {/* ── Page Hero Banner (Institutional style) ── */}
      <div className="relative bg-[#0A5D45] overflow-hidden py-16 text-white border-b border-primary-dark">
        {/* Simple geometric lines for clean institutional styling */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%">
            <line x1="0" y1="20%" x2="100%" y2="80%" stroke="#ffffff" strokeWidth="2" />
            <line x1="100%" y1="20%" x2="0" y2="80%" stroke="#ffffff" strokeWidth="2" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-xs md:text-sm text-emerald-100 font-semibold mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <Link href="/" className="hover:underline hover:text-white transition-colors">{t("nav_home")}</Link>
            <span>/</span>
            <span className="text-white/60">{language === "hi" ? "मंत्रालय" : "Ministry"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {activeTabLabel}
          </h1>
        </div>
      </div>

      {/* ── Overlapping sub-navigation bar ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-[#074733] border border-[#0d6b4f]/25 rounded-none shadow-md overflow-hidden">
          <div className="flex items-center gap-2 md:gap-4 overflow-x-auto whitespace-nowrap scrollbar-none px-4 py-3">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? "bg-[#0A5D45] text-white font-bold border-b-2 border-accent" 
                      : "text-emerald-100/70 hover:text-white"
                  }`}
                >
                  {isActive && <DotGridIcon />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Main Layout Body ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ── LEFT COLUMN: Dynamic Tab Content Panel (65% width) ── */}
          <div className="lg:col-span-8">
            {activeTab === "about" && renderAboutContent()}
            {activeTab === "team" && renderTeamContent()}
            {activeTab === "orgs" && renderOrgsContent()}
            {activeTab === "performance" && renderPerformanceContent()}
            {activeTab === "directory" && renderDirectoryContent()}
          </div>

          {/* ── RIGHT COLUMN: Downloads & Helplines (35% width) ── */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* NGO DARPAN Accreditation Card */}
            <div className="bg-white border border-zinc-200 overflow-hidden relative shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#138808]" />
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                    <ShieldCheck className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-zinc-900 leading-tight">
                      {language === "hi" ? "नीति आयोग पंजीकरण" : "NITI Aayog Accreditation"}
                    </h3>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-0.5">
                      Government of India
                    </p>
                  </div>
                </div>
                <div className="bg-zinc-50 border border-zinc-200/80 p-3 rounded-none text-xs leading-relaxed space-y-2 text-zinc-650">
                  <p>
                    {language === "hi" 
                      ? "नीति आयोग के एनजीओ दर्पण पोर्टल पर आधिकारिक रूप से पंजीकृत।" 
                      : "Officially Registered on the NGO DARPAN Portal of NITI Aayog, Government of India."}
                  </p>
                  <div className="pt-2 border-t border-zinc-200/60 font-mono text-[11px] font-bold text-emerald-800 flex justify-between items-center">
                    <span>{language === "hi" ? "यूनीक दर्पण आईडी:" : "Unique DARPAN ID:"}</span>
                    <span className="bg-emerald-50 px-2 py-0.5 border border-emerald-200">1124993</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 1. Official Downloads Center */}
            <div className="bg-white border border-zinc-200">
              <div className="bg-[#0D6B4F] text-white px-4 py-3 border-b border-[#0d6b4f]/30">
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  {t("about_downloads_title")}
                </h3>
                <p className="text-[9px] text-emerald-100/80 font-medium">
                  {t("about_downloads_sub")}
                </p>
              </div>

              <div className="divide-y divide-zinc-200">
                {DOWNLOADS.map((doc, idx) => (
                  <a 
                    key={idx}
                    href="#"
                    className="flex items-center justify-between p-3.5 hover:bg-zinc-50 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText className="w-4 h-4 text-zinc-400 shrink-0" />
                      <div className="min-w-0">
                        <h4 className="text-xs font-semibold text-zinc-800 truncate leading-tight group-hover:text-primary transition-colors">
                          {doc.title}
                        </h4>
                        <span className="text-[9px] text-zinc-400 font-medium font-mono uppercase">
                          {doc.type}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono flex items-center gap-1.5">
                      <span>{doc.size}</span>
                      <Download className="w-3.5 h-3.5 text-zinc-400 group-hover:text-primary" />
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* 2. Official Secretariat Helpline Contacts */}
            <div className="bg-white border border-zinc-200">
              <div className="bg-zinc-100 text-zinc-850 px-4 py-3 border-b border-zinc-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                  Technical Secretariat Support
                </h3>
              </div>
              
              <div className="p-5 space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="font-semibold text-zinc-800">{t("helpline_phone").split(":")[0] || "Helpdesk"}</p>
                    <p className="text-zinc-500 font-mono font-semibold">{t("helpline_phone").split(":")[1]?.trim() || "08632321417"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="font-semibold text-zinc-800">Support Email</p>
                    <a href={`mailto:${t("helpline_email")}`} className="text-primary hover:underline font-mono font-semibold">
                      {t("helpline_email")}
                    </a>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-200 text-[10px] text-zinc-500 leading-relaxed">
                  Support line active Monday to Saturday from 09:00 AM to 06:00 PM IST. Closed on national holidays.
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ── Bottom Call to Action Panel ── */}
        <div className="mt-12 bg-[#083D2D] p-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 relative z-10 text-center md:text-left max-w-2xl">
            <h3 className="text-lg font-bold tracking-tight uppercase">
              {t("about_query_title")}
            </h3>
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              {t("about_query_sub")}
            </p>
          </div>
          
          <Link href="/join" className="relative z-10 shrink-0">
            <button className="flex items-center gap-2 bg-[#C9A24B] hover:bg-[#A68034] active:scale-[0.98] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 transition-all cursor-pointer">
              <span>{t("about_query_btn")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
