"use client";

import React, { useState } from "react";
import {
  FileText,
  Download,
  Phone,
  Mail,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const [activeTab, setActiveTab] = useState<string>("about");

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
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Coordinator Address */}
      <div className="bg-white border border-zinc-200 p-6 sm:p-8 space-y-6">
        <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 border-l-4 border-primary pl-3 py-0.5">
          {t("about_from_desk")}
        </h2>
        <div className="flex flex-col items-center justify-center py-10 text-center space-y-3 text-zinc-400">
          <svg className="w-10 h-10 text-zinc-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Coordinator details not yet added</p>
          <p className="text-[11px] text-zinc-400">Leadership information will be published once officially designated.</p>
        </div>
      </div>

      {/* 2. Advisory Council Table */}
      <div className="bg-white border border-zinc-200 p-6 sm:p-8 space-y-4">
        <div className="border-l-4 border-primary pl-3 py-0.5">
          <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900">
            {t("about_council_title")}
          </h2>
          <p className="text-[10px] text-zinc-500 font-semibold mt-0.5 uppercase tracking-widest">
            {t("about_council_sub")}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-zinc-200">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-16 text-center">
                  {language === "hi" ? "क्र.सं." : "S.No."}
                </th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-48">
                  {language === "hi" ? "सदस्य का नाम" : "Member Name"}
                </th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700">
                  {language === "hi" ? "पद / संगठन भूमिका" : "Designation / Role"}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={3} className="px-4 py-10 text-center text-zinc-400">
                  <p className="text-xs font-semibold uppercase tracking-wider">No council members added yet</p>
                  <p className="text-[11px] mt-1">Advisory council members will be listed here once officially constituted.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderOrgsContent = () => (
    <div className="space-y-8 animate-fadeIn">
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
      
      {/* ── Page Hero Banner (Gov/Institutional style) ── */}
      <div className="relative bg-[#0A5D45] overflow-hidden py-16 text-white border-b border-primary-dark">
        {/* Simple geometric lines for clean governmental styling */}
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
                    <p className="text-zinc-500 font-mono font-semibold">{t("helpline_phone").split(":")[1]?.trim() || "1800 123 4567"}</p>
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
