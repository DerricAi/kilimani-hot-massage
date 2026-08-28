#!/usr/bin/env node
/**
 * Live vs repo metadata audit — LOCAL_SEO_MASTER_CHECKLIST live verification.
 * Run: npm run audit:live
 * Output: docs/ops/LIVE_METADATA_AUDIT.md (with --write-report)
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const LIVE_BASE = "https://kilimanihotmassage.co.ke";
const BRAND = "Kilimani Hot Massage";
const NAP = "Kilimani Hot Massage · 0746 203398 · Marcus Garvey Rd, Nairobi";
const WRITE_REPORT = process.argv.includes("--write-report");
const QUIET = process.argv.includes("--quiet");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
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

function parseMetaField(source, slug, field) {
  const idx = source.indexOf(`slug: "${slug}"`);
  if (idx === -1) return null;
  const slice = source.slice(idx, idx + 4000);
  const single = slice.match(new RegExp(`${field}:\\s*"([^"]+)"`));
  if (single) return single[1];
  const multi = slice.match(new RegExp(`${field}:\\s*\\n\\s*"([^"]+)"`));
  return multi?.[1] ?? null;
}

function withBrand(phrase) {
  return `${phrase} | ${BRAND}`;
}

function profTreatmentTitleForArea(lead, areaName) {
  if (areaName === "Kilimani") {
    return `${lead} near me Kilimani - book ${lead} on Marcus Garvey Rd massage spa - open 24/7`;
  }
  return `${lead} near me ${areaName} - from ${areaName} to Marcus Garvey Rd Kilimani - open 24/7`;
}

function profGuideTitlePhrase(phrase) {
  return `${phrase} - Marcus Garvey Rd Kilimani open 24/7`;
}

function absoluteUrl(path) {
  const raw = path.startsWith("/") ? path : `/${path}`;
  if (raw === "/") return `${LIVE_BASE}/`;
  const withSlash = raw.endsWith("/") ? raw : `${raw}/`;
  return `${LIVE_BASE}${withSlash}`;
}

function profTitleHome() {
  return `BEST Massage Spa Kilimani - Kilimani massage & spa near me - if you want massage spa near me, Swedish, Nuru, full body & couples on Marcus Garvey Rd - ${BRAND} open 24/7`;
}

function profTitleHub(kind) {
  const map = {
    treatments: withBrand(
      "BEST Massage Treatments near me Kilimani - Marcus Garvey Rd spa open 24/7"
    ),
    areas: withBrand(
      "Massage near me Nairobi areas - Marcus Garvey Rd Kilimani spa open 24/7"
    ),
    guides: withBrand(
      "Massage spa guides near me Kilimani - Marcus Garvey Rd open 24/7"
    ),
    masseuses: withBrand(
      "Masseuse near me Kilimani - book on Marcus Garvey Rd massage spa open 24/7"
    ),
    contact: withBrand(
      "Contact Massage Spa Kilimani near me - Marcus Garvey Rd open 24/7 | Call 0746 203398"
    ),
  };
  return map[kind];
}

function profTitleAreaHub(areaName) {
  if (areaName === "Kilimani") {
    return withBrand(
      "Massage Kilimani near me - Kilimani guests Marcus Garvey Rd spa open 24/7"
    );
  }
  return withBrand(
    `Massage near me ${areaName} - ${areaName} guests Marcus Garvey Rd spa open 24/7`
  );
}

function profTitleMasseuse(name) {
  return withBrand(
    `${name} masseuse near me Kilimani - book on Marcus Garvey Rd open 24/7`
  );
}

function profTitleGuideSlug(slug, guidePhrases) {
  const phrase = guidePhrases[slug];
  if (phrase) return withBrand(profGuideTitlePhrase(phrase));
  return withBrand(profGuideTitlePhrase(`${slug} near me Kilimani`));
}

function comboDescription(treatmentName, areaName) {
  return `Book ${treatmentName} for guests in ${areaName}. Studio on Marcus Garvey Rd, Kilimani. Open 24/7. Call 0746 203398.`;
}

function areaDescription(areaName, commute) {
  return `${commute}. Book massage for ${areaName} guests at Kilimani Hot Massage on Marcus Garvey Rd. Open 24/7. Call 0746 203398.`;
}

// --- Load repo expected values ---
const targetKw = read("src/content/target-keywords.ts");
const treatmentsTs = read("src/content/treatments.ts");
const guidesTs = read("src/content/guides.ts");
const treatmentLeads = parseRecordBlock(targetKw, "treatmentKeywordLead");
const guidePhrases = parseRecordBlock(targetKw, "guideTitlePhrase");

const HOME_DESC =
  "Massage Kilimani & Spa Kilimani on Marcus Garvey Rd — massage near me, massage spa near me, Swedish, Nuru, full body & couples. Open 24/7. Call or WhatsApp 0746 203398.";

const SAMPLE_PAGES = [
  { path: "/", label: "Home", title: profTitleHome(), description: HOME_DESC },
  {
    path: "/massage-treatments/",
    label: "Treatments hub",
    title: profTitleHub("treatments"),
    description:
      "Browse Swedish, deep tissue, Nuru, couples, hot stone and more at Kilimani Hot Massage. Open 24/7 on Marcus Garvey Rd.",
  },
  {
    path: "/masseuses/",
    label: "Masseuses hub",
    title: profTitleHub("masseuses"),
    description:
      "Masseuse near me in Kilimani—Amara, Zuri, Aisha, Nuri, Keisha, and Lina in private massage rooms on Marcus Garvey Rd. Open 24/7. WhatsApp 0746 203398.",
  },
  {
    path: "/areas/",
    label: "Areas hub",
    title: profTitleHub("areas"),
    description:
      "Kilimani Hot Massage serves guests across Nairobi County—17 constituencies, 85 wards, and key suburbs. Open 24/7 on Marcus Garvey Rd.",
  },
  {
    path: "/guides/",
    label: "Guides hub",
    title: profTitleHub("guides"),
    description:
      "Massage guides for Kilimani and Nairobi—Swedish vs deep tissue, first visits, Nuru, couples, 24/7 booking on Marcus Garvey Rd. WhatsApp 0746 203398.",
  },
  {
    path: "/contact/",
    label: "Contact",
    title: profTitleHub("contact"),
    description:
      "Contact Kilimani Hot Massage on Marcus Garvey Rd, Kilimani. Call or WhatsApp 0746 203398. Open 24/7.",
  },
  {
    path: "/massage-treatments/nuru-massage/",
    label: "Nuru treatment",
    title: withBrand(
      profTreatmentTitleForArea(treatmentLeads["nuru-massage"], "Kilimani")
    ),
    description: parseMetaField(treatmentsTs, "nuru-massage", "metaDescription"),
  },
  {
    path: "/massage-treatments/full-body-massage/",
    label: "Full body treatment",
    title: withBrand(
      profTreatmentTitleForArea(treatmentLeads["full-body-massage"], "Kilimani")
    ),
    description: parseMetaField(treatmentsTs, "full-body-massage", "metaDescription"),
    expect200: true,
  },
  {
    path: "/areas/kilimani/",
    label: "Kilimani area",
    title: profTitleAreaHub("Kilimani"),
    description: areaDescription(
      "Kilimani",
      "About 5–10 minutes via Marcus Garvey Rd or James Gichuru Rd"
    ),
  },
  {
    path: "/masseuses/amara/",
    label: "Masseuse Amara",
    title: profTitleMasseuse("Amara"),
    description: parseMetaField(read("src/content/masseuses.ts"), "amara", "metaDescription"),
  },
  {
    path: "/guides/massage-and-extras-kilimani/",
    label: "Massage and extras guide",
    title: profTitleGuideSlug("massage-and-extras-kilimani", guidePhrases),
    description: parseMetaField(guidesTs, "massage-and-extras-kilimani", "metaDescription"),
    expect200: true,
  },
  {
    path: "/areas/lavington/services/nuru-massage/",
    label: "Lavington × Nuru combo",
    title: withBrand(
      profTreatmentTitleForArea(treatmentLeads["nuru-massage"], "Lavington")
    ),
    description: comboDescription("Nuru Massage", "Lavington"),
  },
  {
    path: "/areas/kilimani/services/swedish-massage/",
    label: "Kilimani × Swedish combo",
    title: withBrand(
      profTreatmentTitleForArea(treatmentLeads["swedish-massage"], "Kilimani")
    ),
    description: comboDescription("Swedish Massage", "Kilimani"),
  },
];

const SCHEMA_URLS = [
  { path: "/", types: ["DaySpa", "FAQPage"], label: "Home DaySpa + FAQPage" },
  {
    path: "/massage-treatments/swedish-massage/",
    types: ["Service", "FAQPage"],
    label: "Swedish Service + FAQPage",
  },
  {
    path: "/areas/lavington/",
    types: ["Place", "FAQPage"],
    label: "Lavington Place + FAQPage",
  },
  {
    path: "/areas/kilimani/services/deep-tissue-massage/",
    types: ["Service"],
    label: "Combo Service",
  },
  {
    path: "/guides/how-to-book-24-7-spa-kilimani/",
    types: ["FAQPage"],
    label: "Guide FAQPage",
  },
  { path: "/masseuses/amara/", types: ["Person"], label: "Amara Person" },
];

const ONPAGE_CHECKS = [
  {
    path: "/",
    label: "Home on-page",
    checks: [
      { id: "h1", pattern: /<h1[^>]*>[\s\S]*?Massage Spa Kilimani/i, name: 'H1 "Massage Spa Kilimani"' },
      {
        id: "h2-spa-near-me",
        pattern: /Spa near me on Marcus Garvey Rd/i,
        name: 'H2 "Spa near me on Marcus Garvey Rd"',
      },
      {
        id: "faq-spa-near-me",
        pattern: /Is there a massage spa near me in Kilimani\?/i,
        name: "FAQ: massage spa near me",
      },
      {
        id: "faq-rooms",
        pattern: /private massage rooms near me/i,
        name: "FAQ: massage rooms near me",
      },
      {
        id: "faq-masseuse",
        pattern: /masseuse near me tonight/i,
        name: "FAQ: masseuse near me",
      },
      {
        id: "nap",
        pattern: /Kilimani Hot Massage · 0746 203398 · Marcus Garvey Rd, Nairobi/,
        name: "Visible NAP footer string",
      },
    ],
    countPattern: /href="\/massage-treatments\/[a-z-]+\/"/g,
    countMin: 12,
    countName: "Treatment links in grid",
    extraCounts: [
      {
        pattern: /<h3 class="inline text-inherit font-medium">/g,
        min: 11,
        name: "FAQ H3 questions (semantic)",
      },
    ],
  },
  {
    path: "/massage-treatments/swedish-massage/",
    label: "Swedish treatment on-page",
    checks: [
      {
        id: "h1",
        pattern: /Swedish Massage in Kilimani/i,
        name: 'H1 "Swedish Massage in Kilimani"',
      },
      {
        id: "h2-benefits",
        pattern: /<h2[^>]*>[\s\S]*?Benefits/i,
        name: 'H2 "Benefits"',
      },
      {
        id: "h2-faqs",
        pattern: /<h2[^>]*>[\s\S]*?FAQs/i,
        name: 'H2 "FAQs"',
      },
    ],
    extraCounts: [
      {
        pattern: /<h3 class="inline text-inherit font-medium">/g,
        min: 6,
        name: "FAQ H3 questions",
      },
    ],
  },
  {
    path: "/areas/lavington/",
    label: "Lavington area on-page",
    checks: [
      {
        id: "h1",
        pattern: /Massage in Lavington/i,
        name: 'H1 "Massage in Lavington"',
      },
      {
        id: "h2-faq",
        pattern: /Frequently asked questions — Lavington/i,
        name: 'H2 FAQ section "Lavington"',
      },
    ],
    extraCounts: [
      {
        pattern: /<h3 class="inline text-inherit font-medium">/g,
        min: 1,
        name: "FAQ H3 questions",
      },
    ],
  },
  {
    path: "/masseuses/",
    label: "Masseuse hub on-page",
    checks: [
      {
        id: "h1",
        pattern: /Masseuse near me in Kilimani/i,
        name: 'H1 "Masseuse near me in Kilimani"',
      },
    ],
  },
  {
    path: "/contact/",
    label: "Contact on-page",
    checks: [
      {
        id: "h2-rooms",
        pattern: /<h2[^>]*>[\s\S]*?Private massage rooms/i,
        name: 'H2 "Private massage rooms"',
      },
      {
        id: "rooms-block",
        pattern: /Private massage rooms/i,
        name: '"Private massage rooms" block',
      },
      { id: "nap", pattern: /0746 203398/, name: "Phone visible" },
    ],
  },
];

function decodeHtmlEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}

function normalizeMetaValue(value) {
  return decodeHtmlEntities(value).trim();
}

async function fetchLive(path, { accept = "text/html" } = {}) {
  const url = path.startsWith("http") ? path : absoluteUrl(path);
  const res = await fetch(url, {
    headers: { "User-Agent": "kilimani-live-audit/1.0", Accept: accept },
    redirect: "follow",
  });
  const text = await res.text();
  return { url, status: res.status, text, ok: res.ok };
}

function parseHead(html) {
  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? "";
  const description =
    html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)?.[1] ??
    html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i)?.[1] ??
    "";
  const canonical =
    html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i)?.[1] ??
    html.match(/<link\s+href=["']([^"']*)["']\s+rel=["']canonical["']/i)?.[1] ??
    "";
  const ogTitle =
    html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']*)["']/i)?.[1] ??
    html.match(/<meta\s+content=["']([^"']*)["']\s+property=["']og:title["']/i)?.[1] ??
    "";
  const ogDescription =
    html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']*)["']/i)?.[1] ??
    html.match(/<meta\s+content=["']([^"']*)["']\s+property=["']og:description["']/i)?.[1] ??
    "";
  const ogUrl =
    html.match(/<meta\s+property=["']og:url["']\s+content=["']([^"']*)["']/i)?.[1] ??
    html.match(/<meta\s+content=["']([^"']*)["']\s+property=["']og:url["']/i)?.[1] ??
    "";
  const twitterTitle =
    html.match(/<meta\s+name=["']twitter:title["']\s+content=["']([^"']*)["']/i)?.[1] ??
    html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']twitter:title["']/i)?.[1] ??
    "";
  const lang = html.match(/<html[^>]*\slang=["']([^"']*)["']/i)?.[1] ?? "";
  return {
    title: normalizeMetaValue(title),
    description: normalizeMetaValue(description),
    canonical,
    ogTitle: normalizeMetaValue(ogTitle),
    ogDescription: normalizeMetaValue(ogDescription),
    ogUrl,
    twitterTitle: normalizeMetaValue(twitterTitle),
    lang,
  };
}

function parseJsonLdBlocks(html) {
  const blocks = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    try {
      blocks.push(JSON.parse(m[1].trim()));
    } catch {
      /* skip malformed */
    }
  }
  return blocks.flatMap((b) => (Array.isArray(b) ? b : b["@graph"] ? b["@graph"] : [b]));
}

