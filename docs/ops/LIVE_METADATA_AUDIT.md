# Live Metadata Audit Report

**Site:** https://kilimanihotmassage.co.ke  
**Run:** 2026-08-28 13:45:56 UTC  
**Repo branch audited against:** `cursor/keyword-targeting-ec5b`  
**NAP lock:** `Kilimani Hot Massage · 0746 203398 · Marcus Garvey Rd, Nairobi`

---

## Executive summary

| Wave | Scope | Pass | Total |
|------|-------|------|-------|
| 2 | Title / description / canonical / OG (sample URLs) | 0 | 13 |
| 3 | robots.txt + sitemap.xml | 1 | 2 |
| 4 | JSON-LD schema (6 validator URLs) | 6 | 6 |
| 5 | On-page H1 / FAQ / NAP / treatment count | 0 | 3 |

> **Note:** Production may lag repo until `cursor/keyword-targeting-ec5b` is merged to `main` and deployed.

---

## Wave 2 — Title tags & meta descriptions

| Page | HTTP | Title | Description | Canonical | OG |
|------|------|-------|-------------|-----------|-----|
| Home | 200 | ❌ | ❌ | ✅ | ❌ |
| Treatments hub | 200 | ❌ | ✅ | ✅ | ❌ |
| Masseuses hub | 200 | ❌ | ❌ | ✅ | ❌ |
| Areas hub | 200 | ❌ | ✅ | ✅ | ❌ |
| Guides hub | 200 | ❌ | ✅ | ✅ | ❌ |
| Contact | 200 | ❌ | ✅ | ✅ | ❌ |
| Nuru treatment | 200 | ❌ | ❌ | ✅ | ❌ |
| Full body treatment | 404 | ❌ | ❌ | ❌ | ❌ |
| Kilimani area | 200 | ❌ | ✅ | ✅ | ❌ |
| Masseuse Amara | 200 | ❌ | ✅ | ✅ | ❌ |
| Massage and extras guide | 404 | ❌ | ❌ | ❌ | ❌ |
| Lavington × Nuru combo | 200 | ❌ | ✅ | ✅ | ❌ |
| Kilimani × Swedish combo | 200 | ❌ | ✅ | ✅ | ❌ |

### Diffs (failures only)

#### Home (`/`)

- **title**
  - Expected: `BEST Massage Spa Kilimani - Kilimani massage & spa near me - if you want massage spa near me, Swedish, Nuru, full body & couples on Marcus Garvey Rd - Kilimani Hot Massage open 24/7`
  - Live: `BEST Massage Spa Kilimani Nairobi - Swedish, Deep Tissue, Nuru, Couples &amp; more near me | Kilimani Hot Massage`
- **description**
  - Expected: `Massage Kilimani & Spa Kilimani on Marcus Garvey Rd — massage near me, massage spa near me, Swedish, Nuru, full body & couples. Open 24/7. Call or WhatsApp 0746 203398.`
  - Live: `Massage Spa Kilimani on Marcus Garvey Rd. Open 24/7. Swedish, deep tissue, Nuru, couples &amp; more. Call or WhatsApp 0746 203398.`
- **ogTitle**
  - Expected: `BEST Massage Spa Kilimani - Kilimani massage & spa near me - if you want massage spa near me, Swedish, Nuru, full body & couples on Marcus Garvey Rd - Kilimani Hot Massage open 24/7`
  - Live: `Kilimani Hot Massage | BEST Massage Spa Kilimani Nairobi`
- **ogDescription**
  - Expected: `Massage Kilimani & Spa Kilimani on Marcus Garvey Rd — massage near me, massage spa near me, Swedish, Nuru, full body & couples. Open 24/7. Call or WhatsApp 0746 203398.`
  - Live: `Massage Spa Kilimani on Marcus Garvey Rd. Open 24/7. Call or WhatsApp 0746 203398.`

#### Treatments hub (`/massage-treatments/`)

- **title**
  - Expected: `BEST Massage Treatments near me Kilimani - Marcus Garvey Rd spa open 24/7 | Kilimani Hot Massage`
  - Live: `Massage Treatments Kilimani Nairobi | Kilimani Hot Massage`
- **ogTitle**
  - Expected: `BEST Massage Treatments near me Kilimani - Marcus Garvey Rd spa open 24/7 | Kilimani Hot Massage`
  - Live: `Massage Treatments Kilimani Nairobi`

#### Masseuses hub (`/masseuses/`)

