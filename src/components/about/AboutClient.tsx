"use client";

import * as React from "react";
import { Cpu, ShieldCheck, Zap, Heart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DevelopersSection } from "@/components/common/DevelopersSection";
import { useTranslation } from "@/context/LanguageContext";

export function AboutClient() {
  const { t } = useTranslation();

  const principles = [
    {
      title: t("aboutPage.p1Title"),
      desc: t("aboutPage.p1Desc"),
      icon: Cpu,
    },
    {
      title: t("aboutPage.p2Title"),
      desc: t("aboutPage.p2Desc"),
      icon: ShieldCheck,
    },
    {
      title: t("aboutPage.p3Title"),
      desc: t("aboutPage.p3Desc"),
      icon: Zap,
    },
    {
      title: t("aboutPage.p4Title"),
      desc: t("aboutPage.p4Desc"),
      icon: Heart,
    },
  ];

  return (
    <div className="relative py-12 sm:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <Container size="default" className="relative z-10 space-y-12">
        <SectionHeader
          badge={t("aboutPage.badge")}
          badgeVariant="purple"
          title={t("aboutPage.title")}
          description={t("aboutPage.subtitle")}
          align="center"
        />

        {/* Why Fontivo Exists */}
        <section className="max-w-3xl mx-auto rounded-2xl border border-brand-border bg-brand-surface-200/70 p-6 sm:p-8 space-y-4 shadow-card">
          <p className="font-mono text-xs font-semibold text-brand-coral-light">
            {t("aboutPage.storyBadge")}
          </p>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
            {t("aboutPage.storyTitle")}
          </h2>
          <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed">
            {t("aboutPage.storyP1")}
          </p>
          <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed">
            {t("aboutPage.storyP2")}
          </p>
        </section>

        {/* Four Core Commitments */}
        <section className="space-y-6">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white text-center">
            {t("aboutPage.principlesTitle")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-brand-border bg-brand-surface-200/60 p-6 space-y-3"
                >
                  <div className="h-10 w-10 rounded-xl bg-brand-coral/15 border border-brand-coral/35 text-brand-coral-light flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-brand-text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </Container>

      <DevelopersSection />
    </div>
  );
}
