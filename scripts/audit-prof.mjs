#!/usr/bin/env node
/**
 * Unified Prof onsite compliance audit orchestrator.
 * Run: npm run audit:prof
 */
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { LIVE_BASE, NAP } from "./audit-lib.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const WRITE_REPORT = !process.argv.includes("--no-report");
const QUIET = process.argv.includes("--quiet");

const STEPS = [
  { name: "check:unique", cmd: ["npm", "run", "check:unique"], checklist: "12.12" },
  { name: "check:titles", cmd: ["npm", "run", "check:titles"], checklist: "4.x" },
  { name: "check:keywords", cmd: ["npm", "run", "check:keywords"], checklist: "4.x" },
  { name: "check:content", cmd: ["npm", "run", "check:content"], checklist: "6.15–7.23, 9.x, 10.20" },
  { name: "check:links", cmd: ["npm", "run", "check:links"], checklist: "7.5 Step 5" },
  { name: "check:media", cmd: ["npm", "run", "check:media"], checklist: "8.x media" },
  { name: "audit:live", cmd: ["npm", "run", "audit:live"], checklist: "5.x, 9.x schema, 10.x metadata" },
  {
    name: "audit:live:content",
    cmd: ["node", "scripts/audit-live-content.mjs"],
    checklist: "6.15–7.20, 8.12, 9.x, 12.12 live",
  },
];

function runStep(step) {
  const result = spawnSync(step.cmd[0], step.cmd.slice(1), {
    cwd: root,
    encoding: "utf8",
    env: { ...process.env, FORCE_COLOR: "0" },
  });
  return {
    ...step,
    ok: result.status === 0,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
    code: result.status ?? 1,
  };
}

function readIfExists(rel) {
  const p = join(root, rel);
  return existsSync(p) ? readFileSync(p, "utf8") : "";
}

function buildProfReport(steps, runAt) {
  const allGreen = steps.every((s) => s.ok);
  const passCount = steps.filter((s) => s.ok).length;

  let md = `# Prof Content Compliance Audit

**Site:** ${LIVE_BASE}  
**Run:** ${runAt}  
**Command:** \`npm run audit:prof\`  
**NAP lock:** \`${NAP}\`

---

## Executive scorecard

| Step | Checklist IDs | Result |
|------|---------------|--------|
`;

  for (const s of steps) {
    md += `| ${s.name} | ${s.checklist} | ${s.ok ? "✅ Pass" : "❌ Fail"} |\n`;
  }

  md += `\n**Overall:** ${passCount}/${steps.length} steps green\n\n`;
  md += allGreen
    ? "> **Status:** Prof Phase 3 onsite compliance verified — repo guards + live sample audit green.\n"
    : "> **Note:** One or more audit steps failed. Fix repo/live issues and re-run `npm run audit:prof`.\n";

  md += `\n---\n\n## Checklist mapping (Phase 3 scope)\n\n`;
  md += `| ID | Rule | Tool |\n|----|------|------|\n`;
  md += `| 6.15 | Treatment pages ≥1,500 words | check:content + audit:live:content |\n`;
  md += `| 6.16 | Tier-A area pages ≥1,200 words | check:content + audit:live:content |\n`;
  md += `| 6.17 | Guide pages ≥1,200 words | check:content + audit:live:content |\n`;
  md += `| 7.1–7.22 | Interlinking matrix | check:content (template grep) |\n`;
  md += `| 7.5 Step 5 | Incoming links / orphans | check:links |\n`;
  md += `| 7.23 | Anchor diversity sample | check:content (10 combo anchors) |\n`;
  md += `| 8.x | Image alt + media.ts | check:media |\n`;
  md += `| 8.12 | CTA present | audit:live:content |\n`;
  md += `| 9.1–9.11 | FAQ depth + local flavor | check:content + audit:live:content |\n`;
  md += `| 9.20 | No fake AggregateRating | audit:live:content |\n`;
  md += `| 10.20 | Cross-page copy uniqueness | check:content (combo hash) |\n`;
  md += `| 12.12 | No competitor banned strings | check:unique + audit:live:content |\n`;

  const contentStep = steps.find((s) => s.name === "check:content");
  if (contentStep && !contentStep.ok) {
    md += `\n---\n\n## Repo content failures (check:content)\n\n\`\`\`\n${contentStep.stdout}${contentStep.stderr}\n\`\`\`\n`;
  }

  const linksStep = steps.find((s) => s.name === "check:links");
  if (linksStep && !linksStep.ok) {
    md += `\n---\n\n## Link graph failures (check:links)\n\n\`\`\`\n${linksStep.stdout}${linksStep.stderr}\n\`\`\`\n`;
  }

  const mediaStep = steps.find((s) => s.name === "check:media");
  if (mediaStep && !mediaStep.ok) {
    md += `\n---\n\n## Media failures (check:media)\n\n\`\`\`\n${mediaStep.stdout}${mediaStep.stderr}\n\`\`\`\n`;
  }

  const liveContent = steps.find((s) => s.name === "audit:live:content");
  if (liveContent && !liveContent.ok) {
    md += `\n---\n\n## Live content failures (audit:live:content)\n\n\`\`\`\n${liveContent.stdout}${liveContent.stderr}\n\`\`\`\n`;
  }

  md += `\n---\n\n## Linked reports\n\n`;
  md += `- [LIVE_METADATA_AUDIT.md](./LIVE_METADATA_AUDIT.md) — metadata/schema/on-page waves\n`;
  md += `- [LIVE_CONTENT_AUDIT.md](./LIVE_CONTENT_AUDIT.md) — live content sample URLs\n`;

  const metaAudit = readIfExists("docs/ops/LIVE_METADATA_AUDIT.md");
  if (metaAudit.includes("all audit waves green") || metaAudit.includes("all audit waves green")) {
    md += `\nMetadata audit status: green (see linked report).\n`;
  }

  const contentAudit = readIfExists("docs/ops/LIVE_CONTENT_AUDIT.md");
  if (contentAudit) {
    const match = contentAudit.match(/\*\*Pass:\*\* (\d+\/\d+)/);
    if (match) md += `Live content audit: ${match[1]} sample URLs.\n`;
  }

  md += `\n---\n\n## Verification status\n\n`;
  if (allGreen) {
    md += `After this green run, checklist items **6.15–6.17**, **7.1–7.22**, and **9.3–9.11** may be marked **Verified live (content audit)** in LOCAL_SEO_MASTER_CHECKLIST.md.\n`;
  } else {
    md += `Do not flip checklist items to Verified live until all steps pass.\n`;
  }

  return { md, allGreen, passCount };
}

function main() {
  const runAt = new Date().toISOString().slice(0, 19).replace("T", " ") + " UTC";

  if (!QUIET) {
    console.log("Prof Content Compliance Audit");
    console.log("=============================\n");
  }

  const results = [];
  for (const step of STEPS) {
    if (!QUIET) console.log(`→ ${step.name} …`);
    const r = runStep(step);
    results.push(r);
    if (!QUIET) console.log(`  ${r.ok ? "✅" : "❌"} ${step.name} (exit ${r.code})\n`);
  }

  const { md, allGreen, passCount } = buildProfReport(results, runAt);

  if (WRITE_REPORT) {
    const reportPath = join(root, "docs/ops/PROF_CONTENT_AUDIT.md");
    writeFileSync(reportPath, md, "utf8");
    if (!QUIET) console.log(`Report: docs/ops/PROF_CONTENT_AUDIT.md`);
  }

  if (!QUIET) {
    console.log(`\nProf audit: ${passCount}/${results.length} steps passed`);
  }

  if (!allGreen) process.exit(1);
}

main();
