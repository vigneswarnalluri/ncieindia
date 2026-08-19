"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function EntryAnnouncementModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const { language } = useLanguage();
  const isHi = language === "hi";

  useEffect(() => {
    setIsMounted(true);

    // Show on every home page load / refresh
    if (pathname === "/") {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
    }
  }, [pathname]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Keyboard escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isMounted || pathname !== "/") return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-zinc-950/80 backdrop-blur-sm overflow-y-auto">
          {/* Backdrop click to dismiss */}
          <div className="fixed inset-0" onClick={handleClose} />

          {/* Modal Card — Clean Banner Style with Sharp Borders */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-2xl bg-white border border-zinc-300 rounded-none shadow-2xl flex flex-col p-4 sm:p-6 font-sans gap-3.5 z-10 my-auto text-left"
          >
            {/* Close Button - Top Right with Sharp Border */}
            <button
              onClick={handleClose}
              className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-20 p-1.5 rounded-none bg-black/60 hover:bg-black/85 text-white transition-all cursor-pointer shadow-md border-0"
              title="Close Announcement"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Clickable Banner Image */}
            <Link
              href="/join?role=internship"
              onClick={handleClose}
              className="block overflow-hidden rounded-none border border-zinc-200 bg-zinc-50 hover:opacity-95 transition-opacity"
            >
              <img
                src="/images/hero/viksit_bharat_campaign_banner.png"
                alt="NCIE Viksit Bharat 2047 Innovation Leadership Programs"
                className="w-full h-auto object-contain max-h-56 sm:max-h-64 mx-auto"
              />
            </Link>

            {/* Title & Description */}
            <div className="space-y-1.5 px-0.5">
              <span className="inline-block px-2 py-0.5 bg-[#0D6B4F]/10 text-[#074733] font-bold text-[10px] sm:text-xs uppercase tracking-wider rounded-none border border-[#0D6B4F]/20">
                {isHi ? "सक्रिय नामांकन अभियान • 2026-27" : "Active Enrollment Drive • 2026-27"}
              </span>

              <h3 className="text-sm sm:text-base md:text-lg font-black text-zinc-900 leading-snug tracking-tight">
                {isHi
                  ? "एनसीआईई विकसित भारत 2047 इनोवेशन लीडरशिप प्रोग्राम्स पंजीकरण खुले: इनोवेशनल और टेक्नोलॉजी मैनेजमेंट और एआई बिजनेस और स्टार्टअप इनोवेशन"
                  : "NCIE Viksit Bharat 2047 Innovation Leadership Programs Registrations Open: Innovational & Technology Management & AI Business & Startup Innovation"}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {isHi
                  ? "इंजीनियरिंग और प्रौद्योगिकी क्षेत्र के लिए विशेष पाठ्यक्रम-एकीकृत कार्यक्रम। एकमुश्त पंजीकरण शुल्क: "
                  : "Specialized course-integrated programs for the engineering and technology domain. One-time registration fee: "}
                <strong className="text-zinc-950 font-bold">₹700</strong>.
              </p>
            </div>

            {/* Action Buttons with Sharp Borders */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
              <Link
                href="/join?role=internship"
                onClick={handleClose}
                className="w-full sm:flex-1"
              >
                <button className="w-full bg-[#0D6B4F] hover:bg-[#074733] text-white font-bold text-xs uppercase tracking-wider py-2.5 px-5 rounded-none transition-all shadow-sm hover:shadow inline-flex items-center justify-center gap-1.5 cursor-pointer">
                  <span>{isHi ? "अभी पंजीकरण करें" : "Register Now"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>

              <a
                href="/NCIE_Viksit_Bharat_2047_Innovation_Leadership_Programmes.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto border border-zinc-300 hover:bg-zinc-50 text-zinc-700 font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-none transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <FileText className="w-3.5 h-3.5 text-[#C9A24B]" />
                <span>{isHi ? "सर्कुलर (PDF)" : "View Circular (PDF)"}</span>
              </a>

              <button
                onClick={handleClose}
                className="text-xs text-zinc-500 hover:text-zinc-800 font-medium py-1 sm:px-2 hover:underline cursor-pointer sm:hidden"
              >
                {isHi ? "वेबसाइट पर जाएं →" : "Proceed to Website →"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
