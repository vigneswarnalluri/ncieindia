import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "outline" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]",
          {
            // Variants
            "bg-primary text-white hover:bg-primary-light shadow-md shadow-primary/10":
              variant === "primary",
            "bg-mint text-primary hover:bg-mint-dark": variant === "secondary",
            "bg-accent text-white hover:bg-accent-light shadow-md shadow-accent/15":
              variant === "gold",
            "border border-primary/20 bg-transparent text-primary hover:bg-mint/45 hover:border-primary/40":
              variant === "outline",
            "bg-transparent text-primary hover:bg-mint/30": variant === "ghost",
            "bg-white/70 backdrop-blur-md border border-white/40 text-primary hover:bg-white/90 shadow-sm":
              variant === "glass",

            // Sizes
            "px-3 py-1.5 text-xs": size === "sm",
            "px-5 py-2.5 text-sm": size === "md",
            "px-7 py-3 text-base": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
