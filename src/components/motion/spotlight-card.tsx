"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  href: string;
  className?: string;
  children: ReactNode;
}

/**
 * A frosted-glass card whose surface catches a warm spotlight under the
 * cursor. The whole card is the link. Pure CSS variables drive the glow, so
 * the effect costs almost nothing and simply doesn't animate under
 * prefers-reduced-motion (the transition utilities are neutralised globally).
 */
export function SpotlightCard({
  href,
  className,
  children,
}: SpotlightCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 outline-none sm:p-8 lg:p-10",
        // Frosted glass surface + hairline edge.
        "border border-border/60 bg-card/60 backdrop-blur-xl",
        // Lift + gold edge + soft glow on hover; settles slowly.
        "transition duration-300 ease-out hover:-translate-y-1 hover:border-brand/50",
        "hover:shadow-[0_24px_70px_-24px_color-mix(in_oklch,var(--brand)_45%,transparent)]",
        "focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      {/* Top-left glass sheen. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent dark:from-white/5"
      />
      {/* Warm spotlight that follows the cursor (revealed on hover). */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
        style={{
          background:
            "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklch, var(--brand) 22%, transparent), transparent 70%)",
        }}
      />
      <span className="relative z-10 flex h-full flex-col">{children}</span>
    </Link>
  );
}
