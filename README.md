# CultTwenty Agency Website

Die öffentliche Website der CultTwenty-Agentur, live unter
[agency.culttwenty.de](https://agency.culttwenty.de). Next.js 15 (App Router,
React 19, TypeScript strict, Tailwind CSS 4), als statischer Export gebaut
(kein Node.js-Server nötig) für Strato-Webhosting.

Hervorgegangen aus dem internen Website-Template
([website-vorlage-2026](https://github.com/Louisvs2/website-vorlage-2026)) —
dieses Repository ist eigenständig und unabhängig, nicht mehr an das Template
gekoppelt.

## Entwicklung

```bash
npm install
npm run dev          # Entwicklungsserver
npm run typecheck    # TypeScript strict
npm run lint          # ESLint
npm run build          # Produktions-Build (statischer Export nach out/)
```

## Deployment

`npm run build` erzeugt den statischen Export in `out/` — dieser Ordner wird
1:1 auf das Strato-Webhosting hochgeladen (kein serverseitiges Next.js nötig,
`images.unoptimized: true` in `next.config.ts`).

## Struktur

- `src/app/` — Next.js App Router Seiten
- `src/components/` — Sections und UI-Bausteine
- `src/content/` — Inhalte (Team, Leistungen, Referenzen, Rechtstexte)
- `src/config/site.ts` — Firmendaten (Name, Kontakt, Domain)

Details zu Arbeitsweise und Qualitätsanspruch in `CLAUDE.md`.
