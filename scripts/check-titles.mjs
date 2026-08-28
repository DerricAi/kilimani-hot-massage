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

function extractMetaTitles(filePath) {
  const text = readFileSync(join(root, filePath), "utf8");
  const re = /metaTitle:\s*"([^"]+)"/g;
  const titles = [];
  let m;
  while ((m = re.exec(text)) !== null) titles.push({ file: filePath, title: m[1] });
  return titles;
}

function checkTitle({ file, title }) {
  if (title.length > 220) {
    warnings.push(`${file}: title ${title.length} chars (>220): ${title.slice(0, 60)}…`);
  }
  if (!title.includes("near me")) {
    errors.push(`${file}: missing "near me": ${title}`);
  }
  if (!title.includes("Kilimani Hot Massage")) {
    errors.push(`${file}: missing brand: ${title}`);
  }
  if (
    /Lavington/i.test(title) &&
    (file.includes("guides.ts") ||
      file.includes("masseuses.ts") ||
      file.includes("treatments.ts"))
  ) {
    errors.push(`${file}: Lavington-as-location in title: ${title}`);
  }
}

// Homepage — profTitleHome source
const seoTitles = readFileSync(join(root, "src/lib/seo-titles.ts"), "utf8");
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

const pageTs = readFileSync(join(root, "src/app/page.tsx"), "utf8");
if (!pageTs.includes("profTitleHome()")) {
  errors.push("src/app/page.tsx: must use profTitleHome()");
}

const seoTs = readFileSync(join(root, "src/lib/seo.ts"), "utf8");
if (!seoTs.includes("absoluteTitle(title)")) {
  errors.push("seo.ts: pageMetadata must use absoluteTitle()");
}

const files = [
  "src/content/treatments.ts",
  "src/content/guides.ts",
  "src/content/masseuses.ts",
];
const allTitles = [];
for (const file of files) {
  for (const entry of extractMetaTitles(file)) {
    checkTitle(entry);
    allTitles.push(entry.title);
  }
}

const seen = new Map();
for (const t of allTitles) {
  seen.set(t, (seen.get(t) ?? 0) + 1);
}
for (const [title, count] of seen) {
  if (count > 1) errors.push(`duplicate metaTitle (${count}x): ${title}`);
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

console.log(`Title check passed (${allTitles.length} content metaTitles + homepage formula).`);
