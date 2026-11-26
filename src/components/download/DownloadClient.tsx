"use client";

import * as React from "react";
import {
  Download,
  Copy,
  Check,
  ShieldCheck,
  Terminal,
  Search,
  Monitor,
  Layers,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import { ReleaseInfo, fontPacksSummary } from "@/config/releases";
import { FontRepoStats } from "@/lib/github";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn, copyTextToClipboard } from "@/lib/utils";
import { useTranslation } from "@/context/LanguageContext";

interface DownloadClientProps {
  release: ReleaseInfo;
  fontStats: FontRepoStats;
}

type TargetOS = "windows" | "macos" | "linux";

const UNIX_INSTALL_CMD =
  "curl -fsSL https://raw.githubusercontent.com/Ahmedfahmy8308/Fontivo/main/scripts/install.sh | bash";
const INSTALL_SH_URL =
  "https://github.com/Ahmedfahmy8308/Fontivo/blob/main/scripts/install.sh";

const SCRIPT_FILTER_KEYS = [
  "all",
  "arabic",
  "latin",
  "persian",
  "urdu",
  "multilingual",
] as const;

const SCRIPT_LABELS: Record<string, { en: string; ar: string }> = {
  all: { en: "All Scripts", ar: "كل اللغات" },
  arabic: { en: "Arabic", ar: "عربي" },
  latin: { en: "Latin", ar: "لاتيني" },
  persian: { en: "Persian", ar: "فارسي" },
  urdu: { en: "Urdu", ar: "أردو" },
  multilingual: { en: "Multilingual", ar: "متعدد اللغات" },
};

