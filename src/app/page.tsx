import type { Metadata } from "next";
import React from "react";
import { Hero } from "@/components/home/Hero";
import { ProductPreview } from "@/components/home/ProductPreview";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { FontPackageSection } from "@/components/home/FontPackageSection";
import { DevelopersSection } from "@/components/common/DevelopersSection";
import { CtaBanner } from "@/components/home/CtaBanner";
import { LanguageProvider } from "@/context/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("home", "en");

export default function HomePage() {
  return (
    <LanguageProvider initialLocale="en">
      <Navbar />
      <main className="flex-1 min-w-0">
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
      </main>
      <Footer />
    </LanguageProvider>
  );
}
