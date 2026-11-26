"use client";

import React from "react";
import { Github, Globe, ExternalLink, Code2, Palette } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useTranslation } from "@/context/LanguageContext";

export function DevelopersSection() {
  const { t, locale } = useTranslation();

  return (
    <section
      id="developers"
      className="py-12 sm:py-16 border-t border-brand-border-subtle/50"
    >
      <Container>
        <SectionHeader
          badge={t("developers.badge")}
          badgeVariant="purple"
          title={t("developers.title")}
          highlightedText={t("developers.highlighted")}
          description={t("developers.subtitle")}
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {siteConfig.developers.map((dev) => {
            const isCoral = dev.accent === "coral";
            const Icon = dev.id === "ahmed-fahmy" ? Code2 : Palette;
            return (
              <div
                key={dev.id}
                className="rounded-2xl border border-brand-border bg-brand-surface-200/70 p-6 flex flex-col justify-between gap-5 shadow-card"
              >
                <div className="space-y-3 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge
                      variant={isCoral ? "purple" : "cyan"}
                      size="sm"
                      className="gap-1.5"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{dev.role}</span>
                    </Badge>
                    <span className="font-mono text-xs text-brand-text-muted ltr-isolate">
                      {dev.specialty}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <div
                      className={`h-11 w-11 rounded-xl flex items-center justify-center font-display font-bold text-sm shrink-0 border ${
                        isCoral
                          ? "bg-brand-coral/15 border-brand-coral/35 text-brand-coral-light"
                          : "bg-brand-lavender/15 border-brand-lavender/35 text-brand-lavender-light"
                      }`}
                    >
                      {dev.initials}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-bold text-white break-words">
                        {locale === "ar" ? dev.nameAr : dev.nameEn}
                      </h3>
                      <p className="font-mono text-xs text-brand-text-muted ltr-isolate">
                        {dev.role}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-brand-text-secondary leading-relaxed">
                    {locale === "ar" ? dev.summaryAr : dev.summaryEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-border-subtle flex flex-wrap items-center gap-3 text-xs font-mono">
                  {dev.githubUrl && (
                    <a
                      href={dev.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-brand-coral-light hover:text-white transition-colors"
                    >
                      <Github className="h-4 w-4 shrink-0" />
                      <span>
                        {dev.githubHandle || t("developers.githubBtn")}
                      </span>
                      <ExternalLink className="h-3 w-3 shrink-0" />
                    </a>
                  )}
                  <a
                    href={dev.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-brand-lavender-light hover:text-white transition-colors"
                  >
                    <Globe className="h-4 w-4 shrink-0" />
                    <span>{t("developers.portfolioBtn", "Portfolio")}</span>
                    <ExternalLink className="h-3 w-3 shrink-0" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Official Project Links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-brand-border bg-brand-surface-200/70 text-brand-text-secondary hover:text-white hover:border-brand-coral/50 transition-colors"
          >
            <Github className="h-3.5 w-3.5 text-brand-coral-light" />
            <span>{t("developers.mainRepoLabel")}</span>
          </a>
          <a
            href={siteConfig.links.fontsGithub}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-brand-border bg-brand-surface-200/70 text-brand-text-secondary hover:text-white hover:border-brand-lavender/50 transition-colors"
          >
            <Github className="h-3.5 w-3.5 text-brand-lavender-light" />
            <span>{t("developers.fontsRepoLabel")}</span>
          </a>
          <a
            href={siteConfig.links.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-brand-border bg-brand-surface-200/70 text-brand-text-secondary hover:text-white hover:border-brand-amber/50 transition-colors"
          >
            <Globe className="h-3.5 w-3.5 text-brand-amber-light" />
            <span className="ltr-isolate">{t("developers.websiteLabel")}</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
