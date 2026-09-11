"use client";

import { useId, useState, type FormEvent } from "react";
import { Icon } from "@/components/icons/Icon";
import { GlassCard } from "@/components/ui/GlassCard";
import { buildWhatsAppUrl, buildWhatsAppMessage } from "@/lib/whatsapp";
import type { ContactFormSettings, ContactInfo } from "@/lib/cms/publicSettings";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const inputClasses =
  "glass-panel w-full rounded-2xl border-transparent px-4 py-3 text-sm text-brand-ink placeholder:text-brand-muted/70 " +
  "outline-none transition-all duration-300 focus-visible:-translate-y-0.5 focus-visible:shadow-glass-lg " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal-strong";

interface Props {
  locale: Locale;
  settings: ContactFormSettings;
  contact: ContactInfo;
}

export function ContactForm({ locale, settings: c, contact }: Props) {
  const formId = useId();
  const options = c.topicOptions.length > 0 ? c.topicOptions : [{ value: "general", label: { en: "General enquiry", ar: "استفسار عام" } }];

  const [values, setValues] = useState({
    fullName: "",
    phone: "",
    topic: options[0].value,
    preferredTime: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string }>({});
  const [showFix, setShowFix] = useState(false);
  const [sent, setSent] = useState(false);

  function update<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setSent(false);
  }

  function validate() {
    const next: typeof errors = {};
    if (!values.fullName.trim()) next.fullName = c.requiredMessage[locale];
    const digits = values.phone.replace(/[^\d]/g, "");
    if (!values.phone.trim()) next.phone = c.requiredMessage[locale];
    else if (digits.length < 8) next.phone = c.invalidPhone[locale];
    setErrors(next);
    const ok = Object.keys(next).length === 0;
    setShowFix(!ok);
    return ok;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    const topicLabel = options.find((o) => o.value === values.topic)?.label[locale] ?? values.topic;
    const message = buildWhatsAppMessage(c.whatsappTemplate[locale], {
      name: values.fullName,
      phone: values.phone,
      topic: topicLabel,
      time: values.preferredTime,
      message: values.message,
    });
    window.open(buildWhatsAppUrl(contact.whatsapp, message), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <GlassCard hover={false} strong className="flex flex-col gap-5 p-6 sm:p-8">
        <div>
          <h2 className="font-heading text-xl font-extrabold text-brand-ink">{c.title[locale]}</h2>
          <p className="mt-2 text-sm leading-relaxed text-brand-muted">{c.description[locale]}</p>
        </div>

        <div>
          <label htmlFor={`${formId}-name`} className="mb-2 block text-sm font-semibold text-brand-ink">
            {c.fields.fullName.label[locale]}
          </label>
          <input
            id={`${formId}-name`}
            type="text"
            autoComplete="name"
            value={values.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            placeholder={c.fields.fullName.placeholder[locale]}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? `${formId}-name-err` : undefined}
            className={cn(inputClasses, errors.fullName && "outline outline-2 outline-brand-pink/70")}
          />
          {errors.fullName && (
            <p id={`${formId}-name-err`} className="mt-1.5 text-xs font-medium text-brand-pink-deep">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-phone`} className="mb-2 block text-sm font-semibold text-brand-ink">
            {c.fields.phone.label[locale]}
          </label>
          <input
            id={`${formId}-phone`}
            type="tel"
            dir="ltr"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder={c.fields.phone.placeholder[locale]}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${formId}-phone-err` : undefined}
            className={cn(inputClasses, "text-start", errors.phone && "outline outline-2 outline-brand-pink/70")}
          />
          {errors.phone && (
            <p id={`${formId}-phone-err`} className="mt-1.5 text-xs font-medium text-brand-pink-deep">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-topic`} className="mb-2 block text-sm font-semibold text-brand-ink">
            {c.fields.topic.label[locale]}
          </label>
          <select
            id={`${formId}-topic`}
            value={values.topic}
            onChange={(e) => update("topic", e.target.value)}
            className={cn(inputClasses, "appearance-none")}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label[locale]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${formId}-time`} className="mb-2 block text-sm font-semibold text-brand-ink">
            {c.fields.preferredTime.label[locale]}
          </label>
          <input
            id={`${formId}-time`}
            type="text"
            value={values.preferredTime}
            onChange={(e) => update("preferredTime", e.target.value)}
            placeholder={c.fields.preferredTime.placeholder[locale]}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-msg`} className="mb-2 block text-sm font-semibold text-brand-ink">
            {c.fields.message.label[locale]}
          </label>
          <textarea
            id={`${formId}-msg`}
            rows={4}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder={c.fields.message.placeholder[locale]}
            className={cn(inputClasses, "resize-none")}
          />
        </div>

        {showFix && (
          <p role="alert" className="flex items-start gap-2 text-sm font-medium text-brand-pink-deep">
            <Icon name="close" className="mt-0.5 h-4 w-4 shrink-0" />
            {c.fixErrors[locale]}
          </p>
        )}

        {sent && (
          <div role="status" className="flex items-start gap-3 rounded-2xl bg-brand-teal-tint p-4">
            <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-deep" />
            <p className="text-sm leading-relaxed text-brand-ink-soft">{c.successMessage[locale]}</p>
          </div>
        )}

        <div className="mt-1 flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            className="group inline-flex flex-1 items-center justify-center gap-2.5 rounded-full bg-gradient-brand px-6 py-3.5 font-heading text-sm font-semibold text-white shadow-glass transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glass-lg active:translate-y-0"
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            {c.submitLabel[locale]}
          </button>
          {contact.phone && (
            <a
              href={`tel:${contact.phone}`}
              className="glass-panel inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 font-heading text-sm font-semibold text-brand-ink transition-all duration-300 hover:-translate-y-0.5 hover:text-brand-teal-deep hover:shadow-glass-lg active:translate-y-0"
            >
              <Icon name="phone" className="h-4 w-4 text-brand-teal-deep" />
              <span dir="ltr">{contact.phoneDisplay[locale]}</span>
            </a>
          )}
        </div>
        {c.actionsNote[locale] && <p className="text-xs leading-relaxed text-brand-muted">{c.actionsNote[locale]}</p>}
      </GlassCard>
    </form>
  );
}
