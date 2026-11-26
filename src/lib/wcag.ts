export type WcagLevel = "AAA" | "AA" | "AA Large" | "Fail";

export interface WcagEvaluation {
  ratio: number;
  ratioFormatted: string;
  level: WcagLevel;
  normalTextAAA: boolean;
  normalTextAA: boolean;
  largeTextAAA: boolean;
  largeTextAA: boolean;
  uiComponentsAA: boolean;
}

export function parseHexColor(
  hex: string,
): { r: number; g: number; b: number } | null {
  const cleaned = hex.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(cleaned)) {
    const r = parseInt(cleaned[0] + cleaned[0], 16);
    const g = parseInt(cleaned[1] + cleaned[1], 16);
    const b = parseInt(cleaned[2] + cleaned[2], 16);
    return { r, g, b };
  }
  if (/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    const r = parseInt(cleaned.slice(0, 2), 16);
    const g = parseInt(cleaned.slice(2, 4), 16);
    const b = parseInt(cleaned.slice(4, 6), 16);
    return { r, g, b };
  }
  return null;
}

function linearizeChannel(channel255: number): number {
  const srgb = channel255 / 255;
  return srgb <= 0.04045 ? srgb / 12.92 : Math.pow((srgb + 0.055) / 1.055, 2.4);
}

/**
 * Computes WCAG 2.1 relative luminance in the range [0, 1].
 */
export function getRelativeLuminance(hex: string): number {
  const rgb = parseHexColor(hex);
  if (!rgb) return 0;
  const r = linearizeChannel(rgb.r);
  const g = linearizeChannel(rgb.g);
  const b = linearizeChannel(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Computes the WCAG 2.1 contrast ratio between two hex colors in the range [1, 21].
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = getRelativeLuminance(hex1);
  const l2 = getRelativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Evaluates full WCAG 2.1 contrast compliance for a foreground/background hex pair.
 */
export function evaluateWcagContrast(
  fgHex: string,
  bgHex: string,
): WcagEvaluation {
  const ratio = getContrastRatio(fgHex, bgHex);
  const rounded = Math.round(ratio * 100) / 100;

  let level: WcagLevel = "Fail";
  if (ratio >= 7.0) {
    level = "AAA";
  } else if (ratio >= 4.5) {
    level = "AA";
  } else if (ratio >= 3.0) {
    level = "AA Large";
  }

  return {
    ratio: rounded,
    ratioFormatted: `${ratio.toFixed(2)} : 1`,
    level,
    normalTextAAA: ratio >= 7.0,
    normalTextAA: ratio >= 4.5,
    largeTextAAA: ratio >= 4.5,
    largeTextAA: ratio >= 3.0,
    uiComponentsAA: ratio >= 3.0,
  };
}
