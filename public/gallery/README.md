# Adding photos

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

**The images currently in these folders are placeholders** — plain dark panels with the category name — so the site has something to show before real photography is in. Delete them once you've added real photos.
