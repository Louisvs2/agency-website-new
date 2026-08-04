import { ContactPersonSection } from "@/components/sections/contact-person";
import { CTA } from "@/components/sections/cta";
import { FAQ } from "@/components/sections/faq";
import { ServiceCards } from "@/components/sections/features";
import { HeroCentered } from "@/components/sections/hero";
import { ProcessSteps } from "@/components/sections/process";
import { home } from "@/content/home";

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
      <ContactPersonSection
        intro={home.person.intro}
        person={home.person.data}
        background="muted"
      />
      <FAQ intro={home.faq.intro} items={home.faq.items} />
      <CTA {...home.cta} />
    </>
  );
}
