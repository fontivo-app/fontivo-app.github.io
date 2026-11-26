import {
  FONTIVO_VERSION,
  FONTIVO_VERSION_TAG,
  FONTIVO_RELEASE_DATE,
  FONTIVO_INSTALLER_FILENAME,
  FONTIVO_INSTALLER_SIZE_BYTES,
  FONTIVO_INSTALLER_SIZE_FORMATTED,
  FONTIVO_INSTALLER_SHA256,
  FONTIVO_INSTALLER_DOWNLOAD_URL,
} from "./version";

export interface ReleaseAsset {
  name: string;
  filename: string;
  type: "installer";
  platform: "windows";
  architecture: "x64";
  sizeBytes: number;
  sizeFormatted: string;
  sha256: string;
  downloadUrl: string;
  badge?: string;
  description: string;
}

export interface SystemRequirements {
  os: string;
  processor: string;
  memory: string;
  diskSpace: string;
  display: string;
  architecture: string;
}

export interface FontPackPackage {
  id: string;
  name: string;
  nameAr: string;
  script: string;
  scripts: string[];
  fontCount: number;
  familyCount: number;
  sizeBytes: number;
  uncompressedSizeBytes: number;
  sizeFormatted: string;
  filename: string;
  downloadUrl: string;
  sha256: string;
  description: string;
  descriptionAr: string;
}

export interface ReleaseInfo {
  version: string;
  releaseDate: string;
  tag: string;
  title: string;
  isLatest: boolean;
  notes: string[];
  changelogCategories: {
    category: string;
    items: string[];
  }[];
  assets: ReleaseAsset[];
  fontPacks: FontPackPackage[];
  systemRequirements: {
    minimum: SystemRequirements;
    recommended: SystemRequirements;
  };
  supportedSoftware: {
    name: string;
    version: string;
    integration: string;
  }[];
}

const FONTS_RELEASE_BASE =
  "https://github.com/Ahmedfahmy8308/Fontivo-Fonts/releases/download/v1.0.3";

