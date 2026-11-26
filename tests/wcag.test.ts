import { describe, it, expect } from "vitest";
import {
  parseHexColor,
  getRelativeLuminance,
  getContrastRatio,
  evaluateWcagContrast,
} from "@/lib/wcag";

describe("WCAG 2.1 Contrast Ratio Calculator", () => {
  it("parses 3-digit and 6-digit hex colors accurately", () => {
    expect(parseHexColor("#fff")).toEqual({ r: 255, g: 255, b: 255 });
    expect(parseHexColor("#000000")).toEqual({ r: 0, g: 0, b: 0 });
    expect(parseHexColor("#0B1020")).toEqual({ r: 11, g: 16, b: 32 });
    expect(parseHexColor("invalid")).toBeNull();
  });

  it("computes relative luminance boundaries correctly", () => {
    expect(getRelativeLuminance("#000000")).toBeCloseTo(0, 5);
    expect(getRelativeLuminance("#FFFFFF")).toBeCloseTo(1, 5);
  });

  it("computes exact 21:1 for black/white and 1:1 for identical colors", () => {
    expect(getContrastRatio("#FFFFFF", "#000000")).toBeCloseTo(21, 2);
    expect(getContrastRatio("#0B1020", "#0B1020")).toBeCloseTo(1, 2);
  });

  it("classifies AAA, AA, AA Large, and Fail levels accurately for Fontivo v2.0 palette", () => {
    const paperOnPlum = evaluateWcagContrast("#FFF9F2", "#130C16");
    expect(paperOnPlum.level).toBe("AAA");
    expect(paperOnPlum.ratio).toBeGreaterThan(15);
    expect(paperOnPlum.normalTextAAA).toBe(true);

    const lavenderOnPlum = evaluateWcagContrast("#B7A1D9", "#130C16");
    expect(lavenderOnPlum.level).toBe("AAA");
    expect(lavenderOnPlum.normalTextAAA).toBe(true);

    const plumOnCoral = evaluateWcagContrast("#130C16", "#F16B50");
    expect(plumOnCoral.normalTextAA).toBe(true);

    const sameColor = evaluateWcagContrast("#130C16", "#130C16");
    expect(sameColor.level).toBe("Fail");
    expect(sameColor.ratio).toBe(1);
    expect(sameColor.uiComponentsAA).toBe(false);
  });
});
