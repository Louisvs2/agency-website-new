"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

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

export interface SceneCapability {
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** Heavy 3D should mount: capable device, in view, motion allowed. */
  render3D: boolean;
  /** Coarse pointer / small viewport — the caller may simplify. */
  isMobile: boolean;
}

/**
 * Decides whether a heavy WebGL scene should run: honours
 * prefers-reduced-motion, checks WebGL support and low-end heuristics, and
 * waits until the element is in view. `excludeMobile` keeps the most
 * expensive scenes off phones entirely (they fall back to a static stage).
 */
export function use3DCapability(excludeMobile = false): SceneCapability {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [capable, setCapable] = useState(false);
  const [inView, setInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia(
      "(pointer: coarse), (max-width: 768px)",
    ).matches;
    setIsMobile(mobile);

    if (reduceMotion) {
      setCapable(false);
      return;
    }
    const nav = navigator as unknown as NavigatorCapabilities;
    const cores = nav.hardwareConcurrency ?? 8;
    const memory = nav.deviceMemory ?? 8;
    const saveData = nav.connection?.saveData ?? false;
    const lowEnd = cores <= 4 || memory <= 4 || saveData;
    setCapable(hasWebGL() && !lowEnd && !(excludeMobile && mobile));
  }, [reduceMotion, excludeMobile]);

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

  return { containerRef, render3D: capable && inView, isMobile };
}
