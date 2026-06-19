"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Code,
  Coins,
  FileText,
  Globe,
  HelpCircle,
  Info,
  Lightbulb,
  Rocket,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

// Key Initiatives data — based on real MoE Innovation Cell programmes
const INITIATIVES = [
  {
    title: "Smart India Hackathon (SIH)",
    description: "One of the world's largest open innovation platforms. Students solve real problem statements from Central Ministries, State Governments, PSUs, and industries for cash prizes and pilot opportunities.",
    focus: ["Government & industry problem statements", "24x7 hackathon format with ₹1 Lakh+ prizes", "Direct pilot pathway with ministries & PSUs"],
    badge: "Flagship Programme",
  },
  {
    title: "Institution's Innovation Council (IIC)",
    description: "Pan-India network of institutional innovation bodies in HEIs, coordinated by MoE Innovation Cell and AICTE. IICs foster innovation culture through structured annual activity calendars.",
    focus: ["16,000+ active IICs across India", "Annual star-rating (1–5 stars) performance system", "Hackathons, workshops & idea competitions"],
    badge: "Core Network",
  },
  {
    title: "KAPILA (Kalam Program for IP Literacy)",
    description: "A national initiative to spread Intellectual Property (IP) awareness and support patent filing in HEIs. Faculty and students are trained to file patents and protect innovations.",
    focus: ["IP literacy workshops in IIC institutions", "Patent filing fee support for faculty & students", "National IP awareness calendar"],
    badge: "IP & Patents",
  },
  {
    title: "YUKTI National Innovation Repository",
    description: "A digital platform and national database to scout, register, and mentor promising innovations and startups emerging from academic institutions across India.",
    focus: ["1,00,000+ innovations scouted & registered", "10,000+ student startups mentored", "Connects innovators with investors & incubators"],
    badge: "Innovation Repository",
  },
  {
    title: "IDE Bootcamp & Innovation Programs",
    description: "Innovation, Design, and Entrepreneurship (IDE) bootcamps designed to nurture early-stage student innovators with design thinking, prototyping, and business modeling skills.",
    focus: ["Residential bootcamps at IITs & IIMs", "Mentoring by industry experts & serial entrepreneurs", "Seed funding access for top bootcamp teams"],
    badge: "Skill Development",
  },
  {
    title: "Udyamotsav & NISP Implementation",
    description: "Udyamotsav supports and promotes startups from academic institutions. The National Innovation and Start-up Policy (NISP) mandates every HEI to build structural startup support.",
    focus: ["NISP mandated in all HEIs & IICs", "Startup support: pre-incubation to commercialisation", "Annual Udyamotsav startup showcase event"],
    badge: "Policy & Startups",
  },
];

// IIC Journey Steps — based on actual MoE Innovation Cell process
const JOURNEY_STEPS = [
  {
    phase: "01",
    title: "Register IIC",
    description: "Higher Education Institution nominates a SPOC (Single Point of Contact) and registers the Institution's Innovation Council on the IIC portal at iic.mic.gov.in.",
    action: "Register on IIC Portal",
  },
  {
    phase: "02",
    title: "Annual Activity Calendar",
    description: "IIC conducts mandatory annual activities: idea competitions, hackathons, workshops, guest lectures, and innovation exhibitions to earn activity points.",
    action: "View Activity Calendar",
  },
  {
    phase: "03",
    title: "Star Rating Evaluation",
    description: "MoE Innovation Cell evaluates IIC performance annually on a 1–5 star rating system based on activities, startups supported, IP filed, and innovations scouted.",
    action: "Submit Annual Report",
  },
  {
    phase: "04",
    title: "YUKTI & SIH Participation",
    description: "Top-performing IICs participate in Smart India Hackathon, register innovations on YUKTI, and access seed funding, mentoring, and national incubation linkages.",
    action: "Apply for SIH & YUKTI",
  },
];

