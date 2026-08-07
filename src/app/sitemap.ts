import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { services } from "@/content/services";

// Beim statischen Export muss ausdrücklich stehen, dass diese Route zur
// Bauzeit erzeugt wird — sonst behandelt Next sie als dynamisch und der Export
// bricht ab.
export const dynamic = "force-static";

/**
 * Sitemap for every indexable page.
 *
 * Die Leistungsseiten kommen aus `content/services.ts` — derselben Quelle, aus
 * der die Seiten selbst erzeugt werden. Eine von Hand gepflegte Liste würde
 * beim nächsten neuen Angebot lautlos veralten.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (
    path: string,
    priority: number,
    changeFrequency: "weekly" | "monthly" | "yearly",
  ) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    page("/", 1, "weekly"),
    page("/leistungen/", 0.9, "monthly"),
    ...services.map((service) =>
      page(`/leistungen/${service.slug}/`, 0.8, "monthly"),
    ),
    page("/ueber-uns/", 0.7, "monthly"),
    page("/kontakt/", 0.7, "monthly"),
    page("/impressum/", 0.2, "yearly"),
    page("/datenschutz/", 0.2, "yearly"),
  ];
}
