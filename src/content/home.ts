// Placeholder content for the default homepage. Replaced per client from
// the CLIENT.md briefing — no line of this file may survive a client launch.
// Structure and tone demonstrate the intended quality bar (DESIGN.md §14).

import { Compass, PenTool, Rocket } from "lucide-react";

import type { Service } from "@/components/sections/features";
import type { FaqItem } from "@/components/sections/faq";
import type { ProcessStep } from "@/components/sections/process";
import type { Stat } from "@/components/sections/stats";
import type { Testimonial } from "@/components/shared/testimonial-card";
import type { Action, SectionIntro } from "@/types/content";

interface HomeContent {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    actions: { primary: Action; secondary: Action };
  };
  services: { intro: SectionIntro; items: Service[] };
  stats: Stat[];
  process: { intro: SectionIntro; steps: ProcessStep[] };
  testimonials: { intro: SectionIntro; items: Testimonial[] };
  faq: { intro: SectionIntro; items: FaqItem[] };
  cta: { title: string; subtitle: string; action: Action; note: string };
}

export const home: HomeContent = {
  hero: {
    eyebrow: "Platzhalter-Eyebrow",
    title: "Ein klares Versprechen in einem Satz",
    subtitle:
      "Ein unterstützender Satz, der das Versprechen konkretisiert: für wen, mit welchem Ergebnis und warum dieses Unternehmen die richtige Wahl ist.",
    actions: {
      primary: { label: "Projekt anfragen", href: "/kontakt" },
      secondary: { label: "Leistungen ansehen", href: "/leistungen" },
    },
  },
  services: {
    intro: {
      eyebrow: "Leistungen",
      title: "Was wir für Sie tun",
      subtitle:
        "Drei bis vier Kernleistungen, jeweils als Ergebnis für den Kunden formuliert — nicht als Fähigkeit des Unternehmens.",
    },
    items: [
      {
        icon: Compass,
        title: "Leistung Eins",
        description:
          "Zwei Sätze zum Ergebnis dieser Leistung: Was hat der Kunde am Ende in der Hand, und welches Problem ist damit gelöst?",
        href: "/leistungen#leistung-eins",
      },
      {
        icon: PenTool,
        title: "Leistung Zwei",
        description:
          "Zwei Sätze zum Ergebnis dieser Leistung: Was hat der Kunde am Ende in der Hand, und welches Problem ist damit gelöst?",
        href: "/leistungen#leistung-zwei",
      },
      {
        icon: Rocket,
        title: "Leistung Drei",
        description:
          "Zwei Sätze zum Ergebnis dieser Leistung: Was hat der Kunde am Ende in der Hand, und welches Problem ist damit gelöst?",
        href: "/leistungen#leistung-drei",
      },
    ],
  },
  stats: [
    { value: 120, suffix: "+", label: "Abgeschlossene Projekte" },
    { value: 15, label: "Jahre Erfahrung" },
    { value: 98, suffix: " %", label: "Weiterempfehlungsrate" },
    { value: 24, suffix: " h", label: "Antwortzeit, garantiert" },
  ],
  process: {
    intro: {
      eyebrow: "So arbeiten wir",
      title: "In drei Schritten zum Ergebnis",
      subtitle:
        "Ein transparenter Ablauf nimmt die Unsicherheit aus der Entscheidung.",
    },
    steps: [
      {
        title: "Kennenlernen",
        description:
          "Ein unverbindliches Erstgespräch: Ausgangslage, Ziele und ob wir zusammenpassen. Danach wissen beide Seiten, woran sie sind.",
      },
      {
        title: "Konzept & Angebot",
        description:
          "Ein konkreter Vorschlag mit klarem Umfang, Zeitplan und Festpreis — keine Überraschungen, keine versteckten Kosten.",
      },
      {
        title: "Umsetzung & Übergabe",
        description:
          "Umsetzung mit regelmäßigen Zwischenständen und einer sauberen Übergabe inklusive allem, was Sie für den Betrieb brauchen.",
      },
    ],
  },
  testimonials: {
    intro: {
      eyebrow: "Referenzen",
      title: "Was Kundinnen und Kunden sagen",
    },
    items: [
      {
        quote:
          "Ein konkretes Zitat mit einem messbaren Ergebnis wirkt stärker als jedes Eigenlob. Dieser Platzhalter zeigt die ideale Länge.",
        name: "Vorname Nachname",
        role: "Position, Unternehmen",
      },
      {
        quote:
          "Zwei bis drei Sätze, die ein echtes Projekt beschreiben: Ausgangslage, Zusammenarbeit und was sich danach verbessert hat.",
        name: "Vorname Nachname",
        role: "Position, Unternehmen",
      },
      {
        quote:
          "Nur echte Stimmen mit echtem Namen und Einverständnis verwenden — anonyme Zitate schaden mehr, als sie nützen.",
        name: "Vorname Nachname",
        role: "Position, Unternehmen",
      },
    ],
  },
  faq: {
    intro: {
      eyebrow: "FAQ",
      title: "Häufige Fragen",
      subtitle:
        "Die echten Fragen aus Anfragen und Gesprächen — inklusive der unbequemen zu Preis und Dauer.",
    },
    items: [
      {
        question: "Was kostet ein Projekt?",
        answer:
          "Eine ehrliche Antwort mit Preisrahmen oder Einstiegspreis. Die Preisfrage offen zu beantworten schafft Vertrauen und filtert unpassende Anfragen.",
      },
      {
        question: "Wie lange dauert die Umsetzung?",
        answer:
          "Ein realistischer Zeitrahmen mit den wichtigsten Einflussfaktoren, damit Interessenten planen können.",
      },
      {
        question: "Wie läuft die Zusammenarbeit ab?",
        answer:
          "Kurzfassung des Prozesses mit Verweis auf die Prozess-Sektion: Erstgespräch, Angebot, Umsetzung, Übergabe.",
      },
      {
        question: "Was passiert nach der Anfrage?",
        answer:
          "Konkret beschreiben, was der nächste Schritt ist und wie schnell eine Antwort kommt — das senkt die Hürde vor dem Absenden.",
      },
      {
        question: "Eine unbequeme, aber ehrliche Frage?",
        answer:
          "Auch Einwände offen beantworten. Wer die kritischen Fragen selbst stellt und beantwortet, wirkt souverän.",
      },
    ],
  },
  cta: {
    title: "Bereit für den nächsten Schritt?",
    subtitle:
      "Ein letzter, ruhiger Aufruf ohne Druck: das Angebot in einem Satz und die Einladung, ins Gespräch zu kommen.",
    action: { label: "Kostenloses Erstgespräch vereinbaren", href: "/kontakt" },
    note: "Unverbindlich. Antwort innerhalb von 24 Stunden.",
  },
};