// Vision 2047 Milestones — real MoE / Viksit Bharat roadmap
const VISION_MILESTONES = [
  {
    year: "2026",
    title: "IIC 6.0 Full Rollout",
    description: "Scale IIC network to 20,000+ institutions; complete IIC 6.0 annual activity calendar rollout; operationalise KAPILA IP awareness in all member HEIs.",
  },
  {
    year: "2030",
    title: "1 Lakh Startups Goal",
    description: "Convert 1,00,000+ YUKTI-registered innovations into funded prototypes; establish 10,000 operational incubation facilities across India.",
  },
  {
    year: "2040",
    title: "Deep-Tech Export Leadership",
    description: "Achieve India's top-5 global innovation ranking; 50,000+ active student startups; significant international IP filings in AI, green energy, and civic-tech.",
  },
  {
    year: "2047",
    title: "Viksit Bharat @2047",
    description: "A fully self-reliant innovation economy with 1 Lakh student-led enterprises aligned with NEP 2020 — making India the global capital of student innovation.",
  },
];

// Official Bulletins — real MIC/MoE circular reference format
const CIRCULARS = [
  {
    id: "MIC-INT-2026-001",
    date: "June 18, 2026",
    title: "Internship Registrations Open: Innovational & Technology Management and AI Business & Startup Innovation",
    description: "Registrations are now open for course-integrated internships under the engineering and technology domain. One-time registration fee: ₹700 per course.",
    category: "Applications",
  },
  {
    id: "MIC-IIC-2025-147",
    date: "June 10, 2025",
    title: "IIC 6.0 Annual Activity Calendar 2025-26 Released",
    description: "MoE Innovation Cell has released the IIC 6.0 mandatory activity calendar for 2025-26. All registered IIC SPOCs must acknowledge and begin scheduling activities on the IIC portal.",
    category: "IIC Activities",
  },
  {
    id: "MIC-SIH-2025-089",
    date: "May 22, 2025",
    title: "Smart India Hackathon 2025 — Problem Statements Open",
    description: "Ministry departments, PSUs, and industry partners have submitted 250+ problem statements for SIH 2025. Student teams from IIC-registered institutions can apply via the SIH portal.",
    category: "Hackathon",
  },
  {
    id: "MIC-KAPILA-2025-063",
    date: "April 15, 2025",
    title: "KAPILA Patent Filing Awareness Drive Q2 2025",
    description: "KAPILA Q2 workshops scheduled across 500+ IIC institutions. Faculty and students can register for IP literacy sessions and receive patent filing fee reimbursement support.",
    category: "IP & Patents",
  },
  {
    id: "MIC-YUKTI-2025-041",
    date: "March 28, 2025",
    title: "YUKTI 3.0 — National Innovation Repository Update",
    description: "YUKTI 3.0 launches enhanced startup profiling, investor connect portal, and state-wise innovation leaderboard. IICs must migrate all registered innovations to the new dashboard.",
    category: "Repository",
  },
];

