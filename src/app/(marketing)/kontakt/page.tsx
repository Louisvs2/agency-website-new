import type { Metadata } from "next";

import { ContactSection } from "@/components/sections/contact";
import { WhatsAppButton } from "@/components/sections/whatsapp-button";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { contact } from "@/content/contact";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontakt",
  description: contact.intro.subtitle,
};

// Static hosting has no server for a form — customers reach us directly by
// WhatsApp, e-mail or phone. The full address lives only in the Impressum.
export default function KontaktPage() {
  return (
    <ContactSection
      intro={contact.intro}
      email={siteConfig.contact.email}
      phone={siteConfig.contact.phone}
    >
      <div className="flex flex-col gap-6 rounded-2xl border border-border/60 bg-[var(--surface)] p-8 backdrop-blur-[var(--glass-blur)] sm:p-10">
        <div className="flex flex-col gap-2">
          <p className="font-display text-2xl font-semibold tracking-tight">
            Am schnellsten per WhatsApp
          </p>
          <p className="leading-relaxed text-pretty text-muted-foreground">
            Schreiben Sie uns direkt — wir melden uns kurzfristig und zeigen
            Ihnen Ihre neue Website kostenlos, bevor Sie entscheiden.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <WhatsAppButton />
          <Button asChild variant="outline">
            <a href={`mailto:${siteConfig.contact.email}`}>
              <Mail aria-hidden />
              E-Mail schreiben
            </a>
          </Button>
        </div>
      </div>
    </ContactSection>
  );
}
