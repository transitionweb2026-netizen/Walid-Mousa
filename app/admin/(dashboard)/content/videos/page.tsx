import { getAdminVideos } from "@/lib/cms/adminQueries";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "slug", label: "Slug", type: "text", required: true },
  { key: "status", label: "Status", type: "select", options: [
    { value: "draft", label: "Draft (admin-only)" },
    { value: "published", label: "Published (live on the site)" },
  ] },
  { key: "aspect", label: "Aspect Ratio", type: "select", options: [
    { value: "portrait", label: "Portrait (phone-style, 9:16)" },
    { value: "landscape", label: "Landscape (16:9)" },
  ] },
  { key: "duration_label", label: "Duration Label (e.g. \"3:48\")", type: "text" },
  { key: "cover_media_id", label: "Video Cover / Thumbnail", type: "media", mediaBucket: "video-covers", mediaCategory: "videos", help: "Independent of the actual video file below — replacing one never touches the other." },
  { key: "video_media_id", label: "Actual Video File", type: "media", mediaBucket: "videos", mediaCategory: "videos" },
  { key: "youtube_id", label: "…or a YouTube Video ID (used if no file is uploaded above)", type: "text" },
  { key: "title", label: "Title", type: "text", bilingual: true, required: true },
  { key: "description", label: "Description", type: "textarea", bilingual: true },
  { key: "category", label: "Category", type: "text", bilingual: true },
];

export default async function AdminVideosPage() {
  const rows = await getAdminVideos();
  return (
    <CollectionManager
      table="videos"
      title="Videos"
      description="The full library. The Videos page shows every Published video; Home's 'Featured Videos' shows the ones marked Featured (3)."
      fields={fields}
      rows={rows}
      hasActive={false}
      hasFeatured
      emptyRow={{ slug: "", status: "draft", aspect: "portrait", is_featured: false, published_at: new Date().toISOString().slice(0, 10) }}
    />
  );
}