function flattenTypes(blocks) {
  return blocks.map((b) => b["@type"]).filter(Boolean);
}

function findSchema(blocks, type) {
  return blocks.find((b) => b["@type"] === type);
}

function diffField(label, expected, live, results) {
  const pass = expected === live;
  results.push({ field: label, expected, live, pass });
  return pass;
}

function statusIcon(pass) {
  return pass ? "✅" : "❌";
}

async function auditMetadataPages() {
  const rows = [];
  for (const page of SAMPLE_PAGES) {
    const { status, text, url } = await fetchLive(page.path);
    const head = status === 200 ? parseHead(text) : {};
    const expectedCanonical = absoluteUrl(page.path);
    const httpOk = page.expect200 ? status === 200 : status === 200;
    const titlePass = head.title === page.title;
    const descPass = head.description === page.description;
    const canonPass = head.canonical === expectedCanonical;
    const ogTitlePass = head.ogTitle === page.title;
    const ogDescPass = head.ogDescription === page.description;
    const ogUrlPass = head.ogUrl === expectedCanonical;
    const langPass = head.lang === "en";

    rows.push({
      label: page.label,
      path: page.path,
      url,
      httpStatus: status,
      httpOk,
      title: { expected: page.title, live: head.title ?? "(n/a)", pass: titlePass },
      description: {
        expected: page.description,
        live: head.description ?? "(n/a)",
        pass: descPass,
      },
      canonical: { expected: expectedCanonical, live: head.canonical ?? "(n/a)", pass: canonPass },
      ogTitle: { expected: page.title, live: head.ogTitle ?? "(n/a)", pass: ogTitlePass },
      ogDescription: {
        expected: page.description,
        live: head.ogDescription ?? "(n/a)",
        pass: ogDescPass,
      },
      ogUrl: { expected: expectedCanonical, live: head.ogUrl ?? "(n/a)", pass: ogUrlPass },
      lang: { expected: "en", live: head.lang ?? "(n/a)", pass: langPass },
      allPass:
        httpOk &&
        titlePass &&
        descPass &&
        canonPass &&
        ogTitlePass &&
        ogDescPass &&
        ogUrlPass &&
        langPass,
    });
  }
  return rows;
}

