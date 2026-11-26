"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { Locale } from "@/locales";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
  variant?: "pill" | "button" | "footer";
}

function buildLocalizedPathname(
  pathname: string | null,
  nextLocale: Locale,
): string | null {
  if (!pathname) return null;
  if (pathname === "/") {
    return `/${nextLocale}`;
  }
  if (pathname === "/en" || pathname === "/ar") {
    return `/${nextLocale}`;
  }
  if (pathname.startsWith("/en/")) {
    return `/${nextLocale}${pathname.slice(3)}`;
  }
  if (pathname.startsWith("/ar/")) {
    return `/${nextLocale}${pathname.slice(3)}`;
  }
  return null;
}

export function LanguageSwitcher({
  className,
  variant = "pill",
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (nextLocale: Locale) => {
    setLocale(nextLocale);
    const targetPath = buildLocalizedPathname(pathname, nextLocale);
    if (targetPath && targetPath !== pathname) {
      router.push(targetPath);
    }
  };

  if (variant === "footer") {
    return (
      <div
        className={cn("inline-flex flex-wrap items-center gap-2", className)}
      >
        <Globe className="h-4 w-4 text-brand-lavender-light shrink-0" />
        <span className="text-xs text-brand-text-muted">Language / اللغة:</span>
        <button
          type="button"
          onClick={() => switchTo("en")}
          className={cn(
            "px-2.5 py-1 rounded-md text-xs font-mono transition-colors",
            locale === "en"
              ? "bg-brand-coral text-brand-navy font-semibold shadow-sm"
              : "text-brand-text-secondary hover:text-white",
          )}
          aria-label="Switch to English"
        >
          English
        </button>
        <span className="text-brand-text-muted text-xs">/</span>
        <button
          type="button"
          onClick={() => switchTo("ar")}
          className={cn(
            "px-2.5 py-1 rounded-md text-xs font-sans transition-colors",
            locale === "ar"
              ? "bg-brand-coral text-brand-navy font-semibold shadow-sm"
              : "text-brand-text-secondary hover:text-white",
          )}
          aria-label="التبديل إلى العربية"
        >
          العربية
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => switchTo(locale === "en" ? "ar" : "en")}
      className={cn(
        "inline-flex h-9 items-center justify-center gap-1.5 shrink-0 px-2.5 sm:px-3 rounded-lg border border-brand-border-subtle bg-brand-surface-200/80 text-xs font-medium text-brand-text-secondary hover:border-brand-border hover:bg-brand-surface-200 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral",
        className,
      )}
      title={locale === "en" ? "التبديل إلى العربية" : "Switch to English"}
      aria-label={
        locale === "en"
          ? "Switch language to Arabic"
          : "Switch language to English"
      }
    >
      <Globe className="h-3.5 w-3.5 text-brand-lavender-light shrink-0" />
      <span
        className={cn(
          "font-medium",
          locale === "en" ? "font-sans" : "font-mono",
        )}
      >
        {locale === "en" ? "العربية" : "English"}
      </span>
    </button>
  );
}
