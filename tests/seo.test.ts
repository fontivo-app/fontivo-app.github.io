import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { siteConfig } from "@/config/site";
import { faqItems } from "@/config/faq";
import { coreFeatures } from "@/config/features";
import { currentRelease } from "@/config/releases";
import {
  FONTIVO_INSTALLER_DOWNLOAD_URL,
  FONTIVO_INSTALLER_SIZE_FORMATTED,
  UNIX_INSTALL_CMD,
} from "@/config/version";
import {
  buildSoftwareApplicationJsonLd,
  buildFaqPageJsonLd,
  buildDownloadHowToJsonLd,
} from "@/lib/seo";

describe("SEO & Structured Data Specifications", () => {
  it("uses https://fontivo-app.github.io as the canonical root URL and keeps personal GitHub repos", () => {
    expect(siteConfig.url).toBe("https://fontivo-app.github.io");
    expect(siteConfig.links.github).toBe(
      "https://github.com/Ahmedfahmy8308/Fontivo",
    );
    expect(siteConfig.links.fontsGithub).toBe(
      "https://github.com/Ahmedfahmy8308/Fontivo-Fonts",
    );
  });

  it("sitemap() returns all 12 localized routes (/en and /ar) with correct metadata", () => {
    const map = sitemap();

    expect(map.length).toBe(12);

    const urls = map.map((entry) => entry.url);
    expect(urls).toContain(`${siteConfig.url}/en`);
    expect(urls).toContain(`${siteConfig.url}/ar`);
    expect(urls).toContain(`${siteConfig.url}/en/features`);
    expect(urls).toContain(`${siteConfig.url}/ar/features`);
    expect(urls).toContain(`${siteConfig.url}/en/download`);
    expect(urls).toContain(`${siteConfig.url}/ar/download`);
    expect(urls).toContain(`${siteConfig.url}/en/docs`);
    expect(urls).toContain(`${siteConfig.url}/ar/docs`);
    expect(urls).toContain(`${siteConfig.url}/en/about`);
    expect(urls).toContain(`${siteConfig.url}/ar/about`);
    expect(urls).toContain(`${siteConfig.url}/en/faq`);
    expect(urls).toContain(`${siteConfig.url}/ar/faq`);

    // Verify priorities and frequencies
    const homeEntry = map.find((e) => e.url === `${siteConfig.url}/en`);
    expect(homeEntry?.priority).toBe(1.0);
    expect(homeEntry?.changeFrequency).toBe("weekly");

    const downloadEntry = map.find(
      (e) => e.url === `${siteConfig.url}/en/download`,
    );
    expect(downloadEntry?.priority).toBe(0.95);
    expect(downloadEntry?.changeFrequency).toBe("daily");

    const featuresEntry = map.find(
      (e) => e.url === `${siteConfig.url}/en/features`,
    );
    expect(featuresEntry?.priority).toBe(0.9);
    expect(featuresEntry?.changeFrequency).toBe("weekly");

    const faqEntry = map.find((e) => e.url === `${siteConfig.url}/en/faq`);
    expect(faqEntry?.priority).toBe(0.85);
    expect(faqEntry?.changeFrequency).toBe("weekly");

    const aboutEntry = map.find((e) => e.url === `${siteConfig.url}/en/about`);
    expect(aboutEntry?.priority).toBe(0.8);
    expect(aboutEntry?.changeFrequency).toBe("monthly");
  });

  it("robots() exports wildcard & AI crawler allow rules, llms-full.txt, and canonical sitemap", () => {
    const config = robots();
    const rules = Array.isArray(config.rules) ? config.rules : [config.rules];

    const wildcardRule = rules.find((r) => r.userAgent === "*");
    expect(wildcardRule).toBeDefined();
    expect(wildcardRule?.allow).toContain("/");
    expect(wildcardRule?.allow).toContain("/llms.txt");
    expect(wildcardRule?.allow).toContain("/llms-full.txt");

    const aiRule = rules.find(
      (r) => Array.isArray(r.userAgent) && r.userAgent.includes("GPTBot"),
    );
    expect(aiRule).toBeDefined();
    expect(aiRule?.userAgent).toContain("PerplexityBot");
    expect(aiRule?.userAgent).toContain("ClaudeBot");
    expect(aiRule?.allow).toContain("/llms-full.txt");

    expect(config.sitemap).toBe(`${siteConfig.url}/sitemap.xml`);
    expect(config.host).toBe(siteConfig.url);
  });

  it("validates SoftwareApplication JSON-LD schema specification", () => {
    const softwareSchema = buildSoftwareApplicationJsonLd();

    expect(softwareSchema["@context"]).toBe("https://schema.org");
    expect(softwareSchema["@type"]).toBe("SoftwareApplication");
    expect(softwareSchema.name).toBe("Fontivo");
    expect(softwareSchema.operatingSystem).toContain("Windows 10");
    expect(softwareSchema.operatingSystem).toContain("Windows 11");
    expect(softwareSchema.operatingSystem).toContain("macOS");
    expect(softwareSchema.operatingSystem).toContain("Linux");
    expect(softwareSchema.applicationCategory).toBe("DesignApplication");
    expect(softwareSchema.offers.price).toBe("0");
    expect(softwareSchema.offers.priceCurrency).toBe("USD");
    expect(softwareSchema.softwareVersion).toBe(currentRelease.version);
    expect(softwareSchema.fileSize).toBe(FONTIVO_INSTALLER_SIZE_FORMATTED);
    expect(softwareSchema.downloadUrl).toBe(FONTIVO_INSTALLER_DOWNLOAD_URL);
    expect(softwareSchema.url).toBe("https://fontivo-app.github.io");
    expect(softwareSchema.author.map((a) => a.name)).toEqual([
      "Eng. Ahmed Fahmy",
      "Eng. Mohamed Elashwah",
    ]);
  });

  it("validates FAQPage JSON-LD schema with complete Question and Answer entities in EN and AR", () => {
    const faqEn = buildFaqPageJsonLd("en");
    const faqAr = buildFaqPageJsonLd("ar");

    expect(faqEn["@context"]).toBe("https://schema.org");
    expect(faqEn["@type"]).toBe("FAQPage");
    expect(faqEn.inLanguage).toBe("en");
    expect(faqEn.mainEntity.length).toBe(faqItems.length);
    expect(faqAr.inLanguage).toBe("ar");
    expect(faqAr.mainEntity.length).toBe(faqItems.length);

    faqEn.mainEntity.forEach((entity) => {
      expect(entity["@type"]).toBe("Question");
      expect(typeof entity.name).toBe("string");
      expect(entity.name.length).toBeGreaterThan(10);
      expect(entity.acceptedAnswer["@type"]).toBe("Answer");
      expect(typeof entity.acceptedAnswer.text).toBe("string");
      expect(entity.acceptedAnswer.text.length).toBeGreaterThan(20);
    });
  });

  it("validates HowTo JSON-LD schema for Windows Setup and macOS/Linux install.sh", () => {
    const howToEn = buildDownloadHowToJsonLd("en");
    const howToAr = buildDownloadHowToJsonLd("ar");

    expect(howToEn["@context"]).toBe("https://schema.org");
    expect(howToEn["@type"]).toBe("HowTo");
    expect(howToEn.inLanguage).toBe("en");
    expect(howToEn.step.length).toBe(3);
    expect(howToEn.step[0].text).toContain("Fontivo-Setup.exe");
    expect(howToEn.step[1].text).toContain(UNIX_INSTALL_CMD);

    expect(howToAr.inLanguage).toBe("ar");
    expect(howToAr.step.length).toBe(3);
  });

  it("validates GEO llms.txt, llms-full.txt, and api/manifest.json endpoints", () => {
    const rootDir = process.cwd();
    const llmsTxt = fs.readFileSync(
      path.join(rootDir, "public/llms.txt"),
      "utf-8",
    );
    const llmsFullTxt = fs.readFileSync(
      path.join(rootDir, "public/llms-full.txt"),
      "utf-8",
    );
    const manifest = JSON.parse(
      fs.readFileSync(path.join(rootDir, "public/api/manifest.json"), "utf-8"),
    );

    expect(llmsTxt).toContain("https://fontivo-app.github.io/llms-full.txt");
    expect(llmsTxt).toContain("https://github.com/Ahmedfahmy8308/Fontivo");
    expect(llmsTxt).toContain(
      "https://github.com/Ahmedfahmy8308/Fontivo-Fonts",
    );
    expect(llmsTxt).toContain("https://github.com/Ahmedfahmy8308/Fontivo-Site");
    expect(llmsTxt).not.toContain("ahmedfahmy8308.github.io/Fontivo-Site");

    expect(llmsFullTxt).toContain("Instant Session-Based Font Activation");
    expect(llmsFullTxt).toContain("10,939");
    expect(llmsFullTxt).toContain("FontBase");
    expect(llmsFullTxt).toContain("NexusFont");
    expect(llmsFullTxt).toContain("MainType");
    expect(llmsFullTxt).toContain("Adobe CC Auto-Sync");

    expect(manifest.website).toBe("https://fontivo-app.github.io");
    expect(manifest.fontsLibrary.repository).toBe(
      "https://github.com/Ahmedfahmy8308/Fontivo-Fonts",
    );
  });

  it("validates ItemList JSON-LD schema for all 6 core feature pillars", () => {
    const featuresSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Fontivo Core Architectural Features",
      itemListElement: coreFeatures.map((f, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: f.title,
        description: f.description,
        url: `${siteConfig.url}/features#${f.id}`,
      })),
    };

    expect(featuresSchema["@context"]).toBe("https://schema.org");
    expect(featuresSchema["@type"]).toBe("ItemList");
    expect(featuresSchema.itemListElement.length).toBe(6);

    featuresSchema.itemListElement.forEach((item, idx) => {
      expect(item["@type"]).toBe("ListItem");
      expect(item.position).toBe(idx + 1);
      expect(typeof item.name).toBe("string");
      expect(typeof item.description).toBe("string");
      expect(item.url).toBe(
        `${siteConfig.url}/features#${coreFeatures[idx].id}`,
      );
    });
  });
});
