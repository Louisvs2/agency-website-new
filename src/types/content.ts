import type { StaticImageData } from "next/image";

/** A link with a label — used for CTAs and nav-like references in sections. */
export interface Action {
  label: string;
  href: string;
}

/** Standard section opener content, rendered via SectionHeading. */
export interface SectionIntro {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

/** Image for fill-based rendering inside aspect-ratio containers.
 *  alt is required — decorative images don't belong in sections (DESIGN.md §12). */
export interface SectionImage {
  src: string | StaticImageData;
  alt: string;
}

/** Logo with intrinsic dimensions (rendered at fixed height, no layout shift). */
export interface Logo {
  src: string | StaticImageData;
  alt: string;
  width: number;
  height: number;
}
