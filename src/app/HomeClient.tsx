"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  ArrowRight,
  Award,
  FileText,
  Globe,
  HelpCircle,
  Info,
  UserCheck,
  X,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Quote,
  Rocket,
  GraduationCap,
  Cpu,
  Factory,
  Users,
  HeartPulse,
  Sprout,
  Compass,
  Layers,
  Search,
  Building2,
  Sparkles,
  TrendingUp,
  Target,
  Briefcase,
  ChevronRight,
  Landmark,
  Scale,
  BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FLAGSHIP_CATEGORIES,
  FLAGSHIP_INITIATIVES,
  FlagshipInitiative,
} from "@/data/flagshipInitiativesData";

// Key Programmes data — directly based on Hero Banner.pdf
const KEY_PROGRAMMES = [
  {
    title: "Startup Seed Funding (Up to ₹25 Crores)",
    description: "Milestone-linked venture scale capital and seed grants providing up to ₹25 Crores to validate and scale breakthrough student and collegiate ventures without requiring ownership dilution.",
    focus: [
      "Up to ₹25 Crores national funding pool",
      "Equity-free grants with zero dilution",
      "Released in milestone-linked execution stages",
    ],
    badge: "Seed Funding",
  },
  {
    title: "Innovation Leadership Programme",
    description: "A structured national leadership framework established across 10 core undergraduate sectors to provide every undergraduate student with practical, real-world industry exposure.",
    focus: [
      "Covers 10 key undergraduate sectors",
      "Hands-on projects and professional exposure",
      "Structured mentoring and academic credit integration",
    ],
    badge: "Leadership Pillar",
  },
  {
    title: "Student Entrepreneurship Development",
    description: "Direct technical and financial support for early-stage student innovators to transform laboratory research and ideas into validated Minimum Viable Products (MVPs).",
    focus: [
      "Direct prototype validation funding",
      "Equity-free support for early ideation",
      "Collegiate chapter innovation sprints & hackathons",
    ],
    badge: "Ideation Grants",
  },
  {
    title: "Women Entrepreneurship Mission",
    description: "A dedicated national mission empowering women researchers, students, and grassroots innovators through tailored seed grants, incubation slots, and leadership networks.",
    focus: [
      "Dedicated women-led startup grants & micro-grants",
      "Specialized mentorship & investor pitch access",
      "Capacity building & institutional incubation linkages",
    ],
    badge: "Women Led",
  },
  {
    title: "MSME & Startup Support",
    description: "End-to-end guidance and institutional backing facilitating DPIIT recognition, patent filing subsidies, Udyam integration, and public procurement market access.",
    focus: [
      "DPIIT & Udyam registration facilitation",
      "Fast-track patent filing & IPR search subsidies",
      "Corporate CSR & vendor procurement linkages",
    ],
    badge: "MSME Scale",
  },
  {
    title: "Incubation & Mentorship",
    description: "Dedicated infrastructure funding ranging from ₹20 Lakhs to ₹50 Lakhs provided to selected institutions to establish rapid prototyping labs, makerspaces, and incubation centres.",
    focus: [
      "Grants between ₹20 Lakhs and ₹50 Lakhs per HEI",
      "State-of-the-art prototyping & innovation labs",
      "Access to national mentor pool & accelerators",
    ],
    badge: "Infrastructure",
  },
];

// IIC Journey Steps — based on Innovation India Council process
const JOURNEY_STEPS = [
  {
    phase: "01",
    title: "Onboard Institution",
    description: "Higher Education Institution registers its student chapter and files alignment with the Innovation India Council framework.",
    action: "Apply for Chapter Affiliation",
    href: "/join?role=institution",
  },
  {
    phase: "02",
    title: "Deliver Free Training",
    description: "Chapter conducts free entrepreneurship training programs, prototyping workshops, and local idea competitions for students.",
    action: "Explore Training Manuals",
    href: "/programs",
  },
  {
    phase: "03",
    title: "Apply for Seed Funding",
    description: "Selected student startup teams pitch and register their ventures to unlock milestone-linked equity-free seed grants.",
    action: "Apply for Seed Capital",
    href: "/schemes",
  },
  {
    phase: "04",
    title: "Build & Scale",
    description: "Startups build MVPs, file patents via the council support desk, and leverage corporate CSR partnerships to scale operations.",
    action: "Access Incubation Network",
    href: "/chapters",
  },
];

// Vision 2047 Milestones — Innovation India Council roadmap
const VISION_MILESTONES = [
  {
    year: "2027",
    title: "NCIE Viksit Bharat 2047 Innovation Leadership Programs",
    description: "Establish a structured national leadership framework across 10 core undergraduate sectors for real-time industry exposure.",
  },
  {
    year: "2032",
    title: "Mass Student Startup Funding",
    description: "Allocate ₹1,000 Crore to support and validate over 20,000 student-led startups with milestone-linked seed grants.",
  },
  {
    year: "2040",
    title: "Student Innovation Support Fund",
    description: "Deploy ₹1,000 Crore dedicated national fund to support student projects, research, prototyping, and incubation.",
  },
  {
    year: "2047",
    title: "Institutional Development Fund",
    description: "Deploy parallel ₹1,000 Crore infrastructure fund to build rapid prototyping labs and incubation centers in member institutions.",
  },
];

