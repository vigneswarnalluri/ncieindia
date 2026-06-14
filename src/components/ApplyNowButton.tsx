"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ApplyNowButtonProps {
  className?: string;
  onClick?: () => void;
  icon?: LucideIcon;
  text?: string;
}

const buttonVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1,
  },
  tap: { 
    scale: 0.96,
    transition: { type: "spring" as const, stiffness: 450, damping: 15 }
  }
};

export default function ApplyNowButton({
  className,
  onClick,
  icon: Icon = ChevronRight,
  text = "Apply Now",
}: ApplyNowButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "relative overflow-hidden group inline-flex items-center justify-center gap-2 h-9 px-5 text-[11px] font-bold tracking-widest uppercase text-white rounded cursor-pointer select-none whitespace-nowrap",
        "bg-gradient-to-r from-primary via-primary-light to-primary-dark",
        "shadow-sm shadow-primary/5",
        "border border-primary-light/20",
        "before:absolute before:inset-0 before:rounded before:border before:border-white/10 before:pointer-events-none before:z-20",
        "transition-all duration-300 ease-out active:scale-95",
        className
      )}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      initial="initial"
    >

      {/* Shimmer Sweep Effect */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full pointer-events-none z-10"
        variants={{
          hover: {
            x: ["-100%", "100%"],
            transition: {
              repeat: Infinity,
              repeatType: "loop" as const,
              duration: 1.4,
              ease: "easeInOut",
            },
          },
          initial: {
            x: "-100%",
          },
        }}
      />

      {/* Text Label */}
      <span className="relative z-10 flex items-center">
        {text}
      </span>

      {/* Animated Arrow Icon */}
      <motion.span
        className="relative z-10 flex items-center shrink-0"
        variants={{
          hover: {
            x: 4,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 10,
            },
          },
          initial: { x: 0 },
        }}
      >
        <Icon className="w-3.5 h-3.5" />
      </motion.span>
    </motion.button>
  );
}
