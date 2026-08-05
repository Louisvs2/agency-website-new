"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavItem } from "@/config/navigation";
import { cn } from "@/lib/utils";

// Trailing slashes vary with the static export — normalise both sides so the
// active state is reliable regardless of how the URL is written.
function normalize(path: string) {
  return path.replace(/\/+$/, "") || "/";
}

export function isActive(pathname: string, href: string) {
  const path = normalize(pathname);
  const target = normalize(href);
  return path === target || path.startsWith(`${target}/`);
}

/**
 * Desktop header navigation — the only client leaf of the header. It marks the
 * current page (brand underline + full-strength text) so visitors always know
 * where they are, and grows an animated underline on hover.
 */
export function HeaderNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Hauptnavigation"
      className="hidden items-center gap-8 md:flex"
    >
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group relative py-1 text-sm font-medium transition-colors duration-150",
              active
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
            <span
              aria-hidden
              className={cn(
                "absolute -bottom-0.5 left-0 h-px w-full origin-left rounded-full bg-brand transition-transform duration-300 ease-out",
                active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}
