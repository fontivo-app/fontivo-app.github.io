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

export const siteConfig = {
  name: "Fontivo",
  shortName: "Fontivo",
  version: FONTIVO_VERSION,
  versionTag: FONTIVO_VERSION_TAG,
  fontsReleaseTag: FONTIVO_FONTS_VERSION_TAG,
  title: "Fontivo — Type. Design. Deliver.",
  description: `Lightweight Windows, macOS & Linux desktop font manager (${FONTIVO_VERSION_TAG}) & ${FONTIVO_FONTS_TOTAL}-font library (${FONTIVO_FONTS_VERSION_TAG}) built with Native Rust & React 19. Activate fonts in RAM with zero registry bloat. 100% Free & Open Source.`,
  url: "https://fontivo.github.io",
  ogImage: "/brand/og-image.png",
  links: {
    github: `https://github.com/${FONTIVO_GITHUB_REPO}`,
    fontsGithub: `https://github.com/${FONTIVO_FONTS_REPO}`,
    fontsLatestRelease: FONTIVO_FONTS_RELEASE_URL,
    website: "https://fontivo.github.io",
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
      specialty: "Rust • Win32 APIs • Desktop & Web",
      summaryEn:
        "Architected the native Rust desktop engine, in-memory font activation, Adobe CC loopback bridge, and Fontivo web platform.",
      summaryAr:
        "تطوير نواة التطبيق بلغة Rust، وتفعيل الخطوط بالذاكرة، وجسر ربط Adobe CC، ومنصة Fontivo الإلكترونية.",
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
        "Designed the Fontivo v2.0 visual identity, Dual-Ribbon F mark, design tokens, and curated multi-script typography collections.",
      summaryAr:
        "تصميم الهوية البصرية والشعار وأنظمة الألوان وتنسيق وتنظيم حزم الخطوط العربية والعالمية.",
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
    "Adobe CC auto activation",
    "Win32 FR_PRIVATE",
    "Color Studio ASE",
    "Rust open source font manager",
  ],
};

export type SiteConfig = typeof siteConfig;
