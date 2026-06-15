"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  X,
  Globe,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Rocket,
  Landmark,
  Briefcase,
  FileText,
  Award,
} from "lucide-react";
import {
  FaYoutube,
  FaInstagram,
  FaWhatsapp,
  FaFacebook,
} from "react-icons/fa";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Lock } from "lucide-react";
import ApplyNowButton from "@/components/ApplyNowButton";
import AccessibilityModal from "@/components/AccessibilityModal";
import { useLanguage } from "@/contexts/LanguageContext";

const NAV_LINKS = [
  { key: "nav_home", href: "/" },
  { key: "nav_about", href: "/about" },
  { key: "nav_programs", href: "/programs", hasMega: "programs" as const },
  { key: "nav_ecosystem", href: "/chapters", hasMega: "ecosystem" as const },
  { key: "nav_media", href: "/media" },
  { key: "nav_join", href: "/join" },
  { key: "nav_contact", href: "/contact" },
];

const LanguageIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="currentColor"
  >
    <text x="1" y="12" fontSize="13" fontFamily="system-ui, sans-serif" fontWeight="bold">अ</text>
    <text x="11" y="22" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="bold">A</text>
  </svg>
);

const AccessibilityIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="5.5" r="2" />
    <path d="M 5 11.5 h 14" />
    <path d="M 12 11.5 v 3" />
    <path d="M 9 20.5 l 3 -6 3 6" />
  </svg>
);

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const toggleMobileExpanded = (key: string) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const [activeMenu, setActiveMenu] = useState<"programs" | "ecosystem" | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menu: "programs" | "ecosystem") => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 120);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when page changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
    setMobileExpanded({});
  }, [pathname]);

  // Close mega menu when page changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveMenu(null);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full flex flex-col">
      {/* Top Black Bar (Gov/Institutional style) */}
      <div
        className={cn(
          "bg-[#1A1A1A] text-white border-b border-white/5 text-xs font-sans relative z-40 hidden md:block transition-all duration-300 overflow-hidden",
          isScrolled ? "h-0 py-0 border-b-0" : "h-16 py-3"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
          {/* Left: Socials */}
          <div className="flex items-center space-x-6">
            {/* Social Icons — black circles, white icons matching provided style */}
            <div className="flex items-center gap-1.5">
              <a href="https://www.linkedin.com/company/ncieindia" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="w-7 h-7 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors shrink-0">
                <FaLinkedinIn className="w-3.5 h-3.5" />
              </a>
              <a href="https://www.facebook.com/ncieindiaofficial" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-7 h-7 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors shrink-0">
                <FaFacebook className="w-3.5 h-3.5" />
              </a>
              <a href="https://www.instagram.com/ncieindia" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-7 h-7 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors shrink-0">
                <FaInstagram className="w-3.5 h-3.5" />
              </a>
              <a href="https://x.com/ncieindia" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X"
                className="w-7 h-7 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors shrink-0">
                <FaXTwitter className="w-3.5 h-3.5" />
              </a>
              <a href="https://youtube.com/@ncie.9" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                className="w-7 h-7 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors shrink-0">
                <FaYoutube className="w-3.5 h-3.5" />
              </a>
              <a href="https://whatsapp.com/channel/0029Vb7s9A430LKNIB0OxD1w" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="w-7 h-7 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors shrink-0">
                <FaWhatsapp className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right: Support Contact */}
          <div className="flex items-center text-white font-sans tracking-wide font-medium">
            <span>{t("toll_free")} : </span>
            <span className="text-accent font-bold ml-1.5">1800 123 4567</span>
            <span className="text-zinc-200 ml-1.5">{t("timings")}</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={cn(
          "w-full relative transition-shadow duration-200 border-b bg-white",
          isScrolled
            ? "border-zinc-200 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.08)]"
            : "border-zinc-150/40"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo Area */}
            <Link href="/" className="focus:outline-none shrink-0 acc-logo-container" aria-label="NCIE India Home">
              <Image
                src="/logo-new.png"
                alt="NCIE India Logo"
                width={280}
                height={80}
                className="h-14 lg:h-16 w-auto object-contain"
                priority
                unoptimized
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-stretch h-full">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                const hasMega = link.hasMega;
                const isMenuOpen = activeMenu === hasMega;
                return (
                  <Link
                    key={link.key}
                    href={link.href}
                    onMouseEnter={() => hasMega ? handleMouseEnter(hasMega) : setActiveMenu(null)}
                    onMouseLeave={handleMouseLeave}
                    className={cn(
                      "px-3.5 xl:px-4.5 h-full flex items-center gap-1.5 text-xs xl:text-[13px] font-bold uppercase tracking-wider transition-all duration-200 relative focus:outline-none select-none hover:bg-zinc-50/70",
                      (isActive || isMenuOpen)
                        ? "text-primary font-extrabold"
                        : "text-zinc-600 hover:text-primary"
                    )}
                  >
                    <span>{t(link.key)}</span>
                    {hasMega && (
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 transition-transform duration-250 opacity-70",
                          isMenuOpen && "rotate-180 text-primary opacity-100"
                        )}
                      />
                    )}
                    {/* Material Tab Bottom Active Indicator */}
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 right-0 h-[3px] bg-primary transition-all duration-300 origin-bottom scale-y-0",
                        (isActive || isMenuOpen) && "scale-y-100"
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Actions & Lang */}
            <div className="hidden lg:flex items-center gap-3 h-full acc-actions-container" onMouseEnter={() => setActiveMenu(null)}>
              {/* Login — institutions & officials only */}
              <Link
                href="/login"
                id="header-login-btn"
                className="inline-flex items-center gap-2 h-9 px-4 text-[11px] font-semibold tracking-widest uppercase text-primary bg-white border border-primary/40 rounded hover:border-primary hover:bg-primary/5 transition-all duration-150 cursor-pointer"
              >
                <Lock className="w-3 h-3" />
                {t("nav_login")}
              </Link>

              {/* Apply Now CTA */}
              <Link href="/join">
                <ApplyNowButton />
              </Link>

              <div className="h-4 w-px bg-zinc-200" />

              {/* Language selector */}
              <button 
                onClick={() => setLanguage(language === "en" ? "hi" : "en")}
                className="flex items-center text-zinc-500 hover:text-primary transition-colors cursor-pointer"
                title={language === "en" ? "हिन्दी में बदलें" : "Switch to English"}
              >
                <LanguageIcon className="w-4.5 h-4.5 shrink-0" />
              </button>

              <div className="h-4 w-px bg-zinc-200" />

              {/* Accessibility Button */}
              <button
                onClick={() => setAccessibilityOpen(true)}
                className="flex items-center text-zinc-500 hover:text-primary transition-colors cursor-pointer"
                title="Accessibility Controls"
              >
                <AccessibilityIcon className="w-4.5 h-4.5 shrink-0" />
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center gap-1.5">
              <button 
                onClick={() => setLanguage(language === "en" ? "hi" : "en")}
                className="flex items-center justify-center w-11 h-11 cursor-pointer text-zinc-600 hover:text-primary hover:bg-zinc-50 rounded-lg transition-colors"
                title={language === "en" ? "हिन्दी में बदलें" : "Switch to English"}
              >
                <LanguageIcon className="w-5.5 h-5.5 shrink-0" />
              </button>

              <button
                onClick={() => setAccessibilityOpen(true)}
                className="flex items-center justify-center w-11 h-11 cursor-pointer text-zinc-600 hover:text-primary hover:bg-zinc-50 rounded-lg transition-colors"
                title="Accessibility Controls"
              >
                <AccessibilityIcon className="w-5.5 h-5.5 shrink-0" />
              </button>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-11 h-11 text-zinc-600 hover:text-primary hover:bg-zinc-50 rounded-lg transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? (
                  <X className="w-5.5 h-5.5" />
                ) : (
                  <div className="w-5.5 h-3.5 flex flex-col justify-between">
                    <span className="w-full h-[2px] bg-current rounded-full" />
                    <span className="w-full h-[2px] bg-current rounded-full" />
                    <span className="w-full h-[2px] bg-current rounded-full" />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu Dropdowns */}
        <AnimatePresence mode="wait">
          {activeMenu === "programs" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onMouseEnter={() => handleMouseEnter("programs")}
              onMouseLeave={handleMouseLeave}
              style={{ willChange: "transform, opacity" }}
              className="absolute left-1/2 -translate-x-1/2 top-full w-full max-w-5xl bg-white border border-zinc-200/80 rounded-2xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] z-50 overflow-hidden mt-2"
            >
              <div className="grid grid-cols-12">
                {/* Left Side: Spotlight Sidebar */}
                <div className="col-span-4 bg-zinc-50/80 border-r border-zinc-150 p-6 flex flex-col justify-between min-h-[340px]">
                  <div className="space-y-3">
                    <span className="text-[9px] font-bold tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase">
                      Portal Sandbox
                    </span>
                    <h3 className="text-base font-extrabold text-zinc-900 leading-snug">
                      NCIE Schemes &amp; Capital Sandbox
                    </h3>
                    <p className="text-[11px] text-zinc-500 leading-relaxed">
                      Merit-based allowances and setup grants designed to validate student prototypes, fund collegiate makerspaces, and support early incorporated spin-offs.
                    </p>
                  </div>
                  
                  <div className="pt-6 border-t border-zinc-200/60 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider">
                        FY 2026-27 Active
                      </span>
                    </div>
                    <Link href="/join" className="block">
                      <Button variant="primary" size="sm" className="w-full justify-between uppercase font-bold tracking-wider text-[10px] py-2">
                        <span>Apply for Incubation</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right Side: Grid of 4 Action Cards */}
                <div className="col-span-8 p-6 grid grid-cols-2 gap-4 bg-white">
                  {/* Card 1: NIDHI CIS */}
                  <Link href="/programs/nidhi-cis" className="border border-zinc-100 hover:border-primary/20 bg-white hover:bg-mint/30 p-4.5 rounded-xl transition-all group/card flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center group-hover/card:bg-primary group-hover/card:text-white transition-colors">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <h4 className="text-xs font-extrabold text-zinc-800 group-hover/card:text-primary transition-colors">
                          NIDHI College Innovation
                        </h4>
                      </div>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">
                        Supports hardware &amp; software prototype building in college innovation cells.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-zinc-100/60 flex items-center justify-between text-[9px] font-mono font-bold text-accent-dark">
                      <span>STUDENT SCHEME</span>
                      <span>₹5 LAKH GRANT</span>
                    </div>
                  </Link>

                  {/* Card 2: Seed Pipeline */}
                  <Link href="/programs/seed-pipeline" className="border border-zinc-100 hover:border-primary/20 bg-white hover:bg-mint/30 p-4.5 rounded-xl transition-all group/card flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-accent/25 text-accent-dark flex items-center justify-center group-hover/card:bg-accent group-hover/card:text-white transition-colors">
                          <Rocket className="w-4 h-4" />
                        </div>
                        <h4 className="text-xs font-extrabold text-zinc-800 group-hover/card:text-primary transition-colors">
                          Seed Capital Pipeline
                        </h4>
                      </div>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">
                        Equity-free seed capital funding for validated, incorporated student ventures.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-zinc-100/60 flex items-center justify-between text-[9px] font-mono font-bold text-accent-dark">
                      <span>STARTUP STAGE</span>
                      <span>₹25 LAKH SEED</span>
                    </div>
                  </Link>

                  {/* Card 3: Makerspace Grants */}
                  <Link href="/programs/makerspace-empowerment" className="border border-zinc-100 hover:border-primary/20 bg-white hover:bg-mint/30 p-4.5 rounded-xl transition-all group/card flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-purple-50 text-purple-600 flex items-center justify-center group-hover/card:bg-purple-600 group-hover/card:text-white transition-colors">
                          <Landmark className="w-4 h-4" />
                        </div>
                        <h4 className="text-xs font-extrabold text-zinc-800 group-hover/card:text-primary transition-colors">
                          Makerspace Fabrication
                        </h4>
                      </div>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">
                        Institutional funding for technical colleges to deploy makerspaces and CNC/3D mills.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-zinc-100/60 flex items-center justify-between text-[9px] font-mono font-bold text-accent-dark">
                      <span>INSTITUTIONS</span>
                      <span>₹50 LAKH GRANT</span>
                    </div>
                  </Link>

                  {/* Card 4: CSR Bridges */}
                  <Link href="/programs" className="border border-zinc-100 hover:border-primary/20 bg-white hover:bg-mint/30 p-4.5 rounded-xl transition-all group/card flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center group-hover/card:bg-blue-600 group-hover/card:text-white transition-colors">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <h4 className="text-xs font-extrabold text-zinc-800 group-hover/card:text-primary transition-colors">
                          CSR Corporate Bridges
                        </h4>
                      </div>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">
                        Connect corporate CSR sponsors with student groups working on green tech, AI, and civic briefs.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-zinc-100/60 flex items-center justify-between text-[9px] font-mono font-bold text-accent-dark">
                      <span>CORPORATE</span>
                      <span>SPONSORED POCS</span>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {activeMenu === "ecosystem" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onMouseEnter={() => handleMouseEnter("ecosystem")}
              onMouseLeave={handleMouseLeave}
              style={{ willChange: "transform, opacity" }}
              className="absolute left-1/2 -translate-x-1/2 top-full w-full max-w-5xl bg-white border border-zinc-200/80 rounded-2xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] z-50 overflow-hidden mt-2"
            >
              <div className="grid grid-cols-12">
                {/* Left Side: Spotlight Sidebar */}
                <div className="col-span-4 bg-zinc-50/80 border-r border-zinc-150 p-6 flex flex-col justify-between min-h-[340px]">
                  <div className="space-y-3">
                    <span className="text-[9px] font-bold tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase">
                      Ecosystem Hub
                    </span>
                    <h3 className="text-base font-extrabold text-zinc-900 leading-snug">
                      National Council Registry Network
                    </h3>
                    <p className="text-[11px] text-zinc-500 leading-relaxed">
                      NCIE connects regional coordinators, university chapters, PG research fellows, and verified tech partners to build a structured student innovation pool.
                    </p>
                  </div>
                  
                  <div className="pt-6 border-t border-zinc-200/60 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      <span className="text-[10px] font-mono text-accent-dark font-bold uppercase tracking-wider">
                        1,000+ Chapter Nodes
                      </span>
                    </div>
                    <Link href="/join" className="block">
                      <Button variant="outline" size="sm" className="w-full justify-between uppercase font-bold tracking-wider text-[10px] py-2 border-primary/30 text-primary">
                        <span>Register Chapter Node</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right Side: Grid of 4 Action Cards */}
                <div className="col-span-8 p-6 grid grid-cols-2 gap-4 bg-white">
                  {/* Card 1: Academic Chapters */}
                  <Link href="/chapters" className="border border-zinc-100 hover:border-primary/20 bg-white hover:bg-mint/30 p-4.5 rounded-xl transition-all group/card flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center group-hover/card:bg-primary group-hover/card:text-white transition-colors">
                          <Landmark className="w-4 h-4" />
                        </div>
                        <h4 className="text-xs font-extrabold text-zinc-800 group-hover/card:text-primary transition-colors">
                          Academic Chapters
                        </h4>
                      </div>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">
                        Access the directory of affiliated STEM college chapters and coordinators.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-zinc-100/60 flex items-center justify-between text-[9px] font-mono font-bold text-accent-dark">
                      <span>CHAPTERS</span>
                      <span>CAMPUS REGISTRY</span>
                    </div>
                  </Link>

                  {/* Card 2: State Coordinator Board */}
                  <Link href="/chapters" className="border border-zinc-100 hover:border-primary/20 bg-white hover:bg-mint/30 p-4.5 rounded-xl transition-all group/card flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-accent/25 text-accent-dark flex items-center justify-center group-hover/card:bg-accent group-hover/card:text-white transition-colors">
                          <Globe className="w-4 h-4" />
                        </div>
                        <h4 className="text-xs font-extrabold text-zinc-800 group-hover/card:text-primary transition-colors">
                          State Liaison Desks
                        </h4>
                      </div>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">
                        Direct coordinator contact points and regional policy boards for each state.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-zinc-100/60 flex items-center justify-between text-[9px] font-mono font-bold text-accent-dark">
                      <span>LIAISON</span>
                      <span>STATE BOARD</span>
                    </div>
                  </Link>

                  {/* Card 3: Research Fellowships */}
                  <Link href="/opportunities" className="border border-zinc-100 hover:border-primary/20 bg-white hover:bg-mint/30 p-4.5 rounded-xl transition-all group/card flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-purple-50 text-purple-600 flex items-center justify-center group-hover/card:bg-purple-600 group-hover/card:text-white transition-colors">
                          <Award className="w-4 h-4" />
                        </div>
                        <h4 className="text-xs font-extrabold text-zinc-800 group-hover/card:text-primary transition-colors">
                          Centenary Fellowships
                        </h4>
                      </div>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">
                        Postgraduate deep-tech research allowances and fellowships to validate blueprints.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-zinc-100/60 flex items-center justify-between text-[9px] font-mono font-bold text-accent-dark">
                      <span>FELLOWSHIPS</span>
                      <span>₹45K/MO STIPEND</span>
                    </div>
                  </Link>

                  {/* Card 4: Registry Documents */}
                  <Link href="/media" className="border border-zinc-100 hover:border-primary/20 bg-white hover:bg-mint/30 p-4.5 rounded-xl transition-all group/card flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center group-hover/card:bg-blue-600 group-hover/card:text-white transition-colors">
                          <FileText className="w-4 h-4" />
                        </div>
                        <h4 className="text-xs font-extrabold text-zinc-800 group-hover/card:text-primary transition-colors">
                          Documents &amp; Circulars
                        </h4>
                      </div>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">
                        Official policy blueprints, manual downloads, and public announcements archive.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-zinc-100/60 flex items-center justify-between text-[9px] font-mono font-bold text-accent-dark">
                      <span>PUBLIC ARCHIVE</span>
                      <span>GUIDELINES PDF</span>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Drawer (Right side slide-in) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.22, ease: "easeOut" }}
              className="fixed right-0 top-0 bottom-0 z-50 w-80 max-w-[85vw] h-full bg-white shadow-xl flex flex-col lg:hidden border-l border-zinc-200"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200 bg-zinc-50 shrink-0">
                <div className="flex items-center">
                  <Image
                    src="/logo-new.png"
                    alt="NCIE Logo"
                    width={110}
                    height={32}
                    className="h-8 w-auto object-contain"
                    priority
                    unoptimized
                  />
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-zinc-200"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col justify-between gap-6">
                <nav className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => {
                    const isActive = pathname === link.href;
                    const hasMega = link.hasMega;
                    const isExpanded = !!mobileExpanded[link.key];

                    if (hasMega) {
                      return (
                        <div key={link.key} className="flex flex-col">
                          <button
                            onClick={() => toggleMobileExpanded(link.key)}
                            className={cn(
                              "flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer text-left w-full",
                              isActive
                                ? "bg-mint text-primary font-bold border-l-4 border-primary pl-2.5"
                                : "text-zinc-700 hover:bg-zinc-50 hover:text-primary"
                            )}
                          >
                            <span>{t(link.key)}</span>
                            <ChevronDown
                              className={cn(
                                "w-4 h-4 transition-transform duration-200 text-zinc-400",
                                isExpanded && "rotate-180 text-primary"
                              )}
                            />
                          </button>
                          
                          {/* Sub-links */}
                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className="overflow-hidden flex flex-col pl-4 pr-3 py-1 gap-1.5 border-l border-zinc-200 ml-4 mt-1"
                              >
                                {hasMega === "programs" ? (
                                  <>
                                    <Link
                                      href="/programs"
                                      className="text-xs font-bold text-primary hover:underline py-1.5 px-2 uppercase tracking-wide"
                                    >
                                      {language === "en" ? "• All Programs Overview" : "• सभी कार्यक्रम अवलोकन"}
                                    </Link>
                                    <Link
                                      href="/programs/nidhi-cis"
                                      className="text-xs font-medium text-zinc-600 hover:text-primary hover:underline py-1 px-2"
                                    >
                                      NIDHI College Innovation
                                    </Link>
                                    <Link
                                      href="/programs/seed-pipeline"
                                      className="text-xs font-medium text-zinc-600 hover:text-primary hover:underline py-1 px-2"
                                    >
                                      Seed Capital Pipeline
                                    </Link>
                                    <Link
                                      href="/programs/makerspace-empowerment"
                                      className="text-xs font-medium text-zinc-600 hover:text-primary hover:underline py-1 px-2"
                                    >
                                      Makerspace Fabrication
                                    </Link>
                                  </>
                                ) : (
                                  <>
                                    <Link
                                      href="/chapters"
                                      className="text-xs font-bold text-primary hover:underline py-1.5 px-2 uppercase tracking-wide"
                                    >
                                      {language === "en" ? "• All Chapters Overview" : "• सभी शाखाएं अवलोकन"}
                                    </Link>
                                    <Link
                                      href="/chapters"
                                      className="text-xs font-medium text-zinc-600 hover:text-primary hover:underline py-1 px-2"
                                    >
                                      Academic Chapters
                                    </Link>
                                    <Link
                                      href="/chapters"
                                      className="text-xs font-medium text-zinc-600 hover:text-primary hover:underline py-1 px-2"
                                    >
                                      State Liaison Desks
                                    </Link>
                                    <Link
                                      href="/opportunities"
                                      className="text-xs font-medium text-zinc-600 hover:text-primary hover:underline py-1 px-2"
                                    >
                                      Centenary Fellowships
                                    </Link>
                                    <Link
                                      href="/media"
                                      className="text-xs font-medium text-zinc-650 hover:text-primary hover:underline py-1 px-2"
                                    >
                                      Documents & Circulars
                                    </Link>
                                  </>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={link.key}
                        href={link.href}
                        className={cn(
                          "flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors",
                          isActive
                            ? "bg-mint text-primary font-bold border-l-4 border-primary pl-2.5"
                            : "text-zinc-700 hover:bg-zinc-50 hover:text-primary"
                        )}
                      >
                        <span>{t(link.key)}</span>
                        <ChevronRight
                          className={cn(
                            "w-4 h-4 transition-transform",
                            isActive ? "text-primary translate-x-0.5" : "text-zinc-300"
                          )}
                        />
                      </Link>
                    );
                  })}
                </nav>

                {/* Footer section with CTA, socials and support details */}
                <div className="space-y-4.5 mt-auto pt-5 border-t border-zinc-200">
                  <div className="flex flex-col gap-2.5">
                    <Link href="/login" className="w-full">
                      <Button variant="outline" className="w-full justify-center py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                        <Lock className="w-3.5 h-3.5 shrink-0" />
                        {t("nav_login")}
                      </Button>
                    </Link>
                    <Link href="/join" className="w-full">
                      <Button variant="primary" className="w-full justify-center py-2.5 text-xs font-bold uppercase tracking-wider">
                        {t("register_member")}
                      </Button>
                    </Link>
                  </div>

                  <div className="h-px bg-zinc-150" />

                  {/* Social Icons */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-center gap-2.5">
                      <a href="https://www.linkedin.com/company/ncieindia" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                        className="w-8 h-8 rounded bg-zinc-100 hover:bg-primary hover:text-white text-zinc-600 flex items-center justify-center transition-colors">
                        <FaLinkedinIn className="w-3.5 h-3.5" />
                      </a>
                      <a href="https://www.facebook.com/ncieindiaofficial" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                        className="w-8 h-8 rounded bg-zinc-100 hover:bg-primary hover:text-white text-zinc-600 flex items-center justify-center transition-colors">
                        <FaFacebook className="w-3.5 h-3.5" />
                      </a>
                      <a href="https://www.instagram.com/ncieindia" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                        className="w-8 h-8 rounded bg-zinc-100 hover:bg-primary hover:text-white text-zinc-600 flex items-center justify-center transition-colors">
                        <FaInstagram className="w-3.5 h-3.5" />
                      </a>
                      <a href="https://x.com/ncieindia" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X"
                        className="w-8 h-8 rounded bg-zinc-100 hover:bg-primary hover:text-white text-zinc-600 flex items-center justify-center transition-colors">
                        <FaXTwitter className="w-3.5 h-3.5" />
                      </a>
                      <a href="https://youtube.com/@ncie.9" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                        className="w-8 h-8 rounded bg-zinc-100 hover:bg-primary hover:text-white text-zinc-600 flex items-center justify-center transition-colors">
                        <FaYoutube className="w-3.5 h-3.5" />
                      </a>
                      <a href="https://whatsapp.com/channel/0029Vb7s9A430LKNIB0OxD1w" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                        className="w-8 h-8 rounded bg-zinc-100 hover:bg-primary hover:text-white text-zinc-600 flex items-center justify-center transition-colors">
                        <FaWhatsapp className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    
                    {/* Support Details */}
                    <div className="text-center space-y-0.5 bg-zinc-50 p-2.5 rounded-lg border border-zinc-200">
                      <p className="text-[9px] uppercase font-bold tracking-widest text-zinc-400">
                        {t("toll_free")}
                      </p>
                      <p className="text-xs font-bold text-primary">
                        1800 123 4567
                      </p>
                      <p className="text-[9px] text-zinc-400">
                        {t("timings")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>

    {/* Accessibility Controls Modal */}
    <AccessibilityModal isOpen={accessibilityOpen} onClose={() => setAccessibilityOpen(false)} />
    </>
  );
}
