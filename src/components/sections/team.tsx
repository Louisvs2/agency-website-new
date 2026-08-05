import Image from "next/image";
import { User } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section, type SectionBackground } from "@/components/layout/section";
import { FadeIn, FadeInStagger } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";
import type { SectionImage, SectionIntro } from "@/types/content";

export interface TeamMember {
  name: string;
  role: string;
  /** Portrait — omit to show a neutral placeholder avatar instead. */
  image?: SectionImage;
  /** A short three-line introduction shown under the name. */
  bio?: string;
  /** What this person owns — a few focused bullet points on the card. */
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
            {members.map((member, index) => (
              <li key={`${member.name}-${index}`} className="h-full">
                <FadeIn className="h-full">
                  <article className="group flex h-full flex-col gap-5 rounded-2xl border border-border/60 bg-[var(--surface)] p-6 backdrop-blur-[var(--glass-blur)] transition duration-300 ease-out hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_28px_80px_-28px_color-mix(in_oklch,var(--brand)_45%,transparent)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-7">
                    <div className="flex items-center gap-4">
                      {member.image ? (
                        <div className="relative size-14 shrink-0 overflow-hidden rounded-full ring-1 ring-border/60">
                          <Image
                            src={member.image.src}
                            alt={member.image.alt}
                            fill
                            sizes="56px"
                            className="object-cover object-top"
                          />
                        </div>
                      ) : (
                        <div
                          aria-hidden
                          className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white/[0.04] ring-1 ring-border/60"
                        >
                          <User className="size-6 text-muted-foreground" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <h3 className="font-display text-lg font-semibold tracking-tight">
                          {member.name}
                        </h3>
                        <p className="mt-0.5 text-sm font-medium text-brand-strong">
                          {member.role}
                        </p>
                      </div>
                    </div>
                    {member.bio && (
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {member.bio}
                      </p>
                    )}
                    {member.responsibilities &&
                      member.responsibilities.length > 0 && (
                        <ul className="mt-auto flex flex-col gap-2.5 border-t border-border/50 pt-5 text-sm">
                          {member.responsibilities.map((item) => (
                            <li
                              key={item}
                              className="flex items-center gap-2.5"
                            >
                              <span
                                aria-hidden
                                className="size-1.5 shrink-0 rounded-full bg-brand"
                              />
                              <span className="text-muted-foreground">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
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