export function DownloadClient({ release, fontStats }: DownloadClientProps) {
  const { t, locale } = useTranslation();
  const isAr = locale === "ar";
  const [targetOs, setTargetOs] = React.useState<TargetOS>("windows");
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [selectedScript, setSelectedScript] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [showAllPacks, setShowAllPacks] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (typeof navigator === "undefined") return;
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("mac os x") || ua.includes("macintosh")) {
      setTargetOs("macos");
    } else if (ua.includes("linux") && !ua.includes("android")) {
      setTargetOs("linux");
    } else {
      setTargetOs("windows");
    }
  }, []);

  const handleCopy = async (text: string, id: string) => {
    const ok = await copyTextToClipboard(text);
    if (ok) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2200);
    }
  };

  const installerAsset = release.assets[0];
  const verifyCmd = `Get-FileHash .\\${installerAsset?.filename || "Fontivo-v1.0-Setup.exe"} -Algorithm SHA256`;

  const filteredPacks = React.useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return release.fontPacks.filter((pack) => {
      const matchesScript =
        selectedScript === "all" ||
        pack.script.toLowerCase() === selectedScript;
      const matchesSearch =
        !q ||
        pack.name.toLowerCase().includes(q) ||
        pack.nameAr.toLowerCase().includes(q) ||
        pack.id.toLowerCase().includes(q) ||
        pack.script.toLowerCase().includes(q) ||
        pack.filename.toLowerCase().includes(q);
      return matchesScript && matchesSearch;
    });
  }, [release.fontPacks, selectedScript, searchQuery]);

  const isFiltered = selectedScript !== "all" || searchQuery.trim().length > 0;
  const visiblePacks =
    showAllPacks || isFiltered ? filteredPacks : filteredPacks.slice(0, 6);

  const totalFontsDisplay = (
    fontStats?.totalFonts || fontPacksSummary.totalFonts
  ).toLocaleString("en-US");

  return (
    <div className="space-y-12 sm:space-y-14">
      {/* 1. Desktop Binaries & Platform Selector */}
      <section
        aria-labelledby="desktop-downloads-heading"
        className="space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2
            id="desktop-downloads-heading"
            className="font-display text-xl sm:text-2xl font-bold text-white"
          >
            {t("downloadPage.desktopSectionTitle")}
          </h2>
          <Badge variant="success" size="sm" className="gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{t("footer.sha256Verified")}</span>
          </Badge>
        </div>

        {/* OS Switcher Tabs */}
        <div
          role="tablist"
          aria-label="Operating System"
          className="inline-flex flex-wrap items-center gap-2 rounded-xl border border-brand-border bg-brand-surface-200/70 p-1.5"
        >
          {(
            [
              { id: "windows", label: t("downloadPage.osWindows") },
              { id: "macos", label: t("downloadPage.osMacos") },
              { id: "linux", label: t("downloadPage.osLinux") },
            ] as const
          ).map((osTab) => {
            const active = targetOs === osTab.id;
            return (
              <button
                key={osTab.id}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => setTargetOs(osTab.id)}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors",
                  active
                    ? "bg-brand-coral text-brand-navy"
                    : "text-brand-text-secondary hover:text-white",
                )}
              >
                {osTab.label}
              </button>
            );
          })}
        </div>

        {targetOs === "windows" ? (
          <>
            <div className="w-full">
              {release.assets.map((asset) => (
                <div
                  key={asset.filename}
                  className="rounded-2xl border border-brand-coral/40 bg-brand-surface-200/80 p-6 flex flex-col justify-between gap-5 shadow-card min-w-0"
                >
                  <div className="space-y-3 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="h-10 w-10 rounded-xl flex items-center justify-center border shrink-0 bg-brand-coral/15 border-brand-coral/35 text-brand-coral-light">
                          <Download className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-display font-bold text-lg text-white break-words">
                            {t("common.setup")}
                          </h3>
                          <p className="font-mono text-xs text-brand-text-muted break-all ltr-isolate">
                            {asset.filename}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Badge variant="purple" size="sm">
                          {t("common.recommended")}
                        </Badge>
                        <span className="font-mono text-xs font-semibold text-white bg-brand-surface-300 border border-brand-border px-2.5 py-1 rounded-lg ltr-isolate">
                          {asset.sizeFormatted}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-brand-text-secondary leading-relaxed">
                      {isAr
                        ? "مثبت ويندوز القياسي مع اختصار قائمة ابدأ ودعم التشغيل السريع دون الحاجة لصلاحيات مسؤول."
                        : asset.description}
                    </p>

                    {/* SHA-256 Box */}
                    <div className="rounded-xl bg-brand-surface-100 border border-brand-border-subtle p-3 space-y-1.5 min-w-0">
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="font-mono text-brand-text-muted">
                          SHA-256
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(asset.sha256, asset.filename)
                          }
                          className="inline-flex items-center gap-1 font-mono text-xs text-brand-coral-light hover:text-white transition-colors"
                        >
                          {copiedId === asset.filename ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-brand-coral-light" />
                              <span>{t("common.copied")}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              <span>{t("common.copyHash")}</span>
                            </>
                          )}
                        </button>
                      </div>
                      <code className="block font-mono text-[11px] sm:text-xs text-brand-text-secondary break-all ltr-isolate">
                        {asset.sha256}
                      </code>
                    </div>
                  </div>

                  <a
                    href={asset.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full gap-2 font-semibold"
                    >
                      <Download className="h-4 w-4 shrink-0" />
                      <span>
                        {t("common.downloadNow")} ({asset.sizeFormatted})
                      </span>
                    </Button>
                  </a>
                </div>
              ))}
            </div>

            {/* Compact Verification Bar */}
            <div className="rounded-xl border border-brand-border-subtle bg-brand-surface-100/80 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <Terminal className="h-4 w-4 text-brand-lavender shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-brand-text-secondary">
                    {t("downloadPage.verifyTitle")}
                  </p>
                  <code className="block font-mono text-xs text-white truncate sm:overflow-x-auto ltr-isolate">
                    {verifyCmd}
                  </code>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleCopy(verifyCmd, "ps-verify")}
                className="shrink-0 gap-1.5"
              >
                {copiedId === "ps-verify" ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-brand-coral-light" />
                    <span>{t("common.copied")}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>{t("common.copy")}</span>
                  </>
                )}
              </Button>
            </div>

            {/* Free Open-Source SmartScreen & Provenance Guide */}
            <div className="rounded-xl border border-brand-lavender/30 bg-brand-surface-100/70 p-4 space-y-2 text-xs text-brand-text-secondary">
              <div className="flex items-center gap-2 font-semibold text-white">
                <ShieldCheck className="h-4 w-4 text-brand-lavender-light shrink-0" />
                <span>
                  {isAr
                    ? "ملاحظة أمان Windows SmartScreen والتثبيت الموثق مجاناً"
                    : "Windows SmartScreen Notice & Free Build Provenance"}
                </span>
              </div>
              <p className="leading-relaxed">
                {isAr
                  ? 'نظراً لأن Fontivo مشروع مجاني ومفتوح المصدر بدون شهادة توقيع تجارية مدفوعة، قد يعرض ويندوز رسالة "Windows protected your PC". بعد مطابقة SHA-256 أعلاه، اضغط "More info" (معلومات إضافية) ثم "Run anyway" (التشغيل على أي حال)، أو تحقق من مصدر البناء الرسمي على خوادم GitHub عبر:'
                  : 'Because Fontivo is 100% free open-source software without a paid commercial EV certificate, Windows may show "Windows protected your PC". After verifying the SHA-256 above, click "More info" -> "Run anyway", or verify official GitHub SLSA build provenance:'}
              </p>
              <code className="block font-mono text-[11px] sm:text-xs text-brand-lavender-light bg-brand-plum-dark border border-brand-border-subtle rounded-lg px-3 py-2 break-all ltr-isolate">
                gh attestation verify .\Fontivo-v1.0-Setup.exe --owner
                Ahmedfahmy8308
              </code>
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-brand-lavender/40 bg-brand-surface-200/80 p-6 sm:p-8 space-y-5 shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <Badge variant="cyan" size="sm">
                  {targetOs === "macos"
                    ? "macOS (CoreText • ~/Library/Fonts)"
                    : "Linux (fontconfig • fc-cache)"}
                </Badge>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white pt-1">
                  {t("downloadPage.unixInstallTitle")}
                </h3>
                <p className="text-sm text-brand-text-secondary max-w-2xl">
                  {t("downloadPage.unixInstallNote")}
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-brand-surface-100 border border-brand-border-subtle p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
              <pre className="font-mono text-xs text-brand-lavender-light overflow-x-auto ltr-isolate">
                {UNIX_INSTALL_CMD}
              </pre>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => handleCopy(UNIX_INSTALL_CMD, "unix-install")}
                className="shrink-0 gap-1.5"
              >
                {copiedId === "unix-install" ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>{t("common.copied")}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>{t("common.copy")}</span>
                  </>
                )}
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-brand-text-muted pt-1">
              <span>{t("downloadPage.unixReqLabel")}</span>
              <a
                href={INSTALL_SH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-brand-coral-light hover:text-white transition-colors"
              >
                <span>{t("downloadPage.viewScriptBtn")}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        )}
      </section>

      {/* 2. Fontivo-Fonts v1.0.3 Packs */}
      <section
        id="font-packs"
        aria-labelledby="font-packs-heading"
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h2
                id="font-packs-heading"
                className="font-display text-xl sm:text-2xl font-bold text-white"
              >
                {t("downloadPage.packsSectionTitle")}
              </h2>
              <Badge variant="cyan" size="sm">
                <span className="ltr-isolate">{totalFontsDisplay}</span>{" "}
                {isAr ? "خط" : "Fonts"}
              </Badge>
            </div>
            <p className="text-sm text-brand-text-secondary max-w-2xl">
              {t("downloadPage.packsSubtitle")}
            </p>
          </div>

          <a
            href={siteConfig.links.fontsLatestRelease}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <Button variant="secondary" size="sm" className="gap-1.5">
              <span>{t("fontPackage.ctaViewRepo")}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </a>
        </div>

        {/* Search & Script Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1 min-w-0">
            <Search className="h-4 w-4 text-brand-text-muted absolute top-1/2 -translate-y-1/2 start-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("downloadPage.searchPlaceholder")}
              className="w-full h-10 ps-10 pe-4 rounded-xl bg-brand-surface-200 border border-brand-border text-sm text-white placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-coral"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {SCRIPT_FILTER_KEYS.map((key) => {
              const active = selectedScript === key;
              const label = isAr
                ? SCRIPT_LABELS[key].ar
                : SCRIPT_LABELS[key].en;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedScript(key)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors",
                    active
                      ? "bg-brand-coral text-brand-navy border-brand-coral font-semibold"
                      : "bg-brand-surface-200 text-brand-text-secondary border-brand-border hover:text-white",
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Cards (< md) */}
        <div className="md:hidden space-y-3">
          {visiblePacks.map((pack) => {
            const scriptLabel =
              SCRIPT_LABELS[pack.script.toLowerCase()]?.[isAr ? "ar" : "en"] ||
              pack.script;
            return (
              <div
                key={pack.id}
                className="rounded-xl border border-brand-border bg-brand-surface-200/70 p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-sans font-semibold text-sm text-white break-words">
                      {isAr ? pack.nameAr : pack.name}
                    </h3>
                    <p className="font-mono text-xs text-brand-text-muted break-all ltr-isolate">
                      {pack.filename}
                    </p>
                  </div>
                  <Badge variant="outline" size="sm" className="shrink-0">
                    {scriptLabel}
                  </Badge>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-brand-text-secondary">
                  <span className="font-mono ltr-isolate">
                    {pack.fontCount.toLocaleString("en-US")} /{" "}
                    {pack.familyCount.toLocaleString("en-US")}
                  </span>
                  <span className="font-mono font-semibold text-white ltr-isolate">
                    {pack.sizeFormatted}
                  </span>
                </div>

                <a
                  href={pack.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full gap-1.5"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>{t("downloadPage.downloadZip")}</span>
                  </Button>
                </a>
              </div>
            );
          })}
        </div>

        {/* Desktop Table (md+) */}
        <div className="hidden md:block overflow-x-auto rounded-2xl border border-brand-border bg-brand-surface-200/60 shadow-card">
          <table className="w-full text-start border-collapse text-sm">
            <thead>
              <tr className="border-b border-brand-border bg-brand-surface-300/70 text-xs font-mono text-brand-text-secondary">
                <th className="py-3 px-4 text-start font-semibold">
                  {t("downloadPage.colPack")}
                </th>
                <th className="py-3 px-4 text-start font-semibold">
                  {t("downloadPage.colScript")}
                </th>
                <th className="py-3 px-4 text-start font-semibold">
                  {t("downloadPage.colFonts")}
                </th>
                <th className="py-3 px-4 text-start font-semibold">
                  {t("downloadPage.colSize")}
                </th>
                <th className="py-3 px-4 text-end font-semibold">
                  {t("downloadPage.colAction")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border-subtle">
              {visiblePacks.map((pack) => {
                const scriptLabel =
                  SCRIPT_LABELS[pack.script.toLowerCase()]?.[
                    isAr ? "ar" : "en"
                  ] || pack.script;
                return (
                  <tr
                    key={pack.id}
                    className="hover:bg-brand-surface-300/40 transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-white">
                        {isAr ? pack.nameAr : pack.name}
                      </div>
                      <div className="font-mono text-xs text-brand-text-muted ltr-isolate">
                        {pack.filename}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant="outline" size="sm">
                        {scriptLabel}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-brand-text-secondary ltr-isolate">
                      {pack.fontCount.toLocaleString("en-US")} /{" "}
                      {pack.familyCount.toLocaleString("en-US")}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs font-semibold text-white ltr-isolate">
                      {pack.sizeFormatted}
                    </td>
                    <td className="py-3.5 px-4 text-end">
                      <a
                        href={pack.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="secondary"
                          size="sm"
                          className="gap-1.5"
                        >
                          <Download className="h-3.5 w-3.5" />
                          <span>{t("downloadPage.downloadZip")}</span>
                        </Button>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {!isFiltered && filteredPacks.length > 6 && (
          <div className="flex justify-center">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => setShowAllPacks((prev) => !prev)}
              className="gap-2"
            >
              {showAllPacks ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  <span>{t("downloadPage.showLess")}</span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  <span>{t("downloadPage.showAll")}</span>
                </>
              )}
            </Button>
          </div>
        )}
      </section>

      {/* 3. System Requirements & Software Integration */}
      <section
        id="requirements"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div className="rounded-2xl border border-brand-border bg-brand-surface-200/60 p-6 space-y-4">
          <div className="flex items-center gap-2.5">
            <Monitor className="h-5 w-5 text-brand-coral-light shrink-0" />
            <h2 className="font-display font-bold text-lg text-white">
              {t("downloadPage.requirementsTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="rounded-xl bg-brand-surface-100 border border-brand-border-subtle p-4 space-y-2">
              <div className="font-mono font-semibold text-brand-lavender-light">
                {t("downloadPage.minReq")}
              </div>
              <p className="text-brand-text-secondary">
                {release.systemRequirements.minimum.os}
              </p>
              <p className="text-brand-text-secondary">
                {release.systemRequirements.minimum.memory} •{" "}
                {release.systemRequirements.minimum.diskSpace}
              </p>
              <p className="font-mono text-brand-text-muted ltr-isolate">
                {release.systemRequirements.minimum.architecture}
              </p>
            </div>

            <div className="rounded-xl bg-brand-surface-100 border border-brand-border-subtle p-4 space-y-2">
              <div className="font-mono font-semibold text-brand-coral-light">
                {t("downloadPage.recReq")}
              </div>
              <p className="text-brand-text-secondary">
                {release.systemRequirements.recommended.os}
              </p>
              <p className="text-brand-text-secondary">
                {release.systemRequirements.recommended.memory} •{" "}
                {release.systemRequirements.recommended.diskSpace}
              </p>
              <p className="font-mono text-brand-text-muted ltr-isolate">
                {release.systemRequirements.recommended.architecture}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-brand-border bg-brand-surface-200/60 p-6 space-y-4">
          <div className="flex items-center gap-2.5">
            <Layers className="h-5 w-5 text-brand-lavender-light shrink-0" />
            <h2 className="font-display font-bold text-lg text-white">
              {t("downloadPage.compatTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {release.supportedSoftware.map((sw) => (
              <div
                key={sw.name}
                className="rounded-xl bg-brand-surface-100 border border-brand-border-subtle p-3.5 space-y-1"
              >
                <div className="font-semibold text-white">{sw.name}</div>
                <div className="font-mono text-brand-text-muted ltr-isolate">
                  {sw.version}
                </div>
                <div className="text-brand-coral-light">{sw.integration}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
