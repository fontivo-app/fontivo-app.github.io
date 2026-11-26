import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  getLatestRelease,
  getFontRepoStats,
  getStaticRelease,
} from "@/lib/github";
import { currentRelease, fontPackPackages } from "@/config/releases";
import { FONTIVO_VERSION, FONTIVO_VERSION_TAG } from "@/config/version";

describe("GitHub API Client & Release Manifest Integration", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("getStaticRelease() returns currentRelease static manifest snapshot synchronously", () => {
    const release = getStaticRelease();
    expect(release).toBeDefined();
    expect(release.version).toBe(FONTIVO_VERSION);
    expect(release.tag).toBe(FONTIVO_VERSION_TAG);
    expect(release.assets.length).toBe(1);
    expect(release.assets[0].sizeFormatted).toBe(
      currentRelease.assets[0].sizeFormatted,
    );
  });

  it("getLatestRelease() maps live GitHub API response properly when network succeeds", async () => {
    const mockApiResponse = {
      tag_name: "v1.1.0",
      name: "Fontivo v1.1.0 — High-Performance Update",
      body: "Release notes for v1.1.0",
      published_at: "2026-11-21T00:00:00Z",
      html_url: "https://github.com/Ahmedfahmy8308/Fontivo/releases/tag/v1.1.0",
      assets: [
        {
          name: "Fontivo-v1.0-Setup.exe",
          size: 4200000,
          download_count: 320,
          browser_download_url:
            "https://github.com/Ahmedfahmy8308/Fontivo/releases/download/v1.1.0/Fontivo-v1.0-Setup.exe",
        },
        {
          name: "Fontivo.exe",
          size: 13000000,
          download_count: 580,
          browser_download_url:
            "https://github.com/Ahmedfahmy8308/Fontivo/releases/download/v1.1.0/Fontivo.exe",
        },
      ],
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockApiResponse),
    });

    const release = await getLatestRelease();

    expect(release.version).toBe("1.1.0");
    expect(release.tag).toBe("v1.1.0");
    expect(release.title).toBe("Fontivo v1.1.0 — High-Performance Update");
    expect(release.assets[0].downloadUrl).toBe(
      "https://github.com/Ahmedfahmy8308/Fontivo/releases/download/v1.1.0/Fontivo-v1.0-Setup.exe",
    );
    expect(release.assets[0].sizeFormatted).toBe(
      `${(4200000 / (1024 * 1024)).toFixed(2)} MB`,
    );
  });

  it("getLatestRelease() gracefully falls back to static release snapshot on HTTP 403 rate-limit or error", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
      statusText: "Rate Limit Exceeded",
    });

    const release = await getLatestRelease();

    expect(release).toEqual(currentRelease);
    expect(release.version).toBe(FONTIVO_VERSION);
    expect(release.tag).toBe(FONTIVO_VERSION_TAG);
  });

  it("getLatestRelease() gracefully falls back to static release snapshot on network failure / offline", async () => {
    global.fetch = vi
      .fn()
      .mockRejectedValue(new Error("Network offline (ENOTFOUND)"));

    const release = await getLatestRelease();

    expect(release).toEqual(currentRelease);
    expect(release.version).toBe(FONTIVO_VERSION);
  });

  it("getFontRepoStats() returns all 15 packages with font counts on fallback", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    const stats = await getFontRepoStats();

    expect(stats.totalPacks).toBe(15);
    expect(stats.packages.length).toBe(15);
    expect(stats.totalFonts).toBe(10939);
    expect(stats.totalFamilies).toBe(4430);
    expect(stats.packages).toEqual(fontPackPackages);
  });

  it("getFontRepoStats() aggregates download counts when GitHub releases API succeeds", async () => {
    const mockReleases = [
      {
        tag_name: "v1.0.0",
        published_at: "2026-11-20T12:00:00Z",
        assets: [
          {
            name: "pack1.zip",
            download_count: 500,
            size: 1000,
            browser_download_url: "url1",
          },
          {
            name: "pack2.zip",
            download_count: 750,
            size: 2000,
            browser_download_url: "url2",
          },
        ],
      },
      {
        tag_name: "v1.0.1",
        published_at: "2026-11-21T12:00:00Z",
        assets: [
          {
            name: "pack3.zip",
            download_count: 1200,
            size: 3000,
            browser_download_url: "url3",
          },
        ],
      },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockReleases),
    });

    const stats = await getFontRepoStats();

    expect(stats.totalDownloads).toBe(500 + 750 + 1200);
    expect(stats.totalPacks).toBe(15);
  });

  it("getLatestRelease({ noStore: true }) extracts Fontivo-Setup.exe and SHA-256 digest cleanly", async () => {
    const digest = "a".repeat(64);
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        tag_name: "v1.0.9",
        name: "Fontivo v1.0.9",
        body: "Live release",
        published_at: "2026-12-01T00:00:00Z",
        html_url:
          "https://github.com/Ahmedfahmy8308/Fontivo/releases/tag/v1.0.9",
        assets: [
          {
            name: "Fontivo-Setup.exe",
            size: 5242880,
            digest: `sha256:${digest}`,
            download_count: 10,
            browser_download_url:
              "https://github.com/Ahmedfahmy8308/Fontivo/releases/download/v1.0.9/Fontivo-Setup.exe",
          },
        ],
      }),
    });
    global.fetch = fetchMock;

    const release = await getLatestRelease({ noStore: true });
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/releases/latest"),
      expect.objectContaining({ cache: "no-store" }),
    );
    expect(release.version).toBe("1.0.9");
    expect(release.tag).toBe("v1.0.9");
    expect(release.assets[0].filename).toBe("Fontivo-Setup.exe");
    expect(release.assets[0].sha256).toBe(digest);
    expect(release.assets[0].sizeFormatted).toBe("5.00 MB");
  });
});
