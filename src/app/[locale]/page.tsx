import type { Metadata } from "next";
import React from "react";
import { Hero } from "@/components/home/Hero";
import { ProductPreview } from "@/components/home/ProductPreview";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { FontPackageSection } from "@/components/home/FontPackageSection";
import { DevelopersSection } from "@/components/common/DevelopersSection";
import { CtaBanner } from "@/components/home/CtaBanner";
import { buildPageMetadata } from "@/lib/seo";
import { Locale } from "@/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata("home", locale === "ar" ? "ar" : ("en" as Locale));
}

export default function LocaleHomePage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-radial-gradient pointer-events-none" />

      <Hero />
      <ProductPreview />
      <BenefitsSection />
      <FontPackageSection />
      <DevelopersSection />
      <CtaBanner />
    </div>
  );
}
