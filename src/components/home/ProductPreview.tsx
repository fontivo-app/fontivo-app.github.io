"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Type,
  Layers,
  Palette,
  Search,
  CheckCircle2,
  Power,
} from "lucide-react";
import { useLatestRelease } from "@/hooks/useLatestRelease";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/context/LanguageContext";
import { evaluateWcagContrast } from "@/lib/wcag";
import { assetPath } from "@/lib/utils";

type WorkspaceTab = "library" | "bridge" | "color";

const SAMPLE_FONTS = [
  {
    id: "sora",
    name: "Sora Bold",
    family: "Display Sans",
    script: "Latin",
    style: "var(--font-sora), sans-serif",
  },
  {
    id: "tajawal",
    name: "Tajawal",
    family: "Arabic UI",
    script: "Arabic",
    style: "var(--font-tajawal), sans-serif",
  },
  {
    id: "inter",
    name: "Inter Medium",
    family: "Interface",
    script: "Latin",
    style: "var(--font-inter), sans-serif",
  },
  {
    id: "mono",
    name: "JetBrains Mono",
    family: "Monospace",
    script: "Code",
    style: "var(--font-mono), monospace",
  },
];

const BRAND_SWATCHES = [
  { name: "Plum Ink", hex: "#291C2E" },
  { name: "Coral", hex: "#F16B50" },
  { name: "Lavender", hex: "#B7A1D9" },
  { name: "Amber", hex: "#F7B544" },
  { name: "Warm Paper", hex: "#F5EBDD" },
];

