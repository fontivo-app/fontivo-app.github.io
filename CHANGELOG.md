# Changelog

All notable changes to **Fontivo-Site** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1] - 2026-11-26

### Updated
- Synchronized Desktop Application SSOT (`src/config/version.ts`, `src/config/releases.ts`, `public/api/manifest.json`, `public/llms.txt`) to **Fontivo v1.1.1**.

## [1.0.0] - 2026-11-26

### Added
- Bilingual static Next.js 15 App Router web portal (`/en` default on `/` and `/ar` RTL) with zero-redirect-flash load behavior.
- Sticky desktop and mobile header with direct `Home`, `Features`, `Download`, `Docs`, `About`, and `FAQ` links, plus `LanguageSwitcher`.
- Interactive studio showcases, live WCAG 2.1 bilingual contrast & specimen playground, and animated SVG architecture & benchmark diagrams in `public/diagrams/`.
- Centralized Release SSOT (`src/config/version.ts`) synchronized with `public/api/manifest.json` and `public/llms.txt` (`Fontivo v1.0.0` Windows Setup Installer + `Fontivo-Fonts v1.0.3` 15-pack catalog).
- Download center featuring full-width Windows Setup Installer card, unified macOS/Linux `install.sh` instructions, SHA-256 copy helpers, and filterable 15-pack library cards.
- Clean Plum / Coral / Lavender footer with direct links to Eng. Ahmed Fahmy and Eng. Mohamed Elashwah portfolios.
- Complete open-source repository scaffolding (`README.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `LICENSE`, `AGENTS.md`, `.github/` templates, and `ci-deploy.yml` GitHub Pages workflow).
