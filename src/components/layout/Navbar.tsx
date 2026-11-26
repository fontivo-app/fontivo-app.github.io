"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Github, Download } from "lucide-react";
import { FONTIVO_VERSION_TAG } from "@/config/version";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useTranslation, localePath } from "@/context/LanguageContext";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { t, locale } = useTranslation();

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const navItems = [
    {
      title: t("nav.home", "Home"),
      href: localePath(locale, "/"),
    },
    {
      title: t("nav.features", "Features"),
      href: localePath(locale, "/features"),
    },
    {
      title: t("nav.download", "Download"),
      href: localePath(locale, "/download"),
    },
    { title: t("nav.docs", "Docs"), href: localePath(locale, "/docs") },
    { title: t("nav.about", "About"), href: localePath(locale, "/about") },
    { title: t("nav.faq", "FAQ"), href: localePath(locale, "/faq") },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "bg-brand-navy/95 backdrop-blur-md border-b border-brand-border-subtle shadow-card"
          : "bg-brand-navy/80 backdrop-blur-sm border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Wordmark */}
        <Link
          href={localePath(locale, "/")}
          className="flex items-center gap-2.5 shrink-0 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral rounded-md"
        >
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-surface-200 border border-brand-border-subtle shadow-sm p-1.5">
            <Image
              src="/brand/fontivo-mark.svg"
              alt="Fontivo"
              width={24}
              height={24}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-base sm:text-lg font-bold tracking-tight text-white leading-none">
              Fontivo
            </span>
            <span className="font-mono text-[11px] text-brand-text-muted mt-0.5 leading-none ltr-isolate">
              {FONTIVO_VERSION_TAG}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-brand-text-secondary transition-colors hover:text-white rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          <LanguageSwitcher />

          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("nav.githubRepoLabel", "GitHub Repository")}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-brand-border-subtle bg-brand-surface-200/80 text-brand-text-secondary transition-colors hover:border-brand-border hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral"
          >
            <Github className="h-4 w-4" />
          </a>

          <Button
            href={localePath(locale, "/download")}
            variant="primary"
            size="sm"
            className="gap-1.5"
          >
            <Download className="h-4 w-4" />
            <span>{t("common.download", "Download")}</span>
          </Button>
        </div>

        {/* Mobile Actions — spacious for 320px+ screens */}
        <div className="flex md:hidden items-center gap-2 shrink-0">
          <LanguageSwitcher />

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-brand-border-subtle bg-brand-surface-200 text-brand-text-secondary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral"
            aria-expanded={mobileMenuOpen}
            aria-label={t("nav.toggleMenu", "Toggle navigation menu")}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-brand-border bg-brand-navy/95 backdrop-blur-md px-4 pt-3 pb-6 shadow-card">
          <div className="flex flex-col space-y-1.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-brand-text-secondary hover:bg-brand-surface-200 hover:text-white"
              >
                <span>{item.title}</span>
              </Link>
            ))}

            <div className="pt-3 mt-2 border-t border-brand-border-subtle flex flex-col gap-2.5">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg border border-brand-border bg-brand-surface-200 px-3 py-2.5 text-sm font-medium text-brand-text-secondary hover:text-white"
              >
                <Github className="h-4 w-4 shrink-0" />
                <span>{t("common.viewOnGithub", "View on GitHub")}</span>
              </a>

              <Button
                href={localePath(locale, "/download")}
                variant="primary"
                size="md"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full"
              >
                <Download className="h-4 w-4" />
                <span>{t("nav.downloadForWindows", "Download Fontivo")}</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
