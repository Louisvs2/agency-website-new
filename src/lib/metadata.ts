import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

interface PageMetadataOptions {
  /** Page title without the brand suffix — the template in the root layout adds it. */
  title: string;
  description: string;
  /** Path with a leading slash, e.g. "/leistungen". The canonical is built from it. */
  path: string;
  /** Set for the homepage, where the title should stand alone. */
  absoluteTitle?: boolean;
}

/**
 * Metadata factory (PLAN.md §SEO): every page calls this so canonical, Open
 * Graph and Twitter tags come out consistent instead of being retyped.
 *
 * Ohne Canonical zählt Google `/seite` und `/seite/` unter Umständen als zwei
 * Seiten — bei `trailingSlash: true` im Export ist das eine reale Gefahr.
 */
export function createMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: PageMetadataOptions): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle = absoluteTitle ? title : `${title} – ${siteConfig.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "de_DE",
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/og.png"],
    },
  };
}
