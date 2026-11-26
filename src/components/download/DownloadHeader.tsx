"use client";

import * as React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useTranslation } from "@/context/LanguageContext";

interface DownloadHeaderProps {
  versionTag: string;
}

export function DownloadHeader({ versionTag }: DownloadHeaderProps) {
  const { t, locale } = useTranslation();

  const badgeText =
    locale === "ar"
      ? `الإصدار ${versionTag} • مكتبة الخطوط v1.0.3`
      : `Desktop ${versionTag} • Fonts v1.0.3`;

  return (
    <SectionHeader
      badge={badgeText}
      badgeVariant="purple"
      title={t("downloadPage.title")}
      highlightedText={versionTag}
      description={t("downloadPage.subtitle")}
      align="center"
      className="mb-8 sm:mb-10"
    />
  );
}
