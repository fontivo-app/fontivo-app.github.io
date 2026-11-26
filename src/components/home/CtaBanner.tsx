"use client";

import React, { useState } from "react";
import {
  Download,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  Terminal,
} from "lucide-react";
import {
  FONTIVO_INSTALLER_FILENAME,
  FONTIVO_INSTALLER_SIZE_FORMATTED,
  FONTIVO_INSTALLER_SHA256,
  FONTIVO_INSTALLER_DOWNLOAD_URL,
  UNIX_INSTALL_CMD,
} from "@/config/version";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useTranslation, localePath } from "@/context/LanguageContext";

export function CtaBanner() {
  const { t, locale, isRTL } = useTranslation();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (val: string, id: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="py-12 sm:py-16 border-t border-brand-border-subtle/50">
      <Container>
        <div className="max-w-4xl mx-auto rounded-2xl border border-brand-border bg-brand-surface-200/70 p-6 sm:p-10 shadow-card space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2.5">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              {t("cta.title")}
            </h2>
            <p className="text-sm sm:text-base text-brand-text-secondary">
              {t("cta.subtitle")}
            </p>
          </div>

          {/* Windows Installer + macOS/Linux Script */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Windows Installer */}
            <div className="rounded-xl border border-brand-coral/40 bg-brand-navy/80 p-5 flex flex-col justify-between gap-4 min-w-0">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display font-bold text-base text-white">
                    {t("cta.installerTitle")}
                  </h3>
                  <span className="font-mono text-xs text-brand-coral-light ltr-isolate shrink-0">
                    {FONTIVO_INSTALLER_SIZE_FORMATTED}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-brand-text-secondary">
                  {t("cta.installerDesc")}
                </p>
              </div>

              <div className="space-y-2.5">
                <Button
                  href={FONTIVO_INSTALLER_DOWNLOAD_URL}
                  external
                  variant="primary"
                  size="md"
                  className="w-full"
                >
                  <Download className="h-4 w-4" />
                  <span className="ltr-isolate">
                    {FONTIVO_INSTALLER_FILENAME}
                  </span>
                </Button>

                <button
                  type="button"
                  onClick={() => handleCopy(FONTIVO_INSTALLER_SHA256, "setup")}
                  className="w-full flex items-center justify-between gap-2 rounded-lg border border-brand-border-subtle bg-brand-surface-100 px-3 py-1.5 text-xs font-mono text-brand-text-muted hover:text-white transition-colors"
                >
                  <span className="truncate ltr-isolate">
                    SHA-256: {FONTIVO_INSTALLER_SHA256.slice(0, 14)}...
                  </span>
                  <span className="inline-flex items-center gap-1 shrink-0 text-brand-coral-light">
                    {copiedKey === "setup" ? (
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
                  </span>
                </button>
              </div>
            </div>

            {/* macOS & Linux install.sh */}
            <div className="rounded-xl border border-brand-border bg-brand-navy/80 p-5 flex flex-col justify-between gap-4 min-w-0">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display font-bold text-base text-white">
                    {t("cta.unixTitle")}
                  </h3>
                  <Terminal className="h-4 w-4 text-brand-lavender-light shrink-0" />
                </div>
                <p className="text-xs sm:text-sm text-brand-text-secondary">
                  {t("cta.unixDesc")}
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="rounded-lg border border-brand-border-subtle bg-brand-surface-100 px-3 py-2 overflow-x-auto">
                  <code className="font-mono text-[11px] text-brand-lavender-light whitespace-pre ltr-isolate">
                    {UNIX_INSTALL_CMD}
                  </code>
                </div>

                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={() => handleCopy(UNIX_INSTALL_CMD, "unix")}
                  className="w-full"
                >
                  {copiedKey === "unix" ? (
                    <>
                      <Check className="h-4 w-4 text-brand-coral-light" />
                      <span>{t("common.copied")}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>{t("common.copy")}</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-1">
            <Button
              href={localePath(locale, "/download")}
              variant="outline"
              size="md"
            >
              <span>{t("cta.allDownloadsBtn")}</span>
              <ArrowIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
