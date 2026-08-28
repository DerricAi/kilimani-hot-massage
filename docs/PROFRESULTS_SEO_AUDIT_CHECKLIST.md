# ProfResults Complete SEO Audit Checklist — Kilimani Hot Massage

Master audit sheet distilled from **BM Challenge Official Document** and **ProfResults New Local SEO Client Workflow** (living Google Doc). Use this against the live site to close gaps systematically.

**Pillars:** GBP · Onsite · Citations · Weekly cadence. **Principle:** completeness wins — match or exceed what top Map-pack competitors do.

**NAP lock (verbatim everywhere):**  
`Kilimani Hot Massage · 0746 203398 · Marcus Garvey Rd, Nairobi`

**Primary keywords:** `Massage Spa Kilimani` · `massage Kilimani` · `massage Lavington Nairobi`

**Status legend:** ✅ Shipped · ⚠️ Gap · 👤 Client ops · 🔍 Verify post-launch

**Related ops docs:** [BENCHMARK.md](ops/BENCHMARK.md) · [GBP_SETUP.md](ops/GBP_SETUP.md) · [GBP_SERVICES_LIST.md](ops/GBP_SERVICES_LIST.md) · [GBP_FAQS.md](ops/GBP_FAQS.md) · [CITATIONS_TRACKER.md](ops/CITATIONS_TRACKER.md) · [GEOTAG_SOP.md](ops/GEOTAG_SOP.md) · [WEEKLY_CADENCE.md](ops/WEEKLY_CADENCE.md)

---

## Quick audit commands

```bash
# Build + uniqueness guard (no Lavington-as-brand leaks in src/)
npm run build
npm run check:unique

# Geotag media pack (after adding new images)
node scripts/geotag-images.mjs
```

**Google index check (post-deploy):**
```
site:kilimanihotmassage.co.ke
```
Target: minimum 30 indexed URLs; goal ≫ 30 as matrix pages get crawled (~2,175 in sitemap).

