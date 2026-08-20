"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

interface AnimatedCounterProps {
  value: string | number;
  duration?: number;
  className?: string;
  delay?: number;
}

export default function AnimatedCounter({
  value,
  duration = 2.2,
  className = "",
  delay = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  // Parse value: extract prefix, target number, suffix, and formatting style
  const parseValue = (val: string | number) => {
    if (typeof val === "number") {
      return { prefix: "", num: val, suffix: "", hasComma: false };
    }

    const str = String(val).trim();
    // Match prefix (non-digit, non-comma), digits/commas, and suffix (e.g. +, %, etc.)
    const match = str.match(/^([^\d]*)([\d,.]+)(.*)$/);
    if (!match) {
      return { prefix: "", num: 0, suffix: str, hasComma: false };
    }

    const prefix = match[1] || "";
    const rawNumberStr = match[2];
    const suffix = match[3] || "";
    const hasComma = rawNumberStr.includes(",");
    const num = parseFloat(rawNumberStr.replace(/,/g, "")) || 0;

    return { prefix, num, suffix, hasComma };
  };

  const { prefix, num, suffix, hasComma } = parseValue(value);
  const [displayValue, setDisplayValue] = useState<string>(() => `${prefix}0${suffix}`);

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      const controls = animate(0, num, {
        duration,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
        onUpdate: (latest) => {
          const rounded = Math.floor(latest);
          const formatted = hasComma ? rounded.toLocaleString("en-US") : rounded.toString();
          setDisplayValue(`${prefix}${formatted}${suffix}`);
        },
        onComplete: () => {
          const formatted = hasComma ? num.toLocaleString("en-US") : num.toString();
          setDisplayValue(`${prefix}${formatted}${suffix}`);
        },
      });

      return () => controls.stop();
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isInView, num, prefix, suffix, hasComma, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
