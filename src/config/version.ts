/**
 * Single Source of Truth (SSOT) for Fontivo Desktop & Fontivo-Fonts Releases.
 *
 * Update this single file when releasing a new Desktop or Fontivo-Fonts version.
 */

export const FONTIVO_VERSION = "1.0.0";
export const FONTIVO_VERSION_TAG = `v${FONTIVO_VERSION}`;
export const FONTIVO_MAJOR_MINOR = FONTIVO_VERSION.split(".")
  .slice(0, 2)
  .join(".");
export const FONTIVO_RELEASE_DATE = "2026-11-25";

export const FONTIVO_GITHUB_REPO = "Ahmedfahmy8308/Fontivo";
export const FONTIVO_FONTS_REPO = "Ahmedfahmy8308/Fontivo-Fonts";

/** Fontivo-Fonts Library Release SSOT */
export const FONTIVO_FONTS_VERSION = "1.0.3";
export const FONTIVO_FONTS_VERSION_TAG = `v${FONTIVO_FONTS_VERSION}`;
export const FONTIVO_FONTS_TOTAL = "10,939";
export const FONTIVO_FONTS_FAMILIES = "4,430";
export const FONTIVO_FONTS_PACKS = 15;
export const FONTIVO_FONTS_SIZE_FORMATTED = "864.01 MB";
export const FONTIVO_FONTS_RELEASE_URL = `https://github.com/${FONTIVO_FONTS_REPO}/releases/tag/${FONTIVO_FONTS_VERSION_TAG}`;

/** Windows Installer Binary */
export const FONTIVO_INSTALLER_FILENAME = `Fontivo-v${FONTIVO_MAJOR_MINOR}-Setup.exe`;
export const FONTIVO_INSTALLER_SIZE_BYTES = 4509405;
export const FONTIVO_INSTALLER_SIZE_FORMATTED = "4.30 MB";
export const FONTIVO_INSTALLER_SHA256 =
  "cf60e7691f5f86861b9ad6a8bfd028e55a7ec3cfef582ada5610c5c0f7c22fe2";

export const GITHUB_RELEASES_BASE = `https://github.com/${FONTIVO_GITHUB_REPO}/releases/download/${FONTIVO_VERSION_TAG}`;
export const GITHUB_LATEST_RELEASE_URL = `https://github.com/${FONTIVO_GITHUB_REPO}/releases/latest`;
export const FONTIVO_INSTALLER_DOWNLOAD_URL = `${GITHUB_RELEASES_BASE}/${FONTIVO_INSTALLER_FILENAME}`;

/** macOS & Linux Native Installer */
export const UNIX_INSTALL_CMD = `curl -fsSL https://raw.githubusercontent.com/${FONTIVO_GITHUB_REPO}/main/scripts/install.sh | bash`;
export const UNIX_INSTALL_SCRIPT_URL = `https://github.com/${FONTIVO_GITHUB_REPO}/blob/main/scripts/install.sh`;
