# Kilimani Hot Massage

Premium local-SEO website for **Kilimani Hot Massage** — a 24/7 massage spa on Marcus Garvey Rd, Kilimani, Nairobi.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Static generation for treatments, masseuses, and the full Nairobi Areas × Services × Masseuses matrix

## NAP (do not alter)

- **Name:** Kilimani Hot Massage  
- **Phone / WhatsApp:** 0746 203398 (`https://wa.me/254746203398`)  
- **Address:** Marcus Garvey Rd, Nairobi  
- **Hours:** Open 24 Hours (7 days a week)  
- **Maps:** https://maps.app.goo.gl/NVziTQTftBG5TgVs8  

## Run locally

```bash
npm install
npm run dev
```

App runs at [http://127.0.0.1:43127](http://127.0.0.1:43127).

```bash
npm run build
npm start
```

## Key routes

| Path | Purpose |
| --- | --- |
| `/` | Homepage |
| `/massage-treatments/` | Treatments hub + 12 service pages |
| `/masseuses/` | Masseuse hub + 6 profiles |
| `/guides/` | Topical guides hub + articles |
| `/areas/` | Nairobi County hub |
| `/areas/[area]/` | Area hub (all services + masseuses) |
| `/areas/[area]/services/[service]/` | Area × service |
| `/areas/[area]/masseuses/[masseuse]/` | Area × masseuse |
| `/about-us/` | About |
| `/contact/` | Contact + map |

## Local SEO checklist

See [docs/LOCAL_SEO_MASTER_CHECKLIST.md](docs/LOCAL_SEO_MASTER_CHECKLIST.md) for the unified onsite, GBP, citations, and weekly ops checklist.

**Live vs repo audit:** `npm run audit:live` — report at [docs/ops/LIVE_METADATA_AUDIT.md](docs/ops/LIVE_METADATA_AUDIT.md).

## Production deploy

Production at `https://kilimanihotmassage.co.ke` must be rebuilt from **`main`** after each release:

```bash
npm ci
npm run build
npm run check:titles
npm run check:keywords
npm run audit:live   # after deploy — expect Wave 2/5 green when live matches repo
```

Deploy the `.next` static output (or your host’s Next.js build step) to the production host, then re-run `npm run audit:live` and update checklist items from `🔍 Verify live` to `✅ Verified live` when the audit passes.

## Image geotagging

Optional helper:

```bash
node scripts/geotag-images.mjs
```

Writes GPS near Marcus Garvey Rd, Kilimani (`-1.293566, 36.76345`) onto images in `public/images/` when EXIF tooling is available.
