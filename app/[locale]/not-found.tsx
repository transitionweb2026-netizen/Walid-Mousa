import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-heading text-6xl font-black text-gradient-brand">404</p>
      <h1 className="mt-4 text-2xl font-extrabold text-brand-ink">This page could not be found</h1>
      <p className="mt-3 text-sm leading-relaxed text-brand-muted">
        The page may have moved or the link may be incomplete.
      </p>
      <div className="mt-8 flex gap-3">
        <Button href="/en" withArrow>
          Back to Home
        </Button>
        <Button href="/en/contact" variant="secondary">
          Contact
        </Button>
      </div>
      <Link href="/ar" className="mt-6 text-xs text-brand-muted underline">
        العربية
      </Link>
    </section>
  );
}
