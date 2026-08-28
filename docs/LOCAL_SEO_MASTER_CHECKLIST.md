# Local SEO Master Checklist — Kilimani Hot Massage

**Single source of truth** for local SEO delivery. Intertwines **BM Challenge Official Document** + **ProfResults New Local SEO Client Workflow** with Kilimani site audit status.

**Three pillars:** GBP · Onsite · Citations — held together by the **NAP golden thread**.

**Principle:** Completeness wins. Match or exceed top Map-pack competitors. White-hat only.

**NAP lock (verbatim everywhere):**  
`Kilimani Hot Massage · 0746 203398 · Marcus Garvey Rd, Nairobi`

**Primary keywords:** `Massage Spa Kilimani` · `massage Kilimani` · `massage Lavington Nairobi`

**Status legend:** ✅ Shipped · ⚠️ Gap · 👤 Client ops · 🔍 Verify post-launch

**Paste-ready appendices:** [GBP_SERVICES_LIST.md](ops/GBP_SERVICES_LIST.md) · [GBP_FAQS.md](ops/GBP_FAQS.md) · [CITATIONS_TRACKER.md](ops/CITATIONS_TRACKER.md) · [GEOTAG_SOP.md](ops/GEOTAG_SOP.md) · [BENCHMARK.md](ops/BENCHMARK.md)

---

## How to use this document

Work **Phase 0 → Phase 6** in order. ProfResults delivery typically maps to **Weeks 1–12** (noted per phase). Each checkbox preserves: **ID · status · technique · Prof rule · verify step · code target · pillar**.

> **Prof insight:** Close obvious gaps first (Phase 0–1) — expect a noticeable leap in weeks 4–6. Then GBP depth, onsite authority, citations, verify, and weekly maintenance.

---

## Quick audit commands

```bash
npm run build
npm run check:unique
node scripts/geotag-images.mjs   # after new images
```

**Index check (post-deploy):** `site:kilimanihotmassage.co.ke` — minimum 30 URLs; goal ≫ 30 (~2,175 in sitemap).

