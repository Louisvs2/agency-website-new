// Central client configuration (PLAN.md §3) — the ONLY place where brand
// identity lives. Components must never hardcode a name, claim, or link;
// they read from this config so a new client project is a config change.

export interface SocialLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  /** Brand/display name — used in the header, footer, and metadata. */
  name: string;
  /** One-sentence description — used in metadata and the footer brand block. */
  description: string;
  /** Canonical base URL (the site lives in the /agency subdirectory). */
  url: string;
  /** Public contact channels — shown on the contact page. */
  contact: {
    email: string;
    phone?: string;
    /** WhatsApp number in international format without "+" (for wa.me links). */
    whatsapp?: string;
    /** Address lines, rendered as-is. Kept out of the contact page on request. */
    address?: string[];
  };
  /** Active social profiles only (dead profiles hurt trust, DESIGN.md §13). */
  socials: SocialLink[];
}

export const siteConfig: SiteConfig = {
  name: "CultTwenty",
  description:
    "Wir bauen hochwertige Websites für Unternehmen — fertig, schnell live und rundum betreut. Sie sehen Ihre Website kostenlos, bevor Sie entscheiden.",
  url: "https://culttwenty.de/agency",
  contact: {
    email: "Redaktion@culttwenty.de",
    phone: "+49 151 5250 2831",
    whatsapp: "4915152502831",
  },
  socials: [],
};
