"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const dismissPreloader = useCallback(() => {
    setIsVisible(false);
    document.body.style.overflow = "";
  }, []);

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
  }, [dismissPreloader]);

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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
