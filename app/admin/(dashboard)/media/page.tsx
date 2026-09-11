import { getAdminMedia } from "@/lib/cms/adminQueries";
import { MediaLibrary } from "@/components/admin/MediaLibrary";

export default async function AdminMediaPage() {
  const items = await getAdminMedia();
  return <MediaLibrary initialItems={items} />;
}
