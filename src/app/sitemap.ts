import type { MetadataRoute } from "next";
import { dragonRegions } from "@/data/dragons";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://dragon-map.vercel.app",
      lastModified: new Date("2026-03-31"),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...dragonRegions.map((dragon) => ({
      url: `https://dragon-map.vercel.app/dragons/${dragon.id}`,
      lastModified: new Date("2026-03-31"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
