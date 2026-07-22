"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function TopProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [navigating, setNavigating] = useState(false);
  const [progress, setProgress] = useState(0);

  // Trigger progress animation whenever URL route changes
  useEffect(() => {
    setNavigating(true);
    setProgress(25);

    const timer1 = setTimeout(() => setProgress(65), 120);
    const timer2 = setTimeout(() => setProgress(90), 280);
    const timer3 = setTimeout(() => setProgress(100), 420);
    const timer4 = setTimeout(() => {
      setNavigating(false);
      setProgress(0);
    }, 650);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [pathname, searchParams]);

  if (!navigating && progress === 0) return null;

  return (
    <AnimatePresence>
      <div className="fixed top-0 left-0 right-0 z-[999999] pointer-events-none">
        {/* Soft Ambient Header Glow Aura */}
        <div className="h-8 bg-gradient-to-b from-emerald-500/20 via-emerald-400/10 to-transparent blur-md transition-opacity duration-300" />

        {/* 3px Multi-Stop Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-emerald-950/40">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative h-full bg-gradient-to-r from-[#074733] via-[#10B981] via-[#34D399] to-[#F59E0B] shadow-[0_0_14px_rgba(16,185,129,0.95),0_0_24px_rgba(245,158,11,0.6)]"
            style={{
              opacity: progress === 100 ? 0 : 1,
            }}
          >
            {/* Glowing Leading Head Dot */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full bg-amber-300 border border-white/60 shadow-[0_0_10px_#f59e0b,0_0_18px_#34d399] animate-ping" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-amber-200 border border-white shadow-[0_0_8px_#ffffff]" />
          </motion.div>
        </div>

        {/* Floating Top-Right Mini Badge with Animated Logo Spinner */}
        {navigating && progress < 100 && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.85 }}
            className="fixed top-3 right-4 z-[999999] flex items-center gap-2.5 px-3 py-1.5 bg-[#032017]/95 text-white border border-emerald-500/50 rounded-full shadow-2xl backdrop-blur-md"
          >
            <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
              <div className="absolute inset-0 rounded-full border-2 border-emerald-400/30 border-t-amber-400 animate-spin" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/30 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-emerald-300 tracking-wider uppercase font-sans leading-none">NCIE India</span>
              <span className="text-[8px] text-emerald-200/70 font-mono leading-none mt-0.5">Loading page...</span>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
