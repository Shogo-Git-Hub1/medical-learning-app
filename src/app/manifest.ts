import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "医療学習アプリ",
    short_name: "医療学習",
    description: "資格・試験対策 × 科目別で学ぶ、継続したくなる医療系学習",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#58cc02",
    orientation: "portrait",
    scope: "/",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
