import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { navigation } from "@/config/navigation";

/**
 * Die Seite, die Besucher bei einem toten Link sehen.
 *
 * Bisher stand hier der englische Next.js-Standard: „This page could not be
 * found.“ auf weißem Grund, ohne Menü und ohne Weg zurück. Beim statischen
 * Export wird aus dieser Datei die `404.html`, auf die `public/.htaccess`
 * bereits per `ErrorDocument` verweist.
 *
 * Header und Footer stehen hier ausdrücklich noch einmal: diese Route liegt
 * außerhalb der Gruppe `(marketing)` und erbt deren Layout deshalb nicht.
 */
// Kein `robots`-Eintrag: Next setzt für diese Route bereits `noindex`, ein
// zweites Meta-Tag wäre nur ein widersprüchliches Signal.
export const metadata: Metadata = {
  title: "Seite nicht gefunden",
};

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <Section>
          <Container className="max-w-2xl text-center lg:px-6">
            <p className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Fehler 404
            </p>
            <h1 className="mt-5 text-4xl font-medium tracking-tight text-balance sm:text-5xl">
              Diese Seite gibt es nicht.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
              Vielleicht hat sich die Adresse geändert oder ein Link ist
              veraltet. Hier geht es zurück:
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/">Zur Startseite</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={navigation.cta.href}>{navigation.cta.label}</Link>
              </Button>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
