// CultTwenty services — what customers get, framed as their outcome. This
// file is the single source for service slugs: the homepage cards, the
// overview page, and the detail routes all derive from it.

import { LifeBuoy, PenTool, Rocket, type LucideIcon } from "lucide-react";

import type { Feature } from "@/components/sections/features";
import type { FaqItem } from "@/components/sections/faq";
import type { SectionIntro } from "@/types/content";

export interface ServiceDetail {
  slug: string;
  icon: LucideIcon;
  title: string;
  /** Short card/teaser description, also used as meta description. */
  excerpt: string;
  hero: { title: string; subtitle: string };
  featuresIntro: SectionIntro;
  features: Feature[];
  faq?: FaqItem[];
}

const enthaltenIntro: SectionIntro = {
  eyebrow: "Leistungsumfang",
  title: "Was enthalten ist",
};

export const services: ServiceDetail[] = [
  {
    slug: "webdesign",
    icon: PenTool,
    title: "Website-Design",
    excerpt:
      "Ein hochwertiges, individuelles Design, das Ihr Unternehmen professionell und unverwechselbar wirken lässt.",
    hero: {
      title: "Ein Design, das Vertrauen schafft",
      subtitle:
        "Wir gestalten Ihren Auftritt so, dass er auf den ersten Blick hochwertig wirkt — passend zu Ihrer Marke und Ihren Kunden.",
    },
    featuresIntro: enthaltenIntro,
    features: [
      {
        title: "Individuelles Design",
        description:
          "Kein Baukasten von der Stange — ein Auftritt, der zu Ihrem Unternehmen passt.",
      },
      {
        title: "Perfekt auf jedem Gerät",
        description:
          "Ihre Website sieht auf Handy, Tablet und Desktop makellos aus.",
      },
      {
        title: "Ihre Marke im Mittelpunkt",
        description:
          "Farben, Schrift und Bildsprache spielen Ihre Marke hochwertig aus.",
      },
      {
        title: "Klar und übersichtlich",
        description:
          "Besucher finden sofort, was sie suchen — und werden zu Kunden.",
      },
    ],
    faq: [
      {
        question: "Kann ich mein Logo und meine Farben verwenden?",
        answer:
          "Selbstverständlich. Wir richten das Design an Ihrer bestehenden Marke aus — oder helfen, sie aufzufrischen.",
      },
      {
        question: "Sehe ich das Design vorab?",
        answer:
          "Ja. Sie sehen Ihre Website kostenlos, bevor Sie sich entscheiden.",
      },
    ],
  },
  {
    slug: "umsetzung-launch",
    icon: Rocket,
    title: "Umsetzung & Launch",
    excerpt:
      "Wir bauen Ihre Website technisch sauber und bringen sie schnell und zuverlässig online.",
    hero: {
      title: "Schnell und sauber online",
      subtitle:
        "Von den Inhalten bis zum Launch übernehmen wir alles — technisch einwandfrei, schnell und für Google optimiert.",
    },
    featuresIntro: enthaltenIntro,
    features: [
      {
        title: "Schnell live",
        description:
          "Weil die Basis steht, ist Ihre Website oft in wenigen Tagen online.",
      },
      {
        title: "Bei Google gefunden",
        description:
          "Sauber für Suchmaschinen gebaut — die Grundlage für mehr Sichtbarkeit.",
      },
      {
        title: "Blitzschnelle Ladezeiten",
        description:
          "Schnelle Seiten halten Besucher und wirken professionell.",
      },
      {
        title: "Rechtssicher aufgesetzt",
        description:
          "Impressum, Datenschutz und Cookie-Hinweis sind von Anfang an dabei.",
      },
    ],
  },
  {
    slug: "hosting-support",
    icon: LifeBuoy,
    title: "Hosting, Pflege & Support",
    excerpt:
      "Wir betreiben Ihre Website dauerhaft — um Technik, Updates und Sicherheit müssen Sie sich nie kümmern.",
    hero: {
      title: "Sie müssen sich um nichts kümmern",
      subtitle:
        "Ihre Website läuft, ist sicher und bleibt aktuell — dafür sorgen wir, damit Sie sich auf Ihr Geschäft konzentrieren können.",
    },
    featuresIntro: enthaltenIntro,
    features: [
      {
        title: "Zuverlässiges Hosting",
        description: "Ihre Website ist schnell erreichbar und stabil online.",
      },
      {
        title: "Updates & Sicherheit",
        description:
          "Wir halten alles aktuell und geschützt — ganz ohne Ihr Zutun.",
      },
      {
        title: "Änderungen jederzeit",
        description:
          "Neue Inhalte oder Anpassungen? Ein kurzer Hinweis genügt.",
      },
      {
        title: "Persönlicher Ansprechpartner",
        description:
          "Ein fester Kontakt, der Sie kennt und schnell erreichbar ist.",
      },
    ],
  },
];

export const servicesPage = {
  hero: {
    title: "Unsere Leistungen",
    subtitle:
      "Von Design über Umsetzung bis Betrieb — alles aus einer Hand, damit Sie sich um nichts kümmern müssen.",
  },
  cta: {
    title: "Nicht sicher, was Sie brauchen?",
    subtitle:
      "Schreiben Sie uns kurz — wir zeigen Ihnen kostenlos, was für Ihr Unternehmen möglich ist.",
    action: { label: "Kostenlos ansehen", href: "/kontakt" },
    note: "Unverbindlich · Antwort meist am selben Tag.",
  },
};
