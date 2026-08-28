# Prof Content Compliance Audit

**Site:** https://kilimanihotmassage.co.ke  
**Run:** 2026-08-28 14:39:52 UTC  
**Command:** `npm run audit:prof`  
**NAP lock:** `Kilimani Hot Massage · 0746 203398 · Marcus Garvey Rd, Nairobi`

---

## Executive scorecard

| Step | Checklist IDs | Result |
|------|---------------|--------|
| check:unique | 12.12 | ✅ Pass |
| check:titles | 4.x | ✅ Pass |
| check:keywords | 4.x | ✅ Pass |
| check:content | 6.15–7.23, 9.x, 10.20 | ✅ Pass |
| check:links | 7.5 Step 5 | ✅ Pass |
| check:media | 8.x media | ✅ Pass |
| audit:live | 5.x, 9.x schema, 10.x metadata | ✅ Pass |
| audit:live:content | 6.15–7.20, 8.12, 9.x, 12.12 live | ✅ Pass |

**Overall:** 8/8 steps green

> **Status:** Prof Phase 3 onsite compliance verified — repo guards + live sample audit green.

---

## Checklist mapping (Phase 3 scope)

| ID | Rule | Tool |
|----|------|------|
| 6.15 | Treatment pages ≥1,500 words | check:content + audit:live:content |
| 6.16 | Tier-A area pages ≥1,200 words | check:content + audit:live:content |
| 6.17 | Guide pages ≥1,200 words | check:content + audit:live:content |
| 7.1–7.22 | Interlinking matrix | check:content (template grep) |
| 7.5 Step 5 | Incoming links / orphans | check:links |
| 7.23 | Anchor diversity sample | check:content (10 combo anchors) |
| 8.x | Image alt + media.ts | check:media |
| 8.12 | CTA present | audit:live:content |
| 9.1–9.11 | FAQ depth + local flavor | check:content + audit:live:content |
| 9.20 | No fake AggregateRating | audit:live:content |
| 10.20 | Cross-page copy uniqueness | check:content (combo hash) |
| 12.12 | No competitor banned strings | check:unique + audit:live:content |

---

## Linked reports

- [LIVE_METADATA_AUDIT.md](./LIVE_METADATA_AUDIT.md) — metadata/schema/on-page waves
- [LIVE_CONTENT_AUDIT.md](./LIVE_CONTENT_AUDIT.md) — live content sample URLs

Metadata audit status: green (see linked report).
Live content audit: 9/9 sample URLs.

---

## Verification status

After this green run, checklist items **6.15–6.17**, **7.1–7.22**, and **9.3–9.11** may be marked **Verified live (content audit)** in LOCAL_SEO_MASTER_CHECKLIST.md.
