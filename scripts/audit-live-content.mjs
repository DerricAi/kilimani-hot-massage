#!/usr/bin/env node
/**
 * Live content audit — links, FAQs, word count, banned strings, CTAs, no AggregateRating.
 * Run: npm run audit:live:content
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  root,
  LIVE_BASE,
  NAP,
  BANNED_LIVE,
  fetchLive,
  stripTags,
  extractMain,
  extractFooter,
  wordCount,
  parseJsonLdBlocks,
  faqCountFromJsonLd,
  hasAggregateRating,
  countInternalLinks,
  collectInternalLinkTexts,
  countFaqH3,
  hasCta,
  statusIcon,
} from "./audit-lib.mjs";

const WRITE_REPORT = process.argv.includes("--write-report");
const QUIET = process.argv.includes("--quiet");
const SECTION_ONLY = process.argv.includes("--section-only");

const SAMPLE_PAGES = [
  {
    path: "/",
    label: "Home",
    type: "home",
    minWords: 800,
    minFaqH3: 11,
    minInternalLinks: 15,
  },
  {
    path: "/massage-treatments/swedish-massage/",
    label: "Swedish treatment",
    type: "treatment",
    minWords: 1500,
    minFaqH3: 6,
    minInternalLinks: 5,
  },
  {
    path: "/massage-treatments/nuru-massage/",
    label: "Nuru treatment",
    type: "treatment",
    minWords: 1500,
    minFaqH3: 6,
    minInternalLinks: 5,
  },
  {
    path: "/areas/lavington/",
    label: "Lavington area",
    type: "area",
    minWords: 1200,
    minFaqH3: 3,
    minInternalLinks: 10,
  },
  {
    path: "/areas/kilimani/",
    label: "Kilimani area",
    type: "area",
    minWords: 1200,
    minFaqH3: 3,
    minInternalLinks: 10,
  },
  {
    path: "/areas/lavington/services/nuru-massage/",
    label: "Lavington × Nuru combo",
    type: "combo",
    minWords: 400,
    minFaqH3: 6,
    minInternalLinks: 4,
  },
  {
    path: "/areas/kilimani/services/deep-tissue-massage/",
    label: "Kilimani × Deep tissue combo",
    type: "combo",
    minWords: 400,
    minFaqH3: 6,
    minInternalLinks: 4,
  },
  {
    path: "/guides/massage-and-extras-kilimani/",
    label: "Massage and extras guide",
    type: "guide",
    minWords: 1200,
    minFaqH3: 3,
    minInternalLinks: 3,
  },
  {
    path: "/masseuses/amara/",
    label: "Masseuse Amara",
    type: "masseuse",
    minWords: 600,
    minFaqH3: 3,
    minInternalLinks: 3,
  },
];

function auditPage(page, html, status) {
  const main = extractMain(html);
  const footer = extractFooter(html);
  const mainText = stripTags(main);
  const words = wordCount(mainText);
  const mainLinks = countInternalLinks(main);
  const footerLinks = countInternalLinks(footer);
  const faqH3 = countFaqH3(main);
  const jsonLd = parseJsonLdBlocks(html);
  const faqJsonLd = faqCountFromJsonLd(jsonLd);
  const linkTexts = collectInternalLinkTexts(main, 20);
  const uniqueLinkTexts = new Set(linkTexts);
  const banned = BANNED_LIVE.filter((s) => html.includes(s));
  const cta = hasCta(main);
  const aggRating = hasAggregateRating(jsonLd);

  const checks = {
    http: status === 200,
    words: words >= page.minWords,
    faqH3: faqH3 >= page.minFaqH3,
    faqJsonLd: faqJsonLd >= page.minFaqH3 || page.type === "masseuse",
    internalLinks: mainLinks >= page.minInternalLinks,
    inBodyLinks: mainLinks > footerLinks || mainLinks >= 3,
    anchorDiversity: linkTexts.length === 0 || uniqueLinkTexts.size > 1,
    noBanned: banned.length === 0,
    cta,
    noAggregateRating: !aggRating,
  };

  const pass = Object.values(checks).every(Boolean);

  return {
    ...page,
    status,
    words,
    mainLinks,
    footerLinks,
    faqH3,
    faqJsonLd,
    linkTexts: linkTexts.slice(0, 5),
    uniqueLinkTexts: uniqueLinkTexts.size,
    banned,
    checks,
    pass,
  };
}

function buildSection(results, runAt) {
  const passCount = results.filter((r) => r.pass).length;
  const allGreen = passCount === results.length;

  let md = `## Live content audit (Wave 6)

**Run:** ${runAt}  
**Sample URLs:** ${results.length}  
**Pass:** ${passCount}/${results.length}

| URL | HTTP | Words | FAQ H3 | FAQ JSON-LD | Main links | CTA | Banned | AggRating | Result |
|-----|------|-------|--------|-------------|------------|-----|--------|-----------|--------|
`;

  for (const r of results) {
    md += `| ${r.label} | ${r.status} | ${r.words} | ${r.faqH3} | ${r.faqJsonLd} | ${r.mainLinks} | ${statusIcon(r.checks.cta)} | ${statusIcon(r.checks.noBanned)} | ${statusIcon(r.checks.noAggregateRating)} | ${statusIcon(r.pass)} |\n`;
  }

  md += `\n${allGreen ? "> **Status:** All live content sample URLs pass Prof Phase 3 checks." : "> **Note:** Some content checks failed — see diffs below."}\n\n`;

  md += `### Diffs (failures only)\n\n`;
  for (const r of results) {
    if (r.pass) continue;
    md += `#### ${r.label} (\`${r.path}\`)\n\n`;
    if (!r.checks.http) md += `- HTTP ${r.status} (expected 200)\n`;
    if (!r.checks.words) md += `- Word count ${r.words} (need ≥${r.minWords})\n`;
    if (!r.checks.faqH3) md += `- FAQ H3 count ${r.faqH3} (need ≥${r.minFaqH3})\n`;
    if (!r.checks.faqJsonLd) md += `- FAQ JSON-LD entities ${r.faqJsonLd} (need ≥${r.minFaqH3})\n`;
    if (!r.checks.internalLinks) md += `- Main internal links ${r.mainLinks} (need ≥${r.minInternalLinks})\n`;
    if (!r.checks.inBodyLinks) md += `- In-body links ${r.mainLinks} vs footer ${r.footerLinks} (main should dominate)\n`;
    if (!r.checks.anchorDiversity) md += `- Anchor texts all identical: ${JSON.stringify(r.linkTexts)}\n`;
    if (!r.checks.noBanned) md += `- Banned strings: ${r.banned.join(", ")}\n`;
    if (!r.checks.cta) md += `- Missing WhatsApp/tel CTA in main\n`;
    if (!r.checks.noAggregateRating) md += `- AggregateRating found in JSON-LD (checklist 9.20)\n`;
    md += `\n`;
  }

  return { md, passCount, allGreen, total: results.length };
}

function buildStandaloneReport(results, runAt) {
  const { md, passCount, allGreen, total } = buildSection(results, runAt);
  return `# Live Content Audit Report

**Site:** ${LIVE_BASE}  
**Run:** ${runAt}  
**NAP lock:** \`${NAP}\`

---

${md}

---

## Checklist mapping

| ID | Check | Evidence |
|----|-------|----------|
| 6.15–6.17 | Visible word count in \`<main>\` | Sample treatment/area/guide URLs above |
| 7.5, 7.18–7.20 | Internal link count, main vs footer | Main links column |
| 7.16–7.17 | Anchor text diversity | First 20 internal link texts per URL |
| 8.12 | CTA present | WhatsApp/tel in main |
| 9.x | FAQ H3 + JSON-LD | FAQ columns |
| 9.20 | No fake AggregateRating | AggRating column |
| 12.12 | No banned competitor copy | Banned column |

**Summary:** ${passCount}/${total} sample URLs pass live content audit.
`;
}

async function main() {
  const runAt = new Date().toISOString().slice(0, 19).replace("T", " ") + " UTC";
  const results = [];

  if (!QUIET) console.log(`Live content audit: ${LIVE_BASE}\n`);

  for (const page of SAMPLE_PAGES) {
    const { status, text } = await fetchLive(page.path);
    const result = auditPage(page, text, status);
    results.push(result);
    if (!QUIET) {
      console.log(
        `  ${result.pass ? "✅" : "❌"} ${page.label} — ${result.words} words, ${result.faqH3} FAQ H3, ${result.mainLinks} main links`
      );
    }
  }

  const { md, allGreen, passCount, total } = buildSection(results, runAt);

  if (SECTION_ONLY) {
    process.stdout.write(md);
    process.exit(allGreen ? 0 : 1);
  }

  const reportPath = join(root, "docs/ops/LIVE_CONTENT_AUDIT.md");
  writeFileSync(reportPath, buildStandaloneReport(results, runAt), "utf8");
  if (!QUIET) console.log(`\nReport: docs/ops/LIVE_CONTENT_AUDIT.md (${passCount}/${total} pass)`);

  if (!allGreen) {
    if (!QUIET) console.log("\nLive content audit failed.");
    process.exit(1);
  }

  if (!QUIET) console.log("\nLive content audit passed.");
  return { results, allGreen, sectionMd: md };
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

export { buildSection, SAMPLE_PAGES };
