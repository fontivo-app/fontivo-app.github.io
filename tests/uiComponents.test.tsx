import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

describe("UI Primitive Design Components", () => {
  it("renders Badge variants (purple, cyan, pink, success, outline) and sizes", () => {
    const { rerender } = render(<Badge variant="purple">Purple Badge</Badge>);
    expect(screen.getByText("Purple Badge")).toBeDefined();

    rerender(
      <Badge variant="cyan" size="sm">
        Cyan Small
      </Badge>,
    );
    expect(screen.getByText("Cyan Small")).toBeDefined();

    rerender(<Badge variant="success">Success Status</Badge>);
    expect(screen.getByText("Success Status")).toBeDefined();
  });

  it("renders Button as a button or anchor link with variants and click events", () => {
    const handleClick = vi.fn();
    const { rerender } = render(
      <Button variant="primary" onClick={handleClick}>
        Click Me
      </Button>,
    );

    const btn = screen.getByRole("button", { name: "Click Me" });
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);

    // Rerender as external link
    rerender(
      <Button href="https://example.com" external variant="secondary">
        External Link
      </Button>,
    );
    const link = screen.getByRole("link", { name: "External Link" });
    expect(link.getAttribute("href")).toBe("https://example.com");
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toContain("noopener");
  });

  it("renders Card container with Header, Title, Description, and Content", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Architecture Card</CardTitle>
          <CardDescription>Card subtitle description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card body content</p>
        </CardContent>
      </Card>,
    );

    expect(screen.getByText("Architecture Card")).toBeDefined();
    expect(screen.getByText("Card subtitle description")).toBeDefined();
    expect(screen.getByText("Card body content")).toBeDefined();
  });

  it("renders Container with responsive max-width wrappers", () => {
    const { container } = render(
      <Container size="default">
        <div>Container Inner</div>
      </Container>,
    );

    expect(screen.getByText("Container Inner")).toBeDefined();
    expect(container.firstChild).toBeDefined();
  });

  it("renders SectionHeader with badge, highlighted text, and description", () => {
    render(
      <SectionHeader
        badge="Engine Specifications"
        badgeVariant="cyan"
        title="Engineered for"
        highlightedText="Extreme Performance"
        description="Sub-2ms font virtualization with zero disk residue."
        align="center"
      />,
    );

    expect(screen.getByText("Engine Specifications")).toBeDefined();
    expect(screen.getByText(/Engineered for/i)).toBeDefined();
    expect(screen.getByText("Extreme Performance")).toBeDefined();
    expect(
      screen.getByText("Sub-2ms font virtualization with zero disk residue."),
    ).toBeDefined();
  });
});
