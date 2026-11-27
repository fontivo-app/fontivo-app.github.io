import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { faqItems } from "@/config/faq";
import {
  FONTIVO_VERSION,
  FONTIVO_VERSION_TAG,
  FONTIVO_RELEASE_DATE,
  FONTIVO_FONTS_VERSION_TAG,
  FONTIVO_INSTALLER_DOWNLOAD_URL,
  FONTIVO_INSTALLER_FILENAME,
  FONTIVO_INSTALLER_SIZE_FORMATTED,
  UNIX_INSTALL_CMD,
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

export function buildSiteVerificationMetadata(
  googleToken = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  bingToken = process.env.NEXT_PUBLIC_BING_VERIFICATION,
): Metadata["verification"] | undefined {
  const google = googleToken?.trim();
  const bing = bingToken?.trim();

  if (!google && !bing) {
    return undefined;
  }

  return {
    ...(google ? { google } : {}),
    ...(bing ? { other: { "msvalidate.01": bing } } : {}),
  };
}

export function buildSoftwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    operatingSystem: "Windows 10, Windows 11 (64-bit), macOS, Linux",
    applicationCategory: "DesignApplication",
    softwareVersion: FONTIVO_VERSION,
    datePublished: FONTIVO_RELEASE_DATE,
    fileSize: FONTIVO_INSTALLER_SIZE_FORMATTED,
    description: siteConfig.description,
    url: siteConfig.url,
    downloadUrl: FONTIVO_INSTALLER_DOWNLOAD_URL,
    installUrl: `${siteConfig.url}/en/download`,
    releaseNotes: siteConfig.links.latestRelease,
    license: "https://opensource.org/licenses/MIT",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: [
      {
        "@type": "Person",
        name: "Eng. Ahmed Fahmy",
        jobTitle: "Software Engineer",
        url: siteConfig.links.author,
        sameAs: [siteConfig.links.developerPortfolio],
      },
      {
        "@type": "Person",
        name: "Eng. Mohamed Elashwah",
        jobTitle: "Graphic Designer",
        url: siteConfig.links.designerPortfolio,
      },
    ],
  };
}

export function buildFaqPageJsonLd(locale: Locale = "en") {
  const isAr = locale === "ar";
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: isAr ? "ar" : "en",
    url: `${siteConfig.url}/${locale}/faq`,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: isAr ? item.questionAr : item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: isAr ? item.answerAr : item.answer,
      },
    })),
  };
}

export function buildDownloadHowToJsonLd(locale: Locale = "en") {
  const isAr = locale === "ar";
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    inLanguage: isAr ? "ar" : "en",
    name: isAr
      ? `كيفية تثبيت Fontivo ${FONTIVO_VERSION_TAG} على Windows وmacOS وLinux`
      : `How to Install Fontivo ${FONTIVO_VERSION_TAG} on Windows, macOS & Linux`,
    description: isAr
      ? `دليل التثبيت السريع لمدير الخطوط Fontivo ${FONTIVO_VERSION_TAG} على ويندوز باستخدام ${FONTIVO_INSTALLER_FILENAME} أو على macOS وLinux عبر install.sh.`
      : `Quick installation guide for Fontivo ${FONTIVO_VERSION_TAG} using ${FONTIVO_INSTALLER_FILENAME} on Windows or the native install.sh script on macOS and Linux.`,
    totalTime: "PT2M",
    url: `${siteConfig.url}/${locale}/download`,
    tool: [
      {
        "@type": "HowToTool",
        name: FONTIVO_INSTALLER_FILENAME,
      },
      {
        "@type": "HowToTool",
        name: "install.sh (macOS / Linux)",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: isAr
          ? "Windows: تنزيل وتشغيل مثبت Setup"
          : "Windows: Download and run Fontivo Setup",
        text: isAr
          ? `حمّل ${FONTIVO_INSTALLER_FILENAME} (${FONTIVO_INSTALLER_SIZE_FORMATTED}) من إصدارات GitHub، تحقق من بصمة SHA-256، ثم شغّل المثبت بدون الحاجة لصلاحيات مسؤول.`
          : `Download ${FONTIVO_INSTALLER_FILENAME} (${FONTIVO_INSTALLER_SIZE_FORMATTED}) from GitHub Releases, verify its SHA-256 checksum, and run the guided installer (no administrator privileges required).`,
        url: FONTIVO_INSTALLER_DOWNLOAD_URL,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: isAr
          ? "macOS وLinux: التثبيت عبر install.sh"
          : "macOS & Linux: Install via native install.sh",
        text: isAr
          ? `افتح الطرفية ونفّذ الأمر: ${UNIX_INSTALL_CMD} لبناء وتثبيت النسخة الأصلية بلغة Rust عبر Cargo.`
          : `Open your terminal and run: ${UNIX_INSTALL_CMD} to build and install the native Rust binary via Cargo.`,
        url: `${siteConfig.url}/${locale}/download#unix-install`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: isAr
          ? "اختياري: تنزيل حزم مكتبة Fontivo-Fonts (15 حزمة)"
          : "Optional: Download modular Fontivo-Fonts packs",
        text: isAr
          ? `نزّل فقط الحزم المطلوبة من أصل 15 حزمة موثقة ببصمة SHA-256 (${siteConfig.stats.totalFonts} خطًا) وفعّلها فوريًا في الذاكرة RAM.`
          : `Download any of the 15 SHA-256 verified Fontivo-Fonts ${FONTIVO_FONTS_VERSION_TAG} ZIP packs (${siteConfig.stats.totalFonts} curated fonts) and activate them instantly in RAM.`,
        url: `${siteConfig.url}/${locale}/download#font-packs`,
      },
    ],
  };
}
