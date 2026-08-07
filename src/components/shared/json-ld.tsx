/**
 * Renders a JSON-LD object as a script tag.
 *
 * Lives in a component file rather than in `lib/schema.ts` so that module
 * stays plain data — the generators there are used by the sitemap too.
 */
export function JsonLd({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      // Der Inhalt kommt aus eigenen Config- und Content-Dateien, nie aus
      // Benutzereingaben.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