- **title**
  - Expected: `Masseuse near me Kilimani - book on Marcus Garvey Rd massage spa open 24/7 | Kilimani Hot Massage`
  - Live: `Massage Therapists in Kilimani Nairobi | Kilimani Hot Massage`
- **description**
  - Expected: `Masseuse near me in Kilimani—Amara, Zuri, Aisha, Nuri, Keisha, and Lina in private massage rooms on Marcus Garvey Rd. Open 24/7. WhatsApp 0746 203398.`
  - Live: `Meet our massage therapists at Kilimani Hot Massage—Amara, Zuri, Aisha, Nuru, Keisha, and Lina. Open 24/7. WhatsApp 0746 203398.`
- **ogTitle**
  - Expected: `Masseuse near me Kilimani - book on Marcus Garvey Rd massage spa open 24/7 | Kilimani Hot Massage`
  - Live: `Massage Therapists in Kilimani Nairobi`
- **ogDescription**
  - Expected: `Masseuse near me in Kilimani—Amara, Zuri, Aisha, Nuri, Keisha, and Lina in private massage rooms on Marcus Garvey Rd. Open 24/7. WhatsApp 0746 203398.`
  - Live: `Meet our massage therapists at Kilimani Hot Massage—Amara, Zuri, Aisha, Nuru, Keisha, and Lina. Open 24/7. WhatsApp 0746 203398.`

#### Areas hub (`/areas/`)

- **title**
  - Expected: `Massage near me Nairobi areas - Marcus Garvey Rd Kilimani spa open 24/7 | Kilimani Hot Massage`
  - Live: `Areas We Serve — Nairobi County Massage | Kilimani Hot Massage`
- **ogTitle**
  - Expected: `Massage near me Nairobi areas - Marcus Garvey Rd Kilimani spa open 24/7 | Kilimani Hot Massage`
  - Live: `Areas We Serve — Nairobi County Massage`

#### Guides hub (`/guides/`)

- **title**
  - Expected: `Massage spa guides near me Kilimani - Marcus Garvey Rd open 24/7 | Kilimani Hot Massage`
  - Live: `Massage Guides Kilimani Nairobi | Tips &amp; Booking | Kilimani Hot Massage`
- **ogTitle**
  - Expected: `Massage spa guides near me Kilimani - Marcus Garvey Rd open 24/7 | Kilimani Hot Massage`
  - Live: `Massage Guides Kilimani Nairobi | Tips &amp; Booking`

#### Contact (`/contact/`)

- **title**
  - Expected: `Contact Massage Spa Kilimani near me - Marcus Garvey Rd open 24/7 | Call 0746 203398 | Kilimani Hot Massage`
  - Live: `Contact | Kilimani Hot Massage`
- **ogTitle**
  - Expected: `Contact Massage Spa Kilimani near me - Marcus Garvey Rd open 24/7 | Call 0746 203398 | Kilimani Hot Massage`
  - Live: `Contact`

#### Nuru treatment (`/massage-treatments/nuru-massage/`)

- **title**
  - Expected: `Nuru Massage near me Kilimani - book Nuru Massage on Marcus Garvey Rd massage spa - open 24/7 | Kilimani Hot Massage`
  - Live: `Nuru Massage Kilimani Nairobi | Kilimani Hot Massage | Kilimani Hot Massage`
- **description**
  - Expected: `Nuru Massage Kilimani in a private locked suite on Marcus Garvey Rd. Warm gel, consent-led, open 24/7. Call 0746 203398.`
  - Live: `Private Nuru massage in Kilimani. Discreet suites, open 24/7. Call 0746 203398.`
- **ogTitle**
  - Expected: `Nuru Massage near me Kilimani - book Nuru Massage on Marcus Garvey Rd massage spa - open 24/7 | Kilimani Hot Massage`
  - Live: `Kilimani Hot Massage | BEST Massage Spa Kilimani Nairobi`
- **ogDescription**
  - Expected: `Nuru Massage Kilimani in a private locked suite on Marcus Garvey Rd. Warm gel, consent-led, open 24/7. Call 0746 203398.`
  - Live: `Massage Spa Kilimani on Marcus Garvey Rd. Open 24/7. Call or WhatsApp 0746 203398.`
- **ogUrl**
  - Expected: `https://kilimanihotmassage.co.ke/massage-treatments/nuru-massage/`
  - Live: `https://kilimanihotmassage.co.ke/`

#### Full body treatment (`/massage-treatments/full-body-massage/`)

