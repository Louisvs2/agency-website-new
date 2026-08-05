// CultTwenty team — the people behind the work (DESIGN.md §13). Photos share
// one studio style; contact for everyone runs through the shared channels.

import type { TeamMember } from "@/components/sections/team";
import type { SectionIntro } from "@/types/content";

export const team: { intro: SectionIntro; members: TeamMember[] } = {
  intro: {
    eyebrow: "Team",
    title: "Die Menschen hinter CultTwenty",
    subtitle:
      "Ein kleines, eingespieltes Team aus Design, Entwicklung und Betreuung — damit Ihre Website aus einer Hand entsteht.",
  },
  members: [
    {
      name: "Louis Reinecke",
      role: "Creative Director",
      image: {
        src: "/images/team/louis.jpg",
        alt: "Porträt von Louis Reinecke, Creative Director bei CultTwenty",
      },
      bio: "Louis verantwortet die kreative Linie jeder Website — von der ersten Idee bis zum fertigen Design. Er sorgt dafür, dass Ihr Auftritt hochwertig wirkt und zu Ihrer Marke passt.",
      responsibilities: [
        "Design & Art Direction",
        "Marken- & Bildsprache",
        "Kreative Konzeption",
      ],
    },
    {
      name: "Name folgt",
      role: "Lead Developer",
      bio: "Verantwortlich für die technische Umsetzung jeder Website — schnell, sicher und zuverlässig. Kümmert sich um Architektur, Performance und den reibungslosen Betrieb im Hintergrund.",
      responsibilities: [
        "Entwicklung & Architektur",
        "Performance & Sicherheit",
        "Hosting & Betrieb",
      ],
    },
    {
      name: "Name folgt",
      role: "Project & Client Success Manager",
      bio: "Ihr fester Ansprechpartner von Anfang bis Launch. Koordiniert Termine, Inhalte und das Team, damit alles reibungslos zusammenläuft und Sie sich um nichts kümmern müssen.",
      responsibilities: [
        "Projektkoordination",
        "Kundenbetreuung",
        "Planung & Ablauf",
      ],
    },
  ],
};
