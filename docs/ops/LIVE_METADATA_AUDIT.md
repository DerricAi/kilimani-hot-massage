# Live Metadata Audit Report

**Site:** https://kilimanihotmassage.co.ke  
**Run:** 2026-08-28 14:19:18 UTC  
**Repo branch audited against:** `main` (FaqAccordion h3 + heading audit)  
**NAP lock:** `Kilimani Hot Massage · 0746 203398 · Marcus Garvey Rd, Nairobi`

---

## Executive summary

| Wave | Scope | Pass | Total |
|------|-------|------|-------|
| 2 | Title / description / canonical / OG (sample URLs) | 13 | 13 |
| 3 | robots.txt + sitemap.xml | 2 | 2 |
| 4 | JSON-LD schema (6 validator URLs) | 6 | 6 |
| 5 | On-page H1 / FAQ / NAP / treatment count | 5 | 5 |

> **Status:** Production matches repo — all audit waves green.

---

## Wave 2 — Title tags & meta descriptions

| Page | HTTP | Title | Description | Canonical | OG |
|------|------|-------|-------------|-----------|-----|
| Home | 200 | ✅ | ✅ | ✅ | ✅ |
| Treatments hub | 200 | ✅ | ✅ | ✅ | ✅ |
| Masseuses hub | 200 | ✅ | ✅ | ✅ | ✅ |
| Areas hub | 200 | ✅ | ✅ | ✅ | ✅ |
| Guides hub | 200 | ✅ | ✅ | ✅ | ✅ |
| Contact | 200 | ✅ | ✅ | ✅ | ✅ |
| Nuru treatment | 200 | ✅ | ✅ | ✅ | ✅ |
| Full body treatment | 200 | ✅ | ✅ | ✅ | ✅ |
| Kilimani area | 200 | ✅ | ✅ | ✅ | ✅ |
| Masseuse Amara | 200 | ✅ | ✅ | ✅ | ✅ |
| Massage and extras guide | 200 | ✅ | ✅ | ✅ | ✅ |
| Lavington × Nuru combo | 200 | ✅ | ✅ | ✅ | ✅ |
| Kilimani × Swedish combo | 200 | ✅ | ✅ | ✅ | ✅ |

### Diffs (failures only)

---

## Wave 3 — Technical metadata

### robots.txt

| Check | Result |
|-------|--------|
| HTTP 200 | ✅ 200 |
| Allow / | ✅ |
| Sitemap directive | ✅ |
| Host directive | ✅ |

### sitemap.xml

| Check | Result |
|-------|--------|
| HTTP 200 | ✅ 200 |
| URL count ≥ 2175 | ✅ **2259** |
| full-body-massage entry | ✅ |
| massage-and-extras-kilimani entry | ✅ |
| lavington/nuru combo entry | ✅ |

### Other

| Check | Result |
|-------|--------|
| HTTPS base URL | ✅ |

---

## Wave 4 — JSON-LD schema

Manual re-validation: [validator.schema.org](https://validator.schema.org/)

| URL | Types expected | Types found | Pass |
|-----|----------------|-------------|------|
| / | DaySpa, FAQPage | DaySpa, FAQPage | ✅ |
| /massage-treatments/swedish-massage/ | Service, FAQPage | DaySpa, BreadcrumbList, Service, FAQPage | ✅ |
| /areas/lavington/ | Place, FAQPage | DaySpa, BreadcrumbList, Place, FAQPage | ✅ |
| /areas/kilimani/services/deep-tissue-massage/ | Service | DaySpa, BreadcrumbList, Service, FAQPage | ✅ |
| /guides/how-to-book-24-7-spa-kilimani/ | FAQPage | DaySpa, BreadcrumbList, Article, FAQPage | ✅ |
| /masseuses/amara/ | Person | DaySpa, BreadcrumbList, Person, FAQPage | ✅ |

### Home DaySpa NAP vs `schema.ts`

| Field | Live |
|-------|------|
| name | Kilimani Hot Massage |
| telephone | 0746 203398 |
| streetAddress | Marcus Garvey Rd |
| hasOpeningHours | true |
| hasGeo | true |
| hasMap | true |
| areaServedCount | 24 |

---

## Wave 5 — Visible on-page content

### Home on-page (`/`)

HTTP **200** · Overall ✅

| Check | Pass |
|-------|------|
| H1 "Massage Spa Kilimani" | ✅ |
| H2 "Spa near me on Marcus Garvey Rd" | ✅ |
| FAQ: massage spa near me | ✅ |
| FAQ: massage rooms near me | ✅ |
| FAQ: masseuse near me | ✅ |
| Visible NAP footer string | ✅ |
| Treatment links in grid (12/12) | ✅ |
| FAQ H3 questions (semantic) (11/11) | ✅ |

### Swedish treatment on-page (`/massage-treatments/swedish-massage/`)

HTTP **200** · Overall ✅

| Check | Pass |
|-------|------|
| H1 "Swedish Massage in Kilimani" | ✅ |
| H2 "Benefits" | ✅ |
| H2 "FAQs" | ✅ |
| FAQ H3 questions (8/6) | ✅ |

### Lavington area on-page (`/areas/lavington/`)

HTTP **200** · Overall ✅

| Check | Pass |
|-------|------|
| H1 "Massage in Lavington" | ✅ |
| H2 FAQ section "Lavington" | ✅ |
| FAQ H3 questions (9/1) | ✅ |

### Masseuse hub on-page (`/masseuses/`)

HTTP **200** · Overall ✅

| Check | Pass |
|-------|------|
| H1 "Masseuse near me in Kilimani" | ✅ |

### Contact on-page (`/contact/`)

HTTP **200** · Overall ✅

| Check | Pass |
|-------|------|
| H2 "Private massage rooms" | ✅ |
| "Private massage rooms" block | ✅ |
| Phone visible | ✅ |

---

## Wave 6 — Deploy checklist

**Status (2026-08-28):** main branch — FaqAccordion H3, per-page OG via pageMetadata, audit fixes. Wave 5: 5/5 on-page pass live. Remaining: 8/13 metadata fail on deep-page OG tags until host redeploys latest main.

1. ~~Merge cursor/keyword-targeting-ec5b → main~~ ✅ Done
2. **Deploy** static export / host rebuild for https://kilimanihotmassage.co.ke (client-managed host)
3. Re-run:
```bash
npm run audit:live
npm run check:titles
npm run check:keywords
npm run build
```
4. Flip checklist items from 🔍 Verify live → ✅ Verified live when Wave 2 sample passes

**Expected post-deploy fixes:** Prof hybrid titles on all sample URLs, /massage-treatments/full-body-massage/ and /guides/massage-and-extras-kilimani/ return 200, sitemap ≥2,189 URLs, home keyword H2 + 11 FAQ H3s + 12 treatment links, masseuse hub H1, contact private rooms H2 block.

---

## Schema validator links

| Page | URL |
|------|-----|
| Home | https://kilimanihotmassage.co.ke/ |
| Swedish treatment | https://kilimanihotmassage.co.ke/massage-treatments/swedish-massage/ |
| Lavington area | https://kilimanihotmassage.co.ke/areas/lavington/ |
| Combo | https://kilimanihotmassage.co.ke/areas/kilimani/services/deep-tissue-massage/ |
| Guide | https://kilimanihotmassage.co.ke/guides/how-to-book-24-7-spa-kilimani/ |
| Masseuse | https://kilimanihotmassage.co.ke/masseuses/amara/ |

