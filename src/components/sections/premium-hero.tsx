"use client";

import dynamic from "next/dynamic";

import { Container } from "@/components/layout/container";
import { FadeIn, FadeInStagger } from "@/components/motion/fade-in";
import { HeroButtons, HeroEyebrow } from "@/components/sections/hero";
import { use3DCapability } from "@/hooks/use-3d-capability";
import { cn } from "@/lib/utils";
import type { Action, HeroObjectPreset } from "@/types/content";

export type PremiumHeroLighting = "soft" | "studio" | "dramatic";
export type PremiumHeroCamera = "still" | "float" | "cinematic";
export type PremiumHeroBackground = "plain" | "gradient" | "atmosphere";
export type PremiumHeroIntensity = "subtle" | "balanced" | "bold";

export interface PremiumHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: { primary: Action; secondary?: Action };
  /** Which premium object floats in the scene. */
  variant?: HeroObjectPreset;
  lighting?: PremiumHeroLighting;
  camera?: PremiumHeroCamera;
  background?: PremiumHeroBackground;
  /** Master motion switch — off renders the calm static stage. */
  motion?: boolean;
  intensity?: PremiumHeroIntensity;
  parallax?: boolean;
  scroll?: boolean;
  className?: string;
}

const PremiumHeroCanvas = dynamic(
  () => import("./premium-hero-canvas").then((m) => m.PremiumHeroCanvas),
  { ssr: false },
);

// A single, very fine film grain — the whole "noise overlay", inlined so it
// costs no request. Kept near-invisible.
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

const BACKGROUNDS: Record<PremiumHeroBackground, string> = {
  plain: "bg-background",
  gradient: "from-muted to-background bg-gradient-to-b",
  atmosphere: "from-muted/50 to-background bg-gradient-to-b",
};

/**
 * PremiumHero — a calm, cinematic hero built for an Apple / Linear / Stripe
 * quality bar. A configurable premium object floats in a studio scene while a
 * damped camera drifts almost imperceptibly; the mouse nudges the camera and
 * light, and scroll dollies in. Everything is prop-driven, and it degrades to
 * an elegant static stage on phones, low-end devices and reduced-motion.
 */
export function PremiumHero({
  eyebrow,
  title,
  subtitle,
  actions,
  variant = "orb",
  lighting = "studio",
  camera = "cinematic",
  background = "atmosphere",
  motion = true,
  intensity = "balanced",
  parallax = true,
  scroll = true,
  className,
}: PremiumHeroProps) {
  const { containerRef, render3D } = use3DCapability(true);
  const show3D = render3D && motion;
  const withAtmosphere = background === "atmosphere";

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative isolate flex min-h-[90vh] items-start overflow-hidden",
        BACKGROUNDS[background],
        className,
      )}
    >
      {show3D && (
        <PremiumHeroCanvas
          preset={variant}
          lighting={lighting}
          camera={camera}
          intensity={intensity}
          parallax={parallax}
          scroll={scroll}
        />
      )}

      {/* Atmosphere — subtle vignette + film grain, purely decorative. */}
      {withAtmosphere && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background:
                "radial-gradient(120% 100% at 50% 30%, transparent 50%, rgba(0,0,0,0.16) 100%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1] opacity-[0.035] mix-blend-overlay"
            style={{ backgroundImage: `url("${NOISE}")` }}
          />
        </>
      )}

      {/* Scrim keeps the headline legible over the scene (DESIGN.md §12). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-1/2 bg-gradient-to-b from-background via-background/55 to-transparent"
      />

      <Container className="relative z-10 flex min-h-[90vh] flex-col items-center pt-[16vh] pb-24 text-center sm:pt-[19vh]">
        <FadeInStagger className="flex max-w-3xl flex-col items-center gap-6 sm:gap-7">
          {eyebrow && (
            <FadeIn>
              <HeroEyebrow>{eyebrow}</HeroEyebrow>
            </FadeIn>
          )}
          <FadeIn>
            <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {title}
            </h1>
          </FadeIn>
          {subtitle && (
            <FadeIn>
              <p className="max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl">
                {subtitle}
              </p>
            </FadeIn>
          )}
          {actions && (
            <FadeIn className="pt-2">
              <HeroButtons actions={actions} align="center" />
            </FadeIn>
          )}
        </FadeInStagger>
      </Container>
    </section>
  );
}
