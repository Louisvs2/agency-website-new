// Arbeiten und Zielgruppe. Wie alle Inhalte hier: Text und Bilder liegen in
// src/content/, die Abschnitte in src/components/sections/ bleiben leer und
// wiederverwendbar.
//
// WICHTIG für spätere Änderungen: Die drei Bilder sind eigene Entwürfe, keine
// Kundenprojekte. Die Kennzeichnung steht deshalb doppelt — im Untertitel des
// Abschnitts UND als Bildunterschrift an jeder Kachel. Wer hier echte Projekte
// einsetzt, tauscht beides mit aus; wer die Kennzeichnung entfernt, ohne die
// Bilder zu tauschen, macht aus einer ehrlichen Arbeitsprobe eine Behauptung.

import { Building2, Landmark, Wrench } from "lucide-react";

import type { Feature } from "@/components/sections/features";
import type { SectionImage, SectionIntro } from "@/types/content";

export const work: {
  intro: SectionIntro;
  images: SectionImage[];
  audience: { intro: SectionIntro; items: Feature[] };
} = {
  intro: {
    eyebrow: "Arbeiten",
    title: "So sieht das aus",
    subtitle:
      "Drei Entwürfe aus unserer Feder — für ein Autohaus, eine Steuerkanzlei und ein Bauunternehmen. Noch keine Kundenprojekte: Wir sind jung, und erfundene Referenzen wären das Gegenteil dessen, wofür wir stehen. Sobald die ersten Websites live sind, stehen sie hier.",
  },
  images: [
    {
      src: "/images/showcase/autohaus.webp",
      alt: "Entwurf einer Autohaus-Website: dunkelblaue Startseite mit Fahrzeugsuche und drei Fahrzeugkacheln",
      caption: "Autohaus · Konzeptentwurf",
    },
    {
      src: "/images/showcase/kanzlei.webp",
      alt: "Entwurf einer Kanzlei-Website: heller Serifensatz mit Zitat, Kennzahlen und Leistungsübersicht",
      caption: "Steuerkanzlei · Konzeptentwurf",
    },
    {
      src: "/images/showcase/bau.webp",
      alt: "Entwurf einer Bauunternehmen-Website: dunkle Startseite mit Kran, Kennzahlen und Projektreferenzen",
      caption: "Bauunternehmen · Konzeptentwurf",
    },
  ],
  audience: {
    intro: {
      eyebrow: "Für wen wir arbeiten",
      title: "Betriebe, deren Website nicht mithält",
      subtitle:
        "Sie machen gute Arbeit — nur sieht man das im Netz nicht. Meistens fällt es genau in einer dieser drei Formen auf.",
    },
    items: [
      {
        icon: Building2,
        title: "Autohäuser und Handel",
        description:
          "Ihre Fahrzeuge stehen bei den großen Portalen, aber die eigene Seite zeigt nur eine Anfahrtsskizze. Wer Sie sucht, landet beim Portal statt bei Ihnen.",
      },
      {
        icon: Landmark,
        title: "Kanzleien und Praxen",
        description:
          "Die Seite steht seit Jahren unverändert und wirkt älter als die Beratung, die dahintersteht. Beim ersten Eindruck entscheidet sie mit — oft, bevor jemand anruft.",
      },
      {
        icon: Wrench,
        title: "Bau und Handwerk",
        description:
          "Ihre Referenzen liegen als PDF auf dem Rechner, die Bewerbungen bleiben aus. Eine Seite, die Projekte und offene Stellen zeigt, arbeitet in beide Richtungen.",
      },
    ],
  },
};
