# SEO & GEO Setup Guide — `https://fontivo-app.github.io`

This guide explains how to connect **Google Search Console**, **Bing Webmaster Tools**, and AI/GEO discovery pipelines to the official Fontivo website at **`https://fontivo-app.github.io`**.

---

## 1. Built-In SEO & GEO Assets

Every static build (`npm run build`) automatically publishes:

| Endpoint | Purpose |
| :--- | :--- |
| `https://fontivo-app.github.io/sitemap.xml` | Canonical bilingual sitemap (12 routes across `/en/*` and `/ar/*`) |
| `https://fontivo-app.github.io/robots.txt` | Search & AI crawler allow rules (`*`, `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`) |
| `https://fontivo-app.github.io/llms.txt` | Concise LLM/GEO discovery index |
| `https://fontivo-app.github.io/llms-full.txt` | Extended technical documentation, benchmarks, competitor table & quotable FAQs |
| `https://fontivo-app.github.io/api/manifest.json` | Machine-readable JSON feed of versions, SHA-256 digests & font pack metrics |
| JSON-LD Structured Data | `SoftwareApplication` (root), `FAQPage` (`/[locale]/faq`), `HowTo` (`/[locale]/download`) |

---

## 2. Connect Google Search Console

1. Open [Google Search Console](https://search.google.com/search-console/) and click **Add Property**.
2. Choose **URL prefix** and enter:
   ```text
   https://fontivo-app.github.io
   ```
3. Under **Other verification methods**, select **HTML tag** and copy ONLY the `content` token value (not the full `<meta>` tag).
4. In GitHub, open **`fontivo-app/fontivo-app.github.io`** → **Settings** → **Secrets and variables** → **Actions** → **Variables** → **New repository variable**:
   - **Name:** `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
   - **Value:** `<your-google-verification-token>`
5. Re-run the **Fontivo-Site CI & Static Build** workflow (or push a commit to `main`). Next.js injects `<meta name="google-site-verification" content="..." />` via `src/app/layout.tsx`.
6. Return to Google Search Console and click **Verify**.
7. Go to **Sitemaps** and submit:
   ```text
   https://fontivo-app.github.io/sitemap.xml
   ```

---

## 3. Connect Bing Webmaster Tools

1. Open [Bing Webmaster Tools](https://www.bing.com/webmasters/).
2. You can either **Import from Google Search Console** (fastest) or add `https://fontivo-app.github.io` manually.
3. For manual HTML meta tag verification, copy ONLY the `content` token from `<meta name="msvalidate.01" content="..." />`.
4. Add a GitHub Actions Repository Variable in **`fontivo-app/fontivo-app.github.io`**:
   - **Name:** `NEXT_PUBLIC_BING_VERIFICATION`
   - **Value:** `<your-bing-verification-token>`
5. Re-run the Pages deploy workflow and click **Verify** in Bing Webmaster Tools.
6. Submit `https://fontivo-app.github.io/sitemap.xml` under **Sitemaps**.

---

## 4. Local Verification

You can test verification meta tag injection locally before pushing:

```bash
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=test-google-token \
NEXT_PUBLIC_BING_VERIFICATION=test-bing-token \
npm run build
```

Then inspect `out/index.html` for `google-site-verification` and `msvalidate.01`, plus `out/robots.txt`, `out/sitemap.xml`, `out/llms.txt`, and `out/llms-full.txt`.
