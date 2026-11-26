"use client";

import React from "react";
import Image from "next/image";
import { Download, Library } from "lucide-react";
import { FONTIVO_VERSION_TAG } from "@/config/version";
import { assetPath } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useTranslation, localePath } from "@/context/LanguageContext";

export function Hero() {
  const { t, locale } = useTranslation();

  const stats = [
    {
      num: t("hero.stat1Number"),
      label: t("hero.stat1Label"),
      sub: t("hero.stat1Sub"),
    },
    {
      num: t("hero.stat2Number"),
      label: t("hero.stat2Label"),
      sub: t("hero.stat2Sub"),
    },
    {
      num: t("hero.stat3Number"),
      label: t("hero.stat3Label"),
      sub: t("hero.stat3Sub"),
    },
  ];

  return (
    <section className="relative pt-14 pb-12 sm:pt-20 sm:pb-16 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-gradient-radial from-brand-coral/15 via-brand-lavender/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <Container>
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
          {/* Compact Version Badge with Animated Brand Mark */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-brand-coral/35 bg-brand-surface-200/90 px-3.5 py-1.5 shadow-sm">
            <Image
              src={assetPath("/brand/fontivo-mark-animated.svg")}
              alt="Fontivo"
              width={18}
              height={18}
              className="object-contain shrink-0"
              priority
              unoptimized
            />
            <span className="font-mono text-xs font-semibold text-brand-coral-light ltr-isolate">
              {t(
                "hero.badge",
                `Fontivo ${FONTIVO_VERSION_TAG} • Windows 10 / 11`,
              )}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15] rtl:leading-[1.25]">
            {t("hero.titleLine1")}{" "}
            <span className="text-gradient-accent block sm:inline">
              {t("hero.titleLine2")}
            </span>
          </h1>

          {/* Concise Subtitle */}
          <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed max-w-2xl">
            {t("hero.subtitle")}
          </p>

          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto pt-1">
            <Button
              href={localePath(locale, "/download")}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Download className="h-5 w-5" />
              <span>{t("hero.ctaDownload")}</span>
              <span className="font-mono text-xs opacity-80 ltr-isolate">
                ({FONTIVO_VERSION_TAG})
              </span>
            </Button>

            <Button
              href={localePath(locale, "/download#font-packs")}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Library className="h-4 w-4 text-brand-lavender-light" />
              <span>{t("hero.ctaExploreFonts")}</span>
            </Button>
          </div>

          {/* 3 Clean Key Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-brand-border-subtle/80 w-full">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-xl bg-brand-surface-200/60 border border-brand-border-subtle p-4 flex flex-col items-center text-center"
              >
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white ltr-isolate">
                  {item.num}
                </span>
                <span className="text-sm font-semibold text-brand-text-primary mt-1">
                  {item.label}
                </span>
                <span className="text-xs text-brand-text-muted mt-0.5">
                  {item.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
