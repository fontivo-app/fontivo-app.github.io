import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { LanguageProvider, useTranslation } from "@/context/LanguageContext";

describe("BenefitsSection Component", () => {
  it("renders all 4 core desktop highlight cards in English", () => {
    render(<BenefitsSection />);

    expect(screen.getByText("In-Memory RAM Activation")).toBeDefined();
    expect(screen.getByText("10,939+ Unified Library")).toBeDefined();
    expect(screen.getByText("Adobe CC Auto-Bridge")).toBeDefined();
    expect(screen.getByText("Color & .ASE Studio")).toBeDefined();
  });

  it("renders localized Arabic highlights cleanly", () => {
    function ArabicBenefits() {
      const { setLocale } = useTranslation();
      React.useEffect(() => {
        setLocale("ar");
      }, [setLocale]);
      return <BenefitsSection />;
    }

    render(
      <LanguageProvider>
        <ArabicBenefits />
      </LanguageProvider>,
    );

    expect(screen.getByText("تفعيل بالذاكرة RAM")).toBeDefined();
    expect(screen.getByText("مكتبة +10,939 خط")).toBeDefined();
    expect(screen.getByText("ربط تلقائي مع Adobe CC")).toBeDefined();
    expect(screen.getByText("استوديو الألوان و.ASE")).toBeDefined();
  });
});
