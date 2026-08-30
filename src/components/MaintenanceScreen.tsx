"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function MaintenanceScreen() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between items-center bg-[#F4F6F9] text-[#1E293B] font-sans selection:bg-[#93C5FD] selection:text-[#0F172A] relative overflow-hidden py-8 px-4 sm:px-6">
      {/* Top Header: Official NCIE / Govt Branding */}
      <header className="w-full max-w-7xl flex items-center justify-between gap-6 z-10 px-2 sm:px-6">
        <div className="flex items-center">
          <Image
            src="/logo-new.svg"
            alt="NCIE Crest"
            width={200}
            height={200}
            className="w-32 h-20 sm:w-44 sm:h-24 md:w-56 md:h-28 object-contain"
            priority
          />
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Image
            src="/gov-of-ind.png"
            alt="Government of India"
            width={100}
            height={120}
            className="h-16 sm:h-24 md:h-28 w-auto object-contain"
          />
        </div>
      </header>

      {/* Centerpiece: Under Maintenance Illustration & Text (Exact Dribbble Style) */}
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl my-auto relative z-10 text-center">
        {/* Relative container with the soft circular backdrop */}
        <div className="relative w-full flex flex-col items-center justify-center py-10">
          
          {/* Soft Powder Blue Circular Backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] md:w-[520px] md:h-[520px] rounded-full bg-[#E3F2FD] -z-0 pointer-events-none" />

          {/* Text inside/above circle */}
          <div className="relative z-10 max-w-xl mx-auto px-4 mb-4 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#1E3A8A] tracking-tight mb-3">
              This site is under
              <br />
              maintenance
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-[#5A7184] font-medium">
              We&apos;re preparing to serve you better.
            </p>
          </div>

          {/* Connected/Disconnected Power Plug Vector Illustration */}
          <div className="w-full relative z-10 flex items-center justify-center overflow-hidden py-4">
            <svg
              viewBox="0 0 840 180"
              className="w-full max-w-2xl sm:max-w-3xl h-auto"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Left Cable Line */}
              <line
                x1="0"
                y1="90"
                x2="310"
                y2="90"
                stroke="#1E3A8A"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              <line
                x1="0"
                y1="98"
                x2="310"
                y2="98"
                stroke="#1E3A8A"
                strokeWidth="4.5"
                strokeLinecap="round"
              />

              {/* Left Cable Strain Relief / Collar */}
              <rect
                x="310"
                y="76"
                width="22"
                height="36"
                rx="4"
                fill="#93C5FD"
                stroke="#1E3A8A"
                strokeWidth="4.5"
              />

              {/* Left Male Plug Body */}
              <path
                d="M332 64 H390 C404 64 414 74 414 88 V100 C414 114 404 124 390 124 H332 V64 Z"
                fill="#93C5FD"
                stroke="#1E3A8A"
                strokeWidth="4.5"
                strokeLinejoin="round"
              />

              {/* Male Prongs (Pins) */}
              <rect
                x="414"
                y="72"
                width="28"
                height="11"
                rx="2"
                fill="#93C5FD"
                stroke="#1E3A8A"
                strokeWidth="4.5"
              />
              <rect
                x="414"
                y="105"
                width="28"
                height="11"
                rx="2"
                fill="#93C5FD"
                stroke="#1E3A8A"
                strokeWidth="4.5"
              />

              {/* Right Female Socket Opening Collar */}
              <rect
                x="485"
                y="55"
                width="16"
                height="78"
                rx="4"
                fill="#93C5FD"
                stroke="#1E3A8A"
                strokeWidth="4.5"
              />

              {/* Right Female Socket Body */}
              <path
                d="M501 62 H538 C552 62 562 72 562 86 V102 C562 116 552 126 538 126 H501 V62 Z"
                fill="#93C5FD"
                stroke="#1E3A8A"
                strokeWidth="4.5"
                strokeLinejoin="round"
              />

              {/* Right Cable Strain Relief / Collar */}
              <rect
                x="562"
                y="76"
                width="22"
                height="36"
                rx="4"
                fill="#93C5FD"
                stroke="#1E3A8A"
                strokeWidth="4.5"
              />

              {/* Right Cable Line */}
              <line
                x1="584"
                y1="90"
                x2="840"
                y2="90"
                stroke="#1E3A8A"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              <line
                x1="584"
                y1="98"
                x2="840"
                y2="98"
                stroke="#1E3A8A"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </main>

      {/* Footer: Official Minimal Contact */}
      <footer className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748B] pt-4 border-t border-[#E2E8F0] z-10 text-center sm:text-left">
        <div>
          © 2026 National Council for Innovation & Entrepreneurship (NCIE India). All Rights Reserved.
        </div>
        <div className="flex items-center gap-4 text-[11px] font-medium">
          <a
            href="mailto:office@ncieindia.org"
            className="text-[#0D6B4F] hover:underline"
          >
            office@ncieindia.org
          </a>
        </div>
      </footer>
    </div>
  );
}
