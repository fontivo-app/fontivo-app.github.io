import type { Metadata } from "next";
import { AboutClient } from "@/components/about/AboutClient";
import { buildPageMetadata } from "@/lib/seo";
import { Locale } from "@/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata("about", locale === "ar" ? "ar" : ("en" as Locale));
}

export default function AboutPage() {
  return <AboutClient />;
}
