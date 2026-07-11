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
  /** Active social profiles only (dead profiles hurt trust, DESIGN.md §13). */
  socials: SocialLink[];
}

export const siteConfig: SiteConfig = {
  name: "Website Template",
  description: "Agency starter template for marketing websites.",
  socials: [],
};
