# Suits By Roseign — website guide

This is a short guide for keeping the site up to date. No coding knowledge needed for the day-to-day changes below.

## Adding photos

1. Open the `public/gallery` folder in this repository.
2. Drop a JPG or WebP photo into the right folder: `weddings`, `business`, `black-tie`, or `made-to-measure`.
3. Name the file `01_a-short-description.jpg` (numbers control the order, the words become the caption). Add `-featured` before `.jpg` to feature a photo more prominently — e.g. `03_ivory-tuxedo-featured.jpg`.
4. Commit the change (or use GitHub's "Upload files" button in the folder).

Full details, including how to set a custom caption or location, are in `public/gallery/README.md`.

The photos currently in those folders are placeholders (plain dark panels with the category name). Delete them once real photography is in place.

## Changing testimonials

Open `content/testimonials.json` and edit the `quote`, `name`, and `occasion` fields, or add a new entry in the same format. Save and commit.

## How a change goes live

This site is connected to Vercel. Any change committed to the main branch on GitHub is automatically built and published, usually within a couple of minutes. You don't need to do anything beyond saving your change in GitHub.

## Bookings

Every "Book a fitting" button on the site opens your Calendly page in a new tab. To change where they point, edit the `CALENDLY_URL` line at the top of `lib/site.ts` — that one line controls every booking button on the site.

## If something breaks

Contact the developer who built this site. If you don't have that contact on hand, any web developer can pick this up: it's a standard Next.js project with no unusual dependencies.