**Schema validator sample URLs** (paste full URL at https://validator.schema.org/):

| Page type | URL |
|-----------|-----|
| Homepage + DaySpa + FAQPage | https://kilimanihotmassage.co.ke/ |
| Treatment + Service + FAQPage | https://kilimanihotmassage.co.ke/massage-treatments/swedish-massage/ |
| Tier-A area + Place + FAQPage | https://kilimanihotmassage.co.ke/areas/lavington/ |
| Area×service combo | https://kilimanihotmassage.co.ke/areas/kilimani/services/deep-tissue-massage/ |
| Guide | https://kilimanihotmassage.co.ke/guides/how-to-book-24-7-spa-kilimani/ |
| Masseuse + Person | https://kilimanihotmassage.co.ke/masseuses/amara/ |

**Sitemap:** https://kilimanihotmassage.co.ke/sitemap.xml  
**Robots:** https://kilimanihotmassage.co.ke/robots.txt

---

## Section 1 — Benchmarking and competitive intel

| # | Technique | Prof rule | How to verify | Kilimani target | Status |
|---|-----------|-----------|---------------|-----------------|--------|
| 1.1 | GBP + website access | Onboarding must confirm both work | Leadsie / login test | Client handoff | 👤 Client ops |
| 1.2 | Heatmap baseline | Leadsnap (or equiv.) before any work — starting reference | Run on primary keyword; save screenshot | `massage spa Kilimani`, `massage Kilimani`, `massage Lavington Nairobi` — see [BENCHMARK.md](ops/BENCHMARK.md) | 👤 Client ops |
| 1.3 | Top-10 review counts | Note if client far behind pack | GMB Everywhere / Leadsnap pack data | Compare vs Kilimani Hot Massage GBP | 👤 Client ops |
| 1.4 | Top-10 photo counts | Same — photos are a ranking factor | Pack analysis | Weekly upload cadence needed | 👤 Client ops |
| 1.5 | GMB Everywhere local scan | Category count, services count, profile features vs top 20 | Chrome extension scan on primary keyword | Primary: Massage Spa | 👤 Client ops |
| 1.6 | Keyword volume / competitiveness | Leadsnap keyword data informs primary term | Confirm `Massage Spa Kilimani` is correct primary | `site.primaryKeyword` in `src/content/site.ts` | ✅ Shipped |
| 1.7 | Fake Map spam audit | ALL-CAPS stuffed titles, mall addresses, no NAP on site | Manual Maps SERP review | Report only with evidence — see BENCHMARK fake-listing SOP | 👤 Client ops |
| 1.8 | Competitor website index count | `site:competitor.com` — note page count | Compare vs our matrix | Benchmark lavingtonhotmassage.co.ke if relevant | 🔍 Verify post-launch |
| 1.9 | Our indexed page count | Minimum 30 pages indexed; more for competitive niches | `site:kilimanihotmassage.co.ke` | ~2,175 URLs in `src/app/sitemap.ts` | 🔍 Verify post-launch |
| 1.10 | Schema validator — homepage | LocalBusiness / DaySpa present | validator.schema.org | `daySpaJsonLd()` in `src/lib/schema.ts` via layout | ✅ Shipped |
| 1.11 | Schema validator — treatment | FAQPage + Service on sample treatment | validator.schema.org | `/massage-treatments/swedish-massage/` | ✅ Shipped |
| 1.12 | Schema validator — area | FAQPage + Place on Tier-A area | validator.schema.org | `/areas/lavington/` | ✅ Shipped |
| 1.13 | Maps embed loads — homepage | Google embed visible | Browser check | `MapEmbed` on `src/app/page.tsx` | ✅ Shipped |
| 1.14 | Maps embed loads — footer | Sitewide embed in footer | Browser check every page type | `src/components/layout/Footer.tsx` | ✅ Shipped |

---

## Section 2 — NAP lock (cross-pillar)

| # | Technique | Prof rule | How to verify | Kilimani target | Status |
|---|-----------|-----------|---------------|-----------------|--------|
| 2.1 | Canonical NAP string defined | One string used everywhere | Compare all surfaces | `site.napFooter` in `src/content/site.ts` | ✅ Shipped |
| 2.2 | Homepage visible NAP | Name + address + phone on homepage body | View source / visual | Hero section `site.napFooter` on home | ✅ Shipped |
| 2.3 | Footer sitewide NAP | NAP in footer on every page | Spot-check 3 templates | `Footer.tsx` | ✅ Shipped |
| 2.4 | Contact page NAP block | Full NAP + structured dl | `/contact/` | `src/app/contact/page.tsx` | ✅ Shipped |
| 2.5 | JSON-LD address | PostalAddress matches GBP | Schema validator | `streetAddress`, `addressLocality` in schema.ts | ✅ Shipped |
| 2.6 | JSON-LD telephone | Phone matches display format | Schema validator | `0746 203398` in DaySpa | ✅ Shipped |
| 2.7 | Phone tel: link consistency | Click-to-call uses E.164 | Inspect `tel:` hrefs | `+254746203398` in `site.phoneTel` | ✅ Shipped |
| 2.8 | WhatsApp link consistency | wa.me matches phone | Inspect CTAs | `https://wa.me/254746203398` | ✅ Shipped |
| 2.9 | GBP NAP matches website | Exact match GBP ↔ site | GBP dashboard vs site | See [GBP_SETUP.md](ops/GBP_SETUP.md) | 👤 Client ops |
| 2.10 | Citations NAP matches | Every directory same NAP | CITATIONS_TRACKER columns | [CITATIONS_TRACKER.md](ops/CITATIONS_TRACKER.md) | 👤 Client ops |
| 2.11 | Social profiles NAP match | Facebook, IG, etc. sync with GBP | Manual profile check | `site.socials` — currently empty | ⚠️ Gap |
| 2.12 | No fake addresses on area pages | Proximity language only; no invented storefronts | Read 5 area pages | Combo/area templates use commute copy | ✅ Shipped |
| 2.13 | Hours consistent | 24/7 everywhere | GBP, site, citations | `site.hoursLabel` / GBP hours | ✅ Shipped (site) · 👤 GBP |
| 2.14 | Website URL consistent | Same URL on GBP, citations, schema | Cross-check | `https://kilimanihotmassage.co.ke/` | ✅ Shipped |

---

## Section 3 — Google Business Profile

| # | Technique | Prof rule | How to verify | Kilimani target | Status |
|---|-----------|-----------|---------------|-----------------|--------|
| 3.1 | Business name — real only | Match real-world signage; don't edit unless exhausted | GBP dashboard | `Kilimani Hot Massage` | 👤 Client ops |
| 3.2 | Primary category | 1 main category only | GMB Everywhere vs top 10 | **Massage Spa** | 👤 Client ops |
| 3.3 | Secondary categories | 0–3 max; no dilution | Remove overlapping extras | Day spa / Massage therapist only if accurate | 👤 Client ops |
| 3.4 | Profile completeness — green circle | Full profile completion indicator | GBP dashboard | All fields filled | 👤 Client ops |
| 3.5 | Profile features ≥ 3/5 | Address, phone, website, bookings minimum | GMB Everywhere analysis | Address + phone + website + bookings | 👤 Client ops |
| 3.6 | Full address on GBP | Matches Marcus Garvey pin | Maps pin vs NAP | Marcus Garvey Rd, Kilimani / Nairobi | 👤 Client ops |
| 3.7 | Phone on GBP | Same digit string as site | Compare | 0746 203398 | 👤 Client ops |
| 3.8 | Website URL on GBP | Points to homepage | Click through | kilimanihotmassage.co.ke | 👤 Client ops |
| 3.9 | Bookings / appointments URL | Link contact page for profile feature | GBP → Bookings | `https://kilimanihotmassage.co.ke/contact/` | 👤 Client ops |
| 3.10 | Hours — open 24/7 | Match site claim | GBP hours editor | 00:00–24:00 all days | 👤 Client ops |
| 3.11 | Business description | Human copy; Kilimani + services; no stuffing | Read aloud test | Include Marcus Garvey, Lavington/Kilimani corridor | 👤 Client ops |
| 3.12 | Services list — volume | Up to 99 services; top 20 avg ~30 in pack | Count in GBP | Paste from [GBP_SERVICES_LIST.md](ops/GBP_SERVICES_LIST.md) | 👤 Client ops |
| 3.13 | Services — dedupe | Remove exact + near-duplicate variants | AI + manual prune | Competitor scrape workflow in Prof doc | 👤 Client ops |
| 3.14 | Top ~20 service descriptions | ≤300 characters each | Character count in GBP | AI blurbs per top services | 👤 Client ops |
| 3.15 | GBP FAQs | Location-specific Q&A in profile | GBP Q&A section | Paste from [GBP_FAQS.md](ops/GBP_FAQS.md) | 👤 Client ops |
| 3.16 | Cover photo | Professional, geotagged | Visual + EXIF | See GEOTAG_SOP | 👤 Client ops |
| 3.17 | Logo uploaded | Brand mark in GBP | GBP photos | Kilimani crimson branding | 👤 Client ops |
| 3.18 | Weekly photo upload | 1+ photos/week; geotag weak heatmap cells | Calendar cadence | geoimgr.com — see [GEOTAG_SOP.md](ops/GEOTAG_SOP.md) | 👤 Client ops |
| 3.19 | Geotag photos for target areas | Tag photos for suburbs where rank is weak | Heatmap-driven | Kilimani first, then Lavington / Westlands / Kileleshwa | 👤 Client ops |
| 3.20 | Weekly GBP posts | 1–2×/week; service + area mentions | Post history | Friday cadence in [WEEKLY_CADENCE.md](ops/WEEKLY_CADENCE.md) | 👤 Client ops |
| 3.21 | Review ask cadence | Steady honest reviews after visits | Review velocity chart | Never buy reviews | 👤 Client ops |
| 3.22 | Attributes | Only if true (women-owned, etc.) | GBP attributes | Don't add false attributes | 👤 Client ops |
| 3.23 | GBP service area | Realistic radius around Marcus Garvey | GBP service area settings | Don't claim impossible distant cities | 👤 Client ops |
| 3.24 | Match socials to GBP | NAP on FB/IG/LinkedIn matches | Cross-profile audit | When profiles exist → add to `site.socials` | ⚠️ Gap |

---

## Section 4 — Title tags (Prof formula)

**Rule:** `BEST + Primary category + city + brand + primary services + near me` — aim ~200 characters; ignore arbitrary 60-char limit.

| # | Technique | Prof rule | How to verify | Kilimani target | Status |
|---|-----------|-----------|---------------|-----------------|--------|
| 4.1 | Homepage title — BEST prefix | Starts with BEST + category | Hover browser tab | `src/app/page.tsx` metadata | ✅ Shipped |
| 4.2 | Homepage title — category + city | Massage Spa + Kilimani/Nairobi | Read title tag | Present in home metadata | ✅ Shipped |
| 4.3 | Homepage title — services list | Primary services named | Read title tag | Swedish, Deep Tissue, Nuru, Couples, etc. | ✅ Shipped |
| 4.4 | Homepage title — near me | Include if space allows | Read title tag | "near me" present | ✅ Shipped |
| 4.5 | Homepage title — brand | Business name at end | Read title tag | Kilimani Hot Massage | ✅ Shipped |
| 4.6 | Service page titles | `[Service] [City] near me \| Brand` | View 3 treatment tabs | `metaTitle` in `src/content/treatments.ts` | ✅ Shipped |
| 4.7 | Area hub titles | `Massage in [Area] Nairobi \| Brand` | View 3 area tabs | `src/app/areas/[area]/page.tsx` generateMetadata | ✅ Shipped |
| 4.8 | Area×service combo titles | `[Service] in [Area] \| Brand` | View combo URLs | `src/content/generate-combos.ts` | ✅ Shipped |
| 4.9 | Area×masseuse combo titles | `Book [Name] in [Area] \| Brand` | View combo URLs | generate-combos.ts | ✅ Shipped |
| 4.10 | Guide titles | Hyperlocal + compelling | View guide tabs | `src/content/guides.ts` per guide | ✅ Shipped |
| 4.11 | Masseuse titles | Name + specialty + city | View masseuse tabs | `src/content/masseuses.ts` | ✅ Shipped |
| 4.12 | Hub page titles | Category-level descriptive | /massage-treatments/, /areas/, /guides/ | Each hub has metadata | ✅ Shipped |
| 4.13 | Contact / About titles | Clear + brand | View tabs | pageMetadata helpers | ✅ Shipped |
| 4.14 | Unique title per URL | No duplicate titles across matrix | Crawl or grep metaTitle fields | ~2,175 unique paths | ✅ Shipped |
| 4.15 | No ALL-CAPS keyword spam | White-hat; real business names only | Visual SERP preview | Human-readable titles throughout | ✅ Shipped |
| 4.16 | Meta description every page | Description present all templates | View 5 page types | `pageMetadata()` + per-page metadata | ✅ Shipped |
| 4.17 | Default layout title template | Fallback for pages without override | layout.tsx | `%s \| Kilimani Hot Massage` | ✅ Shipped |
| 4.18 | Title length sanity | Informative without truncation spam | ~150–200 char home title OK | Home title ~120 chars — acceptable | ✅ Shipped |

---

## Section 5 — Heading hierarchy (H1 / H2 / H3)

| # | Technique | Prof rule | How to verify | Kilimani target | Status |
|---|-----------|-----------|---------------|-----------------|--------|
| 5.1 | One H1 per page | Single H1 only | Inspect 5 templates | One `<h1>` per route | ✅ Shipped |
| 5.2 | Homepage H1 | Primary category + city | View home | "Massage Spa Kilimani" — `src/app/page.tsx` | ✅ Shipped |
| 5.3 | Homepage H2 — services | Prominent services as H2 | View home sections | Treatment grid + section headings | ✅ Shipped |
| 5.4 | Treatment H1 | `[Service] in Kilimani` pattern | View 3 treatments | `t.h1` in treatments.ts | ✅ Shipped |
| 5.5 | Treatment H2 sections | Scannable sections (benefits, process, FAQs) | View treatment body | Multiple H2 blocks per treatment | ✅ Shipped |
| 5.6 | Area hub H1 | Massage for [Area] pattern | View 3 areas | Area page template | ✅ Shipped |
| 5.7 | Area hub H2 sections | Services, masseuses, directions, FAQs | View area body | Section headings present | ✅ Shipped |
| 5.8 | Combo H1 | `[Service] for [Area]` | View 3 combos | generate-combos.ts | ✅ Shipped |
| 5.9 | Combo H2 variety | Hash-rotated templates avoid duplicate H2s | Spot-check 5 random combos | generate-combos.ts rotation | ✅ Shipped |
| 5.10 | Guide H1 | Article topic + local hook | View 3 guides | guides.ts | ✅ Shipped |
| 5.11 | Masseuse H1 | Therapist name + context | View 2 masseuse pages | masseuse template | ✅ Shipped |
| 5.12 | Hub H1 — treatments | Category page headline | /massage-treatments/ | Hub page | ✅ Shipped |
| 5.13 | Hub H1 — areas | Areas index headline | /areas/ | Hub page | ✅ Shipped |
| 5.14 | Hub H1 — guides | Guides silo headline | /guides/ | Hub page | ✅ Shipped |
| 5.15 | FAQ questions as H3 | Visually distinct FAQ blocks | View FAQ sections | `<h3>` on FAQ questions | ✅ Shipped |
| 5.16 | Logical H1→H2→H3 order | No skipped levels for SEO outline | Outline 1 deep page | Local-first structure on areas/treatments | ✅ Shipped |
| 5.17 | No keyword-stuffed H1 | Human-readable headings | Read aloud | Natural phrasing | ✅ Shipped |

---

## Section 6 — Rank hub architecture (page count model)

Prof hierarchy: **Rank 1** landing → **Rank 2** category hubs → **Rank 3** service/area pages → **Rank 4** area×service / area×masseuse combos.

| # | Technique | Prof rule | How to verify | Kilimani target | Status |
|---|-----------|-----------|---------------|-----------------|--------|
| 6.1 | Rank 1 — homepage | Primary landing `/` | URL structure | `src/app/page.tsx` | ✅ Shipped |
| 6.2 | Rank 2 — treatments hub | `/massage-treatments/` | Nav + sitemap | Links to all 11 services | ✅ Shipped |
| 6.3 | Rank 2 — areas hub | `/areas/` | Nav + sitemap | Links to ~119 areas | ✅ Shipped |
| 6.4 | Rank 2 — guides hub | `/guides/` | Nav + sitemap | Links to 10 guides | ✅ Shipped |
| 6.5 | Rank 2 — masseuses hub | `/masseuses/` | Nav + sitemap | Links to 6 therapists | ✅ Shipped |
| 6.6 | Rank 3 — service pages | One page per core service | Count URLs | 11 treatment pages | ✅ Shipped |
| 6.7 | Rank 3 — area pages | One page per served area/ward | Count URLs | ~119 area pages | ✅ Shipped |
| 6.8 | Rank 3 — guide articles | Topical authority articles | Count URLs | 10 guides | ✅ Shipped |
| 6.9 | Rank 3 — masseuse profiles | One page per therapist | Count URLs | 6 masseuse pages | ✅ Shipped |
| 6.10 | Rank 4 — area×service combos | Service in area nested URLs | Count URLs | ~1,309 combo pages | ✅ Shipped |
| 6.11 | Rank 4 — area×masseuse combos | Therapist in area nested URLs | Count URLs | ~714 combo pages | ✅ Shipped |
| 6.12 | Breadcrumbs visual | Home → Hub → Page trail | View nested pages | `Breadcrumbs.tsx` | ✅ Shipped |
| 6.13 | BreadcrumbList JSON-LD | Schema matches visual trail | validator.schema.org | `breadcrumbJsonLd()` | ✅ Shipped |
| 6.14 | URL slug hierarchy | `/areas/[area]/services/[service]/` pattern | Inspect URLs | Matches Prof plumbing example structure | ✅ Shipped |
| 6.15 | Treatment word count ≥1,500 | Deep service pages | Word count spot-check | treatments.ts body sections | ✅ Shipped |
| 6.16 | Tier-A area word count ≥1,200 | Deep area hubs | Word count spot-check | enrichment.ts + area template | ✅ Shipped |
| 6.17 | Guide word count ≥1,200 | Topical articles | Word count spot-check | guides.ts | ✅ Shipped |
| 6.18 | Minimum 30 indexed URLs | Google index floor | site: search | 🔍 Verify post-launch | 🔍 Verify post-launch |
| 6.19 | Topical authority — all services covered | Every modality has page | List treatments | 11/11 modalities | ✅ Shipped |
| 6.20 | Local authority — area matrix | Areas × services combinatorial | Sitemap count | Full matrix in sitemap.ts | ✅ Shipped |
| 6.21 | About page | Trust / E-E-A-T support | /about-us/ | Present | ✅ Shipped |
| 6.22 | Contact page | Conversion + NAP | /contact/ | Present | ✅ Shipped |
| 6.23 | No orphan hub pages | Every hub linked from nav | Check nav + footer | Header nav includes Areas, Treatments | ✅ Shipped |
| 6.24 | Sitemap includes all ranks | XML sitemap complete | Fetch sitemap.xml | sitemap.ts generates all types | ✅ Shipped |
| 6.25 | Sitemap priorities | Home > hubs > services > combos | Read sitemap entries | Priority tiers in sitemap.ts | ✅ Shipped |

---

## Section 7 — Interlinking and anchor text

Prof 5-step method: planning → in-body links → area/service lists → varied anchors → orphan check.

| # | Technique | Prof rule | How to verify | Kilimani target | Status |
|---|-----------|-----------|---------------|-----------------|--------|
| 7.1 | Service → in-body area mentions | 1–3 sentences mentioning areas with links | Read 2 treatment pages | In-body copy links to area×service | ✅ Shipped |
| 7.2 | Service → "We serve these areas" list | 3–5 area links at bottom | Bottom of treatment template | Tier A area×service grid | ✅ Shipped |
| 7.3 | Service → "see all areas" hub link | Link to /areas/ | Treatment template | Present | ✅ Shipped |
| 7.4 | Area → in-body service mentions | 2–4 sentences with service links | Read 2 area pages | In-body service links | ✅ Shipped |
| 7.5 | Area → "Services we offer here" section | 3–5+ service links | Area template mid/bottom | Full service list with nested URLs | ✅ Shipped |
| 7.6 | Area → masseuse links | All masseuses linked with combos | Area template | area×masseuse URLs | ✅ Shipped |
| 7.7 | Home → featured areas | Areas we serve section | Homepage | featuredAreas in page.tsx | ✅ Shipped |
| 7.8 | Home → main services | Treatment grid links | Homepage | Treatment cards link to services | ✅ Shipped |
| 7.9 | Home → guides silo | Guide cards linked | Homepage | Guide section | ✅ Shipped |
| 7.10 | Contact → hubs | Link to Areas + Treatments | Contact page | Link sections present | ✅ Shipped |
| 7.11 | Combo → parent area | Link up to area hub | Combo template | Breadcrumb + body links | ✅ Shipped |
| 7.12 | Combo → treatment hub | Link to service page | Combo template | Cross-links present | ✅ Shipped |
| 7.13 | Masseuse → services | Link to specialty treatments | Masseuse page | masseuses/[slug]/page.tsx | ✅ Shipped |
| 7.14 | Masseuse → areas | Link to area×masseuse combos | Masseuse page | Present in template | ✅ Shipped |
| 7.15 | Guide → services + areas | Internal links in guide body | Read 2 guides | guides.ts link suggestions | ✅ Shipped |
| 7.16 | Varied anchor text | No repeated exact-match anchors | Sample 10 pages | Mixed phrasing ("massage in Westlands", "our Swedish service") | ✅ Shipped |
| 7.17 | Natural anchor language | Real person would say this | Read aloud test | Conversational anchors | ✅ Shipped |
| 7.18 | Max ~8–10 promotional links per section | Don't overload single block | Count links per section | Matrix sections grouped, not spammy | ✅ Shipped |
| 7.19 | Links not footer-only | In-body + mid-page sections | Inspect area + treatment | Body links exist | ✅ Shipped |
| 7.20 | No irrelevant links | Only reader-helpful links | Manual review | Links stay on-topic | ✅ Shipped |
| 7.21 | Tier-B areas have inbound links | No orphan area pages | Check sitemap + hub | Linked from constituency parent + neighbors | ✅ Shipped |
| 7.22 | Combo pages have inbound links | Linked from area + service | Trace 3 combos | Area service grid + treatment area list | ✅ Shipped |
| 7.23 | Anchor diversity spot-check | 10 random combos — unique anchors | Manual or script audit | ⚠️ Optional polish — spot-check quarterly | ⚠️ Gap |
| 7.24 | Footer nav links | Treatments, Areas, Guides, Contact | Footer.tsx | Sitewide footer links | ✅ Shipped |
| 7.25 | Header nav links | Primary hubs in main nav | Header.tsx | Areas, Treatments, Masseuses, Guides | ✅ Shipped |

---

## Section 8 — Bold, emphasis, and on-page formatting

| # | Technique | Prof rule | How to verify | Kilimani target | Status |
|---|-----------|-----------|---------------|-----------------|--------|
| 8.1 | NAP bold on About | Key business facts emphasized | /about-us/ | `<strong>{site.napFooter}</strong>` | ✅ Shipped |
| 8.2 | NAP bold on Contact | Visible NAP block | /contact/ | Styled NAP box | ✅ Shipped |
| 8.3 | FAQ questions distinct | H3 or bold for questions | FAQ sections | H3 on questions | ✅ Shipped |
| 8.4 | Bullet lists — benefits | Scannable USP lists | Homepage + areas | whyKilimani bullets on home | ✅ Shipped |
| 8.5 | Bullet lists — directions | Transport / parking tips | Area pages | Enrichment blocks | ✅ Shipped |
| 8.6 | No bold keyword spam | Avoid fake-listing pattern | Visual scan | No stuffed `<strong>` keywords | ✅ Shipped |
| 8.7 | Image alt — local keywords | Alt text with area + service | Inspect img alts | `src/content/media.ts` | ✅ Shipped |
| 8.8 | Image alt — therapist names | Portrait alts descriptive | Masseuse images | media.ts + page alts | ✅ Shipped |
| 8.9 | Geotagged WebP assets | EXIF GPS on photos | EXIF reader | process-kilimani-images.mjs | ✅ Shipped |
| 8.10 | next/image optimization | Responsive images | Lighthouse / view source | next/image throughout | ✅ Shipped |
| 8.11 | Content-body keyword bold | Optional emphasis on primary terms | Spot-check paragraphs | Minimal — optional polish | ⚠️ Gap |
| 8.12 | CTA button prominence | Call + WhatsApp visible | All templates | Conversion.tsx | ✅ Shipped |
| 8.13 | Stats / trust strip | Social proof without fake reviews | Homepage | Stats strip — no fake ratings | ✅ Shipped |
| 8.14 | Readable paragraph length | Short paragraphs for mobile | Mobile view | Tailwind prose spacing | ✅ Shipped |

---

## Section 9 — FAQs and schema markup

| # | Technique | Prof rule | How to verify | Kilimani target | Status |
|---|-----------|-----------|---------------|-----------------|--------|
| 9.1 | Homepage FAQs — count | 8–10 local-flavored Q&A | Count on home | 8 FAQs in page.tsx | ✅ Shipped |
| 9.2 | Homepage FAQPage schema | FAQ JSON-LD on home | validator.schema.org | faqJsonLd(homeFaqs) | ✅ Shipped |
| 9.3 | Treatment FAQs — count | 6–10 per service page | Count on 3 treatments | treatments.ts faqs arrays | ✅ Shipped |
| 9.4 | Treatment FAQPage schema | FAQ JSON-LD per treatment | validator.schema.org | Treatment template | ✅ Shipped |
| 9.5 | Treatment Service schema | Service JSON-LD | validator.schema.org | serviceJsonLd() | ✅ Shipped |
| 9.6 | Tier-A area FAQs — count | 8–10 per area | Count on lavington, kilimani | enrichment.ts | ✅ Shipped |
| 9.7 | Tier-A area FAQPage schema | FAQ JSON-LD | validator.schema.org | Area template | ✅ Shipped |
| 9.8 | Tier-A area Place schema | Place JSON-LD | validator.schema.org | Inline in area page | ✅ Shipped |
| 9.9 | Combo FAQs + schema | FAQs on expanded combos | Sample combo URL | generate-combos.ts | ✅ Shipped |
| 9.10 | Guide FAQs + schema | FAQs per guide article | Sample guide URL | guides.ts | ✅ Shipped |
| 9.11 | Masseuse FAQs + Person schema | 4–6 FAQs + Person JSON-LD | Sample masseuse URL | masseuse template | ✅ Shipped |
| 9.12 | DaySpa global schema | LocalBusiness in layout | validator.schema.org | layout.tsx + daySpaJsonLd() | ✅ Shipped |
| 9.13 | DaySpa areaServed | Multiple Nairobi areas listed | Schema output | Constituencies + key neighborhoods | ✅ Shipped |
| 9.14 | DaySpa hasOfferCatalog | All services in catalog | Schema output | 11 services in offer catalog | ✅ Shipped |
| 9.15 | DaySpa openingHours | 24/7 specification | Schema output | Mon–Sun 00:00–23:59 | ✅ Shipped |
| 9.16 | DaySpa geo coordinates | Lat/long match Maps pin | Compare to GBP pin | -1.293566, 36.76345 | ✅ Shipped |
| 9.17 | DaySpa hasMap | Maps URL in schema | Schema output | site.mapsShort | ✅ Shipped |
| 9.18 | sameAs — WhatsApp | WhatsApp in sameAs | Schema output | wa.me link included | ✅ Shipped |
| 9.19 | sameAs — social profiles | Only real social URLs | Schema output | site.socials empty — add when live | ⚠️ Gap |
| 9.20 | NO fake AggregateRating | Never invent stars/review count | Grep schema | Intentionally omitted — correct | ✅ Shipped |
| 9.21 | BreadcrumbList all nested pages | Breadcrumbs on hubs + depth | 5 sample URLs | breadcrumbJsonLd everywhere | ✅ Shipped |
| 9.22 | FAQ answers — local flavor | Landmarks, neighborhoods named | Read 5 FAQs | Yaya, Marcus Garvey, Adlife, etc. | ✅ Shipped |
| 9.23 | GBP FAQs mirror site | Align GBP Q&A with site FAQs | Compare GBP + site | 👤 Client ops when GBP live | 👤 Client ops |

---

## Section 10 — Technical SEO

| # | Technique | Prof rule | How to verify | Kilimani target | Status |
|---|-----------|-----------|---------------|-----------------|--------|
| 10.1 | Canonical URLs | Self-referencing canonical every page | View source rel=canonical | absoluteUrl() with trailing slash | ✅ Shipped |
| 10.2 | Trailing slash consistency | URLs end with `/` | Check 5 URLs | absoluteUrl enforces slash | ✅ Shipped |
| 10.3 | XML sitemap | All indexable URLs listed | /sitemap.xml | ~2,175 entries in sitemap.ts | ✅ Shipped |
| 10.4 | robots.txt allows crawl | User-agent * allow / | /robots.txt | robots.ts | ✅ Shipped |
| 10.5 | Sitemap in robots.txt | Sitemap directive present | robots.txt | Points to sitemap.xml | ✅ Shipped |
| 10.6 | metadataBase set | OG URLs absolute | layout.tsx | `new URL(site.url)` | ✅ Shipped |
| 10.7 | Open Graph tags | og:title, description, image, url | View source | pageMetadata + layout | ✅ Shipped |
| 10.8 | Twitter card | summary_large_image | View source | seo.ts twitter block | ✅ Shipped |
| 10.9 | OG image — branded | Custom crimson Kilimani image | Social debugger | og-kilimani-hot-massage.webp | ✅ Shipped |
| 10.10 | OG locale | en_KE for Kenya | View source | openGraph.locale | ✅ Shipped |
| 10.11 | lang attribute | `<html lang="en">` | View source | layout.tsx | ✅ Shipped |
| 10.12 | Mobile responsive | Works on phone + desktop | Resize / Lighthouse | Tailwind responsive classes | ✅ Shipped |
| 10.13 | HTTPS production | SSL on live domain | Browser padlock | 🔍 Verify post-deploy | 🔍 Verify post-launch |
| 10.14 | Core Web Vitals | LCP, CLS, INP acceptable | Lighthouse / CrUX | 🔍 Verify post-deploy | 🔍 Verify post-launch |
| 10.15 | Static generation (SSG) | Pre-rendered pages for speed | next build output | generateStaticParams on dynamic routes | ✅ Shipped |
| 10.16 | 404 handling | notFound() on bad slugs | Hit bad URL | Next.js notFound | ✅ Shipped |
| 10.17 | No accidental noindex | Pages indexable by default | View robots meta | No noindex on public pages | ✅ Shipped |
| 10.18 | Favicon / app icons | Brand mark in tab | Browser tab | Next.js public assets | ✅ Shipped |
| 10.19 | Internal search not blocking | No crawl traps | Crawl sitemap | Clean URL structure | ✅ Shipped |
| 10.20 | Uniqueness guard script | No Lavington-as-brand leaks | npm run check:unique | scripts/check-uniqueness.mjs | ✅ Shipped |
| 10.21 | Build passes | Production build clean | npm run build | CI / local build | ✅ Shipped |
| 10.22 | Google Search Console | Property verified post-launch | GSC dashboard | 🔍 Verify post-deploy | 🔍 Verify post-launch |
| 10.23 | Submit sitemap to GSC | Sitemap submitted after deploy | GSC sitemaps | 🔍 Verify post-deploy | 🔍 Verify post-launch |

---

## Section 11 — Citations (80/20 + SERP mining)

| # | Technique | Prof rule | How to verify | Kilimani target | Status |
|---|-----------|-----------|---------------|-----------------|--------|
| 11.1 | Bing Places | Core citation — NAP match | Claim + verify | bing.com/forbusiness | 👤 Client ops |
| 11.2 | Apple Business Connect | Core citation | Claim + verify | businessconnect.apple.com | 👤 Client ops |
| 11.3 | Facebook Business Page | Core — NAP + hours + website | Page settings | Facebook Business | 👤 Client ops |
| 11.4 | Foursquare Business | Core listing | Claim listing | foursquare.com/business | 👤 Client ops |
| 11.5 | Google Business Profile | Primary citation | Already claimed | GBP dashboard | 👤 Client ops |
| 11.6 | Yelp (if relevant KE) | Prof 80/20 list | Claim if applicable | biz.yelp.com | 👤 Client ops |
| 11.7 | NAP identical all citations | Name, address, phone exact | CITATIONS_TRACKER audit | Tracker template ready | 👤 Client ops |
| 11.8 | Hours on citations | Match 24/7 claim | Each directory | Open 24/7 | 👤 Client ops |
| 11.9 | Website URL on citations | kilimanihotmassage.co.ke | Each directory | Consistent URL | 👤 Client ops |
| 11.10 | SERP directory mining | Top-20 organic for keyword → claim directories ranking | Search `massage spa Nairobi` | Identify Sortlist-style dirs | 👤 Client ops |
| 11.11 | Competitor backlink profiles | Maps "More about" → citation sources | Top 3 competitors | Fill voids only | 👤 Client ops |
| 11.12 | Kenya wellness directories | Niche-local lists | AI + SERP research | Tourism/wellness lists | 👤 Client ops |
| 11.13 | TomTom / HERE Maps | Nav partner citations | Claim if available KE | Nav software partners | 👤 Client ops |
| 11.14 | Automotive nav (Toyota etc.) | Prof example — high-trust nav citations | Where available | Optional advanced | 👤 Client ops |
| 11.15 | Quality over quantity | 10 strong > 200 weak | Prioritize core 10 | Prof "core 10" principle | 👤 Client ops |
| 11.16 | Citation tracker maintained | Status per directory | CITATIONS_TRACKER.md | Template in docs/ops | ✅ Shipped |
| 11.17 | Fix NAP mismatches first | Clean before adding more | Audit existing listings | Before expanding | 👤 Client ops |
| 11.18 | Paid aggregator (optional) | Leadsnap / FatJoe if gaps remain | After manual core 10 | Only if needed | 👤 Client ops |

---

## Section 12 — Weekly cadence, geotagging, and white-hat

| # | Technique | Prof rule | How to verify | Kilimani target | Status |
|---|-----------|-----------|---------------|-----------------|--------|
| 12.1 | Fixed client update day | e.g. Friday = update day | Calendar | [WEEKLY_CADENCE.md](ops/WEEKLY_CADENCE.md) | 👤 Client ops |
| 12.2 | Weekly GBP post | 1–2×/week service or area post | GBP post log | Ongoing | 👤 Client ops |
| 12.3 | Weekly geotagged photo | Upload + geotag for weak cells | Photo log + EXIF | geoimgr.com workflow | 👤 Client ops |
| 12.4 | Heatmap re-check | Compare vs baseline monthly | Leadsnap | [BENCHMARK.md](ops/BENCHMARK.md) | 👤 Client ops |
| 12.5 | Review velocity tracking | Steady new reviews | GBP insights | Monthly count | 👤 Client ops |
| 12.6 | IG/FB cross-post (optional) | Social activity signals | Social profiles | When profiles exist | ⚠️ Gap |
| 12.7 | White-hat only | No fake listings, no bought reviews | Team policy | Documented in BENCHMARK | ✅ Shipped |
| 12.8 | Fake spam report SOP | Evidence-based Maps reports only | BENCHMARK.md | Screenshot + suggest edit | ✅ Shipped |
| 12.9 | Never attack real businesses | Report only clear spam | Team policy | White-hat rule | ✅ Shipped |
| 12.10 | Geotag SOP documented | Team knows geoimgr workflow | Read GEOTAG_SOP | docs/ops/GEOTAG_SOP.md | ✅ Shipped |
| 12.11 | AI-generated photo fallback | Screenshot + geotag if no photos | Prof advanced tip | GEOTAG_SOP covers | ✅ Shipped |
| 12.12 | Uniqueness vs competitors | Site distinct from lavingtonhotmassage.co.ke | npm run check:unique | check-uniqueness.mjs | ✅ Shipped |

---

## Gap closure priority (Kilimani)

| Priority | Item | Owner | Notes |
|----------|------|-------|-------|
| 1 | GBP full optimization | 👤 Client | Services (99), FAQs, bookings, posts, photos |
| 2 | Core citations (Bing, Apple, Facebook, Foursquare) | 👤 Client | CITATIONS_TRACKER |
| 3 | Index verification | 🔍 Post-deploy | `site:kilimanihotmassage.co.ke` |
| 4 | Heatmap baseline + monthly re-check | 👤 Client | Leadsnap on primary keywords |
| 5 | Social profiles + sameAs | 👤 Client | Populate `site.socials` in site.ts |
| 6 | Production deploy + GSC + HTTPS | 🔍 Post-deploy | Lighthouse + CrUX |
| 7 | Anchor diversity spot-check | ⚠️ Optional | Quarterly sample on combo pages |
| 8 | Content-body keyword bold | ⚠️ Optional | Polish pass, not blocker |

---

## Master scorecard

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
| **Total items** | **~158** | **~14** | **~53** |

**Onsite SEO (basic + advanced): largely shipped.** Remaining work is mostly GBP execution, citations, post-launch verification, and social profile linkage.

---

*Last updated: audit checklist generated for Kilimani Hot Massage codebase. Re-run `npm run check:unique` and schema validator after any content deploy.*
