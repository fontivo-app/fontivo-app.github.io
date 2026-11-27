import type { Metadata } from "next";
import { getLatestRelease, getFontRepoStats } from "@/lib/github";
import { Container } from "@/components/ui/Container";
import { DownloadHeader } from "@/components/download/DownloadHeader";
import { DownloadClient } from "@/components/download/DownloadClient";
import { buildDownloadHowToJsonLd, buildPageMetadata } from "@/lib/seo";
import { Locale } from "@/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(
    "download",
    locale === "ar" ? "ar" : ("en" as Locale),
  );
}

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [{ locale }, release, fontStats] = await Promise.all([
    params,
    getLatestRelease(),
    getFontRepoStats(),
  ]);
  const resolvedLocale: Locale = locale === "ar" ? "ar" : "en";
  const howToJsonLd = buildDownloadHowToJsonLd(resolvedLocale);

  return (
    <div className="relative py-12 sm:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <Container size="default" className="relative z-10">
        <DownloadHeader versionTag={release.tag} />
        <DownloadClient release={release} fontStats={fontStats} />
      </Container>
    </div>
  );
}
