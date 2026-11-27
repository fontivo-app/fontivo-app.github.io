import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutClient } from "@/components/about/AboutClient";
import { LanguageProvider, useTranslation } from "@/context/LanguageContext";

describe("AboutClient Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders core story and 4 core commitments", () => {
    render(
      <LanguageProvider>
        <AboutClient />
      </LanguageProvider>,
    );

    expect(
      screen.getByText("Keep Windows Clean While Managing Thousands of Fonts"),
    ).toBeDefined();
    expect(screen.getByText("Clean System Fonts")).toBeDefined();
    expect(screen.getByText("Zero Telemetry")).toBeDefined();
    expect(screen.getByText("Lightweight Speed")).toBeDefined();
    expect(screen.getByText("Open Source Forever")).toBeDefined();
  });

  it("renders DevelopersSection with English roles and links", () => {
    render(
      <LanguageProvider>
        <AboutClient />
      </LanguageProvider>,
    );

    expect(screen.getByText("Eng. Ahmed Fahmy")).toBeDefined();
    expect(screen.getAllByText("Software Engineer").length).toBeGreaterThan(0);

    expect(screen.getByText("Eng. Mohamed Elashwah")).toBeDefined();
    expect(screen.getAllByText("Graphic Designer").length).toBeGreaterThan(0);
  });

  it("renders fully localized Arabic copy in RTL mode", () => {
    function ArabicAbout() {
      const { setLocale } = useTranslation();
      React.useEffect(() => {
        setLocale("ar");
      }, [setLocale]);
      return <AboutClient />;
    }

    render(
      <LanguageProvider>
        <ArabicAbout />
      </LanguageProvider>,
    );

    expect(
      screen.getByText("حافظ على نظافة نظامك مع آلاف الخطوط"),
    ).toBeDefined();
    expect(screen.getByText("م. أحمد فهمي")).toBeDefined();
    expect(screen.getByText("م. محمد الأشوح")).toBeDefined();
  });
});
