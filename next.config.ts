import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // next/image only renders remote hosts explicitly allow-listed here.
    // All site imagery is currently royalty-free stock hotlinked from
    // Unsplash (Unsplash License); YouTube thumbnails back the video
    // placeholders. Swap a data-file path for a local /public asset later
    // and it keeps working with no config change.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
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