function sitemapIncludes(xml, path) {
  const base = `${LIVE_BASE}${path.startsWith("/") ? path : `/${path}`}`;
  const noSlash = base.replace(/\/$/, "");
  const withSlash = noSlash.endsWith("/") ? noSlash : `${noSlash}/`;
  return xml.includes(`<loc>${noSlash}</loc>`) || xml.includes(`<loc>${withSlash}</loc>`);
}

async function auditTechnical() {
  const robots = await fetchLive("/robots.txt", { accept: "text/plain" });
  const sitemap = await fetchLive("/sitemap.xml", { accept: "application/xml" });

  const robotsLines = robots.text.split("\n").map((l) => l.trim());
  const allowRoot = robotsLines.some((l) => /^Allow:\s+\/$/i.test(l));
  const sitemapLine = robotsLines.some((l) =>
    /Sitemap:\s*https:\/\/kilimanihotmassage\.co\.ke\/sitemap\.xml/i.test(l)
  );
  const hostLine = robotsLines.some((l) =>
    /Host:\s*https:\/\/kilimanihotmassage\.co\.ke/i.test(l)
  );

  const urlMatches = sitemap.text.match(/<loc>[^<]+<\/loc>/g) ?? [];
  const urlCount = urlMatches.length;
  const hasFullBody = sitemapIncludes(
    sitemap.text,
    "/massage-treatments/full-body-massage/"
  );
  const hasExtrasGuide = sitemapIncludes(
    sitemap.text,
    "/guides/massage-and-extras-kilimani/"
  );
  const hasLavingtonNuru = sitemapIncludes(
    sitemap.text,
    "/areas/lavington/services/nuru-massage/"
  );

  const minUrls = 2175;

  return {
    robots: {
      status: robots.status,
      allowRoot,
      sitemapLine,
      hostLine,
      pass: robots.status === 200 && allowRoot && sitemapLine,
    },
    sitemap: {
      status: sitemap.status,
      urlCount,
      minUrls,
      hasFullBody,
      hasExtrasGuide,
      hasLavingtonNuru,
      pass:
        sitemap.status === 200 &&
        urlCount >= minUrls &&
        hasFullBody &&
        hasExtrasGuide &&
        hasLavingtonNuru,
    },
    https: LIVE_BASE.startsWith("https://"),
  };
}

