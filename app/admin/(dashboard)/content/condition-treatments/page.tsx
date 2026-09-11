import { getAdminConditions, getAdminTreatments, getAdminConditionTreatments } from "@/lib/cms/adminQueries";
import { ConditionTreatmentsManager } from "@/components/admin/ConditionTreatmentsManager";

export default async function AdminConditionTreatmentsPage() {
  const [conditions, treatments, links] = await Promise.all([
    getAdminConditions(),
    getAdminTreatments(),
    getAdminConditionTreatments(),
  ]);

  const conditionOptions = conditions.map((c) => ({ id: c.id as string, titleEn: (c.title_en as string) ?? "(untitled)" }));
  const treatmentOptions = treatments.map((t) => ({ id: t.id as string, titleEn: (t.title_en as string) ?? "(untitled)" }));

  const byCondition = new Map<string, { treatment_id: string; display_order: number }[]>();
  for (const link of links as { condition_id: string; treatment_id: string; display_order: number }[]) {
    const list = byCondition.get(link.condition_id) ?? [];
    list.push(link);
    byCondition.set(link.condition_id, list);
  }
  const initialLinks = conditionOptions.map((c) => ({
    conditionId: c.id,
    treatmentIds: (byCondition.get(c.id) ?? []).sort((a, b) => a.display_order - b.display_order).map((l) => l.treatment_id),
  }));

  return <ConditionTreatmentsManager conditions={conditionOptions} treatments={treatmentOptions} initialLinks={initialLinks} />;
}
