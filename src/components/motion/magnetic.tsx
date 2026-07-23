"use client";

import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface MagneticProps {
  children: ReactNode;
  /** How strongly the element leans toward the cursor (0–1). */
  strength?: number;
  className?: string;
}

/**
 * Wraps an interactive element so it gently leans toward the cursor while
 * hovered — a tactile, "premium" micro-interaction. It honours
 * prefers-reduced-motion by simply never applying the transform.
 */
export function Magnetic({
  children,
  strength = 0.3,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  function handleMove(e: React.MouseEvent<HTMLSpanElement>) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }

  function reset() {
    const el = ref.current;
    if (el) el.style.transform = "";
  }

  return (
    <span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={cn(
        "inline-block transition-transform duration-300 ease-out will-change-transform",
        className,
      )}
    >
      {children}
    </span>
  );
}
