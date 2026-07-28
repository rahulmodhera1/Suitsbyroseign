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
const VIDEO_EXT = new Set([".mp4", ".webm"]);
const MAX_WARN_BYTES = 3 * 1024 * 1024;
const MAX_WARN_VIDEO_BYTES = 8 * 1024 * 1024;

// Each video ships a companion still named "<name>.poster.jpg". The poster is
// what the grid shows before playback starts, and it is also where the video's
// dimensions and blur placeholder come from — the deploy has no ffmpeg, so
// nothing here can decode a video frame at build time.
const POSTER_SUFFIX = ".poster";

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

    const items = [];

    for (const filename of entries) {
      if (filename.startsWith(".") || filename === "README.md" || filename === "meta.json") continue;
      const ext = extname(filename).toLowerCase();
      const isVideo = VIDEO_EXT.has(ext);
      // Posters are companions to a video, never gallery entries of their own.
      if (basename(filename, ext).endsWith(POSTER_SUFFIX)) continue;
      if (!isVideo && !IMAGE_EXT.has(ext)) continue;

      const filePath = join(dirPath, filename);
      const stat = statSync(filePath);
      const limit = isVideo ? MAX_WARN_VIDEO_BYTES : MAX_WARN_BYTES;
      if (stat.size > limit) {
        console.warn(
          `[gallery] warning: ${filePath} is ${(stat.size / 1024 / 1024).toFixed(1)}MB — export smaller than ${limit / 1024 / 1024}MB.`
        );
      }

      // A video's dimensions and blur placeholder are read off its poster,
      // which is the one frame of it this script can actually decode.
      let posterFile = null;
      if (isVideo) {
        posterFile = `${basename(filename, ext)}${POSTER_SUFFIX}.jpg`;
        if (!entries.includes(posterFile)) {
          throw new Error(
            `Gallery build failed: ${filePath} has no poster. Add "${join(dirPath, posterFile)}" ` +
              `(one frame of the video, same dimensions) next to it.`
          );
        }
      }
      const measuredPath = isVideo ? join(dirPath, posterFile) : filePath;

      const dims = sizeOf(readFileSync(measuredPath));
      const parsed = parseFilename(filename);
      const override = meta[filename] ?? {};

      items.push({
        type: isVideo ? "video" : "image",
        src: `/gallery/${category}/${filename}`,
        poster: isVideo ? `/gallery/${category}/${posterFile}` : null,
        category,
        order: parsed.order,
        slug: parsed.slug,
        width: dims.width,
        height: dims.height,
        caption: override.caption ?? parsed.caption,
        alt: override.alt ?? `${parsed.caption} — ${titleCase(category)}`,
        location: override.location ?? null,
        featured: override.featured ?? parsed.featured,
        blurDataURL: await blurDataURL(measuredPath),
      });
    }

    items.sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
    categories[category] = items;
  }

  mkdirSync("content", { recursive: true });
  writeFileSync(OUT_FILE, JSON.stringify({ categories }, null, 2));
  const all = Object.values(categories).flat();
  const videos = all.filter((i) => i.type === "video").length;
  console.log(
    `[gallery] wrote ${OUT_FILE} (${all.length - videos} images, ${videos} videos across ${categoryDirs.length} categories)`
  );
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
