import React from "react";
import { notFound } from "next/navigation";
import { LanguageProvider } from "@/context/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Locale } from "@/locales";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "ar") {
    notFound();
  }

  return (
    <LanguageProvider initialLocale={locale as Locale}>
      <Navbar />
      <main className="flex-1 min-w-0">{children}</main>
      <Footer />
    </LanguageProvider>
  );
}
