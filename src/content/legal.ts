// Legal pages for CultTwenty GbR. Company data is real; the marked
// [Hinweise] should still be reviewed by legal counsel before launch — we
// provide the structure, not legal advice.

export interface LegalSection {
  title: string;
  paragraphs: string[];
}

export interface LegalPageContent {
  title: string;
  sections: LegalSection[];
}

export const impressum: LegalPageContent = {
  title: "Impressum",
  sections: [
    {
      title: "Angaben gemäß § 5 DDG",
      paragraphs: [
        "CultTwenty GbR",
        "Grundweg 16, 34479 Breuna",
        "Vertreten durch die Gesellschafter: Louis Reinecke und Noel David Ritter",
      ],
    },
    {
      title: "Kontakt",
      paragraphs: [
        "Telefon: 0151 5250 2831",
        "E-Mail: Redaktion@culttwenty.de",
      ],
    },
    {
      title: "Verantwortlich für den Inhalt",
      paragraphs: ["Louis Reinecke und Noel David Ritter, Anschrift wie oben."],
    },
    {
      title: "Umsatzsteuer-ID",
      paragraphs: [
        "Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [USt-IdNr. — falls vorhanden; sonst diesen Abschnitt entfernen].",
      ],
    },
    {
      title: "EU-Streitschlichtung",
      paragraphs: [
        "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Unsere E-Mail-Adresse finden Sie oben im Impressum.",
        "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
      ],
    },
  ],
};

export const datenschutz: LegalPageContent = {
  title: "Datenschutzerklärung",
  sections: [
    {
      title: "Verantwortlicher",
      paragraphs: [
        "Verantwortlich für die Datenverarbeitung auf dieser Website: CultTwenty GbR, Grundweg 16, 34479 Breuna, E-Mail: Redaktion@culttwenty.de.",
      ],
    },
    {
      title: "Hosting",
      paragraphs: [
        "Diese Website wird bei der STRATO AG, Otto-Ostrowski-Straße 7, 10249 Berlin, gehostet. Beim Aufruf der Seiten verarbeitet der Hoster technisch notwendige Daten (z. B. IP-Adresse) zur Auslieferung der Inhalte. [Anschrift des Hosters anhand Ihres Strato-Vertrags bestätigen und einen Auftragsverarbeitungsvertrag (AVV) abschließen; Rechtsgrundlage rechtlich prüfen lassen.]",
      ],
    },
    {
      title: "Kontaktaufnahme",
      paragraphs: [
        "Wenn Sie uns per E-Mail, Telefon oder WhatsApp kontaktieren, verarbeiten wir die von Ihnen übermittelten Angaben (z. B. Name, Kontaktdaten, Inhalt der Anfrage) ausschließlich zur Bearbeitung Ihres Anliegens.",
        "Für die Kontaktaufnahme per WhatsApp gelten zusätzlich die Datenschutzbestimmungen von WhatsApp (Meta Platforms Ireland Ltd.). [Rechtsgrundlage und Speicherdauer rechtlich prüfen lassen.]",
      ],
    },
    {
      title: "Ihre Rechte",
      paragraphs: [
        "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch. Wenden Sie sich dazu an die oben genannte Adresse. Zudem besteht ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde.",
      ],
    },
    {
      title: "Hinweis",
      paragraphs: [
        "[Diese Datenschutzerklärung ist ein Grundgerüst. Vor dem Launch vollständig ausarbeiten und rechtlich prüfen lassen — insbesondere, wenn Analytics, Karten-Einbettungen oder weitere Drittdienste hinzukommen.]",
      ],
    },
  ],
};
