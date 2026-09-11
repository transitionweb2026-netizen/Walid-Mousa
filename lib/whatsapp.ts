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
 * Fills a `{{name}}` / `{{phone}}` / `{{topic}}` / `{{time}}` / `{{message}}`
 * template (from `contact_form_settings.whatsapp_template_*`, editable in the
 * CMS) with form values. A whole line is dropped rather than left with an
 * empty value when its only placeholder is an optional field.
 *
 * No "server-only" import: ContactForm (a Client Component) calls this from
 * its submit handler using a template it received as a server-fetched prop.
 */
export function buildWhatsAppMessage(
  template: string,
  values: Record<"name" | "phone" | "topic" | "time" | "message", string>
): string {
  const optional = new Set(["time", "message"]);
  return template
    .split("\n")
    .filter((line) => {
      for (const key of optional) {
        if (line.includes(`{{${key}}}`) && !values[key as keyof typeof values].trim()) return false;
      }
      return true;
    })
    .map((line) =>
      line
        .replaceAll("{{name}}", values.name || "—")
        .replaceAll("{{phone}}", values.phone || "—")
        .replaceAll("{{topic}}", values.topic || "—")
        .replaceAll("{{time}}", values.time)
        .replaceAll("{{message}}", values.message)
    )
    .join("\n");
}
