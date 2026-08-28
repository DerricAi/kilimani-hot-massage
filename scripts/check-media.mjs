#!/usr/bin/env node
/**
 * Image alt-text + media.ts local SEO guards — checklist 8.x media.
 * Run: npm run check:media
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const LOCAL_KEYWORDS = ["Kilimani", "Marcus Garvey", "Nairobi"];

function fail(msg) {
  errors.push(msg);
}

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

function walk(dir, acc = []) {
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === "node_modules" || ent.name === ".next") continue;
      walk(p, acc);
    } else if (ent.name.endsWith(".tsx")) acc.push(p);
  }
  return acc;
}

// --- media.ts alt coverage ---
const mediaTs = read("src/content/media.ts");
const altMatches = [...mediaTs.matchAll(/alt:\s*"([^"]+)"/g)].map((m) => m[1]);
if (!altMatches.length) {
  fail("media.ts: no alt strings found");
}
for (const alt of altMatches) {
  if (!LOCAL_KEYWORDS.some((k) => alt.includes(k))) {
    fail(`media.ts alt missing local keyword (${LOCAL_KEYWORDS.join(", ")}): ${alt.slice(0, 60)}…`);
  }
}

const treatmentImageBlock = mediaTs.match(/const treatmentImages[\s\S]*?\};/);
if (!treatmentImageBlock) {
  fail("media.ts: treatmentImages map missing");
}

// --- Page templates with next/image ---
const imagePages = [
  "src/app/page.tsx",
  "src/app/massage-treatments/[service]/page.tsx",
  "src/app/areas/[area]/page.tsx",
];

for (const rel of imagePages) {
  const src = read(rel);
  if (!src.includes('from "next/image"') && !src.includes("from 'next/image'")) {
    fail(`${rel}: expected next/image import for treatment/hero grids`);
    continue;
  }
  const imageTags = src.match(/<Image[\s\S]*?\/>/g) ?? [];
  if (!imageTags.length) {
    fail(`${rel}: no <Image /> components found`);
    continue;
  }
  for (const tag of imageTags) {
    if (!/alt=\{/.test(tag) && !/alt="[^"]+"/.test(tag)) {
      fail(`${rel}: Image missing alt prop — ${tag.slice(0, 80)}…`);
    }
    if (/alt=\{?\s*""\s*\}?/.test(tag)) {
      fail(`${rel}: Image has empty alt`);
    }
  }
  if (!src.includes("treatmentImage(") && rel !== "src/app/page.tsx") {
    fail(`${rel}: should use treatmentImage() from media.ts for local alts`);
  }
}

// --- Fallback alt in treatmentImage() ---
if (!mediaTs.includes("Massage treatment at Kilimani Hot Massage near Marcus Garvey Rd")) {
  fail("media.ts: treatmentImage fallback alt missing local keywords");
}

// --- No raw img without alt sitewide (sample app dir) ---
const tsxFiles = walk(join(root, "src/app")).filter((f) => f.includes("/app/"));
for (const file of tsxFiles) {
  const rel = file.replace(root + "/", "");
  const src = readFileSync(file, "utf8");
  const rawImgs = src.match(/<img[^>]*>/gi) ?? [];
  for (const tag of rawImgs) {
    if (!/alt=/i.test(tag)) {
      fail(`${rel}: raw <img> without alt attribute`);
    }
  }
}

console.log("Media / alt-text audit (8.x)\n");
console.log(`  media.ts alts checked: ${altMatches.length}`);
console.log(`  Image page templates: ${imagePages.length}`);
console.log(`  App TSX scanned: ${tsxFiles.length}`);

if (errors.length) {
  console.error(`\nFAILED (${errors.length}):`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}

console.log("\nMedia check passed.");
