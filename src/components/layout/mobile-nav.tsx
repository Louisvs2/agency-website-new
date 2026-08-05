"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { isActive } from "@/components/layout/header-nav";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { NavItem } from "@/config/navigation";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  items: NavItem[];
  cta: NavItem;
  className?: string;
}

// The only client leaf of the header: a sheet-based drawer for small
// viewports. Receives its links via props — it never reads config itself,
// so it stays reusable wherever a drawer navigation is needed.
export function MobileNav({ items, cta, className }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("md:hidden", className)}
        >
          <Menu className="size-5" />
          <span className="sr-only">Menü öffnen</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="border-border/60 bg-background/90 backdrop-blur-xl"
      >
        <SheetHeader>
          <SheetTitle>Menü</SheetTitle>
          <SheetDescription className="sr-only">
            Hauptnavigation
          </SheetDescription>
        </SheetHeader>
        <nav aria-label="Hauptnavigation" className="flex flex-col gap-1 px-3">
          {items.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-3.5 text-lg font-medium transition-colors",
                  active
                    ? "bg-brand/10 text-foreground"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "h-5 w-0.5 rounded-full bg-brand transition-opacity",
                    active ? "opacity-100" : "opacity-0",
                  )}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-3 px-4">
          <Button asChild size="lg" className="w-full">
            <Link href={cta.href} onClick={() => setOpen(false)}>
              {cta.label}
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
