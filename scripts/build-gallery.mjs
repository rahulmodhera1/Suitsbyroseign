// Walks public/gallery/*, reads real dimensions and generates blur
// placeholders, and writes content/gallery.generated.json for lib/gallery.ts.
// Runs at build time (see "prebuild" in package.json) — never in the browser.
import { readdirSync, statSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, extname, basename } from "node:path";
import sizeOf from "image-size";
import sharp from "sharp";

const GALLERY_ROOT = "public/gallery";
const OUT_FILE = "content/gallery.generated.json";
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const MAX_WARN_BYTES = 3 * 1024 * 1024;

const EXPECTED_CATEGORIES = ["weddings", "business", "black-tie", "made-to-measure"];

function titleCase(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function parseFilename(filename) {
  const ext = extname(filename);
  const base = basename(filename, ext);
  const match = base.match(/^(\d+)_(.+)$/);
  const order = match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
  let slug = match ? match[2] : base;
  const featured = /-featured$/.test(slug);
  if (featured) slug = slug.replace(/-featured$/, "");
  return { order, slug, caption: titleCase(slug), featured };
}

async function blurDataURL(path) {
  const buf = await sharp(path).resize(12).blur().jpeg({ quality: 40 }).toBuffer();
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

async function main() {
  let categoryDirs;
  try {
    categoryDirs = readdirSync(GALLERY_ROOT, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
  } catch {
    throw new Error(
      `Gallery build failed: "${GALLERY_ROOT}" is missing. Create it with one folder per category.`
    );
  }

  for (const expected of EXPECTED_CATEGORIES) {
    if (!categoryDirs.includes(expected)) {
      throw new Error(
        `Gallery build failed: expected category folder "${GALLERY_ROOT}/${expected}" is missing.`
      );
    }
  }

  const categories = {};

  for (const category of categoryDirs) {
    const dirPath = join(GALLERY_ROOT, category);
    const entries = readdirSync(dirPath);

    let meta = {};
    if (entries.includes("meta.json")) {
      meta = JSON.parse(readFileSync(join(dirPath, "meta.json"), "utf-8"));
    }

    const images = [];

    for (const filename of entries) {
      if (filename.startsWith(".") || filename === "README.md" || filename === "meta.json") continue;
      const ext = extname(filename).toLowerCase();
      if (!IMAGE_EXT.has(ext)) continue;

      const filePath = join(dirPath, filename);
      const stat = statSync(filePath);
      if (stat.size > MAX_WARN_BYTES) {
        console.warn(
          `[gallery] warning: ${filePath} is ${(stat.size / 1024 / 1024).toFixed(1)}MB — export smaller than 3MB.`
        );
      }

      const dims = sizeOf(readFileSync(filePath));
      const parsed = parseFilename(filename);
      const override = meta[filename] ?? {};

      images.push({
        src: `/gallery/${category}/${filename}`,
        category,
        order: parsed.order,
        slug: parsed.slug,
        width: dims.width,
        height: dims.height,
        caption: override.caption ?? parsed.caption,
        alt: override.alt ?? `${parsed.caption} — ${titleCase(category)}`,
        location: override.location ?? null,
        featured: override.featured ?? parsed.featured,
        blurDataURL: await blurDataURL(filePath),
      });
    }

    images.sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
    categories[category] = images;
  }

  mkdirSync("content", { recursive: true });
  writeFileSync(OUT_FILE, JSON.stringify({ categories }, null, 2));
  const total = Object.values(categories).reduce((n, arr) => n + arr.length, 0);
  console.log(`[gallery] wrote ${OUT_FILE} (${total} images across ${categoryDirs.length} categories)`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
