import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FAQClient } from "@/components/faq/FAQClient";
import { faqItems } from "@/config/faq";
import { LanguageProvider } from "@/context/LanguageContext";

describe("FAQClient Component", () => {
  it("renders header, category filter buttons, and initial expanded question", () => {
    render(
      <LanguageProvider>
        <FAQClient initialItems={faqItems} />
      </LanguageProvider>,
    );

    expect(screen.getByText("Frequently Asked Questions")).toBeDefined();
    expect(screen.getByRole("button", { name: /^All$/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /RAM & App/i })).toBeDefined();
    expect(
      screen.getByText(/What is Fontivo and how is it different\?/i),
    ).toBeDefined();
  });

  it("filters questions by category and search query accurately", () => {
    render(
      <LanguageProvider>
        <FAQClient initialItems={faqItems} />
      </LanguageProvider>,
    );

    fireEvent.click(
      screen.getByRole("button", { name: /11K Fonts & License/i }),
    );
    expect(
      screen.getByText(/What is inside the Fontivo-Fonts v1\.0\.3 library/i),
    ).toBeDefined();
    expect(
      screen.queryByText(/What is Fontivo and how is it different\?/i),
    ).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /^All$/i }));
    const searchInput = screen.getByPlaceholderText(/Search questions/i);
    fireEvent.change(searchInput, { target: { value: "27715" } });
    expect(
      screen.getByText(/How does Adobe CC Auto-Activation work\?/i),
    ).toBeDefined();
  });

  it("toggles accordion items open and closed with aria-expanded", () => {
    render(
      <LanguageProvider>
        <FAQClient initialItems={faqItems} />
      </LanguageProvider>,
    );

    const firstBtn = screen.getByRole("button", {
      name: /What is Fontivo and how is it different\?/i,
    });
    expect(firstBtn.getAttribute("aria-expanded")).toBe("true");

    fireEvent.click(firstBtn);
    expect(firstBtn.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(firstBtn);
    expect(firstBtn.getAttribute("aria-expanded")).toBe("true");
  });
});
