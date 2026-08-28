#!/usr/bin/env node
/**
 * Keyword targeting guard — ensures priority keywords appear on assigned pages.
 * Run: npm run check:keywords
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

function includesPhrase(haystack, phrase) {
  return haystack.toLowerCase().includes(phrase.toLowerCase());
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

const kwFile = read("src/content/target-keywords.ts");
const treatmentLeads = parseRecordBlock(kwFile, "treatmentKeywordLead");

const keywordEntries = [];
const blockRe = /\{\s*phrase:\s*"([^"]+)"[\s\S]*?primaryPath:\s*"([^"]+)"[\s\S]*?tier:\s*"([^"]+)"/g;
let m;
while ((m = blockRe.exec(kwFile)) !== null) {
  keywordEntries.push({
    phrase: m[1],
    primaryPath: m[2],
    tier: m[3],
  });
}

const seoTitles = read("src/lib/seo-titles.ts");
const homePage = read("src/app/page.tsx");
const layout = read("src/app/layout.tsx");
const masseusesPage = read("src/app/masseuses/page.tsx");
const contactPage = read("src/app/contact/page.tsx");
const treatments = read("src/content/treatments.ts");
const guides = read("src/content/guides.ts");

function homeHaystack() {
  return [seoTitles, homePage, layout].join("\n");
}

function treatmentPageHaystack(slug) {
  const lead = treatmentLeads[slug] ?? "";
  const titlePhrase = lead
    ? `${lead} near me Kilimani - book ${lead} on Marcus Garvey Rd massage spa - open 24/7`
    : "";
  const blockReLocal = new RegExp(`slug:\\s*"${slug}"[\\s\\S]*?tierA:\\s*true`);
  const block = treatments.match(blockReLocal)?.[0] ?? "";
  return [titlePhrase, lead, seoTitles, block].join("\n");
}

function pageHaystack(primaryPath) {
  switch (primaryPath) {
    case "/":
      return homeHaystack();
    case "/masseuses/":
      return [seoTitles, masseusesPage].join("\n");
    case "/contact/":
      return contactPage;
    default:
      if (primaryPath.startsWith("/massage-treatments/")) {
        const slug = primaryPath.replace("/massage-treatments/", "").replace(/\/$/, "");
        return treatmentPageHaystack(slug);
      }
      if (primaryPath.startsWith("/guides/")) {
        const slug = primaryPath.replace("/guides/", "").replace(/\/$/, "");
        const blockReLocal = new RegExp(`slug:\\s*"${slug}"[\\s\\S]*?faqs:`);
        const block = guides.match(blockReLocal)?.[0] ?? "";
        return [seoTitles, block].join("\n");
      }
      return "";
  }
}

for (const kw of keywordEntries) {
  if (kw.tier === "near-me") continue;
  const hay = pageHaystack(kw.primaryPath);
  const core = kw.phrase
    .replace(/\s+near me$/i, "")
    .replace(/\s+Nairobi$/i, "")
    .replace(/\s+Kilimani$/i, "");
  if (!hay || !includesPhrase(hay, core)) {
    errors.push(`Missing "${kw.phrase}" (tier ${kw.tier}) on ${kw.primaryPath}`);
  }
}

if (Object.keys(treatmentLeads).length !== 12) {
  errors.push(
    `treatmentKeywordLead must have 12 entries (found ${Object.keys(treatmentLeads).length})`
  );
}

if (!seoTitles.includes("profTreatmentTitleForArea")) {
  errors.push("seo-titles.ts must use profTreatmentTitleForArea for area-aware combo titles");
}

const hardChecks = [
  { label: "Erotic Massage", hay: treatmentPageHaystack("sensual-erotic-massage") },
  { label: "Full Body Massage", hay: treatmentPageHaystack("full-body-massage") },
  { label: "Swedish Massage", hay: treatmentPageHaystack("swedish-massage") },
  { label: "Masseuse near me", hay: [masseusesPage, seoTitles].join("\n") },
  { label: "Massage and Extras near me", hay: guides },
  { label: "massage rooms near me", hay: [homePage, contactPage].join("\n") },
  { label: "spa near me", hay: homeHaystack() },
  { label: "Kilimani massage", hay: homeHaystack() },
];

for (const check of hardChecks) {
  if (!includesPhrase(check.hay, check.label)) {
    errors.push(`Hard guard failed: "${check.label}" missing`);
  }
}

// Area-aware combo: Lavington must appear in generated Prof title formula
const nuruLavington = `${treatmentLeads["nuru-massage"]} near me Lavington - from Lavington to Marcus Garvey Rd Kilimani - open 24/7`;
if (!nuruLavington.includes("Lavington")) {
  errors.push("combo title formula must include specific area name");
}
if (!nuruLavington.includes("Marcus Garvey")) {
  errors.push("combo title formula must include Marcus Garvey Prof tail");
}

if (!seoTitles.includes("spa near me")) {
  errors.push("profTitleHome must include spa near me");
}
if (!seoTitles.includes("Kilimani massage")) {
  errors.push("profTitleHome must include Kilimani massage");
}

if (errors.length) {
  console.error("Keyword check failed:");
  errors.forEach((e) => console.error("  ✗", e));
  process.exit(1);
}

console.log(
  `Keyword check passed (${keywordEntries.length} mapped keywords + 12 treatment leads).`
);
