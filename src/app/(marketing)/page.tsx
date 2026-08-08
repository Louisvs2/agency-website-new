import { CTA } from "@/components/sections/cta";
import { FAQ } from "@/components/sections/faq";
import { FeatureGrid, ServiceCards } from "@/components/sections/features";
import { Gallery } from "@/components/sections/gallery";
import { HeroCentered } from "@/components/sections/hero";
import { ProcessSteps } from "@/components/sections/process";
import { TeamGrid } from "@/components/sections/team";
import { home } from "@/content/home";
import { team } from "@/content/team";
import { work } from "@/content/work";
import { createMetadata } from "@/lib/metadata";
import { faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/shared/json-ld";

// Eigener, vollständiger Titel statt "CultTwenty" — auf der Startseite steht
// das wichtigste Suchwort, nicht nur der Firmenname.
export const metadata = createMetadata({
  title: "Website erstellen lassen — fertig sehen, dann entscheiden",
  description: home.hero.subtitle,
  path: "/",
  absoluteTitle: true,
});

// CultTwenty homepage: promise → offer → how it works → who you'll talk to →
// objections → action. No invented proof (stats/testimonials) for a young firm.
export default function HomePage() {
  return (
    <>
      <HeroCentered {...home.hero} />
      {/* Zuerst die Einordnung: Wer die Seite öffnet, will als Erstes wissen,
          ob er überhaupt gemeint ist. */}
      <FeatureGrid
        intro={work.audience.intro}
        items={work.audience.items}
        background="muted"
      />
      <ServiceCards intro={home.services.intro} items={home.services.items} />
      {/* Erst sagen, was wir tun — dann zeigen, wie es aussieht. */}
      <Gallery intro={work.intro} images={work.images} background="muted" />
      <ProcessSteps intro={home.process.intro} steps={home.process.steps} />
      <TeamGrid intro={team.intro} members={team.members} background="muted" />
      <FAQ intro={home.faq.intro} items={home.faq.items} />
      {/* Nur die Fragen, die auch sichtbar auf der Seite stehen — alles andere
          verstößt gegen Googles Regeln für strukturierte Daten. */}
      <JsonLd
        schema={faqSchema(
          home.faq.items.map((item) => ({
            question: item.question,
            answer: item.answer,
          })),
        )}
      />
      <CTA {...home.cta} />
    </>
  );
}
