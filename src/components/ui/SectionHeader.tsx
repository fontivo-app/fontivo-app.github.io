import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: "default" | "purple" | "cyan" | "pink";
  title: string;
  highlightedText?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  badge,
  badgeVariant = "purple",
  title,
  highlightedText,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-3 sm:space-y-4 mb-8 sm:mb-10",
        align === "center"
          ? "items-center text-center max-w-3xl mx-auto"
          : "items-start text-start max-w-2xl",
        className,
      )}
    >
      {badge && (
        <Badge variant={badgeVariant} size="sm">
          {badge}
        </Badge>
      )}

      <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-brand-text-primary leading-[1.2] rtl:leading-[1.3]">
        {title}{" "}
        {highlightedText && (
          <span className="text-gradient-accent">{highlightedText}</span>
        )}
      </h2>

      {description && (
        <p className="font-sans text-sm sm:text-base text-brand-text-secondary leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
