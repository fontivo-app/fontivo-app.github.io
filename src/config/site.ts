import {
  FONTIVO_VERSION,
  FONTIVO_VERSION_TAG,
  FONTIVO_FONTS_VERSION_TAG,
  FONTIVO_FONTS_RELEASE_URL,
  FONTIVO_FONTS_TOTAL,
  FONTIVO_FONTS_FAMILIES,
  FONTIVO_FONTS_PACKS,
  FONTIVO_FONTS_SIZE_FORMATTED,
  FONTIVO_INSTALLER_SIZE_FORMATTED,
  GITHUB_LATEST_RELEASE_URL,
  FONTIVO_GITHUB_REPO,
  FONTIVO_FONTS_REPO,
} from "./version";

export interface DeveloperProfile {
  id: string;
  nameEn: string;
  nameAr: string;
  role: string;
  specialty: string;
  summaryEn: string;
  summaryAr: string;
  githubUrl?: string;
  githubHandle?: string;
  portfolioUrl: string;
  accent: "coral" | "lavender";
  initials: string;
}

const resolvedSiteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://fontivo-app.github.io"
).replace(/\/+$/, "");

export const siteConfig = {
  name: "Fontivo",
  shortName: "Fontivo",
  version: FONTIVO_VERSION,
  versionTag: FONTIVO_VERSION_TAG,
  fontsReleaseTag: FONTIVO_FONTS_VERSION_TAG,
  title: "Fontivo — Type. Design. Deliver.",
  description: `Fast, lightweight desktop font manager (${FONTIVO_VERSION_TAG}) for Windows, macOS & Linux, paired with ${FONTIVO_FONTS_TOTAL} curated fonts (${FONTIVO_FONTS_VERSION_TAG}). Activate fonts instantly without slowing down your system, sync missing fonts in Adobe Creative Cloud, and build .ASE color palettes—100% free and offline.`,
  url: resolvedSiteUrl,
  ogImage: `${resolvedSiteUrl}/brand/og-image.png`,
  links: {
    github: `https://github.com/${FONTIVO_GITHUB_REPO}`,
    fontsGithub: `https://github.com/${FONTIVO_FONTS_REPO}`,
    fontsLatestRelease: FONTIVO_FONTS_RELEASE_URL,
    website: resolvedSiteUrl,
    releases: `https://github.com/${FONTIVO_GITHUB_REPO}/releases`,
    latestRelease: GITHUB_LATEST_RELEASE_URL,
    docs: "/docs",
    author: "https://github.com/Ahmedfahmy8308",
    developerPortfolio: "https://ahmed-fahmy.engineer/",
    designerPortfolio: "https://mohamed-elashwah.me/",
  },
  creator: "Eng. Ahmed Fahmy & Eng. Mohamed Elashwah",
  leadership: {
    softwareEngineer: "Eng. Ahmed Fahmy (Software Engineer)",
    graphicDesigner: "Eng. Mohamed Elashwah (Graphic Designer)",
    leadArchitect: "Eng. Ahmed Fahmy (Software Engineer)",
    headOfBrand: "Eng. Mohamed Elashwah (Graphic Designer)",
  },
  developers: [
    {
      id: "ahmed-fahmy",
      initials: "AF",
      nameEn: "Eng. Ahmed Fahmy",
      nameAr: "م. أحمد فهمي",
      role: "Software Engineer",
      specialty: "Desktop Systems • Performance • Web",
      summaryEn:
        "Architected the lightweight Fontivo desktop engine, instant memory-based font activation, automatic Adobe Creative Cloud font syncing, and the Fontivo web platform.",
      summaryAr:
        "تصميم وتطوير نواة تطبيق فونتيفو الخفيفة، ونظام التفعيل الفوري للخطوط في الذاكرة، والمزامنة التلقائية مع برامج Adobe Creative Cloud، ومنصة فونتيفو الإلكترونية.",
      githubUrl: "https://github.com/Ahmedfahmy8308",
      githubHandle: "@Ahmedfahmy8308",
      portfolioUrl: "https://ahmed-fahmy.engineer/",
      accent: "coral",
    },
    {
      id: "mohamed-elashwah",
      initials: "ME",
      nameEn: "Eng. Mohamed Elashwah",
      nameAr: "م. محمد الأشوح",
      role: "Graphic Designer",
      specialty: "Brand Identity • Typography • UI/UX",
      summaryEn:
        "Crafted the Fontivo v2.0 visual identity, Dual-Ribbon F mark, design system tokens, and curated multi-script Arabic and Latin typography collections.",
      summaryAr:
        "تصميم الهوية البصرية لتطبيق فونتيفو v2.0، والشعار، وأنظمة الألوان والتباين، وتنسيق وتنظيم حزم الخطوط العربية والعالمية.",
      portfolioUrl: "https://mohamed-elashwah.me/",
      accent: "lavender",
    },
  ] as DeveloperProfile[],
  stats: {
    totalFonts: FONTIVO_FONTS_TOTAL,
    typographicFamilies: FONTIVO_FONTS_FAMILIES,
    distributionPackages: String(FONTIVO_FONTS_PACKS),
    totalSize: FONTIVO_FONTS_SIZE_FORMATTED,
    ramFootprint: "~38 MB",
    binarySize: FONTIVO_INSTALLER_SIZE_FORMATTED,
    startupTime: "< 0.35s",
    rebootTime: "0ms",
    scriptsBreakdown: [
      { script: "Latin", count: 7146, accent: "coral" },
      { script: "Urdu", count: 1565, accent: "lavender" },
      { script: "Persian", count: 1257, accent: "amber" },
      { script: "Arabic", count: 971, accent: "lime" },
    ],
  },
  keywords: [
    "font management",
    "desktop font manager",
    "11000 free fonts",
    "Arabic fonts pack",
    "Urdu Nastaliq fonts",
    "Persian fonts",
    "Adobe CC font sync",
    "instant font activation",
    "Color Studio ASE",
    "open source font manager",
  ],
};

export type SiteConfig = typeof siteConfig;
