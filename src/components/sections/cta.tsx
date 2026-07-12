import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section, type SectionBackground } from "@/components/layout/section";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Action } from "@/types/content";

interface CTAProps {
  title: string;
  subtitle?: string;
  action: Action;
  /** Reassurance microcopy under the button, e.g. a response-time promise. */
  note?: string;
  /**
   * `centered` — calm, spacious closing CTA, the standard end of a page.
   * `panel` — contained inverted panel, a stronger beat mid-page.
   */
  variant?: "centered" | "panel";
  /** Section background — applies to the `centered` variant only. */
  background?: SectionBackground;
  className?: string;
}

function CTACentered({
  title,
  subtitle,
  action,
  note,
  background,
  className,
}: Omit<CTAProps, "variant">) {
  return (
    <Section
      background={background}
      className={cn("py-24 sm:py-32", className)}
    >
      <Container>
        <FadeIn className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h2 className="text-3xl leading-[1.1] font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
              {subtitle}
            </p>
          )}
          <div className="mt-2 flex flex-col items-center gap-3">
            <Button asChild size="lg">
              <Link href={action.href}>{action.label}</Link>
            </Button>
            {note && <p className="text-sm text-muted-foreground">{note}</p>}
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}

function CTAPanel({
  title,
  subtitle,
  action,
  note,
  className,
}: Omit<CTAProps, "variant" | "background">) {
  return (
    <Section className={className}>
      <Container>
        <FadeIn>
          <div className="flex flex-col items-start gap-8 rounded-2xl bg-primary px-6 py-12 text-primary-foreground sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:p-16">
            <div className="max-w-xl">
              <h2 className="text-3xl leading-[1.1] font-semibold tracking-tight sm:text-4xl">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-4 text-lg leading-relaxed text-pretty text-primary-foreground/80">
                  {subtitle}
                </p>
              )}
            </div>
            <div className="flex shrink-0 flex-col gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link href={action.href}>{action.label}</Link>
              </Button>
              {note && (
                <p className="text-sm text-primary-foreground/70">{note}</p>
              )}
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}

// A single call-to-action section with two premium layouts. Consumers pick a
// layout via `variant`; both share the same typed content props.
export function CTA({ variant = "centered", ...props }: CTAProps) {
  if (variant === "panel") {
    return <CTAPanel {...props} />;
  }
  return <CTACentered {...props} />;
}
