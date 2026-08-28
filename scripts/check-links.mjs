#!/usr/bin/env node
/**
 * Internal link graph + orphan detection — checklist 7.5 Step 5.
 * Run: npm run check:links
 */
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  read,
  parseAreaRecords,
  parseTreatmentBlocks,
  parseMasseuseBlocks,
  parseGuideBlocks,
  parseTierASlugs,
  buildSitemapPaths,
  normPath,
  addIncoming,
} from "./audit-lib.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];
const MAX_LINKS_PER_SECTION = 10;

function fail(msg) {
  errors.push(msg);
}

function warn(msg) {
  warnings.push(msg);
}

const areas = parseAreaRecords(read("src/content/areas/data.ts"));
const treatments = parseTreatmentBlocks(read("src/content/treatments.ts"));
const masseuses = parseMasseuseBlocks(read("src/content/masseuses.ts"));
const guides = parseGuideBlocks(read("src/content/guides.ts"));
const tierASlugs = parseTierASlugs(read("src/content/areas/data.ts"));

const allPaths = buildSitemapPaths(areas, treatments, masseuses, guides);
const incoming = new Map();

function link(from, to) {
  addIncoming(incoming, from, to);
}

// Global nav (Header + Footer on every page)
const globalNav = [
  "/",
  "/massage-treatments/",
  "/areas/",
  "/masseuses/",
  "/guides/",
  "/about-us/",
  "/contact/",
];
for (const p of allPaths) {
  for (const nav of globalNav) link(p, nav);
}

// Hub → child
for (const t of treatments) link("/massage-treatments/", `/massage-treatments/${t.slug}/`);
for (const a of areas) link("/areas/", `/areas/${a.slug}/`);
for (const m of masseuses) link("/masseuses/", `/masseuses/${m.slug}/`);
for (const g of guides) link("/guides/", `/guides/${g.slug}/`);

// Home featured areas + treatment grid + guides
const featuredAreas = ["kilimani", "kileleshwa", "lavington", "westlands", "upper-hill", "karen"];
for (const t of treatments) link("/", `/massage-treatments/${t.slug}/`);
for (const slug of featuredAreas) link("/", `/areas/${slug}/`);
for (const g of guides.slice(0, 6)) link("/", `/guides/${g.slug}/`);

// Treatment page → Tier-A combos, masseuses, guides, areas hub
for (const t of treatments) {
  const from = `/massage-treatments/${t.slug}/`;
  link(from, "/areas/");
  for (const slug of tierASlugs) link(from, `/areas/${slug}/services/${t.slug}/`);
  for (const m of masseuses) {
    if (m.specialties?.includes(t.slug)) link(from, `/masseuses/${m.slug}/`);
  }
  for (const g of guides) {
    if (g.relatedTreatments?.includes(t.slug)) link(from, `/guides/${g.slug}/`);
  }
}

// Area page → all service combos, masseuse combos, masseuse profiles, neighboring areas
for (const a of areas) {
  const from = `/areas/${a.slug}/`;
  for (const t of treatments) link(from, `/areas/${a.slug}/services/${t.slug}/`);
  for (const m of masseuses) {
    link(from, `/areas/${a.slug}/masseuses/${m.slug}/`);
    link(from, `/masseuses/${m.slug}/`);
  }
  for (const nb of a.neighboringAreas.slice(0, 4)) {
    if (areas.some((x) => x.slug === nb)) link(from, `/areas/${nb}/`);
  }
}

// Combo service → parent area, treatment hub, up to 5 sibling services
for (const a of areas) {
  for (const t of treatments) {
    const from = `/areas/${a.slug}/services/${t.slug}/`;
    link(from, `/areas/${a.slug}/`);
    link(from, `/massage-treatments/${t.slug}/`);
    for (const other of treatments.filter((x) => x.slug !== t.slug).slice(0, 5)) {
      link(from, `/areas/${a.slug}/services/${other.slug}/`);
    }
  }
}

// Masseuse profile → Tier-A area masseuse landers
for (const m of masseuses) {
  const from = `/masseuses/${m.slug}/`;
  for (const slug of tierASlugs) link(from, `/areas/${slug}/masseuses/${m.slug}/`);
}

// Masseuse combo → area, masseuse profile, specialties
for (const a of areas) {
  for (const m of masseuses) {
    const from = `/areas/${a.slug}/masseuses/${m.slug}/`;
    link(from, `/areas/${a.slug}/`);
    link(from, `/masseuses/${m.slug}/`);
  }
}

// Masseuse profile ← combos + hub
for (const m of masseuses) {
  for (const a of areas) link(`/areas/${a.slug}/masseuses/${m.slug}/`, `/masseuses/${m.slug}/`);
}

// Guide cross-links (related guides, treatments, areas from content)
for (const g of guides) {
  const from = `/guides/${g.slug}/`;
  for (const rs of g.relatedGuides ?? []) link(from, `/guides/${rs}/`);
  for (const rt of g.relatedTreatments ?? []) link(from, `/massage-treatments/${rt}/`);
  for (const ra of g.relatedAreas ?? []) link(from, `/areas/${ra}/`);
}

// --- Orphan detection (Rank 3+ pages must have ≥1 incoming besides self-nav) ---
const IMPORTANT_PREFIXES = [
  "/massage-treatments/",
  "/areas/",
  "/masseuses/",
  "/guides/",
];

const orphans = [];
for (const p of allPaths) {
  if (p === "/" || globalNav.includes(p)) continue;
  const inc = incoming.get(normPath(p));
  const external = inc ? [...inc].filter((x) => x !== normPath(p)) : [];
  if (external.length === 0) orphans.push(p);
}

if (orphans.length) {
  fail(
    `Orphan pages (7.5 Step 5): ${orphans.length} URLs with no incoming internal links — e.g. ${orphans.slice(0, 5).join(", ")}`
  );
}

// --- Section link density (template-derived) ---
const sectionCounts = [
  { label: "Treatment We serve these areas", count: tierASlugs.length },
  { label: "Area treatment grid", count: treatments.length },
  { label: "Area masseuse grid", count: masseuses.length },
  { label: "Combo sibling services", count: 5 },
];

for (const s of sectionCounts) {
  if (s.count > MAX_LINKS_PER_SECTION) {
    warn(
      `${s.label}: ${s.count} links in one section (Prof 7.5 recommends ~8–10; intentional matrix may exceed)`
    );
  }
}

// --- Deterministic sample: incoming count for Rank-4 combos ---
const LINK_SAMPLES = [
  "/areas/lavington/services/nuru-massage/",
  "/areas/kilimani/masseuses/amara/",
  "/guides/massage-and-extras-kilimani/",
  "/areas/kabiro/services/swedish-massage/",
];

for (const sample of LINK_SAMPLES) {
  const inc = incoming.get(normPath(sample));
  const count = inc ? inc.size : 0;
  if (count < 2) {
    fail(`Link sample ${sample}: only ${count} incoming link sources (need ≥2)`);
  }
}

console.log("Internal link graph audit (7.5 Step 5)\n");
console.log(`  Sitemap URLs: ${allPaths.length}`);
console.log(`  Orphans: ${orphans.length}`);
console.log(`  Sample incoming (Lavington×Nuru): ${incoming.get("/areas/lavington/services/nuru-massage/")?.size ?? 0} sources`);

if (warnings.length) {
  console.log(`\nWarnings (${warnings.length}):`);
  for (const w of warnings) console.log(`  ⚠ ${w}`);
}

if (errors.length) {
  console.error(`\nFAILED (${errors.length}):`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}

console.log("\nLink graph check passed.");
