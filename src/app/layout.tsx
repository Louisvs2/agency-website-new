import type { Metadata } from "next";

import { CursorSpotlight } from "@/components/motion/cursor-spotlight";
import { SiteAurora } from "@/components/sections/site-aurora";
import { activeLook } from "@/config/theme";
import { siteConfig } from "@/config/site";
import { fontVariables } from "@/lib/fonts";

import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s – ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" data-look={activeLook} className={`dark ${fontVariables}`}>
      <body>
        <SiteAurora />
        <CursorSpotlight />
        {children}
      </body>
    </html>
  );
}
