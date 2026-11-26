import { describe, it, expect } from "vitest";

// Fontivo v2.0 Brand Palette Tokens
export const SWISS_DESIGN_TOKENS = {
  navy: "#130C16",
  darker: "#0D0810",
  plum: "#291C2E",
  surface: "#1B1220",
  surface200: "#231829",
  purple: "#F16B50", // Coral primary accent
  purpleLight: "#F68C76",
  cyan: "#B7A1D9", // Lavender secondary accent
  cyanLight: "#D0C0E8",
  pink: "#F7B544", // Amber warm highlight
  pinkLight: "#F9C973",
  lime: "#C7D65A",
  paper: "#F5EBDD",
  textPrimary: "#FFF9F2",
  textSecondary: "#D8CEDF",
  textMuted: "#9A8FA6",
  slate: "#5A5366",
};

/**
 * Calculates WCAG 2.1 relative luminance for an sRGB hex code.
 * Formula defined in W3C WCAG 2.1 guidelines.
 */
export function getRelativeLuminance(hex: string): number {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const toLinear = (c: number) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  const rLinear = toLinear(r);
  const gLinear = toLinear(g);
  const bLinear = toLinear(b);

  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

/**
 * Calculates WCAG 2.1 contrast ratio between two hex colors.
 * Returns ratio formatted as a float (e.g. 15.4 for 15.4:1).
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = getRelativeLuminance(hex1);
  const l2 = getRelativeLuminance(hex2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

describe("Fontivo v2.0 Design Tokens & WCAG Contrast Specifications", () => {
  it("defines foundational Plum Ink, Coral, Lavender, Amber, and Paper White tokens", () => {
    expect(SWISS_DESIGN_TOKENS.navy).toBe("#130C16");
    expect(SWISS_DESIGN_TOKENS.plum).toBe("#291C2E");
    expect(SWISS_DESIGN_TOKENS.purple).toBe("#F16B50");
    expect(SWISS_DESIGN_TOKENS.cyan).toBe("#B7A1D9");
    expect(SWISS_DESIGN_TOKENS.pink).toBe("#F7B544");
    expect(SWISS_DESIGN_TOKENS.lime).toBe("#C7D65A");
    expect(SWISS_DESIGN_TOKENS.paper).toBe("#F5EBDD");
    expect(SWISS_DESIGN_TOKENS.textPrimary).toBe("#FFF9F2");
  });

  it("calculates relative luminance accurately for primary tokens", () => {
    expect(getRelativeLuminance("#000000")).toBeCloseTo(0, 3);
    expect(getRelativeLuminance("#FFFFFF")).toBeCloseTo(1, 3);

    // Deep Plum canvas should have very low luminance (< 0.02)
    const navyLum = getRelativeLuminance(SWISS_DESIGN_TOKENS.navy);
    expect(navyLum).toBeLessThan(0.02);

    // Paper White text should have very high luminance (> 0.9)
    const textLum = getRelativeLuminance(SWISS_DESIGN_TOKENS.textPrimary);
    expect(textLum).toBeGreaterThan(0.9);
  });

  it("verifies Paper White text on Deep Plum background exceeds WCAG AAA (>= 7:1)", () => {
    const ratio = getContrastRatio(
      SWISS_DESIGN_TOKENS.textPrimary,
      SWISS_DESIGN_TOKENS.navy,
    );
    expect(ratio).toBeGreaterThanOrEqual(7.0);
    expect(ratio).toBeGreaterThan(15.0);
  });

  it("verifies Lavender on Deep Plum background exceeds WCAG AAA (>= 7:1)", () => {
    const ratio = getContrastRatio(
      SWISS_DESIGN_TOKENS.cyan,
      SWISS_DESIGN_TOKENS.navy,
    );
    expect(ratio).toBeGreaterThanOrEqual(7.0);
  });

  it("verifies Deep Plum text on Coral CTA meets WCAG AA (>= 4.5:1)", () => {
    const ratio = getContrastRatio(
      SWISS_DESIGN_TOKENS.navy,
      SWISS_DESIGN_TOKENS.purple,
    );
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it("verifies Light Lavender (#D0C0E8) on surface (#1B1220) exceeds WCAG AAA (>= 7:1)", () => {
    const ratio = getContrastRatio(
      SWISS_DESIGN_TOKENS.cyanLight,
      SWISS_DESIGN_TOKENS.surface,
    );
    expect(ratio).toBeGreaterThanOrEqual(7.0);
  });
});
