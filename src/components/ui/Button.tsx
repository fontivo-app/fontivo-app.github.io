import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "cyan";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      external,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center text-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98] [&_svg]:shrink-0";

    const sizeStyles = {
      sm: "min-h-9 px-3.5 py-2 text-xs rounded-lg gap-1.5",
      md: "min-h-10 sm:min-h-11 px-4 sm:px-5 py-2 text-sm rounded-lg gap-2",
      lg: "min-h-11 sm:min-h-12 px-5 sm:px-6 py-2.5 text-sm sm:text-base rounded-xl gap-2.5",
    };

    const variantStyles = {
      primary:
        "bg-brand-coral hover:bg-brand-coral-hover text-brand-navy font-semibold shadow-card hover:shadow-coral-glow border border-brand-coral-light/40",
      secondary:
        "bg-brand-surface-200 hover:bg-brand-plum text-brand-text-primary border border-brand-border hover:border-brand-coral/50 shadow-card",
      outline:
        "bg-transparent hover:bg-brand-surface-200/70 text-brand-text-primary border border-brand-border hover:border-brand-border-highlight",
      ghost:
        "bg-transparent hover:bg-brand-surface-200/50 text-brand-text-secondary hover:text-brand-text-primary",
      cyan: "bg-brand-lavender hover:bg-brand-lavender-hover text-brand-navy font-semibold shadow-card hover:shadow-lavender-glow border border-brand-lavender-light/40",
    };

    const combinedClassName = cn(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      className,
    );

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClassName}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={combinedClassName}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
