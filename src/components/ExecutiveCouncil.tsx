"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Search,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  ExternalLink,
  X,
  Building2,
  ShieldCheck,
  LayoutGrid,
  List
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  EXECUTIVE_COUNCIL_MEMBERS,
  CouncilMember
} from "@/data/executiveCouncilData";

export default function ExecutiveCouncil() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "executive_council" | "advisory_board"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMember, setActiveMember] = useState<CouncilMember | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const filteredMembers = useMemo(() => {
    return EXECUTIVE_COUNCIL_MEMBERS.filter((member) => {
      const matchesCategory =
        selectedCategory === "all" || member.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const name = (
        language === "hi" ? member.nameHi : member.nameEn
      ).toLowerCase();
      const role = (
        language === "hi" ? member.roleHi : member.roleEn
      ).toLowerCase();
      const inst = (
        language === "hi" ? member.institutionHi : member.institutionEn
      ).toLowerCase();
      const qual = (
        language === "hi"
          ? member.qualificationsHi || ""
          : member.qualificationsEn || ""
      ).toLowerCase();

      return (
        matchesCategory &&
        (name.includes(query) ||
          role.includes(query) ||
          inst.includes(query) ||
          qual.includes(query))
      );
    });
  }, [selectedCategory, searchQuery, language]);

  const execCount = EXECUTIVE_COUNCIL_MEMBERS.filter(
    (m) => m.category === "executive_council"
  ).length;
  const advisoryCount = EXECUTIVE_COUNCIL_MEMBERS.filter(
    (m) => m.category === "advisory_board"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header Banner & Stats */}
      <div className="bg-white border border-zinc-200 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-zinc-900 border-l-4 border-emerald-600 pl-3 py-0.5">
            {language === "hi"
              ? "एनसीआईई कार्यकारी परिषद एवं सलाहकार बोर्ड"
              : "NCIE Executive Council & Advisory Board"}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-2xl leading-relaxed">
            {language === "hi"
              ? "प्रतिष्ठित शैक्षणिक नेता, कुलपति, वैज्ञानिक एवं नीति विशेषज्ञ जो भारत के नवाचार पारिस्थितिकी तंत्र को दिशा दे रहे हैं।"
              : "Distinguished academic leaders, Vice Chancellors, scientists, and policy experts guiding India's national innovation & entrepreneurship ecosystem."}
          </p>
        </div>

        {/* Quick Metrics */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-zinc-50 border border-zinc-200 px-4 py-2.5 text-center min-w-[110px]">
            <div className="text-xl font-bold text-emerald-700 font-mono">
              {execCount}
            </div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
              {language === "hi" ? "कार्यकारी सदस्य" : "Council Members"}
            </div>
          </div>
          <div className="bg-zinc-50 border border-zinc-200 px-4 py-2.5 text-center min-w-[110px]">
            <div className="text-xl font-bold text-amber-700 font-mono">
              {advisoryCount}
            </div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
              {language === "hi" ? "सलाहकार बोर्ड" : "Advisory Board"}
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Filters, Search, View Switcher */}
      <div className="bg-white border border-zinc-200 p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-sm">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 text-xs font-bold transition-all border ${
              selectedCategory === "all"
                ? "bg-emerald-700 text-white border-emerald-700 shadow-sm"
                : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100"
            }`}
          >
            {language === "hi" ? "सभी सदस्य" : "All Members"}{" "}
            <span className="ml-1 opacity-75 font-mono">
              ({EXECUTIVE_COUNCIL_MEMBERS.length})
            </span>
          </button>
          <button
            onClick={() => setSelectedCategory("executive_council")}
            className={`px-3.5 py-1.5 text-xs font-bold transition-all border ${
              selectedCategory === "executive_council"
                ? "bg-emerald-700 text-white border-emerald-700 shadow-sm"
                : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100"
            }`}
          >
            {language === "hi" ? "कार्यकारी परिषद" : "Executive Council"}{" "}
            <span className="ml-1 opacity-75 font-mono">({execCount})</span>
          </button>
          <button
            onClick={() => setSelectedCategory("advisory_board")}
            className={`px-3.5 py-1.5 text-xs font-bold transition-all border ${
              selectedCategory === "advisory_board"
                ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100"
            }`}
          >
            {language === "hi" ? "सलाहकार बोर्ड" : "Advisory Board"}{" "}
            <span className="ml-1 opacity-75 font-mono">({advisoryCount})</span>
          </button>
        </div>

        {/* Right Controls: Search & Layout Toggle */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === "hi"
                  ? "नाम, संस्थान खोजें..."
                  : "Search name, institution..."
              }
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-50 border border-zinc-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 transition-all placeholder:text-zinc-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center border border-zinc-200 p-0.5 bg-zinc-50 shrink-0">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 text-xs ${
                viewMode === "grid"
                  ? "bg-white text-emerald-700 shadow-xs font-bold"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 text-xs ${
                viewMode === "table"
                  ? "bg-white text-emerald-700 shadow-xs font-bold"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Display: Grid or Table */}
      {filteredMembers.length === 0 ? (
        <div className="bg-white border border-zinc-200 p-12 text-center space-y-3">
          <Building2 className="w-10 h-10 mx-auto text-zinc-300" />
          <h3 className="text-sm font-bold text-zinc-700 uppercase tracking-wider">
            {language === "hi"
              ? "कोई परिणाम नहीं मिला"
              : "No Matching Members Found"}
          </h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            {language === "hi"
              ? "कृपया अपने खोज मानदंड या फ़िल्टर बदलकर पुनः प्रयास करें।"
              : "Try adjusting your search query or filter selection to view members."}
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMembers.map((member) => (
            <motion.div
              key={member.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-zinc-200 hover:border-emerald-500/60 hover:shadow-md transition-all flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {/* Header Accent Bar */}
                <div
                  className={`h-1 w-full ${
                    member.category === "advisory_board"
                      ? "bg-amber-500"
                      : "bg-emerald-600"
                  }`}
                />

                <div className="p-5 sm:p-6 space-y-4">
                  {/* Photo & Core Information */}
                  <div className="flex items-start gap-4">
                    {/* Headshot */}
                    <div className="relative w-20 h-24 sm:w-22 sm:h-28 shrink-0 bg-zinc-100 border border-zinc-200 shadow-xs overflow-hidden rounded-xs group-hover:scale-102 transition-transform duration-300">
                      <Image
                        src={member.image}
                        alt={language === "hi" ? member.nameHi : member.nameEn}
                        fill
                        className="object-cover object-top"
                        sizes="90px"
                      />
                    </div>

                    {/* Member Name, Badge & Designation */}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div>
                        <span
                          className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            member.category === "advisory_board"
                              ? "bg-amber-50 text-amber-800 border border-amber-200"
                              : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          }`}
                        >
                          {member.category === "advisory_board"
                            ? language === "hi"
                              ? "सलाहकार बोर्ड"
                              : "Advisory Board"
                            : language === "hi"
                            ? "कार्यकारी परिषद"
                            : "Executive Council"}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-zinc-900 group-hover:text-emerald-700 transition-colors leading-snug">
                        {language === "hi" ? member.nameHi : member.nameEn}
                      </h3>

                      <p className="text-xs font-semibold text-emerald-700 leading-normal">
                        {language === "hi" ? member.roleHi : member.roleEn}
                      </p>
                    </div>
                  </div>

                  {/* Institution Box */}
                  <div className="bg-zinc-50 border border-zinc-200/80 p-3 rounded-xs flex items-start gap-2.5 text-xs text-zinc-700">
                    <Building2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <p className="leading-relaxed font-sans">
                      {language === "hi"
                        ? member.institutionHi
                        : member.institutionEn}
                    </p>
                  </div>

                  {/* Experience & Qualifications Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-0.5">
                    {(member.experienceEn || member.experienceHi) && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-900 text-[11px] font-mono font-bold border border-emerald-200/80 rounded-xs">
                        <Briefcase className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span>
                          {language === "hi"
                            ? member.experienceHi
                            : member.experienceEn}
                        </span>
                      </span>
                    )}

                    {(member.qualificationsEn || member.qualificationsHi) && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-100 text-zinc-700 text-[11px] font-medium border border-zinc-200 rounded-xs">
                        <GraduationCap className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                        <span>
                          {language === "hi"
                            ? member.qualificationsHi
                            : member.qualificationsEn}
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 sm:px-6 py-3 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between gap-3">
                {member.email ? (
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-1.5 text-zinc-600 hover:text-emerald-700 font-mono text-[11px] transition-colors truncate"
                    title={member.email}
                  >
                    <Mail className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </a>
                ) : (
                  <span className="text-[11px] text-zinc-400 font-mono italic">
                    {language === "hi" ? "एनसीआईई सचिवालय" : "NCIE Secretariat"}
                  </span>
                )}

                <button
                  onClick={() => setActiveMember(member)}
                  className="px-3 py-1.5 bg-white hover:bg-emerald-700 text-zinc-800 hover:text-white border border-zinc-300 hover:border-emerald-700 text-xs font-bold transition-all shrink-0 shadow-2xs"
                >
                  {language === "hi" ? "विवरण देखें" : "View Profile"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white border border-zinc-200 touch-scroll-x shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-800 text-white border-b border-zinc-700 text-xs font-bold uppercase tracking-wider font-sans">
                <th className="px-4 py-3 w-16 text-center border-r border-zinc-700">
                  {language === "hi" ? "फोटो" : "Photo"}
                </th>
                <th className="px-4 py-3 border-r border-zinc-700 w-64">
                  {language === "hi" ? "सदस्य का नाम" : "Member Name"}
                </th>
                <th className="px-4 py-3 border-r border-zinc-700 w-52">
                  {language === "hi" ? "पद / श्रेणी" : "Designation & Role"}
                </th>
                <th className="px-4 py-3 border-r border-zinc-700">
                  {language === "hi" ? "संस्थान एवं विभाग" : "Institution & Department"}
                </th>
                <th className="px-4 py-3 w-48 text-right">
                  {language === "hi" ? "संपर्क / प्रोफाइल" : "Contact & Profile"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 text-xs">
              {filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-emerald-50/40 transition-colors odd:bg-white even:bg-zinc-50/50"
                >
                  <td className="px-4 py-3 text-center border-r border-zinc-200">
                    <div className="relative w-10 h-12 mx-auto bg-zinc-100 border border-zinc-200 overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.nameEn}
                        fill
                        className="object-cover object-top"
                        sizes="40px"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 border-r border-zinc-200 font-bold text-zinc-900">
                    <div className="space-y-0.5">
                      <p className="text-xs sm:text-sm">
                        {language === "hi" ? member.nameHi : member.nameEn}
                      </p>
                      {member.qualificationsEn && (
                        <p className="text-[11px] text-zinc-500 font-normal">
                          {language === "hi"
                            ? member.qualificationsHi
                            : member.qualificationsEn}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 border-r border-zinc-200 space-y-1">
                    <p className="font-semibold text-emerald-800">
                      {language === "hi" ? member.roleHi : member.roleEn}
                    </p>
                    <span
                      className={`inline-block px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                        member.category === "advisory_board"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {member.category === "advisory_board"
                        ? language === "hi"
                          ? "सलाहकार बोर्ड"
                          : "Advisory Board"
                        : language === "hi"
                        ? "कार्यकारी परिषद"
                        : "Executive Council"}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-r border-zinc-200 text-zinc-700 leading-relaxed">
                    {language === "hi"
                      ? member.institutionHi
                      : member.institutionEn}
                  </td>
                  <td className="px-4 py-3 text-right space-y-1.5">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center justify-end gap-1 text-[11px] font-mono text-emerald-700 hover:underline block"
                      >
                        <Mail className="w-3 h-3" />
                        <span>{member.email}</span>
                      </a>
                    )}
                    <button
                      onClick={() => setActiveMember(member)}
                      className="px-2.5 py-1 bg-zinc-900 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider transition-colors"
                    >
                      {language === "hi" ? "पूरा प्रोफ़ाइल" : "Full Bio"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detailed Member Bio Modal */}
      <AnimatePresence>
        {activeMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white border border-zinc-300 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl rounded-sm flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-zinc-900 text-white p-5 sm:p-6 flex items-start justify-between gap-4 sticky top-0 z-20 border-b border-zinc-800">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-20 bg-zinc-800 border border-zinc-700 overflow-hidden shrink-0">
                    <Image
                      src={activeMember.image}
                      alt={activeMember.nameEn}
                      fill
                      className="object-cover object-top"
                      sizes="64px"
                    />
                  </div>
                  <div className="space-y-1">
                    <span
                      className={`inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                        activeMember.category === "advisory_board"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      }`}
                    >
                      {activeMember.category === "advisory_board"
                        ? language === "hi"
                          ? "सलाहकार बोर्ड सदस्य"
                          : "Advisory Board Member"
                        : language === "hi"
                        ? "कार्यकारी परिषद सदस्य"
                        : "Executive Council Member"}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                      {language === "hi"
                        ? activeMember.nameHi
                        : activeMember.nameEn}
                    </h3>
                    <p className="text-xs font-medium text-emerald-400">
                      {language === "hi"
                        ? activeMember.roleHi
                        : activeMember.roleEn}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveMember(null)}
                  className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors rounded-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 font-sans text-xs sm:text-sm text-zinc-700">
                {/* Institution & Contact Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-50 border border-zinc-200 p-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                      {language === "hi" ? "संस्थान / संगठन" : "Institution / University"}
                    </span>
                    <p className="font-semibold text-zinc-900 leading-snug">
                      {language === "hi"
                        ? activeMember.institutionHi
                        : activeMember.institutionEn}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                      {language === "hi" ? "संपर्क विवरण" : "Contact Details"}
                    </span>
                    <div className="space-y-1 font-mono text-xs">
                      {activeMember.email && (
                        <a
                          href={`mailto:${activeMember.email}`}
                          className="flex items-center gap-2 text-emerald-700 hover:underline"
                        >
                          <Mail className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{activeMember.email}</span>
                        </a>
                      )}
                      {activeMember.phone && (
                        <div className="flex items-center gap-2 text-zinc-700">
                          <Phone className="w-3.5 h-3.5 text-zinc-500" />
                          <span>{activeMember.phone}</span>
                        </div>
                      )}
                      {activeMember.vidwanId && (
                        <a
                          href={`https://${activeMember.vidwanId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sky-700 hover:underline font-sans"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-sky-600" />
                          <span>Vidwan Profile</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Qualifications & Experience */}
                {(activeMember.qualificationsEn || activeMember.experienceEn) && (
                  <div className="flex flex-wrap items-center gap-3">
                    {activeMember.qualificationsEn && (
                      <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-emerald-900">
                        <GraduationCap className="w-4 h-4 text-emerald-700 shrink-0" />
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700 block">
                            {language === "hi" ? "शैक्षणिक योग्यता" : "Qualifications"}
                          </span>
                          <span className="font-semibold text-xs">
                            {language === "hi"
                              ? activeMember.qualificationsHi
                              : activeMember.qualificationsEn}
                          </span>
                        </div>
                      </div>
                    )}

                    {activeMember.experienceEn && (
                      <div className="flex items-center gap-2 bg-zinc-100 border border-zinc-200 px-3 py-1.5 text-zinc-900">
                        <Briefcase className="w-4 h-4 text-zinc-700 shrink-0" />
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 block">
                            {language === "hi" ? "अनुभव" : "Experience"}
                          </span>
                          <span className="font-semibold text-xs font-mono">
                            {language === "hi"
                              ? activeMember.experienceHi
                              : activeMember.experienceEn}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Profile Overview / Bio */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-l-3 border-emerald-600 pl-2">
                    {language === "hi"
                      ? "प्रोफ़ाइल का संक्षिप्त विवरण"
                      : "Detailed Profile Overview"}
                  </h4>
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-700 text-justify bg-white border border-zinc-200 p-4">
                    {language === "hi" ? activeMember.bioHi : activeMember.bioEn}
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-zinc-50 border-t border-zinc-200 p-4 flex items-center justify-between gap-4 mt-auto">
                <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>
                    {language === "hi"
                      ? "राष्ट्रीय सामाजिक एवं संस्थागत हितधारक"
                      : "Official Executive Council Record"}
                  </span>
                </div>
                <button
                  onClick={() => setActiveMember(null)}
                  className="px-4 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold transition-colors"
                >
                  {language === "hi" ? "बंद करें" : "Close"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
