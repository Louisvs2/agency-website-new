import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Section, type SectionBackground } from "@/components/layout/section";
import { FadeIn, FadeInStagger } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";
import type { SectionImage, SectionIntro } from "@/types/content";

interface GalleryProps {
  intro?: SectionIntro;
  images: SectionImage[];
  /**
   * `"stack"` legt die Bilder ab der Desktop-Breite wie ein aufgefächertes
   * Kartenspiel übereinander; beim Überfahren der Gruppe ziehen sie
   * auseinander. Darunter wird gewischt statt gehovert.
   */
  layout?: "grid" | "stack";
  background?: SectionBackground;
  className?: string;
}

/**
 * Der Ruhezustand des Fächers: die äußeren Karten rücken nach innen und
 * kippen leicht, die mittlere bleibt fast stehen.
 *
 * Alles über `transform`, nichts über Abstände — das Layout bleibt
 * unangetastet, es bewegt sich nur die fertig gesetzte Karte (DESIGN.md §10).
 *
 * Jede Klasse hängt an `motion-safe`: Wer Bewegung reduziert hat, bekommt das
 * ruhige Dreierraster und keinen Stapel, der beim Überfahren aufspringt.
 */
const FAECHER = [
  "z-30 motion-safe:lg:translate-x-[26%] motion-safe:lg:rotate-[-2.5deg]",
  "z-20 motion-safe:lg:rotate-[0.5deg]",
  "z-10 motion-safe:lg:-translate-x-[26%] motion-safe:lg:rotate-[2.5deg]",
];

/** Zurück in die Rasterposition, sobald der Zeiger die Gruppe berührt. */
const AUSFAHREN =
  "motion-safe:lg:group-hover:translate-x-0 motion-safe:lg:group-hover:rotate-0 motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out";

function Kachel({ image }: { image: SectionImage }) {
  return (
    <figure className="relative">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted shadow-[0_18px_50px_-24px_rgba(0,0,0,0.75)] ring-1 ring-black/5 dark:ring-white/10">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, 80vw"
          className="object-cover"
        />
      </div>
      {image.caption && (
        /* Zwei Zustände, ein Element:
           Am Handy steht die Beschriftung ruhig unter dem Bild — dort liegen
           die Karten nebeneinander, ein dunkler Verlauf über dem Foto wäre
           nur ein Balken ohne Aufgabe.
           Ab lg fächern die Karten und verdecken einander; dort muss die
           Beschriftung mit ins Bild wandern, sonst laufen drei Unterschriften
           unter überlappenden Karten ineinander. Rechtsbündig, weil im Fächer
           jede Karte die linke Seite der nächsten verdeckt.
           Der Verlauf hält seine Deckkraft bis 45 % statt gleichmäßig
           auszulaufen: die Buchstaben sitzen ganz unten, ein linearer Verlauf
           ist genau dort schon halb durchsichtig. Über einem hellen
           Website-Foto kam der Text so nur auf 3,5:1 (gemessen), mit dem
           gehaltenen Abschnitt auf über 12:1. */
        <figcaption className="mt-3 text-sm text-muted-foreground lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:rounded-b-xl lg:bg-[linear-gradient(to_top,rgba(0,0,0,0.88),rgba(0,0,0,0.8)_45%,transparent)] lg:px-4 lg:pt-10 lg:pb-3 lg:text-right lg:font-medium lg:text-white">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Bildstrecke — eine Beschneidung, ein Radius, eine Behandlung für alle
 * Bilder (DESIGN.md §12).
 *
 * Der Stapel ist bewusst nur ab `lg` aufgefächert: Er lebt vom Hovern, und
 * Tailwind schaltet `hover:` hinter `@media (hover: hover)` — auf einem
 * Touchgerät bliebe der Stapel also für immer zu. Darunter wird deshalb
 * gewischt, mit CSS-Scroll-Snap wie bei den Kundenstimmen: native
 * Touch-Bedienung, kein JavaScript im kritischen Pfad.
 */
export function Gallery({
  intro,
  images,
  layout = "grid",
  background,
  className,
}: GalleryProps) {
  const stack = layout === "stack";

  return (
    <Section background={background} className={className}>
      <Container>
        {intro && <SectionHeading {...intro} />}
        <FadeInStagger fast className={cn(intro && "mt-14 sm:mt-20")}>
          <ul
            className={cn(
              stack
                ? // Bis lg eine Wischleiste, mittig eingerastet: Karte 80vw
                  // breit, Innenabstand 10vw — dann steht die eingerastete
                  // Karte genau in der Bildschirmmitte und links wie rechts
                  // schaut die nächste hervor. Das sagt „hier geht es weiter"
                  // ohne einen Hinweis.
                  //
                  // Bewusst in Viewport-Breiten und nicht in Prozent: eine
                  // Prozentbreite bezieht sich auf den Inhaltsbereich, der
                  // wiederum vom Innenabstand abhängt — die Rechnung beißt
                  // sich dann selbst.
                  "group -mx-6 flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto px-[10vw] pb-2 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
                : "grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8",
            )}
          >
            {images.map((image, index) => (
              <li
                key={image.alt}
                className={cn(
                  stack && "w-[80vw] shrink-0 snap-center lg:w-auto",
                  stack && FAECHER[index % FAECHER.length],
                  stack && AUSFAHREN,
                )}
              >
                <FadeIn>
                  <Kachel image={image} />
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </Section>
  );
}
