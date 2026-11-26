# Contributing to Fontivo-Site

Thank you for contributing to **Fontivo-Site**, the official bilingual web portal and documentation hub for the **Fontivo** ecosystem!

---

## Ecosystem Overview

| Repository | Scope | Link |
| :--- | :--- | :--- |
| **Fontivo-Site** (this repo) | Next.js 15 static site (`out/`), docs, SEO/GEO, download & pack explorer | [Ahmedfahmy8308/Fontivo-Site](https://github.com/Ahmedfahmy8308/Fontivo-Site) |
| **Fontivo** | Native Rust + React 19 Desktop Application | [Ahmedfahmy8308/Fontivo](https://github.com/Ahmedfahmy8308/Fontivo) |
| **Fontivo-Fonts** | `10,939` curated fonts across `15` verified packs | [Ahmedfahmy8308/Fontivo-Fonts](https://github.com/Ahmedfahmy8308/Fontivo-Fonts) |

---

## Development Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run full verification pipeline
npm run format:check
npm run lint
npm test
npm run build
```

---

## Core Standards & Architectural Rules

1. **Single Source of Truth (`src/config/version.ts`):**
   - Never hardcode release versions, Windows Setup installer filenames, byte sizes, SHA-256 checksums, or pack counts inside UI components or pages. Always import them from `src/config/version.ts` and keep `public/api/manifest.json` + `public/llms.txt` in sync.
2. **Bilingual Parity (`/en` & `/ar` RTL):**
   - All user-facing strings must exist in both `src/locales/en.ts` and `src/locales/ar.ts`.
   - Root `/` must render English directly without redirect flashes; Arabic users navigate via `/ar`.
3. **Platform Distribution Rules:**
   - Windows download provides only the Setup Installer (`Fontivo-v1.0-Setup.exe`).
   - macOS and Linux tabs provide native CLI `install.sh` workflows.
4. **Design System Consistency:**
   - Follow the unified **Plum / Coral / Lavender** palette (`#130C16`, `#1D1322`, `#291C2E`, `#F16B50`, `#B7A1D9`, `#FFF9F2`) defined in `src/app/globals.css` and `tailwind.config.ts`.
5. **Visual Diagrams (`public/diagrams/`):**
   - Whenever SVGs in `Fontivo-App/assets/diagrams/` are updated, sync the updated SVGs into `public/diagrams/`.

---

## Pull Request Checklist

- [ ] `npm run format:check` passes with zero formatting diffs.
- [ ] `npm run lint` passes with zero errors.
- [ ] `npm test` passes all Vitest specs cleanly.
- [ ] `npm run build` exports all static routes under `out/` without errors.
- [ ] New UI text is translated cleanly for both `/en` and `/ar` (RTL).
