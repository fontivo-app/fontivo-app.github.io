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
    titleEn: `Fontivo ${FONTIVO_VERSION_TAG} — Fast Font Manager & 10,939 Curated Fonts`,
    titleAr: `فونتيفو ${FONTIVO_VERSION_TAG} — مدير خطوط سريع ومكتبة 10,939 خطًا`,
    descriptionEn: `Fast, offline-first desktop font manager (${FONTIVO_VERSION_TAG}) paired with ${FONTIVO_FONTS_VERSION_TAG} (${siteConfig.stats.totalFonts} curated fonts). Activate fonts instantly without slowing down Windows or cluttering your system fonts folder.`,
    descriptionAr: `تطبيق مكتبي سريع وخفيف (${FONTIVO_VERSION_TAG}) لإدارة الخطوط وتفعيلها فورًا دون إبطاء ويندوز أو تكديس مجلد خطوط النظام، مع مكتبة ${FONTIVO_FONTS_VERSION_TAG} تضم ${siteConfig.stats.totalFonts} خطًا.`,
  },
  features: {
    path: "/features",
    titleEn: "Features — Instant Font Activation, Adobe CC Sync & Color Studio",
    titleAr:
      "المزايا — التفعيل الفوري للخطوط، مزامنة Adobe CC واستوديو الألوان",
    descriptionEn:
      "Explore Fontivo's 6 core capabilities: instant font activation without system bloat, 10,939 curated fonts, automatic Adobe CC font syncing, .ASE Color Studio, and 100% offline privacy.",
    descriptionAr:
      "استكشف ركائز فونتيفو الست: التفعيل الفوري للخطوط دون إثقال النظام، مكتبة 10,939 خطًا، المزامنة التلقائية مع Adobe CC، واستوديو الألوان مع خصوصية كاملة.",
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
    titleEn: "Documentation — Quick Start, Workspace Paths & Verification",
    titleAr: "الدليل السريع — التثبيت، مسارات العمل والتحقق من الملفات",
    descriptionEn: `Quick start guide, offline workspace paths, Adobe Creative Cloud auto-sync setup, and SHA-256 verification for Fontivo ${FONTIVO_VERSION_TAG}.`,
    descriptionAr: `دليل البدء السريع، مسارات مساحة العمل المحلية، إعداد المزامنة التلقائية مع Adobe Creative Cloud، والتحقق من الملفات لتطبيق فونتيفو ${FONTIVO_VERSION_TAG}.`,
  },
  about: {
    path: "/about",
    titleEn: "About Fontivo — Philosophy & Creators",
    titleAr: "عن فونتيفو — الفلسفة وفريق العمل",
    descriptionEn:
      "Meet the creators of Fontivo: Eng. Ahmed Fahmy (Software Engineer) and Eng. Mohamed Elashwah (Graphic Designer). Free, open-source, offline-first creative tools.",
    descriptionAr:
      "تعرف على فريق فونتيفو: م. أحمد فهمي (مهندس برمجيات) وم. محمد الأشوح (مصمم جرافيك)، وفلسفة المشروع الحرة مفتوحة المصدر.",
  },
  faq: {
    path: "/faq",
    titleEn: "Frequently Asked Questions (FAQ)",
    titleAr: "الأسئلة الشائعة",
    descriptionEn:
      "Answers about instant font activation, keeping Windows fast and clean, automatic Adobe CC font syncing, and the 10,939-font open-source collection.",
    descriptionAr:
      "إجابات واضحة حول التفعيل الفوري للخطوط، الحفاظ على سرعة ونظافة ويندوز، المزامنة التلقائية مع Adobe CC، ومكتبة الـ 10,939 خطًا.",
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
          ? `افتح الطرفية ونفّذ الأمر: ${UNIX_INSTALL_CMD} لتثبيت النسخة الأصلية من فونتيفو.`
          : `Open your terminal and run: ${UNIX_INSTALL_CMD} to build and install Fontivo natively.`,
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
