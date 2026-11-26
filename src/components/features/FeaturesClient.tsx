"use client";

import * as React from "react";
import {
  Cpu,
  Library,
  Layers,
  Zap,
  Palette,
  FileSearch,
  Sliders,
  Star,
  ShieldCheck,
  CheckCircle2,
  PackageCheck,
} from "lucide-react";
import { Feature } from "@/config/features";
import { coreFeaturesAr } from "@/config/featuresAr";
import { Badge } from "@/components/ui/Badge";
import { cn, assetPath } from "@/lib/utils";
import { evaluateWcagContrast } from "@/lib/wcag";
import { useTranslation } from "@/context/LanguageContext";

interface FeaturesClientProps {
  features: Feature[];
}

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  Library,
  Layers,
  Zap,
  Palette,
  FileSearch,
  Sliders,
  Star,
  ShieldCheck,
  PackageCheck,
};

const BG_SWATCHES = [
  { hex: "#130C16", label: "Deep Plum" },
  { hex: "#291C2E", label: "Plum Ink" },
  { hex: "#F5EBDD", label: "Warm Paper" },
  { hex: "#FFF9F2", label: "Paper White" },
];

const FG_SWATCHES = [
  { hex: "#FFF9F2", label: "Paper White" },
  { hex: "#F16B50", label: "Coral" },
  { hex: "#B7A1D9", label: "Lavender" },
  { hex: "#130C16", label: "Deep Plum" },
];

