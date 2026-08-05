// About page content for CultTwenty. Honest positioning for a young agency.

import { Handshake, Sparkles, Target } from "lucide-react";

import type { Feature } from "@/components/sections/features";
import type { Action, SectionIntro } from "@/types/content";

interface AboutContent {
  hero: { eyebrow: string; title: string; subtitle: string };
  values: { intro: SectionIntro; items: Feature[] };
  cta: { title: string; subtitle: string; action: Action; note: string };
}

export const about: AboutContent = {
  hero: {
    eyebrow: "Über uns",
    title: "Hochwertige Websites — ohne Aufwand für Sie.",
    subtitle:
      "CultTwenty ist eine junge Web-Agentur mit einem klaren Ziel: Unternehmen einen Auftritt geben, der überzeugt — schnell, hochwertig und ganz ohne technisches Kopfzerbrechen.",
  },
  values: {
    intro: {
      eyebrow: "Werte",
      title: "Wofür wir stehen",
      subtitle: "Drei Grundsätze, an denen Sie uns messen können.",
    },
    items: [
      {
        icon: Handshake,
        title: "Ehrlich & ohne Druck",
        description:
          "Sie sehen Ihre Website kostenlos und entscheiden in Ruhe. Kein Risiko, keine versteckten Kosten.",
      },
      {
        icon: Target,
        title: "Qualität, die man sieht",
        description:
          "Design und Technik auf hohem Niveau — kein Baukasten, sondern echte Handarbeit.",
      },
      {
        icon: Sparkles,
        title: "Rundum betreut",
        description:
          "Von der Idee bis zum laufenden Betrieb kümmern wir uns um alles. Sie haben einen festen Ansprechpartner.",
      },
    ],
  },
  cta: {
    title: "Lernen Sie uns kennen",
    subtitle:
      "Ein kurzes Gespräch sagt mehr als jede Website. Schreiben Sie uns — am schnellsten per WhatsApp.",
    action: { label: "Kontakt aufnehmen", href: "/kontakt" },
    note: "Unverbindlich · Antwort meist am selben Tag.",
  },
};
