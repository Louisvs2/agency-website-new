import { Inter, Space_Grotesk } from "next/font/google";

// Client font swap: replace these fonts, then update the --font-sans /
// --font-display mapping in src/styles/globals.css. Fonts must be loaded via
// next/font (GDPR, no external request, zero CLS).

// Body / UI — a calm, highly legible grotesque.
export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Display — a modern, slightly technical grotesque for headlines. Tight,
// characterful letterforms that pair naturally with a glass / neon aesthetic.
export const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