**Schema validator** (https://validator.schema.org/):

| Page | URL |
|------|-----|
| Home + DaySpa + FAQPage | https://kilimanihotmassage.co.ke/ |
| Treatment | https://kilimanihotmassage.co.ke/massage-treatments/swedish-massage/ |
| Tier-A area | https://kilimanihotmassage.co.ke/areas/lavington/ |
| Area×service combo | https://kilimanihotmassage.co.ke/areas/kilimani/services/deep-tissue-massage/ |
| Guide | https://kilimanihotmassage.co.ke/guides/how-to-book-24-7-spa-kilimani/ |
| Masseuse | https://kilimanihotmassage.co.ke/masseuses/amara/ |

**Sitemap:** https://kilimanihotmassage.co.ke/sitemap.xml · **Robots:** https://kilimanihotmassage.co.ke/robots.txt

---

## Phase 0 — Foundation (before any changes)

*Week 1 benchmarking. Establish NAP golden thread + competitive baseline. Nothing else until access and heatmap exist.*

### 0A — Access and competitive baseline · Pillar: all

- [ ] **1.1 · 👤 Client ops** — GBP + website access — *Onboarding must confirm both work* — Verify: Leadsie / login test — Target: client handoff
- [ ] **1.2 · 👤 Client ops** — Heatmap baseline — *Leadsnap before any work — starting reference* — Verify: run primary keyword; save screenshot — Target: [BENCHMARK.md](ops/BENCHMARK.md) — Keywords: `massage spa Kilimani`, `massage Kilimani`, `massage Lavington Nairobi`
- [ ] **1.3 · 👤 Client ops** — Top-10 review counts — *Flag if client far behind pack* — Verify: GMB Everywhere / Leadsnap — Target: compare vs Kilimani Hot Massage GBP
- [ ] **1.4 · 👤 Client ops** — Top-10 photo counts — *Photos are a ranking factor* — Verify: pack analysis — Target: weekly upload cadence plan
- [ ] **1.5 · 👤 Client ops** — GMB Everywhere local scan — *Category count, services, profile features vs top 20* — Verify: Chrome extension — Target: primary **Massage Spa**
- [x] **1.6 · ✅ Shipped** — Primary keyword locked — *Leadsnap keyword data informs primary term* — Verify: `site.primaryKeyword` — Target: `src/content/site.ts` → `Massage Spa Kilimani`
- [ ] **1.7 · 👤 Client ops** — Fake Map spam audit — *ALL-CAPS titles, mall addresses, no NAP on site* — Verify: manual Maps SERP — Target: BENCHMARK fake-listing SOP (report with evidence only)
- [ ] **1.8 · 🔍 Verify post-launch** — Competitor index count — *site:competitor.com* — Verify: Google — Target: benchmark lavingtonhotmassage.co.ke if relevant

### 0B — NAP golden thread (define once; verify in every later phase) · Pillar: all

> Every surface — website, GBP, citations, socials — must use this exact string.

- [x] **2.1 · ✅ Shipped** — Canonical NAP string defined — *One string everywhere* — Verify: compare surfaces — Target: `site.napFooter` in `src/content/site.ts`
- [x] **2.7 · ✅ Shipped** — Phone tel: E.164 — Verify: `tel:` hrefs — Target: `+254746203398`
- [x] **2.8 · ✅ Shipped** — WhatsApp link — Verify: CTAs — Target: `https://wa.me/254746203398`
- [x] **2.12 · ✅ Shipped** — No fake area addresses — *Proximity language only* — Verify: read 5 area pages — Target: combo/area templates
- [x] **2.14 · ✅ Shipped** — Website URL consistent — Verify: cross-check — Target: `https://kilimanihotmassage.co.ke/`
- [ ] **2.9 · 👤 Client ops** — GBP NAP matches website — Verify: GBP dashboard vs site — Target: [GBP_SETUP.md](ops/GBP_SETUP.md)
- [ ] **2.10 · 👤 Client ops** — Citations NAP matches — Verify: tracker columns — Target: [CITATIONS_TRACKER.md](ops/CITATIONS_TRACKER.md)
- [ ] **2.11 · ⚠️ Gap** — Social profiles NAP match — Verify: FB/IG profiles — Target: `site.socials` (empty until client adds)

### 0C — Early schema and embed spot-check · Pillar: Onsite

- [x] **1.10 · ✅ Shipped** — Schema — homepage DaySpa — Verify: validator.schema.org — Target: `daySpaJsonLd()` in `src/lib/schema.ts` via layout
- [x] **1.11 · ✅ Shipped** — Schema — treatment FAQPage + Service — Target: `/massage-treatments/swedish-massage/`
- [x] **1.12 · ✅ Shipped** — Schema — Tier-A area FAQPage + Place — Target: `/areas/lavington/`
- [x] **1.13 · ✅ Shipped** — Maps embed — homepage — Target: `MapEmbed` on `src/app/page.tsx`
- [x] **1.14 · ✅ Shipped** — Maps embed — footer sitewide — Target: `src/components/layout/Footer.tsx`

---

## Phase 1 — Easy wins (Basic first run · Weeks 1–2)

*Prof: "Close obvious gaps first." Interleave **onsite basic** + **GBP quick fixes** + **technical basics** — expect ranking movement in 4–6 weeks.*

> **Title tag rule (Prof):** "60-char limit is horseshit." Use `BEST + category + city + brand + services + near me` — aim ~200 chars. **All titles centralized in [`src/lib/seo-titles.ts`](../src/lib/seo-titles.ts)** — run `npm run check:titles` after edits.

### 1A — Onsite basic: titles, headings, NAP, maps · Pillar: Onsite

**Confirm NAP (Phase 0B) still matches before editing pages.**

- [x] **4.1 · ✅ Shipped** — Home title — BEST prefix — Target: `src/app/page.tsx`
- [x] **4.2 · ✅ Shipped** — Home title — category + city (Massage Spa Kilimani)
- [x] **4.3 · ✅ Shipped** — Home title — primary services listed
- [x] **4.4 · ✅ Shipped** — Home title — "near me"
- [x] **4.5 · ✅ Shipped** — Home title — brand at end
- [x] **4.6–4.11 · ✅ Shipped** — All template titles (service, area, combo, guide, masseuse, hub)
- [x] **4.12–4.18 · ✅ Shipped** — Hub/contact/about titles, unique per URL, meta descriptions, no ALL-CAPS spam
- [x] **5.1 · ✅ Shipped** — One H1 per page
- [x] **5.2 · ✅ Shipped** — Home H1 = "Massage Spa Kilimani" — Target: `src/app/page.tsx`
- [x] **5.3 · ✅ Shipped** — Home H2 = prominent services (treatment grid + sections)
- [x] **2.2 · ✅ Shipped** — Homepage visible NAP — Target: hero `site.napFooter`
- [x] **2.3 · ✅ Shipped** — Footer sitewide NAP — Target: `Footer.tsx`
- [x] **2.4 · ✅ Shipped** — Contact page NAP block — Target: `src/app/contact/page.tsx`
- [x] **2.5 · ✅ Shipped** — JSON-LD PostalAddress — Target: `src/lib/schema.ts`
- [x] **2.6 · ✅ Shipped** — JSON-LD telephone — Target: `0746 203398`
- [x] **2.13 · ✅ Shipped (site)** — Hours 24/7 on site — Target: `site.hoursLabel` · 👤 sync GBP

### 1B — GBP quick wins (same phase as onsite basic) · Pillar: GBP

**Confirm NAP on GBP matches Phase 0B before saving.**

- [ ] **3.1 · 👤 Client ops** — Business name real only — *Don't edit name unless all else exhausted* — Target: `Kilimani Hot Massage`
- [ ] **3.2 · 👤 Client ops** — Primary category — *1 main only; top 10 avg ~1 category* — Target: **Massage Spa**
- [ ] **3.3 · 👤 Client ops** — Secondary categories — *0–3 max; no dilution* — Target: Day spa / Massage therapist only if accurate
- [ ] **3.4 · 👤 Client ops** — Profile green circle — *Complete profile* — Verify: GBP dashboard
- [ ] **3.5 · 👤 Client ops** — Profile features ≥ 3/5 — *Address, phone, website, bookings* — Verify: GMB Everywhere
- [ ] **3.6 · 👤 Client ops** — Full address on GBP — Target: Marcus Garvey Rd, Kilimani / Nairobi
- [ ] **3.7 · 👤 Client ops** — Phone on GBP — Target: 0746 203398
- [ ] **3.8 · 👤 Client ops** — Website URL on GBP — Target: kilimanihotmassage.co.ke
- [ ] **3.9 · 👤 Client ops** — Bookings URL → contact — *Easy 4th profile feature* — Target: `https://kilimanihotmassage.co.ke/contact/`
- [ ] **3.10 · 👤 Client ops** — Hours open 24/7 — Target: 00:00–24:00 all days

### 1C — Technical basics · Pillar: Onsite

- [x] **10.1 · ✅ Shipped** — Canonical URLs — Target: `absoluteUrl()` in `src/content/site.ts`
- [x] **10.2 · ✅ Shipped** — Trailing slash consistency
- [x] **10.3 · ✅ Shipped** — XML sitemap (~2,175 URLs) — Target: `src/app/sitemap.ts`
- [x] **10.4–10.5 · ✅ Shipped** — robots.txt allow + sitemap directive — Target: `src/app/robots.ts`
- [x] **10.6–10.12 · ✅ Shipped** — metadataBase, OG, Twitter, OG image, locale, lang, mobile responsive
- [x] **10.11 · ✅ Shipped** — `<html lang="en">` — Target: `src/app/layout.tsx`
- [x] **10.20 · ✅ Shipped** — Uniqueness guard — Target: `npm run check:unique` / `scripts/check-uniqueness.mjs`
- [x] **10.21 · ✅ Shipped** — Build passes — Target: `npm run build`

---

## Phase 2 — GBP depth (Weeks 2–4)

*After profile skeleton is green, fill services, FAQs, media, and activity signals. Site service names should align with GBP list.*

**Confirm NAP still matches Phase 0B.**

- [ ] **3.11 · 👤 Client ops** — Business description — *Human copy; Kilimani + Marcus Garvey + services; no stuffing* — Target: [GBP_SETUP.md](ops/GBP_SETUP.md)
- [ ] **3.12 · 👤 Client ops** — Services list up to 99 — *Top 20 avg ~30 services in pack* — Paste: [GBP_SERVICES_LIST.md](ops/GBP_SERVICES_LIST.md)
- [ ] **3.13 · 👤 Client ops** — Services dedupe — *Remove exact + near-duplicate variants* — Method: competitor scrape + AI prune (Prof workflow)
- [ ] **3.14 · 👤 Client ops** — Top ~20 service descriptions — *≤300 characters each* — Method: AI blurbs
- [ ] **3.15 · 👤 Client ops** — GBP FAQs — *Location-specific Q&A* — Paste: [GBP_FAQS.md](ops/GBP_FAQS.md) · Mirror site FAQs where sensible (**9.23**)
- [ ] **3.16 · 👤 Client ops** — Cover photo geotagged — Target: [GEOTAG_SOP.md](ops/GEOTAG_SOP.md)
- [ ] **3.17 · 👤 Client ops** — Logo uploaded — Target: Kilimani crimson branding
- [ ] **3.18 · 👤 Client ops** — Weekly photo upload — *1+ photos/week* — Tool: geoimgr.com
- [ ] **3.19 · 👤 Client ops** — Geotag for weak heatmap cells — *Tag photos for suburbs where rank < 20* — Order: Kilimani → Lavington → Westlands → Kileleshwa
- [ ] **3.20 · 👤 Client ops** — Weekly GBP posts 1–2× — Target: Phase 6 cadence
- [ ] **3.21 · 👤 Client ops** — Review ask cadence — *Steady honest reviews; never buy*
- [ ] **3.22 · 👤 Client ops** — Attributes only if true
- [ ] **3.23 · 👤 Client ops** — GBP service area realistic — *Don't claim impossible distant cities*
- [ ] **3.24 · ⚠️ Gap** — Match socials to GBP — *NAP on FB/IG/LinkedIn* — Target: add URLs to `site.socials` in `src/content/site.ts`

---

## Phase 3 — Onsite advanced (Weeks 5–8)

*Topical + local authority. Prof rank-hub model: prove expertise through page count, depth, interlinking, FAQs, and schema. Site matrix (~2,175 pages) reinforces GBP services list — keep terminology aligned.*

### 3A — Rank hub architecture · Pillar: Onsite

```
Rank 1: /  (homepage)
Rank 2: /massage-treatments/ · /areas/ · /guides/ · /masseuses/
Rank 3: /massage-treatments/[service]/ · /areas/[area]/ · /guides/[slug]/ · /masseuses/[slug]/
Rank 4: /areas/[area]/services/[service]/ · /areas/[area]/masseuses/[masseuse]/
```

- [x] **6.1 · ✅ Shipped** — Rank 1 homepage — Target: `src/app/page.tsx`
- [x] **6.2–6.5 · ✅ Shipped** — Rank 2 hubs (treatments, areas, guides, masseuses)
- [x] **6.6–6.9 · ✅ Shipped** — Rank 3 pages (11 services, ~119 areas, 10 guides, 6 masseuses)
- [x] **6.10–6.11 · ✅ Shipped** — Rank 4 combos (~1,309 service + ~714 masseuse)
- [x] **6.12–6.14 · ✅ Shipped** — Breadcrumbs visual + JSON-LD + URL slug hierarchy — Target: `Breadcrumbs.tsx`, `breadcrumbJsonLd()`
- [x] **6.15 · ✅ Shipped** — Treatment pages ≥1,500 words — Target: `src/content/treatments.ts`
- [x] **6.16 · ✅ Shipped** — Tier-A areas ≥1,200 words — Target: `src/content/areas/enrichment.ts`
- [x] **6.17 · ✅ Shipped** — Guides ≥1,200 words — Target: `src/content/guides.ts`
- [x] **6.19–6.20 · ✅ Shipped** — Topical authority (11/11 services) + local matrix
- [x] **6.21–6.23 · ✅ Shipped** — About, contact, no orphan hubs
- [x] **6.24–6.25 · ✅ Shipped** — Sitemap complete with priorities — Target: `src/app/sitemap.ts`

### 3B — Heading hierarchy (remaining pages) · Pillar: Onsite

- [x] **5.4–5.17 · ✅ Shipped** — Treatment/area/combo/guide/masseuse/hub H1s, H2 sections, FAQ H3s, logical outline, no keyword-stuffed H1s

### 3C — Interlinking + anchor text (Prof 5-step method) · Pillar: Onsite

**Step 1 — Plan:** List all service pages + area pages; map which services belong to which areas.

**Step 2 — Place links:** In-body mentions + "We serve these areas" / "Services here" sections.

**Step 3 — Anchor text:** Natural, varied ("our deep tissue service", "massage in Westlands") — never same text every time.

**Step 4 — Per-page checklist:**
- Service page: 2–4 area links in body + area list at bottom
- Area page: 3–6 service links in body + service list section
- Home + contact: link to areas + main services

**Step 5 — Final checks:** Every important page has incoming links; max ~8–10 links per section; not footer-only.

- [x] **7.1–7.22 · ✅ Shipped** — Full interlinking matrix (service↔area↔combo↔masseuse↔guide↔home↔contact)
- [x] **7.16–7.17 · ✅ Shipped** — Varied, natural anchor text
- [x] **7.18–7.20 · ✅ Shipped** — Link density, in-body links, relevance
- [x] **7.24–7.25 · ✅ Shipped** — Footer + header nav links
- [ ] **7.23 · ⚠️ Gap** — Anchor diversity spot-check — *10 random combos quarterly* — Optional polish

### 3D — Formatting and media · Pillar: Onsite

- [x] **8.1–8.10 · ✅ Shipped** — NAP bold (about/contact), FAQ H3s, bullet lists, no bold spam, image alts, geotagged WebP, next/image
- [x] **8.12–8.14 · ✅ Shipped** — CTA prominence, trust strip (no fake ratings), readable paragraphs
- [ ] **8.11 · ⚠️ Gap** — Content-body keyword bold — Optional polish

### 3E — FAQs + schema depth · Pillar: Onsite

See **Appendix A** for honesty rules (no fake AggregateRating).

- [x] **9.1–9.2 · ✅ Shipped** — Home 8 FAQs + FAQPage schema
- [x] **9.3–9.5 · ✅ Shipped** — Treatment FAQs (6–10) + FAQPage + Service schema
- [x] **9.6–9.8 · ✅ Shipped** — Tier-A area FAQs + FAQPage + Place schema
- [x] **9.9–9.11 · ✅ Shipped** — Combo, guide, masseuse FAQs + Person schema
- [x] **9.12–9.18 · ✅ Shipped** — DaySpa global schema (areaServed, hasOfferCatalog, openingHours, geo, hasMap, sameAs WhatsApp)
- [x] **9.20 · ✅ Shipped** — NO fake AggregateRating — intentionally omitted
- [x] **9.21–9.22 · ✅ Shipped** — BreadcrumbList everywhere; FAQ local flavor (Yaya, Marcus Garvey, Adlife)
- [ ] **9.19 · ⚠️ Gap** — sameAs social profiles — add when `site.socials` populated
- [ ] **9.23 · 👤 Client ops** — GBP FAQs mirror site — when GBP live

- [x] **10.15–10.19 · ✅ Shipped** — SSG, 404 handling, no noindex, favicon, clean URL structure

---

## Phase 4 — Citations (Weeks 9–10)

*Prof 80/20 first, then SERP-mined directories. Quality ≫ quantity — 10 strong citations beat 200 weak ones.*

> **NAP reminder:** Every listing must match Phase 0B exactly: `Kilimani Hot Massage · 0746 203398 · Marcus Garvey Rd, Nairobi`

### 4A — Core 80/20 (do these first) · Pillar: Citations

- [ ] **11.1 · 👤 Client ops** — Bing Places — https://www.bing.com/forbusiness/
- [ ] **11.2 · 👤 Client ops** — Apple Business Connect — https://businessconnect.apple.com/
- [ ] **11.3 · 👤 Client ops** — Facebook Business Page — NAP + hours + website
- [ ] **11.4 · 👤 Client ops** — Foursquare Business — https://foursquare.com/products/business-listings/
- [ ] **11.5 · 👤 Client ops** — Google Business Profile — primary citation
- [ ] **11.6 · 👤 Client ops** — Yelp (if relevant in Kenya)
- [ ] **11.7 · 👤 Client ops** — NAP identical on all citations — Verify: [CITATIONS_TRACKER.md](ops/CITATIONS_TRACKER.md)
- [ ] **11.8 · 👤 Client ops** — Hours match 24/7 on each directory
- [ ] **11.9 · 👤 Client ops** — Website URL on each directory
- [ ] **11.17 · 👤 Client ops** — Fix NAP mismatches before adding more listings

### 4B — Advanced citation mining · Pillar: Citations

**SERP method (Prof):**
1. Search primary keyword (`massage spa Nairobi`, `massage Kilimani`)
2. Scan top-20 organic results for directories you can claim (if Google ranks them, they're relevant)
3. Repeat for keyword variations; ask AI for Kenya wellness directories

**Competitor method:** Maps → competitor → "More about" → list sites pointing to them → fill voids only.

- [ ] **11.10 · 👤 Client ops** — SERP directory mining
- [ ] **11.11 · 👤 Client ops** — Competitor backlink / citation profiles
- [ ] **11.12 · 👤 Client ops** — Kenya wellness / tourism directories
- [ ] **11.13 · 👤 Client ops** — TomTom / HERE Maps nav partners
- [ ] **11.14 · 👤 Client ops** — Automotive nav (Toyota, etc.) where available
- [x] **11.15 · ✅ Shipped** — Quality-over-quantity principle documented
- [x] **11.16 · ✅ Shipped** — Citation tracker template — Target: [CITATIONS_TRACKER.md](ops/CITATIONS_TRACKER.md)
- [ ] **11.18 · 👤 Client ops** — Paid aggregator (Leadsnap/FatJoe) only if gaps remain after manual core 10

---

## Phase 5 — Verify and close gaps (Weeks 11–12)

*Re-run benchmarks. Confirm Google sees the full picture.*

- [ ] **1.9 · 🔍 Verify post-launch** — Our indexed page count — *Minimum 30* — Verify: `site:kilimanihotmassage.co.ke`
- [ ] **6.18 · 🔍 Verify post-launch** — Same index floor check from architecture phase
- [ ] **10.13 · 🔍 Verify post-launch** — HTTPS on production domain
- [ ] **10.14 · 🔍 Verify post-launch** — Core Web Vitals (Lighthouse / CrUX)
- [ ] **10.22 · 🔍 Verify post-launch** — Google Search Console property verified
- [ ] **10.23 · 🔍 Verify post-launch** — Sitemap submitted to GSC
- [ ] Re-validate all 6 schema sample URLs (see Quick audit commands)
- [ ] **12.4 · 👤 Client ops** — Heatmap re-check vs Phase 0 baseline — Target: [BENCHMARK.md](ops/BENCHMARK.md)

### Gap closure priority

| Priority | Item | Owner |
|----------|------|-------|
| 1 | GBP full optimization (services 99, FAQs, posts, photos) | 👤 Client |
| 2 | Core citations (Bing, Apple, Facebook, Foursquare) | 👤 Client |
| 3 | Index verification `site:kilimanihotmassage.co.ke` | 🔍 Post-deploy |
| 4 | Heatmap baseline + monthly re-check | 👤 Client |
| 5 | Social profiles → `site.socials` + sameAs | 👤 Client |
| 6 | Production deploy + GSC + HTTPS + Lighthouse | 🔍 Post-deploy |
| 7 | Anchor diversity spot-check (7.23) | ⚠️ Optional |
| 8 | Content-body keyword bold (8.11) | ⚠️ Optional |

### Master scorecard

| Pillar | Shipped | Gap / verify | Client ops |
|--------|---------|--------------|------------|
| Benchmarking | 6 | 3 | 5 |
| NAP lock | 12 | 1 | 2 |
| GBP | 0 | 1 | 23 |
| Title tags | 18 | 0 | 0 |
| Headings | 17 | 0 | 0 |
| Rank hubs | 24 | 1 | 0 |
| Interlinking | 24 | 1 | 0 |
| Formatting | 12 | 1 | 0 |
| FAQs + schema | 21 | 1 | 1 |
| Technical SEO | 18 | 5 | 0 |
| Citations | 1 | 0 | 17 |
| Weekly / white-hat | 5 | 1 | 5 |
| **Total** | **~158** | **~14** | **~53** |

**Onsite SEO (basic + advanced): largely shipped.** Remaining work: GBP execution, citations, post-launch verification, social linkage.

---

## Phase 6 — Ongoing weekly cadence

*Closes the loop: GBP activity ↔ geotagged photos ↔ heatmap cells ↔ site area pages.*

### 6A — Every Friday · Pillar: GBP + all

- [ ] **12.1 · 👤 Client ops** — Fixed update day (Friday) — Target: [WEEKLY_CADENCE.md](ops/WEEKLY_CADENCE.md)
- [ ] **12.2 · 👤 Client ops** — 1 GBP post (service + area mention + soft CTA WhatsApp or `/contact/`)
- [ ] **12.3 · 👤 Client ops** — 1–3 geotagged photos — weak heatmap cell first — Tool: geoimgr.com · SOP: [GEOTAG_SOP.md](ops/GEOTAG_SOP.md)
- [ ] **12.4 · 👤 Client ops** — Quick ranking glance vs baseline
- [ ] **12.5 · 👤 Client ops** — Reply to new reviews (thank; no star incentives)
- [ ] **12.6 · ⚠️ Gap** — IG/FB cross-post when profiles exist

### 6B — 12-week GBP post themes (rotate after Week 12)

| Week | Theme | Area focus |
|------|-------|------------|
| 1 | Swedish massage + desk tension | Lavington |
| 2 | Deep tissue after workdays | Kilimani |
| 3 | Couples side-by-side tables | Valley Arcade guests |
| 4 | Hot stone for shoulders | — |
| 5 | Easy hop from Westlands | Westlands |
| 6 | First visit FAQ → link guides | — |
| 7 | Named therapist (Amara / Keisha) | — |
| 8 | Private suites (tasteful, non-explicit) | — |
| 9 | Upper Hill / CBD after meetings | Upper Hill |
| 10 | Aromatherapy + unscented option | — |
| 11 | Four-hands two therapists | — |
| 12 | Thank guests; point to `/areas/`; audit citation NAP | All |

**Friday email template:** See [WEEKLY_CADENCE.md](ops/WEEKLY_CADENCE.md)

### 6C — White-hat policy · Pillar: all

- [x] **12.7 · ✅ Shipped** — White-hat only — no fake listings, no bought reviews
- [x] **12.8 · ✅ Shipped** — Fake spam report SOP — evidence-based only — Target: [BENCHMARK.md](ops/BENCHMARK.md)
- [x] **12.9 · ✅ Shipped** — Never attack real businesses
- [x] **12.10 · ✅ Shipped** — Geotag SOP documented — Target: [GEOTAG_SOP.md](ops/GEOTAG_SOP.md)
- [x] **12.11 · ✅ Shipped** — AI photo fallback (screenshot + geotag if no real photos)
- [x] **12.12 · ✅ Shipped** — Site uniqueness vs competitors — Target: `npm run check:unique`

---

## Appendix A — Schema honesty rules (non-negotiable)

- **sameAs:** WhatsApp + Maps + **only real social URLs** in `site.socials` — never invent profiles
- **AggregateRating:** **NEVER** add without live Google rating + count matching GBP — currently correctly omitted
- **FAQPage:** Home, treatments, Tier-A areas, combos, guides — all shipped
- **BreadcrumbList:** All hubs and nested templates — shipped
- When client supplies Google rating: add AggregateRating to `daySpaJsonLd()` only with verified live data

---

## Appendix B — Full item index

| ID | Phase | Technique | Status |
|----|-------|-----------|--------|
| 1.1 | 0 | GBP + website access | 👤 |
| 1.2 | 0 | Heatmap baseline | 👤 |
| 1.3 | 0 | Top-10 review counts | 👤 |
| 1.4 | 0 | Top-10 photo counts | 👤 |
| 1.5 | 0 | GMB Everywhere scan | 👤 |
| 1.6 | 0 | Primary keyword locked | ✅ |
| 1.7 | 0 | Fake Map spam audit | 👤 |
| 1.8 | 0 | Competitor index count | 🔍 |
| 1.9 | 5 | Our indexed page count | 🔍 |
| 1.10 | 0 | Schema — homepage | ✅ |
| 1.11 | 0 | Schema — treatment | ✅ |
| 1.12 | 0 | Schema — area | ✅ |
| 1.13 | 0 | Maps embed — home | ✅ |
| 1.14 | 0 | Maps embed — footer | ✅ |
| 2.1 | 0 | NAP string defined | ✅ |
| 2.2 | 1 | Homepage NAP | ✅ |
| 2.3 | 1 | Footer NAP | ✅ |
| 2.4 | 1 | Contact NAP | ✅ |
| 2.5 | 1 | JSON-LD address | ✅ |
| 2.6 | 1 | JSON-LD telephone | ✅ |
| 2.7 | 0 | tel: E.164 | ✅ |
| 2.8 | 0 | WhatsApp link | ✅ |
| 2.9 | 0 | GBP NAP match | 👤 |
| 2.10 | 4 | Citations NAP match | 👤 |
| 2.11 | 0 | Social NAP match | ⚠️ |
| 2.12 | 0 | No fake area addresses | ✅ |
| 2.13 | 1 | Hours consistent | ✅/👤 |
| 2.14 | 0 | Website URL consistent | ✅ |
| 3.1–3.10 | 1 | GBP quick wins | 👤 |
| 3.11–3.23 | 2 | GBP depth | 👤 |
| 3.24 | 2 | Socials match GBP | ⚠️ |
| 4.1–4.18 | 1 | Title tags | ✅ |
| 5.1–5.17 | 1/3 | Headings | ✅ |
| 6.1–6.17 | 3 | Rank hub architecture | ✅ |
| 6.18 | 5 | Min 30 indexed URLs | 🔍 |
| 6.19–6.25 | 3 | Authority + sitemap | ✅ |
| 7.1–7.22 | 3 | Interlinking | ✅ |
| 7.23 | 3 | Anchor diversity check | ⚠️ |
| 7.24–7.25 | 3 | Nav links | ✅ |
| 8.1–8.10 | 3 | Formatting + media | ✅ |
| 8.11 | 3 | Body keyword bold | ⚠️ |
| 8.12–8.14 | 3 | CTAs + readability | ✅ |
| 9.1–9.18 | 3 | FAQs + schema | ✅ |
| 9.19 | 3 | sameAs socials | ⚠️ |
| 9.20 | 3 | No fake AggregateRating | ✅ |
| 9.21–9.22 | 3 | Breadcrumbs + local FAQs | ✅ |
| 9.23 | 2 | GBP FAQs mirror site | 👤 |
| 10.1–10.12 | 1 | Technical basics | ✅ |
| 10.13–10.14 | 5 | HTTPS + CWV | 🔍 |
| 10.15–10.21 | 3 | SSG + build + uniqueness | ✅ |
| 10.22–10.23 | 5 | GSC + sitemap submit | 🔍 |
| 11.1–11.14 | 4 | Citations | 👤 |
| 11.15–11.16 | 4 | Citation principles + tracker | ✅ |
| 11.17–11.18 | 4 | NAP fix first + paid optional | 👤 |
| 12.1–12.6 | 6 | Weekly cadence | 👤/⚠️ |
| 12.7–12.12 | 6 | White-hat + geotag + unique | ✅ |

---

*Re-run `npm run check:unique` and schema validator after any content deploy.*
