"use client";

import { useEffect, useRef } from "react";

// Three massive, heavily-blurred colour fields sitting behind all content —
// an Apple/OpenAI-style aurora. They are static (a continuous keyframe drift of
// layers this large re-composites every frame and tanks the framerate on big
// screens); depth comes instead from a gentle, differing scroll parallax that
// only ever costs anything while the page is actually scrolling.
const BLOBS = [
  {
    color: "rgba(72,116,255,0.55)", // soft blue
    className:
      "left-[-12%] top-[-8%] h-[42rem] w-[42rem] sm:h-[54rem] sm:w-[54rem]",
    blur: "blur(110px)",
    parallax: 0.16,
  },
  {
    color: "rgba(150,88,255,0.5)", // violet
    className:
      "right-[-14%] top-[22%] h-[40rem] w-[40rem] sm:h-[52rem] sm:w-[52rem]",
    blur: "blur(120px)",
    parallax: 0.08,
  },
  {
    color: "rgba(38,214,208,0.42)", // cyan
    className:
      "left-[18%] bottom-[-16%] h-[38rem] w-[38rem] sm:h-[48rem] sm:w-[48rem]",
    blur: "blur(110px)",
    parallax: 0.24,
  },
];

export function SiteAurora() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = ref.current;
    if (!root) return;
    const layers = Array.from(
      root.querySelectorAll<HTMLElement>("[data-parallax]"),
    );
    let raf = 0;
    const update = () => {
      const y = window.scrollY;
      for (const layer of layers) {
        const factor = Number(layer.dataset.parallax) || 0;
        layer.style.setProperty("--sy", `${y * factor}px`);
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {BLOBS.map((blob, i) => (
        <div
          key={i}
          data-parallax={blob.parallax}
          className="absolute inset-0 will-change-transform"
          style={{ transform: "translate3d(0, var(--sy, 0px), 0)" }}
        >
          <div
            className={`absolute rounded-full ${blob.className}`}
            style={{
              background: `radial-gradient(closest-side, ${blob.color}, transparent)`,
              filter: blob.blur,
            }}
          />
        </div>
      ))}
      {/* Faint white core glow — the luxurious highlight. */}
      <div
        className="absolute top-[-12%] left-1/2 h-[34rem] w-[62rem] -translate-x-1/2 rounded-full opacity-[0.06]"
        style={{
          background: "radial-gradient(closest-side, #ffffff, transparent)",
          filter: "blur(90px)",
        }}
      />
      {/* Vignette keeps content crisp over the glow. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 85% at 50% 0%, transparent 45%, rgba(0,0,0,0.4) 100%)",
        }}
      />
    </div>
  );
}