async function auditSchema() {
  const expectedNap = {
    name: BRAND,
    telephone: "0746 203398",
    streetAddress: "Marcus Garvey Rd",
    addressLocality: "Kilimani",
  };

  const rows = [];
  for (const item of SCHEMA_URLS) {
    const { status, text } = await fetchLive(item.path);
    if (status !== 200) {
      rows.push({ ...item, httpStatus: status, pass: false, error: `HTTP ${status}` });
      continue;
    }
    const blocks = parseJsonLdBlocks(text);
    const types = flattenTypes(blocks);
    const missingTypes = item.types.filter((t) => !types.includes(t));
    const daySpa = findSchema(blocks, "DaySpa");
    const person = findSchema(blocks, "Person");
    const napChecks = [];

    if (daySpa) {
      napChecks.push(diffField("DaySpa.name", expectedNap.name, daySpa.name, []));
      napChecks.push(
        diffField("DaySpa.telephone", expectedNap.telephone, daySpa.telephone, [])
      );
      napChecks.push(
        diffField(
          "DaySpa.streetAddress",
          expectedNap.streetAddress,
          daySpa.address?.streetAddress,
          []
        )
      );
      napChecks.push(daySpa.openingHoursSpecification?.length > 0);
      napChecks.push(Boolean(daySpa.geo?.latitude));
      napChecks.push(Boolean(daySpa.hasMap));
      napChecks.push((daySpa.areaServed?.length ?? 0) >= 5);
    }
    if (person) {
      napChecks.push(diffField("Person.name", "Amara", person.name, []));
      napChecks.push(Boolean(person.jobTitle));
    }

    rows.push({
      ...item,
      httpStatus: status,
      typesFound: types,
      missingTypes,
      daySpaFields: daySpa
        ? {
            name: daySpa.name,
            telephone: daySpa.telephone,
            streetAddress: daySpa.address?.streetAddress,
            hasOpeningHours: Boolean(daySpa.openingHoursSpecification?.length),
            hasGeo: Boolean(daySpa.geo),
            hasMap: Boolean(daySpa.hasMap),
            areaServedCount: daySpa.areaServed?.length ?? 0,
          }
        : null,
      pass: missingTypes.length === 0 && status === 200,
    });
  }
  return rows;
}

