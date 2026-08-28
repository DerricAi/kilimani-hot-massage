# Local SEO Checklist — Kilimani Hot Massage

Distilled from **BM Challenge Official Document** and **New Local SEO Clients For ProfResults**. Pillars: **GBP · Onsite · Citations**. Completeness wins.

**NAP lock (exact string match everywhere):**  
Kilimani Hot Massage · 0746 203398 · Marcus Garvey Rd, Nairobi

Primary keyword focus: `Massage Spa Kilimani` / `massage Lavington Nairobi`

---

## A. Benchmarking (ops)

See **[docs/ops/BENCHMARK.md](ops/BENCHMARK.md)**.

- [ ] GBP + website access confirmed
- [ ] Heatmap baseline on `massage spa Lavington` and `massage Kilimani` (Leadsnap or equivalent)
- [ ] Note top-10 review counts and photo counts; flag fake Map spam
- [ ] Run `site:lavingtonhotmassage.co.ke` — target ≫ 30 indexed URLs
- [ ] Validate schema at https://validator.schema.org/
- [ ] Confirm homepage + footer Google Maps embeds load

## B. Website easy wins (onsite — shipped)

- [x] NAP 100% match in footer, contact (`site.napFooter` verbatim), and DaySpa JSON-LD
- [x] Homepage title includes BEST + category + city + services + near me + brand
- [x] Homepage H1 = Massage Spa Kilimani (category + city)
- [x] Prominent services as **H2** on homepage (top treatments) + full menu
- [x] Map embed on homepage and sitewide footer
- [x] DaySpa / LocalBusiness schema (honest `sameAs`; **no fake AggregateRating**)
- [x] **Areas** in main nav → `/areas/`
- [x] Breadcrumbs + BreadcrumbList JSON-LD on hubs and nested pages
- [x] Twitter card + Open Graph helpers (`src/lib/seo.ts`)
- [x] Canonical URLs preserve trailing slash (`absoluteUrl`)
- [x] Clear Call / WhatsApp CTAs
- [x] Human copy — no ALL-CAPS keyword-stuffed titles

## C. On-page depth (ProfResults advanced — shipped)

- [x] All 11 treatment pages ≥1,500 words + 6–10 FAQs + section H2s
- [x] Tier A area hubs ≥1,200 words + 8–10 FAQs + FAQ schema; Tier B enriched + generated FAQs
- [x] Tier A area×service / area×masseuse combos: expanded paragraphs + FAQs + FAQ JSON-LD
- [x] Guides silo: 10 articles ≥1,200 words each + FAQs
- [x] Masseuse bios expanded + 4–6 FAQs each
- [x] Homepage FAQs = 8 with FAQ schema
- [x] Service pages interlink all Tier A area×service URLs + “see all areas”
- [x] Geotagged WebP media pack under `public/images/` + `next/image` alts (`src/content/media.ts`)
- [x] Geotag script: `node scripts/geotag-images.mjs` (see [ops/GEOTAG_SOP.md](ops/GEOTAG_SOP.md))

## D. Interlinking rules

- [x] Service pages link to Tier A area×service pages + “We serve these areas”
- [x] Area pages list **all** services and **all** masseuses with nested URLs
- [x] Home + contact link to Areas and Treatments
- [x] Varied anchors; in-body / mid-page sections (not footer-only)
- [x] No orphan important URLs (matrix + hubs interlink)

## E. GBP optimization (client ops)

See **[docs/ops/GBP_SETUP.md](ops/GBP_SETUP.md)**, **[GBP_SERVICES_LIST.md](ops/GBP_SERVICES_LIST.md)**, **[GBP_FAQS.md](ops/GBP_FAQS.md)**.

- [ ] Main category: **Massage Spa** (1 main + 0–3 secondary max)
- [ ] Complete profile green: address, phone, website, 24/7 hours
- [ ] Bookings / appointments link → Contact page
- [ ] Services list up to 99; ≤300-character descriptions for top ~20
- [ ] GBP FAQs (location-specific)
- [ ] Weekly posts 1–2× about services
- [ ] Weekly photos; geotag for Lavington first, then Kilimani / Kileleshwa / Westlands
- [ ] Match social NAP to GBP when profiles exist (`site.socials` when client supplies URLs)
- [ ] Steady review-ask cadence after happy visits — never buy reviews

## F. Citations (Kenya 80/20)

See **[docs/ops/CITATIONS_TRACKER.md](ops/CITATIONS_TRACKER.md)**.

### Core

- [ ] Bing Places — https://www.bing.com/forbusiness/
- [ ] Apple Business Connect — https://businessconnect.apple.com/
- [ ] Facebook Business Page (NAP + hours + website)
- [ ] Foursquare Business — https://foursquare.com/products/business-listings/

### Kenya / niche directories

- [ ] Ask AI / mine SERPs for `massage Lavington`, `massage spa Nairobi` directories
- [ ] Claim relevant Kenya business directories and tourism/wellness lists
- [ ] Automotive nav / maps partners where available (TomTom, HERE, etc.)

## G. Weekly cadence

See **[docs/ops/WEEKLY_CADENCE.md](ops/WEEKLY_CADENCE.md)**.

- [ ] Fixed update day (e.g. Friday) if agency-managed
- [ ] Weekly GBP post + geotagged photo
- [ ] Monitor rankings vs heatmap baseline
- [ ] White-hat only — report clear fake Map spam; never attack real businesses

## H. Schema honesty rules

- DaySpa `sameAs`: WhatsApp + Maps + **only real social URLs** in `site.socials`
- **Never invent `AggregateRating`** — add only with live Google rating/count from client
- FAQPage on home, treatments, areas, Tier A combos, guides
- BreadcrumbList on hubs and nested templates

## Master status

| Pillar | Status |
| --- | --- |
| Onsite SEO basic | Shipped |
| Onsite SEO advanced (depth + FAQs + media + tech) | Shipped |
| GBP | Ops package in `docs/ops/` — client execution |
| Citations | Ops tracker in `docs/ops/` — client execution |
| Weekly schedule | Cadence templates in `docs/ops/` — client execution |
