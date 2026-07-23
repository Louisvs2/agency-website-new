import { Fraunces, Inter } from "next/font/google";

// Client font swap: replace these fonts, then update the --font-sans /
// --font-display mapping in src/styles/globals.css. Fonts must be loaded via
// next/font (GDPR, no external request, zero CLS).

// Body / UI — a calm, highly legible grotesque.
export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Display — a high-contrast editorial serif for headlines. The optical-size
// axis lets large headings pick up more contrast and character, giving the
// whole site a considered, magazine-grade presence.
export const fontDisplay = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});
