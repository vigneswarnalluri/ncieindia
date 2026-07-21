"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TextSizeState = "normal" | "increase" | "extra-increase" | "decrease";

export default function AccessibilityModal({ isOpen, onClose }: AccessibilityModalProps) {
  const [darkContrast, setDarkContrast] = useState(false);
  const [invert, setInvert] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [textSize, setTextSize] = useState<TextSizeState>("normal");
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [hideImages, setHideImages] = useState(false);
  const [largeCursor, setLargeCursor] = useState(false);

  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    queueMicrotask(() => {
      setDarkContrast(localStorage.getItem("acc-dark-contrast") === "true");
      setInvert(localStorage.getItem("acc-invert") === "true");
      setGrayscale(localStorage.getItem("acc-grayscale") === "true");
      setTextSize((localStorage.getItem("acc-text-size") as TextSizeState) || "normal");
      setHighlightLinks(localStorage.getItem("acc-highlight-links") === "true");
      setHideImages(localStorage.getItem("acc-hide-images") === "true");
      setLargeCursor(localStorage.getItem("acc-large-cursor") === "true");
      setIsHydrated(true);
    });
  }, []);

  // Synchronize CSS classes on document element
  useEffect(() => {
    if (!isHydrated) return;
    const root = document.documentElement;
    console.log("ACCESSIBILITY: Toggling classes", { darkContrast, invert, grayscale, textSize, highlightLinks, hideImages, largeCursor });

    // 1. Dark contrast
    if (darkContrast) {
      root.classList.add("acc-dark-contrast");
      localStorage.setItem("acc-dark-contrast", "true");
    } else {
      root.classList.remove("acc-dark-contrast");
      localStorage.setItem("acc-dark-contrast", "false");
    }

    // 2. Invert
    if (invert) {
      root.classList.add("acc-invert");
      localStorage.setItem("acc-invert", "true");
    } else {
      root.classList.remove("acc-invert");
      localStorage.setItem("acc-invert", "false");
    }

    // 3. Grayscale/Saturation
    if (grayscale) {
      root.classList.add("acc-grayscale");
      localStorage.setItem("acc-grayscale", "true");
    } else {
      root.classList.remove("acc-grayscale");
      localStorage.setItem("acc-grayscale", "false");
    }

    // 4. Text Size
    root.classList.remove("acc-text-inc", "acc-text-inc-2", "acc-text-dec");
    if (textSize === "increase") root.classList.add("acc-text-inc");
    else if (textSize === "extra-increase") root.classList.add("acc-text-inc-2");
    else if (textSize === "decrease") root.classList.add("acc-text-dec");
    localStorage.setItem("acc-text-size", textSize);

    // 5. Highlight Links
    if (highlightLinks) {
      root.classList.add("acc-highlight-links");
      localStorage.setItem("acc-highlight-links", "true");
    } else {
      root.classList.remove("acc-highlight-links");
      localStorage.setItem("acc-highlight-links", "false");
    }

    // 6. Hide Images
    if (hideImages) {
      root.classList.add("acc-hide-images");
      localStorage.setItem("acc-hide-images", "true");
    } else {
      root.classList.remove("acc-hide-images");
      localStorage.setItem("acc-hide-images", "false");
    }

    // 7. Large Cursor
    if (largeCursor) {
      root.classList.add("acc-large-cursor");
      localStorage.setItem("acc-large-cursor", "true");
    } else {
      root.classList.remove("acc-large-cursor");
      localStorage.setItem("acc-large-cursor", "false");
    }
  }, [isHydrated, darkContrast, invert, grayscale, textSize, highlightLinks, hideImages, largeCursor]);

  const handleReset = () => {
    setDarkContrast(false);
    setInvert(false);
    setGrayscale(false);
    setTextSize("normal");
    setHighlightLinks(false);
    setHideImages(false);
    setLargeCursor(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/10 acc-exclude"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 z-[100] w-full max-w-sm bg-white shadow-2xl flex flex-col border-l border-zinc-150 acc-exclude"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-150 bg-zinc-50/50">
              <div className="flex items-center gap-3 text-primary">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <AccessibilityIcon className="w-5 h-5 shrink-0" />
                </div>
                <h2 className="text-base font-bold font-sans tracking-wide text-zinc-800">
                  Accessibility Controls
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Option Grid */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Button 1: Dark Contrast */}
                <button
                  onClick={() => setDarkContrast(!darkContrast)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1.5 p-2.5 h-22 border rounded-xl transition-all duration-200 cursor-pointer select-none",
                    darkContrast 
                      ? "border-primary bg-primary/10 text-primary font-bold shadow-xs" 
                      : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                  )}
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M12 7l1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1.5z" fill="currentColor"/>
                  </svg>
                  <span className="text-[10px] tracking-widest uppercase font-bold text-center leading-tight">
                    Dark Contrast
                  </span>
                </button>

                {/* Button 2: Invert */}
                <button
                  onClick={() => setInvert(!invert)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1.5 p-2.5 h-22 border rounded-xl transition-all duration-200 cursor-pointer select-none",
                    invert 
                      ? "border-primary bg-primary/10 text-primary font-bold shadow-xs" 
                      : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                  )}
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="1.75">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 3v18A9 9 0 0012 3z" fill="currentColor" />
                  </svg>
                  <span className="text-[10px] tracking-widest uppercase font-bold text-center leading-tight">
                    Invert
                  </span>
                </button>

                {/* Button 3: Saturation */}
                <button
                  onClick={() => setGrayscale(!grayscale)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1.5 p-2.5 h-22 border rounded-xl transition-all duration-200 cursor-pointer select-none",
                    grayscale 
                      ? "border-primary bg-primary/10 text-primary font-bold shadow-xs" 
                      : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                  )}
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="1.75">
                    <path d="M12 2.69S3.5 9 3.5 14.5a8.5 8.5 0 0017 0C20.5 9 12 2.69 12 2.69z" />
                    <path d="M12 2.69V23a8.5 8.5 0 000-17z" fill="currentColor" />
                  </svg>
                  <span className="text-[10px] tracking-widest uppercase font-bold text-center leading-tight">
                    Saturation
                  </span>
                </button>

                {/* Button 4: Text Size Increase */}
                <button
                  onClick={() => {
                    if (textSize === "normal") setTextSize("increase");
                    else if (textSize === "increase") setTextSize("extra-increase");
                    else if (textSize === "decrease") setTextSize("increase");
                    else setTextSize("normal");
                  }}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1.5 p-2.5 h-22 border rounded-xl transition-all duration-200 cursor-pointer select-none",
                    textSize === "increase" || textSize === "extra-increase"
                      ? "border-primary bg-primary/10 text-primary font-bold shadow-xs" 
                      : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                  )}
                >
                  <div className="text-lg font-extrabold tracking-tighter text-primary">A+</div>
                  <span className="text-[10px] tracking-widest uppercase font-bold text-center leading-tight">
                    Text Size Increase {textSize === "extra-increase" && "(x2)"}
                  </span>
                </button>

                {/* Button 5: Text Size Decrease */}
                <button
                  onClick={() => {
                    if (textSize === "decrease") setTextSize("normal");
                    else setTextSize("decrease");
                  }}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1.5 p-2.5 h-22 border rounded-xl transition-all duration-200 cursor-pointer select-none",
                    textSize === "decrease"
                      ? "border-primary bg-primary/10 text-primary font-bold shadow-xs" 
                      : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                  )}
                >
                  <div className="text-lg font-extrabold tracking-tighter text-primary">A-</div>
                  <span className="text-[10px] tracking-widest uppercase font-bold text-center leading-tight">
                    Text Size Decrease
                  </span>
                </button>

                {/* Button 6: Highlight Links */}
                <button
                  onClick={() => setHighlightLinks(!highlightLinks)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1.5 p-2.5 h-22 border rounded-xl transition-all duration-200 cursor-pointer select-none",
                    highlightLinks 
                      ? "border-primary bg-primary/10 text-primary font-bold shadow-xs" 
                      : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                  )}
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                  </svg>
                  <span className="text-[10px] tracking-widest uppercase font-bold text-center leading-tight">
                    Highlight Links
                  </span>
                </button>

                {/* Button 7: Hide Images */}
                <button
                  onClick={() => setHideImages(!hideImages)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1.5 p-2.5 h-22 border rounded-xl transition-all duration-200 cursor-pointer select-none",
                    hideImages 
                      ? "border-primary bg-primary/10 text-primary font-bold shadow-xs" 
                      : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                  )}
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                  </svg>
                  <span className="text-[10px] tracking-widest uppercase font-bold text-center leading-tight">
                    Hide Images
                  </span>
                </button>

                {/* Button 8: Default Cursor */}
                <button
                  onClick={() => setLargeCursor(!largeCursor)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1.5 p-2.5 h-22 border rounded-xl transition-all duration-200 cursor-pointer select-none",
                    largeCursor 
                      ? "border-primary bg-primary/10 text-primary font-bold shadow-xs" 
                      : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                  )}
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51z" />
                    <path d="M13 3l1 2" />
                    <path d="M3 13l2 1" />
                    <path d="M19 13l2 1" />
                    <path d="M13 19l1 2" />
                  </svg>
                  <span className="text-[10px] tracking-widest uppercase font-bold text-center leading-tight">
                    Default Cursor
                  </span>
                </button>

              </div>
            </div>

            {/* Footer Panel */}
            <div className="p-6 border-t border-zinc-150 bg-zinc-50">
              <button
                onClick={handleReset}
                className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-primary bg-white border border-primary/20 rounded-lg hover:bg-primary/5 transition-all cursor-pointer text-center"
              >
                Reset Settings
              </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
