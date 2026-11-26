import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { siteConfig } from "@/config/site";
import { faqItems } from "@/config/faq";
import { coreFeatures } from "@/config/features";
import { currentRelease } from "@/config/releases";

describe("SEO & Structured Data Specifications", () => {
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

  it("robots() exports proper crawler allow rules and canonical sitemap path", () => {
    const rules = robots();

    expect(rules.rules).toEqual({
      userAgent: "*",
      allow: "/",
    });
    expect(rules.sitemap).toBe(`${siteConfig.url}/sitemap.xml`);
  });

  it("validates SoftwareApplication JSON-LD schema specification", () => {
    const softwareSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Fontivo",
      operatingSystem: "Windows 10, Windows 11 (64-bit)",
      applicationCategory: "DesignApplication",
      softwareVersion: currentRelease.version,
      datePublished: "2026-11-25",
      downloadUrl: currentRelease.assets[0].downloadUrl,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: {
        "@type": "Person",
        name: siteConfig.creator,
        url: siteConfig.links.author,
      },
    };

    expect(softwareSchema["@context"]).toBe("https://schema.org");
    expect(softwareSchema["@type"]).toBe("SoftwareApplication");
    expect(softwareSchema.operatingSystem).toContain("Windows 10");
    expect(softwareSchema.operatingSystem).toContain("Windows 11");
    expect(softwareSchema.applicationCategory).toBe("DesignApplication");
    expect(softwareSchema.offers.price).toBe("0");
    expect(softwareSchema.softwareVersion).toBe(currentRelease.version);
    expect(softwareSchema.downloadUrl).toBe(
      currentRelease.assets[0].downloadUrl,
    );
  });

  it("validates FAQPage JSON-LD schema with complete Question and Answer entities", () => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };

    expect(faqSchema["@context"]).toBe("https://schema.org");
    expect(faqSchema["@type"]).toBe("FAQPage");
    expect(faqSchema.mainEntity.length).toBe(faqItems.length);

    faqSchema.mainEntity.forEach((entity) => {
      expect(entity["@type"]).toBe("Question");
      expect(typeof entity.name).toBe("string");
      expect(entity.name.length).toBeGreaterThan(10);
      expect(entity.acceptedAnswer["@type"]).toBe("Answer");
      expect(typeof entity.acceptedAnswer.text).toBe("string");
      expect(entity.acceptedAnswer.text.length).toBeGreaterThan(20);
    });
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
