export interface FeatureSpec {
  label: string;
  value: string;
}

export interface WorkflowStep {
  step: number;
  phase: string;
  action: string;
  outcome: string;
}

export interface FeatureDeepDive {
  problemStatement: string;
  architecturalSolution: string;
  workflow: WorkflowStep[];
  technicalSpecs: FeatureSpec[];
  architectureDiagram: {
    type: "memory" | "socket" | "cdn" | "brand" | "engine" | "security";
    title: string;
    description: string;
  };
  codeSnippet: {
    language: string;
    filename: string;
    code: string;
  };
}

export interface Feature {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  iconName: string;
  category:
    "core" | "performance" | "integration" | "brand" | "security" | "cloud";
  badge: string;
  highlights: string[];
  specs: FeatureSpec[];
  deepDive: FeatureDeepDive;
}

export const coreFeatures: Feature[] = [
  {
    id: "in-memory-activation",
    title: "Instant Font Activation",
    shortTitle: "Instant Activation",
    tagline:
      "Activate fonts for your session without slowing down Windows or cluttering your system fonts folder.",
    description:
      "Use any font immediately inside your design apps without copying thousands of files into your Windows Fonts folder. Fonts appear right away and unload cleanly when Fontivo closes.",
    iconName: "Cpu",
    category: "performance",
    badge: "Instant < 2ms",
    highlights: [
      "Keeps your Windows Fonts folder clean — prevents slow boot times and bloated font menus.",
      "Updates Photoshop, Illustrator, InDesign, and Figma live as soon as you toggle a font.",
      "Runs smoothly in standard user mode with no administrator prompt.",
    ],
    specs: [
      { label: "Activation Speed", value: "< 2 ms" },
      { label: "System Clutter", value: "Zero" },
      { label: "Session Cleanup", value: "Automatic on Exit" },
    ],
    deepDive: {
      problemStatement:
        "Installing thousands of fonts permanently fills your system fonts folder and slows down both Windows startup and Creative Cloud launch times.",
      architecturalSolution:
        "Fontivo activates fonts strictly for your active creative session without copying files into your system fonts folder.",
      workflow: [
        {
          step: 1,
          phase: "Select",
          action: "Toggle a font family or workspace pack in Fontivo.",
          outcome: "Validated font metadata loads in under 1 ms.",
        },
        {
          step: 2,
          phase: "Activate",
          action: "Load fonts directly for your active design session.",
          outcome: "Fonts become ready without copying files to Windows.",
        },
        {
          step: 3,
          phase: "Sync",
          action: "Notify open creative apps automatically.",
          outcome: "Design tools see the activated fonts right away.",
        },
      ],
      technicalSpecs: [
        { label: "Startup Speed", value: "< 0.35s Cold Start" },
        { label: "Memory Footprint", value: "~38 MB Idle" },
        { label: "Reboot Required", value: "None" },
      ],
      architectureDiagram: {
        type: "memory",
        title: "Session Activation Flow",
        description:
          "Font File -> Session Activation -> Live App Sync -> Creative Apps",
      },
      codeSnippet: {
        language: "text",
        filename: "session.log",
        code: `[OK] Font family activated for session • 0 system files copied`,
      },
    },
  },
  {
    id: "font-catalog",
    title: "10,939 Curated Fonts + Google Fonts",
    shortTitle: "Unified Library",
    tagline:
      "Browse ~11,000 deduplicated fonts alongside live Google Fonts and local folders.",
    description:
      "Organize local studio folders, sync live Google Fonts, and explore 10,939 verified open-source fonts across 4,430 families spanning Latin (7,146), Urdu (1,565), Persian (1,257), and Arabic (971).",
    iconName: "Library",
    category: "core",
    badge: "10,939 Fonts",
    highlights: [
      "Normalized English metadata filenames and family grouping.",
      "Zero SHA-256 duplicates across the entire 4,430-family catalog.",
      "Virtual grid scrolling handles large collections smoothly.",
    ],
    specs: [
      { label: "Verified Fonts", value: "10,939" },
      { label: "Font Families", value: "4,430" },
      { label: "Scripts", value: "Latin, Urdu, Persian, Arabic" },
    ],
    deepDive: {
      problemStatement:
        "Design archives often accumulate broken folders, duplicated weights, and cryptic filenames.",
      architecturalSolution:
        "Every font in Fontivo-Fonts v1.0.3 is parsed from its internal binary name table, deduplicated by SHA-256, and grouped by family.",
      workflow: [
        {
          step: 1,
          phase: "Index",
          action: "Scan local folders and cached catalog metadata.",
          outcome: "Instant search across family names and scripts.",
        },
        {
          step: 2,
          phase: "Preview",
          action: "Test Arabic and Latin sample text at any weight or size.",
          outcome: "Compare glyphs side by side before activating.",
        },
      ],
      technicalSpecs: [
        { label: "Latin Fonts", value: "7,146" },
        { label: "Urdu Fonts", value: "1,565" },
        { label: "Persian Fonts", value: "1,257" },
        { label: "Arabic Fonts", value: "971" },
      ],
      architectureDiagram: {
        type: "engine",
        title: "Catalog & Local Index",
        description:
          "Binary Name Parser -> SHA-256 Dedup -> Virtual Specimen Grid",
      },
      codeSnippet: {
        language: "json",
        filename: "manifest.json",
        code: `{ "libraryVersion": "1.0.3", "totalUniqueFonts": 10939, "totalFamilies": 4430, "totalPackages": 15 }`,
      },
    },
  },
  {
    id: "font-packs-cdn",
    title: "Modular GitHub Font Packs (v1.0.3)",
    shortTitle: "Cloud Packs",
    tagline:
      "Keep the desktop app at 4.00 MB and download only the packs you want.",
    description:
      "Download any of the 15 SHA-256 verified ZIP packs hosted on GitHub Releases (864.01 MB total) directly inside the app with safe extraction and automatic indexing.",
    iconName: "CloudDownload",
    category: "cloud",
    badge: "15 Verified Packs",
    highlights: [
      "Hosted cleanly as the single v1.0.3 release on GitHub.",
      "Verified against SHA-256 checksums before extraction.",
      "Path-traversal (Zip Slip) and decompression bomb protection.",
    ],
    specs: [
      { label: "Release Tag", value: "v1.0.3" },
      { label: "Packages", value: "15 Deterministic ZIPs" },
      { label: "Total Size", value: "864.01 MB" },
    ],
    deepDive: {
      problemStatement:
        "Bundling ~1.7 GB of uncompressed fonts inside an app installer wastes disk space and slows updates.",
      architecturalSolution:
        "Fontivo keeps the Windows installer at 4.00 MB and streams selected script packs on demand from GitHub Releases.",
      workflow: [
        {
          step: 1,
          phase: "Verify",
          action: "Fetch live manifest from Fontivo-Fonts.",
          outcome: "Display exact sizes and SHA-256 hashes.",
        },
        {
          step: 2,
          phase: "Extract",
          action: "Verify checksum and unpack safely to %APPDATA%\\Fontivo.",
          outcome: "Fonts index cleanly into the desktop library.",
        },
      ],
      technicalSpecs: [
        { label: "Setup Installer", value: "4.00 MB" },
        { label: "Portable ZIP", value: "3.07 MB" },
        { label: "Hash Verification", value: "SHA-256 Enforced" },
      ],
      architectureDiagram: {
        type: "cdn",
        title: "GitHub Releases Stream",
        description:
          "v1.0.3 ZIP -> SHA-256 Verify -> SafeZipExtractor -> Library",
      },
      codeSnippet: {
        language: "powershell",
        filename: "verify.ps1",
        code: `Get-FileHash .\\fontivo-essential-001.zip -Algorithm SHA256`,
      },
    },
  },
  {
    id: "adobe-live-bridge",
    title: "Automatic Adobe CC Font Sync",
    shortTitle: "Adobe CC Sync",
    tagline:
      "Missing fonts activate seamlessly when you open files in Photoshop, Illustrator, and InDesign.",
    description:
      "Fontivo scans your local design files (.PSD, .AI, .INDD, .PDF) on-device and activates any missing workspace fonts automatically so you never hit a Missing Fonts dialog.",
    iconName: "Layers",
    category: "integration",
    badge: "Auto-Sync",
    highlights: [
      "Inspects design files locally without uploading client assets.",
      "Activates required workspace fonts automatically in one click.",
      "100% free forever with no Adobe plugin subscription fees.",
    ],
    specs: [
      { label: "Sync Mode", value: "100% Offline" },
      { label: "Design Formats", value: ".PSD, .AI, .INDD, .PDF" },
      { label: "Cost", value: "Free (Open Source)" },
    ],
    deepDive: {
      problemStatement:
        "Opening client files with missing fonts interrupts design flow and normally requires paid font manager tiers.",
      architecturalSolution:
        "Fontivo includes a fast, offline-first file scanner that syncs missing fonts directly with your local Adobe Creative Cloud apps.",
      workflow: [
        {
          step: 1,
          phase: "Scan",
          action: "Inspect project directory or active Adobe document.",
          outcome: "Identify required fonts locally in milliseconds.",
        },
        {
          step: 2,
          phase: "Activate",
          action: "Match workspace fonts and activate them for your session.",
          outcome: "Missing fonts resolve immediately inside Adobe apps.",
        },
      ],
      technicalSpecs: [
        { label: "Processing", value: "On-Device Only" },
        { label: "Privacy", value: "0 Network Telemetry" },
      ],
      architectureDiagram: {
        type: "socket",
        title: "Offline Creative Sync",
        description:
          "PSD / AI / INDD -> Font Match -> Instant Activation -> Adobe CC",
      },
      codeSnippet: {
        language: "json",
        filename: "sync-request.json",
        code: `{ "action": "activateFonts", "fonts": ["Cairo-Bold", "Inter-Regular"] }`,
      },
    },
  },
  {
    id: "workspaces-brand-studio",
    title: "Color Studio, Eyedropper & .ASE Export",
    shortTitle: "Brand Studio",
    tagline:
      "Pick screen colors, check WCAG contrast, and export Adobe .ASE palettes.",
    description:
      "Group fonts and brand colors into project workspaces, verify contrast against dark Plum or light Paper surfaces, and export binary Adobe Swatch Exchange (.ASE) or CSS tokens.",
    iconName: "Palette",
    category: "brand",
    badge: ".ASE & WCAG",
    highlights: [
      "5x5 magnification screen color eyedropper built into the app.",
      "Live WCAG 2.1 AA/AAA contrast validation for text and surfaces.",
      "Generates standard IEEE-754 binary .ASE swatch files cleanly.",
    ],
    specs: [
      { label: "Export Formats", value: ".ASE, CSS, JSON" },
      { label: "Contrast Audit", value: "WCAG 2.1 AA / AAA" },
    ],
    deepDive: {
      problemStatement:
        "Designers juggle separate tools for font pairing, eyedropping colors, contrast checking, and exporting .ASE palettes.",
      architecturalSolution:
        "Fontivo integrates project workspaces with an accurate .ASE binary serializer and contrast calculator.",
      workflow: [
        {
          step: 1,
          phase: "Sample",
          action: "Pick colors with the 5x5 loupe or define brand tokens.",
          outcome: "Live hex/RGB values and WCAG scores update instantly.",
        },
        {
          step: 2,
          phase: "Export",
          action: "Generate binary .ASE swatches or CSS variables.",
          outcome: "Drop straight into Illustrator, Photoshop, or code.",
        },
      ],
      technicalSpecs: [
        { label: "ASE Spec", value: "Big-Endian IEEE-754" },
        { label: "Arabic Labels", value: "UTF-16BE Supported" },
      ],
      architectureDiagram: {
        type: "brand",
        title: "Brand Token Pipeline",
        description: "Color Loupe -> WCAG Check -> Binary .ASE / CSS Tokens",
      },
      codeSnippet: {
        language: "css",
        filename: "tokens.css",
        code: `:root { --fontivo-plum: #291C2E; --fontivo-coral: #F16B50; --fontivo-lavender: #B7A1D9; }`,
      },
    },
  },
  {
    id: "system-fonts-recovery",
    title: "System Health & Offline Privacy",
    shortTitle: "System Health",
    tagline:
      "Clean up broken font entries safely, protect core system fonts, and work 100% offline.",
    description:
      "Includes automated restore backups before maintenance, strict protection for core Windows fonts, and an offline-first architecture with zero telemetry.",
    iconName: "ShieldCheck",
    category: "security",
    badge: "Zero Telemetry",
    highlights: [
      "Protects Windows core fonts (Segoe UI, Arial, Tahoma) from accidental removal.",
      "Zero tracking, zero analytics, and zero required accounts.",
      "Thoroughly verified across automated desktop and UI test suites.",
    ],
    specs: [
      { label: "Telemetry", value: "0.0 kB (None)" },
      { label: "License", value: "MIT Open Source" },
    ],
    deepDive: {
      problemStatement:
        "Uninstalled legacy font tools leave broken font entries behind and risk removing critical Windows UI fonts.",
      architecturalSolution:
        "Fontivo creates automatic restore backups before maintenance and strictly protects core Windows system fonts.",
      workflow: [
        {
          step: 1,
          phase: "Audit",
          action: "Scan system font entries for missing files.",
          outcome: "Safely surface broken entries with one-click cleanup.",
        },
        {
          step: 2,
          phase: "Protect",
          action: "Save a backup snapshot and enforce a protected font list.",
          outcome: "Restore backups anytime in one click.",
        },
      ],
      technicalSpecs: [
        { label: "Mode", value: "100% Offline-First" },
        { label: "Privacy", value: "Zero Accounts or Tracking" },
      ],
      architectureDiagram: {
        type: "security",
        title: "System Protection Layer",
        description:
          "Core Font Guard -> Snapshot Backup -> Safe System Cleanup",
      },
      codeSnippet: {
        language: "text",
        filename: "audit.log",
        code: `[OK] Core Windows fonts protected • 0 broken entries • Snapshot saved`,
      },
    },
  },
];
