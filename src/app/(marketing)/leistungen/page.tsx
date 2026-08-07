import { CTA } from "@/components/sections/cta";
import { ServiceCards } from "@/components/sections/features";
import { HeroCentered } from "@/components/sections/hero";
import { services, servicesPage } from "@/content/services";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Leistungen: Website-Design, Umsetzung und Hosting",
  description: servicesPage.hero.subtitle,
  path: "/leistungen/",
});

export default function LeistungenPage() {
  return (
    <>
      <HeroCentered
        title={servicesPage.hero.title}
        subtitle={servicesPage.hero.subtitle}
        className="py-20 sm:py-24 lg:py-28"
      />
      <ServiceCards
        items={services.map((service) => ({
          icon: service.icon,
          title: service.title,
          description: service.excerpt,
          href: `/leistungen/${service.slug}`,
        }))}
        background="muted"
      />
      <CTA {...servicesPage.cta} />
    </>
  );
}
