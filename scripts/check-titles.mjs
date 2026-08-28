#!/usr/bin/env node
/**
 * Prof title tag guard — LOCAL_SEO_MASTER_CHECKLIST Phase 1 (IDs 4.x).
 * Run: npm run check:titles
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

function parseRecordBlock(source, exportName) {
  const block = source.match(
    new RegExp(`export const ${exportName}[\\s\\S]*?\\};`)
  )?.[0];
  if (!block) return {};
  const entries = {};
  const re = /"([a-z-]+)":\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(block)) !== null) entries[m[1]] = m[2];
  return entries;
}

function profTreatmentTitleForArea(lead, areaName) {
  if (areaName === "Kilimani") {
    return `${lead} near me Kilimani - book ${lead} on Marcus Garvey Rd massage spa - open 24/7`;
  }
  return `${lead} near me ${areaName} - from ${areaName} to Marcus Garvey Rd Kilimani - open 24/7`;
}

function checkTitleString(label, title, { requireProfTail = false, minLength = 0 } = {}) {
  if (title.length > 220) {
    warnings.push(`${label}: title ${title.length} chars (>220): ${title.slice(0, 60)}…`);
  }
  if (minLength > 0 && title.length < minLength) {
    warnings.push(
      `${label}: title ${title.length} chars (<${minLength}, likely too short for Prof): ${title.slice(0, 60)}…`
    );
  }
  if (!title.includes("near me")) {
    errors.push(`${label}: missing "near me": ${title}`);
  }
  if (!title.includes("Kilimani Hot Massage")) {
    errors.push(`${label}: missing brand: ${title}`);
  }
  if (requireProfTail) {
    if (!title.includes("Marcus Garvey")) {
      errors.push(`${label}: missing Marcus Garvey Prof tail: ${title}`);
    }
    if (!title.includes("open 24/7") && !title.includes("Open 24/7")) {
      errors.push(`${label}: missing open 24/7 Prof tail: ${title}`);
    }
  }
  if (
    /Kilimani Nairobi near me/i.test(title) ||
    / in [A-Za-z ]+ Nairobi near me \|/i.test(title)
  ) {
    errors.push(`${label}: deprecated "Nairobi near me" title pattern: ${title}`);
  }
}

const seoTitles = read("src/lib/seo-titles.ts");
const targetKw = read("src/content/target-keywords.ts");
const treatmentsTs = read("src/content/treatments.ts");
const masseusesTs = read("src/content/masseuses.ts");
const guidesTs = read("src/content/guides.ts");

const treatmentLeads = parseRecordBlock(targetKw, "treatmentKeywordLead");

const slugRe = /slug:\s*"([a-z-]+)"/g;
const treatmentSlugs = [];
let sm;
while ((sm = slugRe.exec(treatmentsTs)) !== null) {
  if (sm[1] !== "string") treatmentSlugs.push(sm[1]);
}
const uniqueTreatmentSlugs = [...new Set(treatmentSlugs.filter((s) => s.includes("-")))];

if (Object.keys(treatmentLeads).length !== 12) {
  errors.push(
    `treatmentKeywordLead must have 12 entries (found ${Object.keys(treatmentLeads).length})`
  );
}

if (!seoTitles.includes("profTreatmentTitleForArea")) {
  errors.push("seo-titles.ts: must use profTreatmentTitleForArea for treatment and combo titles");
}
if (!seoTitles.includes("BEST Massage Spa Kilimani")) {
  errors.push("seo-titles.ts: profTitleHome must include BEST Massage Spa Kilimani");
}
if (/Kilimani Nairobi near me/.test(seoTitles)) {
  errors.push("seo-titles.ts: remove deprecated Kilimani Nairobi near me pattern");
}
if (seoTitles.includes("treatmentTitlePhrase")) {
  errors.push("seo-titles.ts: remove deprecated treatmentTitlePhrase import");
}
if (!targetKw.includes("profTreatmentTitleForArea")) {
  errors.push("target-keywords.ts: must export profTreatmentTitleForArea");
}

if (!treatmentsTs.includes("profTitleTreatmentKeyed")) {
  errors.push("treatments.ts: must compute metaTitle via profTitleTreatmentKeyed");
}
if (!masseusesTs.includes("profTitleMasseuse")) {
  errors.push("masseuses.ts: must compute metaTitle via profTitleMasseuse");
}
if (!guidesTs.includes("profTitleGuideSlug")) {
  errors.push("guides.ts: must compute metaTitle via profTitleGuideSlug");
}

const pageTs = read("src/app/page.tsx");
if (!pageTs.includes("profTitleHome()")) {
  errors.push("src/app/page.tsx: must use profTitleHome()");
}

const seoTs = read("src/lib/seo.ts");
if (!seoTs.includes("absoluteTitle(title)")) {
  errors.push("seo.ts: pageMetadata must use absoluteTitle()");
}

const brand = "Kilimani Hot Massage";
const expectedSamples = [
  [
    "nuru treatment Kilimani",
    `${profTreatmentTitleForArea(treatmentLeads["nuru-massage"], "Kilimani")} | ${brand}`,
    { requireProfTail: true, minLength: 100 },
  ],
  [
    "erotic treatment Kilimani",
    `${profTreatmentTitleForArea(treatmentLeads["sensual-erotic-massage"], "Kilimani")} | ${brand}`,
    { requireProfTail: true, minLength: 100 },
  ],
  [
    "swedish treatment Kilimani",
    `${profTreatmentTitleForArea(treatmentLeads["swedish-massage"], "Kilimani")} | ${brand}`,
    { requireProfTail: true, minLength: 100 },
  ],
  [
    "nuru combo Lavington",
    `${profTreatmentTitleForArea(treatmentLeads["nuru-massage"], "Lavington")} | ${brand}`,
    { requireProfTail: true, minLength: 100 },
  ],
  [
    "swedish combo Westlands",
    `${profTreatmentTitleForArea(treatmentLeads["swedish-massage"], "Westlands")} | ${brand}`,
    { requireProfTail: true, minLength: 100 },
  ],
  [
    "masseuse hub",
    `Masseuse near me Kilimani - book on Marcus Garvey Rd massage spa open 24/7 | ${brand}`,
    { requireProfTail: true, minLength: 80 },
  ],
  [
    "kilimani area hub",
    `Massage Kilimani near me - Kilimani guests Marcus Garvey Rd spa open 24/7 | ${brand}`,
    { requireProfTail: true, minLength: 80 },
  ],
  [
    "masseuse profile",
    `Amara masseuse near me Kilimani - book on Marcus Garvey Rd open 24/7 | ${brand}`,
    { requireProfTail: true, minLength: 80 },
  ],
];

for (const [label, title, opts] of expectedSamples) {
  if (title.includes("undefined")) {
    errors.push(`missing treatmentKeywordLead for sample: ${label}`);
    continue;
  }
  checkTitleString(label, title, opts ?? {});
}

for (const slug of uniqueTreatmentSlugs) {
  if (!treatmentLeads[slug]) {
    errors.push(`treatmentKeywordLead missing slug: ${slug}`);
  }
}

if (warnings.length) {
  console.warn("Warnings:");
  warnings.forEach((w) => console.warn("  ⚠", w));
}

if (errors.length) {
  console.error("Title check failed:");
  errors.forEach((e) => console.error("  ✗", e));
  process.exit(1);
}

console.log(
  `Title check passed (12 treatment leads + Prof hybrid title samples).`
);
