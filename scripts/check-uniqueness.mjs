#!/usr/bin/env node
/**
 * Fail if Kilimani site contains Lavington-duplicated branding or assets.
 */
import { readFileSync, readdirSync, existsSync, statSync } from "fs";
import { join } from "path";

const ROOT = process.cwd();
let failed = false;

function fail(msg) {
  console.error("FAIL:", msg);
  failed = true;
}

const BANNED_IN_SRC = [
  "0108 744193",
  "Argwings Kodhek",
  "lavingtonhotmassage.co.ke",
  "melt tension after Nairobi traffic",
  "Focused pressure for desk necks, gym tightness, and road tension",
  "Silky gel, full-body glide, private suite",
];

const BANNED_IN_DOCS = ["0108 744193", "Argwings Kodhek", "melt tension after Nairobi traffic"];

function walkSync(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".next") continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walkSync(p, acc);
    else if (/\.(ts|tsx|md|json|mjs|svg|py)$/.test(p)) acc.push(p);
  }
  return acc;
}

function bannedFor(file) {
  const rel = file.replace(ROOT + "/", "");
  if (rel.startsWith("src/") || rel.startsWith("public/")) return BANNED_IN_SRC;
  return BANNED_IN_DOCS;
}

for (const dir of ["src", "docs", "public/images"]) {
  for (const file of walkSync(join(ROOT, dir))) {
    const text = readFileSync(file, "utf8");
    for (const banned of bannedFor(file)) {
      if (text.includes(banned)) {
        fail(`${file} contains banned string: ${banned}`);
      }
    }
  }
}

const imgDir = join(ROOT, "public", "images");
if (existsSync(imgDir)) {
  const lavingtonFiles = readdirSync(imgDir).filter((f) => /lavington/i.test(f));
  if (lavingtonFiles.length) {
    fail(`Lavington-named images still present: ${lavingtonFiles.join(", ")}`);
  }

  const ogSvg = join(imgDir, "og-kilimani-hot-massage.svg");
  if (existsSync(ogSvg)) {
    const svg = readFileSync(ogSvg, "utf8");
    if (svg.includes("#c4a574") || svg.includes("Argwings")) {
      fail("OG SVG still uses Lavington bronze or Argwings branding");
    }
    if (!svg.includes("Kilimani Hot Massage") || !svg.includes("0746 203398")) {
      fail("OG SVG missing Kilimani NAP");
    }
  }
}

if (failed) {
  process.exit(1);
}
console.log("Uniqueness check passed.");
