import Link from "next/link";

import { Container } from "@/components/layout/container";
import { HeaderNav } from "@/components/layout/header-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { navigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

// Sticky site header, fully config-driven. The translucent background with
// backdrop blur works without any scroll listener, so the header (and the
// desktop navigation) stays a Server Component; the mobile drawer is the
// only client leaf.
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/90">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight"
          aria-label={`${siteConfig.name} – Startseite`}
        >
          {siteConfig.name}
        </Link>
        <HeaderNav items={navigation.main} />
        <div className="flex items-center">
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href={navigation.cta.href}>{navigation.cta.label}</Link>
          </Button>
          <MobileNav items={navigation.main} cta={navigation.cta} />
        </div>
      </Container>
    </header>
  );
}
