"use client";

import React, { useState } from "react";
import {
  Download,
  ShieldCheck,
  Package,
  Cpu,
  Terminal,
  Copy,
  Check,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { currentRelease } from "@/config/releases";
import {
  FONTIVO_FONTS_REPO,
  FONTIVO_FONTS_VERSION_TAG,
} from "@/config/version";
import { copyTextToClipboard } from "@/lib/utils";
import { useTranslation } from "@/context/LanguageContext";

export function DocsClient() {
  const { t, locale } = useTranslation();
  const isAr = locale === "ar";
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const installer = currentRelease.assets[0];

  const handleCopy = async (text: string, id: string) => {
    const ok = await copyTextToClipboard(text);
    if (ok) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2200);
    }
  };

  const verifyCmd = `Get-FileHash .\\${installer.filename} -Algorithm SHA256`;

  const steps = [
    {
      title: t("docsPage.step1Title"),
      desc: t("docsPage.step1Desc"),
      icon: Download,
    },
    {
      title: t("docsPage.step2Title"),
      desc: t("docsPage.step2Desc"),
      icon: ShieldCheck,
    },
    {
      title: t("docsPage.step3Title"),
      desc: t("docsPage.step3Desc"),
      icon: Package,
    },
    {
      title: t("docsPage.step4Title"),
      desc: t("docsPage.step4Desc"),
      icon: Cpu,
    },
  ];

  const techRows = [
    {
      component: isAr ? "تفعيل الخطوط بالذاكرة" : "Win32 RAM Font Mount",
      detail: "AddFontResourceExW (FR_PRIVATE) + WM_FONTCHANGE",
    },
    {
      component: isAr
        ? "مجلد بيانات التطبيق المحلي"
        : "Local App State & Cache",
      detail: "%LOCALAPPDATA%\\Fontivo\\ (0 Windows Registry writes)",
    },
    {
      component: isAr ? "خادم ربط Adobe CC" : "Adobe CC Loopback Bridge",
      detail: "http://127.0.0.1:27715 (Local-only .PSD / .AI / .INDD scanner)",
    },
    {
      component: isAr ? "إصدار مكتبة الخطوط" : "Fontivo-Fonts Release",
      detail: `${FONTIVO_FONTS_REPO} ${FONTIVO_FONTS_VERSION_TAG} (15 ZIPs • 10,939 fonts)`,
    },
  ];

  return (
    <div className="relative py-12 sm:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <Container size="default" className="relative z-10 space-y-12">
        <SectionHeader
          badge={t("docsPage.badge")}
          badgeVariant="cyan"
          title={t("docsPage.title")}
          description={t("docsPage.subtitle")}
          align="center"
        />

        {/* 4-Step Quick Start */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="rounded-2xl border border-brand-border bg-brand-surface-200/70 p-6 space-y-3 shadow-card min-w-0"
              >
                <div className="h-10 w-10 rounded-xl bg-brand-lavender/15 border border-brand-lavender/35 text-brand-lavender-light flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="font-display text-base sm:text-lg font-bold text-white">
                  {step.title}
                </h2>
                <p className="text-sm text-brand-text-secondary leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </section>

        {/* SHA-256 PowerShell Verification */}
        <section className="max-w-4xl mx-auto rounded-2xl border border-brand-border bg-brand-surface-200/70 p-6 space-y-4 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Terminal className="h-4 w-4 text-brand-coral-light shrink-0" />
              <span>{t("downloadPage.verifyTitle")}</span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleCopy(verifyCmd, "verify-all")}
              className="gap-1.5"
            >
              {copiedId === "verify-all" ? (
                <>
                  <Check className="h-3.5 w-3.5 text-brand-coral-light" />
                  <span>{t("common.copied")}</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>{t("common.copy")}</span>
                </>
              )}
            </Button>
          </div>

          <div className="rounded-xl bg-brand-surface-100 border border-brand-border-subtle p-4 min-w-0 overflow-x-auto">
            <pre className="font-mono text-xs text-brand-lavender-light ltr-isolate">
              {verifyCmd}
            </pre>
          </div>

          <div className="rounded-xl bg-brand-surface-100 border border-brand-border-subtle p-3 space-y-1 min-w-0 text-xs">
            <div className="font-mono text-white truncate ltr-isolate">
              {installer.filename}
            </div>
            <div className="font-mono text-[11px] text-brand-text-muted break-all ltr-isolate">
              {installer.sha256}
            </div>
          </div>
        </section>

        {/* Core Paths & Local Ports */}
        <section className="max-w-4xl mx-auto space-y-4">
          <h2 className="font-display text-xl font-bold text-white">
            {t("docsPage.techTitle")}
          </h2>

          <div className="rounded-2xl border border-brand-border bg-brand-surface-200/60 overflow-hidden divide-y divide-brand-border-subtle">
            {techRows.map((row) => (
              <div
                key={row.component}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 min-w-0"
              >
                <span className="text-sm font-medium text-white">
                  {row.component}
                </span>
                <code className="font-mono text-xs text-brand-lavender-light break-all ltr-isolate">
                  {row.detail}
                </code>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
