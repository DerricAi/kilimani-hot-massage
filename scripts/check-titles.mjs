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

function checkTitleString(label, title) {
  if (title.length > 220) {
    warnings.push(`${label}: title ${title.length} chars (>220): ${title.slice(0, 60)}…`);
  }
  if (!title.includes("near me")) {
    errors.push(`${label}: missing "near me": ${title}`);
  }
  if (!title.includes("Kilimani Hot Massage")) {
    errors.push(`${label}: missing brand: ${title}`);
  }
  if (
    /Kilimani Nairobi near me/i.test(title) ||
    / in [A-Za-z ]+ Nairobi near me \|/i.test(title)
  ) {
    errors.push(`${label}: deprecated "Nairobi near me" title pattern: ${title}`);
  }
}

// Homepage — profTitleHome source
const seoTitles = read("src/lib/seo-titles.ts");
const targetKw = read("src/content/target-keywords.ts");
const treatmentsTs = read("src/content/treatments.ts");
const masseusesTs = read("src/content/masseuses.ts");
const guidesTs = read("src/content/guides.ts");

if (!seoTitles.includes("BEST Massage Spa Kilimani")) {
  errors.push("seo-titles.ts: profTitleHome must include BEST Massage Spa Kilimani");
}
if (!seoTitles.includes("spa near me")) {
  errors.push("seo-titles.ts: profTitleHome must include spa near me");
}
if (!seoTitles.includes("Kilimani massage")) {
  errors.push("seo-titles.ts: profTitleHome must include Kilimani massage");
}
if (!seoTitles.includes("massage spa near me")) {
  errors.push("seo-titles.ts: profTitleHome must include massage spa near me");
}
if (/Kilimani Nairobi near me/.test(seoTitles)) {
  errors.push("seo-titles.ts: remove deprecated Kilimani Nairobi near me pattern");
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

// Sample expected titles from keyword phrase map
const brand = "Kilimani Hot Massage";
const phraseRe = /"([a-z-]+)":\s*"([^"]+)"/g;
const treatmentPhrases = {};
let m;
const phraseBlock = targetKw.match(
  /export const treatmentTitlePhrase[\s\S]*?\};/
)?.[0];
if (phraseBlock) {
  while ((m = phraseRe.exec(phraseBlock)) !== null) {
    treatmentPhrases[m[1]] = m[2];
  }
}

const expectedSamples = [
  ["nuru-massage", `${treatmentPhrases["nuru-massage"]} | ${brand}`],
  ["sensual-erotic-massage", `${treatmentPhrases["sensual-erotic-massage"]} | ${brand}`],
  ["swedish default", `Swedish Massage near me Kilimani | ${brand}`],
  ["masseuse hub", `Masseuse near me Kilimani | ${brand}`],
  ["kilimani area", `Massage Kilimani near me | ${brand}`],
];

for (const [label, title] of expectedSamples) {
  if (title.includes("undefined")) {
    errors.push(`missing treatmentTitlePhrase for sample: ${label}`);
    continue;
  }
  checkTitleString(label, title);
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
  `Title check passed (keyword-led titles via seo-titles.ts + ${Object.keys(treatmentPhrases).length} keyed treatments).`
);
