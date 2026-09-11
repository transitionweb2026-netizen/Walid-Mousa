import { getAdminReviews } from "@/lib/cms/adminQueries";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "display_name", label: "Patient / Display Name", type: "text", required: true, help: "Use initials or a first name to protect privacy, per the site's tone." },
  { key: "rating", label: "Rating (1–5)", type: "number", required: true },
  { key: "image_id", label: "Optional Photo", type: "media", mediaCategory: "reviews" },
  { key: "video_media_id", label: "Optional Video Testimonial", type: "media", mediaBucket: "videos", mediaCategory: "reviews" },
  { key: "context", label: "Context (e.g. \"Varicocele microsurgery\")", type: "text", bilingual: true },
  { key: "quote", label: "Quote", type: "textarea", bilingual: true, required: true },
];

export default async function AdminReviewsPage() {
  const rows = await getAdminReviews();
  return (
    <CollectionManager
      table="reviews"
      title="Patient Reviews"
      description="The 5 testimonial cards on Home."
      fields={fields}
      rows={rows}
      hasFeatured
      titleField="display_name"
      emptyRow={{ display_name: "", rating: 5, is_active: true, is_featured: true }}
    />
  );
}
