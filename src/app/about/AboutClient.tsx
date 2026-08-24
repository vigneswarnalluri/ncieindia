"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Download,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  Building2,
  Scale,
  Landmark,
  Briefcase,
  GraduationCap,
  Star
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { getStorageUrl } from "@/lib/supabase";
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
    { title: "NCIE Vision Document: Viksit Bharat @2047", size: "3.2 MB", type: "Apex Vision Charter", url: "/NCIE_Vision_Document_2047.pdf" },
    { title: t("about_manual_dpr"), size: "1.2 MB", type: "PDF Document", url: "/NCIE_DPR.pdf" },
    { title: t("about_manual_1"), size: "2.8 MB", type: "PDF Manual", url: "/NCIE_Viksit_Bharat_2047_Innovation_Leadership_Programmes.pdf" },
    { title: t("about_manual_2"), size: "1.4 MB", type: "Circular Document", url: "/Kalam_Startup_Seed_Funding_Scheme.pdf" },
    { title: t("about_manual_3"), size: "1.9 MB", type: "Policy Brief", url: "/Institutional_Incubation_Development_Support_Scheme.pdf" }
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
                <Star className="w-4 h-4 text-primary fill-primary" />
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

          <div className="bg-amber-50/40 border border-[#C9A24B]/20 p-4 rounded-sm flex items-center justify-between gap-4 mt-4 select-none animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 border border-amber-200/50">
                <Mail className="w-4 h-4 text-[#8B6E30]" />
              </div>
              <p className="text-xs sm:text-sm text-zinc-800 font-bold leading-relaxed">
                {language === "hi" 
                  ? "कार्यकारी निदेशक डॉ. एलिया थगारम का संदेश पढ़ें।" 
                  : "Read the message from Executive Director Dr. Elia Thagaram."}
              </p>
            </div>
            <Link href="/executive-director" className="text-xs font-bold text-primary hover:underline shrink-0 flex items-center gap-1">
              <span>{language === "hi" ? "निदेशक संदेश" : "Read Message"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Constitutional Mandate & Statutory Framework */}
      <div className="bg-white border border-zinc-200 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-emerald-50 text-[#0D6B4F] border border-emerald-200 text-[10px] font-bold uppercase tracking-wider rounded-xs font-mono">
                {t("home_const_badge") || "Constitutional Mandate & Statutory Framework"}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-zinc-900 border-l-4 border-[#0D6B4F] pl-3 py-0.5 mt-2">
              {language === "hi" ? "2. संवैधानिक जनादेश एवं वैधानिक आधार" : "2. Constitutional Mandate & Statutory Foundation"}
            </h2>
          </div>
          <img
            src="/gov-emblem.png"
            alt="State Emblem of India"
            className="h-10 w-auto opacity-80 shrink-0 hidden sm:block"
          />
        </div>

        {/* Dual Statutory Establishment Statements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pillar 1: Constitution of India */}
          <div className="bg-gradient-to-br from-emerald-950 via-zinc-900 to-zinc-950 text-white p-5 rounded-xs border border-emerald-800/40 relative overflow-hidden flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                  <Landmark className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-bold">
                  {language === "hi" ? "संवैधानिक प्रावधान" : "Constitutional Provision"}
                </span>
              </div>
              <img src="/gov-emblem.png" alt="Emblem" className="h-6 w-auto opacity-70 brightness-0 invert" />
            </div>
            <p className="text-xs sm:text-sm font-bold text-emerald-50 leading-relaxed">
              &ldquo;{t("home_const_statutory_text_1") || "NCIE was established under the Constitution of India."}&rdquo;
            </p>
          </div>

          {/* Pillar 2: Act of Government of India */}
          <div className="bg-gradient-to-br from-amber-950 via-zinc-900 to-zinc-950 text-white p-5 rounded-xs border border-amber-800/40 relative overflow-hidden flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-[#C9A24B]">
                  <Scale className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C9A24B] font-bold">
                  {language === "hi" ? "वैधानिक अधिकार" : "Statutory Authority"}
                </span>
              </div>
              <img src="/gov-of-ind.png" alt="Gov of India" className="h-6 w-auto opacity-70 brightness-0 invert" />
            </div>
            <p className="text-xs sm:text-sm font-bold text-amber-50 leading-relaxed">
              &ldquo;{t("home_const_statutory_text_2") || "NCIE was established under an Act of the Government of India."}&rdquo;
            </p>
          </div>
        </div>

        {/* Featured Article 51A(h) Banner Card */}
        <div className="bg-gradient-to-r from-emerald-50/90 via-white to-amber-50/50 border border-emerald-600/30 p-5 sm:p-6 rounded-xs relative overflow-hidden shadow-xs">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-emerald-800 text-white text-[10px] font-bold uppercase tracking-wider font-mono rounded-xs">
                  {t("home_const_art_51a_num") || "Article 51A(h)"}
                </span>
                <span className="text-xs font-bold text-zinc-700">
                  {t("home_const_art_51a_title") || "Fundamental Duties – Scientific Temper & Inquiry"}
                </span>
              </div>
              <blockquote className="text-xs sm:text-sm italic font-medium text-emerald-950 bg-white/80 p-3.5 border-l-4 border-[#0D6B4F] shadow-2xs rounded-r-xs leading-relaxed">
                {t("home_const_art_51a_quote") || `"It shall be the duty of every citizen of India to develop the scientific temper, humanism and the spirit of inquiry and reform."`}
              </blockquote>
              <p className="text-xs text-zinc-650 leading-relaxed text-justify">
                {t("home_const_art_51a_desc") || "This constitutional provision encourages scientific thinking, innovation, research, creativity, and the spirit of inquiry, which form the foundation of entrepreneurship and innovation."}
              </p>
            </div>

            <div className="w-full lg:w-64 shrink-0 rounded-xs overflow-hidden border border-zinc-200 shadow-xs relative">
              <img
                src="/images/indian_youth_innovation.jpg"
                alt="Youth Scientific Temper & Innovation"
                className="w-full h-36 object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-2.5 text-white">
                <p className="text-[10px] font-bold leading-tight">Scientific Temper &amp; Innovation</p>
                <p className="text-[8.5px] text-emerald-200">Article 51A(h) Constitutional Duty</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Column Directive Principles (Articles 38, 39, 41) */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            {language === "hi" ? "राज्य के नीति निदेशक सिद्धांत (DPSP)" : "Directive Principles of State Policy (DPSPs)"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Article 38 */}
            <div className="bg-zinc-50 border border-zinc-200 p-4.5 rounded-xs flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-xs transition-all">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-xs">
                    {t("home_const_art_38_num") || "Article 38"}
                  </span>
                  <Scale className="w-4 h-4 text-emerald-700" />
                </div>
                <h4 className="text-xs font-bold text-zinc-900 leading-snug">
                  {t("home_const_art_38_title") || "Social & Economic Justice"}
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                  {t("home_const_art_38_desc") || "Promotes the welfare of the people by securing a social order based on justice—social, economic, and political—and supports inclusive national development."}
                </p>
              </div>
            </div>

            {/* Article 39 */}
            <div className="bg-zinc-50 border border-zinc-200 p-4.5 rounded-xs flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-xs transition-all">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-200 rounded-xs">
                    {t("home_const_art_39_num") || "Article 39"}
                  </span>
                  <Briefcase className="w-4 h-4 text-[#8B6E30]" />
                </div>
                <h4 className="text-xs font-bold text-zinc-900 leading-snug">
                  {t("home_const_art_39_title") || "Equitable Livelihoods & Resources"}
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                  {t("home_const_art_39_desc") || "Encourages policies that secure adequate livelihoods, equitable distribution of resources, and the common good, supporting entrepreneurship, economic development, and employment generation."}
                </p>
              </div>
            </div>

            {/* Article 41 */}
            <div className="bg-zinc-50 border border-zinc-200 p-4.5 rounded-xs flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-xs transition-all">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 bg-blue-100 text-blue-900 border border-blue-200 rounded-xs">
                    {t("home_const_art_41_num") || "Article 41"}
                  </span>
                  <GraduationCap className="w-4 h-4 text-blue-700" />
                </div>
                <h4 className="text-xs font-bold text-zinc-900 leading-snug">
                  {t("home_const_art_41_title") || "Right to Work & Education"}
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                  {t("home_const_art_41_desc") || "Encourages the State to make effective provisions for securing the right to work, education, and public assistance, thereby supporting skill development, employability, and human resource development."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Vision & Mission Split Layout */}
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
    <div className="animate-fadeIn space-y-6">
      {/* Executive Director Spotlight Card */}
      <div className="bg-white border border-zinc-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="relative w-20 h-24 sm:w-22 sm:h-28 shrink-0 bg-zinc-50 border border-zinc-200 shadow-xs overflow-hidden rounded-xs">
            <Image
              src="/images/executive-council/dr_elia_thagaram.jpg"
              alt="Dr. Elia Thagaram"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <div>
            <span className="px-2.5 py-0.5 bg-emerald-50 text-primary border border-emerald-200/40 text-[9px] font-bold uppercase tracking-wider rounded-xs">
              {language === "hi" ? "कार्यकारी निदेशक" : "Executive Director"}
            </span>
            <h3 className="text-base font-extrabold text-zinc-900 mt-1">
              Dr. Elia Thagaram
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-xl">
              {language === "hi"
                ? "एनसीआईई भारत के कार्यकारी निदेशक एवं नवाचार और उद्यमिता के डीन।"
                : "Executive Director of NCIE India & Dean of Innovation & Entrepreneurship."}
            </p>
          </div>
        </div>
        <Link
          href="/executive-director"
          className="inline-flex items-center gap-1.5 bg-[#0A5D45] hover:bg-[#074733] text-white font-bold text-xs uppercase px-4 py-2.5 rounded shadow-xs transition-colors shrink-0 cursor-pointer"
        >
          <span>{language === "hi" ? "निदेशक संदेश पढ़ें" : "Read Director Message"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

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
                {language === "hi" ? "नोडल एवं कार्यान्वयन निदेशालय" : "Nodal & Implementation Directorate"}
              </span>
              <h3 className="text-base sm:text-lg font-black tracking-tight text-white mt-1">
                {language === "hi" ? "राष्ट्रीय परियोजना एवं संचालन निदेशालय" : "National Operations & Project Directorate"}
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
              <div className="text-[10px] text-emerald-700 uppercase tracking-widest font-bold">Nodal & Implementing Directorate</div>
              <div className="text-sm font-extrabold text-emerald-900">{language === "hi" ? "राष्ट्रीय परियोजना एवं संचालन निदेशालय" : "National Operations & Project Directorate"}</div>
            </div>
          </div>

          {/* Vertical Line */}
          <div className="w-0.5 h-6 bg-emerald-600 mx-auto" />

          {/* Level 3: Executive & Governance Boards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
            <div className="bg-white border border-emerald-300 p-3 text-center rounded-xs shadow-2xs">
              <div className="text-[9px] text-emerald-700 font-bold uppercase tracking-wider">{language === "hi" ? "नेतृत्व" : "Leadership"}</div>
              <div className="text-xs font-bold text-zinc-900">{language === "hi" ? "कार्यकारी निदेशक" : "Executive Director"}</div>
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
                  className={`flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer shrink-0 whitespace-nowrap ${
                    isActive 
                      ? "bg-[#0A5D45] text-white font-bold border-b-2 border-accent" 
                      : "text-emerald-100/70 hover:text-white"
                  }`}
                >
                  {isActive && <DotGridIcon />}
                  <span className="whitespace-nowrap">{tab.label}</span>
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
                    href={getStorageUrl(doc.url)}
                    target="_blank"
                    rel="noopener noreferrer"
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
