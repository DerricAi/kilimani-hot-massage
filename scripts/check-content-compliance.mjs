#!/usr/bin/env node
/**
 * Prof Phase 3 repo content compliance — word counts, FAQs, interlinking, anchors, duplicate copy.
 * Run: npm run check:content
 */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  read,
  wordCount,
  parseTreatmentBlocks,
  parseGuideBlocks,
  parseMasseuseBlocks,
  parseAreaRecords,
  parseMergedAreaEnrichments,
  parseGuideDepthSections,
  parseTierASlugs,
  parseServiceComboExtras,
  comboOpeningParagraph,
  tierBEnrichmentText,
  serviceComboMetaDescription,
  masseuseComboMetaDescription,
  masseuseComboBodyText,
  LOCAL_FLAVOR_KEYWORDS,
} from "./audit-lib.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];

function fail(msg) {
  errors.push(msg);
}

function warn(msg) {
  warnings.push(msg);
}

function templateMustContain(file, patterns, label) {
  const src = read(file);
  for (const p of patterns) {
    if (!src.includes(p)) {
      fail(`${label}: missing required pattern in ${file}: ${JSON.stringify(p)}`);
    }
  }
}

// --- A1 Word counts ---
const treatments = parseTreatmentBlocks(read("src/content/treatments.ts"));
const guides = parseGuideBlocks(read("src/content/guides.ts"));
const tierASlugs = parseTierASlugs(read("src/content/areas/data.ts"));
const areas = parseAreaRecords(read("src/content/areas/data.ts"));
const enrichments = parseMergedAreaEnrichments(read("src/content/areas/enrichment.ts"));
const guideDepth = parseGuideDepthSections(read("src/content/guide-depth-2.ts"));
const comboExtras = parseServiceComboExtras(read("src/content/generate-combos.ts"));

const treatmentWordCounts = [];
for (const t of treatments) {
  const text = [
    t.summary,
    ...t.benefits,
    ...t.sectionParagraphs,
    ...t.faqTexts,
  ].join(" ");
  const wc = wordCount(text);
  treatmentWordCounts.push({ slug: t.slug, words: wc });
  if (wc < 1500) {
    fail(`Treatment ${t.slug}: ${wc} words (<1500 required, checklist 6.15)`);
  }
}

for (const slug of tierASlugs) {
  const area = areas.find((a) => a.slug === slug);
  const enr = enrichments[slug];
  if (!area || !enr) {
    fail(`Tier-A area ${slug}: missing area record or enrichment`);
    continue;
  }
  const text = [area.intro, ...enr.sectionParagraphs, ...enr.faqTexts].join(" ");
  const wc = wordCount(text);
  if (wc < 1200) {
    fail(`Tier-A area ${slug}: ${wc} words (<1200 required, checklist 6.16)`);
  }
}

const guideWordCounts = [];
for (const g of guides) {
  const depthParas = guideDepth[g.slug] ?? [];
  const text = [g.excerpt, ...g.sectionParagraphs, ...depthParas, ...g.faqTexts].join(" ");
  const wc = wordCount(text);
  guideWordCounts.push({ slug: g.slug, words: wc });
  if (wc < 1200) {
    fail(`Guide ${g.slug}: ${wc} words (<1200 required, checklist 6.17)`);
  }
}

const TIER_B_MIN_WORDS = 700;
const MASSEUSE_COMBO_MIN_WORDS = 150;
const META_DUP_THRESHOLD = 0.05;

for (const a of areas.filter((x) => x.tier === "B")) {
  const enr = enrichments[a.slug];
  const text = enr
    ? [a.intro, ...enr.sectionParagraphs, ...enr.faqTexts].join(" ")
    : tierBEnrichmentText(a);
  const wc = wordCount(text);
  if (wc < TIER_B_MIN_WORDS) {
    fail(`Tier-B area ${a.slug}: ${wc} words (<${TIER_B_MIN_WORDS} required, checklist 6.16 extended)`);
  }
}

