// One-off generator for neutral placeholder imagery so the site builds and
// lays out correctly before the client's real photography lands. Delegates
// to a Python/Pillow script for richer gradient + frame + crown treatment
// than sharp's SVG rasterisation could give cleanly.
// Not part of the build pipeline — run manually, then delete if unneeded.
import { execSync } from "node:child_process";

execSync("python3 scripts/make-placeholders.py", { stdio: "inherit" });
