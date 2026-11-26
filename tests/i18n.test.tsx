import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { en, ar } from "@/locales";
import {
  LanguageProvider,
  useTranslation,
  resolveTranslation,
} from "@/context/LanguageContext";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { Hero } from "@/components/home/Hero";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { FontPackageSection } from "@/components/home/FontPackageSection";
import { DevelopersSection } from "@/components/common/DevelopersSection";
import { FAQClient } from "@/components/faq/FAQClient";
import { faqItems } from "@/config/faq";

function getDeepKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  return Object.keys(obj).reduce((res: string[], el: string) => {
    const val = obj[el];
    if (Array.isArray(val)) {
      return [...res, prefix + el];
    } else if (typeof val === "object" && val !== null) {
      return [
        ...res,
        ...getDeepKeys(val as Record<string, unknown>, prefix + el + "."),
      ];
    }
    return [...res, prefix + el];
  }, []);
}

describe("i18n Translation Dictionaries & Localization System", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
  });

  it("maintains 100% key parity between English and Arabic dictionaries", () => {
    const enKeys = getDeepKeys(en).sort();
    const arKeys = getDeepKeys(ar).sort();

    expect(enKeys.length).toBeGreaterThan(80);
    expect(arKeys).toEqual(enKeys);
  });

  it("ensures no empty string values exist in translation dictionaries", () => {
    const checkNoEmptyValues = (obj: Record<string, unknown>, path = "") => {
      for (const [key, value] of Object.entries(obj)) {
        const fullPath = path ? `${path}.${key}` : key;
        if (typeof value === "string") {
          expect(
            value.trim().length,
            `Empty string at ${fullPath}`,
          ).toBeGreaterThan(0);
        } else if (typeof value === "object" && value !== null) {
          checkNoEmptyValues(value as Record<string, unknown>, fullPath);
        }
      }
    };

    checkNoEmptyValues(en, "en");
    checkNoEmptyValues(ar, "ar");
  });

  it("resolves nested keys and dynamic parameters correctly via resolveTranslation", () => {
    expect(resolveTranslation(en, "common.downloadNow")).toBe("Download Now");
    expect(resolveTranslation(ar, "common.downloadNow")).toBe("تحميل الآن");

    expect(
      resolveTranslation(en, "footer.copyright", { year: 2026 }),
    ).toContain("2026");
    expect(
      resolveTranslation(ar, "footer.copyright", { year: 2026 }),
    ).toContain("2026");

    expect(resolveTranslation(en, "non.existent.key", "Default Fallback")).toBe(
      "Default Fallback",
    );
  });

  it("provides LanguageProvider context and allows toggling EN/AR", () => {
    function TestComponent() {
      const { locale, setLocale, dir, isRTL, t } = useTranslation();
      return (
        <div>
          <span data-testid="locale">{locale}</span>
          <span data-testid="dir">{dir}</span>
          <span data-testid="isRTL">{isRTL ? "true" : "false"}</span>
          <span data-testid="translated">{t("nav.features")}</span>
          <button onClick={() => setLocale("ar")} data-testid="switch-ar">
            To Arabic
          </button>
          <button onClick={() => setLocale("en")} data-testid="switch-en">
            To English
          </button>
        </div>
      );
    }

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    );

    expect(screen.getByTestId("locale").textContent).toBe("en");
    expect(screen.getByTestId("dir").textContent).toBe("ltr");
    expect(screen.getByTestId("translated").textContent).toBe("Features");

    fireEvent.click(screen.getByTestId("switch-ar"));

    expect(screen.getByTestId("locale").textContent).toBe("ar");
    expect(screen.getByTestId("dir").textContent).toBe("rtl");
    expect(screen.getByTestId("isRTL").textContent).toBe("true");
    expect(screen.getByTestId("translated").textContent).toBe("المزايا");
    expect(document.documentElement.lang).toBe("ar");
    expect(document.documentElement.dir).toBe("rtl");
  });

  it("renders LanguageSwitcher and toggles interactively", () => {
    function Wrapper() {
      const { locale } = useTranslation();
      return (
        <div>
          <LanguageSwitcher />
          <span data-testid="active-lang">{locale}</span>
        </div>
      );
    }

    render(
      <LanguageProvider>
        <Wrapper />
      </LanguageProvider>,
    );

    expect(screen.getByTestId("active-lang").textContent).toBe("en");
    fireEvent.click(
      screen.getByRole("button", { name: /switch language to arabic/i }),
    );
    expect(screen.getByTestId("active-lang").textContent).toBe("ar");
    fireEvent.click(
      screen.getByRole("button", { name: /switch language to english/i }),
    );
    expect(screen.getByTestId("active-lang").textContent).toBe("en");
  });

  it("renders Home sections and FAQClient cleanly localized in Arabic RTL", () => {
    function ArabicHome() {
      const { setLocale } = useTranslation();
      React.useEffect(() => {
        setLocale("ar");
      }, [setLocale]);

      return (
        <>
          <Hero />
          <BenefitsSection />
          <FontPackageSection />
          <DevelopersSection />
          <FAQClient initialItems={faqItems} />
        </>
      );
    }

    render(
      <LanguageProvider>
        <ArabicHome />
      </LanguageProvider>,
    );

    expect(screen.getByText(/خطوطك وهويتك\./i)).toBeDefined();
    expect(screen.getByText(/بسرعة وبساطة\./i)).toBeDefined();
    expect(screen.getByText("تفعيل بالذاكرة RAM")).toBeDefined();
    expect(screen.getAllByText("10,939").length).toBeGreaterThan(0);
    expect(screen.getByText("م. أحمد فهمي")).toBeDefined();
    expect(screen.getByText("م. محمد الأشوح")).toBeDefined();
    expect(screen.getByRole("button", { name: /^الكل$/ })).toBeDefined();
  });

  it("builds slash-localized routes cleanly via localePath", async () => {
    const { localePath } = await import("@/context/LanguageContext");
    expect(localePath("en", "/")).toBe("/en");
    expect(localePath("ar", "/")).toBe("/ar");
    expect(localePath("ar", "/download")).toBe("/ar/download");
    expect(localePath("en", "/download#font-packs")).toBe(
      "/en/download#font-packs",
    );
    expect(localePath("ar", "https://github.com/Ahmedfahmy8308/Fontivo")).toBe(
      "https://github.com/Ahmedfahmy8308/Fontivo",
    );
  });

  it("respects ?lang=ar URL parameter on initial mount", () => {
    window.history.replaceState({}, "", "/?lang=ar");

    function Probe() {
      const { locale, dir } = useTranslation();
      return (
        <div>
          <span data-testid="url-locale">{locale}</span>
          <span data-testid="url-dir">{dir}</span>
        </div>
      );
    }

    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    );

    expect(screen.getByTestId("url-locale").textContent).toBe("ar");
    expect(screen.getByTestId("url-dir").textContent).toBe("rtl");

    window.history.replaceState({}, "", "/");
  });
});
