import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import {
  HeroEditorial,
  HeroObject,
  HeroSplit,
} from "@/components/sections/hero";
import { PremiumHero } from "@/components/sections/premium-hero";
import type { HeroMedia } from "@/types/content";

// Temporary internal review page for the Hero System. Not linked anywhere and
// excluded from indexing — safe to delete once the review is done.
export const metadata: Metadata = {
  title: "Hero System – Showcase",
  robots: { index: false, follow: false },
};

const editorialMedia: HeroMedia = {
  type: "image",
  src: "/images/showcase/editorial.png",
  alt: "Platzhalter: Aufnahme aus einem Studioprojekt",
};

const splitMedia: HeroMedia = {
  type: "image",
  src: "/images/showcase/split.png",
  alt: "Platzhalter: Ausschnitt einer Markenarbeit",
};

const objectMedia: HeroMedia = {
  type: "object",
  src: "/images/showcase/object.png",
  alt: "Platzhalter: freigestelltes Produktobjekt",
};

const glassScene: HeroMedia = {
  type: "scene",
  preset: "glass",
  parallax: true,
  cameraMotion: true,
  alt: "Schwebendes Glasobjekt in einer Studioumgebung",
};

const chromeScene: HeroMedia = {
  type: "scene",
  preset: "chrome",
  parallax: true,
  cameraMotion: true,
  alt: "Schwebendes Chromobjekt in einer Studioumgebung",
};

function VariantLabel({ children }: { children: string }) {
  return (
    <Container>
      <div className="border-t pt-6">
        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          {children}
        </p>
      </div>
    </Container>
  );
}

export default function HeroShowcasePage() {
  return (
    <main className="pb-24">
      <PremiumHero
        eyebrow="Studio"
        title="Außergewöhnlich — vom ersten Moment an."
        subtitle="Eine ruhige, cinematische Bühne: hochwertiges Studio-Licht, ein schwebendes Objekt und Bewegung, die man eher fühlt als sieht."
        actions={{
          primary: { label: "Projekt starten", href: "#" },
          secondary: { label: "Arbeiten ansehen", href: "#" },
        }}
        variant="orb"
        lighting="studio"
        camera="cinematic"
        background="atmosphere"
        intensity="balanced"
      />

      <VariantLabel>Editorial Hero</VariantLabel>
      <HeroEditorial
        eyebrow="Studio"
        title="Wir gestalten Marken, die mit Absicht bewegen."
        subtitle="Von der Positionierung bis zum letzten Pixel: Wir entwickeln digitale Auftritte, die Haltung zeigen und in Erinnerung bleiben."
        actions={{
          primary: { label: "Projekt anfragen", href: "#" },
          secondary: { label: "Arbeiten ansehen", href: "#" },
        }}
        media={editorialMedia}
      />

      <VariantLabel>Split Hero</VariantLabel>
      <HeroSplit
        eyebrow="Was wir tun"
        title="Ein Partner für Strategie, Design und Umsetzung."
        subtitle="Wir begleiten Sie vom ersten Konzept bis zum Launch — mit einem festen Team, klaren Prozessen und messbaren Ergebnissen."
        actions={{
          primary: { label: "Kennenlernen", href: "#" },
          secondary: { label: "Leistungen", href: "#" },
        }}
        media={splitMedia}
      />

      <VariantLabel>Premium Object Hero</VariantLabel>
      <HeroObject
        eyebrow="Neu"
        title="Ein Produkt, das für sich spricht."
        subtitle="Klare Form, hochwertige Materialien, durchdachte Details — präsentiert auf einer ruhigen Bühne, die das Objekt in den Mittelpunkt stellt."
        actions={{
          primary: { label: "Jetzt entdecken", href: "#" },
          secondary: { label: "Mehr erfahren", href: "#" },
        }}
        media={objectMedia}
      />

      <VariantLabel>Hero Engine — 3D Szene (Glass)</VariantLabel>
      <HeroSplit
        eyebrow="Hero Engine"
        title="Echtzeit-3D, das sofort einen Moment schafft."
        subtitle="Realistisches Licht, weiche Schatten und ruhige Bewegung — reagiert auf die Maus und fällt auf schwächeren Geräten sauber auf eine stille Bühne zurück."
        actions={{
          primary: { label: "Mehr erfahren", href: "#" },
          secondary: { label: "Presets", href: "#" },
        }}
        media={glassScene}
      />

      <VariantLabel>Hero Engine — 3D Szene (Chrome, zentriert)</VariantLabel>
      <HeroObject
        eyebrow="Hero Engine"
        title="Ein Objekt, das im Raum schwebt."
        subtitle="Sieben konfigurierbare Presets von Glas bis Architektur — vollständig über Props steuerbar."
        actions={{
          primary: { label: "Jetzt entdecken", href: "#" },
          secondary: { label: "Dokumentation", href: "#" },
        }}
        media={chromeScene}
      />
    </main>
  );
}
