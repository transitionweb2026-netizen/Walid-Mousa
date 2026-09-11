"use client";

import { useState } from "react";
import { linkTreatment, unlinkTreatment, reorderConditionTreatments } from "@/app/admin/actions/conditionTreatments";
import { cn } from "@/lib/utils";

export interface ConditionOption {
  id: string;
  titleEn: string;
}
export interface TreatmentOption {
  id: string;
  titleEn: string;
}
export interface ConditionLinks {
  conditionId: string;
  treatmentIds: string[]; // already in display_order
}

/**
 * Per condition: which treatments belong to it, and in what order (this
 * order is exactly what the matching Services-page section shows). Spec
 * wants each condition to have EXACTLY 4 — a soft warning shows otherwise.
 */
export function ConditionTreatmentsManager({
  conditions,
  treatments,
  initialLinks,
}: {
  conditions: ConditionOption[];
  treatments: TreatmentOption[];
  initialLinks: ConditionLinks[];
}) {
  const [activeId, setActiveId] = useState(conditions[0]?.id);
  const [links, setLinks] = useState<Record<string, string[]>>(
    Object.fromEntries(initialLinks.map((l) => [l.conditionId, l.treatmentIds]))
  );
  const [addValue, setAddValue] = useState("");

  if (!activeId) return <p className="text-sm text-brand-muted">Add a condition under Content → Conditions first.</p>;

  const linked = links[activeId] ?? [];
  const linkedSet = new Set(linked);
  const available = treatments.filter((t) => !linkedSet.has(t.id));
  const treatmentById = new Map(treatments.map((t) => [t.id, t]));

  async function handleAdd() {
    if (!addValue) return;
    setLinks((prev) => ({ ...prev, [activeId]: [...(prev[activeId] ?? []), addValue] }));
    setAddValue("");
    await linkTreatment(activeId, addValue);
  }

  async function handleRemove(treatmentId: string) {
    setLinks((prev) => ({ ...prev, [activeId]: (prev[activeId] ?? []).filter((id) => id !== treatmentId) }));
    await unlinkTreatment(activeId, treatmentId);
  }

  async function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= linked.length) return;
    const next = [...linked];
    [next[index], next[target]] = [next[target], next[index]];
    setLinks((prev) => ({ ...prev, [activeId]: next }));
    await reorderConditionTreatments(activeId, next);
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-brand-ink">Condition → Treatment Links</h1>
      <p className="mt-1 text-sm text-brand-muted">
        Pick a condition, then add / remove / reorder the treatments its Services-page section shows. Aim for exactly 4 per condition.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {conditions.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActiveId(c.id)}
            className={cn("rounded-full px-4 py-2 text-xs font-bold", activeId === c.id ? "bg-gradient-brand text-white" : "glass-panel text-brand-muted")}
          >
            {c.titleEn}
          </button>
        ))}
      </div>

      <div className="glass-panel mt-5 rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-brand-ink">Linked treatments</h2>
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-xs font-bold",
              linked.length === 4 ? "bg-brand-teal-tint text-brand-teal-deep" : "bg-brand-pink-tint text-brand-pink-deep"
            )}
          >
            {linked.length} / 4
          </span>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          {linked.length === 0 && <p className="text-sm text-brand-muted">No treatments linked yet.</p>}
          {linked.map((id, i) => (
            <div key={id} className="glass-card flex items-center gap-3 rounded-xl p-3">
              <div className="flex flex-col text-brand-muted">
                <button type="button" onClick={() => move(i, -1)} className="hover:text-brand-teal-deep" aria-label="Move up">▲</button>
                <button type="button" onClick={() => move(i, 1)} className="hover:text-brand-teal-deep" aria-label="Move down">▼</button>
              </div>
              <span className="flex-1 text-sm font-medium text-brand-ink">{treatmentById.get(id)?.titleEn ?? "(unknown treatment)"}</span>
              <button type="button" onClick={() => handleRemove(id)} className="text-xs font-semibold text-brand-pink-deep">
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <select value={addValue} onChange={(e) => setAddValue(e.target.value)} className="glass-panel flex-1 rounded-xl border-transparent px-3 py-2 text-sm text-brand-ink">
            <option value="">Add a treatment…</option>
            {available.map((t) => (
              <option key={t.id} value={t.id}>
                {t.titleEn}
              </option>
            ))}
          </select>
          <button type="button" onClick={handleAdd} disabled={!addValue} className="rounded-full bg-gradient-brand px-5 py-2 text-xs font-semibold text-white shadow-glass disabled:opacity-50">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
