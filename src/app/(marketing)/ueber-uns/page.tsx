import type { Metadata } from "next";

import { CTA } from "@/components/sections/cta";
import { FeatureSplit } from "@/components/sections/features";
import { HeroStatement } from "@/components/sections/hero";
import { TeamGrid } from "@/components/sections/team";
import { about } from "@/content/about";
import { team } from "@/content/team";

export const metadata: Metadata = {
  title: "Über uns",
  description: about.hero.subtitle,
};

export default function UeberUnsPage() {
  return (
    <>
      <HeroStatement {...about.hero} />
      <FeatureSplit
        intro={about.values.intro}
        items={about.values.items}
        background="muted"
      />
      <TeamGrid intro={team.intro} members={team.members} />
      <CTA {...about.cta} />
    </>
  );
}
