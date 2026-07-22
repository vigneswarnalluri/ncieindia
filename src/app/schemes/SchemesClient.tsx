"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  SCHEMES_DATA,
  GOVERNMENT_PORTALS,
  SchemeItem,
} from "@/data/schemesData";

type CategoryFilter =
  | "all"
  | "initiatives"
  | "loans"
  | "scholarships"
  | "entrepreneurship"
  | "women-rural"
  | "resources";

export default function SchemesClient() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedScheme, setSelectedScheme] = useState<SchemeItem | null>(null);

  // Filter schemes by active category and search query
  const filteredSchemes = useMemo(() => {
    return SCHEMES_DATA.filter((scheme) => {
      const matchesCategory =
        activeCategory === "all" || scheme.category === activeCategory;
      const matchesSearch =
        scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.highlights.some((h) =>
          h.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const categories: { id: CategoryFilter; label: string; count: number }[] = [
    { id: "all", label: "All Schemes", count: SCHEMES_DATA.length },
    {
      id: "initiatives",
      label: "Government Initiatives",
      count: SCHEMES_DATA.filter((s) => s.category === "initiatives").length,
    },
    {
      id: "loans",
      label: "Student Loans & Finance",
      count: SCHEMES_DATA.filter((s) => s.category === "loans").length,
    },
    {
      id: "scholarships",
      label: "Scholarships Hub",
      count: SCHEMES_DATA.filter((s) => s.category === "scholarships").length,
    },
    {
      id: "entrepreneurship",
      label: "Innovation & Startup",
      count: SCHEMES_DATA.filter((s) => s.category === "entrepreneurship").length,
    },
    {
      id: "women-rural",
      label: "Women & Rural",
      count: SCHEMES_DATA.filter((s) => s.category === "women-rural").length,
    },
    {
      id: "resources",
      label: "Startup Resources",
      count: SCHEMES_DATA.filter((s) => s.category === "resources").length,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Hero Header Banner */}
      <section className="relative bg-gradient-to-br from-[#04281E] via-[#063B2C] via-[#0D6B4F] to-[#041d16] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b-4 border-emerald-500">
        {/* Subtle Ambient Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
              Government of India &amp; State Schemes Facilitation
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white"
          >
            Government Schemes &amp; Student Support
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-emerald-100/90 max-w-3xl mx-auto leading-relaxed mb-8"
          >
            A dedicated single-window awareness and facilitation portal connecting students, researchers, and entrepreneurs with genuine Central &amp; State Government initiatives, education loans, scholarships, and startup seed funding.
          </motion.p>

          {/* Interactive Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto relative"
          >
            <div className="relative flex items-center">
              <svg
                className="w-5 h-5 absolute left-4 text-emerald-300 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search schemes (e.g., Startup India, Vidya Lakshmi, Mudra, NSP, AICTE)..."
                className="w-full pl-12 pr-10 py-4 rounded-xl bg-white/15 text-white placeholder-emerald-200/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white/20 backdrop-blur-md shadow-xl text-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 text-emerald-200 hover:text-white text-xs font-bold"
                >
                  CLEAR
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Official NCIE Facilitation Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 sm:p-5 rounded-r-xl shadow-md bg-white backdrop-blur-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            <strong className="text-slate-900 font-bold">Important Facilitation Disclaimer:</strong>{" "}
            NCIE India provides awareness, mentoring, guidance, and facilitation regarding various Government of India and State Government schemes. NCIE does not directly sanction, approve, or disburse government loans, grants, or subsidies. All schemes are administered directly by their respective ministries, departments, banks, and official government portals.
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-slate-200 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold tracking-wide transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#063B2C] text-white shadow-md shadow-emerald-950/20"
                  : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeCategory === cat.id
                    ? "bg-emerald-400 text-emerald-950"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Schemes Cards Grid */}
        {filteredSchemes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <svg
              className="w-12 h-12 text-slate-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              No matching schemes found
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Try searching with different keywords like &quot;Mudra&quot;, &quot;Scholarship&quot;, or &quot;Vidya Lakshmi&quot;.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredSchemes.map((scheme) => (
              <motion.div
                key={scheme.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
              >
                <div>
                  {/* Scheme Header with Official Scheme Logo */}
                  <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 mb-2">
                        {scheme.ministry}
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                        {scheme.title}
                      </h3>
                      <p className="text-xs font-medium text-slate-500 mt-1 line-clamp-1">
                        {scheme.subtitle}
                      </p>
                    </div>

                    {/* Official Scheme Logo Badge */}
                    <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 shadow-sm p-2 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Image
                        src={scheme.logo}
                        alt={`${scheme.title} Official Logo`}
                        width={56}
                        height={56}
                        className="w-full h-full object-contain"
                        unoptimized
                      />
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="p-6 space-y-3">
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {scheme.overview}
                    </p>

                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Key Highlights
                    </h4>
                    <ul className="space-y-2">
                      {scheme.highlights.slice(0, 3).map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs text-slate-700"
                        >
                          <svg
                            className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="line-clamp-2">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => setSelectedScheme(scheme)}
                    className="w-full py-3 px-4 bg-slate-900 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold tracking-wide transition-colors flex items-center justify-center gap-2 group/btn cursor-pointer shadow-sm"
                  >
                    <span>VIEW DETAILS &amp; APPLY</span>
                    <svg
                      className="w-4 h-4 text-emerald-400 group-hover/btn:text-white transform group-hover/btn:translate-x-1 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Quick Access Official Government Portals Section */}
        <div className="mt-20 pt-12 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              Direct National Links
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              Official Government Portals
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Direct quick-access links to verify eligibility, submit official applications, and track government disbursements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GOVERNMENT_PORTALS.map((portal, idx) => (
              <a
                key={idx}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:border-emerald-500"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 p-2 mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Image
                      src={portal.logo}
                      alt={portal.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                      unoptimized
                    />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                    <span>{portal.name}</span>
                    <svg
                      className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {portal.description}
                  </p>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 mt-4 inline-flex items-center gap-1">
                  Visit Portal &rarr;
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scheme Detail Modal Dialog */}
      <AnimatePresence>
        {selectedScheme && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedScheme(null)}
              className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 sm:p-8 bg-gradient-to-r from-[#04281E] to-[#0D6B4F] text-white flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white p-2 shrink-0 border border-white/20 shadow-md">
                    <Image
                      src={selectedScheme.logo}
                      alt={selectedScheme.title}
                      width={56}
                      height={56}
                      className="w-full h-full object-contain"
                      unoptimized
                    />
                  </div>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-400 text-emerald-950 mb-1">
                      {selectedScheme.ministry}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold">
                      {selectedScheme.title}
                    </h2>
                    <p className="text-xs text-emerald-100 mt-1">
                      {selectedScheme.subtitle}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedScheme(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center shrink-0 transition-colors"
                >
                  &times;
                </button>
              </div>

              {/* Modal Content Scroll Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 text-xs sm:text-sm leading-relaxed">
                {/* Overview */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Scheme Overview
                  </h3>
                  <p className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 text-slate-700 leading-relaxed">
                    {selectedScheme.overview}
                  </p>
                </div>

                {/* Eligibility Criteria */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Eligibility Criteria
                  </h3>
                  <div className="space-y-2">
                    {selectedScheme.eligibility.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200/80"
                      >
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                          ✓
                        </div>
                        <span className="text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Key Financial &amp; Support Benefits
                  </h3>
                  <div className="space-y-2">
                    {selectedScheme.benefits.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 bg-emerald-50/60 p-3 rounded-xl border border-emerald-200/60 text-emerald-950"
                      >
                        <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                          ★
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Application Steps */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Step-by-Step Application Process
                  </h3>
                  <div className="space-y-3">
                    {selectedScheme.applicationSteps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="pt-0.5 text-slate-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-500">
                  Official Portal: <strong className="text-slate-700">{selectedScheme.portalUrl}</strong>
                </span>
                <a
                  href={selectedScheme.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-[#063B2C] hover:bg-emerald-700 text-white rounded-xl text-xs font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>PROCEED TO OFFICIAL GOVT PORTAL</span>
                  <svg
                    className="w-4 h-4 text-emerald-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
