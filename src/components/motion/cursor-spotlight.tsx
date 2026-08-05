"use client";

import { useEffect, useRef } from "react";

/**
 * A soft brand-tinted glow that trails the cursor across the whole page — the
 * same reactive field the service cards catch, promoted to a site-wide layer.
 * It sits behind the content (over the aurora) so translucent sections let it
 * shine through. Pure CSS variables drive the position via one rAF-throttled
 * pointer listener, so it costs almost nothing.
 *
 * It stays invisible on touch / coarse pointers and under
 * prefers-reduced-motion, and it defers to the active look's
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
      el.style.setProperty("--cx", `${x}px`);
      el.style.setProperty("--cy", `${y}px`);
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
      el.dataset.active = "true";
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
      className="pointer-events-none fixed inset-0 -z-10 opacity-0 transition-opacity duration-700 ease-out data-[active=true]:opacity-100"
      style={{
        background:
          "radial-gradient(520px circle at var(--cx, 50%) var(--cy, 50%), color-mix(in oklch, var(--brand) 15%, transparent), transparent 62%)",
      }}
    />
  );
}
