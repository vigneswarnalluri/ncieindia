"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Download, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroSlider() {
  const { t, language } = useLanguage();
  const isHi = language === "hi";

  return (
    <section
      id="home-primary-hero"
      aria-label="Viksit Bharat Abhiyan Official Banner"
      className="relative w-full bg-white border-b border-zinc-200 overflow-hidden select-none min-h-[calc(100vh-215px)] flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: National Vision Information & CTAs */}
          <div className="lg:col-span-6 space-y-4 text-left">
            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl lg:text-[2rem] font-black tracking-tight text-zinc-900 leading-[1.25]">
              {isHi ? (
                <>
                  80वें स्वतंत्रता वर्ष एवं 150 वर्ष वंदे मातरम् के अवसर पर <br />
                  <span className="text-[#0D6B4F]">एनसीआईई विजन दस्तावेज: विकसित भारत @ 2047</span>
                </>
              ) : (
                <>
                  In the 80th Year of Independence & 150 Years of Vande Mataram, <br />
                  <span className="text-[#0D6B4F]">NCIE Vision Document: Viksit Bharat @ 2047</span>
                </>
              )}
            </h1>

            {/* Launch Statement & Summary */}
            <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">
              {isHi
                ? "माननीय प्रधानमंत्री श्री नरेंद्र मोदी द्वारा 'एक परिवार – एक उद्यमी' के राष्ट्रीय मिशन के अंतर्गत 10 कोर स्नातक क्षेत्रों में छात्र नवाचार, शोध एवं स्टार्टअप पारिस्थितिकी तंत्र को गति देने हेतु विजन दस्तावेज का शुभारंभ किया गया।"
                : "Hon'ble Prime Minister Shri Narendra Modi launched the historic NCIE Vision Document to empower students, collegiate innovators, and startup incubation across 10 core undergraduate domains under the national mission of 'One Family – One Entrepreneur'."}
            </p>

            {/* Key Pillars Checklist */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-750">
                <CheckCircle2 className="w-4 h-4 text-[#0D6B4F] shrink-0" />
                <span>{isHi ? "10 कोर स्नातक क्षेत्र व शैक्षणिक क्रेडिट एकीकरण" : "10 Core Undergraduate Domains & Academic Credits"}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-750">
                <CheckCircle2 className="w-4 h-4 text-[#0D6B4F] shrink-0" />
                <span>{isHi ? "₹1,000 करोड़ का राष्ट्रीय छात्र नवाचार व अवसंरचना फंड" : "₹1,000 Cr National Innovation & Infrastructure Fund"}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-750">
                <CheckCircle2 className="w-4 h-4 text-[#0D6B4F] shrink-0" />
                <span>{isHi ? "₹5 लाख तक गैर-इक्विटी सीड ग्रांट व 1,200+ कॉलेज इनक्यूबेटर" : "Milestone Equity-Free Seed Grants & 1,200+ Campus Hubs"}</span>
              </div>
            </div>

            {/* Action Buttons (Strictly Side-by-Side) */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3 pt-2">
              <Link href="/vision-2047" className="shrink-0">
                <button className="bg-[#0D6B4F] hover:bg-[#08533d] text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xs transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow-md whitespace-nowrap">
                  <span>{t("slider_slide_1_cta1") || "Explore Vision 2047"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
              <a
                href="/NCIE_Vision_Document_2047.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-zinc-50 text-zinc-800 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xs border border-zinc-300 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-2xs hover:border-[#C9A24B] shrink-0 whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5 text-[#C9A24B]" />
                <span>{t("slider_slide_1_cta2") || "Download Vision Charter"}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Official Banner Graphic */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full bg-white flex items-center justify-center">
              <img
                src="/images/hero/viksit_bharat_campaign_banner.png"
                alt="विकसित भारत अभियान 1947 TO 2047 - Hon'ble Prime Minister Shri Narendra Modi - सबका साथ, सबका विकास, सबका विश्वास, सबका प्रयास"
                className="w-full h-auto max-h-[55vh] object-contain block mx-auto"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
