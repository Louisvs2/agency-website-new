import { CTA } from "@/components/sections/cta";
import { FeatureSplit } from "@/components/sections/features";
import { HeroStatement } from "@/components/sections/hero";
import { TeamGrid } from "@/components/sections/team";
import { about } from "@/content/about";
import { team } from "@/content/team";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Über uns — das Team hinter Ihrer Website",
  description: about.hero.subtitle,
  path: "/ueber-uns/",
});

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
