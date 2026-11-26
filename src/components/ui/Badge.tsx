import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "purple"
    | "cyan"
    | "pink"
    | "outline"
    | "success"
    | "warning"
    | "danger";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center justify-center flex-wrap text-center font-mono font-medium tracking-tight rounded-full transition-colors border select-none [&_svg]:shrink-0";

  const sizeStyles = {
    sm: "min-h-6 px-2.5 py-0.5 text-xs gap-1",
    md: "min-h-7 px-3 py-1 text-xs gap-1.5",
  };

  const variantStyles = {
    default:
      "bg-brand-surface-200/90 text-brand-text-primary border-brand-border",
    purple: "bg-brand-coral/15 text-brand-coral-light border-brand-coral/35",
    cyan: "bg-brand-lavender/15 text-brand-lavender-light border-brand-lavender/35",
    pink: "bg-brand-amber/15 text-brand-amber-light border-brand-amber/35",
    outline:
      "bg-transparent text-brand-text-secondary border-brand-border-subtle",
    success:
      "bg-brand-lavender/15 text-brand-lavender-light border-brand-lavender/35",
    warning: "bg-amber-500/15 text-amber-300 border-amber-500/35",
    danger: "bg-rose-500/15 text-rose-300 border-rose-500/35",
  };

  return (
    <div
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
