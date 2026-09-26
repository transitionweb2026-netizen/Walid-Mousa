"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export interface AuthActionState {
  error: string | null;
}

export async function signIn(_prevState: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!email || !password) {
    return { error: "Enter both your email and password." };
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { error: "Supabase isn't connected yet — see SETUP.md." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // supabase-js reports a network/DNS/timeout failure (never reached the
    // Supabase project at all) as an AuthRetryableFetchError with status 0 —
    // that is not the same thing as a wrong password, so don't call it one.
    if (!error.status) {
      return { error: "Can't reach Supabase right now — the project may be paused or unreachable. Try again shortly." };
    }
    return { error: "Incorrect email or password." };
  }

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
