import raw from "@/content/gallery.generated.json";

export type WorkItem = {
  /** Videos render as a muted, looping <video>; images as a next/image. */
  type: "image" | "video";
  src: string;
  /** Still frame shown before a video plays. Always null for images. */
  poster: string | null;
  category: string;
  order: number;
  slug: string;
  width: number;
  height: number;
  caption: string;
  alt: string;
  location: string | null;
  featured: boolean;
  blurDataURL: string;
};

const data = raw as { categories: Record<string, WorkItem[]> };

export const CATEGORY_LABELS: Record<string, string> = {
  weddings: "Wedding Suits",
  business: "Business Suits",
  "black-tie": "Black Tie",
  "made-to-measure": "Made-to-Measure",
};

export function getAllWork(): WorkItem[] {
  return Object.values(data.categories).flat();
}

export function getWorkByCategory(category: string): WorkItem[] {
  return data.categories[category] ?? [];
}

export function getFeaturedWork(limit = 6): WorkItem[] {
  const featured = getAllWork().filter((img) => img.featured);
  const pool = featured.length >= limit ? featured : getAllWork();
  return pool.slice(0, limit);
}

export function getCategories(): string[] {
  return Object.keys(data.categories);
}
