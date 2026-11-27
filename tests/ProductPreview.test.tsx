import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductPreview } from "@/components/home/ProductPreview";
import { FONTIVO_VERSION_TAG } from "@/config/version";

describe("ProductPreview Component", () => {
  it("renders the workspace preview frame with Font Library active by default", () => {
    render(<ProductPreview />);

    expect(screen.getByText("Fontivo")).toBeDefined();
    expect(screen.getByText(FONTIVO_VERSION_TAG)).toBeDefined();
    expect(screen.getByText("Sora Bold")).toBeDefined();
    expect(screen.getByText("Tajawal")).toBeDefined();
  });

  it("switches between Font Library, Adobe CC Sync, and Color Studio tabs", () => {
    render(<ProductPreview />);

    fireEvent.click(screen.getByRole("button", { name: /Adobe CC Sync/i }));
    expect(screen.getByText(/Offline Auto-Sync/i)).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: /Color Studio/i }));
    expect(screen.getByText("Plum Ink")).toBeDefined();
    expect(screen.getByText("Coral")).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: /Font Library/i }));
    expect(screen.getByText(/Preview Size/i)).toBeDefined();
  });

  it("adjusts font size slider cleanly between 18px and 44px", () => {
    render(<ProductPreview />);

    const slider = screen.getByRole("slider") as HTMLInputElement;
    expect(slider.min).toBe("18");
    expect(slider.max).toBe("44");

    fireEvent.change(slider, { target: { value: "36" } });
    expect(screen.getByText("36px")).toBeDefined();
  });

  it("toggles font activation state between Active and Inactive", () => {
    render(<ProductPreview />);

    const activeButtons = screen.getAllByRole("button", {
      name: /^Active$/i,
    });
    const toggleBtn = activeButtons[activeButtons.length - 1];
    fireEvent.click(toggleBtn);
    expect(screen.getAllByText(/^Inactive$/i).length).toBeGreaterThan(0);
  });
});
