import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import {
  HeroEditorial,
  HeroObject,
  HeroSplit,
} from "@/components/sections/hero";
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
    </main>
  );
}
