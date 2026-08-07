// Rechtstexte für die CultTwenty GbR.
//
// Wichtig für alle, die hier etwas ändern: Was in dieser Datei steht, wird
// unverändert auf öffentliche Seiten gerendert. Interne Vorbehalte, Notizen
// oder Platzhalter gehören deshalb in die README oder einen Kommentar — nie
// in einen Absatz. Genau das ist hier schon einmal passiert und stand
// monatelang live.
//
// Die Texte beschreiben den tatsächlichen Stand dieser Website: statisches
// Hosting bei Strato, selbst ausgelieferte Schriften, kein Analyse-Werkzeug,
// keine Einbettungen, keine Cookies. Kommt eines davon dazu, muss die
// Datenschutzerklärung im selben Zug ergänzt werden.
//
// Wir sind keine Anwälte. Der Text ist sorgfältig und vollständig, ersetzt
// aber keine anwaltliche Prüfung.

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
        "WhatsApp: 0151 5250 2831",
        "E-Mail: Redaktion@culttwenty.de",
      ],
    },
    {
      title: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
      paragraphs: ["Louis Reinecke, Grundweg 16, 34479 Breuna"],
    },
    {
      title: "Verbraucherstreitbeilegung",
      paragraphs: [
        "Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
        "Die Online-Streitbeilegungsplattform der Europäischen Kommission wurde zum 20. Juli 2025 eingestellt; ein Verweis darauf entfällt daher.",
      ],
    },
    {
      title: "Haftung für Links",
      paragraphs: [
        "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für diese fremden Inhalte ist stets der jeweilige Anbieter verantwortlich. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar. Werden uns Rechtsverletzungen bekannt, entfernen wir solche Links umgehend.",
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
        "Verantwortlich für die Datenverarbeitung auf dieser Website ist die CultTwenty GbR, Grundweg 16, 34479 Breuna, vertreten durch die Gesellschafter Louis Reinecke und Noel David Ritter. Sie erreichen uns per E-Mail unter Redaktion@culttwenty.de und telefonisch unter 0151 5250 2831.",
        "Wir sind gesetzlich nicht verpflichtet, eine Datenschutzbeauftragte oder einen Datenschutzbeauftragten zu benennen, und haben dies auch nicht getan. Richten Sie Ihre Anliegen zum Datenschutz bitte direkt an die oben genannten Kontaktdaten.",
      ],
    },
    {
      title: "Kurz gefasst",
      paragraphs: [
        "Diese Website ist eine reine Informationsseite. Wir setzen keine Cookies, verwenden kein Analyse- oder Tracking-Werkzeug und binden keine Inhalte von fremden Servern ein — auch keine Schriften, Karten oder Videos. Es gibt daher keinen Cookie-Banner, weil es nichts einzuwilligen gibt.",
        "Personenbezogene Daten verarbeiten wir nur in zwei Fällen: automatisch beim Aufruf der Seiten durch unseren Hoster und dann, wenn Sie uns von sich aus schreiben oder anrufen.",
      ],
    },
    {
      title: "Hosting und Server-Logfiles",
      paragraphs: [
        "Diese Website wird bei der STRATO AG, Otto-Ostrowski-Straße 7, 10249 Berlin, gehostet. Nach Angaben des Anbieters stehen die Server in Deutschland.",
        "Beim Aufruf einer Seite erhebt der Hoster automatisch Daten, die Ihr Browser übermittelt und die technisch notwendig sind, um die Seite auszuliefern und den Betrieb abzusichern: IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Datei, übertragene Datenmenge, Meldung über den Erfolg des Abrufs, Browsertyp und Betriebssystem sowie die zuvor besuchte Seite.",
        "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der technisch fehlerfreien Darstellung und der Sicherheit unserer Website. Diese Daten führen wir nicht mit anderen Datenquellen zusammen und werten sie nicht personenbezogen aus. Nach Angaben des Hosters werden die Logfiles automatisch nach kurzer Zeit gelöscht, spätestens jedoch dann, wenn sie für die Sicherheit des Betriebs nicht mehr benötigt werden.",
      ],
    },
    {
      title: "Verschlüsselte Übertragung",
      paragraphs: [
        "Diese Website wird ausschließlich über eine mit TLS verschlüsselte Verbindung ausgeliefert, erkennbar an „https://“ in der Adresszeile und am Schlosssymbol Ihres Browsers. Damit können die Inhalte, die Sie abrufen, auf dem Übertragungsweg nicht von Dritten mitgelesen werden.",
      ],
    },
    {
      title: "Kontaktaufnahme per E-Mail oder Telefon",
      paragraphs: [
        "Wenn Sie uns per E-Mail oder telefonisch kontaktieren, verarbeiten wir die Angaben, die Sie uns dabei übermitteln — in der Regel Name, Kontaktdaten und den Inhalt Ihrer Anfrage — ausschließlich, um Ihr Anliegen zu bearbeiten.",
        "Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf einen Vertrag oder dessen Anbahnung gerichtet ist, im Übrigen Art. 6 Abs. 1 lit. f DSGVO aufgrund unseres berechtigten Interesses an der Beantwortung von Anfragen.",
        "Wir löschen Ihre Anfrage, sobald sie erledigt ist und keine gesetzlichen Aufbewahrungsfristen entgegenstehen. Für geschäftliche Korrespondenz gelten handels- und steuerrechtliche Fristen von sechs beziehungsweise zehn Jahren; in diesen Fällen ist die Verarbeitung auf die Aufbewahrung beschränkt. Sie können Ihre Einwilligung, sofern die Verarbeitung auf einer solchen beruht, jederzeit für die Zukunft widerrufen.",
      ],
    },
    {
      title: "Kontaktaufnahme über WhatsApp",
      paragraphs: [
        "Wir bieten die Kontaktaufnahme über WhatsApp an. Anbieter ist die WhatsApp Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland, ein Unternehmen der Meta-Gruppe.",
        "Schreiben Sie uns über WhatsApp, verarbeitet der Anbieter dabei unter anderem Ihre Mobilfunknummer, Metadaten Ihrer Nachricht und Gerätedaten. Auf diese Verarbeitung haben wir keinen Einfluss und keinen Einblick; sie richtet sich nach den Bestimmungen des Anbieters. Dabei können Daten auch an Server in den USA übermittelt werden. Für die USA besteht ein Angemessenheitsbeschluss der Europäischen Kommission (EU-US Data Privacy Framework); ein Restrisiko, insbesondere hinsichtlich des Zugriffs durch US-Behörden, lässt sich dennoch nicht vollständig ausschließen.",
        "Rechtsgrundlage für die Nutzung dieses Kanals ist Art. 6 Abs. 1 lit. a DSGVO: Sie entscheiden frei, ob Sie uns über WhatsApp schreiben, und erteilen mit dem Absenden Ihre Einwilligung. Wenn Sie das nicht möchten, erreichen Sie uns gleichwertig per E-Mail oder Telefon — wir behandeln beide Wege gleich.",
        "Die Inhalte des Chats speichern wir nur so lange, wie es zur Bearbeitung Ihres Anliegens erforderlich ist.",
      ],
    },
    {
      title: "Schriftarten",
      paragraphs: [
        "Die auf dieser Website verwendeten Schriften liefern wir von unserem eigenen Server aus. Es besteht dabei keine Verbindung zu Servern Dritter, insbesondere nicht zu Google Fonts. Ihre IP-Adresse wird deshalb zu diesem Zweck an niemanden übermittelt.",
      ],
    },
    {
      title: "Ihre Rechte",
      paragraphs: [
        "Sie haben jederzeit das Recht auf Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO), auf Berichtigung unrichtiger Daten (Art. 16 DSGVO), auf Löschung (Art. 17 DSGVO), auf Einschränkung der Verarbeitung (Art. 18 DSGVO) sowie auf Datenübertragbarkeit (Art. 20 DSGVO).",
        "Beruht eine Verarbeitung auf Ihrer Einwilligung, können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3 DSGVO). Die Rechtmäßigkeit der bis dahin erfolgten Verarbeitung bleibt davon unberührt.",
        "Für alle diese Anliegen genügt eine formlose Nachricht an Redaktion@culttwenty.de.",
      ],
    },
    {
      title: "Widerspruchsrecht nach Art. 21 DSGVO",
      paragraphs: [
        "Wenn wir Daten auf Grundlage berechtigter Interessen nach Art. 6 Abs. 1 lit. f DSGVO verarbeiten, haben Sie das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit Widerspruch gegen diese Verarbeitung einzulegen.",
        "Legen Sie Widerspruch ein, verarbeiten wir die betroffenen Daten nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.",
      ],
    },
    {
      title: "Beschwerde bei der Aufsichtsbehörde",
      paragraphs: [
        "Unabhängig von jedem anderen Rechtsbehelf steht Ihnen ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu, insbesondere in dem Mitgliedstaat Ihres Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes.",
        "Für uns zuständig ist Der Hessische Beauftragte für Datenschutz und Informationsfreiheit, Postfach 3163, 65021 Wiesbaden.",
      ],
    },
    {
      title: "Stand und Änderungen",
      paragraphs: [
        "Diese Datenschutzerklärung gilt für die Website agency.culttwenty.de. Wir passen sie an, sobald sich die beschriebene Verarbeitung ändert — etwa wenn ein Kontaktformular oder ein weiterer Dienst hinzukommt. Es gilt jeweils die hier abrufbare Fassung.",
      ],
    },
  ],
};
