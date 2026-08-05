import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Section, type SectionBackground } from "@/components/layout/section";
import { FadeIn, FadeInStagger } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";
import type { SectionImage, SectionIntro } from "@/types/content";

export interface TeamMember {
  name: string;
  role: string;
  image: SectionImage;
  /** What this person owns — shown as a clean list on the card. */
  responsibilities?: string[];
}

interface TeamGridProps {
  intro?: SectionIntro;
  members: TeamMember[];
  background?: SectionBackground;
  className?: string;
}

// Real people are the strongest trust anchor (DESIGN.md §13). Frosted-glass
// cards with a portrait, role and responsibilities — each reveals as it enters
// the viewport and lifts gently on hover.
export function TeamGrid({
  intro,
  members,
  background,
  className,
}: TeamGridProps) {
  return (
    <Section background={background} className={className}>
      <Container>
        {intro && <SectionHeading {...intro} />}
        <FadeInStagger className={cn(intro && "mt-14 sm:mt-20")}>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {members.map((member) => (
              <li key={member.name} className="h-full">
                <FadeIn className="h-full">
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-[var(--surface)] backdrop-blur-[var(--glass-blur)] transition duration-300 ease-out hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_28px_80px_-28px_color-mix(in_oklch,var(--brand)_45%,transparent)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={member.image.src}
                        alt={member.image.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
                      <div>
                        <h3 className="font-display text-xl font-semibold tracking-tight">
                          {member.name}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-brand-strong">
                          {member.role}
                        </p>
                      </div>
                      {member.responsibilities &&
                        member.responsibilities.length > 0 && (
                          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                            {member.responsibilities.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2.5"
                              >
                                <span
                                  aria-hidden
                                  className="mt-[0.5rem] size-1 shrink-0 rounded-full bg-brand"
                                />
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                    </div>
                  </article>
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </Section>
  );
}
