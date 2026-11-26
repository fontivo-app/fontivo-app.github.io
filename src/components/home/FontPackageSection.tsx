"use client";

import React from "react";
import { Github, Download, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { useTranslation, localePath } from "@/context/LanguageContext";

export function FontPackageSection() {
  const { t, locale } = useTranslation();

  const totalFontsNum = 10939;
  const scripts = [
    {
      label: t("fontPackage.scriptLatin", "Latin"),
      count: 7146,
      color: "bg-brand-coral",
    },
    {
      label: t("fontPackage.scriptUrdu", "Urdu"),
      count: 1565,
      color: "bg-brand-lavender",
    },
    {
      label: t("fontPackage.scriptPersian", "Persian"),
      count: 1257,
      color: "bg-brand-amber",
    },
    {
      label: t("fontPackage.scriptArabic", "Arabic"),
      count: 971,
      color: "bg-brand-lime",
    },
  ];

  const metrics = [
    { value: "10,939", label: t("fontPackage.totalLabel") },
    { value: "4,430", label: t("fontPackage.familiesLabel") },
    { value: "15", label: t("fontPackage.packsLabel") },
    { value: "864.01 MB", label: t("fontPackage.sizeLabel") },
  ];

  return (
    <section
      id="font-library"
      className="py-12 sm:py-16 border-t border-brand-border-subtle/50"
    >
      <Container>
        <SectionHeader
          badge={t("fontPackage.badge")}
          badgeVariant="cyan"
          title={t("fontPackage.title")}
          highlightedText={t("fontPackage.highlighted")}
          description={t("fontPackage.subtitle")}
          align="center"
        />

        <div className="max-w-4xl mx-auto rounded-2xl border border-brand-border bg-brand-surface-200/70 p-6 sm:p-8 shadow-card space-y-6">
          {/* Top Summary Numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-brand-border-subtle bg-brand-surface-300/70 p-4 text-center"
              >
                <div className="font-mono text-xl sm:text-2xl font-bold text-white ltr-isolate">
                  {m.value}
                </div>
                <div className="text-xs text-brand-text-secondary mt-1">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* 4-Script Verified Distribution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {scripts.map((item) => {
              const pct = Math.round((item.count / totalFontsNum) * 100);
              return (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium text-white flex items-center gap-2">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${item.color} shrink-0`}
                      />
                      <span>{item.label}</span>
                    </span>
                    <span className="font-mono text-brand-text-secondary ltr-isolate">
                      {item.count.toLocaleString()} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-brand-navy overflow-hidden border border-brand-border-subtle">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${Math.max(pct, 6)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust Note & Actions */}
          <div className="pt-4 border-t border-brand-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-text-secondary text-center sm:text-start">
              <CheckCircle2 className="h-4 w-4 text-brand-coral-light shrink-0" />
              <span>
                {locale === "ar"
                  ? "تسمية موحدة بالإنجليزية • بدون ملفات مكررة • تحقق SHA-256"
                  : "English metadata naming • SHA-256 deduplicated • Ready to extract"}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Button
                href={localePath(locale, "/download#font-packs")}
                variant="primary"
                size="md"
              >
                <Download className="h-4 w-4" />
                <span>{t("fontPackage.ctaDownloadPacks")}</span>
              </Button>
              <Button
                href={siteConfig.links.fontsGithub}
                external
                variant="outline"
                size="md"
              >
                <Github className="h-4 w-4" />
                <span>{t("fontPackage.ctaViewRepo")}</span>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
