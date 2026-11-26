# Security Policy — Fontivo-Site

**Fontivo-Site** is deployed as a purely static, zero-tracking web application (`next build` static export).

## Privacy & Integrity Guarantees

1. **Zero Tracking Cookies or Analytics**: No invasive third-party analytics trackers or telemetry beacons are embedded.
2. **Cryptographic Download Integrity**: Every desktop installer (`Fontivo-v1.0-Setup.exe`) and `Fontivo-Fonts` pack linked from the website includes a published SHA-256 checksum defined in `src/config/version.ts`, `src/config/releases.ts`, and `public/api/manifest.json`.
3. **Official Release Mirrors Only**: Download links point strictly to verified releases on `github.com/Ahmedfahmy8308/Fontivo` and `github.com/Ahmedfahmy8308/Fontivo-Fonts`.

## Reporting a Vulnerability

If you discover a security or integrity issue in **Fontivo-Site** (such as broken/mismatched checksums, XSS vectors, or unsafe external links), please report it privately:

- **Contact:** Eng. Ahmed Fahmy (`ahmedfahmy8308@gmail.com`)
- **Subject:** `[SECURITY] Fontivo-Site`

We aim to acknowledge reports within 48 hours.
