"""Generate neutral placeholder imagery: a soft grayscale radial ground, a
large translucent crown watermark, and a tracked caps label — pure black
and white, matching the cinematic hero film. No colour, no boxed framing.

Not part of the build pipeline. Run manually:  python3 scripts/make-placeholders.py
"""

import math
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

INK = (10, 10, 10)
INK_LIFT = (28, 28, 28)  # gradient centre, a touch lighter than the ground
IVORY = (243, 243, 241)

LOGO_SRC = "public/brand/logo-white.png"
CROWN_BOX = (455, 325, 625, 400)

SERIF_PATHS = [
    "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
]


def font(size, paths=SERIF_PATHS):
    for p in paths:
        try:
            return ImageFont.truetype(p, size)
        except OSError:
            continue
    return ImageFont.load_default()


def radial_gradient(w, h):
    yy, xx = np.mgrid[0:h, 0:w]
    cx, cy = w / 2, h * 0.42
    max_r = math.hypot(max(cx, w - cx), max(cy, h - cy))
    dist = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2) / max_r
    dist = np.clip(dist, 0, 1)
    t = dist[..., None]
    center = np.array(INK_LIFT, dtype=np.float32)
    edge = np.array(INK, dtype=np.float32)
    rgb = center * (1 - t) + edge * t
    return Image.fromarray(rgb.astype(np.uint8), "RGB")


def tracked_text(draw, xy, text, fnt, fill, tracking, anchor_center_x=None):
    widths = [draw.textlength(ch, font=fnt) for ch in text]
    total = sum(widths) + tracking * (len(text) - 1)
    x = (anchor_center_x - total / 2) if anchor_center_x is not None else xy[0]
    y = xy[1]
    for ch, w in zip(text, widths):
        draw.text((x, y), ch, font=fnt, fill=fill)
        x += w + tracking
    return total


def base_ground(w, h, crown):
    base = radial_gradient(w, h).convert("RGBA")

    # faint vignette
    vignette = Image.new("L", (w, h), 0)
    vd = ImageDraw.Draw(vignette)
    vd.ellipse([-w * 0.2, -h * 0.25, w * 1.2, h * 1.1], fill=70)
    vignette = vignette.filter(ImageFilter.GaussianBlur(min(w, h) * 0.12))
    dark = Image.new("RGBA", (w, h), (*INK, 255))
    base = Image.composite(base, dark, vignette)

    draw = ImageDraw.Draw(base, "RGBA")

    # large translucent crown watermark, centred — texture only, no text
    wm_scale = min(w, h) * 0.62 / crown.width
    wm = crown.resize((max(1, int(crown.width * wm_scale)), max(1, int(crown.height * wm_scale))), Image.LANCZOS)
    wm_alpha = wm.split()[3].point(lambda a: int(a * 0.05))
    wm.putalpha(wm_alpha)
    base.alpha_composite(wm, ((w - wm.width) // 2, int(h * 0.5 - wm.height / 2)))

    return base, draw


def make_placeholder(w, h, label, crown):
    """Labeled placeholder for gallery category slots — the image IS the content."""
    base, draw = base_ground(w, h, crown)

    crisp_scale = min(w, h) * 0.09 / crown.width
    crisp = crown.resize(
        (max(1, int(crown.width * crisp_scale)), max(1, int(crown.height * crisp_scale))), Image.LANCZOS
    )
    crisp_alpha = crisp.split()[3].point(lambda a: int(a * 0.85))
    crisp.putalpha(crisp_alpha)
    label_font = font(int(min(w, h) * 0.032))
    rule_y = h * 0.5

    base.alpha_composite(crisp, ((w - crisp.width) // 2, int(rule_y - crisp.height - min(w, h) * 0.05)))

    # rule - label - rule, echoing the logo's own structure
    rule_w = min(w, h) * 0.16
    cx = w / 2
    draw.line([(cx - rule_w, rule_y), (cx - rule_w * 0.22, rule_y)], fill=(*IVORY, 130), width=1)
    draw.line([(cx + rule_w * 0.22, rule_y), (cx + rule_w, rule_y)], fill=(*IVORY, 130), width=1)
    draw.ellipse([cx - 2.5, rule_y - 2.5, cx + 2.5, rule_y + 2.5], fill=(*IVORY, 170))

    tracked_text(
        draw,
        (0, rule_y + min(w, h) * 0.02),
        label.upper(),
        label_font,
        (*IVORY, 220),
        tracking=min(w, h) * 0.012,
        anchor_center_x=cx,
    )

    return base.convert("RGB")


def make_atmosphere(w, h, crown):
    """Textural placeholder for backgrounds real UI copy sits on top of —
    no baked-in text or crisp crown, so it never collides with the real
    logo/heading rendered over it by the page."""
    base, _draw = base_ground(w, h, crown)
    return base.convert("RGB")


def main():
    logo = Image.open(LOGO_SRC).convert("RGBA")
    crown = logo.crop(CROWN_BOX)

    categories = [
        ("weddings", "Wedding Suits", 3),
        ("business", "Business Suits", 3),
        ("black-tie", "Black Tie", 3),
        ("made-to-measure", "Made to Measure", 3),
    ]
    sizes = [(1600, 2000), (2000, 1600), (1800, 1800)]

    for slug, label, n in categories:
        os.makedirs(f"public/gallery/{slug}", exist_ok=True)
        for i in range(1, n + 1):
            w, h = sizes[(i - 1) % len(sizes)]
            featured = "-featured" if i == 1 else ""
            name = f"0{i}_{slug}-placeholder-{i}{featured}.jpg"
            img = make_placeholder(w, h, label, crown)
            img.save(f"public/gallery/{slug}/{name}", quality=86)
            print("wrote", name)

    # Backgrounds real page copy sits on top of — atmosphere only, no text.
    home = [
        ("about-portrait.jpg", 1400, 1750),
        ("process-01.jpg", 1400, 1750),
        ("process-02.jpg", 1400, 1750),
        ("process-03.jpg", 1400, 1750),
        ("process-04.jpg", 1400, 1750),
    ]
    for name, w, h in home:
        img = make_atmosphere(w, h, crown)
        img.save(f"public/home/{name}", quality=86)
        print("wrote", name)


if __name__ == "__main__":
    main()
