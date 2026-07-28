# Adding photos and videos

You do not need to touch any code. Follow these rules and the site updates the next time it deploys.

1. **Drop a JPG or WebP into the right folder** — `weddings`, `business`, `black-tie`, or `made-to-measure`. That's the whole workflow.
2. **The filename controls order and caption.** Use the format `NN_slug-in-words.jpg`:
   - `01_akshi-and-bibeson.jpg` sorts first and shows the caption "Akshi And Bibeson".
   - Files without a number sort after the numbered ones, alphabetically.
3. **To feature an image on the homepage and larger in the grid**, add `-featured` to the end of the slug: `03_ivory-tuxedo-featured.jpg`.
4. Landscape or portrait both work — the grid adapts automatically.
5. To set a custom caption, alt text, or location instead of relying on the filename, add a `meta.json` file inside the category folder:

```json
{
  "01_akshi-and-bibeson.jpg": {
    "alt": "Groom in a navy three-piece with his bride at a Toronto venue",
    "caption": "Akshi & Bibeson",
    "location": "Mississauga, ON",
    "featured": true
  }
}
```

The `meta.json` values always win over what's guessed from the filename.

## Adding a video

Videos follow all the same naming rules, plus one extra step.

1. **Drop an MP4 into a category folder**, named the same way: `01_navy-on-set.mp4`.
2. **Add a poster image beside it** with `.poster.jpg` on the end of the same
   name: `01_navy-on-set.poster.jpg`. This should be one frame of the video, at
   the same dimensions. The build reads the video's size and blur placeholder
   from it, and the grid shows it until the clip starts playing. **The build
   will fail with a message naming the missing file if you forget it** — that
   is deliberate, because a video without a poster shows as an empty tile.
3. Videos play **muted and on a loop**, and start only once scrolled into view.
   Strip the audio before adding one — the site never plays sound:

   ```
   ffmpeg -i input.mp4 -an -c:v libx264 -crf 26 -movflags +faststart 01_navy-on-set.mp4
   ffmpeg -ss 3 -i 01_navy-on-set.mp4 -frames:v 1 -q:v 4 01_navy-on-set.poster.jpg
   ```

4. Keep clips under about 8MB — the build warns above that.

Everything on the site, photo and video alike, renders in black and white. That
is deliberate (see the `.photo` rule in `app/globals.css`); colour footage is
desaturated so the whole page reads as one continuous editorial.
