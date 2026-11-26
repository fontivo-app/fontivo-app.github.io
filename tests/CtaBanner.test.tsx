import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CtaBanner } from "@/components/home/CtaBanner";
import { currentRelease } from "@/config/releases";
import { UNIX_INSTALL_CMD } from "@/config/version";

describe("CtaBanner Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Windows Setup Installer and macOS/Linux install.sh cards", () => {
    render(<CtaBanner />);

    const installer = currentRelease.assets[0];
    expect(screen.getByText("Windows Setup Installer")).toBeDefined();
    expect(screen.getByText("macOS & Linux Installer")).toBeDefined();

    const installerLink = screen.getByRole("link", {
      name: new RegExp(installer.filename, "i"),
    });
    expect(installerLink.getAttribute("href")).toBe(installer.downloadUrl);
  });

  it("copies Windows SHA-256 and Unix install.sh command on click", async () => {
    render(<CtaBanner />);

    const installer = currentRelease.assets[0];
    expect(
      screen.getByText(new RegExp(installer.sha256.slice(0, 12))),
    ).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: /SHA-256:/i }));
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        installer.sha256,
      );
    });

    fireEvent.click(screen.getByRole("button", { name: /^Copy$/i }));
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        UNIX_INSTALL_CMD,
      );
    });
  });

  it("renders a secondary link to all downloads & 15 font packs", () => {
    render(<CtaBanner />);
    const link = screen.getByRole("link", {
      name: /All Downloads & 15 Font Packs/i,
    });
    expect(link.getAttribute("href")).toBe("/en/download");
  });
});