export function ProductPreview() {
  const { t, locale } = useTranslation();
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("library");
  const [selectedFontId, setSelectedFontId] = useState("sora");
  const [mountedMap, setMountedMap] = useState<Record<string, boolean>>({
    sora: true,
    tajawal: true,
  });
  const [samplePreset, setSamplePreset] = useState<"en" | "ar">(
    locale === "ar" ? "ar" : "en",
  );
  const [fontSize, setFontSize] = useState(26);
  const [activeSwatch, setActiveSwatch] = useState("#F16B50");

  const currentFont =
    SAMPLE_FONTS.find((f) => f.id === selectedFontId) || SAMPLE_FONTS[0];
  const isMounted = Boolean(mountedMap[currentFont.id]);

  const sampleText =
    samplePreset === "ar"
      ? "فونتيفو — خطوطك وهويتك في مساحة عمل واحدة"
      : "Fontivo — Type. Design. Deliver. 0123456789";

  const contrast = evaluateWcagContrast(activeSwatch, "#130C16");

  return (
    <section id="workspace" className="py-12 sm:py-16">
      <Container>
        <SectionHeader
          badge={t("preview.badge")}
          badgeVariant="cyan"
          title={t("preview.title")}
          highlightedText={t("preview.highlighted")}
          description={t("preview.subtitle")}
          align="center"
        />

        <div className="max-w-5xl mx-auto rounded-2xl border border-brand-border bg-brand-surface-100 shadow-card overflow-hidden">
          {/* Desktop Window Title Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-border-subtle bg-brand-plum px-4 py-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <Image
                src={assetPath("/brand/fontivo-mark.svg")}
                alt="Fontivo"
                width={18}
                height={18}
                className="shrink-0"
              />
              <span className="font-display font-bold text-sm text-white">
                Fontivo
              </span>
              <span className="font-mono text-xs text-brand-lavender-light ltr-isolate">
                {useLatestRelease().tag}
              </span>
            </div>

            {/* Clean Tab Switcher */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                {
                  id: "library" as WorkspaceTab,
                  label: t("preview.tabLibrary"),
                  icon: Type,
                },
                {
                  id: "bridge" as WorkspaceTab,
                  label: t("preview.tabBridge"),
                  icon: Layers,
                },
                {
                  id: "color" as WorkspaceTab,
                  label: t("preview.tabColor"),
                  icon: Palette,
                },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                      active
                        ? "bg-brand-coral text-brand-navy"
                        : "bg-brand-surface-200 text-brand-text-secondary hover:text-white"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-brand-lavender/35 bg-brand-lavender/10 px-2.5 py-1 text-xs font-mono text-brand-lavender-light ltr-isolate">
              <span className="h-2 w-2 rounded-full bg-brand-coral" />
              <span>{t("preview.ramBadge")}</span>
            </span>
          </div>

          {/* Workspace Body */}
          <div className="p-5 sm:p-6">
            {activeTab === "library" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Font List */}
                <div className="lg:col-span-5 space-y-2.5 min-w-0">
                  <div className="relative">
                    <Search className="h-4 w-4 text-brand-text-muted absolute top-1/2 -translate-y-1/2 start-3 pointer-events-none" />
                    <input
                      type="text"
                      readOnly
                      value={t("preview.searchPlaceholder")}
                      aria-label={t("preview.searchPlaceholder")}
                      className="w-full rounded-lg border border-brand-border-subtle bg-brand-navy ps-9 pe-3 py-2 text-xs text-brand-text-muted focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    {SAMPLE_FONTS.map((font) => {
                      const selected = font.id === selectedFontId;
                      const mounted = Boolean(mountedMap[font.id]);
                      return (
                        <button
                          key={font.id}
                          type="button"
                          onClick={() => setSelectedFontId(font.id)}
                          className={`w-full text-start rounded-xl border p-3 flex items-center justify-between gap-2 transition-colors ${
                            selected
                              ? "border-brand-coral bg-brand-coral/10"
                              : "border-brand-border-subtle bg-brand-surface-200/60 hover:border-brand-border"
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="font-semibold text-sm text-white truncate">
                              {font.name}
                            </div>
                            <div className="text-xs text-brand-text-muted">
                              {font.family} • {font.script}
                            </div>
                          </div>
                          <span
                            className={`text-xs font-mono px-2 py-0.5 rounded-full shrink-0 ${
                              mounted
                                ? "bg-brand-lavender/15 text-brand-lavender-light border border-brand-lavender/30"
                                : "bg-brand-navy text-brand-text-muted border border-brand-border-subtle"
                            }`}
                          >
                            {mounted
                              ? t("preview.statusActive")
                              : t("preview.statusInactive")}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Live Specimen Panel */}
                <div className="lg:col-span-7 rounded-xl border border-brand-border-subtle bg-brand-navy p-5 flex flex-col justify-between gap-4 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-border-subtle pb-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSamplePreset("en")}
                        className={`px-2.5 py-1 rounded text-xs font-medium ${
                          samplePreset === "en"
                            ? "bg-brand-coral text-brand-navy font-semibold"
                            : "bg-brand-surface-200 text-brand-text-secondary"
                        }`}
                      >
                        {t("preview.presetLatin")}
                      </button>
                      <button
                        type="button"
                        onClick={() => setSamplePreset("ar")}
                        className={`px-2.5 py-1 rounded text-xs font-medium ${
                          samplePreset === "ar"
                            ? "bg-brand-coral text-brand-navy font-semibold"
                            : "bg-brand-surface-200 text-brand-text-secondary"
                        }`}
                      >
                        {t("preview.presetArabic")}
                      </button>
                    </div>

                    <label className="flex items-center gap-2 text-xs text-brand-text-secondary">
                      <span>{t("preview.fontSizeLabel")}:</span>
                      <input
                        type="range"
                        min={18}
                        max={44}
                        value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value))}
                        className="accent-brand-coral w-24"
                      />
                      <span className="font-mono w-9 ltr-isolate">
                        {fontSize}px
                      </span>
                    </label>
                  </div>

                  <div
                    dir={samplePreset === "ar" ? "rtl" : "ltr"}
                    className="py-6 text-white break-words leading-relaxed min-h-[120px] flex items-center"
                    style={{
                      fontFamily: currentFont.style,
                      fontSize: `${fontSize}px`,
                    }}
                  >
                    {sampleText}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-brand-border-subtle pt-3">
                    <span className="text-xs font-mono text-brand-text-muted">
                      Win32 FR_PRIVATE • 0 Registry Writes
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setMountedMap((prev) => ({
                          ...prev,
                          [currentFont.id]: !isMounted,
                        }))
                      }
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                        isMounted
                          ? "bg-brand-lavender/15 text-brand-lavender-light border border-brand-lavender/35"
                          : "bg-brand-coral text-brand-navy"
                      }`}
                    >
                      <Power className="h-3.5 w-3.5" />
                      <span>
                        {isMounted
                          ? t("preview.statusActive")
                          : t("preview.statusInactive")}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "bridge" && (
              <div className="rounded-xl border border-brand-border-subtle bg-brand-navy p-5 sm:p-6 space-y-5">
                <div className="space-y-1">
                  <h3 className="font-display text-lg font-bold text-white">
                    {t("preview.bridgeTitle")}
                  </h3>
                  <p className="text-sm text-brand-text-secondary">
                    {t("preview.bridgeSubtitle")}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-brand-border-subtle bg-brand-surface-200/60 p-4">
                    <div className="text-xs text-brand-text-muted">
                      {t("preview.bridgePortLabel")}
                    </div>
                    <div className="font-mono text-base font-bold text-brand-lavender-light mt-1 ltr-isolate">
                      {t("preview.bridgePortValue")}
                    </div>
                  </div>
                  <div className="rounded-xl border border-brand-border-subtle bg-brand-surface-200/60 p-4">
                    <div className="text-xs text-brand-text-muted">
                      {t("preview.bridgeFormatsLabel")}
                    </div>
                    <div className="font-mono text-base font-bold text-white mt-1 ltr-isolate">
                      {t("preview.bridgeFormatsValue")}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "color" && (
              <div className="rounded-xl border border-brand-border-subtle bg-brand-navy p-5 sm:p-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">
                      {t("preview.colorTitle")}
                    </h3>
                    <p className="text-sm text-brand-text-secondary">
                      {t("preview.colorSubtitle")}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-brand-lavender/35 bg-brand-lavender/15 px-3 py-1 text-xs font-mono text-brand-lavender-light ltr-isolate">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>
                      {contrast.ratioFormatted} •{" "}
                      {contrast.normalTextAAA
                        ? "WCAG AAA"
                        : contrast.normalTextAA
                          ? "WCAG AA"
                          : "UI Accent"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {BRAND_SWATCHES.map((swatch) => (
                    <button
                      key={swatch.hex}
                      type="button"
                      onClick={() => setActiveSwatch(swatch.hex)}
                      className={`rounded-xl border p-3 text-start transition-colors ${
                        activeSwatch === swatch.hex
                          ? "border-brand-coral bg-brand-surface-200"
                          : "border-brand-border-subtle bg-brand-surface-200/50 hover:border-brand-border"
                      }`}
                    >
                      <div
                        className="h-10 w-full rounded-lg border border-white/10 mb-2"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <div className="text-xs font-semibold text-white">
                        {swatch.name}
                      </div>
                      <div className="text-xs font-mono text-brand-text-muted ltr-isolate">
                        {swatch.hex}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button href="/download" variant="outline" size="md">
            <span>{t("preview.openDownloadsBtn")}</span>
          </Button>
        </div>
      </Container>
    </section>
  );
}
