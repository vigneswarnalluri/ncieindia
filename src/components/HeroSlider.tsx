"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Download,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroSlider() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const SLIDES = [
    {
      id: 0,
      imageSrc: "/images/hero/banner_viksit_bharat.jpg",
      badge: t("slider_slide_1_badge") || "80th Year of Independence • 150 Years of Vande Mataram",
      title: t("slider_slide_1_title") || "Building an Innovative India for Viksit Bharat @2047",
      description:
        t("slider_slide_1_desc") ||
        "Hon'ble Prime Minister Shri Narendra Modi launched the NCIE Vision Document: Viksit Bharat @ 2047 to empower students, collegiate innovators, researchers, and institutions under the national vision of 'One Family – One Entrepreneur'.",
      cta1Text: t("slider_slide_1_cta1") || "Explore Vision 2047 Roadmap",
      cta1Href: "/vision-2047",
      cta2Text: t("slider_slide_1_cta2") || "Download Vision Charter (PDF)",
      cta2Href: "/NCIE_Vision_Document_2047.pdf",
      highlightTag: "PM Modi Launch",
    },
    {
      id: 1,
      imageSrc: "/images/hero/banner_internships.jpg",
      badge: t("slider_slide_2_badge") || "National Internship Mission 2026-27",
      title: t("slider_slide_2_title") || "Empowering Youth Across 10 Core Undergraduate Sectors",
      description:
        t("slider_slide_2_desc") ||
        "Structured, industry-oriented internships and experiential learning across AI, Engineering, Healthcare, AgriTech, Finance, and Public Policy with academic credit integration.",
      cta1Text: t("slider_slide_2_cta1") || "Register for Internship",
      cta1Href: "/join?role=internship",
      cta2Text: t("slider_slide_2_cta2") || "Explore 10 Sector Tracks",
      cta2Href: "/programs",
      highlightTag: "Active Enrollment Drive",
    },
    {
      id: 2,
      imageSrc: "/images/hero/banner_startups.png",
      badge: t("slider_slide_3_badge") || "₹1,000 Crore National Startup Fund",
      title: t("slider_slide_3_title") || "Dr. A.P.J. Abdul Kalam Startup Seed Funding Scheme",
      description:
        t("slider_slide_3_desc") ||
        "Direct equity-free grants of up to ₹5,00,000 with a 5-Stage Milestone Growth Model and follow-on investor connect ranging from ₹25 Lakhs to ₹25 Crores for student founders.",
      cta1Text: t("slider_slide_3_cta1") || "Apply for Seed Grant",
      cta1Href: "/schemes",
      cta2Text: t("slider_slide_3_cta2") || "Download Scheme Circular",
      cta2Href: "/Kalam_Startup_Seed_Funding_Scheme.pdf",
      highlightTag: "0% Equity Dilution",
    },
    {
      id: 3,
      imageSrc: "/images/hero/banner_institutions.png",
      badge: t("slider_slide_4_badge") || "Institutional Incubation Support (₹20L – ₹50L)",
      title: t("slider_slide_4_title") || "Transform Higher Education Campuses into Innovation Hubs",
      description:
        t("slider_slide_4_desc") ||
        "Infrastructure grants and CSR alignments to establish AI labs, makerspaces, and accredited Entrepreneurship Development Cells (EDCs) across 1,200+ universities and colleges.",
      cta1Text: t("slider_slide_4_cta1") || "Affiliate Your Institution",
      cta1Href: "/join?role=institution",
      cta2Text: t("slider_slide_4_cta2") || "Download IIDSS Policy",
      cta2Href: "/Institutional_Incubation_Development_Support_Scheme.pdf",
      highlightTag: "1,200+ Chapters",
    },
  ];

  // Auto-play timer
  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
      }, 7000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, SLIDES.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const current = SLIDES[currentSlide];

  return (
    <section
      id="home-primary-hero"
      aria-label="National Innovation Spotlight Hero Banner"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full overflow-hidden border-b border-zinc-300 bg-zinc-950 select-none group"
    >
      {/* ── Slide Canvas with Photographic Image Background ── */}
      <div className="relative min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] flex items-center overflow-hidden">
        
        {/* Background Banner Images with Smooth Transition */}
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
            style={{ transitionProperty: "opacity, transform", transitionDuration: "1000ms" }}
          >
            <img
              src={slide.imageSrc}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
            />
            {/* Multi-layered cinematic gradient overlays for pristine text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/80 to-zinc-950/30 sm:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-zinc-950/40" />
            <div className="absolute inset-0 bg-[#063B2C]/20 mix-blend-multiply pointer-events-none" />
          </div>
        ))}

        {/* Ambient Top Glow */}
        <div className="absolute -top-20 left-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none z-10" />

        {/* Main Content Area Overlaid on the Image */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 sm:py-16 relative z-20">
          <div className="max-w-3xl space-y-4 sm:space-y-6">
            
            {/* Main Heading */}
            <h1 className="text-2xl sm:text-4xl lg:text-[2.75rem] font-black tracking-tight text-white leading-[1.18] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {current.title}
            </h1>

            {/* Subheading / Description */}
            <p className="text-xs sm:text-sm lg:text-base text-zinc-100 font-sans leading-relaxed max-w-2xl text-left drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] bg-black/30 backdrop-blur-xs p-3 rounded-xs border-l-2 border-amber-400">
              {current.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href={current.cta1Href}>
                <button className="bg-[#C9A24B] hover:bg-[#b08d3d] text-[#063b2c] font-black text-xs uppercase tracking-wider px-5 sm:px-7 py-3.5 rounded-xs shadow-xl transition-all inline-flex items-center gap-2 cursor-pointer hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98]">
                  <span>{current.cta1Text}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              <a
                href={current.cta2Href}
                target={current.cta2Href.endsWith(".pdf") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="bg-black/50 hover:bg-black/70 text-white font-bold text-xs uppercase tracking-wider px-4 sm:px-6 py-3.5 rounded-xs transition-all border border-white/30 backdrop-blur-md inline-flex items-center gap-2 cursor-pointer hover:border-amber-400"
              >
                <Download className="w-3.5 h-3.5 text-amber-300" />
                <span>{current.cta2Text}</span>
              </a>
            </div>

          </div>
        </div>

        {/* ── Left / Right Floating Navigation Arrows ── */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-black/80 text-white/80 hover:text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-lg opacity-80 hover:opacity-100 hover:scale-110"
          title="Previous Banner"
          aria-label="Previous Banner"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-black/80 text-white/80 hover:text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-lg opacity-80 hover:opacity-100 hover:scale-110"
          title="Next Banner"
          aria-label="Next Banner"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

      </div>
    </section>
  );
}
