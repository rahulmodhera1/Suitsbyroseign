// One-off generator for neutral placeholder imagery so the site builds and
// lays out correctly before the client's real photography lands.
// Not part of the build pipeline — run manually, then delete if unneeded.
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const INK = "#0c0b0a";
const BRASS = "#a9884f";
const IVORY = "#f2eee7";

function svg(label, w, h) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <rect width="100%" height="100%" fill="${INK}"/>
    <rect x="${w * 0.08}" y="${h * 0.08}" width="${w * 0.84}" height="${h * 0.84}" fill="none" stroke="${BRASS}" stroke-width="1"/>
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
      font-family="Georgia, serif" font-size="${Math.min(w, h) * 0.055}" letter-spacing="6"
      fill="${IVORY}" opacity="0.85">${label.toUpperCase()}</text>
  </svg>`;
}

const categories = [
  { slug: "weddings", label: "Weddings", n: 3 },
  { slug: "suiting", label: "Suiting", n: 3 },
  { slug: "womenswear", label: "Womenswear", n: 2 },
  { slug: "juniors", label: "Juniors", n: 2 },
  { slug: "editorial", label: "Editorial", n: 3 },
];

const sizes = [
  [1600, 2000],
  [2000, 1600],
  [1800, 1800],
];

for (const cat of categories) {
  mkdirSync(`public/gallery/${cat.slug}`, { recursive: true });
  for (let i = 1; i <= cat.n; i++) {
    const [w, h] = sizes[(i - 1) % sizes.length];
    const featured = i === 1 ? "-featured" : "";
    const name = `0${i}_${cat.slug}-placeholder-${i}${featured}.jpg`;
    await sharp(Buffer.from(svg(cat.label, w, h)))
      .jpeg({ quality: 82 })
      .toFile(`public/gallery/${cat.slug}/${name}`);
    console.log("wrote", name);
  }
}

// Home hero + about + process placeholders
mkdirSync("public/home", { recursive: true });
const home = [
  ["hero.jpg", 2400, 1350, "Suits By Roseign"],
  ["hero-mobile.jpg", 1200, 1500, "Suits By Roseign"],
  ["about-portrait.jpg", 1400, 1750, "Roseign"],
  ["process-01.jpg", 1400, 1750, "Consultation"],
  ["process-02.jpg", 1400, 1750, "Cloth and Cut"],
  ["process-03.jpg", 1400, 1750, "Measurement"],
  ["process-04.jpg", 1400, 1750, "Fitting"],
];
for (const [name, w, h, label] of home) {
  await sharp(Buffer.from(svg(label, w, h)))
    .jpeg({ quality: 82 })
    .toFile(`public/home/${name}`);
  console.log("wrote", name);
}