export function FeaturesClient({ features }: FeaturesClientProps) {
  const { t, locale, isRTL } = useTranslation();
  const isAr = locale === "ar";
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  // Specimen & WCAG live state
  const [specimenScript, setSpecimenScript] = React.useState<"en" | "ar">(
    isAr ? "ar" : "en",
  );
  const [customSpecimen, setCustomSpecimen] = React.useState("");
  const [previewSize, setPreviewSize] = React.useState(28);
  const [bgColor, setBgColor] = React.useState("#130C16");
  const [fgColor, setFgColor] = React.useState("#FFF9F2");

  const localizedFeatures = React.useMemo(() => {
    if (!isAr) return features;
    const arMap = new Map(coreFeaturesAr.map((f) => [f.id, f]));
    return features.map((f) => arMap.get(f.id) ?? f);
  }, [features, isAr]);

  const filteredFeatures = React.useMemo(() => {
    if (selectedCategory === "all") return localizedFeatures;
    return localizedFeatures.filter((f) => f.category === selectedCategory);
  }, [localizedFeatures, selectedCategory]);

  const categories = [
    { id: "all", label: t("featuresPage.categoryAll") },
    { id: "performance", label: t("featuresPage.categoryPerformance") },
    { id: "core", label: t("featuresPage.categoryCore") },
    { id: "cloud", label: t("featuresPage.categoryCloud") },
    { id: "integration", label: t("featuresPage.categoryIntegration") },
    { id: "brand", label: t("featuresPage.categoryBrand") },
    { id: "security", label: t("featuresPage.categorySecurity") },
  ];

  const activeText =
    customSpecimen.trim() ||
    (specimenScript === "ar"
      ? t("featuresPage.specimenSampleAr")
      : t("featuresPage.specimenSampleEn"));

  const wcag = evaluateWcagContrast(fgColor, bgColor);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Category Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => {
          const active = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-colors",
                active
                  ? "bg-brand-coral text-brand-navy border-brand-coral font-semibold"
                  : "bg-brand-surface-200/70 text-brand-text-secondary border-brand-border hover:text-white",
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* 6 Engineering Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFeatures.map((feature) => {
          const Icon = iconMap[feature.iconName] || Cpu;
          return (
            <article
              key={feature.id}
              id={feature.id}
              className="rounded-2xl border border-brand-border bg-brand-surface-200/70 p-6 flex flex-col justify-between gap-5 shadow-card min-w-0"
            >
              <div className="space-y-4 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-xl bg-brand-coral/15 border border-brand-coral/35 text-brand-coral-light flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-display text-lg font-bold text-white break-words">
                        {feature.title}
                      </h2>
                      <p className="text-xs text-brand-lavender-light">
                        {feature.shortTitle}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    size="sm"
                    className="ltr-isolate shrink-0"
                  >
                    {feature.badge}
                  </Badge>
                </div>

                <p className="text-sm text-brand-text-secondary leading-relaxed">
                  {feature.description}
                </p>

                <ul className="space-y-2">
                  {feature.highlights.map((hl) => (
                    <li
                      key={hl}
                      className="flex items-start gap-2 text-xs sm:text-sm text-brand-text-secondary"
                    >
                      <CheckCircle2 className="h-4 w-4 text-brand-lime shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-brand-border-subtle flex flex-wrap gap-2">
                {feature.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="rounded-lg bg-brand-surface-100 border border-brand-border-subtle px-2.5 py-1 text-xs"
                  >
                    <span className="text-brand-text-muted">
                      {spec.label}:{" "}
                    </span>
                    <span className="font-mono font-semibold text-white ltr-isolate">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      {/* Lightweight Specimen & WCAG Contrast Lab */}
      <section
        id="wcag-lab"
        className="rounded-2xl border border-brand-border bg-brand-surface-200/70 p-6 sm:p-8 shadow-card space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <Badge variant="cyan" size="sm">
              {t("featuresPage.playgroundBadge")}
            </Badge>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
              {t("featuresPage.playgroundTitle")}
            </h2>
            <p className="text-sm text-brand-text-secondary">
              {t("featuresPage.playgroundSubtitle")}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setSpecimenScript("en")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors",
                specimenScript === "en"
                  ? "bg-brand-coral text-brand-navy border-brand-coral font-semibold"
                  : "bg-brand-surface-100 text-brand-text-secondary border-brand-border",
              )}
            >
              Latin
            </button>
            <button
              type="button"
              onClick={() => setSpecimenScript("ar")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors",
                specimenScript === "ar"
                  ? "bg-brand-coral text-brand-navy border-brand-coral font-semibold"
                  : "bg-brand-surface-100 text-brand-text-secondary border-brand-border",
              )}
            >
              العربية
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Controls */}
          <div className="space-y-4 min-w-0">
            <div className="space-y-1.5">
              <label
                htmlFor="specimen-custom-input"
                className="text-xs font-mono text-brand-text-muted"
              >
                {t("common.search")} / Specimen
              </label>
              <input
                id="specimen-custom-input"
                type="text"
                value={customSpecimen}
                onChange={(e) => setCustomSpecimen(e.target.value)}
                dir={specimenScript === "ar" || isRTL ? "rtl" : "ltr"}
                placeholder={
                  specimenScript === "ar"
                    ? t("featuresPage.specimenSampleAr")
                    : t("featuresPage.specimenSampleEn")
                }
                className="w-full h-10 px-3 rounded-xl bg-brand-surface-100 border border-brand-border text-sm text-white placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-coral"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-brand-text-muted">
                  {t("featuresPage.textSizeLabel")}
                </span>
                <span className="text-white ltr-isolate">{previewSize}px</span>
              </div>
              <input
                type="range"
                min={16}
                max={44}
                value={previewSize}
                onChange={(e) => setPreviewSize(Number(e.target.value))}
                aria-label={t("featuresPage.textSizeLabel")}
                className="w-full accent-brand-coral cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-2">
                <span className="font-mono text-brand-text-muted block">
                  {t("featuresPage.bgColorLabel")}
                </span>
                <div className="flex flex-wrap gap-2">
                  {BG_SWATCHES.map((s) => (
                    <button
                      key={s.hex}
                      type="button"
                      onClick={() => setBgColor(s.hex)}
                      title={s.label}
                      aria-label={`Surface ${s.label}`}
                      className={cn(
                        "h-7 w-7 rounded-lg border-2 transition-transform",
                        bgColor === s.hex
                          ? "border-brand-coral scale-110"
                          : "border-brand-border",
                      )}
                      style={{ backgroundColor: s.hex }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-brand-text-muted block">
                  {t("featuresPage.fgColorLabel")}
                </span>
                <div className="flex flex-wrap gap-2">
                  {FG_SWATCHES.map((s) => (
                    <button
                      key={s.hex}
                      type="button"
                      onClick={() => setFgColor(s.hex)}
                      title={s.label}
                      aria-label={`Text ${s.label}`}
                      className={cn(
                        "h-7 w-7 rounded-lg border-2 transition-transform",
                        fgColor === s.hex
                          ? "border-brand-coral scale-110"
                          : "border-brand-border",
                      )}
                      style={{ backgroundColor: s.hex }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Live Surface Preview */}
          <div
            className="lg:col-span-2 flex flex-col justify-between gap-4 rounded-xl border border-brand-border-subtle p-6 min-h-[200px] min-w-0 overflow-hidden"
            style={{ backgroundColor: bgColor, color: fgColor }}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono opacity-85">
              <span className="ltr-isolate">
                {fgColor} on {bgColor}
              </span>
              <span className="px-2 py-0.5 rounded-full border border-current/25 ltr-isolate">
                {t("featuresPage.contrastLabel")}: {wcag.ratioFormatted} •{" "}
                {wcag.normalTextAAA
                  ? "WCAG AAA"
                  : wcag.normalTextAA
                    ? "WCAG AA"
                    : "Large Text"}
              </span>
            </div>

            <p
              dir={specimenScript === "ar" ? "rtl" : "ltr"}
              className="font-sans font-bold leading-snug break-words"
              style={{ fontSize: `${previewSize}px` }}
            >
              {activeText}
            </p>
          </div>
        </div>
      </section>

      {/* Architecture, Demo & Benchmarks Visual Diagrams */}
      <section className="rounded-2xl border border-brand-border bg-brand-surface-100 p-6 sm:p-8 shadow-card">
        <div className="mb-6">
          <Badge variant="purple">
            {isAr ? "المعمارية والأداء" : "Architecture & Benchmarks"}
          </Badge>
          <h2 className="mt-2 font-display text-xl sm:text-2xl font-bold text-white">
            {isAr
              ? "نظرة بصرية على محرك Fontivo والأداء الفعلي"
              : "Visual Overview of Fontivo Engine & Benchmarks"}
          </h2>
        </div>

        <div className="space-y-8">
          <div className="rounded-xl border border-brand-border-subtle bg-brand-plum-dark p-3 overflow-hidden">
            <img
              src={assetPath("/diagrams/fontivo-hero-demo.svg")}
              alt="Fontivo Desktop Studio Interactive Demo"
              className="w-full h-auto rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl border border-brand-border-subtle bg-brand-plum-dark p-3 overflow-hidden">
              <img
                src={assetPath("/diagrams/architecture-diagram.svg")}
                alt="Fontivo Core System Architecture"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="rounded-xl border border-brand-border-subtle bg-brand-plum-dark p-3 overflow-hidden">
              <img
                src={assetPath("/diagrams/benchmarks.svg")}
                alt="Fontivo Performance Benchmarks"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
