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

/** A framed image that fills its aspect box (object-cover). */
export interface HeroImageMedia {
  type: "image";
  src: string | StaticImageData;
  alt: string;
}

/** An autoplaying, muted, looping background video. Under
 *  prefers-reduced-motion it does not autoplay and shows the poster. */
export interface HeroVideoMedia {
  type: "video";
  /** Video file URL (mp4/webm). */
  src: string;
  /** Poster frame — shown before play and when motion is reduced. */
  poster?: string;
  /** Accessible description of the video content. */
  alt: string;
}

/** A foreground object floating on a premium stage (object-contain). Ideally
 *  a cut-out asset (transparent product/device/render). */
export interface HeroObjectMedia {
  type: "object";
  src: string | StaticImageData;
  alt: string;
}

/** Object presets for the 3D Hero Engine (see HeroScene). */
export type HeroObjectPreset =
  | "glass"
  | "chrome"
  | "marble"
  | "abstract"
  | "architecture"
  | "orb"
  | "product";

/** A live 3D scene rendered by the Hero Engine. Falls back to a quiet stage
 *  on low-end devices and under prefers-reduced-motion. */
export interface HeroSceneMedia {
  type: "scene";
  /** Which premium object to float in the scene. */
  preset: HeroObjectPreset;
  /** Tie subtle object rotation to mouse movement (default true). */
  parallax?: boolean;
  /** Let page scroll nudge the object (default false). */
  scroll?: boolean;
  /** Subtle idle camera drift (default true). */
  cameraMotion?: boolean;
  /** Accessible label for the decorative scene. */
  alt: string;
}

/** Optional hero visual, discriminated by `type`. The Hero System renders
 *  each kind with its own premium treatment (see HeroVisual). */
export type HeroMedia =
  HeroImageMedia | HeroVideoMedia | HeroObjectMedia | HeroSceneMedia;
