"""Regenerate public/brand favicon/icon/OG assets from logo-white.png.

Crops a tight region around the crown mark for the small icon sizes (the
full wordmark isn't legible at 32px) and centres the full lockup for the
social share image. Run manually after replacing logo-white.png:

    python3 scripts/generate-favicons.py
"""

from PIL import Image

SRC = "public/brand/logo-white.png"
INK = (12, 11, 10)
# Crop box (left, top, right, bottom) around the crown, tuned for the
# supplied 1080x1080 lockup. Re-tune if a differently proportioned logo
# is dropped in.
CROWN_BOX = (455, 325, 625, 400)


def make_icon(source, size, pad_ratio=0.22):
    canvas = Image.new("RGBA", (size, size), (*INK, 255))
    pad = int(size * pad_ratio)
    inner = size - pad * 2
    scale = min(inner / source.width, inner / source.height)
    w, h = max(1, int(source.width * scale)), max(1, int(source.height * scale))
    resized = source.resize((w, h), Image.LANCZOS)
    x, y = (size - w) // 2, (size - h) // 2
    canvas.paste(resized, (x, y), resized)
    return canvas.convert("RGB")


def main():
    im = Image.open(SRC).convert("RGBA")
    crown = im.crop(CROWN_BOX)

    make_icon(crown, 512).save("public/brand/icon-512.png")
    make_icon(crown, 192).save("public/brand/icon-192.png")
    make_icon(crown, 32).save("public/brand/favicon-32.png")
    make_icon(crown, 16).save("public/brand/favicon-16.png")
    make_icon(crown, 32).save("public/brand/favicon.ico", format="ICO", sizes=[(32, 32), (16, 16)])

    canvas = Image.new("RGB", (1200, 630), INK)
    scale = 480 / im.height
    w, h = int(im.width * scale), int(im.height * scale)
    resized = im.resize((w, h), Image.LANCZOS)
    x, y = (1200 - w) // 2, (630 - h) // 2
    canvas.paste(resized, (x, y), resized)
    canvas.save("public/brand/og-image.jpg", quality=90)

    print("Wrote favicon/icon/OG assets to public/brand/")


if __name__ == "__main__":
    main()
