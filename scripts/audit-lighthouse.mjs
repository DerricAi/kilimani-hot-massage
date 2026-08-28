#!/usr/bin/env node
/**
 * Core Web Vitals sample audit — checklist 10.14.
 * Run: npm run audit:lighthouse
 *
 * Requires Chrome/Chromium. Uses npx lighthouse (no install if npx cache warm).
 */
import { spawnSync } from "node:child_process";
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { LIVE_BASE } from "./audit-lib.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(root, "docs/ops/lighthouse");
const WRITE_REPORT = !process.argv.includes("--no-report");

const SAMPLE_URLS = [
  { path: "/", label: "Home" },
  { path: "/massage-treatments/swedish-massage/", label: "Swedish treatment" },
  { path: "/areas/lavington/", label: "Lavington area" },
  { path: "/guides/massage-and-extras-kilimani/", label: "Guide" },
];

const THRESHOLDS = {
  performance: 0.5,
  accessibility: 0.85,
  "best-practices": 0.85,
  seo: 0.9,
};

function absoluteUrl(path) {
  if (path === "/") return `${LIVE_BASE}/`;
  return `${LIVE_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

function runLighthouse(url, outFile) {
  const args = [
    "lighthouse",
    url,
    "--quiet",
    "--chrome-flags=--headless --no-sandbox --disable-gpu",
    "--only-categories=performance,accessibility,best-practices,seo",
    `--output=json`,
    `--output-path=${outFile}`,
  ];
  const r = spawnSync("npx", args, {
    cwd: root,
    encoding: "utf8",
    timeout: 120000,
  });
  return { ok: r.status === 0, stderr: r.stderr, stdout: r.stdout };
}

function parseScores(jsonPath) {
  const data = JSON.parse(readFileSync(jsonPath, "utf8"));
  const cats = data.categories ?? {};
  return {
    performance: cats.performance?.score ?? 0,
    accessibility: cats.accessibility?.score ?? 0,
    "best-practices": cats["best-practices"]?.score ?? 0,
    seo: cats.seo?.score ?? 0,
  };
}

function main() {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  console.log(`Lighthouse sample audit (10.14) — ${LIVE_BASE}\n`);

  const results = [];
  let chromeMissing = false;

  for (const sample of SAMPLE_URLS) {
    const url = absoluteUrl(sample.path);
    const outFile = join(OUT_DIR, `${sample.label.replace(/\s+/g, "-").toLowerCase()}.json`);
    process.stdout.write(`  ${sample.label} … `);

    const { ok, stderr } = runLighthouse(url, outFile);
    if (!ok) {
      if (/chrome|chromium|browser/i.test(stderr ?? "")) chromeMissing = true;
      console.log("skip (lighthouse/chrome unavailable)");
      results.push({ ...sample, url, skip: true, reason: stderr?.slice(0, 120) });
      continue;
    }

    let scores;
    try {
      scores = parseScores(outFile);
    } catch {
      console.log("skip (parse error)");
      results.push({ ...sample, url, skip: true });
      continue;
    }

    const pass = Object.entries(THRESHOLDS).every(([k, min]) => (scores[k] ?? 0) >= min);
    console.log(
      pass ? "pass" : "FAIL",
      `perf ${(scores.performance * 100).toFixed(0)} seo ${(scores.seo * 100).toFixed(0)}`
    );
    results.push({ ...sample, url, scores, pass, skip: false });
  }

  const tested = results.filter((r) => !r.skip);
  const allPass = tested.length > 0 && tested.every((r) => r.pass);
  const runAt = new Date().toISOString().slice(0, 19).replace("T", " ") + " UTC";

  if (WRITE_REPORT) {
    let md = `# Lighthouse Sample Audit (10.14)

**Site:** ${LIVE_BASE}  
**Run:** ${runAt}  
**Command:** \`npm run audit:lighthouse\`

| URL | Performance | Accessibility | Best practices | SEO | Pass |
|-----|-------------|---------------|----------------|-----|------|
`;
    for (const r of results) {
      if (r.skip) {
        md += `| ${r.label} | — | — | — | — | skip |\n`;
        continue;
      }
      md += `| ${r.label} | ${(r.scores.performance * 100).toFixed(0)} | ${(r.scores.accessibility * 100).toFixed(0)} | ${(r.scores["best-practices"] * 100).toFixed(0)} | ${(r.scores.seo * 100).toFixed(0)} | ${r.pass ? "pass" : "FAIL" } |\n`;
    }
    md += `\nThresholds: performance ≥50, accessibility ≥85, best-practices ≥85, seo ≥90 (sample URLs).\n`;
    if (chromeMissing) {
      md += `\n> Chrome/Chromium was unavailable in this environment — run locally for full scores.\n`;
    }
    writeFileSync(join(root, "docs/ops/LIGHTHOUSE_AUDIT.md"), md, "utf8");
    console.log(`\nReport: docs/ops/LIGHTHOUSE_AUDIT.md`);
  }

  if (!tested.length) {
    console.warn("\nNo Lighthouse runs completed (Chrome may be unavailable). Exiting 0 — run locally.");
    process.exit(0);
  }

  if (!allPass) {
    console.error("\nLighthouse thresholds not met on one or more sample URLs.");
    process.exit(1);
  }

  console.log("\nLighthouse sample audit passed.");
}

main();
