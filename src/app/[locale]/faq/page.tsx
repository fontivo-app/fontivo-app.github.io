import type { Metadata } from "next";
import { faqItems } from "@/config/faq";
import { Container } from "@/components/ui/Container";
import { FAQClient } from "@/components/faq/FAQClient";
import { buildPageMetadata } from "@/lib/seo";
import { Locale } from "@/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata("faq", locale === "ar" ? "ar" : ("en" as Locale));
}

export default function FAQPage() {
  const faqPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="relative py-12 sm:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />

      <Container size="default" className="relative z-10">
        <FAQClient initialItems={faqItems} />
      </Container>
    </div>
  );
}
