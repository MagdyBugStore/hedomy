import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const PRIVATE = ["/admin", "/api/", "/cart", "/checkout", "/login", "/order", "/favorites", "/gallery"];
// Search + AI crawlers are welcome: being cited by ChatGPT / Claude / Perplexity / Gemini / Copilot is the goal.
const AI = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "Claude-SearchBot", "anthropic-ai", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot", "Applebot-Extended", "Bingbot", "DuckDuckBot", "Amazonbot", "CCBot", "cohere-ai", "MistralAI-User", "YouBot", "Meta-ExternalAgent", "Bytespider"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: [...PRIVATE, "/*?*sort=", "/*?*page=", "/*?*q="] },
      ...AI.map((userAgent) => ({ userAgent, allow: "/", disallow: PRIVATE })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
