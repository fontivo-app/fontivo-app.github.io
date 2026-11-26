"use client";

import * as React from "react";
import { currentRelease, ReleaseInfo } from "@/config/releases";
import { getLatestRelease } from "@/lib/github";

let cachedRelease: ReleaseInfo | null = null;
let inFlightFetch: Promise<ReleaseInfo> | null = null;

/**
 * Fetches the latest published GitHub Release live in the browser (`cache: "no-store"`)
 * and shares the result across components on the page, falling back cleanly to the
 * static SSOT snapshot if offline or rate-limited.
 */
export function useLatestRelease(initialRelease?: ReleaseInfo): ReleaseInfo {
  const [release, setRelease] = React.useState<ReleaseInfo>(
    () => cachedRelease || initialRelease || currentRelease,
  );

  React.useEffect(() => {
    let active = true;
    if (cachedRelease) {
      setRelease(cachedRelease);
      return;
    }

    if (!inFlightFetch) {
      inFlightFetch = getLatestRelease({ noStore: true }).then((fetched) => {
        cachedRelease = fetched;
        return fetched;
      });
    }

    inFlightFetch
      .then((latest) => {
        if (active && latest) {
          setRelease(latest);
        }
      })
      .catch(() => {
        // Retain SSOT fallback when offline or rate-limited
      });

    return () => {
      active = false;
    };
  }, []);

  return release;
}
