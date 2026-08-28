# Geotag SOP — Lavington then heatmap cells

Part of [LOCAL_SEO_MASTER_CHECKLIST.md](../LOCAL_SEO_MASTER_CHECKLIST.md) — **Phase 2** (GBP photos) and **Phase 6** (weekly cadence).

Goal: photos carry GPS near the studio, then expand to weak-map cells.

## Studio coordinates (default)

- **Latitude:** -1.2921 (S)
- **Longitude:** 36.7820 (E)
- **Place:** Marcus Garvey Rd / Lavington, Nairobi

Repo helper: `node scripts/geotag-images.mjs` (requires `exiftool`).

## Tools

- https://tool.geoimgr.com/
- GeoSetter (desktop)
- `exiftool` CLI (used in this repo)

## Workflow

1. Export WebP/JPEG with descriptive local filenames  
   Example: `swedish-massage-kilimani-suite.webp`
2. Strip junk metadata if needed, then write GPS:
   ```bash
   exiftool -overwrite_original \
     -GPSLatitude=1.2921 -GPSLatitudeRef=S \
     -GPSLongitude=36.7820 -GPSLongitudeRef=E \
     path/to/photo.webp
   ```
3. Or run: `node scripts/geotag-images.mjs` for everything in `public/images/`
4. Upload to GBP (and site `public/images/` when used on pages)
5. For Kilimani / Westlands / Kileleshwa heatmap pushes, geotag a *separate* outdoor/context photo set to those cell coordinates—never fake indoor studio GPS as another neighbourhood for the same room shot

## Alts (website)

Use location-true alts via `src/content/media.ts` and `next/image`.

## Do not

- Steal competitor photos
- Geotag stock photos as if shot in Kilimani when they were not (prefer original suite shots)
- Upload explicit imagery to GBP