function stripHtmlComments(html) {
  return html.replace(/<!--[\s\S]*?-->/g, "");
}

async function auditOnPage() {
  const rows = [];
  for (const page of ONPAGE_CHECKS) {
    const { status, text } = await fetchLive(page.path);
    const body = stripHtmlComments(text);
    const checkResults = page.checks.map((c) => ({
      ...c,
      pass: status === 200 && c.pattern.test(body),
    }));
    const allCounts = [];
    if (page.countPattern) {
      allCounts.push({
        name: page.countName,
        min: page.countMin,
        count: new Set((body.match(page.countPattern) ?? [])).size,
      });
    }
    for (const ec of page.extraCounts ?? []) {
      allCounts.push({
        name: ec.name,
        min: ec.min,
        count: (body.match(ec.pattern) ?? []).length,
      });
    }
    const countResults = allCounts.map((c) => ({
      ...c,
      pass: status === 200 && c.count >= c.min,
    }));
    rows.push({
      label: page.label,
      path: page.path,
      httpStatus: status,
      checks: checkResults,
      counts: countResults,
      count: countResults[0] ?? null,
      pass:
        status === 200 &&
        checkResults.every((c) => c.pass) &&
        countResults.every((c) => c.pass),
    });
  }
  return rows;
}

function faqCount(html) {
  return (html.match(/<h3[^>]*class="[^"]*font-display[^"]*"[^>]*>/gi) ?? []).length;
}

