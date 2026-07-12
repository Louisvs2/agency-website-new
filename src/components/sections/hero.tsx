import Image from "next/image";
import Link from "next/link";

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

// One primary CTA per view (DESIGN.md §6): the secondary action is
// deliberately quiet.
function HeroButtons({
  actions,
  className,
}: {
  actions: HeroActions;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <Button asChild size="lg">
        <Link href={actions.primary.href}>{actions.primary.label}</Link>
      </Button>
      {actions.secondary && (
        <Button asChild size="lg" variant="ghost">
          <Link href={actions.secondary.href}>{actions.secondary.label}</Link>
        </Button>
      )}
    </div>
  );
}

function HeroEyebrow({ children }: { children: string }) {
  return (
    <p className="text-sm font-medium text-muted-foreground">{children}</p>
  );
}

/** Centered hero: the promise front and center, nothing else. */
export function HeroCentered({
  eyebrow,
  title,
  subtitle,
  actions,
  className,
}: HeroBaseProps) {
  return (
    <Section className={cn("py-24 sm:py-32 lg:py-40", className)}>
      <Container>
        <FadeInStagger className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          {eyebrow && (
            <FadeIn>
              <HeroEyebrow>{eyebrow}</HeroEyebrow>
            </FadeIn>
          )}
          <FadeIn>
            <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
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
            <FadeIn>
              <HeroButtons actions={actions} className="mt-2 justify-center" />
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
    <Section className={cn("py-20 sm:py-28 lg:py-32", className)}>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeInStagger className="flex flex-col gap-6">
            {eyebrow && (
              <FadeIn>
                <HeroEyebrow>{eyebrow}</HeroEyebrow>
              </FadeIn>
            )}
            <FadeIn>
              <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl">
                {title}
              </h1>
            </FadeIn>
            {subtitle && (
              <FadeIn>
                <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
                  {subtitle}
                </p>
              </FadeIn>
            )}
            {actions && (
              <FadeIn>
                <HeroButtons actions={actions} className="mt-2" />
              </FadeIn>
            )}
          </FadeInStagger>
          <FadeIn>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
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

/** Statement hero: a single large, left-aligned claim. Typography only. */
export function HeroStatement({
  eyebrow,
  title,
  subtitle,
  actions,
  className,
}: HeroBaseProps) {
  return (
    <Section className={cn("py-24 sm:py-32 lg:py-40", className)}>
      <Container>
        <FadeInStagger className="flex max-w-4xl flex-col gap-6">
          {eyebrow && (
            <FadeIn>
              <HeroEyebrow>{eyebrow}</HeroEyebrow>
            </FadeIn>
          )}
          <FadeIn>
            <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight sm:text-6xl lg:text-7xl">
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
            <FadeIn>
              <HeroButtons actions={actions} className="mt-2" />
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
        "relative isolate flex min-h-[70vh] items-center overflow-hidden py-24 sm:py-32 lg:min-h-[80vh]",
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
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 to-black/65"
      />
      <Container>
        <FadeInStagger
          className={cn(
            "flex max-w-3xl flex-col gap-6",
            centered && "mx-auto items-center text-center",
          )}
        >
          {eyebrow && (
            <FadeIn>
              <p className="text-sm font-medium text-white/70">{eyebrow}</p>
            </FadeIn>
          )}
          <FadeIn>
            <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
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
            <FadeIn
              className={cn(
                "mt-2 flex flex-wrap items-center gap-3",
                centered && "justify-center",
              )}
            >
              <Button asChild size="lg">
                <Link href={actions.primary.href}>{actions.primary.label}</Link>
              </Button>
              {actions.secondary && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href={actions.secondary.href}>
                    {actions.secondary.label}
                  </Link>
                </Button>
              )}
            </FadeIn>
          )}
        </FadeInStagger>
      </Container>
    </section>
  );
}
