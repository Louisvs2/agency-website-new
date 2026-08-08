"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  locale?: string;
  /**
   * `"plain"` schaltet die Tausendertrennung ab — für Jahreszahlen.
   * Ohne diese Möglichkeit wurde aus dem Gründungsjahr 1987 ein „1.987",
   * und „seit wann es uns gibt" ist bei deutschen Betrieben eine der
   * häufigsten Kennzahlen überhaupt.
   */
  format?: "number" | "plain";
  className?: string;
}

const DURATION_MS = 1200;

// Ausserhalb der Komponente, damit die Funktion nicht bei jedem Rendern neu
// entsteht — sonst verlangt die Hook-Regel sie zu Recht als Abhaengigkeit.
function darstellen(
  wert: number,
  format: "number" | "plain",
  locale: string,
): string {
  return format === "plain" ? String(wert) : wert.toLocaleString(locale);
}

// Count-up for stats (DESIGN.md §11). Server-renders the final value so the
// number is correct without JavaScript; the count-up only runs client-side
// once the element enters the viewport. Skipped under reduced motion.
// Plain requestAnimationFrame keeps motion's animation runtime out of the
// bundle — the in-view detection is the only motion dependency here.
export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  locale = "de-DE",
  format = "number",
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || !isInView || reduceMotion) return;

    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = `${prefix}${darstellen(Math.round(eased * value), format, locale)}${suffix}`;
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, reduceMotion, value, prefix, suffix, locale, format]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {`${prefix}${darstellen(value, format, locale)}${suffix}`}
    </span>
  );
}
