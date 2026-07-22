"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Sparkles } from "lucide-react";

export default function InitialSplashLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing National Innovation Network...");

  useEffect(() => {
    // Check if splash loader was already shown in this session
    const hasSeenSplash = sessionStorage.getItem("ncie_splash_seen");
    if (hasSeenSplash === "true") {
      setIsLoading(false);
      return;
    }

    // Animate progress 0 -> 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 35) {
          setStatusText("Initializing National Innovation Network...");
          return prev + 5;
        } else if (prev < 70) {
          setStatusText("Loading Institutional Ecosystem & Chapters...");
          return prev + 6;
        } else if (prev < 95) {
          setStatusText("Connecting Viksit Bharat 2047 Nodes...");
          return prev + 4;
        } else {
          setStatusText("Ready");
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem("ncie_splash_seen", "true");
          }, 300);
          return 100;
        }
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-gradient-to-br from-[#032017] via-[#0A5D45] to-[#021811] text-white select-none overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none animate-pulse" />
          <div className="absolute w-[300px] h-[300px] rounded-full bg-amber-500/10 blur-[90px] pointer-events-none" />

          {/* Central Logo & Emblem Stack */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative flex flex-col items-center space-y-6 px-6 text-center max-w-lg z-10"
          >
            {/* Glowing Logo Container */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-xl animate-pulse" />
              <div className="relative bg-white/95 p-4 sm:p-5 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-md">
                <Image
                  src="/logo-new.png"
                  alt="NCIE Official Crest"
                  width={110}
                  height={110}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-md"
                  priority
                />
              </div>
            </div>

            {/* Institution Titles */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/15 rounded-full text-[10px] sm:text-xs font-bold tracking-widest text-emerald-300 uppercase shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Government Alignment • Viksit Bharat 2047</span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase font-sans">
                National Council for Innovation &amp; Entrepreneurship
              </h1>

              <p className="text-xs sm:text-sm text-emerald-100/80 font-medium tracking-wide">
                Empowering Student Founders &amp; Institutional Ecosystems Across India
              </p>
            </div>

            {/* Progress Bar Component */}
            <div className="w-full max-w-xs space-y-2 pt-4">
              <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400 rounded-full shadow-[0_0_12px_rgba(52,211,153,0.8)]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-emerald-200/90 pt-1">
                <span className="truncate pr-2">{statusText}</span>
                <span className="font-bold text-amber-300 shrink-0">{progress}%</span>
              </div>
            </div>
          </motion.div>

          {/* Footer Subtext */}
          <div className="absolute bottom-6 text-[10px] text-emerald-200/50 uppercase tracking-widest font-mono flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-400 animate-spin" />
            <span>NCIE Central Secretariat</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
