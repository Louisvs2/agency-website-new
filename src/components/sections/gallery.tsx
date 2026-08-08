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
    <figure className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted shadow-[0_18px_50px_-24px_rgba(0,0,0,0.75)] ring-1 ring-black/5 dark:ring-white/10">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1024px) 33vw, 80vw"
        className="object-cover"
      />
      {image.caption && (
        /* Die Beschriftung liegt IM Bild statt darunter. Im gefächerten
           Zustand würden drei Unterschriften unter überlappenden Karten
           ineinanderlaufen; hier wandert sie mit ihrer Karte mit und bleibt
           lesbar. Die Kennzeichnung als Entwurf trägt zusätzlich der
           Einleitungstext des Abschnitts. */
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pt-10 pb-3 text-right text-sm font-medium text-white">
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
                ? // Bis lg eine Wischleiste: 80 % Breite lässt die nächste
                  // Karte hervorschauen, und genau das sagt „hier geht es
                  // weiter" ohne einen Hinweis.
                  "group -mx-6 flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto px-6 pb-2 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
                : "grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8",
            )}
          >
            {images.map((image, index) => (
              <li
                key={image.alt}
                className={cn(
                  stack && "w-[80%] shrink-0 snap-start lg:w-auto",
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
