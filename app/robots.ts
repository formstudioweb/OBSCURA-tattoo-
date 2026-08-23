import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://obscura-tattoo.melnichenkomariia.chatgpt.site/sitemap.xml", host: "https://obscura-tattoo.melnichenkomariia.chatgpt.site" };
}