export const fontPackPackages: FontPackPackage[] = [
  {
    id: "pack-essential-001",
    name: "Essential Pack 001 — Arabic Typography",
    nameAr: "الحزمة الأساسية 001 — الخطوط العربية",
    script: "Arabic",
    scripts: ["Arabic"],
    fontCount: 970,
    familyCount: 582,
    sizeBytes: 42825441,
    uncompressedSizeBytes: 92383140,
    sizeFormatted: "40.84 MB",
    filename: "fontivo-essential-001.zip",
    downloadUrl: `${FONTS_RELEASE_BASE}/fontivo-essential-001.zip`,
    sha256: "8c932847ee9c1c62fd84e202d5c02786b7c9f02174bd8e5edc7b236f77b1c83e",
    description:
      "970 Arabic display, Naskh, Kufic, Diwani, and UI fonts across 582 families.",
    descriptionAr:
      "970 خطًا عربيًا (نسخ، كوفي، ديواني، واجهات) موزعة على 582 عائلة.",
  },
  {
    id: "pack-essential-002",
    name: "Essential Pack 002 — Latin Typography I",
    nameAr: "الحزمة الأساسية 002 — الخطوط اللاتينية I",
    script: "Latin",
    scripts: ["Latin"],
    fontCount: 848,
    familyCount: 253,
    sizeBytes: 88664017,
    uncompressedSizeBytes: 155484442,
    sizeFormatted: "84.56 MB",
    filename: "fontivo-essential-002.zip",
    downloadUrl: `${FONTS_RELEASE_BASE}/fontivo-essential-002.zip`,
    sha256: "99560337d75e007dfbf0e4825b31c77c6e0f388310995a077f1b52f1e0658676",
    description:
      "848 curated Latin sans, serif, and headline fonts across 253 families.",
    descriptionAr: "848 خطًا لاتينيًا للواجهات والتحرير والعناوين عبر 253 عائلة.",
  },
  {
    id: "pack-essential-003",
    name: "Essential Pack 003 — Latin Typography II",
    nameAr: "الحزمة الأساسية 003 — الخطوط اللاتينية II",
    script: "Latin",
    scripts: ["Latin"],
    fontCount: 842,
    familyCount: 301,
    sizeBytes: 72808361,
    uncompressedSizeBytes: 148868189,
    sizeFormatted: "69.44 MB",
    filename: "fontivo-essential-003.zip",
    downloadUrl: `${FONTS_RELEASE_BASE}/fontivo-essential-003.zip`,
    sha256: "7b7843495e3ca673a44cc313207aacd841714ce159ed4d31c35c9c2477152ae5",
    description:
      "842 geometric sans-serif and UI typography fonts across 301 families.",
    descriptionAr: "842 خطًا لاتينيًا هندسيًا ومصممًا للواجهات عبر 301 عائلة.",
  },
  {
    id: "pack-essential-004",
    name: "Essential Pack 004 — Latin Typography III",
    nameAr: "الحزمة الأساسية 004 — الخطوط اللاتينية III",
    script: "Latin",
    scripts: ["Latin"],
    fontCount: 771,
    familyCount: 240,
    sizeBytes: 94451341,
    uncompressedSizeBytes: 192989044,
    sizeFormatted: "90.08 MB",
    filename: "fontivo-essential-004.zip",
    downloadUrl: `${FONTS_RELEASE_BASE}/fontivo-essential-004.zip`,
    sha256: "aac04c88f50280190f81ae9b6a64d75498823a6ed69212073519d663b5eb0f09",
    description:
      "771 editorial serif and branding system fonts across 240 families.",
    descriptionAr: "771 خط سيريف وأنظمة هوية متعددة الأوزان عبر 240 عائلة.",
  },
  {
    id: "pack-essential-005",
    name: "Essential Pack 005 — Latin Typography IV",
    nameAr: "الحزمة الأساسية 005 — الخطوط اللاتينية IV",
    script: "Latin",
    scripts: ["Latin"],
    fontCount: 1022,
    familyCount: 328,
    sizeBytes: 76281781,
    uncompressedSizeBytes: 139621454,
    sizeFormatted: "72.75 MB",
    filename: "fontivo-essential-005.zip",
    downloadUrl: `${FONTS_RELEASE_BASE}/fontivo-essential-005.zip`,
    sha256: "f7f3d0d560e0fb0b8e4e3a92dfa7d2de9247367362050fb6423a5214f4dadc17",
    description:
      "1,022 Latin display, poster, and modern geometric fonts across 328 families.",
    descriptionAr: "1,022 خط عرض وملصقات وخطوط هندسية لاتينية عبر 328 عائلة.",
  },
  {
    id: "pack-essential-006",
    name: "Essential Pack 006 — Latin Typography V",
    nameAr: "الحزمة الأساسية 006 — الخطوط اللاتينية V",
    script: "Latin",
    scripts: ["Latin"],
    fontCount: 722,
    familyCount: 262,
    sizeBytes: 78127064,
    uncompressedSizeBytes: 152568924,
    sizeFormatted: "74.51 MB",
    filename: "fontivo-essential-006.zip",
    downloadUrl: `${FONTS_RELEASE_BASE}/fontivo-essential-006.zip`,
    sha256: "ca9b95bdcc2f2c0bfb3367171e2b67fd148d4182a57285fd320ae46f9d4c1851",
    description: "722 multi-weight Latin families across 262 typographic sets.",
    descriptionAr: "722 خطًا لاتينيًا متعدد الأوزان والأنماط عبر 262 عائلة.",
  },
  {
    id: "pack-essential-007",
    name: "Essential Pack 007 — Latin Typography VI",
    nameAr: "الحزمة الأساسية 007 — الخطوط اللاتينية VI",
    script: "Latin",
    scripts: ["Latin"],
    fontCount: 1018,
    familyCount: 368,
    sizeBytes: 87580916,
    uncompressedSizeBytes: 139628454,
    sizeFormatted: "83.52 MB",
    filename: "fontivo-essential-007.zip",
    downloadUrl: `${FONTS_RELEASE_BASE}/fontivo-essential-007.zip`,
    sha256: "81c2bd0589d21963f64a84d17999af2875392ff31e42e8284ce04f0eba7023a0",
    description: "1,018 OpenType & variable Latin fonts across 368 families.",
    descriptionAr:
      "1,018 خطًا لاتينيًا بمزايا OpenType ومحاور متغيرة عبر 368 عائلة.",
  },
  {
    id: "pack-essential-008",
    name: "Essential Pack 008 — Latin Typography VII",
    nameAr: "الحزمة الأساسية 008 — الخطوط اللاتينية VII",
    script: "Latin",
    scripts: ["Latin"],
    fontCount: 972,
    familyCount: 287,
    sizeBytes: 89669029,
    uncompressedSizeBytes: 149223010,
    sizeFormatted: "85.52 MB",
    filename: "fontivo-essential-008.zip",
    downloadUrl: `${FONTS_RELEASE_BASE}/fontivo-essential-008.zip`,
    sha256: "5be18b9324dde6873327377036ed756c6314692a0eee8dfe6c269bfb5c7d094c",
    description:
      "972 grotesque, slab serif, and monospace code fonts across 287 families.",
    descriptionAr: "972 خط غروتسك وسلاب وخطوط برمجة عبر 287 عائلة.",
  },
  {
    id: "pack-essential-009",
    name: "Essential Pack 009 — Latin Typography VIII",
    nameAr: "الحزمة الأساسية 009 — الخطوط اللاتينية VIII",
    script: "Latin",
    scripts: ["Latin"],
    fontCount: 936,
    familyCount: 370,
    sizeBytes: 83469783,
    uncompressedSizeBytes: 150361365,
    sizeFormatted: "79.60 MB",
    filename: "fontivo-essential-009.zip",
    downloadUrl: `${FONTS_RELEASE_BASE}/fontivo-essential-009.zip`,
    sha256: "a5f2b8c0a60c424ad805865c8ed0d7ed3422e358fa36521f77aad787b77fc6e3",
    description:
      "936 contemporary branding & editorial Latin fonts across 370 families.",
    descriptionAr: "936 خطًا لاتينيًا معاصرًا للهويات والنشر عبر 370 عائلة.",
  },
  {
    id: "pack-essential-010",
    name: "Essential Pack 010 — Persian Typography",
    nameAr: "الحزمة الأساسية 010 — الخطوط الفارسية",
    script: "Persian",
    scripts: ["Persian"],
    fontCount: 1253,
    familyCount: 818,
    sizeBytes: 51623892,
    uncompressedSizeBytes: 112825887,
    sizeFormatted: "49.23 MB",
    filename: "fontivo-essential-010.zip",
    downloadUrl: `${FONTS_RELEASE_BASE}/fontivo-essential-010.zip`,
    sha256: "368a3f5319e7a3f6d1dae1dec6e67b062b447ef4b50c1803c626c40f3f07dd1b",
    description:
      "1,253 Persian editorial, display, and calligraphy fonts across 818 families.",
    descriptionAr: "1,253 خطًا فارسيًا للتحرير والعرض والخط الفني عبر 818 عائلة.",
  },
  {
    id: "pack-essential-011",
    name: "Essential Pack 011 — Urdu Typography I",
    nameAr: "الحزمة الأساسية 011 — خطوط الأردو I",
    script: "Urdu",
    scripts: ["Urdu"],
    fontCount: 405,
    familyCount: 152,
    sizeBytes: 35014024,
    uncompressedSizeBytes: 81359319,
    sizeFormatted: "33.39 MB",
    filename: "fontivo-essential-011.zip",
    downloadUrl: `${FONTS_RELEASE_BASE}/fontivo-essential-011.zip`,
    sha256: "24cb1d09bb04311c2255b9f41d9041544c1f98ea6fbad0c6ccaf4ca14e1e4639",
    description:
      "405 Urdu Nastaliq, Naskh, and display fonts across 152 families.",
    descriptionAr: "405 خطوط أردو ونستعليق ونسخ عبر 152 عائلة.",
  },
  {
    id: "pack-essential-012",
    name: "Essential Pack 012 — Urdu Typography II",
    nameAr: "الحزمة الأساسية 012 — خطوط الأردو II",
    script: "Urdu",
    scripts: ["Urdu"],
    fontCount: 393,
    familyCount: 144,
    sizeBytes: 33230124,
    uncompressedSizeBytes: 81464281,
    sizeFormatted: "31.69 MB",
    filename: "fontivo-essential-012.zip",
    downloadUrl: `${FONTS_RELEASE_BASE}/fontivo-essential-012.zip`,
    sha256: "d5674cdc76b9eed060ef22def4680a19e21f299e3648cc18a4e660fe202b7549",
    description:
      "393 Urdu Nastaliq ligature and publication fonts across 144 families.",
    descriptionAr: "393 خط أردو للنشر والتراكيب الكلاسيكية عبر 144 عائلة.",
  },
  {
    id: "pack-essential-013",
    name: "Essential Pack 013 — Urdu Typography III",
    nameAr: "الحزمة الأساسية 013 — خطوط الأردو III",
    script: "Urdu",
    scripts: ["Urdu"],
    fontCount: 372,
    familyCount: 167,
    sizeBytes: 34782399,
    uncompressedSizeBytes: 80608508,
    sizeFormatted: "33.17 MB",
    filename: "fontivo-essential-013.zip",
    downloadUrl: `${FONTS_RELEASE_BASE}/fontivo-essential-013.zip`,
    sha256: "5e3055b1be89b9389e719fbf7ccb842735a80594088902a49184c004f69be5e9",
    description:
      "372 Urdu headline and contemporary display fonts across 167 families.",
    descriptionAr: "372 خط أردو للعناوين والتصميم الحديث عبر 167 عائلة.",
  },
  {
    id: "pack-essential-014",
    name: "Essential Pack 014 — Urdu Typography IV",
    nameAr: "الحزمة الأساسية 014 — خطوط الأردو IV",
    script: "Urdu",
    scripts: ["Urdu"],
    fontCount: 395,
    familyCount: 160,
    sizeBytes: 35407865,
    uncompressedSizeBytes: 81702741,
    sizeFormatted: "33.77 MB",
    filename: "fontivo-essential-014.zip",
    downloadUrl: `${FONTS_RELEASE_BASE}/fontivo-essential-014.zip`,
    sha256: "15c3abb9bead00e121c554642b1806c7865d8496daf5eae6ff36ee58d3376869",
    description:
      "395 classic Urdu calligraphy and book faces across 160 families.",
    descriptionAr: "395 خط أردو للخطاطين والكتب عبر 160 عائلة.",
  },
  {
    id: "pack-essential-015",
    name: "Essential Pack 015 — Multilingual Finale",
    nameAr: "الحزمة الأساسية 015 — المجموعة المتعددة اللغات",
    script: "Multilingual",
    scripts: ["Arabic", "Latin", "Persian"],
    fontCount: 20,
    familyCount: 17,
    sizeBytes: 2046521,
    uncompressedSizeBytes: 3727604,
    sizeFormatted: "1.95 MB",
    filename: "fontivo-essential-015.zip",
    downloadUrl: `${FONTS_RELEASE_BASE}/fontivo-essential-015.zip`,
    sha256: "3df19618747eef5be3dd576fa962cc912db4c83155e730932b7d163a414a1a5c",
    description:
      "20 supplemental Latin (15), Persian (4), and Arabic (1) fonts completing the 10,939-font v1.0.3 library.",
    descriptionAr:
      "20 خطًا تكميليًا (لاتيني 15، فارسي 4، عربي 1) لإتمام مكتبة الإصدار v1.0.3.",
  },
];

