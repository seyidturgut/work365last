import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Genel kural: hesap/ödeme/checkout gibi kişisel/işlemsel sayfalar taranmaz.
const PRIVATE_PATHS = ["/api/", "/hesabim", "/satin-al", "/odeme/", "/panel", "/panel/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
      // LLM / AI cevap motorları — markanın doğru bilgiyle temsil edilmesi için
      // aynı kısıtlarla açıkça izin verilir (GEO / AI görünürlüğü).
      { userAgent: "GPTBot", allow: "/", disallow: PRIVATE_PATHS },
      { userAgent: "ChatGPT-User", allow: "/", disallow: PRIVATE_PATHS },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: PRIVATE_PATHS },
      { userAgent: "ClaudeBot", allow: "/", disallow: PRIVATE_PATHS },
      { userAgent: "Claude-Web", allow: "/", disallow: PRIVATE_PATHS },
      { userAgent: "anthropic-ai", allow: "/", disallow: PRIVATE_PATHS },
      { userAgent: "PerplexityBot", allow: "/", disallow: PRIVATE_PATHS },
      { userAgent: "Google-Extended", allow: "/", disallow: PRIVATE_PATHS },
      { userAgent: "CCBot", allow: "/", disallow: PRIVATE_PATHS },
      { userAgent: "Bytespider", allow: "/", disallow: PRIVATE_PATHS },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
