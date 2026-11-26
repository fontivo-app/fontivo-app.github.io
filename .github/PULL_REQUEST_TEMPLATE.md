## Description

<!-- Concise summary of the motivation and changes included in this PR. -->

---

## Type of Change

- [ ] Bug Fix (layout, i18n, SEO, or link fix)
- [ ] Feature / New Section
- [ ] Content, Docs, or Translation Update (`/en` & `/ar`)
- [ ] Styling / Color System (Plum / Coral / Lavender consistency)
- [ ] Tests, CI/CD, or Build Configuration

---

## Verification Checklist

- [ ] Single Source of Truth (`src/config/version.ts`, `public/api/manifest.json`, `public/llms.txt`) remains synchronized.
- [ ] Both English (`/en`) and Arabic RTL (`/ar`) routes work cleanly with zero layout overflow.
- [ ] `npm run format:check` passes cleanly.
- [ ] `npm run lint` passes cleanly.
- [ ] `npm test` (Vitest) passes with all tests green.
- [ ] `npm run build` succeeds and exports static pages to `out/`.

---

## Related Issues

Closes #
