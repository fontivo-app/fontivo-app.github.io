import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/home/Hero";

describe("Hero Component", () => {
  it("renders the concise Fontivo v1.0.0 headline and key stats", () => {
    render(<Hero />);

    expect(screen.getByText(/Type\. Design\./i)).toBeDefined();
    expect(screen.getByText(/Deliver Faster\./i)).toBeDefined();
    expect(screen.getByText("10,939")).toBeDefined();
    expect(screen.getByText("15 Packs")).toBeDefined();
    expect(screen.getByText("~38 MB")).toBeDefined();
  });

  it("renders primary download CTA and 10,939 fonts exploration CTA", () => {
    render(<Hero />);

    const downloadCta = screen.getByRole("link", { name: /Download Desktop/i });
    expect(downloadCta.getAttribute("href")).toBe("/en/download");

    const exploreCta = screen.getByRole("link", {
      name: /Browse 10,939 Fonts/i,
    });
    expect(exploreCta.getAttribute("href")).toBe("/en/download#font-packs");
  });
});