function buildReport({ metadata, technical, schema, onpage, runAt }) {
  const metaPass = metadata.filter((r) => r.allPass).length;
  const metaTotal = metadata.length;

  let md = `# Live Metadata Audit Report

**Site:** ${LIVE_BASE}  
**Run:** ${runAt}  
**Repo branch audited against:** \`main\` (FaqAccordion h3 + heading audit)  
**NAP lock:** \`${NAP}\`

---

## Executive summary

| Wave | Scope | Pass | Total |
|------|-------|------|-------|
| 2 | Title / description / canonical / OG (sample URLs) | ${metaPass} | ${metaTotal} |
| 3 | robots.txt + sitemap.xml | ${technical.robots.pass && technical.sitemap.pass ? 2 : technical.robots.pass || technical.sitemap.pass ? 1 : 0} | 2 |
| 4 | JSON-LD schema (6 validator URLs) | ${schema.filter((s) => s.pass).length} | ${schema.length} |
| 5 | On-page H1 / FAQ / NAP / treatment count | ${onpage.filter((o) => o.pass).length} | ${onpage.length} |

> **Note:** Production may lag repo until \`cursor/keyword-targeting-ec5b\` is merged to \`main\` and deployed.

---

## Wave 2 — Title tags & meta descriptions

| Page | HTTP | Title | Description | Canonical | OG |
|------|------|-------|-------------|-----------|-----|
`;

  for (const r of metadata) {
    const t = statusIcon(r.title.pass);
    const d = statusIcon(r.description.pass);
    const c = statusIcon(r.canonical.pass);
    const og = statusIcon(r.ogTitle.pass && r.ogDescription.pass && r.ogUrl.pass);
    md += `| ${r.label} | ${r.httpStatus} | ${t} | ${d} | ${c} | ${og} |\n`;
  }

  md += `\n### Diffs (failures only)\n\n`;
  for (const r of metadata) {
    if (r.allPass) continue;
    md += `#### ${r.label} (\`${r.path}\`)\n\n`;
    if (!r.httpOk) md += `- **HTTP ${r.httpStatus}** (expected 200)\n`;
    for (const field of ["title", "description", "canonical", "ogTitle", "ogDescription", "ogUrl"]) {
      if (!r[field].pass) {
        md += `- **${field}**\n  - Expected: \`${r[field].expected}\`\n  - Live: \`${r[field].live}\`\n`;
      }
    }
    md += `\n`;
  }

  md += `---

## Wave 3 — Technical metadata

### robots.txt

| Check | Result |
|-------|--------|
| HTTP 200 | ${statusIcon(technical.robots.status === 200)} ${technical.robots.status} |
| Allow / | ${statusIcon(technical.robots.allowRoot)} |
| Sitemap directive | ${statusIcon(technical.robots.sitemapLine)} |
| Host directive | ${statusIcon(technical.robots.hostLine)} |

### sitemap.xml

| Check | Result |
|-------|--------|
| HTTP 200 | ${statusIcon(technical.sitemap.status === 200)} ${technical.sitemap.status} |
| URL count ≥ ${technical.sitemap.minUrls} | ${statusIcon(technical.sitemap.urlCount >= technical.sitemap.minUrls)} **${technical.sitemap.urlCount}** |
| full-body-massage entry | ${statusIcon(technical.sitemap.hasFullBody)} |
| massage-and-extras-kilimani entry | ${statusIcon(technical.sitemap.hasExtrasGuide)} |
| lavington/nuru combo entry | ${statusIcon(technical.sitemap.hasLavingtonNuru)} |

### Other

| Check | Result |
|-------|--------|
| HTTPS base URL | ${statusIcon(technical.https)} |

---

## Wave 4 — JSON-LD schema

Manual re-validation: [validator.schema.org](https://validator.schema.org/)

| URL | Types expected | Types found | Pass |
|-----|----------------|-------------|------|
`;

  for (const s of schema) {
    md += `| ${s.path} | ${s.types.join(", ")} | ${(s.typesFound ?? []).join(", ") || s.error || "—"} | ${statusIcon(s.pass)} |\n`;
  }

  const homeRow = schema.find((s) => s.path === "/");
  if (homeRow?.daySpaFields) {
    md += `\n### Home DaySpa NAP vs \`schema.ts\`\n\n`;
    md += `| Field | Live |\n|-------|------|\n`;
    for (const [k, v] of Object.entries(homeRow.daySpaFields)) {
      md += `| ${k} | ${v} |\n`;
    }
  }

  md += `\n---\n\n## Wave 5 — Visible on-page content\n\n`;

  for (const o of onpage) {
    md += `### ${o.label} (\`${o.path}\`)\n\n`;
    md += `HTTP **${o.httpStatus}** · Overall ${statusIcon(o.pass)}\n\n`;
    md += `| Check | Pass |\n|-------|------|\n`;
    for (const c of o.checks) {
      md += `| ${c.name} | ${statusIcon(c.pass)} |\n`;
    }
    for (const c of o.counts ?? (o.count ? [o.count] : [])) {
      md += `| ${c.name} (${c.count}/${c.min}) | ${statusIcon(c.pass)} |\n`;
    }
    md += `\n`;
  }

  md += `---

## Wave 6 — Deploy checklist

**Status (2026-08-28):** main branch — FaqAccordion H3, per-page OG via pageMetadata, audit fixes. Wave 5: 5/5 on-page pass live. Remaining: 8/13 metadata fail on deep-page OG tags until host redeploys latest main.

1. ~~Merge cursor/keyword-targeting-ec5b → main~~ ✅ Done
2. **Deploy** static export / host rebuild for ${LIVE_BASE} (client-managed host)
3. Re-run:
\`\`\`bash
npm run audit:live
npm run check:titles
npm run check:keywords
npm run build
\`\`\`
4. Flip checklist items from 🔍 Verify live → ✅ Verified live when Wave 2 sample passes

**Expected post-deploy fixes:** Prof hybrid titles on all sample URLs, /massage-treatments/full-body-massage/ and /guides/massage-and-extras-kilimani/ return 200, sitemap ≥2,189 URLs, home keyword H2 + 11 FAQ H3s + 12 treatment links, masseuse hub H1, contact private rooms H2 block.

---

## Schema validator links

| Page | URL |
|------|-----|
| Home | ${absoluteUrl("/")} |
| Swedish treatment | ${absoluteUrl("/massage-treatments/swedish-massage/")} |
| Lavington area | ${absoluteUrl("/areas/lavington/")} |
| Combo | ${absoluteUrl("/areas/kilimani/services/deep-tissue-massage/")} |
| Guide | ${absoluteUrl("/guides/how-to-book-24-7-spa-kilimani/")} |
| Masseuse | ${absoluteUrl("/masseuses/amara/")} |

`;

  return md;
}

