import type { Metadata } from "next";
import { DocsClient } from "@/components/docs/DocsClient";
import { buildPageMetadata } from "@/lib/seo";
import { Locale } from "@/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata("docs", locale === "ar" ? "ar" : ("en" as Locale));
}

export default function DocsPage() {
  return <DocsClient />;
}