export const fontPacksSummary = {
  totalFonts: 10939,
  totalFamilies: 4430,
  totalPacks: 15,
  totalSizeFormatted: "864.01 MB",
  uncompressedFormatted: "1,681.15 MB",
};

export const currentRelease: ReleaseInfo = {
  version: FONTIVO_VERSION,
  releaseDate: FONTIVO_RELEASE_DATE,
  tag: FONTIVO_VERSION_TAG,
  title: `Fontivo ${FONTIVO_VERSION_TAG} — Native Desktop & 11K Font Library`,
  isLatest: true,
  notes: [
    "Native Rust core + React 19 desktop font manager with ~38 MB memory footprint.",
    "In-memory Win32 font activation (FR_PRIVATE) without modifying Windows Registry.",
    "Synced with Fontivo-Fonts v1.0.3 (10,939 metadata-normalized fonts across 4,430 families).",
    "Built-in Adobe CC auto-activation bridge and Brand Color Studio (.ASE export).",
  ],
  changelogCategories: [
    {
      category: "Desktop App",
      items: [
        "Unified Windows AppData directory structure (Fonts/Imported, Updates, Downloads, Backups, Roaming preferences) with upfront Inno Setup initialization",
        "Methodical font & folder import pipeline with OpenType pre-validation, SHA-256 deduplication, and organized collection grouping",
        "Accurate Windows Fonts backup counting (including reboot-scheduled locked fonts), backup deletion, and responsive Portal modals",
        "Fontivo v2.0 Plum Ink & Coral visual identity across native window and UI with instant FR_PRIVATE RAM font activation",
        "Protected Win10/11 inbox & regional system fonts plus built-in Adobe CC bridge and .ASE palette export",
      ],
    },
    {
      category: "Fontivo-Fonts v1.0.3",
      items: [
        "10,939 verified unique fonts across 4,430 families (zero SHA-256 duplicates)",
        "Clean English metadata filenames across Arabic, Latin, Persian, and Urdu scripts",
        "15 deterministic ZIP packs (864.01 MB) hosted on GitHub Releases",
      ],
    },
  ],
  assets: [
    {
      name: "Windows Installer (Recommended)",
      filename: FONTIVO_INSTALLER_FILENAME,
      type: "installer",
      platform: "windows",
      architecture: "x64",
      sizeBytes: FONTIVO_INSTALLER_SIZE_BYTES,
      sizeFormatted: FONTIVO_INSTALLER_SIZE_FORMATTED,
      sha256: FONTIVO_INSTALLER_SHA256,
      downloadUrl: FONTIVO_INSTALLER_DOWNLOAD_URL,
      badge: "Recommended",
      description:
        "Standard Windows 10/11 installer with Start Menu shortcut and protocol registration.",
    },
  ],
  fontPacks: fontPackPackages,
  systemRequirements: {
    minimum: {
      os: "Windows 10 (64-bit) v1909+",
      processor: "64-bit x86_64 Dual-Core",
      memory: "2 GB RAM",
      diskSpace: "25 MB (App only)",
      display: "1280 x 720 (HiDPI ready)",
      architecture: "x64 Native + WebView2",
    },
    recommended: {
      os: "Windows 11 / 10 (64-bit)",
      processor: "Quad-Core 2.5+ GHz",
      memory: "4 GB+ RAM",
      diskSpace: "1 GB free for Font Packs",
      display: "1920 x 1080 or 4K",
      architecture: "x64 Native + WebView2",
    },
  },
  supportedSoftware: [
    {
      name: "Adobe Photoshop",
      version: "CC 2019+",
      integration: "Auto-Activation",
    },
    {
      name: "Adobe Illustrator",
      version: "CC 2019+",
      integration: "Auto-Activation & .ASE",
    },
    {
      name: "Adobe InDesign",
      version: "CC 2019+",
      integration: "Auto-Activation",
    },
    {
      name: "Figma Desktop",
      version: "Latest",
      integration: "System RAM Mount",
    },
  ],
};
