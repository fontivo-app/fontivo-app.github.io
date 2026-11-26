# Fontivo-Site — Agent & Architecture Guide

## 1. Repository Scope & Mission
- **Repository:** [Ahmedfahmy8308/Fontivo-Site](https://github.com/Ahmedfahmy8308/Fontivo-Site) (Live: `https://fontivo.github.io`)
- **Role:** Static-exported Next.js 15 marketing, documentation, SEO/GEO, and download portal for Fontivo Desktop and Fontivo-Fonts.
- **Developers:**
  - **Eng. Ahmed Fahmy** — Technology & Programming ([GitHub](https://github.com/Ahmedfahmy8308) • [Portfolio](https://ahmed-fahmy.engineer/))
  - **Eng. Mohamed Elashwah** — Brand Identity & Fonts ([Portfolio](https://mohamed-elashwah.me/))

## 2. Ecosystem Relationships & Links
| Repo | Purpose | Link |
| :--- | :--- | :--- |
| **Fontivo-Site** (this repo) | Web portal (`/en` default, `/ar` RTL, static `out/`) | `https://github.com/Ahmedfahmy8308/Fontivo-Site` |
| **Fontivo-App** | Desktop app & Windows Setup installer (`Fontivo-v1.0-Setup.exe`) | `https://github.com/Ahmedfahmy8308/Fontivo` |
| **Fontivo-Fonts** | Font packs (`v1.0.3`, `10,939` fonts, `4,430` families, `15` packs) | `https://github.com/Ahmedfahmy8308/Fontivo-Fonts` |

## 3. Single Source of Truth (SSOT) & Cross-Repo Sync
- **Version & Download SSOT:** `src/config/version.ts` — NEVER hardcode release versions, pack counts, or installer hashes across pages/components. Always import from `src/config/version.ts`.
- **Machine-Readable Endpoints:** Keep `public/api/manifest.json` and `public/llms.txt` synced with `src/config/version.ts`.
- **When `Fontivo-App` builds a new installer:**
  - Sync `FONTIVO_INSTALLER_SIZE_BYTES`, `FONTIVO_INSTALLER_SIZE_FORMATTED`, and `FONTIVO_INSTALLER_SHA256` in `src/config/version.ts` and `public/api/manifest.json`.
- **When `Fontivo-App/assets/diagrams/*.svg` change:**
  - Sync updated SVGs to `public/diagrams/`.

## 4. What Can & Cannot Be Modified (Scope Guardrails)
- **Allowed:**
  - Components (`src/components/`), localized routes (`src/app/[locale]/`), locales (`src/locales/en.ts`, `src/locales/ar.ts`), SEO (`src/lib/seo.ts`), and tests (`tests/`).
- **Forbidden / Non-Negotiable Rules:**
  - **NO Portable ZIP on the website:** Windows download MUST offer **only** the Setup Installer (`Fontivo-v1.0-Setup.exe`). macOS & Linux offer the native `install.sh` flow.
  - **NO language-picker splash or redirect flash on `/`:** Root `/` renders English (`en`) directly by default; users switch to Arabic via `/ar`.
  - **Navbar GitHub Icon** MUST point to the main app repo (`https://github.com/Ahmedfahmy8308/Fontivo`), NOT `Fontivo-Fonts`.
  - **Footer & UI Colors:** Simple, clean **Plum / Coral / Lavender** palette. No random green/rainbow accents.

## 5. UI & Localization Rules
- **Routing:** Slash-based i18n (`/en/...` and `/ar/...`) with `dir="rtl"` for `/ar` and `dir="ltr"` for `/en`.
- **Palette:** Deep Plum (`#130C16`, `#1D1322`, `#291C2E`), Coral (`#F16B50`), Lavender (`#B7A1D9`), Warm Paper (`#FFF9F2`).
- **SEO / GEO:** Every route has `generateMetadata`, OpenGraph, canonical/alternate links, JSON-LD, `sitemap.ts`, `robots.ts`, `public/llms.txt`, and `public/api/manifest.json`.

## 6. Verification Gates (Run Before Finishing)
```powershell
Push-Location Fontivo-Site
npm run format:check; npm run lint; npm test; npm run build
Pop-Location
```
