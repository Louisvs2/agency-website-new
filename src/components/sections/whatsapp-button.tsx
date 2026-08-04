import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

// Official WhatsApp glyph, inlined so it needs no dependency or request.
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
    </svg>
  );
}

interface WhatsAppButtonProps {
  variant?: "inline" | "floating";
  /** Optional label for the inline variant. */
  label?: string;
  /** Prefilled message. */
  message?: string;
  className?: string;
}

const WHATSAPP_GREEN = "#25D366";

/**
 * A link straight into WhatsApp. `inline` renders a labelled button for the
 * contact area; `floating` is a fixed action button shown on every page.
 * Purely a link — no client JS, works fine in the static export.
 */
export function WhatsAppButton({
  variant = "inline",
  label = "WhatsApp schreiben",
  message = "Hallo CultTwenty, ich interessiere mich für eine Website.",
  className,
}: WhatsAppButtonProps) {
  const number = siteConfig.contact.whatsapp;
  if (!number) return null;
  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  if (variant === "floating") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Kontakt über WhatsApp"
        style={{ backgroundColor: WHATSAPP_GREEN }}
        className={cn(
          "fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full text-white shadow-lg ring-1 ring-black/5 transition-transform duration-300 ease-out hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none",
          className,
        )}
      >
        <WhatsAppIcon className="size-7" />
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ backgroundColor: WHATSAPP_GREEN }}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-md px-6 text-sm font-medium text-white shadow-xs transition-all duration-300 ease-out hover:brightness-95 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none active:scale-[0.98] motion-reduce:active:scale-100",
        className,
      )}
    >
      <WhatsAppIcon className="size-5" />
      {label}
    </a>
  );
}
