# The Birthday Almanac

A reference of consequential lives, organized by birthday. Browse **551 historically
significant figures** across 23 fields — scientists, leaders, artists, athletes, and
more — through an interactive calendar, list, timeline, and charts.

The entire app is a single, self-contained `index.html`: no build step, no
dependencies, no tracking. Open it in a browser and it runs.

## Features

- **Four views** — Calendar (birthdays mapped across the year), List, Timeline, and Charts.
- **Search** — by name, field, country, or zodiac sign.
- **Filters** — by category, family of fields, month, and more, via the filter drawer.
- **Sorting** — by birth date, birth year, name, or category.
- **Figure detail** — each person opens a card with a short description, biography,
  birth date (with Old Style / New Style calendar notes where relevant), country or
  civilization, zodiac, and a sourced link.
- **Personal mode** — a small separate set for personal entries alongside the main dataset.
- **Built-in validation** — a "Validation & tests" panel sanity-checks the dataset
  (dates, zodiac assignments, required fields) in the browser.

## Data

Each entry records name, rank, category, birth year/month/day, era, date status,
zodiac, a short description and biography, country or civilization, sex, and a source
URL (mostly Wikipedia) with a confidence flag. Categories span science, mathematics,
medicine, invention, engineering, US presidents, world leaders, military, jurists,
religion, philosophy, economists, art, literature, music, film stars, film directors,
business, civil rights, explorers, athletes, and personal entries.

Dates use the Gregorian calendar; figures born under the Julian calendar carry a
`calendarNote` explaining the Old Style / New Style conversion.

## Running locally

No tooling required — open the file directly:

```sh
# macOS
open index.html

# Linux
xdg-open index.html
```

Or serve it over HTTP if you prefer:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deployment

The site is a static page, so GitHub Pages serves it straight from the branch —
no build, no workflow.

To enable it: **Settings → Pages → Build and deployment → Source: *Deploy from a
branch* → Branch: `main` / `/ (root)` → Save**. Within a minute the site is live at
`https://<owner>.github.io/<repo>/`.

## Project structure

```
.
├── index.html          # the entire application — markup, styles, data, and logic
├── assets/
│   └── hero-zodiac.jpg  # decorative illustration shown in the hero
└── README.md
```

The single file is internally organized into labeled sections (design tokens,
component styles, the `PEOPLE` dataset, category definitions, zodiac utilities, and
the view-rendering logic) for easy navigation.
