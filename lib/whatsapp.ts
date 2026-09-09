/**
 * Builds a wa.me deep link. `number` may contain spaces / +, they're
 * stripped. `text` is URL-encoded. Prefers the env override when set.
 */
export function buildWhatsAppUrl(number: string, text?: string): string {
  const digits = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || number).replace(/[^\d]/g, "");
  const base = `https://wa.me/${digits}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/**
 * Fills a `{name}` / `{phone}` / `{contact}` / `{date}` / `{message}`
 * template with form values, dropping empty lines.
 */
export function fillTemplate(
  template: string,
  values: Record<"name" | "phone" | "contact" | "date" | "message", string>
): string {
  return template
    .replace(/\{name\}/g, values.name || "—")
    .replace(/\{phone\}/g, values.phone || "—")
    .replace(/\{contact\}/g, values.contact || "—")
    .replace(/\{date\}/g, values.date || "—")
    .replace(/\{message\}/g, values.message || "—")
    .split("\n")
    .filter((line) => !/^\s*[^:]+:\s*—\s*$/.test(line))
    .join("\n");
}