// Official Bulletins — Innovation India Council circular reference format
const CIRCULARS = [
  {
    id: "NCIE-DPR-2026",
    date: "August 10, 2026",
    title: "Release of NCIE Detailed Project Report (DPR) for National Startup & Innovation Ecosystem",
    description: "Official Detailed Project Report (DPR) detailing the structure, programs, and roadmap of the National Council for Innovation & Entrepreneurship.",
    category: "Policy Docs",
  },
  {
    id: "NCIE-VB-2026-124",
    date: "August 10, 2026",
    title: "Implementation of NCIE Activities under the Viksit Bharat @2047 Innovation Mission in Affiliated Colleges and Higher Educational Institutions",
    description: "Official orders issued by the Office of the Executive Director for the implementation of NCIE activities, including student registration, Kalam Startup Validation, and establishing IEDCs.",
    category: "Policy Docs",
  },
  {
    id: "NCIE-RECTT-2026-001",
    date: "July 01, 2026",
    title: "NCIE Contractual Recruitment Notification July 2026: 773 Vacancies Across 21 Administrative & Technical Positions",
    description: "Applications are invited from eligible Indian citizens for engagement to various contractual positions (1 Year tenure, AP posting). Last date: August 25, 2026.",
    category: "Applications",
  },
  {
    id: "IIC-INT-2026-001",
    date: "June 18, 2026",
    title: "NCIE Viksit Bharat 2047 Innovation Leadership Programs Registrations Open: Innovational & Technology Management and AI Business & Startup Innovation",
    description: "Registrations are now open for course-integrated programs under the engineering and technology domain. One-time registration fee: ₹700 per course.",
    category: "Applications",
  },
  {
    id: "IIC-CAL-2025-147",
    date: "June 10, 2025",
    title: "Innovation India Council Annual Calendar Released",
    description: "The official calendar of entrepreneurship events, workshops, and regional star accreditation guidelines has been published for member institutions.",
    category: "Applications",
  },
  {
    id: "IIC-SEED-2025-089",
    date: "May 22, 2025",
    title: "Startup Seed Funding Stage 1 Applications Open",
    description: "Student startups can apply for the first tranche of the equity-free seed grant to support Concept Validation and MVP development.",
    category: "Applications",
  },
  {
    id: "IIC-INCUB-2025-063",
    date: "April 15, 2025",
    title: "Institutional Incubation Support Applications Open",
    description: "Eligible institutions can apply for development grants ranging from ₹20 Lakhs to ₹50 Lakhs to build makerspaces, prototyping labs, and E-cells.",
    category: "Applications",
  },
  {
    id: "IIC-FELLOW-2025-041",
    date: "March 28, 2025",
    title: "Innovation India Student Fellowship Nominations",
    description: "Nominations are now open for the 12-month Student Fellowship cycle to work on national social impact and technical projects.",
    category: "Fellowships",
  },
];

