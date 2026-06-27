# The Birthday Almanac

An interactive museum of influential birthdays. Explore **549 consequential lives**
across 21 fields and four millennia — by birthday, month, zodiac sign, field, era,
century, country, and civilization.

The entire app is a single, self-contained `index.html`: no build step, no
dependencies, no tracking. Open it in a browser and it runs.

## Sections

- **Discover** — the landing experience: today in history, birthdays this week and
  month, the most crowded birthdays, a daily "pattern of the day," a featured
  collection of the day, your recently viewed and saved people, and quick ways to
  start exploring by field, century, zodiac, and collection.
- **Zodiac Explorer** — every figure by sun sign and element (Fire / Earth / Air /
  Water), with per-sign detail pages (date range, modality, ruling planet, most
  famous people, field and century breakdowns, kindred signs) and "cosmic patterns"
  charts (which sign has the most leaders, scientists, artists, athletes; which
  element dominates; which signs are most precisely dated).
- **Collections** — 18 curated, shareable journeys (Greatest Minds in Science,
  Movie Legends, Technology & Internet Pioneers, Women Who Changed History, The
  Ancient World, and more), each with stats and a one-tap "open in People."
- **Calendar** — a month grid with a today / next-birthday banner, density tints,
  count badges, category color dots, jump-to-month, and keyboard month navigation.
  Click any day for a clean day-detail panel.
- **People** — every figure, searchable, sortable (birth date, year, name, field,
  influence tier, birthday-soon, oldest/newest, most reliable/uncertain date), grouped
  and lazily paged for speed.
- **Categories** — each field as a premium "museum room" card: counts, peak birth
  month, most common sign, oldest and newest figures, and featured names.
- **Timeline** — every dated figure placed across five eras by birth year.
- **Patterns** — interactive charts (month, zodiac, field, century, era, region, date
  confidence, crowded birthdays). Every bar is clickable and carries a plain-English
  summary of what it shows.

## Exploring

- **Rich person cards** — bio, origin, region, era/century, date confidence,
  collection, source link, and "rabbit-hole" links: birthday twins, fellow members of
  the same field, and others who share the zodiac sign. Move with Prev / Next or hit
  **Surprise me**.
- **Powerful search** across name, bio, field, country, region, zodiac, century, and
  era — with quick-filter chips and clear, removable active-filter pills.
- **Built-in validation** — a "Validation & tests" panel groups data checks
  (identity, dates, zodiac, completeness, vocabulary) and runs unit tests in-browser.
- **Accessible** — real buttons, ARIA labels, visible focus, keyboard navigation, a
  modal focus trap, Escape-to-close, and reduced-motion support.

## Data

Each record carries name, field (category), birth year/month/day, era, date status,
zodiac, a short description and bio, country or civilization, sex, source URL with a
confidence flag, and an optional `calendarNote`. On load the app derives **century**,
**era group**, **region**, an **importance tier** (Legendary / Major / Notable /
Personal — replacing the old Top 100 flag), and a **collection**, and normalizes
country values. Dates use the Gregorian calendar; figures born under the Julian
calendar carry a `calendarNote` explaining the Old Style / New Style conversion.

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

A GitHub Actions workflow (`.github/workflows/deploy.yml`) publishes the site to
GitHub Pages on every push to `main`.

One-time setup: **Settings → Pages → Build and deployment → Source: *GitHub
Actions***. After a push, the workflow runs and the site is live at
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
