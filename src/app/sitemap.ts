import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

const ROUTES = [
  { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
  { path: "/features", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/download", changeFrequency: "daily" as const, priority: 0.95 },
  { path: "/docs", changeFrequency: "weekly" as const, priority: 0.88 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/faq", changeFrequency: "weekly" as const, priority: 0.85 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const now = new Date();
  const locales = ["en", "ar"] as const;

  return locales.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: `${baseUrl}/${locale}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
  );
}