// --- A2 FAQ depth ---
const homePage = read("src/app/page.tsx");
const homeFaqMatch = homePage.match(/const homeFaqs = \[([\s\S]*?)\];/);
const homeFaqs = homeFaqMatch ? (homeFaqMatch[1].match(/\bq:\s*"/g) ?? []).length : 0;
if (homeFaqs < 11) {
  fail(`Home page: ${homeFaqs} FAQs (<11 required, checklist 9.1)`);
}

for (const t of treatments) {
  if (t.faqCount < 6 || t.faqCount > 10) {
    fail(`Treatment ${t.slug}: ${t.faqCount} FAQs (need 6–10, checklist 9.3–9.5)`);
  }
}

for (const slug of tierASlugs) {
  const enr = enrichments[slug];
  if (!enr || enr.faqCount < 3) {
    fail(`Tier-A area ${slug}: ${enr?.faqCount ?? 0} FAQs (<3 required, checklist 9.6)`);
  }
}

// Tier-A combo FAQs: buildServiceFaqs returns 6 FAQs when tier === A
for (const slug of tierASlugs) {
  const area = areas.find((a) => a.slug === slug);
  if (area?.tier !== "A") continue;
  // Combo FAQs are generated at runtime — verify generator has buildServiceFaqs with 6 items
}
const comboGen = read("src/content/generate-combos.ts");
if (!comboGen.includes('area.tier === "A" ? buildServiceFaqs')) {
  fail("generate-combos.ts: Tier-A combos must include buildServiceFaqs (checklist 9.7)");
}
const serviceFaqBlock = comboGen.match(/function buildServiceFaqs[\s\S]*?return \[([\s\S]*?)\];/);
const comboFaqTemplateCount = serviceFaqBlock
  ? (serviceFaqBlock[1].match(/\{\s*\n\s*q:/g) ?? []).length
  : 0;
if (comboFaqTemplateCount < 6) {
  fail(`Combo FAQ template: ${comboFaqTemplateCount} items (<6 for Tier-A combos)`);
}

const masseuses = parseMasseuseBlocks(read("src/content/masseuses.ts"));
for (const m of masseuses) {
  if (m.faqCount < 3) {
    fail(`Masseuse ${m.slug}: ${m.faqCount} FAQs (<3 required, checklist 9.8)`);
  }
}

for (const g of guides) {
  if (g.faqCount < 3) {
    fail(`Guide ${g.slug}: ${g.faqCount} FAQs (<3 required, checklist 9.9)`);
  }
}

// Local flavor — all Tier-A area + all treatment FAQs (9.22, fail not warn)
const LOCAL = LOCAL_FLAVOR_KEYWORDS;
for (const t of treatments) {
  const joined = t.faqTexts.join(" ");
  if (!LOCAL.some((k) => joined.includes(k))) {
    fail(`Treatment ${t.slug} FAQs: missing local flavor (${LOCAL.join(", ")}, checklist 9.22)`);
  }
}
for (const slug of tierASlugs) {
  const enr = enrichments[slug];
  const joined = (enr?.faqTexts ?? []).join(" ");
  if (!LOCAL.some((k) => joined.includes(k))) {
    fail(`Tier-A area ${slug} FAQs: missing local flavor (${LOCAL.join(", ")}, checklist 9.22)`);
  }
}

// --- A3 Interlinking matrix ---
templateMustContain(
  "src/app/massage-treatments/[service]/page.tsx",
  [
    "We serve these areas",
    "areaServicePath",
    "/masseuses/",
    'href="/areas/"',
  ],
  "Treatment template (7.1–7.7)"
);

templateMustContain(
  "src/app/areas/[area]/page.tsx",
  [
    "Massage Treatments in",
    "areaServicePath",
    "areaMasseusePath",
    "Guides for",
  ],
  "Area template (7.8–7.14)"
);

templateMustContain(
  "src/app/page.tsx",
  ["/massage-treatments/", "featuredAreas", "/guides/"],
  "Home template (7.15)"
);

templateMustContain(
  "src/components/layout/Footer.tsx",
  ["/massage-treatments/", "/areas/", "/masseuses/", "/guides/"],
  "Footer hub links (7.24)"
);

templateMustContain(
  "src/components/layout/Header.tsx",
  ["/massage-treatments/", "/areas/", "/masseuses/", "/guides/"],
  "Header hub links (7.25)"
);

// --- A4 Anchor diversity sample (7.23) ---
const ANCHOR_SAMPLES = [
  ["kilimani", "swedish-massage"],
  ["lavington", "nuru-massage"],
  ["westlands", "deep-tissue-massage"],
  ["kileleshwa", "couples-massage"],
  ["karen", "hot-stone-massage"],
  ["upper-hill", "full-body-massage"],
  ["cbd-nairobi", "aromatherapy-massage"],
  ["hurlingham", "hot-stone-massage"],
  ["parklands-highridge", "four-hands-massage"],
  ["langata", "sensual-erotic-massage"],
];

const anchors = ANCHOR_SAMPLES.map(([areaSlug, svcSlug]) => {
  const area = areas.find((a) => a.slug === areaSlug);
  const treatment = treatments.find((t) => t.slug === svcSlug);
  if (!area || !treatment) {
    fail(`Anchor sample ${areaSlug}|${svcSlug}: missing area or treatment`);
    return null;
  }
  return `${treatment.shortName} in ${area.name}`;
}).filter(Boolean);

const uniqueAnchors = new Set(anchors);
if (uniqueAnchors.size < anchors.length) {
  fail(
    `Anchor diversity (7.23): ${anchors.length - uniqueAnchors.size} duplicate anchors in 10-sample — all identical template`
  );
}
const anchorCounts = {};
for (const a of anchors) anchorCounts[a] = (anchorCounts[a] ?? 0) + 1;
const overused = Object.entries(anchorCounts).filter(([, c]) => c > 3);
if (overused.length) {
  warn(`Anchor diversity (7.23): >3 combos share anchor "${overused[0][0]}"`);
}

// --- A5 Cross-page duplicate combo copy ---
const tierAAreas = areas.filter((a) => a.tier === "A");
const openingHashes = new Map();
let totalCombos = 0;
let duplicates = 0;

for (const area of tierAAreas) {
  for (const treatment of treatments) {
    totalCombos++;
    const opening = comboOpeningParagraph(area, treatment, comboExtras);
    const hash = opening.slice(0, 120);
    if (openingHashes.has(hash)) duplicates++;
    else openingHashes.set(hash, `${area.slug}|${treatment.slug}`);
  }
}

const dupRate = totalCombos ? (duplicates / totalCombos) * 100 : 0;
if (dupRate > 5) {
  fail(
    `Combo duplicate copy (10.20/12.12): ${dupRate.toFixed(1)}% duplicate first-paragraph hashes (>5% threshold)`
  );
}

// --- A6 Combo meta description uniqueness ---
const serviceMetaHashes = new Map();
let serviceMetaTotal = 0;
let serviceMetaDupes = 0;
for (const a of areas) {
  for (const t of treatments) {
    serviceMetaTotal++;
    const meta = serviceComboMetaDescription(a.name, t.name);
    if (serviceMetaHashes.has(meta)) serviceMetaDupes++;
    else serviceMetaHashes.set(meta, `${a.slug}|${t.slug}`);
  }
}
const serviceMetaDupRate = serviceMetaTotal
  ? (serviceMetaDupes / serviceMetaTotal) * 100
  : 0;
if (serviceMetaDupRate > META_DUP_THRESHOLD * 100) {
  fail(
    `Service combo meta duplicate rate: ${serviceMetaDupRate.toFixed(2)}% (>${META_DUP_THRESHOLD * 100}% threshold)`
  );
}

const masseuseMetaHashes = new Map();
let masseuseMetaTotal = 0;
let masseuseMetaDupes = 0;
for (const a of areas) {
  for (const m of masseuses) {
    masseuseMetaTotal++;
    const meta = masseuseComboMetaDescription(a.name, m.name, m.tagline ?? "");
    if (masseuseMetaHashes.has(meta)) masseuseMetaDupes++;
    else masseuseMetaHashes.set(meta, `${a.slug}|${m.slug}`);
  }
}
const masseuseMetaDupRate = masseuseMetaTotal
  ? (masseuseMetaDupes / masseuseMetaTotal) * 100
  : 0;
if (masseuseMetaDupRate > META_DUP_THRESHOLD * 100) {
  fail(
    `Masseuse combo meta duplicate rate: ${masseuseMetaDupRate.toFixed(2)}% (>${META_DUP_THRESHOLD * 100}% threshold)`
  );
}

// --- A7 Masseuse×area combo depth sample (Tier-A) ---
const MASSEUSE_COMBO_SAMPLES = [
  ["kilimani", "amara"],
  ["lavington", "zuri"],
  ["westlands", "aisha"],
  ["karen", "nuru"],
  ["kabiro", "keisha"],
];
if (!comboGen.includes('area.tier === "A" ? buildMasseuseFaqs')) {
  fail("generate-combos.ts: Tier-A masseuse combos must include buildMasseuseFaqs");
}
const masseuseFaqBlock = comboGen.match(/function buildMasseuseFaqs[\s\S]*?return \[([\s\S]*?)\];/);
const masseuseComboFaqCount = masseuseFaqBlock
  ? (masseuseFaqBlock[1].match(/\{\s*\n\s*q:/g) ?? []).length
  : 0;
if (masseuseComboFaqCount < 3) {
  fail(`Masseuse combo FAQ template: ${masseuseComboFaqCount} items (<3 for Tier-A combos)`);
}
for (const [areaSlug, masseuseSlug] of MASSEUSE_COMBO_SAMPLES) {
  const area = areas.find((a) => a.slug === areaSlug);
  const masseuse = masseuses.find((m) => m.slug === masseuseSlug);
  if (!area || !masseuse) {
    fail(`Masseuse combo sample ${areaSlug}|${masseuseSlug}: missing area or masseuse`);
    continue;
  }
  const body = masseuseComboBodyText(area, masseuse);
  const wc = wordCount(body);
  if (wc < MASSEUSE_COMBO_MIN_WORDS) {
    fail(
      `Masseuse combo ${areaSlug}×${masseuseSlug}: ${wc} words (<${MASSEUSE_COMBO_MIN_WORDS} required)`
    );
  }
}

// Banned strings via child check:unique
const uniqueRun = spawnSync("node", ["scripts/check-uniqueness.mjs"], {
  cwd: root,
  encoding: "utf8",
});
if (uniqueRun.status !== 0) {
  fail("Banned competitor/Lavington strings found — run npm run check:unique");
  if (uniqueRun.stderr) console.error(uniqueRun.stderr);
}

// --- Report ---
console.log("Prof repo content compliance\n");

console.log("A1 Word counts");
console.log(`  Treatments: ${treatmentWordCounts.length} checked (≥1500)`);
const minTreatment = Math.min(...treatmentWordCounts.map((t) => t.words));
console.log(`  Min treatment: ${minTreatment} words`);
console.log(`  Tier-A areas: ${tierASlugs.length} checked (≥1200)`);
const tierBCount = areas.filter((a) => a.tier === "B").length;
console.log(`  Tier-B areas: ${tierBCount} checked (≥${TIER_B_MIN_WORDS})`);
console.log(`  Guides: ${guideWordCounts.length} checked (≥1200)`);
const minGuide = Math.min(...guideWordCounts.map((g) => g.words));
console.log(`  Min guide: ${minGuide} words`);

console.log("\nA2 FAQ depth");
console.log(`  Home: ${homeFaqs} FAQs`);
console.log(`  Treatments: ${treatments.length} (6–10 each)`);
console.log(`  Tier-A areas: ${tierASlugs.length} (≥3 each)`);
console.log(`  Combo template: ${comboFaqTemplateCount} FAQs for Tier-A`);
console.log(`  Masseuses: ${masseuses.length} (≥3 each)`);
console.log(`  Guides: ${guides.length} (≥3 each)`);

console.log("\nA3 Interlinking templates: checked Header, Footer, Home, Treatment, Area");

console.log("\nA4 Anchor diversity");
console.log(`  Sample anchors: ${[...uniqueAnchors].join(" | ")}`);

console.log("\nA5 Combo duplicate rate");
console.log(`  Tier-A × treatments: ${totalCombos} combos, ${dupRate.toFixed(2)}% duplicate openings`);
console.log(`  Service combo meta dup: ${serviceMetaDupRate.toFixed(2)}%`);
console.log(`  Masseuse combo meta dup: ${masseuseMetaDupRate.toFixed(2)}%`);

console.log("\nA6 Masseuse×area combo sample");
console.log(`  Tier-A masseuse combo FAQs: ${masseuseComboFaqCount} template items`);
console.log(`  Samples checked: ${MASSEUSE_COMBO_SAMPLES.length} (≥${MASSEUSE_COMBO_MIN_WORDS} words)`);

console.log("\nA7 Local flavor (9.22)");
console.log(`  All ${treatments.length} treatments + ${tierASlugs.length} Tier-A areas FAQ-checked`);

if (warnings.length) {
  console.log(`\nWarnings (${warnings.length}):`);
  for (const w of warnings) console.log(`  ⚠ ${w}`);
}

if (errors.length) {
  console.error(`\nFAILED (${errors.length}):`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}

console.log("\nContent compliance check passed.");
export { errors, warnings, treatmentWordCounts, guideWordCounts, homeFaqs, dupRate };
