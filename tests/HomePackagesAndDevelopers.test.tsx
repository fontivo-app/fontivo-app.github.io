import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FontPackageSection } from "@/components/home/FontPackageSection";
import { DevelopersSection } from "@/components/common/DevelopersSection";
import { LanguageProvider } from "@/context/LanguageContext";

describe("FontPackageSection & DevelopersSection Components", () => {
  it("renders exact Fontivo-Fonts v1.0.3 metrics and script counts", () => {
    render(
      <LanguageProvider>
        <FontPackageSection />
      </LanguageProvider>,
    );

    expect(screen.getByText("10,939")).toBeDefined();
    expect(screen.getByText("4,430")).toBeDefined();
    expect(screen.getByText("15")).toBeDefined();
    expect(screen.getByText("864.01 MB")).toBeDefined();

    expect(screen.getByText(/7,146/)).toBeDefined();
    expect(screen.getByText(/1,565/)).toBeDefined();
    expect(screen.getByText(/1,257/)).toBeDefined();
    expect(screen.getByText(/971/)).toBeDefined();

    const downloadPacksLink = screen.getByRole("link", {
      name: /Download 15 Packs/i,
    });
    expect(downloadPacksLink.getAttribute("href")).toBe(
      "/en/download#font-packs",
    );
  });

  it("renders developer profiles with English roles and project repository links", () => {
    render(
      <LanguageProvider>
        <DevelopersSection />
      </LanguageProvider>,
    );

    expect(screen.getByText("Eng. Ahmed Fahmy")).toBeDefined();
    expect(screen.getAllByText("Software Engineer").length).toBeGreaterThan(0);

    expect(screen.getByText("Eng. Mohamed Elashwah")).toBeDefined();
    expect(screen.getAllByText("Graphic Designer").length).toBeGreaterThan(0);

    const appRepoLink = screen.getByRole("link", { name: /Fontivo App Repo/i });
    expect(appRepoLink.getAttribute("href")).toBe(
      "https://github.com/Ahmedfahmy8308/Fontivo",
    );

    const fontsRepoLink = screen.getByRole("link", {
      name: /Fontivo Fonts Repo/i,
    });
    expect(fontsRepoLink.getAttribute("href")).toBe(
      "https://github.com/Ahmedfahmy8308/Fontivo-Fonts",
    );

    const siteLink = screen.getByRole("link", {
      name: /fontivo-app\.github\.io/i,
    });
    expect(siteLink.getAttribute("href")).toBe("https://fontivo-app.github.io");
  });
});
