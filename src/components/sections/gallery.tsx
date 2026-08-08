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
  background?: SectionBackground;
  className?: string;
}

// One crop, one radius, one treatment for all images (DESIGN.md §12).
export function Gallery({
  intro,
  images,
  background,
  className,
}: GalleryProps) {
  return (
    <Section background={background} className={className}>
      <Container>
        {intro && <SectionHeading {...intro} />}
        <FadeInStagger fast className={cn(intro && "mt-14 sm:mt-20")}>
          {/* Auf dem Handy eine Spalte: zwei nebeneinander lassen von einem
              Website-Entwurf nur ein farbiges Rechteck übrig, und genau die
              Gestaltung soll hier ja zu sehen sein. */}
          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {images.map((image) => (
              <li key={image.alt}>
                <FadeIn>
                  {/* figure/figcaption statt div/p: die Unterschrift gehört
                      zum Bild, und Screenreader geben sie dann gemeinsam
                      aus. */}
                  <figure>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    {image.caption && (
                      <figcaption className="mt-3 text-sm text-muted-foreground">
                        {image.caption}
                      </figcaption>
                    )}
                  </figure>
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </Section>
  );
}
