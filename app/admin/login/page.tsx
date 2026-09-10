import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";
import { Icon } from "@/components/icons/Icon";

export const metadata: Metadata = { title: "Sign In", robots: { index: false, follow: false } };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="glass-card-strong w-full max-w-sm rounded-3xl p-8">
        <div className="text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glass">
            <Icon name="lock" className="h-6 w-6" />
          </span>
          <h1 className="mt-4 text-xl font-bold text-brand-ink">Dr. Walid Moussa CMS</h1>
          <p className="mt-1 text-sm text-brand-muted">Sign in to manage the website.</p>
        </div>

        {configured ? (
          <LoginForm next={next ?? "/admin"} />
        ) : (
          <div className="mt-6 rounded-2xl bg-brand-pink-wash/70 p-4 text-sm leading-relaxed text-brand-ink-soft">
            <p className="font-semibold text-brand-ink">Supabase isn&apos;t connected yet.</p>
            <p className="mt-1.5">
              Add <code className="rounded bg-white/70 px-1 py-0.5 text-xs">.env.local</code> with your project URL and
              keys, run the migrations, then create your first admin user. Full steps are in{" "}
              <code className="rounded bg-white/70 px-1 py-0.5 text-xs">SETUP.md</code>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
