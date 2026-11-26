import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DownloadClient } from "@/components/download/DownloadClient";
import { LanguageProvider } from "@/context/LanguageContext";
import { currentRelease, fontPackPackages } from "@/config/releases";
import { FontRepoStats } from "@/lib/github";

const mockFontStats: FontRepoStats = {
  repoName: "Ahmedfahmy8308/Fontivo-Fonts",
  totalPacks: 15,
  totalFonts: 10939,
  totalFamilies: 4430,
  packages: fontPackPackages,
  totalDownloads: 4850,
  lastUpdated: "November 2026",
};

describe("DownloadClient Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("syncs all 15 font packs with exact v1.0.3 manifest totals (10,939 fonts & 905,982,558 bytes)", () => {
    expect(fontPackPackages.length).toBe(15);

    const totalFonts = fontPackPackages.reduce(
      (sum, p) => sum + p.fontCount,
      0,
    );
    const totalBytes = fontPackPackages.reduce(
      (sum, p) => sum + p.sizeBytes,
      0,
    );

    expect(totalFonts).toBe(10939);
    expect(totalBytes).toBe(905982558);

    fontPackPackages.forEach((pack, index) => {
      const padded = String(index + 1).padStart(3, "0");
      expect(pack.id).toBe(`pack-essential-${padded}`);
      expect(pack.filename).toBe(`fontivo-essential-${padded}.zip`);
      expect(pack.downloadUrl).toBe(
        `https://github.com/Ahmedfahmy8308/Fontivo-Fonts/releases/download/v1.0.3/fontivo-essential-${padded}.zip`,
      );
      expect(pack.sha256).toMatch(/^[0-9a-f]{64}$/);
    });
  });

  it("renders Windows Installer card with synced size and download URL", () => {
    render(
      <LanguageProvider>
        <DownloadClient release={currentRelease} fontStats={mockFontStats} />
      </LanguageProvider>,
    );

    expect(screen.getByText("Windows Installer")).toBeDefined();
    expect(screen.queryByText("Portable ZIP")).toBeNull();
    expect(
      screen.getAllByText(currentRelease.assets[0].sizeFormatted).length,
    ).toBeGreaterThan(0);

    const downloadLink = screen.getByRole("link", {
      name: /Download Now/i,
    });
    expect(downloadLink.getAttribute("href")).toBe(
      currentRelease.assets[0].downloadUrl,
    );
  });

  it("switches cleanly between Windows, macOS, and Linux tabs", () => {
    render(
      <LanguageProvider>
        <DownloadClient release={currentRelease} fontStats={mockFontStats} />
      </LanguageProvider>,
    );

    fireEvent.click(screen.getByRole("tab", { name: "macOS" }));
    expect(screen.getByText(/macOS \(CoreText/i)).toBeDefined();
    expect(screen.getByText(/install\.sh \| bash/i)).toBeDefined();

    fireEvent.click(screen.getByRole("tab", { name: "Linux" }));
    expect(screen.getByText(/Linux \(fontconfig/i)).toBeDefined();
    expect(screen.getByText(/install\.sh \| bash/i)).toBeDefined();

    fireEvent.click(screen.getByRole("tab", { name: "Windows" }));
    expect(screen.getByText("Windows Installer")).toBeDefined();
  });

  it("copies SHA-256 digests and PowerShell verify command", async () => {
    render(
      <LanguageProvider>
        <DownloadClient release={currentRelease} fontStats={mockFontStats} />
      </LanguageProvider>,
    );

    expect(screen.getByText(currentRelease.assets[0].sha256)).toBeDefined();

    const copyHashButtons = screen.getAllByRole("button", {
      name: /copy sha-256/i,
    });
    expect(copyHashButtons.length).toBe(1);

    fireEvent.click(copyHashButtons[0]);
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        currentRelease.assets[0].sha256,
      );
    });

    const copyCmdBtn = screen.getByRole("button", { name: /^copy$/i });
    fireEvent.click(copyCmdBtn);
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        `Get-FileHash .\\${currentRelease.assets[0].filename} -Algorithm SHA256`,
      );
    });
  });

  it("filters font packs by script tabs and toggles Show All 15 Packs cleanly", () => {
    const { container } = render(
      <LanguageProvider>
        <DownloadClient release={currentRelease} fontStats={mockFontStats} />
      </LanguageProvider>,
    );

    const arabicPack = fontPackPackages[0];
    const latinPack = fontPackPackages.find((p) => p.script === "Latin")!;

    fireEvent.click(screen.getByRole("button", { name: /^Arabic$/i }));
    expect(screen.getAllByText(arabicPack.name).length).toBeGreaterThan(0);
    expect(screen.queryByText(latinPack.name)).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /^Latin$/i }));
    expect(screen.getAllByText(latinPack.name).length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole("button", { name: /^All Scripts$/i }));
    const toggleBtn = screen.getByRole("button", {
      name: /Show All 15 Packs/i,
    });
    fireEvent.click(toggleBtn);
    expect(
      screen.getByRole("button", { name: /Show Fewer Packs/i }),
    ).toBeDefined();

    const table = container.querySelector("table");
    expect(table?.className).toContain("text-start");
  });
});
