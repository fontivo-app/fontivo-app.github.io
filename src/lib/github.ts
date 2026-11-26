import {
  currentRelease,
  ReleaseInfo,
  ReleaseAsset,
  fontPackPackages,
  FontPackPackage,
} from "@/config/releases";

export interface GitHubReleaseAsset {
  name: string;
  size: number;
  download_count: number;
  browser_download_url: string;
}

export interface GitHubReleaseResponse {
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  html_url: string;
  assets: GitHubReleaseAsset[];
}

export interface FontRepoStats {
  repoName: string;
  totalPacks: number;
  totalFonts: number;
  totalFamilies: number;
  packages: FontPackPackage[];
  totalDownloads: number;
  lastUpdated: string;
}

const GITHUB_APP_REPO = "Ahmedfahmy8308/Fontivo";
const GITHUB_FONTS_REPO = "Ahmedfahmy8308/Fontivo-Fonts";
const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_APP_REPO}/releases/latest`;
const GITHUB_FONTS_API_URL = `https://api.github.com/repos/${GITHUB_FONTS_REPO}/releases`;

export async function getLatestRelease(): Promise<ReleaseInfo> {
  try {
    const res = await fetch(GITHUB_API_URL, {
      cache: "force-cache",
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Fontivo-Site",
      },
    });

    if (!res.ok) {
      return currentRelease;
    }

    const data: GitHubReleaseResponse = await res.json();

    const mappedAssets: ReleaseAsset[] = currentRelease.assets.map(
      (defaultAsset) => {
        const match = data.assets?.find(
          (a) => a.name.toLowerCase() === defaultAsset.filename.toLowerCase(),
        );
        if (match) {
          return {
            ...defaultAsset,
            sizeBytes: match.size,
            sizeFormatted: `${(match.size / (1024 * 1024)).toFixed(2)} MB`,
            downloadUrl: match.browser_download_url,
          };
        }
        return defaultAsset;
      },
    );

    return {
      ...currentRelease,
      version: data.tag_name.replace(/^v/, ""),
      tag: data.tag_name,
      title: data.name || currentRelease.title,
      releaseDate: data.published_at
        ? new Date(data.published_at).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })
        : currentRelease.releaseDate,
      assets: mappedAssets,
    };
  } catch {
    return currentRelease;
  }
}

export async function getFontRepoStats(): Promise<FontRepoStats> {
  const fallbackStats: FontRepoStats = {
    repoName: GITHUB_FONTS_REPO,
    totalPacks: fontPackPackages.length,
    totalFonts: 10939,
    totalFamilies: 4430,
    packages: fontPackPackages,
    totalDownloads: 0,
    lastUpdated: "November 2026",
  };

  try {
    const res = await fetch(GITHUB_FONTS_API_URL, {
      cache: "force-cache",
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Fontivo-Site",
      },
    });

    if (!res.ok) {
      return fallbackStats;
    }

    const releases: GitHubReleaseResponse[] = await res.json();
    if (!Array.isArray(releases) || releases.length === 0) {
      return fallbackStats;
    }

    let downloadSum = 0;
    releases.forEach((rel) => {
      rel.assets?.forEach((asset) => {
        downloadSum += asset.download_count || 0;
      });
    });

    return {
      ...fallbackStats,
      totalDownloads: downloadSum,
    };
  } catch {
    return fallbackStats;
  }
}

export function getStaticRelease(): ReleaseInfo {
  return currentRelease;
}
