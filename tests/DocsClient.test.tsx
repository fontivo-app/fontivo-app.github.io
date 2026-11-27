import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DocsClient } from "@/components/docs/DocsClient";
import { LanguageProvider, useTranslation } from "@/context/LanguageContext";
import { currentRelease } from "@/config/releases";

describe("DocsClient Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all 4 Quick Start steps", () => {
    render(
      <LanguageProvider>
        <DocsClient />
      </LanguageProvider>,
    );

    expect(screen.getByText("1. Download & Install")).toBeDefined();
    expect(screen.getByText("2. Verify SHA-256 (Optional)")).toBeDefined();
    expect(screen.getByText("3. Get the 11K Font Packs")).toBeDefined();
    expect(screen.getByText("4. Activate & Design")).toBeDefined();
  });

  it("displays dynamic SHA-256 verification command for the Windows installer", async () => {
    render(
      <LanguageProvider>
        <DocsClient />
      </LanguageProvider>,
    );

    const installer = currentRelease.assets[0];
    const expectedCmd = `Get-FileHash .\\${installer.filename} -Algorithm SHA256`;

    expect(screen.getByText(expectedCmd)).toBeDefined();
    expect(screen.getByText(installer.sha256)).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: /^copy$/i }));
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expectedCmd);
    });
  });

  it("lists workspace paths, Adobe CC auto-sync, and Fontivo-Fonts v1.0.3 reference", () => {
    render(
      <LanguageProvider>
        <DocsClient />
      </LanguageProvider>,
    );

    expect(
      screen.getByText(/keeps Windows Fonts folder clean and fast/i),
    ).toBeDefined();
    expect(
      screen.getByText(/Automatic local font syncing for \.PSD/i),
    ).toBeDefined();
    expect(screen.getByText(/Fontivo-Fonts v1\.0\.3/i)).toBeDefined();
  });

  it("renders localized Arabic quick start steps", () => {
    function ArabicDocs() {
      const { setLocale } = useTranslation();
      React.useEffect(() => {
        setLocale("ar");
      }, [setLocale]);
      return <DocsClient />;
    }

    render(
      <LanguageProvider>
        <ArabicDocs />
      </LanguageProvider>,
    );

    expect(screen.getByText("1. التحميل والتثبيت")).toBeDefined();
    expect(screen.getByText("4. التفعيل والتصميم")).toBeDefined();
  });
});
