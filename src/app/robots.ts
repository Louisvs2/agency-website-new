import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

// Beim statischen Export muss ausdrücklich stehen, dass diese Route zur
// Bauzeit erzeugt wird — sonst behandelt Next sie als dynamisch und der Export
// bricht ab.
export const dynamic = "force-static";

// Wird beim Export als statische /robots.txt geschrieben. Ohne sie findet
// Google die Sitemap nur, wenn sie von Hand in der Search Console eingereicht
// wird — mit ihr auch von allein.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
