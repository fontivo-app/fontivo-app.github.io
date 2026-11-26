"use client";

import React from "react";
import { Cpu, Library, Layers, Palette } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useTranslation } from "@/context/LanguageContext";

export function BenefitsSection() {
  const { t } = useTranslation();

  const cards = [
    {
      icon: Cpu,
      title: t("desktopHighlights.card1Title"),
      desc: t("desktopHighlights.card1Desc"),
      accent: "text-brand-coral-light bg-brand-coral/10 border-brand-coral/30",
    },
    {
      icon: Library,
      title: t("desktopHighlights.card2Title"),
      desc: t("desktopHighlights.card2Desc"),
      accent:
        "text-brand-lavender-light bg-brand-lavender/10 border-brand-lavender/30",
    },
    {
      icon: Layers,
      title: t("desktopHighlights.card3Title"),
      desc: t("desktopHighlights.card3Desc"),
      accent: "text-brand-amber-light bg-brand-amber/10 border-brand-amber/30",
    },
    {
      icon: Palette,
      title: t("desktopHighlights.card4Title"),
      desc: t("desktopHighlights.card4Desc"),
      accent:
        "text-brand-lavender-light bg-brand-lavender/10 border-brand-lavender/30",
    },
  ];

  return (
    <section
      id="benefits"
      className="py-12 sm:py-16 border-t border-brand-border-subtle/50"
    >
      <Container>
        <SectionHeader
          badge={t("desktopHighlights.badge")}
          badgeVariant="purple"
          title={t("desktopHighlights.title")}
          highlightedText={t("desktopHighlights.highlighted")}
          description={t("desktopHighlights.subtitle")}
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="rounded-2xl border border-brand-border-subtle bg-brand-surface-200/60 p-6 flex flex-col gap-3 hover:border-brand-border transition-colors"
              >
                <div
                  className={`h-10 w-10 rounded-xl border flex items-center justify-center shrink-0 ${card.accent}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-white">
                  {card.title}
                </h3>
                <p className="text-sm text-brand-text-secondary leading-relaxed">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
