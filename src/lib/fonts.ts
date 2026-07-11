import { Inter } from "next/font/google";

// Client font swap: replace this font (and add a second one for display if
// the brand needs it), then update the --font-sans / --font-display mapping
// in src/styles/globals.css. Fonts must be loaded via next/font (GDPR, CLS).
export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
