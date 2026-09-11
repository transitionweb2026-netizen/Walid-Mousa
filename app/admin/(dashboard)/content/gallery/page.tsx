import { getAdminGalleryImages } from "@/lib/cms/adminQueries";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "image_id", label: "Image", type: "media", mediaCategory: "gallery" },
  { key: "image_alt", label: "Image Alt Text", type: "text", bilingual: true },
  { key: "caption", label: "Caption (optional)", type: "text", bilingual: true },
];

export default async function AdminGalleryPage() {
  const rows = await getAdminGalleryImages();
  return (
    <CollectionManager
      table="gallery_images"
      title="Clinic Gallery"
      description="The 'Inside the Clinic' photo grid on the About page's Achievements section."
      fields={fields}
      rows={rows}
      hasFeatured={false}
      titleField="caption"
      emptyRow={{ is_active: true }}
    />
  );
}
