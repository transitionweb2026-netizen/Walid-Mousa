import path from "node:path";
import type { NextConfig } from "next";

// next/image only renders remote hosts explicitly allow-listed here. Unsplash
// backs the original placeholder imagery; YouTube backs video thumbnails; the
// Supabase Storage host (derived from NEXT_PUBLIC_SUPABASE_URL) is where every
// image uploaded through the CMS is served from.
const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      ...(supabaseHostname
        ? [
            {
              protocol: "https" as const,
              hostname: supabaseHostname,
              pathname: "/storage/v1/object/public/**",
            },
          ]
        : []),
    ],
  },
  turbopack: {
    // Pin the workspace root to THIS project. The parent Desktop folder
    // contains its own package.json and sibling projects carry lockfiles —
    // without this, Turbopack walks up and adopts the wrong workspace root.
    root: path.resolve(__dirname),
  },
  // Same reasoning for the production build's file-tracing root.
  outputFileTracingRoot: path.resolve(__dirname),
};

export default nextConfig;
