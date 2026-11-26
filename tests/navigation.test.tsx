import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { footerNavigation } from "@/config/navigation";
import { FONTIVO_VERSION_TAG } from "@/config/version";

describe("Navigation & Layout Components", () => {
  it("renders Navbar brand logo, version tag, and all 5 primary navigation links", () => {
    render(<Navbar />);

    expect(screen.getByText("Fontivo")).toBeDefined();
    expect(screen.getByText(FONTIVO_VERSION_TAG)).toBeDefined();

    expect(screen.getByRole("link", { name: /^Home$/i })).toBeDefined();
    expect(screen.getByRole("link", { name: /^Features$/i })).toBeDefined();
    expect(
      screen.getAllByRole("link", { name: /^Download$/i }).length,
    ).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /^Docs$/i })).toBeDefined();
    expect(screen.getByRole("link", { name: /^About$/i })).toBeDefined();
    expect(screen.getByRole("link", { name: /^FAQ$/i })).toBeDefined();

    const ghLink = screen.getByRole("link", { name: /GitHub Repository/i });
    expect(ghLink.getAttribute("href")).toBe(
      "https://github.com/Ahmedfahmy8308/Fontivo",
    );
  });

  it("toggles mobile menu hamburger in Navbar and closes with Escape", () => {
    render(<Navbar />);

    const menuButton = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });
    expect(menuButton.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(menuButton);
    expect(menuButton.getAttribute("aria-expanded")).toBe("true");

    fireEvent.keyDown(window, { key: "Escape" });
    expect(menuButton.getAttribute("aria-expanded")).toBe("false");
  });

  it("renders Footer columns, developers credit, and copyright cleanly", () => {
    render(<Footer />);

    expect(screen.getByText(footerNavigation.product.title)).toBeDefined();
    expect(screen.getByText(footerNavigation.resources.title)).toBeDefined();
    expect(screen.getByText(footerNavigation.community.title)).toBeDefined();

    expect(screen.getByText(/Developed by/i)).toBeDefined();
    const ahmedLink = screen.getByRole("link", { name: /Eng\. Ahmed Fahmy/i });
    const mohamedLink = screen.getByRole("link", {
      name: /Eng\. Mohamed Elashwah/i,
    });
    expect(ahmedLink.getAttribute("href")).toBe(
      "https://ahmed-fahmy.engineer/",
    );
    expect(mohamedLink.getAttribute("href")).toBe(
      "https://mohamed-elashwah.me/",
    );
    expect(
      screen.queryByRole("button", { name: /Switch language|العربية/i }),
    ).toBeNull();
    expect(screen.getByText(/MIT License • SHA-256 Verified/i)).toBeDefined();

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`${currentYear}.*Fontivo`, "i")),
    ).toBeDefined();
  });
});
