# Prof Content Compliance Audit

**Site:** https://kilimanihotmassage.co.ke  
**Run:** 2026-08-28 14:19:17 UTC  
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
| audit:live | 5.x, 9.x schema, 10.x metadata | ✅ Pass |
| audit:live:content | 6.15–7.20, 8.12, 9.x, 12.12 live | ❌ Fail |

**Overall:** 5/6 steps green

> **Note:** One or more audit steps failed. Fix repo/live issues and re-run `npm run audit:prof`.

---

## Checklist mapping (Phase 3 scope)

| ID | Rule | Tool |
|----|------|------|
| 6.15 | Treatment pages ≥1,500 words | check:content + audit:live:content |
| 6.16 | Tier-A area pages ≥1,200 words | check:content + audit:live:content |
| 6.17 | Guide pages ≥1,200 words | check:content + audit:live:content |
| 7.1–7.22 | Interlinking matrix | check:content (template grep) |
| 7.23 | Anchor diversity sample | check:content (10 combo anchors) |
| 8.12 | CTA present | audit:live:content |
| 9.1–9.11 | FAQ depth + local flavor | check:content + audit:live:content |
| 9.20 | No fake AggregateRating | audit:live:content |
| 10.20 | Cross-page copy uniqueness | check:content (combo hash) |
| 12.12 | No competitor banned strings | check:unique + audit:live:content |

---

## Live content failures (audit:live:content)

```
Live content audit: https://kilimanihotmassage.co.ke

  ✅ Home — 1151 words, 11 FAQ H3, 38 main links
  ✅ Swedish treatment — 2221 words, 8 FAQ H3, 27 main links
  ✅ Nuru treatment — 1717 words, 8 FAQ H3, 26 main links
  ✅ Lavington area — 1920 words, 9 FAQ H3, 35 main links
  ✅ Kilimani area — 1984 words, 11 FAQ H3, 35 main links
  ✅ Lavington × Nuru combo — 530 words, 6 FAQ H3, 11 main links
  ✅ Kilimani × Deep tissue combo — 553 words, 6 FAQ H3, 12 main links
  ❌ Massage and extras guide — 789 words, 6 FAQ H3, 13 main links
  ✅ Masseuse Amara — 627 words, 5 FAQ H3, 11 main links

Report: docs/ops/LIVE_CONTENT_AUDIT.md (8/9 pass)

Live content audit failed.

```

---

## Linked reports

- [LIVE_METADATA_AUDIT.md](./LIVE_METADATA_AUDIT.md) — metadata/schema/on-page waves
- [LIVE_CONTENT_AUDIT.md](./LIVE_CONTENT_AUDIT.md) — live content sample URLs

Metadata audit status: green (see linked report).
Live content audit: 8/9 sample URLs.

---

## Verification status

Do not flip checklist items to Verified live until all steps pass.
