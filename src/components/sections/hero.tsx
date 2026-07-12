import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { FadeIn, FadeInStagger } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Action, SectionImage } from "@/types/content";

interface HeroActions {
  primary: Action;
  secondary?: Action;
}

interface HeroBaseProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: HeroActions;
  className?: string;
}

type HeroTone = "default" | "light";

// Refined eyebrow: a quiet bordered pill with a single brand-accent dot.
// One small piece of "jewelry" that signals a considered product (DESIGN.md §3).
function HeroEyebrow({
  children,
  tone = "default",
}: {
  children: string;
  tone?: HeroTone;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-sm font-medium",
        tone === "light"
          ? "border-white/20 bg-white/5 text-white/80"
          : "border-border bg-muted/40 text-muted-foreground",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          tone === "light" ? "bg-white" : "bg-primary",
        )}
      />
      {children}
    </span>
  );
}

// One primary CTA per view (DESIGN.md §6): the secondary action stays quiet.
// Mobile-first — buttons stack full-width, then sit in a row from `sm`. The
// primary gains a premium trailing-arrow micro-interaction on hover.
function HeroButtons({
  actions,
  align = "start",
  tone = "default",
  className,
}: {
  actions: HeroActions;
  align?: "start" | "center";
  tone?: HeroTone;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center",
        align === "center" && "sm:justify-center",
        className,
      )}
    >
      <Button asChild size="lg" className="group w-full sm:w-auto">
        <Link href={actions.primary.href}>
          {actions.primary.label}
          <ArrowRight
            aria-hidden
            className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"
          />
        </Link>
      </Button>
      {actions.secondary && (
        <Button
          asChild
          size="lg"
          variant={tone === "light" ? "outline" : "ghost"}
          className={cn(
            "w-full sm:w-auto",
            tone === "light" &&
              "border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white",
          )}
        >
          <Link href={actions.secondary.href}>{actions.secondary.label}</Link>
        </Button>
      )}
    </div>
  );
}

/** Centered hero: the promise front and centre, nothing else competing. */
export function HeroCentered({
  eyebrow,
  title,
  subtitle,
  actions,
  className,
}: HeroBaseProps) {
  return (
    <Section className={cn("py-28 sm:py-36 lg:py-44", className)}>
      <Container>
        <FadeInStagger className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center sm:gap-7">
          {eyebrow && (
            <FadeIn>
              <HeroEyebrow>{eyebrow}</HeroEyebrow>
            </FadeIn>
          )}
          <FadeIn>
            <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {title}
            </h1>
          </FadeIn>
          {subtitle && (
            <FadeIn>
              <p className="max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl">
                {subtitle}
              </p>
            </FadeIn>
          )}
          {actions && (
            <FadeIn className="pt-2">
              <HeroButtons actions={actions} align="center" />
            </FadeIn>
          )}
        </FadeInStagger>
      </Container>
    </Section>
  );
}

/** Split hero: copy left, image right. The image is the LCP element. */
export function HeroSplit({
  eyebrow,
  title,
  subtitle,
  actions,
  image,
  className,
}: HeroBaseProps & { image: SectionImage }) {
  return (
    <Section className={cn("py-24 sm:py-28 lg:py-32", className)}>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeInStagger className="flex flex-col gap-6 sm:gap-7">
            {eyebrow && (
              <FadeIn>
                <HeroEyebrow>{eyebrow}</HeroEyebrow>
              </FadeIn>
            )}
            <FadeIn>
              <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl">
                {title}
              </h1>
            </FadeIn>
            {subtitle && (
              <FadeIn>
                <p className="max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
                  {subtitle}
                </p>
              </FadeIn>
            )}
            {actions && (
              <FadeIn className="pt-2">
                <HeroButtons actions={actions} />
              </FadeIn>
            )}
          </FadeInStagger>
          <FadeIn>
            {/* Contained with a hairline ring — elevation is a whisper (DESIGN.md §7). */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted ring-1 ring-black/5 dark:ring-white/10">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}

/** Statement hero: a single large, left-aligned claim carried by type alone. */
export function HeroStatement({
  eyebrow,
  title,
  subtitle,
  actions,
  className,
}: HeroBaseProps) {
  return (
    <Section className={cn("py-28 sm:py-36 lg:py-44", className)}>
      <Container>
        <FadeInStagger className="flex max-w-4xl flex-col gap-6 sm:gap-8">
          {eyebrow && (
            <FadeIn>
              <HeroEyebrow>{eyebrow}</HeroEyebrow>
            </FadeIn>
          )}
          <FadeIn>
            <h1 className="text-[2.75rem] leading-[1.03] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              {title}
            </h1>
          </FadeIn>
          {subtitle && (
            <FadeIn>
              <p className="max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl">
                {subtitle}
              </p>
            </FadeIn>
          )}
          {actions && (
            <FadeIn className="pt-2">
              <HeroButtons actions={actions} />
            </FadeIn>
          )}
        </FadeInStagger>
      </Container>
    </Section>
  );
}

/** Full-width hero: a full-bleed background image with overlaid content.
 *  The image is the LCP element; a scrim guarantees text contrast on any
 *  image (DESIGN.md §12). Text is light-on-dark and therefore theme-neutral. */
export function HeroFullWidth({
  eyebrow,
  title,
  subtitle,
  actions,
  image,
  align = "center",
  className,
}: HeroBaseProps & { image: SectionImage; align?: "center" | "start" }) {
  const centered = align === "center";
  return (
    <section
      className={cn(
        "relative isolate flex min-h-[75vh] items-center overflow-hidden py-28 sm:py-36 lg:min-h-[85vh]",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      {/* Even scrim for legible light text on any image (DESIGN.md §12). */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/55 to-black/70"
      />
      <Container>
        <FadeInStagger
          className={cn(
            "flex max-w-3xl flex-col gap-6 sm:gap-7",
            centered && "mx-auto items-center text-center",
          )}
        >
          {eyebrow && (
            <FadeIn>
              <HeroEyebrow tone="light">{eyebrow}</HeroEyebrow>
            </FadeIn>
          )}
          <FadeIn>
            <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>
          </FadeIn>
          {subtitle && (
            <FadeIn>
              <p className="max-w-2xl text-lg leading-relaxed text-pretty text-white/80 sm:text-xl">
                {subtitle}
              </p>
            </FadeIn>
          )}
          {actions && (
            <FadeIn className="pt-2">
              <HeroButtons
                actions={actions}
                align={centered ? "center" : "start"}
                tone="light"
              />
            </FadeIn>
          )}
        </FadeInStagger>
      </Container>
    </section>
  );
}
