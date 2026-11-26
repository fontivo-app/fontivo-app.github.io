import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductPreview } from "@/components/home/ProductPreview";

describe("ProductPreview Component", () => {
  it("renders the workspace preview frame with Font Library active by default", () => {
    render(<ProductPreview />);

    expect(screen.getByText("Fontivo")).toBeDefined();
    expect(screen.getByText("v1.0.0")).toBeDefined();
    expect(screen.getByText("Sora Bold")).toBeDefined();
    expect(screen.getByText("Tajawal")).toBeDefined();
  });

  it("switches between Font Library, Adobe CC Bridge, and Color Studio tabs", () => {
    render(<ProductPreview />);

    fireEvent.click(screen.getByRole("button", { name: /Adobe CC Bridge/i }));
    expect(screen.getByText(/127\.0\.0\.1:27715/i)).toBeDefined();

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

  it("toggles font RAM activation state between Active in RAM and Not mounted", () => {
    render(<ProductPreview />);

    const ramButtons = screen.getAllByRole("button", {
      name: /Active in RAM/i,
    });
    const toggleBtn = ramButtons[ramButtons.length - 1];
    fireEvent.click(toggleBtn);
    expect(screen.getAllByText(/Not mounted/i).length).toBeGreaterThan(0);
  });
});
