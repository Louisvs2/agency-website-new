import type { Metadata } from "next";

import { fontSans } from "@/lib/fonts";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Website Template",
  description: "Agency starter template for marketing websites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={fontSans.variable}>
      <body>{children}</body>
    </html>
  );
}
