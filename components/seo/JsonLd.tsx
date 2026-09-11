type JsonLdNode = Record<string, unknown>;

/**
 * Renders one or more schema.org nodes as a single `<script type="application/ld+json">`.
 * `<` is escaped so CMS-controlled strings (org name, address, article titles) can never
 * break out of the script tag.
 */
export function JsonLd({ data }: { data: JsonLdNode | JsonLdNode[] }) {
  const graph = Array.isArray(data) ? { "@context": "https://schema.org", "@graph": data } : data;
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
