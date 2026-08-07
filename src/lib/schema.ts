import { siteConfig } from "@/config/site";

/**
 * JSON-LD generators (PLAN.md §SEO) — handwritten, no extra package.
 *
 * Bewusst `Organization` und nicht `LocalBusiness`: CultTwenty arbeitet
 * bundesweit und die Geschäftsadresse steht absichtlich nicht auf der Website.
 * `LocalBusiness` ohne `address` anzugeben wäre eine Falschangabe an Google —
 * lieber der ehrliche Typ mit Einzugsgebiet.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: "CultTwenty GbR",
    url: siteConfig.url,
    logo: `${siteConfig.url}/apple-icon.png`,
    description: siteConfig.description,
    email: siteConfig.contact.email,
    ...(siteConfig.contact.phone
      ? { telephone: siteConfig.contact.phone }
      : {}),
    areaServed: { "@type": "Country", name: "Deutschland" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: siteConfig.contact.email,
      ...(siteConfig.contact.phone
        ? { telephone: siteConfig.contact.phone }
        : {}),
      availableLanguage: ["de"],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "de-DE",
  };
}

/**
 * The FAQ block on the homepage, marked up so Google can show the answers
 * directly in the result. Only ever call this with questions that are really
 * on the page — marking up invisible content is against Google's rules.
 */
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function serviceSchema(service: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: `${siteConfig.url}${service.path}`,
    serviceType: "Webdesign",
    provider: { "@type": "Organization", name: siteConfig.name },
    areaServed: { "@type": "Country", name: "Deutschland" },
  };
}
