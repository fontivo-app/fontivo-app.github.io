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
    title: "In-Memory RAM Activation",
    shortTitle: "RAM Engine",
    tagline:
      "Activate fonts in volatile session memory with zero Windows Registry writes.",
    description:
      "Mount fonts directly via Win32 AddFontResourceExW (FR_PRIVATE) instead of copying thousands of files into C:\\Windows\\Fonts. Fonts appear immediately in design apps and unload cleanly when Fontivo exits.",
    iconName: "Cpu",
    category: "performance",
    badge: "FR_PRIVATE < 2ms",
    highlights: [
      "Zero registry writes — prevents Windows FNTCACHE bloat and slow boot times.",
      "Broadcasts WM_FONTCHANGE so Photoshop, Illustrator, and Figma update live.",
      "Runs cleanly in standard user mode with no administrator prompt.",
    ],
    specs: [
      { label: "Activation Latency", value: "< 2 ms" },
      { label: "Registry Writes", value: "0 Bytes" },
      { label: "Session Cleanup", value: "Automatic on Exit" },
    ],
    deepDive: {
      problemStatement:
        "Installing thousands of fonts permanently fills C:\\Windows\\Fonts and slows down both Windows boot and Creative Cloud startup.",
      architecturalSolution:
        "Fontivo loads fonts strictly into your active user session in RAM using Win32 AddFontResourceExW with FR_PRIVATE isolation.",
      workflow: [
        {
          step: 1,
          phase: "Select",
          action: "Toggle a font family or workspace pack in Fontivo.",
          outcome: "Validated metadata loads in under 1 ms.",
        },
        {
          step: 2,
          phase: "Mount",
          action: "Invoke AddFontResourceExW with FR_PRIVATE.",
          outcome: "Fonts register in memory with zero disk copying.",
        },
        {
          step: 3,
          phase: "Sync",
          action: "Broadcast WM_FONTCHANGE across desktop windows.",
          outcome: "Design tools see the activated fonts right away.",
        },
      ],
      technicalSpecs: [
        { label: "Engine", value: "Native Rust 2021 + Win32 GDI32" },
        { label: "Memory Footprint", value: "~38 MB Idle" },
        { label: "Reboot Required", value: "0 ms (None)" },
      ],
      architectureDiagram: {
        type: "memory",
        title: "Win32 User-Space Memory Flow",
        description:
          "Font File -> RAM Handle (FR_PRIVATE) -> WM_FONTCHANGE -> Creative Apps",
      },
      codeSnippet: {
        language: "rust",
        filename: "windows.rs",
        code: `let count = AddFontResourceExW(path_w.as_ptr(), FR_PRIVATE, std::ptr::null_mut());
PostMessageW(HWND_BROADCAST, WM_FONTCHANGE, 0, 0);`,
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
    title: "Adobe CC Auto-Activation Bridge",
    shortTitle: "Adobe CC Bridge",
    tagline:
      "Resolve missing fonts in Photoshop, Illustrator, and InDesign automatically.",
    description:
      "A local loopback listener scans open project files (.PSD, .AI, .INDD, .PDF) and resolves required PostScript font names from your workspaces in milliseconds.",
    iconName: "Layers",
    category: "integration",
    badge: "Loopback 27715",
    highlights: [
      "Inspects design files locally without uploading client assets.",
      "Activates required workspace fonts into RAM in one click.",
      "100% free forever with no Adobe plugin subscription fees.",
    ],
    specs: [
      { label: "Local Socket", value: "127.0.0.1:27715" },
      { label: "Design Formats", value: ".PSD, .AI, .INDD, .PDF" },
      { label: "Cost", value: "Free (Open Source)" },
    ],
    deepDive: {
      problemStatement:
        "Opening client files with missing fonts interrupts design flow and normally requires paid font manager tiers.",
      architecturalSolution:
        "Fontivo includes a native Rust file scanner and local TCP socket bridge bound strictly to localhost.",
      workflow: [
        {
          step: 1,
          phase: "Scan",
          action: "Inspect project directory or active Adobe document.",
          outcome: "Extract required PostScript font names locally.",
        },
        {
          step: 2,
          phase: "Mount",
          action: "Match files and call Win32 FR_PRIVATE activation.",
          outcome: "Missing fonts resolve immediately inside Adobe apps.",
        },
      ],
      technicalSpecs: [
        { label: "Binding", value: "Localhost Only (127.0.0.1)" },
        { label: "Privacy", value: "0 Network Telemetry" },
      ],
      architectureDiagram: {
        type: "socket",
        title: "Local Design Bridge",
        description:
          "PSD / AI / INDD -> PostScript Match -> RAM Mount -> Adobe CC",
      },
      codeSnippet: {
        language: "json",
        filename: "bridge-request.json",
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
    title: "System Health & Local-First Safety",
    shortTitle: "System Health",
    tagline:
      "Audit orphaned Windows font keys, protect core fonts, and run 100% privately.",
    description:
      "Includes a Registry Guardian with automated restore backups, protected Windows core font safeguards, and a zero-telemetry architecture audited by 135 Rust tests.",
    iconName: "ShieldCheck",
    category: "security",
    badge: "Zero Telemetry",
    highlights: [
      "Protects Windows core fonts (Segoe UI, Arial, Tahoma) from accidental removal.",
      "Zero tracking, zero analytics, and zero required accounts.",
      "135 Rust unit/security tests & 170 React UI tests verified.",
    ],
    specs: [
      { label: "Telemetry", value: "0.0 kB (None)" },
      { label: "License", value: "MIT Open Source" },
    ],
    deepDive: {
      problemStatement:
        "Uninstalled legacy font tools leave broken registry entries and risk removing critical Windows UI fonts.",
      architecturalSolution:
        "Fontivo backs up registry snapshots before maintenance and strictly protects core Windows system fonts.",
      workflow: [
        {
          step: 1,
          phase: "Audit",
          action: "Scan HKCU/HKLM font entries for missing disk targets.",
          outcome: "Safely surface orphaned keys with one-click cleanup.",
        },
        {
          step: 2,
          phase: "Protect",
          action: "Snapshot before changes and enforce protected whitelist.",
          outcome: "Restore backups anytime in one click.",
        },
      ],
      technicalSpecs: [
        { label: "Rust Tests", value: "135 Passed (0 Warnings)" },
        { label: "UI Tests", value: "170 Passed" },
      ],
      architectureDiagram: {
        type: "security",
        title: "System Protection Layer",
        description:
          "Whitelist Guard -> Snapshot Backup -> Clean Registry / FNTCACHE",
      },
      codeSnippet: {
        language: "text",
        filename: "audit.log",
        code: `[OK] Core Windows fonts protected • 0 orphaned keys • Snapshot saved`,
      },
    },
  },
];