- **HTTP 404** (expected 200)
- **title**
  - Expected: `Full Body Massage near me Kilimani - book Full Body Massage on Marcus Garvey Rd massage spa - open 24/7 | Kilimani Hot Massage`
  - Live: `(n/a)`
- **description**
  - Expected: `Full Body Massage Kilimani & full body massage near me on Marcus Garvey Rd. Warm oil, adjustable pressure, private suites. Open 24/7. WhatsApp 0746 203398.`
  - Live: `(n/a)`
- **canonical**
  - Expected: `https://kilimanihotmassage.co.ke/massage-treatments/full-body-massage/`
  - Live: `(n/a)`
- **ogTitle**
  - Expected: `Full Body Massage near me Kilimani - book Full Body Massage on Marcus Garvey Rd massage spa - open 24/7 | Kilimani Hot Massage`
  - Live: `(n/a)`
- **ogDescription**
  - Expected: `Full Body Massage Kilimani & full body massage near me on Marcus Garvey Rd. Warm oil, adjustable pressure, private suites. Open 24/7. WhatsApp 0746 203398.`
  - Live: `(n/a)`
- **ogUrl**
  - Expected: `https://kilimanihotmassage.co.ke/massage-treatments/full-body-massage/`
  - Live: `(n/a)`

#### Kilimani area (`/areas/kilimani/`)

- **title**
  - Expected: `Massage Kilimani near me - Kilimani guests Marcus Garvey Rd spa open 24/7 | Kilimani Hot Massage`
  - Live: `Massage in Kilimani Nairobi | Kilimani Hot Massage | Kilimani Hot Massage`
- **ogTitle**
  - Expected: `Massage Kilimani near me - Kilimani guests Marcus Garvey Rd spa open 24/7 | Kilimani Hot Massage`
  - Live: `Kilimani Hot Massage | BEST Massage Spa Kilimani Nairobi`
- **ogDescription**
  - Expected: `About 5–10 minutes via Marcus Garvey Rd or James Gichuru Rd. Book massage for Kilimani guests at Kilimani Hot Massage on Marcus Garvey Rd. Open 24/7. Call 0746 203398.`
  - Live: `Massage Spa Kilimani on Marcus Garvey Rd. Open 24/7. Call or WhatsApp 0746 203398.`
- **ogUrl**
  - Expected: `https://kilimanihotmassage.co.ke/areas/kilimani/`
  - Live: `https://kilimanihotmassage.co.ke/`

#### Masseuse Amara (`/masseuses/amara/`)

- **title**
  - Expected: `Amara masseuse near me Kilimani - book on Marcus Garvey Rd open 24/7 | Kilimani Hot Massage`
  - Live: `Amara Masseuse Kilimani Nairobi | Kilimani Hot Massage | Kilimani Hot Massage`
- **ogTitle**
  - Expected: `Amara masseuse near me Kilimani - book on Marcus Garvey Rd open 24/7 | Kilimani Hot Massage`
  - Live: `Kilimani Hot Massage | BEST Massage Spa Kilimani Nairobi`
- **ogDescription**
  - Expected: `Book Amara for Swedish, deep tissue, or hot stone massage in Kilimani. Open 24/7. WhatsApp 0746 203398.`
  - Live: `Massage Spa Kilimani on Marcus Garvey Rd. Open 24/7. Call or WhatsApp 0746 203398.`
- **ogUrl**
  - Expected: `https://kilimanihotmassage.co.ke/masseuses/amara/`
  - Live: `https://kilimanihotmassage.co.ke/`

#### Massage and extras guide (`/guides/massage-and-extras-kilimani/`)

- **HTTP 404** (expected 200)
- **title**
  - Expected: `Massage and Extras near me Kilimani - Marcus Garvey Rd Kilimani open 24/7 | Kilimani Hot Massage`
  - Live: `(n/a)`
- **description**
  - Expected: `Massage and extras near me on Marcus Garvey Rd—consent-led adult sessions, Nuru, erotic, and lingam options in private suites. Adults only. WhatsApp 0746 203398.`
  - Live: `(n/a)`
- **canonical**
  - Expected: `https://kilimanihotmassage.co.ke/guides/massage-and-extras-kilimani/`
  - Live: `(n/a)`
- **ogTitle**
  - Expected: `Massage and Extras near me Kilimani - Marcus Garvey Rd Kilimani open 24/7 | Kilimani Hot Massage`
  - Live: `(n/a)`
