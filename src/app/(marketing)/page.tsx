import { CTA } from "@/components/sections/cta";
import { FAQ } from "@/components/sections/faq";
import { ServiceCards } from "@/components/sections/features";
import { HeroCentered } from "@/components/sections/hero";
import { ProcessSteps } from "@/components/sections/process";
import { TeamGrid } from "@/components/sections/team";
import { home } from "@/content/home";
import { team } from "@/content/team";

// CultTwenty homepage: promise → offer → how it works → who you'll talk to →
// objections → action. No invented proof (stats/testimonials) for a young firm.
export default function HomePage() {
  return (
    <>
      <HeroCentered {...home.hero} />
      <ServiceCards
        intro={home.services.intro}
        items={home.services.items}
        background="muted"
      />
      <ProcessSteps intro={home.process.intro} steps={home.process.steps} />
      <TeamGrid intro={team.intro} members={team.members} background="muted" />
      <FAQ intro={home.faq.intro} items={home.faq.items} />
      <CTA {...home.cta} />
    </>
  );
}
