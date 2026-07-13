"use client";

import dynamic from "next/dynamic";

import { use3DCapability } from "@/hooks/use-3d-capability";
import { cn } from "@/lib/utils";
import type { HeroObjectPreset } from "@/types/content";

export interface HeroSceneProps {
  preset?: HeroObjectPreset;
  parallax?: boolean;
  scroll?: boolean;
  cameraMotion?: boolean;
  /** Override the stage aspect ratio / sizing. */
  className?: string;
  ariaLabel?: string;
}

// The heavy 3D canvas (three + R3F) is a separate chunk, loaded only when the
// device is capable and the scene scrolls into view — so it never touches the
// initial bundle of any page.
const HeroSceneCanvas = dynamic(
  () => import("./hero-scene-canvas").then((m) => m.HeroSceneCanvas),
  { ssr: false },
);

/**
 * Reusable 3D Hero Engine. Floats a configurable premium object in a studio
 * environment with soft shadows, idle float, damped mouse parallax and
 * optional scroll influence. Gracefully falls back to a quiet stage on low-end
 * devices and honours prefers-reduced-motion — the heavy scene only mounts
 * when it can run well and is on screen.
 */
export function HeroScene({
  preset = "orb",
  parallax = true,
  scroll = false,
  cameraMotion = true,
  className,
  ariaLabel = "Interaktive 3D-Szene",
}: HeroSceneProps) {
  const { containerRef, render3D } = use3DCapability();

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={ariaLabel}
      className={cn(
        "relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-b from-muted to-background ring-1 ring-black/5 dark:ring-white/10",
        className,
      )}
    >
      {render3D && (
        <HeroSceneCanvas
          preset={preset}
          parallax={parallax}
          scroll={scroll}
          cameraMotion={cameraMotion}
        />
      )}
    </div>
  );
}
