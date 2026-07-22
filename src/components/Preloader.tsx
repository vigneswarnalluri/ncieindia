"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
    
    // Lock body scroll while loader is active
    document.body.style.overflow = "hidden";

    // Trigger video playback on mount
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Mobile video autoplay handled:", err);
        });
      }
    }

    // Safety fallback timer (4.2 seconds max)
    const maxTimer = setTimeout(() => {
      dismissPreloader();
    }, 4200);

    return () => {
      clearTimeout(maxTimer);
      document.body.style.overflow = "";
    };
  }, []);

  const dismissPreloader = () => {
    setIsVisible(false);
    document.body.style.overflow = "";
  };

  if (!isMounted || !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.03, 
            filter: "blur(8px)",
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[999999] bg-[#e7eaee] flex flex-col items-center justify-center select-none overflow-hidden touch-none"
        >
          {/* Seamless Video Background */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#e7eaee]">
            <video
              ref={videoRef}
              src="/ncie-intro-loader.mp4"
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={dismissPreloader}
              className="w-full h-full object-contain md:object-cover object-center scale-[1.01]"
            />
          </div>

          {/* Minimal Glassmorphism Skip Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={dismissPreloader}
            className="absolute top-6 right-6 z-30 px-4 py-2 bg-slate-950/70 hover:bg-slate-950 text-white font-mono text-[11px] font-bold tracking-widest rounded-full border border-emerald-500/30 shadow-lg backdrop-blur-md transition-all hover:border-emerald-400 hover:scale-105 active:scale-95 flex items-center gap-2 group cursor-pointer"
          >
            <span className="text-emerald-400 group-hover:text-emerald-300 transition-colors">SKIP INTRO</span>
            <div className="w-4 h-4 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500/40 flex items-center justify-center transition-colors">
              <svg className="w-2.5 h-2.5 text-emerald-300 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
