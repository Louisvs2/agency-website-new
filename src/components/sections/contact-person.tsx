import { Mail } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section, type SectionBackground } from "@/components/layout/section";
import { FadeIn } from "@/components/motion/fade-in";
import { WhatsAppButton } from "@/components/sections/whatsapp-button";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import type { SectionIntro } from "@/types/content";

export interface ContactPerson {
  name: string;
  role: string;
  /** Two-letter initials shown until a real photo is added. */
  initials: string;
  note: string;
}

interface ContactPersonSectionProps {
  intro?: SectionIntro;
  person: ContactPerson;
  background?: SectionBackground;
  className?: string;
}

/**
 * "Who you'll talk to" — a single, real contact person. Uses an initials
 * avatar as a stand-in; drop a photo in by replacing the avatar block with
 * a next/image. Real people are the strongest trust anchor (DESIGN.md §13).
 */
export function ContactPersonSection({
  intro,
  person,
  background,
  className,
}: ContactPersonSectionProps) {
  const email = siteConfig.contact.email;
  return (
    <Section background={background} className={className}>
      <Container>
        {intro && <SectionHeading {...intro} />}
        <FadeIn className={cn("mx-auto max-w-2xl", intro && "mt-14 sm:mt-16")}>
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-border/60 bg-[var(--surface)] p-8 text-center backdrop-blur-[var(--glass-blur)] sm:flex-row sm:items-center sm:gap-8 sm:p-10 sm:text-left">
            <div
              aria-hidden
              className="flex size-24 shrink-0 items-center justify-center rounded-full bg-brand/10 font-display text-3xl font-semibold text-brand-strong ring-1 ring-brand/20"
            >
              {person.initials}
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-lg font-semibold">{person.name}</p>
                <p className="text-sm font-medium text-brand-strong">
                  {person.role}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                {person.note}
              </p>
              <div className="mt-1 flex flex-col gap-3 sm:flex-row">
                <WhatsAppButton />
                {email && (
                  <Button asChild variant="outline">
                    <a href={`mailto:${email}`}>
                      <Mail aria-hidden />
                      E-Mail schreiben
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
