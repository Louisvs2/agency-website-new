"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  locale?: string;
  className?: string;
}

// Count-up for stats (DESIGN.md §11). Server-renders the final value so the
// number is correct without JavaScript; the count-up only runs client-side
// once the element enters the viewport. Skipped under reduced motion.
export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  locale = "de-DE",
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || !isInView || reduceMotion) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => {
        element.textContent = `${prefix}${Math.round(latest).toLocaleString(locale)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [isInView, reduceMotion, value, prefix, suffix, locale]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {`${prefix}${value.toLocaleString(locale)}${suffix}`}
    </span>
  );
}
