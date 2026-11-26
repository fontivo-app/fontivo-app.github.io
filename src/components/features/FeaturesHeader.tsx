"use client";

import * as React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useTranslation } from "@/context/LanguageContext";

export function FeaturesHeader() {
  const { t } = useTranslation();

  return (
    <SectionHeader
      badge={t("featuresPage.badge")}
      badgeVariant="purple"
      title={t("featuresPage.title")}
      description={t("featuresPage.subtitle")}
      align="center"
      className="mb-8 sm:mb-10"
    />
  );
}
