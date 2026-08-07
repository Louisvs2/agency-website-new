import type { Headline } from "@/types/content";

/**
 * A headline whose individual letters lift under the cursor.
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

function Letters({ line }: { line: string }) {
  // Nach Wörtern trennen und die Leerzeichen behalten: so bleiben Umbruch,
  // Textauswahl und Kopieren unverändert.
  return line.split(/(\s+)/).map((chunk, chunkIndex) => {
    if (/^\s+$/.test(chunk)) return chunk;

    return (
      <span key={chunkIndex} className="inline-block whitespace-nowrap">
        {[...chunk].map((character, index) => (
          <span
            key={index}
            // motion-safe: Wer Bewegung reduziert hat, bekommt keinen
            // springenden Buchstaben.
            className="inline-block transition-transform duration-200 ease-out motion-safe:hover:-translate-y-[0.07em]"
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
  const lines = typeof headline === "string" ? [headline] : headline;

  return (
    <h1 aria-label={lines.join(" ")} className={className}>
      <span aria-hidden>
        {lines.map((line, index) => (
          // Jede Zeile ein eigener Block — die Betonung entsteht allein durch
          // den Umbruch, ohne Farbwechsel.
          <span key={index} className="block">
            <Letters line={line} />
          </span>
        ))}
      </span>
    </h1>
  );
}