export default function Home() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");
  const [activeFlagshipCat, setActiveFlagshipCat] = useState("innovation");
  const [flagshipSearch, setFlagshipSearch] = useState("");
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
    Applications: "notice_cat_applications",
    Fellowships: "notice_cat_fellowships",
  };

  // Localize circulars dynamically based on current language
  const localizedCirculars = CIRCULARS.map((c) => {
    const keyPrefix = `circular_${c.id.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
    return {
      ...c,
      title: t(`${keyPrefix}_title`) || c.title,
      description: t(`${keyPrefix}_desc`) || c.description,
      date: t(`${keyPrefix}_date`) || c.date,
    };
  });

  const filteredCirculars =
    activeTab === "all"
      ? localizedCirculars
      : localizedCirculars.filter((c) => c.category === activeTab);

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

    const onEnter = () => {
      pausedRef.current = true;
    };
    const onLeave = () => {
      pausedRef.current = false;
    };
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
    {
      label: "Student Innovators",
      value: "Founding Cohort",
      desc: "First-round application verification currently active for student innovators cataloged in database.",
      state: "Verification Desk",
    },
    {
      label: "College Chapters",
      value: "Expanding Network",
      desc: "Academic chapter affiliation verification and handbook alignment across STEM colleges.",
      state: "Chapter Roster",
    },
    {
      label: "Innovation Schemes",
      value: "Launching Soon",
      desc: "Initial micro-grants disbursement approvals and incubator matching programs setup.",
      state: "Scheme Sandbox",
    },
    {
      label: "Enterprise Pipelines",
      value: "Coming Soon",
      desc: "Direct avenues configuration to seed capital pools and startup accelerators.",
      state: "Capital Pool",
    },
  ].map((item, idx) => ({
    label: t(`home_benchmark_${idx}_label`) || item.label,
    value: t(`home_benchmark_${idx}_value`) || item.value,
    desc: t(`home_benchmark_${idx}_desc`) || item.desc,
    state: t(`home_benchmark_${idx}_state`) || item.state,
  }));

  // Localize Key Programmes dynamically
  const localizedProgrammes = KEY_PROGRAMMES.map((item, idx) => ({
    title: t(`home_key_prog_${idx}_title`) || item.title,
    description: t(`home_key_prog_${idx}_desc`) || item.description,
    focus: item.focus.map((point, pIdx) => t(`home_key_prog_${idx}_focus_${pIdx}`) || point),
    badge: t(`home_key_prog_${idx}_badge`) || item.badge,
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

  // Filter flagship initiatives
  const filteredFlagship = useMemo(() => {
    let list = FLAGSHIP_INITIATIVES;
    if (activeFlagshipCat !== "all") {
      list = list.filter((item) => item.categoryId === activeFlagshipCat);
    }
    if (flagshipSearch.trim()) {
      const q = flagshipSearch.toLowerCase();
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tag.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeFlagshipCat, flagshipSearch]);

  // Category icons mapping
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Rocket":
        return <Rocket className="w-4 h-4" />;
      case "Award":
        return <Award className="w-4 h-4" />;
      case "GraduationCap":
        return <GraduationCap className="w-4 h-4" />;
      case "Cpu":
        return <Cpu className="w-4 h-4" />;
      case "Factory":
        return <Factory className="w-4 h-4" />;
      case "Users":
        return <Users className="w-4 h-4" />;
      case "HeartPulse":
        return <HeartPulse className="w-4 h-4" />;
      case "Sprout":
        return <Sprout className="w-4 h-4" />;
      case "Compass":
        return <Compass className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex-1 bg-[#F9FAFB] pb-16 font-sans">
      {/* 1. Official News Flash Bar (Scrolling Marquee) */}
      <div className="bg-[#074733] text-white border-b border-emerald-900 text-xs py-2 px-4 sm:px-6 lg:px-8 overflow-hidden z-25 relative">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <span className="flex items-center gap-1 bg-[#C9A24B] text-zinc-950 font-bold px-2.5 py-0.5 rounded text-[10px] uppercase tracking-wider shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 inline-block animate-ping" />
            <span>{t("home_latest_news")}</span>
          </span>
          <div className="overflow-hidden relative w-full">
            <div className="flex gap-12 whitespace-nowrap animate-marquee" aria-live="off">
              <span className="text-zinc-100">{t("home_news_1")}</span>
              <span className="text-zinc-100">{t("home_news_2")}</span>
              <span className="text-zinc-100">{t("home_news_3")}</span>
              {/* Duplicate for seamless loop */}
              <span className="text-zinc-100" aria-hidden>
                {t("home_news_1")}
              </span>
              <span className="text-zinc-100" aria-hidden>
                {t("home_news_2")}
              </span>
              <span className="text-zinc-100" aria-hidden>
                {t("home_news_3")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Drive Course & Leadership Banner */}
      <div className="bg-gradient-to-r from-[#074733] via-[#0A5D45] to-[#0D6B4F] text-white py-3.5 px-4 sm:px-6 lg:px-8 border-b border-[#C9A24B]/35">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-[11px] font-bold text-[#C9A24B] uppercase tracking-wider flex items-center gap-1.5">
                <span>{t("banner_active_drive")}</span>
                <span className="inline-block px-1.5 py-0.2 bg-[#C9A24B] text-zinc-950 font-black text-[9px] rounded">
                  2026-27
                </span>
              </p>
              <h2 className="text-sm sm:text-base font-extrabold tracking-tight">
                {t("banner_title")}
              </h2>
              <p className="text-xs text-emerald-100/80 mt-0.5">
                {t("banner_desc")}
                <strong className="text-white font-bold"> ₹700</strong>.
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

      {/* 2. HERO BANNER: Building an Innovative India for Viksit Bharat @2047 */}
      <section className="relative border-b border-zinc-200 bg-white pt-10 sm:pt-14 pb-16 overflow-hidden">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#0D6B4F]/5 via-[#C9A24B]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Heading, Subheading, CTAs & Quick Directories */}
            <div className="lg:col-span-7 space-y-6">
              {/* Exact Main Heading from Hero Banner.pdf */}
              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-zinc-900 leading-[1.15]">
                {t("home_hero_heading_1")}{" "}
                <span className="text-[#0D6B4F] bg-gradient-to-r from-[#074733] via-[#0D6B4F] to-[#158a67] bg-clip-text text-transparent">
                  {t("home_hero_heading_2")}
                </span>
              </h1>

              {/* Exact Subheading from Hero Banner.pdf */}
              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-normal text-justify">
                {t("home_hero_desc")}
              </p>

              {/* Call to Action Buttons from Hero Banner.pdf */}
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2">
                <Link href="/join" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-[#0D6B4F] hover:bg-[#074733] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 transition-all shadow-md inline-flex items-center justify-center gap-2 cursor-pointer border border-[#0D6B4F]">
                    <span>{t("home_cta_register")}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>

                <Link href="/partnerships" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-[#C9A24B] hover:bg-[#A68034] text-zinc-950 hover:text-white font-bold text-xs uppercase tracking-wider px-5 py-3.5 transition-all shadow-md inline-flex items-center justify-center gap-1.5 cursor-pointer">
                    <span>{t("home_cta_partner")}</span>
                    <Building2 className="w-4 h-4" />
                  </button>
                </Link>

                <Link href="/opportunities" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto border border-zinc-300 hover:border-[#0D6B4F] hover:bg-emerald-50 text-zinc-800 hover:text-[#0D6B4F] font-bold text-xs uppercase tracking-wider px-5 py-3.5 transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5">
                    <span>{t("home_cta_ambassador")}</span>
                    <Award className="w-4 h-4 text-[#A68034]" />
                  </button>
                </Link>
              </div>

              {/* Quick Directories / Access Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="border border-zinc-200 p-4 bg-zinc-50/70 hover:bg-white hover:border-[#0D6B4F]/40 transition-all flex flex-col justify-between shadow-xs">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-zinc-200 pb-2">
                      <UserCheck className="w-4 h-4 text-[#0D6B4F]" />
                      <span>{t("home_chapter_dir")}</span>
                    </h3>
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                      {t("home_chapter_desc")}
                    </p>
                  </div>
                  <Link
                    href="/chapters"
                    className="text-xs text-[#0D6B4F] font-bold hover:underline inline-flex items-center gap-1 mt-4"
                  >
                    <span>{t("home_search_chapters")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="border border-zinc-200 p-4 bg-zinc-50/70 hover:bg-white hover:border-[#0D6B4F]/40 transition-all flex flex-col justify-between shadow-xs">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-zinc-200 pb-2">
                      <FileText className="w-4 h-4 text-[#0D6B4F]" />
                      <span>{t("home_schemes_reg")}</span>
                    </h3>
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                      {t("home_schemes_desc")}
                    </p>
                  </div>
                  <Link
                    href="/programs"
                    className="text-xs text-[#0D6B4F] font-bold hover:underline inline-flex items-center gap-1 mt-4"
                  >
                    <span>{t("home_view_schemes")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 text-[11px] text-zinc-500 font-medium">
                <Info className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>{t("home_footer_info")}</span>
              </div>
            </div>

            {/* Right Column: Official Notice Board Ticker */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-white border border-zinc-200 shadow-md">
                {/* Notice Board Header */}
                <div className="bg-[#074733] text-white px-5 py-3.5 flex items-center justify-between">
                  <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C9A24B]" />
                    <span>{t("notice_title")}</span>
                  </h2>
                  <span className="bg-[#C9A24B] text-zinc-950 text-[9px] font-black px-2 py-0.5 uppercase tracking-wider font-mono">
                    {t("notice_desk")}
                  </span>
                </div>

                {/* Filter Tabs */}
                <div className="flex border-b border-zinc-200 text-[10px] sm:text-xs bg-zinc-50 font-semibold">
                  {["all", "Applications", "Policy Docs", "Fellowships"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-2.5 px-1 text-center border-b-2 transition-all cursor-pointer ${activeTab === tab
                          ? "border-[#0D6B4F] text-[#0D6B4F] font-bold bg-white"
                          : "border-transparent text-zinc-500 hover:text-zinc-800"
                        }`}
                    >
                      {t(tabLabels[tab])}
                    </button>
                  ))}
                </div>

                {/* Notice List Container */}
                <div
                  ref={noticeRef}
                  className="relative divide-y divide-zinc-200 bg-white"
                  style={{ height: 340, overflowY: "hidden" }}
                >
                  {scrollItems.map((doc, i) => (
                    <div
                      key={`a-${i}-${doc.id}`}
                      className="p-4 hover:bg-zinc-50 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[9px] font-mono text-zinc-400 font-bold">
                          {doc.id}
                        </span>
                        <span className="text-[#0D6B4F] text-[9px] font-bold uppercase tracking-wider border border-emerald-200 bg-emerald-50/80 px-1.5 py-0.5 rounded">
                          {t(categoryTranslations[doc.category] || doc.category)}
                        </span>
                      </div>
                      <Link
                        href={
                          doc.id === "NCIE-RECTT-2026-001"
                            ? "/careers"
                            : `/notices?id=${doc.id.toLowerCase()}`
                        }
                        className="text-xs font-bold text-zinc-900 hover:text-[#0D6B4F] transition-colors block hover:underline leading-snug"
                      >
                        {doc.title}
                      </Link>
                      <p className="text-[11px] text-zinc-500 leading-relaxed mt-1 line-clamp-2">
                        {doc.description}
                      </p>
                      <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-dashed border-zinc-200 text-[10px]">
                        <span className="text-zinc-400 font-medium">{doc.date}</span>
                        <Link
                          href={
                            doc.id === "NCIE-RECTT-2026-001"
                              ? "/careers"
                              : `/notices?id=${doc.id.toLowerCase()}`
                          }
                          className="text-[#0D6B4F] hover:text-[#074733] font-bold flex items-center gap-0.5"
                        >
                          <span>{t("notice_view_circular")}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                  {/* Duplicate for continuous scroll */}
                  {scrollItems.map((doc, i) => (
                    <div
                      key={`b-${i}-${doc.id}`}
                      aria-hidden
                      className="p-4 hover:bg-zinc-50 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[9px] font-mono text-zinc-400 font-bold">
                          {doc.id}
                        </span>
                        <span className="text-[#0D6B4F] text-[9px] font-bold uppercase tracking-wider border border-emerald-200 bg-emerald-50/80 px-1.5 py-0.5 rounded">
                          {t(categoryTranslations[doc.category] || doc.category)}
                        </span>
                      </div>
                      <Link
                        href={
                          doc.id === "NCIE-RECTT-2026-001"
                            ? "/careers"
                            : `/notices?id=${doc.id.toLowerCase()}`
                        }
                        className="text-xs font-bold text-zinc-900 hover:text-[#0D6B4F] transition-colors block hover:underline leading-snug"
                      >
                        {doc.title}
                      </Link>
                      <p className="text-[11px] text-zinc-500 leading-relaxed mt-1 line-clamp-2">
                        {doc.description}
                      </p>
                      <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-dashed border-zinc-200 text-[10px]">
                        <span className="text-zinc-400 font-medium">{doc.date}</span>
                        <Link
                          href={
                            doc.id === "NCIE-RECTT-2026-001"
                              ? "/careers"
                              : `/notices?id=${doc.id.toLowerCase()}`
                          }
                          className="text-[#0D6B4F] hover:text-[#074733] font-bold flex items-center gap-0.5"
                        >
                          <span>{t("notice_view_circular")}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Notice Footer Links */}
                <div className="bg-zinc-50 px-4 py-3 border-t border-zinc-200 flex items-center justify-center gap-4 text-center">
                  <Link
                    href="/notices"
                    className="text-xs text-[#0D6B4F] font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>{t("notice_access_archive")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <div className="w-px h-3.5 bg-zinc-300" />
                  <Link
                    href="/notices?tab=orders"
                    className="text-xs text-[#A68034] font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>{t("notice_access_orders_archive")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISION & MISSION SECTION (From Hero Banner.pdf) */}
      <section className="py-14 sm:py-16 bg-[#F9FAFB] border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Vision Banner Card: One Family – One Entrepreneur */}
          <div className="bg-gradient-to-br from-[#074733] via-[#0A5D45] to-[#0D6B4F] text-white p-8 sm:p-10 border-l-8 border-[#C9A24B] shadow-xl relative overflow-hidden mb-12">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
            <div className="relative z-10 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A24B] text-zinc-950 font-black text-xs uppercase tracking-widest rounded mb-3">
                <Target className="w-3.5 h-3.5" />
                <span>{t("home_core_vision_title") || "Vision"}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-3">
                {t("home_vision_heading")}
              </h2>
              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-sans max-w-3xl">
                {t("home_vision_sub")}
              </p>
            </div>
          </div>

          {/* Mission 4 Pillars Grid */}
          <div>
            <div className="flex items-center gap-2 mb-6 border-l-4 border-[#0D6B4F] pl-3">
              <h3 className="text-base font-bold uppercase tracking-wider text-zinc-900">
                {t("home_mission_title")}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Mission 1 */}
              <div className="bg-white border border-zinc-200 p-6 hover:shadow-md hover:border-[#0D6B4F]/50 transition-all group">
                <div className="w-10 h-10 rounded bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#0D6B4F] mb-4 group-hover:bg-[#0D6B4F] group-hover:text-white transition-colors">
                  <Rocket className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-zinc-900 mb-2">
                  {t("home_mission_1_title")}
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {t("home_mission_1_desc")}
                </p>
              </div>

              {/* Mission 2 */}
              <div className="bg-white border border-zinc-200 p-6 hover:shadow-md hover:border-[#0D6B4F]/50 transition-all group">
                <div className="w-10 h-10 rounded bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#0D6B4F] mb-4 group-hover:bg-[#0D6B4F] group-hover:text-white transition-colors">
                  <Building2 className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-zinc-900 mb-2">
                  {t("home_mission_2_title")}
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {t("home_mission_2_desc")}
                </p>
              </div>

              {/* Mission 3 */}
              <div className="bg-white border border-zinc-200 p-6 hover:shadow-md hover:border-[#0D6B4F]/50 transition-all group">
                <div className="w-10 h-10 rounded bg-amber-50 border border-amber-200 flex items-center justify-center text-[#A68034] mb-4 group-hover:bg-[#C9A24B] group-hover:text-zinc-950 transition-colors">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-zinc-900 mb-2">
                  {t("home_mission_3_title")}
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {t("home_mission_3_desc")}
                </p>
              </div>

              {/* Mission 4 */}
              <div className="bg-white border border-zinc-200 p-6 hover:shadow-md hover:border-[#0D6B4F]/50 transition-all group">
                <div className="w-10 h-10 rounded bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#0D6B4F] mb-4 group-hover:bg-[#0D6B4F] group-hover:text-white transition-colors">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-zinc-900 mb-2">
                  {t("home_mission_4_title")}
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {t("home_mission_4_desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HON'BLE PRIME MINISTER'S VISION FOR VIKSIT BHARAT @2047 & SUPPORTING THE NATIONAL VISION */}
      <section className="py-16 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Prime Minister's Quote Card */}
            <div className="lg:col-span-7 bg-gradient-to-br from-zinc-900 via-zinc-950 to-emerald-950 text-white p-8 sm:p-10 border border-zinc-800 relative overflow-hidden flex flex-col justify-between shadow-xl">
              <div className="absolute top-4 right-4 text-[#C9A24B]/15 pointer-events-none">
                <Quote className="w-28 h-28" />
              </div>

              <div className="relative z-10 space-y-4">
                {/* Quote text */}
                <blockquote className="text-base sm:text-lg lg:text-xl font-medium text-zinc-100 leading-relaxed italic pt-1">
                  {t("home_pm_vision_quote")}
                </blockquote>

                <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#C9A24B]/70 shadow-md shrink-0 bg-zinc-800">
                      <img
                        src="/pm-narendra-modi.png"
                        alt="Shri Narendra Modi, Hon'ble Prime Minister of India"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#C9A24B] uppercase tracking-wider">
                        {t("home_pm_vision_author")}
                      </h4>
                      <p className="text-xs text-zinc-400 font-sans">
                        {t("home_pm_vision_author_sub")}
                      </p>
                    </div>
                  </div>
                  <img
                    src="/gov-emblem.png"
                    alt="Emblem of India"
                    className="h-10 w-auto opacity-80 brightness-0 invert shrink-0 hidden sm:block"
                  />
                </div>
              </div>

              {/* NCIE Alignment Commitment */}
              <div className="relative z-10 mt-6 pt-5 border-t border-zinc-800/80 bg-zinc-900/60 p-4 border-l-2 border-[#0D6B4F]">
                <p className="text-xs text-emerald-100/90 leading-relaxed font-sans text-justify">
                  {t("home_pm_vision_commit")}
                </p>
              </div>
            </div>

            {/* Supporting the National Vision of India Card + Image */}
            <div className="lg:col-span-5 bg-zinc-50 border border-zinc-200 p-6 sm:p-8 flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-l-4 border-[#0D6B4F] pl-3">
                  <h3 className="text-base font-bold uppercase tracking-wider text-zinc-900">
                    {t("home_nat_vision_heading")}
                  </h3>
                </div>

                <p className="text-xs text-zinc-650 leading-relaxed text-justify">
                  {t("home_nat_vision_desc")}
                </p>

                {/* Youth Innovation Image Preview */}
                <div className="relative rounded overflow-hidden border border-zinc-200 shadow-sm mt-3">
                  <img
                    src="/images/indian_youth_innovation.jpg"
                    alt="Indian Youth Innovation & Tech Startups for Viksit Bharat 2047"
                    className="w-full h-44 object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-white">
                    <p className="text-[11px] font-bold">
                      National Youth Innovation & Startup Hubs
                    </p>
                    <p className="text-[9px] text-zinc-300">
                      Viksit Bharat @2047 Innovation Mission
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200 flex items-center justify-between">
                <Link
                  href="/vision-2047"
                  className="text-xs text-[#0D6B4F] font-bold hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Explore Vision 2047 Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <img src="/viksit-bharat.png" alt="Viksit Bharat" className="h-6 w-auto opacity-90" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GOVERNMENT OF INDIA FLAGSHIP INITIATIVES (Interactive Categorized Directory) */}
      <section className="py-16 bg-[#F9FAFB] border-b border-zinc-200" id="flagship-initiatives">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1 text-[#0D6B4F] font-bold text-xs uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5" />
              <span>National Alignment Framework</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight mt-1">
              {t("home_flagship_title")}
            </h2>
            <div className="w-16 h-0.5 bg-[#C9A24B] mx-auto mt-3 mb-2" />
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mt-2">
              {t("home_flagship_subtitle")}
            </p>
          </div>

          {/* Search & Domain Filter Bar */}
          <div className="bg-white border border-zinc-200 p-4 mb-6 shadow-xs">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Search input */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={flagshipSearch}
                  onChange={(e) => setFlagshipSearch(e.target.value)}
                  placeholder="Search Flagship Schemes..."
                  className="w-full pl-9 pr-4 py-2 border border-zinc-300 text-xs focus:outline-hidden focus:border-[#0D6B4F] rounded-none bg-zinc-50/50"
                />
                {flagshipSearch && (
                  <button
                    onClick={() => setFlagshipSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Status counter */}
              <div className="text-xs font-semibold text-zinc-600 flex items-center gap-2">
                <span>Showing:</span>
                <span className="bg-emerald-50 text-[#0D6B4F] border border-emerald-200 px-2 py-0.5 rounded font-mono font-bold">
                  {filteredFlagship.length} Schemes
                </span>
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-3 border-t border-zinc-100 mt-3 pb-1 scrollbar-thin">
              {FLAGSHIP_CATEGORIES.map((cat) => {
                const isActive = activeFlagshipCat === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveFlagshipCat(cat.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${isActive
                        ? "bg-[#0D6B4F] text-white shadow-xs"
                        : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
                      }`}
                  >
                    {getCategoryIcon(cat.icon)}
                    <span>{language === "hi" ? cat.nameHi : cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Flagship Initiatives Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFlagship.map((item) => (
              <div
                key={item.id}
                tabIndex={0}
                className="bg-white border border-zinc-200 p-5 hover:border-[#0D6B4F]/50 hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden min-h-[210px] cursor-pointer focus:outline-none"
              >
                {/* 1. Base View: Logo centered all over the card */}
                <div className="w-full h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold text-[#0D6B4F] bg-emerald-50 border border-emerald-200 px-2 py-0.5 uppercase tracking-wider font-mono">
                      {item.tag}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-400">#GOI-INITIATIVE</span>
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-center py-2">
                    {item.logo && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={item.logo}
                        alt={`${item.name} Logo`}
                        className="max-h-24 max-w-[85%] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                    <h3 className="text-xs font-bold text-zinc-800 text-center mt-2.5 truncate w-full px-2">
                      {item.name}
                    </h3>
                  </div>

                  <div className="pt-2 border-t border-dashed border-zinc-100 flex items-center justify-between text-xs text-zinc-400">
                    <span className="text-[10px] font-medium">Hover for details</span>
                    <span className="text-[10px] text-[#0D6B4F] font-semibold">View Scheme &rarr;</span>
                  </div>
                </div>

                {/* 2. Hover View: Exact original card information revealed */}
                <div className="absolute inset-0 z-10 bg-white p-5 flex flex-col justify-between opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 shadow-md">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold text-[#0D6B4F] bg-emerald-50 border border-emerald-200 px-2 py-0.5 uppercase tracking-wider font-mono">
                        {item.tag}
                      </span>
                      <span className="text-[9px] font-mono text-zinc-400">#GOI-INITIATIVE</span>
                    </div>

                    <h3 className="text-sm font-bold text-zinc-900 group-hover:text-[#0D6B4F] transition-colors leading-snug">
                      {item.name}
                    </h3>

                    <p className="text-xs text-zinc-500 leading-relaxed mt-2 line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-dashed border-zinc-200 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-zinc-400 font-medium">Flagship Scheme</span>
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0D6B4F] hover:text-[#074733] font-bold inline-flex items-center gap-1"
                      >
                        <span>{t("home_flagship_visit_portal")}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <Link
                        href="/schemes"
                        className="text-[#0D6B4F] hover:text-[#074733] font-bold inline-flex items-center gap-1"
                      >
                        <span>Scheme Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. KEY PROGRAMMES (From Hero Banner.pdf) */}
      <section className="py-16 bg-white border-b border-zinc-200" id="key-programmes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1 text-[#A68034] font-bold text-xs uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Apex Framework</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight mt-1">
              {t("home_key_progs_title")}
            </h2>
            <div className="w-12 h-0.5 bg-[#0D6B4F] mx-auto mt-3 mb-2" />
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed mt-2">
              {t("home_key_progs_subtitle")}
            </p>
          </div>

          {/* Key Programmes Table */}
          <div className="touch-scroll-x border border-zinc-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200">
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-16 text-center">
                    {t("home_initiatives_col_sno")}
                  </th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-72">
                    {t("home_initiatives_col_name")}
                  </th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200">
                    {t("home_initiatives_col_details")}
                  </th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 w-44">
                    {t("home_initiatives_col_track")}
                  </th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 w-44 text-center">
                    {t("home_initiatives_col_action")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {localizedProgrammes.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-zinc-200 last:border-b-0 hover:bg-zinc-50/50 odd:bg-white even:bg-zinc-50/20 text-xs"
                  >
                    <td className="px-4 py-4 text-center font-mono font-bold text-zinc-500 border-r border-zinc-200">
                      0{idx + 1}
                    </td>
                    <td className="px-4 py-4 border-r border-zinc-200">
                      <div className="font-bold text-zinc-900 leading-snug">{item.title}</div>
                      <div className="text-[10px] text-zinc-400 mt-1 leading-relaxed">
                        {item.description}
                      </div>
                    </td>
                    <td className="px-4 py-4 border-r border-zinc-200 text-zinc-650 leading-relaxed">
                      <ul className="list-disc list-inside space-y-1">
                        {item.focus.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-4 border-r border-zinc-200 font-mono font-bold uppercase text-zinc-600">
                      <span className="inline-block px-2 py-0.5 bg-zinc-100 border border-zinc-200 rounded text-[10px]">
                        {item.badge}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <Link
                        href="/programs"
                        className="text-[#0D6B4F] hover:underline font-bold inline-flex items-center gap-0.5"
                      >
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

      {/* 7. NATIONAL IMPACT INDICATORS (From Hero Banner.pdf) */}
      <section className="py-16 bg-[#F9FAFB] border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1 text-[#0D6B4F] font-bold text-xs uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>National Impact Section</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight mt-1">
              {t("home_impact_title")}
            </h2>
            <div className="w-12 h-0.5 bg-[#C9A24B] mx-auto mt-3 mb-2" />
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed mt-2">
              {t("home_impact_subtitle")}
            </p>
          </div>

          {/* 4 Quantified Impact Indicator Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {/* Metric 1 */}
            <div className="bg-white border-t-4 border-t-[#0D6B4F] border-x border-b border-zinc-200 p-6 text-center shadow-xs">
              <div className="text-3xl sm:text-4xl font-black text-[#0D6B4F] font-mono">
                {t("home_impact_metric_1_val")}
              </div>
              <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mt-2">
                {t("home_impact_metric_1_label")}
              </h3>
              <p className="text-xs text-zinc-500 mt-1">{t("home_impact_metric_1_desc")}</p>
            </div>

            {/* Metric 2 */}
            <div className="bg-white border-t-4 border-t-[#C9A24B] border-x border-b border-zinc-200 p-6 text-center shadow-xs">
              <div className="text-3xl sm:text-4xl font-black text-[#A68034] font-mono">
                {t("home_impact_metric_2_val")}
              </div>
              <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mt-2">
                {t("home_impact_metric_2_label")}
              </h3>
              <p className="text-xs text-zinc-500 mt-1">{t("home_impact_metric_2_desc")}</p>
            </div>

            {/* Metric 3 */}
            <div className="bg-white border-t-4 border-t-[#0D6B4F] border-x border-b border-zinc-200 p-6 text-center shadow-xs">
              <div className="text-3xl sm:text-4xl font-black text-[#0D6B4F] font-mono">
                {t("home_impact_metric_3_val")}
              </div>
              <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mt-2">
                {t("home_impact_metric_3_label")}
              </h3>
              <p className="text-xs text-zinc-500 mt-1">{t("home_impact_metric_3_desc")}</p>
            </div>

            {/* Metric 4 */}
            <div className="bg-white border-t-4 border-t-[#C9A24B] border-x border-b border-zinc-200 p-6 text-center shadow-xs">
              <div className="text-3xl sm:text-4xl font-black text-[#A68034] font-mono">
                {t("home_impact_metric_4_val")}
              </div>
              <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mt-2">
                {t("home_impact_metric_4_label")}
              </h3>
              <p className="text-xs text-zinc-500 mt-1">{t("home_impact_metric_4_desc")}</p>
            </div>
          </div>

          {/* Academic Registry Benchmarks Table */}
          <div className="bg-white border border-zinc-200 p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-zinc-200">
              <div className="border-l-4 border-[#0D6B4F] pl-3">
                <h3 className="text-base font-bold text-zinc-900 uppercase tracking-wider">
                  {t("home_benchmarks_title")}
                </h3>
                <p className="text-[10px] text-zinc-500 font-medium uppercase mt-0.5 tracking-wider">
                  {t("home_benchmarks_subtitle")}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-[#0D6B4F] font-bold text-[10px] uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5" />
                <span>{t("home_benchmarks_active")}</span>
              </span>
            </div>

            <div className="touch-scroll-x">
              <table className="w-full text-left border-collapse border border-zinc-200">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-200">
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-48">
                      {t("home_benchmarks_col_metric")}
                    </th>
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-40">
                      {t("home_benchmarks_col_status")}
                    </th>
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200">
                      {t("home_benchmarks_col_scope")}
                    </th>
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 w-40">
                      {t("home_benchmarks_col_desk")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {localizedBenchmarks.map((item, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-zinc-200 last:border-b-0 hover:bg-zinc-50/50 odd:bg-white even:bg-zinc-50/20 text-xs"
                    >
                      <td className="px-4 py-3.5 text-zinc-900 font-bold border-r border-zinc-200">
                        {item.label}
                      </td>
                      <td className="px-4 py-3.5 font-mono text-[#0D6B4F] font-bold border-r border-zinc-200">
                        {item.value}
                      </td>
                      <td className="px-4 py-3.5 text-zinc-600 leading-relaxed border-r border-zinc-200">
                        {item.desc}
                      </td>
                      <td className="px-4 py-3.5 font-mono font-bold text-zinc-500 uppercase">
                        {item.state}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 8. INNOVATION LIFECYCLE STEPPER */}
      <section className="py-16 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
              {t("home_journey_title")}
            </h2>
            <div className="w-12 h-0.5 bg-[#0D6B4F] mx-auto mt-3 mb-2" />
            <p className="text-xs sm:text-sm text-zinc-500 mt-2">
              {t("home_journey_subtitle")}
            </p>
          </div>

          <div className="touch-scroll-x bg-white border border-zinc-200 shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-xs">
                  <th className="px-6 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-24 text-center">
                    {t("home_journey_col_step")}
                  </th>
                  <th className="px-6 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-52">
                    {t("home_journey_col_phase")}
                  </th>
                  <th className="px-6 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200">
                    {t("home_journey_col_desc")}
                  </th>
                  <th className="px-6 py-3 font-bold uppercase tracking-wider text-zinc-700 w-52">
                    {t("home_journey_col_action")}
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {localizedJourneySteps.map((step, index) => (
                  <tr
                    key={index}
                    className="border-b border-zinc-200 last:border-b-0 hover:bg-zinc-50/50 odd:bg-white even:bg-zinc-50/20"
                  >
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
                      <Link
                        href={step.href}
                        className="text-[11px] font-bold text-[#0D6B4F] hover:text-[#074733] hover:underline flex items-center justify-between gap-1.5 w-full uppercase tracking-wider"
                      >
                        <span>{step.action}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 9. VISION 2047: CENTENARY ROADMAP */}
      <section className="py-16 border-b border-zinc-200 bg-[#F9FAFB]">
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
              <div className="bg-white border border-zinc-200 touch-scroll-x shadow-xs">
                <table className="min-w-full divide-y divide-zinc-200">
                  <thead className="bg-zinc-50 text-xs">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3.5 text-left font-bold uppercase tracking-wider w-24 border-r border-zinc-200 text-zinc-700"
                      >
                        {t("home_vision_col_phase")}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3.5 text-left font-bold uppercase tracking-wider w-48 border-r border-zinc-200 text-zinc-700"
                      >
                        {t("home_vision_col_target")}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3.5 text-left font-bold uppercase tracking-wider text-zinc-700"
                      >
                        {t("home_vision_col_desc")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-zinc-200 text-xs">
                    {localizedVisionMilestones.map((milestone) => (
                      <tr
                        key={milestone.year}
                        className="hover:bg-zinc-50/50 odd:bg-white even:bg-zinc-50/20"
                      >
                        <td className="px-6 py-4 font-mono font-bold text-[#A68034] whitespace-nowrap bg-zinc-50/20 border-r border-zinc-200 text-center">
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

      {/* 10. CALL TO ACTION SECTION (From Hero Banner.pdf: Register Now, Partner with NCIE, Become an Innovation Ambassador) */}
      <section className="py-16 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1 text-[#0D6B4F] font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>National Engagement Gateway</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight mt-1">
              Join the Viksit Bharat 2047 Innovation Mission
            </h2>
            <div className="w-12 h-0.5 bg-[#C9A24B] mx-auto mt-3 mb-2" />
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed mt-2">
              Select your pathway to participate in collegiate incubation, startup seed funding, and institutional partnership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* CTA 1: Register Now */}
            <div className="bg-gradient-to-b from-white to-emerald-50/40 border-2 border-emerald-600 p-6 sm:p-8 flex flex-col justify-between relative shadow-md">
              <div className="absolute -top-3 right-6 bg-[#0D6B4F] text-white text-[10px] font-black uppercase px-2.5 py-0.5 tracking-wider">
                Student & Startups
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded bg-emerald-100/70 text-[#0D6B4F] flex items-center justify-center mb-2">
                  <Rocket className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900">{t("home_cta_register")}</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Register as an individual student innovator, researcher, or founding startup to unlock grant allocations and mentor desks.
                </p>
              </div>
              <div className="pt-6">
                <Link href="/join" className="block w-full">
                  <button className="w-full bg-[#0D6B4F] hover:bg-[#074733] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-4 shadow-sm inline-flex items-center justify-center gap-1.5 cursor-pointer">
                    <span>{t("home_cta_register")}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>

            {/* CTA 2: Partner with NCIE */}
            <div className="bg-gradient-to-b from-white to-amber-50/40 border-2 border-[#C9A24B] p-6 sm:p-8 flex flex-col justify-between relative shadow-md">
              <div className="absolute -top-3 right-6 bg-[#C9A24B] text-zinc-950 text-[10px] font-black uppercase px-2.5 py-0.5 tracking-wider">
                Institutions & CSR
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded bg-amber-100/70 text-[#A68034] flex items-center justify-center mb-2">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900">{t("home_cta_partner")}</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Establish an NCIE chapter, apply for ₹20L–₹50L incubation infrastructure grants, or deploy corporate CSR innovation funds.
                </p>
              </div>
              <div className="pt-6">
                <Link href="/partnerships" className="block w-full">
                  <button className="w-full bg-[#C9A24B] hover:bg-[#A68034] text-zinc-950 hover:text-white font-bold text-xs uppercase tracking-wider py-3.5 px-4 shadow-sm inline-flex items-center justify-center gap-1.5 cursor-pointer">
                    <span>{t("home_cta_partner")}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>

            {/* CTA 3: Become an Innovation Ambassador */}
            <div className="bg-gradient-to-b from-white to-zinc-50 border-2 border-zinc-300 hover:border-[#0D6B4F] p-6 sm:p-8 flex flex-col justify-between relative shadow-md transition-colors">
              <div className="absolute -top-3 right-6 bg-zinc-800 text-white text-[10px] font-black uppercase px-2.5 py-0.5 tracking-wider">
                Campus Leaders
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded bg-zinc-100 text-zinc-700 flex items-center justify-center mb-2">
                  <Award className="w-6 h-6 text-[#A68034]" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900">{t("home_cta_ambassador")}</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Lead chapter activities, host local hackathons, and represent your college in national innovation leadership summits.
                </p>
              </div>
              <div className="pt-6">
                <Link href="/opportunities" className="block w-full">
                  <button className="w-full border border-zinc-400 hover:bg-[#0D6B4F] hover:text-white hover:border-[#0D6B4F] text-zinc-800 font-bold text-xs uppercase tracking-wider py-3.5 px-4 shadow-sm inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors">
                    <span>Apply as Ambassador</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. HELP & SUPPORT QUICK DESK */}
      <section className="py-14 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-zinc-200 p-6 md:p-8 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2 space-y-2">
                <div className="flex items-center gap-2 text-[#0D6B4F] border-l-4 border-[#0D6B4F] pl-3">
                  <HelpCircle className="w-5 h-5 text-[#A68034]" />
                  <h3 className="text-base font-bold uppercase tracking-wider text-zinc-900">
                    {t("home_support_title")}
                  </h3>
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
