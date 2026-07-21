import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "gold" | "mint" | "outline";
}

function Badge({ className, variant = "primary", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20",
        {
          "border-transparent bg-primary text-white": variant === "primary",
          "border-transparent bg-zinc-100 text-zinc-800": variant === "secondary",
          "border-transparent bg-accent text-white": variant === "gold",
          "border-transparent bg-mint text-primary": variant === "mint",
          "border-zinc-200 text-zinc-800 bg-transparent": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
