import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// The single source of vertical rhythm between sections (DESIGN.md §4, §8).
// Background variants alternate base and subtly tinted surfaces to
// structure long pages — never introduce ad-hoc section padding.
// Sections are transparent so the aurora background shows through the whole
// page; `muted` is a barely-there translucent band that keeps the vertical
// rhythm without hiding the glow.
const sectionVariants = cva("py-20 sm:py-28 lg:py-32", {
  variants: {
    background: {
      default: "bg-transparent",
      muted: "bg-white/[0.025]",
    },
  },
  defaultVariants: {
    background: "default",
  },
});

export type SectionBackground = VariantProps<
  typeof sectionVariants
>["background"];

export function Section({
  className,
  background,
  ...props
}: React.ComponentProps<"section"> & VariantProps<typeof sectionVariants>) {
  return (
    <section
      className={cn(sectionVariants({ background }), className)}
      {...props}
    />
  );
}
