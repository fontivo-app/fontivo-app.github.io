import type { Metadata } from "next";
import { coreFeatures } from "@/config/features";
import { Container } from "@/components/ui/Container";
import { FeaturesHeader } from "@/components/features/FeaturesHeader";
import { FeaturesClient } from "@/components/features/FeaturesClient";
import { buildPageMetadata } from "@/lib/seo";
import { Locale } from "@/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(
    "features",
    locale === "ar" ? "ar" : ("en" as Locale),
  );
}

export default function FeaturesPage() {
  return (
    <div className="relative py-12 sm:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <Container size="default" className="relative z-10">
        <FeaturesHeader />
        <FeaturesClient features={coreFeatures} />
      </Container>
    </div>
  );
}