- **ogDescription**
  - Expected: `Massage and extras near me on Marcus Garvey Rd—consent-led adult sessions, Nuru, erotic, and lingam options in private suites. Adults only. WhatsApp 0746 203398.`
  - Live: `(n/a)`
- **ogUrl**
  - Expected: `https://kilimanihotmassage.co.ke/guides/massage-and-extras-kilimani/`
  - Live: `(n/a)`

#### Lavington × Nuru combo (`/areas/lavington/services/nuru-massage/`)

- **title**
  - Expected: `Nuru Massage near me Lavington - from Lavington to Marcus Garvey Rd Kilimani - open 24/7 | Kilimani Hot Massage`
  - Live: `Nuru Massage in Lavington | Kilimani Hot Massage | Kilimani Hot Massage`
- **ogTitle**
  - Expected: `Nuru Massage near me Lavington - from Lavington to Marcus Garvey Rd Kilimani - open 24/7 | Kilimani Hot Massage`
  - Live: `Kilimani Hot Massage | BEST Massage Spa Kilimani Nairobi`
- **ogDescription**
  - Expected: `Book Nuru Massage for guests in Lavington. Studio on Marcus Garvey Rd, Kilimani. Open 24/7. Call 0746 203398.`
  - Live: `Massage Spa Kilimani on Marcus Garvey Rd. Open 24/7. Call or WhatsApp 0746 203398.`
- **ogUrl**
  - Expected: `https://kilimanihotmassage.co.ke/areas/lavington/services/nuru-massage/`
  - Live: `https://kilimanihotmassage.co.ke/`

#### Kilimani × Swedish combo (`/areas/kilimani/services/swedish-massage/`)

- **title**
  - Expected: `Swedish Massage near me Kilimani - book Swedish Massage on Marcus Garvey Rd massage spa - open 24/7 | Kilimani Hot Massage`
  - Live: `Swedish Massage in Kilimani | Kilimani Hot Massage | Kilimani Hot Massage`
- **ogTitle**
  - Expected: `Swedish Massage near me Kilimani - book Swedish Massage on Marcus Garvey Rd massage spa - open 24/7 | Kilimani Hot Massage`
  - Live: `Kilimani Hot Massage | BEST Massage Spa Kilimani Nairobi`
- **ogDescription**
  - Expected: `Book Swedish Massage for guests in Kilimani. Studio on Marcus Garvey Rd, Kilimani. Open 24/7. Call 0746 203398.`
  - Live: `Massage Spa Kilimani on Marcus Garvey Rd. Open 24/7. Call or WhatsApp 0746 203398.`
- **ogUrl**
  - Expected: `https://kilimanihotmassage.co.ke/areas/kilimani/services/swedish-massage/`
  - Live: `https://kilimanihotmassage.co.ke/`

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
| URL count ≥ 2175 | ❌ **2140** |
| full-body-massage entry | ❌ |
| massage-and-extras-kilimani entry | ❌ |
| lavington/nuru combo entry | ❌ |

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

HTTP **200** · Overall ❌

| Check | Pass |
|-------|------|
| H1 "Massage Spa Kilimani" | ✅ |
| H2 "Spa near me on Marcus Garvey Rd" | ❌ |
| FAQ: massage spa near me | ❌ |
| FAQ: massage rooms near me | ❌ |
| FAQ: masseuse near me | ❌ |
| Visible NAP footer string | ✅ |
| Treatment links in grid (11/12) | ❌ |

### Masseuse hub on-page (`/masseuses/`)

HTTP **200** · Overall ❌

| Check | Pass |
|-------|------|
| H1 "Masseuse near me in Kilimani" | ❌ |

### Contact on-page (`/contact/`)

HTTP **200** · Overall ❌

| Check | Pass |
|-------|------|
| "Private massage rooms" block | ❌ |
| Phone visible | ✅ |

---

## Wave 6 — Deploy checklist

**Status (2026-08-28):** cursor/keyword-targeting-ec5b merged to main and pushed to GitHub (a5253ad). Repo build: **2,263** static pages. Production host still serves pre-merge build — re-run audit after deploy.

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

**Expected post-deploy fixes:** Prof hybrid titles on all sample URLs, /massage-treatments/full-body-massage/ and /guides/massage-and-extras-kilimani/ return 200, sitemap ≥2,189 URLs, home keyword H2 + 11 FAQs + 12 treatment links, masseuse hub H1, contact private rooms block.

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

