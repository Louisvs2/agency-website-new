"use client";

import { useEffect, useRef } from "react";

/**
 * A soft brand-tinted glow that trails the cursor across the whole page — the
 * same reactive field the service cards catch, promoted to a site-wide layer
 * behind the content. It is a single fixed-size, pre-rendered circle that we
 * only ever move with `translate3d`, so it stays on the compositor and never
 * repaints (a viewport-wide gradient repainting every frame is what makes this
 * pattern janky — this one costs next to nothing).
 *
 * It stays invisible on touch / coarse pointers and under
 * prefers-reduced-motion, and defers to the active look's
 * `--spotlight-strength` (flat looks set it to 0 and it never shows).
 */
export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    const strength = parseFloat(
      getComputedStyle(el).getPropertyValue("--spotlight-strength"),
    );
    if (!Number.isFinite(strength) || strength <= 0) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    const apply = () => {
      raf = 0;
      // Centre the 900px circle on the cursor; translate3d keeps it composited.
      el.style.transform = `translate3d(${x - 450}px, ${y - 450}px, 0)`;
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.dataset.active = "true";
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      data-active="false"
      className="pointer-events-none fixed top-0 left-0 -z-10 size-[900px] opacity-0 transition-opacity duration-700 ease-out will-change-transform data-[active=true]:opacity-100"
      style={{
        background:
          "radial-gradient(closest-side, color-mix(in oklch, var(--brand) 16%, transparent), transparent)",
      }}
    />
  );
}
