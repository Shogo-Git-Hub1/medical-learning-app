import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MediSpark",
    short_name: "MediSpark",
    description: "医学の学習に火をつける。科目別で学ぶ、継続したくなる医療系学習アプリ",
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
