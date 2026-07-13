"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";

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

interface NavigatorCapabilities {
  hardwareConcurrency?: number;
  deviceMemory?: number;
  connection?: { saveData?: boolean };
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

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
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [capable, setCapable] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setCapable(false);
      return;
    }
    const nav = navigator as unknown as NavigatorCapabilities;
    const cores = nav.hardwareConcurrency ?? 8;
    const memory = nav.deviceMemory ?? 8;
    const saveData = nav.connection?.saveData ?? false;
    const lowEnd = cores <= 4 || memory <= 4 || saveData;
    setCapable(hasWebGL() && !lowEnd);
  }, [reduceMotion]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
      {capable && inView && (
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
