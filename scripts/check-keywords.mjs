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

// Parse target-keywords.ts entries (multiline-safe)
const kwFile = read("src/content/target-keywords.ts");
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
        const slugRe = new RegExp(`slug:\\s*"${slug}"[\\s\\S]*?metaTitle:\\s*"([^"]+)"`);
        const titleMatch = treatments.match(slugRe);
        const blockRe = new RegExp(`slug:\\s*"${slug}"[\\s\\S]*?tierA:\\s*true`);
        const block = treatments.match(blockRe)?.[0] ?? "";
        return [titleMatch?.[1] ?? "", block].join("\n");
      }
      if (primaryPath.startsWith("/guides/")) {
        const slug = primaryPath.replace("/guides/", "").replace(/\/$/, "");
        const slugRe = new RegExp(`slug:\\s*"${slug}"[\\s\\S]*?metaTitle:\\s*"([^"]+)"`);
        const titleMatch = guides.match(slugRe);
        const blockRe = new RegExp(`slug:\\s*"${slug}"[\\s\\S]*?faqs:`);
        const block = guides.match(blockRe)?.[0] ?? "";
        return [titleMatch?.[1] ?? "", block].join("\n");
      }
      return "";
  }
}

for (const kw of keywordEntries) {
  if (kw.tier === "near-me") continue;
  const hay = pageHaystack(kw.primaryPath);
  const core = kw.phrase
    .replace(/\s+near me$/i, "")
    .replace(/\s+Nairobi$/i, "");
  if (!hay || !includesPhrase(hay, core)) {
    errors.push(`Missing "${kw.phrase}" (tier ${kw.tier}) on ${kw.primaryPath}`);
  }
}

// Hard guards from rollout plan
const hardChecks = [
  { label: "Erotic Massage", hay: treatments, slug: "sensual-erotic-massage" },
  { label: "Full Body Massage", hay: treatments, slug: "full-body-massage" },
  { label: "Masseuse near me", hay: [masseusesPage, seoTitles].join("\n") },
  { label: "Massage and Extras near me", hay: guides, slug: "massage-and-extras-kilimani" },
  { label: "massage rooms near me", hay: [homePage, contactPage].join("\n") },
  { label: "spa near me", hay: homeHaystack() },
  { label: "Kilimani massage", hay: homeHaystack() },
];

for (const check of hardChecks) {
  if (!includesPhrase(check.hay, check.label)) {
    errors.push(`Hard guard failed: "${check.label}" missing${check.slug ? ` (${check.slug})` : ""}`);
  }
}

// profTitleHome keyword cluster
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
  `Keyword check passed (${keywordEntries.length} mapped keywords + hard guards).`
);
