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
  // Weißes C auf Schwarz. Die Tab-Größen sind in genau dieser Auflösung
  // gezeichnet statt aus einer großen Datei verkleinert — das bleibt im Tab
  // sichtbar schärfer.
  icons: {
    icon: [
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
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
