import { getAdminConditions } from "@/lib/cms/adminQueries";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "slug", label: "Slug (used in #specialty-<slug> anchors)", type: "text", required: true },
  { key: "icon", label: "Icon name", type: "text", help: "Must match a name in components/icons/Icon.tsx, e.g. vitality, fertility, clock, diagnosis." },
  { key: "image_id", label: "Card Image", type: "media", mediaCategory: "conditions" },
  { key: "image_alt", label: "Image Alt Text", type: "text", bilingual: true },
  { key: "title", label: "Title", type: "text", bilingual: true, required: true },
  { key: "tagline", label: "Tagline (shown on the selector card)", type: "text", bilingual: true },
  { key: "short_description", label: "Short Description (card + intro)", type: "textarea", bilingual: true, required: true },
  { key: "full_description", label: "Full Description Paragraphs (popup — one per line)", type: "stringArray", bilingual: true },
  { key: "signs", label: "Common Signs (popup bullets — one per line)", type: "stringArray", bilingual: true },
];

export default async function AdminConditionsPage() {
  const rows = await getAdminConditions();
  return (
    <CollectionManager
      table="conditions"
      title="Conditions / Problems"
      description="The 'Choose Your Specialty' cards on Services, and the featured 4 on Home's 'Find Your Treatment'. Each links to its treatments under Content → Condition → Treatment Links."
      fields={fields}
      rows={rows}
      hasFeatured
      emptyRow={{ slug: "", icon: "vitality", is_active: true, is_featured: true }}
    />
  );
}
