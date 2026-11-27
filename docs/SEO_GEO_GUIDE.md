# Fontivo SEO & GEO Setup Guide

This guide explains how to connect **`https://fontivo-app.github.io`** to **Google Search Console**, **Bing Webmaster Tools**, **IndexNow**, and AI/LLM discovery engines.

---

## 1. Google Search Console

1. Open [Google Search Console](https://search.google.com/search-console/) and click **Add Property** -> **URL prefix** -> enter:
   ```text
   https://fontivo-app.github.io
   ```
2. Choose **HTML tag** verification and copy the `content="..."` token.
3. Add a repository secret (or GitHub Actions variable) named `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in `fontivo-app/fontivo-app.github.io` (and `Ahmedfahmy8308/Fontivo-Site`), then expose it in `.github/workflows/ci-deploy.yml` under the `Build static export` step:
   ```yaml
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: ${{ vars.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }}
   ```
   `src/app/layout.tsx` automatically renders `<meta name="google-site-verification" content="..." />` whenever `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` is set.
4. Once verified, open **Sitemaps** in Google Search Console and submit:
   ```text
   https://fontivo-app.github.io/sitemap.xml
   ```

---

## 2. Bing Webmaster Tools & IndexNow

1. Open [Bing Webmaster Tools](https://www.bing.com/webmasters) and add `https://fontivo-app.github.io` (you can also import directly from Google Search Console).
2. For meta-tag verification, set `NEXT_PUBLIC_BING_VERIFICATION` in GitHub Actions variables and pass it to the build step. `src/app/layout.tsx` automatically renders `<meta name="msvalidate.01" content="..." />`.
3. Submit `https://fontivo-app.github.io/sitemap.xml`.
4. **Instant Indexing via IndexNow:**
   The verification key file is already published at:
   ```text
   https://fontivo-app.github.io/fontivo-indexnow-key.txt
   ```
   After any major release, ping IndexNow (Bing, Yandex, Seznam, Naver) using PowerShell or `curl`:
   ```bash
   curl -X POST "https://api.indexnow.org/indexnow" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
       "host": "fontivo-app.github.io",
       "key": "f097170a83084b2e9c1d5f6a7e8b9c0d",
       "keyLocation": "https://fontivo-app.github.io/fontivo-indexnow-key.txt",
       "urlList": [
         "https://fontivo-app.github.io/en",
         "https://fontivo-app.github.io/ar",
         "https://fontivo-app.github.io/en/download",
         "https://fontivo-app.github.io/ar/download",
         "https://fontivo-app.github.io/en/features",
         "https://fontivo-app.github.io/en/docs",
         "https://fontivo-app.github.io/en/faq"
       ]
     }'
   ```

---

## 3. GEO (Generative Engine Optimization) & Structured Data

Fontivo publishes dedicated machine-readable endpoints for AI search engines (ChatGPT Search, Perplexity, Claude, Gemini):
- **`/llms.txt`** — Compact summary & canonical links (`https://fontivo-app.github.io/llms.txt`)
- **`/llms-full.txt`** — Complete citation-ready technical dossier with competitive comparison table, Win32 `AddFontResourceExW` architecture, 15-pack SHA-256 inventory, and bilingual FAQ (`https://fontivo-app.github.io/llms-full.txt`)
- **`/api/manifest.json`** — Live SSOT JSON feed (`https://fontivo-app.github.io/api/manifest.json`)
- **JSON-LD Schemas:**
  - `SoftwareApplication` on root layout (`softwareVersion`, `downloadUrl`, `fileSize`, `operatingSystem`, `offers`, `author`)
  - `FAQPage` (localized `en` / `ar`) on `/en/faq` and `/ar/faq`
  - `HowTo` (localized `en` / `ar`) on `/en/download` and `/ar/download`