export default function Home() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");
  const noticeRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

  // Tab mapping keys
  const tabLabels: Record<string, string> = {
    all: "notice_tab_all",
    Applications: "notice_tab_applications",
    "Policy Docs": "notice_tab_policy_docs",
    Fellowships: "notice_tab_fellowships",
  };

  // Category translation keys mapping
  const categoryTranslations: Record<string, string> = {
    "Applications": "notice_cat_applications",
    "IIC Activities": "notice_cat_iic_activities",
    "Hackathon": "notice_cat_hackathon",
    "IP & Patents": "notice_cat_ip_patents",
    "Repository": "notice_cat_repository",
  };

  // Localize circulars dynamically based on current language
  const localizedCirculars = CIRCULARS.map(c => {
    const keyPrefix = `circular_${c.id.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
    return {
      ...c,
      title: t(`${keyPrefix}_title`) || c.title,
      description: t(`${keyPrefix}_desc`) || c.description,
      date: t(`${keyPrefix}_date`) || c.date,
    };
  });

  const filteredCirculars = activeTab === "all"
    ? localizedCirculars
    : localizedCirculars.filter(c => c.category === activeTab);

  // Pad to at least 4 items per half so content always overflows the 320px container
  const scrollItems = (() => {
    if (filteredCirculars.length === 0) return [];
    const result = [];
    while (result.length < 4) result.push(...filteredCirculars);
    return result;
  })();

  // Auto-scroll with requestAnimationFrame
  useEffect(() => {
    const el = noticeRef.current;
    if (!el) return;
    el.scrollTop = 0;
    let last = 0;

    const tick = (time: number) => {
      if (!pausedRef.current && el) {
        const dt = last ? time - last : 0;
        el.scrollTop += dt * 0.038; // ~38px/s
        if (el.scrollTop >= el.scrollHeight / 2) {
          el.scrollTop = 0;
        }
      }
      last = time;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const onEnter = () => { pausedRef.current = true; };
    const onLeave = () => { pausedRef.current = false; };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [activeTab]);

  // Localize benchmarks dynamically
  const localizedBenchmarks = [
    { label: "Student Innovators", value: "Founding Cohort", desc: "First-round application verification currently active for student innovators cataloged in database.", state: "Verification Desk" },
    { label: "College Chapters", value: "Expanding Network", desc: "Academic chapter affiliation verification and handbook alignment across STEM colleges.", state: "Chapter Roster" },
    { label: "Innovation Schemes", value: "Launching Soon", desc: "Initial micro-grants disbursement approvals and incubator matching programs setup.", state: "Scheme Sandbox" },
    { label: "Enterprise Pipelines", value: "Coming Soon", desc: "Direct avenues configuration to seed capital pools and startup accelerators.", state: "Capital Pool" },
  ].map((item, idx) => ({
    label: t(`home_benchmark_${idx}_label`) || item.label,
    value: t(`home_benchmark_${idx}_value`) || item.value,
    desc: t(`home_benchmark_${idx}_desc`) || item.desc,
    state: t(`home_benchmark_${idx}_state`) || item.state,
  }));

  // Localize initiatives dynamically
  const localizedInitiatives = INITIATIVES.map((item, idx) => ({
    title: t(`home_initiative_${idx}_title`) || item.title,
    description: t(`home_initiative_${idx}_desc`) || item.description,
    focus: item.focus.map((point, pIdx) => t(`home_initiative_${idx}_focus_${pIdx}`) || point),
    badge: t(`home_initiative_${idx}_badge`) || item.badge,
  }));

  // Localize journey steps dynamically
  const localizedJourneySteps = JOURNEY_STEPS.map((step, idx) => ({
    ...step,
    title: t(`home_journey_${idx}_title`) || step.title,
    description: t(`home_journey_${idx}_desc`) || step.description,
    action: t(`home_journey_${idx}_action`) || step.action,
  }));

  // Localize vision milestones dynamically
  const localizedVisionMilestones = VISION_MILESTONES.map((milestone, idx) => ({
    ...milestone,
    title: t(`home_vision_${idx}_title`) || milestone.title,
    description: t(`home_vision_${idx}_desc`) || milestone.description,
  }));

  return (
    <div className="flex-1 bg-[#F9FAFB] pb-16">
      
      {/* 1. Official News Flash Bar (Scrolling Marquee) */}
      <div className="bg-[#074733] text-white border-b border-primary/20 text-xs py-2 px-4 sm:px-6 lg:px-8 overflow-hidden z-25 relative font-sans">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <span className="flex items-center gap-1 bg-[#C9A24B] text-zinc-950 font-bold px-2.5 py-0.5 rounded text-[10px] uppercase tracking-wider shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 inline-block" />
            <span>{t("home_latest_news")}</span>
          </span>
          <div className="overflow-hidden relative w-full">
            <div className="flex gap-12 whitespace-nowrap animate-marquee" aria-live="off">
              <span className="text-zinc-100">{t("home_news_1")}</span>
              <span className="text-zinc-100">{t("home_news_2")}</span>
              <span className="text-zinc-100">{t("home_news_3")}</span>
              {/* Duplicate for seamless loop */}
              <span className="text-zinc-100" aria-hidden>{t("home_news_1")}</span>
              <span className="text-zinc-100" aria-hidden>{t("home_news_2")}</span>
              <span className="text-zinc-100" aria-hidden>{t("home_news_3")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Course & Internship Highlights Banner */}
      <div className="bg-gradient-to-r from-[#074733] via-[#0A5D45] to-[#0D6B4F] text-white py-4 px-4 sm:px-6 lg:px-8 border-b border-[#C9A24B]/35">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <div>
              <p className="text-xs font-bold text-[#C9A24B] uppercase tracking-wider">{t("banner_active_drive")}</p>
              <h2 className="text-sm sm:text-base font-extrabold tracking-tight">
                {t("banner_title")}
              </h2>
              <p className="text-xs text-emerald-100/80 mt-0.5 font-sans">
                {t("banner_desc")}<strong className="text-white font-bold">₹700</strong>.
              </p>
            </div>
          </div>
          <Link href="/join?role=internship" className="shrink-0 w-full md:w-auto">
            <button className="w-full md:w-auto bg-[#C9A24B] hover:bg-[#A68034] text-zinc-950 hover:text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 transition-all shadow-md inline-flex items-center justify-center gap-1.5 cursor-pointer">
              <span>{t("banner_register_now")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>
      </div>

      {/* 2. Hero Section */}
      <section className="relative border-b border-zinc-200 bg-white pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Official Welcome & Mission Statement */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-zinc-900 leading-tight">
                {t("home_hero_title_1")}{" "}
                <span className="text-[#0D6B4F]">{t("home_hero_title_2")}</span>{" "}
                <span className="text-[#A68034]">{t("home_hero_title_3")}</span>
              </h1>
              
              <p className="text-sm text-zinc-700 leading-relaxed text-justify font-sans">
                {t("home_hero_desc")}
              </p>

              {/* Quick Directories / Access Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="border border-zinc-200 p-4 bg-zinc-50/50 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-zinc-200 pb-2">
                      <UserCheck className="w-4.5 h-4.5 text-primary" />
                      <span>{t("home_chapter_dir")}</span>
                    </h3>
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                      {t("home_chapter_desc")}
                    </p>
                  </div>
                  <Link href="/chapters" className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-1 mt-4">
                    <span>{t("home_search_chapters")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="border border-zinc-200 p-4 bg-zinc-50/50 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-zinc-200 pb-2">
                      <FileText className="w-4.5 h-4.5 text-primary" />
                      <span>{t("home_schemes_reg")}</span>
                    </h3>
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                      {t("home_schemes_desc")}
                    </p>
                  </div>
                  <Link href="/programs" className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-1 mt-4">
                    <span>{t("home_view_schemes")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
                <Link href="/join" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-[#0D6B4F] hover:bg-[#074733] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 transition-colors cursor-pointer">
                    {t("home_btn_apply")}
                  </button>
                </Link>
                <Link href="/about" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto border border-zinc-300 hover:bg-zinc-50 text-zinc-700 font-bold text-xs uppercase tracking-wider px-6 py-3.5 transition-colors cursor-pointer">
                    {t("home_btn_profile")}
                  </button>
                </Link>
              </div>

              <div className="flex items-center gap-2 pt-2 text-[10px] sm:text-xs text-zinc-550 font-medium">
                <Info className="w-4.5 h-4.5 text-zinc-400 shrink-0" />
                <span>{t("home_footer_info")}</span>
              </div>
            </div>

            {/* Right Column: Official Notice Board */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-white border border-zinc-200">
                {/* Notice Board Header */}
                <div className="bg-zinc-100 px-5 py-3.5 border-b border-zinc-200 flex items-center justify-between">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-800 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <span>{t("notice_title")}</span>
                  </h2>
                  <span className="bg-[#0D6B4F] text-white text-[9px] font-bold px-2 py-0.5 font-mono">{t("notice_desk")}</span>
                </div>

                {/* Filter Tabs */}
                <div className="flex border-b border-zinc-200 text-[10px] sm:text-xs bg-zinc-50 font-semibold">
                  {["all", "Applications", "Policy Docs", "Fellowships"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-2 px-1 text-center border-b-2 transition-all cursor-pointer ${
                        activeTab === tab
                          ? "border-primary text-primary font-bold bg-white"
                          : "border-transparent text-zinc-500 hover:text-zinc-800"
                      }`}
                    >
                      {t(tabLabels[tab])}
                    </button>
                  ))}
                </div>

                {/* Notice List */}
                <div
                  ref={noticeRef}
                  className="relative divide-y divide-zinc-200 bg-white"
                  style={{ height: 320, overflowY: "hidden" }}
                >
                  {scrollItems.map((doc, i) => (
                    <div key={`a-${i}-${doc.id}`} className="p-4 hover:bg-zinc-50/50 transition-colors">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[9px] font-mono text-zinc-400 font-bold">{doc.id}</span>
                        <span className="text-primary text-[9px] font-bold uppercase tracking-wider border border-primary/20 px-1.5 py-0.2 rounded font-sans">
                          {t(categoryTranslations[doc.category] || doc.category)}
                        </span>
                      </div>
                      <Link href="/media" className="text-xs font-bold text-zinc-850 hover:text-primary transition-colors block hover:underline leading-snug">
                        {doc.title}
                      </Link>
                      <p className="text-[11px] text-zinc-500 leading-relaxed mt-1 line-clamp-2">{doc.description}</p>
                      <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-dashed border-zinc-200 text-[10px]">
                        <span className="text-zinc-400 font-medium">{doc.date}</span>
                        <Link href="/media" className="text-primary hover:text-accent-dark font-bold flex items-center gap-0.5">
                          <span>{t("notice_view_circular")}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                  {/* Duplicate */}
                  {scrollItems.map((doc, i) => (
                    <div key={`b-${i}-${doc.id}`} aria-hidden className="p-4 hover:bg-zinc-50/50 transition-colors">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[9px] font-mono text-zinc-400 font-bold">{doc.id}</span>
                        <span className="text-primary text-[9px] font-bold uppercase tracking-wider border border-primary/20 px-1.5 py-0.2 rounded font-sans">
                          {t(categoryTranslations[doc.category] || doc.category)}
                        </span>
                      </div>
                      <Link href="/media" className="text-xs font-bold text-zinc-850 hover:text-primary transition-colors block hover:underline leading-snug">
                        {doc.title}
                      </Link>
                      <p className="text-[11px] text-zinc-500 leading-relaxed mt-1 line-clamp-2">{doc.description}</p>
                      <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-dashed border-zinc-200 text-[10px]">
                        <span className="text-zinc-400 font-medium">{doc.date}</span>
                        <Link href="/media" className="text-primary hover:text-accent-dark font-bold flex items-center gap-0.5">
                          <span>{t("notice_view_circular")}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                  {/* Fade */}
                  <div className="sticky bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                </div>

                {/* Notice Footer */}
                <div className="bg-zinc-50 px-4 py-3 border-t border-zinc-200 text-center">
                  <Link href="/media" className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-1">
                    <span>{t("notice_access_archive")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. National Impact Indicators Dashboard */}
      <section className="py-16 bg-[#F9FAFB] border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-zinc-200 p-6 md:p-8">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-zinc-200">
              <div className="border-l-4 border-primary pl-3">
                <h2 className="text-base font-bold text-zinc-900 uppercase tracking-wider">{t("home_benchmarks_title")}</h2>
                <p className="text-[10px] text-zinc-500 font-medium uppercase mt-0.5 tracking-wider">{t("home_benchmarks_subtitle")}</p>
              </div>
              <span className="inline-flex items-center gap-1 text-[#0D6B4F] font-bold text-[10px] uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5" />
                <span>{t("home_benchmarks_active")}</span>
              </span>
            </div>

            {/* Benchmarks Structured Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-zinc-200">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-200">
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-48">{t("home_benchmarks_col_metric")}</th>
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-40">{t("home_benchmarks_col_status")}</th>
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200">{t("home_benchmarks_col_scope")}</th>
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 w-40">{t("home_benchmarks_col_desk")}</th>
                  </tr>
                </thead>
                <tbody>
                  {localizedBenchmarks.map((item, idx) => (
                    <tr key={idx} className="border-b border-zinc-200 last:border-b-0 hover:bg-zinc-50/50 odd:bg-white even:bg-zinc-50/20 text-xs">
                      <td className="px-4 py-3.5 text-zinc-900 font-bold border-r border-zinc-200">{item.label}</td>
                      <td className="px-4 py-3.5 font-mono text-[#0D6B4F] font-bold border-r border-zinc-200">{item.value}</td>
                      <td className="px-4 py-3.5 text-zinc-600 leading-relaxed border-r border-zinc-200">{item.desc}</td>
                      <td className="px-4 py-3.5 font-mono font-bold text-zinc-500 uppercase">{item.state}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Core Schemes & Initiatives Directory */}
      <section className="py-16 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
              {t("home_initiatives_title")}
            </h2>
            <div className="w-12 h-0.5 bg-accent mx-auto mt-3 mb-2" />
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed mt-2">
              {t("home_initiatives_subtitle")}
            </p>
          </div>

          {/* Initiatives Directory Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-zinc-200">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200">
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-16 text-center">{t("home_initiatives_col_sno")}</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-64">{t("home_initiatives_col_name")}</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200">{t("home_initiatives_col_details")}</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 w-44">{t("home_initiatives_col_track")}</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 w-44 text-center">{t("home_initiatives_col_action")}</th>
                </tr>
              </thead>
              <tbody>
                {localizedInitiatives.map((item, idx) => (
                  <tr key={idx} className="border-b border-zinc-200 last:border-b-0 hover:bg-zinc-50/50 odd:bg-white even:bg-zinc-50/20 text-xs">
                    <td className="px-4 py-4 text-center font-mono font-bold text-zinc-500 border-r border-zinc-200">0{idx + 1}</td>
                    <td className="px-4 py-4 border-r border-zinc-200">
                      <div className="font-bold text-zinc-900">{item.title}</div>
                      <div className="text-[10px] text-zinc-400 mt-1 leading-relaxed">{item.description}</div>
                    </td>
                    <td className="px-4 py-4 border-r border-zinc-200 text-zinc-650 leading-relaxed">
                      <ul className="list-disc list-inside space-y-1">
                        {item.focus.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-4 border-r border-zinc-200 font-mono font-bold uppercase text-zinc-500">{item.badge}</td>
                    <td className="px-4 py-4 text-center">
                      <Link href="/programs" className="text-primary hover:underline font-bold inline-flex items-center gap-0.5">
                        <span>{t("home_initiatives_btn_guidelines")}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* 5. The Innovation Lifecycle Stepper (Horizontal Stepper Table) */}
      <section className="py-16 bg-[#F9FAFB] border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
              {t("home_journey_title")}
            </h2>
            <div className="w-12 h-0.5 bg-primary mx-auto mt-3 mb-2" />
            <p className="text-xs sm:text-sm text-zinc-500 mt-2">
              {t("home_journey_subtitle")}
            </p>
          </div>

          <div className="overflow-x-auto bg-white border border-zinc-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-xs">
                  <th className="px-6 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-24 text-center">{t("home_journey_col_step")}</th>
                  <th className="px-6 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-52">{t("home_journey_col_phase")}</th>
                  <th className="px-6 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200">{t("home_journey_col_desc")}</th>
                  <th className="px-6 py-3 font-bold uppercase tracking-wider text-zinc-700 w-52">{t("home_journey_col_action")}</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {localizedJourneySteps.map((step, index) => (
                  <tr key={index} className="border-b border-zinc-200 last:border-b-0 hover:bg-zinc-50/50 odd:bg-white even:bg-zinc-50/20">
                    <td className="px-6 py-4 font-mono font-bold text-center border-r border-zinc-200">
                      <span className="inline-block px-2 py-1 bg-zinc-100 border border-zinc-300 font-bold text-zinc-700 text-[10px]">
                        {step.phase}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-zinc-900 border-r border-zinc-200 uppercase tracking-wide">
                      {step.title}
                    </td>
                    <td className="px-6 py-4 text-zinc-600 leading-relaxed border-r border-zinc-200">
                      {step.description}
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-[11px] font-bold text-primary hover:text-accent-dark hover:underline flex items-center justify-between gap-1.5 w-full uppercase tracking-wider cursor-pointer">
                        <span>{step.action}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* 6. Vision 2047: National Milestones Dashboard */}
      <section className="py-16 border-b border-zinc-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-4 space-y-4">
              <span className="inline-flex items-center gap-1 text-[#A68034] font-bold text-[10px] uppercase tracking-wider">
                <Award className="w-3 h-3" />
                <span>{t("home_vision_badge")}</span>
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 leading-tight">
                {t("home_vision_title")}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
                {t("home_vision_desc")}
              </p>
              <div className="pt-2">
                <Link href="/vision-2047">
                  <button className="border border-zinc-300 hover:bg-zinc-50 text-zinc-700 font-bold text-xs uppercase tracking-wider px-5 py-2.5 cursor-pointer">
                    {t("home_vision_btn")}
                  </button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-8 w-full">
              <div className="bg-white border border-zinc-200 overflow-hidden">
                <table className="min-w-full divide-y divide-zinc-200">
                  <thead className="bg-zinc-50 text-xs">
                    <tr>
                      <th scope="col" className="px-6 py-3.5 text-left font-bold uppercase tracking-wider w-24 border-r border-zinc-200 text-zinc-700">{t("home_vision_col_phase")}</th>
                      <th scope="col" className="px-6 py-3.5 text-left font-bold uppercase tracking-wider w-48 border-r border-zinc-200 text-zinc-700">{t("home_vision_col_target")}</th>
                      <th scope="col" className="px-6 py-3.5 text-left font-bold uppercase tracking-wider text-zinc-700">{t("home_vision_col_desc")}</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-zinc-200 text-xs">
                    {localizedVisionMilestones.map((milestone) => (
                      <tr key={milestone.year} className="hover:bg-zinc-50/50 odd:bg-white even:bg-zinc-50/20">
                        <td className="px-6 py-4 font-mono font-bold text-accent-dark whitespace-nowrap bg-zinc-50/20 border-r border-zinc-200 text-center">
                          {milestone.year}
                        </td>
                        <td className="px-6 py-4 font-bold text-zinc-950 whitespace-normal border-r border-zinc-200 leading-snug">
                          {milestone.title}
                        </td>
                        <td className="px-6 py-4 text-zinc-600 whitespace-normal leading-relaxed text-justify">
                          {milestone.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. Help & Support / FAQs Quick Desk */}
      <section className="py-16 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-zinc-200 p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              
              <div className="md:col-span-2 space-y-2">
                <div className="flex items-center gap-2 text-primary border-l-4 border-primary pl-3">
                  <HelpCircle className="w-5 h-5 text-accent-dark" />
                  <h3 className="text-base font-bold uppercase tracking-wider text-zinc-900">{t("home_support_title")}</h3>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed pl-4">
                  {t("home_support_desc")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <Link href="/contact" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto border border-zinc-300 hover:bg-zinc-50 text-zinc-700 font-bold text-xs uppercase tracking-wider px-5 py-3 cursor-pointer text-center">
                    {t("home_support_btn_contact")}
                  </button>
                </Link>
                <Link href="/join" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-[#0D6B4F] hover:bg-[#074733] text-white font-bold text-xs uppercase tracking-wider px-5 py-3 cursor-pointer text-center">
                    {t("home_support_btn_query")}
                  </button>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
