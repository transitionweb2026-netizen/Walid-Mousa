import { getAdminSocialLinks } from "@/lib/cms/adminQueries";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "platform", label: "Platform", type: "select", options: [
    { value: "phone", label: "Phone" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "facebook", label: "Facebook" },
    { value: "instagram", label: "Instagram" },
    { value: "youtube", label: "YouTube" },
    { value: "tiktok", label: "TikTok" },
    { value: "twitter", label: "X / Twitter" },
    { value: "linkedin", label: "LinkedIn" },
  ] },
  { key: "icon", label: "Icon name", type: "text", help: "facebook, instagram, youtube, tiktok, phone, whatsapp, or globe." },
  { key: "value", label: "URL / Value (full https:// profile link, or tel:/wa.me link)", type: "url", required: true },
  { key: "label_en", label: "Label (English)", type: "text", required: true },
  { key: "label_ar", label: "Label (Arabic)", type: "text", required: true },
];

export default async function AdminSocialPage() {
  const rows = await getAdminSocialLinks();
  return (
    <CollectionManager
      table="social_links"
      title="Social Media"
      description="Shown in the Footer, the Hero contact panel, and the Contact page's Direct Lines card."
      fields={fields}
      rows={rows}
      hasFeatured={false}
      titleField="label"
      emptyRow={{ platform: "facebook", icon: "facebook", value: "", is_active: true }}
    />
  );
}
