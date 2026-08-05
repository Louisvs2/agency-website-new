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
      responsibilities: [
        "Front-End Design",
        "UI/UX Design",
        "Creative Direction",
        "Brand Strategy",
        "Brand Identity & Visual Design",
        "Marketing Strategy",
        "Content Strategy",
        "Client Communication",
        "Creative Concept Development",
        "Art Direction",
      ],
    },
    {
      name: "Dilan Assadi",
      role: "Lead Developer",
      image: {
        src: "/images/team/dilan.jpg",
        alt: "Porträt von Dilan Assadi, Lead Developer bei CultTwenty",
      },
      responsibilities: [
        "Back-End Development",
        "Full-Stack Development",
        "Website Architecture",
        "Technical Strategy",
        "Performance Optimization",
        "API Integrations",
        "Database Management",
        "Hosting & Deployment",
        "Security & Infrastructure",
        "AI & Automation Integrations",
        "Technical Problem Solving",
      ],
    },
    {
      name: "Samuel Edokpolor",
      role: "Project & Client Success Manager",
      image: {
        src: "/images/team/samuel.jpg",
        alt: "Porträt von Samuel Edokpolor, Project & Client Success Manager bei CultTwenty",
      },
      responsibilities: [
        "Customer Relations",
        "Client Success",
        "Project Management",
        "Production Coordination",
        "Scheduling & Planning",
        "Quality Assurance",
        "Business Development",
        "Sales Support",
        "Communication & Support",
        "Operational Management",
        "Reibungslose Zusammenarbeit zwischen Kunden und Team",
      ],
    },
  ],
};
