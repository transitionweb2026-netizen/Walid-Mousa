import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getNotFoundSettings } from "@/lib/cms/publicSettings";

export default async function NotFound() {
  const nf = await getNotFoundSettings();
  // This file has no access to the route locale — default to English chrome.
  const locale = "en" as const;

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-heading text-6xl font-black text-gradient-brand">{nf.code}</p>
      <h1 className="mt-4 text-2xl font-extrabold text-brand-ink">{nf.heading[locale]}</h1>
      <p className="mt-3 text-sm leading-relaxed text-brand-muted">{nf.description[locale]}</p>
      <div className="mt-8 flex gap-3">
        <Button href={`/en${nf.primaryUrl === "/" ? "" : nf.primaryUrl}`} withArrow>
          {nf.primaryLabel[locale]}
        </Button>
        <Button href={`/en${nf.secondaryUrl}`} variant="secondary">
          {nf.secondaryLabel[locale]}
        </Button>
      </div>
      <Link href="/ar" className="mt-6 text-xs text-brand-muted underline">
        العربية
      </Link>
    </section>
  );
}
