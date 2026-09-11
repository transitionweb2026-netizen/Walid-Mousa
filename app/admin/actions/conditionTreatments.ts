"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface ActionResult {
  ok: boolean;
  error?: string;
}

/** Links a treatment to a condition at the end of its current list (or does nothing if already linked). */
export async function linkTreatment(conditionId: string, treatmentId: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("condition_treatments")
    .select("display_order")
    .eq("condition_id", conditionId)
    .order("display_order", { ascending: false })
    .limit(1);
  const nextOrder = ((existing?.[0]?.display_order as number | undefined) ?? 0) + 1;

  const { error } = await supabase
    .from("condition_treatments")
    .upsert({ condition_id: conditionId, treatment_id: treatmentId, display_order: nextOrder } as never, {
      onConflict: "condition_id,treatment_id",
    });
  if (error) return { ok: false, error: error.message };

  revalidatePath("/", "layout");
  return { ok: true };
}

export async function unlinkTreatment(conditionId: string, treatmentId: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("condition_treatments")
    .delete()
    .eq("condition_id", conditionId)
    .eq("treatment_id", treatmentId);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/", "layout");
  return { ok: true };
}

/** Reorders a condition's linked treatments (the order its Services-page section shows them in). */
export async function reorderConditionTreatments(conditionId: string, orderedTreatmentIds: string[]): Promise<ActionResult> {
  const supabase = await createClient();
  const updates = orderedTreatmentIds.map((treatmentId, index) =>
    supabase
      .from("condition_treatments")
      .update({ display_order: index + 1 } as never)
      .eq("condition_id", conditionId)
      .eq("treatment_id", treatmentId)
  );
  const results = await Promise.all(updates);
  const failed = results.find((r) => r.error);
  if (failed?.error) return { ok: false, error: failed.error.message };

  revalidatePath("/", "layout");
  return { ok: true };
}
