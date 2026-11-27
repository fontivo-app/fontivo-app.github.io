import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FeaturesClient } from "@/components/features/FeaturesClient";
import { coreFeatures } from "@/config/features";
import { LanguageProvider, useTranslation } from "@/context/LanguageContext";

describe("FeaturesClient Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all 6 core engineering pillars", () => {
    render(
      <LanguageProvider>
        <FeaturesClient features={coreFeatures} />
      </LanguageProvider>,
    );

    expect(coreFeatures.length).toBe(6);
    for (const feature of coreFeatures) {
      expect(screen.getByText(feature.title)).toBeDefined();
      expect(screen.getAllByText(feature.shortTitle).length).toBeGreaterThan(0);
    }
  });

  it("filters features cleanly by category", () => {
    render(
      <LanguageProvider>
        <FeaturesClient features={coreFeatures} />
      </LanguageProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: /^Adobe CC$/i }));
    expect(screen.getByText("Automatic Adobe CC Font Sync")).toBeDefined();
    expect(screen.queryByText("Instant Font Activation")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /^Color Studio$/i }));
    expect(
      screen.getByText("Color Studio, Eyedropper & .ASE Export"),
    ).toBeDefined();
    expect(screen.queryByText("Automatic Adobe CC Font Sync")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /^All$/i }));
    expect(screen.getByText("Instant Font Activation")).toBeDefined();
  });

  it("updates live specimen script, font size, and WCAG contrast ratio", () => {
    render(
      <LanguageProvider>
        <FeaturesClient features={coreFeatures} />
      </LanguageProvider>,
    );

    const slider = screen.getByRole("slider") as HTMLInputElement;
    fireEvent.change(slider, { target: { value: "36" } });
    expect(screen.getByText("36px")).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: "العربية" }));
    expect(
      screen.getByText(/فونتيفو — خطوطك وهويتك في مساحة عمل واحدة/i),
    ).toBeDefined();

    fireEvent.click(
      screen.getByRole("button", { name: "Surface Paper White" }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Text Deep Plum" }));
    expect(screen.getByText(/#130C16 on #FFF9F2/i)).toBeDefined();
    expect(screen.getByText(/WCAG AAA/i)).toBeDefined();
  });

  it("renders localized Arabic pillars when language switches to Arabic", () => {
    function ArabicFeatures() {
      const { setLocale } = useTranslation();
      React.useEffect(() => {
        setLocale("ar");
      }, [setLocale]);
      return <FeaturesClient features={coreFeatures} />;
    }

    render(
      <LanguageProvider>
        <ArabicFeatures />
      </LanguageProvider>,
    );

    expect(screen.getByText("تفعيل الخطوط الفوري للجلسة")).toBeDefined();
  });
});
