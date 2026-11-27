import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

const AI_CRAWLER_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/llms.txt", "/llms-full.txt"],
      },
      {
        userAgent: AI_CRAWLER_AGENTS,
        allow: ["/", "/llms.txt", "/llms-full.txt"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