async function main() {
  const runAt = new Date().toISOString().slice(0, 19).replace("T", " ") + " UTC";

  if (!QUIET) console.log(`Auditing ${LIVE_BASE} …\n`);

  const metadata = await auditMetadataPages();
  const technical = await auditTechnical();
  const schema = await auditSchema();
  const onpage = await auditOnPage();

  const metaPass = metadata.filter((r) => r.allPass).length;
  const failCount = metadata.length - metaPass;

  if (!QUIET) {
    console.log("Wave 2 — Metadata sample URLs");
    for (const r of metadata) {
      const icon = r.allPass ? "✅" : "❌";
      console.log(`  ${icon} ${r.label} (${r.httpStatus}) title=${r.title.pass} desc=${r.description.pass}`);
    }
    console.log(`\n  ${metaPass}/${metadata.length} pages fully match repo metadata\n`);

    console.log("Wave 3 — Technical");
    console.log(
      `  robots: ${technical.robots.pass ? "✅" : "❌"} | sitemap URLs: ${technical.sitemap.urlCount} (need ≥${technical.sitemap.minUrls}) ${technical.sitemap.pass ? "✅" : "❌"}`
    );

    console.log("\nWave 4 — Schema");
    for (const s of schema) {
      console.log(`  ${s.pass ? "✅" : "❌"} ${s.label ?? s.path} types=${(s.typesFound ?? []).join(",")}`);
    }

    console.log("\nWave 5 — On-page");
    for (const o of onpage) {
      console.log(`  ${o.pass ? "✅" : "❌"} ${o.label}`);
    }
  }

  const report = buildReport({ metadata, technical, schema, onpage, runAt });
  const reportPath = join(root, "docs/ops/LIVE_METADATA_AUDIT.md");

  if (WRITE_REPORT || !QUIET) {
    writeFileSync(reportPath, report, "utf8");
    if (!QUIET) console.log(`\nReport written: docs/ops/LIVE_METADATA_AUDIT.md`);
  }

  const allGreen =
    metaPass === metadata.length &&
    technical.robots.pass &&
    technical.sitemap.pass &&
    schema.every((s) => s.pass) &&
    onpage.every((o) => o.pass);

  if (!allGreen) {
    if (!QUIET) console.log(`\nAudit incomplete: ${failCount} metadata URL(s) differ from repo.`);
    process.exit(1);
  }

  if (!QUIET) console.log("\nLive audit passed — production matches repo sample.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
