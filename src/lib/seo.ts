import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import {
  FONTIVO_VERSION_TAG,
  FONTIVO_FONTS_VERSION_TAG,
} from "@/config/version";
import { Locale } from "@/locales";

export type SitePageKey =
  "home" | "features" | "download" | "docs" | "about" | "faq";

interface PageSeoCopy {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  path: string;
}

const PAGE_SEO: Record<SitePageKey, PageSeoCopy> = {
  home: {
    path: "",
    titleEn: `Fontivo ${FONTIVO_VERSION_TAG} — Native Rust Font Manager & 10,939 Fonts`,
    titleAr: `فونتيفو ${FONTIVO_VERSION_TAG} — مدير خطوط سريع بلغة Rust ومكتبة 10,939 خطًا`,
    descriptionEn: `Lightweight native Rust desktop font manager (${FONTIVO_VERSION_TAG}) paired with ${FONTIVO_FONTS_VERSION_TAG} (${siteConfig.stats.totalFonts} curated fonts). Activate fonts in RAM with zero Windows Registry bloat.`,
    descriptionAr: `تطبيق مكتبي خفيف بلغة Rust (${FONTIVO_VERSION_TAG}) لإدارة الخطوط وتفعيلها في الذاكرة RAM بدون تلويث سجل ويندوز، مع مكتبة ${FONTIVO_FONTS_VERSION_TAG} تضم ${siteConfig.stats.totalFonts} خطًا.`,
  },
  features: {
    path: "/features",
    titleEn:
      "Features & Architecture — RAM Activation, Adobe Bridge & Color Studio",
    titleAr:
      "المزايا والمعمارية — التفعيل بالذاكرة، ربط Adobe CC واستوديو الألوان",
    descriptionEn:
      "Explore Fontivo's 6 core pillars: Win32 FR_PRIVATE RAM font activation, 10,939 curated fonts, Adobe CC auto-bridge, .ASE Color Studio, and zero telemetry.",
    descriptionAr:
      "استكشف ركائز فونتيفو الست: التفعيل الفوري بالذاكرة، مكتبة 10,939 خطًا، جسر Adobe CC التلقائي، واستوديو الألوان مع خصوصية كاملة.",
  },
  download: {
    path: "/download",
    titleEn: `Download Fontivo ${FONTIVO_VERSION_TAG} — Windows Installer, macOS & Linux`,
    titleAr: `تحميل فونتيفو ${FONTIVO_VERSION_TAG} — مثبت ويندوز، macOS وLinux`,
    descriptionEn: `Download Fontivo ${FONTIVO_VERSION_TAG} Windows Setup Installer (${siteConfig.stats.binarySize}), install on macOS/Linux via install.sh, and grab 15 SHA-256 verified Fontivo-Fonts ${FONTIVO_FONTS_VERSION_TAG} packs.`,
    descriptionAr: `نزّل مثبت فونتيفو ${FONTIVO_VERSION_TAG} لويندوز (${siteConfig.stats.binarySize}) أو ثبّته على macOS وLinux، واحصل على حزم Fontivo-Fonts ${FONTIVO_FONTS_VERSION_TAG} الموثقة.`,
  },
  docs: {
    path: "/docs",
    titleEn: "Documentation — Quick Start, Paths & SHA-256 Verification",
    titleAr: "الدليل التقني — البدء السريع والتحقق من SHA-256",
    descriptionEn: `Quick start guide, Win32 RAM virtualization paths, Adobe CC Port 27715 socket specification, and SHA-256 verification for Fontivo ${FONTIVO_VERSION_TAG}.`,
    descriptionAr: `دليل البدء السريع، مسارات النظام، منفذ ربط Adobe CC المحلي، والتحقق الرقمي SHA-256 لتطبيق فونتيفو ${FONTIVO_VERSION_TAG}.`,
  },
  about: {
    path: "/about",
    titleEn: "About Fontivo — Philosophy & Developers",
    titleAr: "عن فونتيفو — الفلسفة وفريق التطوير",
    descriptionEn:
      "Meet the creators of Fontivo: Eng. Ahmed Fahmy (Software Engineer) and Eng. Mohamed Elashwah (Graphic Designer). Free, open-source, zero-telemetry typography tools.",
    descriptionAr:
      "تعرف على مطوري فونتيفو: م. أحمد فهمي (مهندس برمجيات) وم. محمد الأشوح (مصمم جرافيك)، وفلسفة المشروع الحرة مفتوحة المصدر.",
  },
  faq: {
    path: "/faq",
    titleEn: "Frequently Asked Questions (FAQ)",
    titleAr: "الأسئلة الشائعة",
    descriptionEn:
      "Answers about Fontivo Desktop RAM activation, Windows Registry safety, Adobe CC auto-activation, and the 10,939-font open-source collection.",
    descriptionAr:
      "إجابات واضحة حول تفعيل الخطوط في الذاكرة، أمان سجل ويندوز، الربط التلقائي مع Adobe CC، ومكتبة الـ 10,939 خطًا.",
  },
};

export function buildPageMetadata(page: SitePageKey, locale: Locale): Metadata {
  const copy = PAGE_SEO[page];
  const isAr = locale === "ar";
  const title = isAr ? copy.titleAr : copy.titleEn;
  const description = isAr ? copy.descriptionAr : copy.descriptionEn;
  const canonicalUrl = `${siteConfig.url}/${locale}${copy.path}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${siteConfig.url}/en${copy.path}`,
        ar: `${siteConfig.url}/ar${copy.path}`,
        "x-default": `${siteConfig.url}/en${copy.path}`,
      },
    },
    openGraph: {
      type: "website",
      locale: isAr ? "ar_EG" : "en_US",
      alternateLocale: isAr ? ["en_US"] : ["ar_EG"],
      url: canonicalUrl,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
      creator: "@Ahmedfahmy8308",
    },
  };
}
