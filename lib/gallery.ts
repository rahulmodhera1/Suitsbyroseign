import raw from "@/content/gallery.generated.json";

export type WorkImage = {
  src: string;
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

const data = raw as { categories: Record<string, WorkImage[]> };

export const CATEGORY_LABELS: Record<string, string> = {
  weddings: "Wedding Suits",
  business: "Business Suits",
  "black-tie": "Black Tie",
  "made-to-measure": "Made-to-Measure",
};

export function getAllWork(): WorkImage[] {
  return Object.values(data.categories).flat();
}

export function getWorkByCategory(category: string): WorkImage[] {
  return data.categories[category] ?? [];
}

export function getFeaturedWork(limit = 6): WorkImage[] {
  const featured = getAllWork().filter((img) => img.featured);
  const pool = featured.length >= limit ? featured : getAllWork();
  return pool.slice(0, limit);
}

export function getCategories(): string[] {
  return Object.keys(data.categories);
}
