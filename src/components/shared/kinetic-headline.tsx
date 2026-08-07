import { cn } from "@/lib/utils";
import type { Headline, HeadlinePart } from "@/types/content";

/**
 * A headline whose individual letters react to the cursor.
 *
 * Bewusst ohne JavaScript: jeder Buchstabe ist ein eigenes Inline-Element mit
 * einem CSS-Hover. Eine Variante, die die Mausposition verfolgt, müsste bei
 * jeder Bewegung dutzende Elemente neu berechnen — genau die Sorte Effekt, die
 * dieser Seite schon einmal die Bildrate zerlegt hat. Hier bewegt der Browser
 * nur den Buchstaben unter dem Zeiger, und ausschließlich über `transform`.
 *
 * Für Screenreader steht der vollständige Satz im `aria-label`; die Buchstaben
 * selbst sind ausgeblendet, damit nicht einzeln buchstabiert wird. Im Quelltext
 * bleibt der Text vollständig erhalten, Suchmaschinen lesen ihn also normal.
 */

function toParts(headline: Headline): HeadlinePart[] {
  return typeof headline === "string" ? [{ text: headline }] : headline;
}

function Letters({ text, accent }: HeadlinePart) {
  // Nach Wörtern trennen und die Leerzeichen behalten: so bleiben Umbruch,
  // Textauswahl und Kopieren unverändert.
  return text.split(/(\s+)/).map((chunk, chunkIndex) => {
    if (/^\s+$/.test(chunk)) return chunk;

    return (
      <span key={chunkIndex} className="inline-block whitespace-nowrap">
        {[...chunk].map((character, index) => (
          <span
            key={index}
            className={cn(
              "inline-block transition duration-200 ease-out",
              // motion-safe: Wer Bewegung reduziert hat, bekommt nur den
              // Farbwechsel statt eines springenden Buchstabens.
              "motion-safe:hover:-translate-y-[0.07em]",
              // Die Buchstaben tauschen beim Überfahren die Farbe der jeweils
              // anderen Zeile. Ein Wechsel von brand zu brand-strong wäre
              // wirkungslos: im dunklen Theme sind beide Token derselbe Wert.
              accent
                ? "text-brand-strong hover:text-foreground"
                : "hover:text-brand-strong",
            )}
          >
            {character}
          </span>
        ))}
      </span>
    );
  });
}

export function KineticHeadline({
  headline,
  className,
}: {
  headline: Headline;
  className?: string;
}) {
  const parts = toParts(headline);
  const plain = parts.map((part) => part.text).join(" ");

  return (
    <h1 aria-label={plain} className={className}>
      <span aria-hidden>
        {parts.map((part, index) => (
          // Jeder Teil eine eigene Zeile — die Betonung wirkt nur, wenn die
          // Einleitung und das Versprechen sichtbar getrennt sind.
          <span key={index} className="block">
            <Letters {...part} />
          </span>
        ))}
      </span>
    </h1>
  );
}
