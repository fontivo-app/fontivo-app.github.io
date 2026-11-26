import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(
  /\/+$/,
  "",
);

export function assetPath(path: string): string {
  if (!path) return path;
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:")
  ) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (BASE_PATH && normalized.startsWith(`${BASE_PATH}/`)) {
    return normalized;
  }
  return `${BASE_PATH}${normalized}`;
}

export function stripBasePath(pathname: string): string {
  if (!pathname) return "/";
  if (
    BASE_PATH &&
    (pathname === BASE_PATH || pathname.startsWith(`${BASE_PATH}/`))
  ) {
    return pathname.slice(BASE_PATH.length) || "/";
  }
  return pathname;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Safely copies text to the system clipboard with feature detection and error handling.
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  if (
    typeof navigator === "undefined" ||
    !navigator.clipboard ||
    typeof navigator.clipboard.writeText !== "function"
  ) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
