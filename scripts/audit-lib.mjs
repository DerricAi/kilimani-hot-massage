#!/usr/bin/env node
/**
 * Shared helpers for live content/metadata audits.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

export const root = join(dirname(fileURLToPath(import.meta.url)), "..");
export const LIVE_BASE = "https://kilimanihotmassage.co.ke";
export const BRAND = "Kilimani Hot Massage";
export const NAP = "Kilimani Hot Massage · 0746 203398 · Marcus Garvey Rd, Nairobi";

export const BANNED_LIVE = [
  "0108 744193",
  "Argwings Kodhek",
  "lavingtonhotmassage.co.ke",
  "melt tension after Nairobi traffic",
  "Focused pressure for desk necks, gym tightness, and road tension",
  "Silky gel, full-body glide, private suite",
];

export const LOCAL_FLAVOR_KEYWORDS = ["Marcus Garvey", "Yaya", "Kilimani"];

export function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

export function absoluteUrl(path) {
  const raw = path.startsWith("/") ? path : `/${path}`;
  if (raw === "/") return `${LIVE_BASE}/`;
  const withSlash = raw.endsWith("/") ? raw : `${raw}/`;
  return `${LIVE_BASE}${withSlash}`;
}

export function decodeHtmlEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}

export function wordCount(text) {
  return text
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;
}

export function stripTags(html) {
  return decodeHtmlEntities(html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " "));
}

export function extractMain(html) {
  const m = html.match(/<main[\s\S]*?>([\s\S]*?)<\/main>/i);
  return m?.[1] ?? html;
}

export function extractFooter(html) {
  const m = html.match(/<footer[\s\S]*?>([\s\S]*?)<\/footer>/i);
  return m?.[1] ?? "";
}

export async function fetchLive(path, { accept = "text/html" } = {}) {
  const url = path.startsWith("http") ? path : absoluteUrl(path);
  const res = await fetch(url, {
    headers: { "User-Agent": "kilimani-live-audit/1.0", Accept: accept },
    redirect: "follow",
  });
  const text = await res.text();
  return { url, status: res.status, text, ok: res.ok };
}

export function parseJsonLdBlocks(html) {
  const blocks = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(m[1].trim());
      if (Array.isArray(parsed)) blocks.push(...parsed);
      else blocks.push(parsed);
    } catch {
      /* skip malformed */
    }
  }
  return blocks;
}

export function faqCountFromJsonLd(blocks) {
  let max = 0;
  for (const b of blocks) {
    if (b["@type"] === "FAQPage" && Array.isArray(b.mainEntity)) {
      max = Math.max(max, b.mainEntity.length);
    }
    if (Array.isArray(b["@graph"])) {
      for (const g of b["@graph"]) {
        if (g["@type"] === "FAQPage" && Array.isArray(g.mainEntity)) {
          max = Math.max(max, g.mainEntity.length);
        }
      }
    }
  }
  return max;
}

export function hasAggregateRating(blocks) {
  const json = JSON.stringify(blocks);
  return json.includes("AggregateRating");
}

export function countInternalLinks(html, { excludeTelWa = true } = {}) {
  const re = /<a[^>]+href=["'](\/[^"']*)["'][^>]*>/gi;
  let count = 0;
  let m;
  while ((m = re.exec(html)) !== null) {
    const href = m[1];
    if (excludeTelWa && (href.startsWith("/tel") || href.includes("whatsapp"))) continue;
    count++;
  }
  return count;
}

export function collectInternalLinkTexts(html, limit = 20) {
  const texts = [];
  const re = /<a[^>]+href=["'](\/[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html)) !== null && texts.length < limit) {
    const href = m[1];
    if (href.startsWith("/tel") || href.includes("whatsapp")) continue;
    const text = stripTags(m[2]).trim();
    if (text) texts.push(text);
  }
  return texts;
}

export function countFaqH3(html) {
  const re = /<h3 class="inline text-inherit font-medium">/g;
  return (html.match(re) ?? []).length;
}

export function hasCta(html) {
  return /href=["']https:\/\/wa\.me\//i.test(html) || /href=["']tel:/i.test(html);
}

export function statusIcon(pass) {
  return pass ? "✅" : "❌";
}

export function parseRecordBlock(source, exportName) {
  const block = source.match(
    new RegExp(`export const ${exportName}[\\s\\S]*?\\};`)
  )?.[0];
  if (!block) return {};
  const entries = {};
  const re = /"([a-z0-9-]+)":\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(block)) !== null) entries[m[1]] = m[2];
  return entries;
}

export function parseTierASlugs(source) {
  const block = source.match(/export const TIER_A_SLUGS[\s\S]*?\];/)?.[0] ?? "";
  const slugs = [];
  const re = /"([a-z-]+)"/g;
  let m;
  while ((m = re.exec(block)) !== null) slugs.push(m[1]);
  return slugs;
}

export function parseServiceComboExtras(source) {
  const block = source.match(/const serviceComboExtras[\s\S]*?\};\s*\n\s*\/\*\*/)?.[0] ?? "";
  const extras = {};
  const re = /"([a-z-]+)\|([a-z-]+)":\s*\n?\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(block)) !== null) {
    extras[`${m[1]}|${m[2]}`] = m[3];
  }
  return extras;
}

export function comboHash(key) {
  let h = 0;
  for (let i = 0; i < key.length; i++) {
    h = (h * 31 + key.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function pick(key, options) {
  return options[comboHash(key) % options.length];
}

export function unescapeTsString(s) {
  return s.replace(/\\"/g, '"').replace(/\\n/g, "\n");
}

export function extractStringField(block, field) {
  const single = block.match(new RegExp(`${field}:\\s*"((?:\\\\.|[^"\\\\])*)"`));
  if (single) return unescapeTsString(single[1]);
  const multi = block.match(
    new RegExp(`${field}:\\s*\\n\\s*"((?:\\\\.|[^"\\\\])*)"`, "m")
  );
  return multi ? unescapeTsString(multi[1]) : "";
}

export function countFaqsInBlock(block) {
  const idx = block.indexOf("faqs:");
  if (idx === -1) return 0;
  const slice = block.slice(idx);
  const open = slice.indexOf("[");
  if (open === -1) return 0;
  let depth = 0;
  let end = -1;
  for (let i = open; i < slice.length; i++) {
    if (slice[i] === "[") depth++;
    else if (slice[i] === "]") {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (end === -1) return 0;
  return (slice.slice(open + 1, end).match(/\bq:\s*"/g) ?? []).length;
}

export function extractStringArray(block, field) {
  const section = block.match(new RegExp(`${field}:\\s*\\[([\\s\\S]*?)\\],`, "m"));
  if (!section) return [];
  const strings = [];
  const re = /"((?:\\.|[^"\\])*)"/g;
  let m;
  while ((m = re.exec(section[1])) !== null) strings.push(unescapeTsString(m[1]));
  return strings;
}

export function extractParagraphsFromSections(block) {
  const texts = [];
  let searchFrom = 0;
  while (true) {
    let idx = block.indexOf("paragraphs:", searchFrom);
    if (idx === -1) idx = block.indexOf('"paragraphs":', searchFrom);
    if (idx === -1) break;
    const slice = block.slice(idx);
    const open = slice.indexOf("[");
    if (open === -1) break;
    let depth = 0;
    let end = -1;
    for (let i = open; i < slice.length; i++) {
      if (slice[i] === "[") depth++;
      else if (slice[i] === "]") {
        depth--;
        if (depth === 0) {
          end = i;
          break;
        }
      }
    }
    if (end === -1) break;
    const inner = slice.slice(open + 1, end);
    const strRe = /"((?:\\.|[^"\\])*)"/g;
    let sm;
    while ((sm = strRe.exec(inner)) !== null) texts.push(unescapeTsString(sm[1]));
    searchFrom = idx + end + 1;
  }
  return texts;
}

export function extractFaqTexts(block) {
  const idx = block.indexOf("faqs:");
  if (idx === -1) return [];
  const slice = block.slice(idx);
  const open = slice.indexOf("[");
  if (open === -1) return [];
  let depth = 0;
  let end = -1;
  for (let i = open; i < slice.length; i++) {
    if (slice[i] === "[") depth++;
    else if (slice[i] === "]") {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (end === -1) return [];
  const inner = slice.slice(open + 1, end);
  const texts = [];
  const re = /q:\s*"((?:\\.|[^"\\])*)"\s*,\s*\n\s*a:\s*"((?:\\.|[^"\\])*)"/g;
  let m;
  while ((m = re.exec(inner)) !== null) {
    texts.push(unescapeTsString(m[1]), unescapeTsString(m[2]));
  }
  return texts;
}

export function parseTreatmentBlocks(source) {
  const start = source.indexOf("const treatmentsData");
  const slice = source.slice(start);
  const parts = slice.split(/\n  \},\n  \{/);
  const blocks = parts.map((p, i) => (i === 0 ? p : "  {" + p));
  const treatments = [];
  for (const block of blocks) {
    const slug = extractStringField(block, "slug");
    if (!slug || !slug.includes("-")) continue;
    treatments.push({
      slug,
      name: extractStringField(block, "name"),
      shortName: extractStringField(block, "shortName"),
      tagline: extractStringField(block, "tagline"),
      summary: extractStringField(block, "summary"),
      benefits: extractStringArray(block, "benefits"),
      sectionParagraphs: extractParagraphsFromSections(block),
      faqCount: countFaqsInBlock(block),
      faqTexts: extractFaqTexts(block),
      block,
    });
  }
  return treatments;
}

export function parseGuideBlocks(source) {
  const start = source.indexOf("const guidesBase");
  const slice = source.slice(start);
  const parts = slice.split(/\n  \},\n  \{/);
  const blocks = parts.map((p, i) => (i === 0 ? p : "  {" + p));
  const guides = [];
  for (const block of blocks) {
    const slug = extractStringField(block, "slug");
    if (!slug) continue;
    guides.push({
      slug,
      excerpt: extractStringField(block, "excerpt"),
      sectionParagraphs: extractParagraphsFromSections(block),
      faqCount: countFaqsInBlock(block),
      faqTexts: extractFaqTexts(block),
      relatedTreatments: (block.match(/relatedTreatments:\s*\[([\s\S]*?)\]/)?.[1] ?? "")
        .match(/"([a-z-]+)"/g)
        ?.map((s) => s.replace(/"/g, "")) ?? [],
      relatedAreas: (block.match(/relatedAreas:\s*\[([\s\S]*?)\]/)?.[1] ?? "")
        .match(/"([a-z-]+)"/g)
        ?.map((s) => s.replace(/"/g, "")) ?? [],
      relatedGuides: (block.match(/relatedGuides:\s*\[([\s\S]*?)\]/)?.[1] ?? "")
        .match(/"([a-z-]+)"/g)
        ?.map((s) => s.replace(/"/g, "")) ?? [],
    });
  }
  return guides;
}

export function parseMasseuseBlocks(source) {
  const start = source.indexOf("const masseusesData");
  const slice = source.slice(start);
  const parts = slice.split(/\n  \},\n  \{/);
  const blocks = parts.map((p, i) => (i === 0 ? p : "  {" + p));
  const masseuses = [];
  for (const block of blocks) {
    const slug = extractStringField(block, "slug");
    if (!slug) continue;
    masseuses.push({
      slug,
      name: extractStringField(block, "name"),
      tagline: extractStringField(block, "tagline"),
      shortBio: extractStringField(block, "shortBio"),
      specialties: (block.match(/specialties:\s*\[([\s\S]*?)\]/)?.[1] ?? "")
        .match(/"([a-z-]+)"/g)
        ?.map((s) => s.replace(/"/g, "")) ?? [],
      faqCount: countFaqsInBlock(block),
    });
  }
  return masseuses;
}

function parseStringArray(chunk, field) {
  const m = chunk.match(new RegExp(`${field}:\\s*\\[([\\s\\S]*?)\\]`, "m"));
  if (!m) return [];
  const items = [];
  const re = /"((?:\\.|[^"\\])*)"/g;
  let im;
  while ((im = re.exec(m[1])) !== null) items.push(unescapeTsString(im[1]));
  return items;
}

export function parseAreaRecords(source) {
  const areas = [];
  const chunks = source.split(/\n  \{\n    slug:/).slice(1);
  for (const chunk of chunks) {
    const slug = chunk.match(/^ "([^"]+)"/)?.[1];
    if (!slug) continue;
    const name = chunk.match(/name: "([^"]+)"/)?.[1] ?? slug;
    const tier = chunk.match(/tier: "(A|B)"/)?.[1] ?? "B";
    const intro = chunk.match(/intro:\s*\n?\s*"((?:\\.|[^"\\])*)"/)?.[1];
    const introClean = intro ? unescapeTsString(intro) : "";
    const commute = chunk.match(/commute:\s*\n?\s*"((?:\\.|[^"\\])*)"/)?.[1];
    const constituencyName =
      chunk.match(/constituencyName:\s*"([^"]+)"/)?.[1] ?? name;
    areas.push({
      slug,
      name,
      tier,
      intro: introClean,
      commute: commute ? unescapeTsString(commute) : "",
      constituencyName,
      landmarks: parseStringArray(chunk, "landmarks"),
      roads: parseStringArray(chunk, "roads"),
      neighboringAreas: parseStringArray(chunk, "neighboringAreas"),
    });
  }
  return areas;
}

const TIER_B_PHONE = "0746 203398";
const TIER_B_SPA = "Kilimani Hot Massage";
const TIER_B_ADDRESS = "Marcus Garvey Rd, Kilimani";

/** Mirrors generateTierBEnrichment() in enrichment.ts for word-count guards. */
export function tierBEnrichmentText(area) {
  const lm = area.landmarks.slice(0, 4);
  const rd = area.roads.slice(0, 4);
  const nb = area.neighboringAreas.slice(0, 4);
  const sections = [
    area.intro,
    `${TIER_B_SPA} on ${TIER_B_ADDRESS} welcomes guests from ${area.name} in ${area.constituencyName} constituency. ${area.commute} puts our treatment rooms within practical reach whether you are coming from ${lm[0] ?? area.name}, finishing errands near ${lm[1] ?? "local shops"}, or heading in after work along ${rd[0] ?? "main roads"}.`,
    `Call ${TIER_B_PHONE} any time—we are open 24/7. Reception knows ${area.name} routes via ${rd.slice(0, 2).join(" and ") || "major connectors"} and can send a map pin before you leave.`,
    `When ${area.name} visitors book, they often mention ${lm.join(", ")} as their starting point. Drivers typically merge toward Marcus Garvey Rd using ${rd[0] ?? "the nearest arterial"}; if traffic stacks near ${lm[2] ?? lm[0]}, ${rd[1] ?? "alternate roads"} offers a smoother approach to our Kilimani studio on Marcus Garvey Rd.`,
    `First-time guests from ${area.name} should tell ride-hail drivers "${TIER_B_SPA}, Marcus Garvey Rd, Kilimani." That phrasing works better than generic "massage near me" searches that scatter pins across Nairobi.`,
    `We serve ${area.name} alongside neighbours in ${nb.join(", ") || "surrounding areas"}—many share the same commute pattern and return monthly once they know the drive time from ${lm[0] ?? area.name}.`,
    `${area.name} professionals often book deep tissue after long days near ${lm[0] ?? "local offices"}. Swedish and aromatherapy sessions suit weekend recovery when you have crossed ${rd[2] ?? rd[0] ?? "town"} from home.`,
    `Couples and friends visiting from ${area.name} request side-by-side rooms—plan ahead on Friday nights. Thai massage helps if you have been on your feet around ${lm[1] ?? "the neighbourhood"}.`,
    `Unsure what to choose? WhatsApp ${TIER_B_PHONE} with your ${area.name} location and how much time you have; we will recommend a treatment length that fits your schedule and drive back via ${rd[3] ?? rd[0] ?? "your usual road"}.`,
    `${area.commute} is typical from ${area.name} to our Kilimani studio when ${rd[0] ?? "main roads"} flow freely. Peak hours slow approaches near ${lm[2] ?? lm[0]}—many ${area.name} clients book mid-morning or after 9 p.m. to skip congestion.`,
    `If you live closer to ${nb[0] ?? "a neighbouring area"}, you may arrive faster by approaching from ${nb[1] ?? "Lavington"} side streets rather than retracing ${rd[1] ?? "the highway"}.`,
    `Parking on Marcus Garvey Rd is usually available; ${area.name} drivers with large vehicles should call ahead so we can suggest the widest pull-off near our gate.`,
    `${area.name} does not stop at sunset—neither do we. Hospital shifts, late flights, and ${lm[3] ?? "local"} event nights create demand for massage after traditional spas close.`,
    `Discreet suites off the ${area.name}–Lavington corridor appeal to guests who want calm without CBD noise. The same team answers ${TIER_B_PHONE} at noon or midnight.`,
    `Save therapist preferences after your first visit from ${area.name}; repeat bookings through ${rd[0] ?? "your usual route"} become faster when reception already knows your pressure and scent choices.`,
  ];
  const faqs = [
    `From ${area.name}, ${area.commute} to our Marcus Garvey Rd spa when ${rd[0] ?? "roads"} are clear. Rush hour near ${lm[0] ?? area.name} can add time—call ${TIER_B_PHONE} for live routing advice.`,
    `${area.name} guests often start near ${lm.join(", ")}. We are on Marcus Garvey Rd in Kilimani—use ${TIER_B_SPA} as your ride-hail destination for accurate pins.`,
    `Common ${area.name} routes include ${rd.join(", ")}. Reception at ${TIER_B_PHONE} can suggest the fastest option based on time of day and traffic near ${lm[1] ?? area.name}.`,
    `Yes. ${area.name} clients book early mornings and late nights alike. We never close—ideal when your schedule around ${lm[2] ?? area.name} runs past traditional spa hours.`,
    `${area.name} couples are welcome. Reserve weekend slots in advance; weekday evenings from ${area.name} often have availability with ${area.commute} travel time factored in.`,
    `Street parking near Marcus Garvey Rd usually works for ${area.name} drivers. Text ${TIER_B_PHONE} if you need guidance approaching from ${rd[1] ?? rd[0] ?? area.name}.`,
    `Deep tissue and Swedish lead bookings from ${area.name}. Tell us if you walked from ${lm[0] ?? area.name} or drove via ${rd[0] ?? "main roads"}—we will tailor focus areas.`,
    `Yes. We serve ${area.name} plus ${nb.slice(0, 3).join(", ") || "surrounding neighbourhoods"} from one Marcus Garvey Rd location. ${area.commute} from ${area.name} is similar for many neighbours.`,
  ];
  const tips = [
    `From ${area.name}, save our WhatsApp pin after your first visit—faster than searching near ${lm[0] ?? "home"} each time.`,
    `Mid-morning slots avoid peak traffic between ${lm[1] ?? area.name} and Lavington.`,
    `Mention ${lm[2] ?? lm[0] ?? area.name} when calling ${TIER_B_PHONE} so reception can estimate your ETA.`,
  ];
  return [...sections, ...faqs, ...tips].join(" ");
}

export function serviceComboMetaDescription(areaName, treatmentName) {
  return `Book ${treatmentName} for guests in ${areaName}. Studio on Marcus Garvey Rd, Kilimani. Open 24/7. Call ${TIER_B_PHONE}.`;
}

export function masseuseComboMetaDescription(areaName, masseuseName, tagline) {
  return `Request ${masseuseName} when visiting from ${areaName}. ${tagline} Open 24/7 in Kilimani. WhatsApp ${TIER_B_PHONE}.`;
}

/** Simplified masseuse×area combo body (mirrors buildMasseuseParagraphs, first template variant). */
export function masseuseComboBodyText(area, masseuse) {
  const landmark = area.landmarks[0] ?? area.name;
  const landmark2 = area.landmarks[1] ?? landmark;
  const road = area.roads[0] ?? "Marcus Garvey Rd";
  const specs = (masseuse.specialties ?? []).map((s) => s.replace(/-/g, " ")).join(", ");
  const nb = area.neighboringAreas.slice(0, 3).join(", ");
  return [
    `${masseuse.name} welcomes ${area.name} guests at our Marcus Garvey Rd studio. ${area.commute}`,
    masseuse.shortBio ?? "",
    area.intro,
    `Near ${landmark} or ${landmark2}, message ${masseuse.name} on WhatsApp ${TIER_B_PHONE} before you leave ${area.name}.`,
    `${masseuse.tagline ?? ""} Specialties: ${specs}. Open 24/7 for ${area.name} guests finishing late or booking early quiet.`,
    `Guests from neighbouring wards including ${nb || "nearby areas"} share the same ${masseuse.name} booking line—mention ${area.name} for commute-aware holds.`,
    `Full profile: /masseuses/${masseuse.slug}/. Area hub: /areas/${area.slug}/. WhatsApp ${TIER_B_PHONE} with ${masseuse.name} and ${area.name}.`,
    `Driving from ${road} across ${area.constituencyName ?? area.name}? Name ${masseuse.name} when booking so we confirm her shift on Marcus Garvey Rd.`,
  ].join(" ");
}

export function buildSitemapPaths(areas, treatments, masseuses, guides) {
  const paths = new Set([
    "/",
    "/massage-treatments/",
    "/areas/",
    "/masseuses/",
    "/guides/",
    "/about-us/",
    "/contact/",
  ]);
  for (const t of treatments) paths.add(`/massage-treatments/${t.slug}/`);
  for (const m of masseuses) paths.add(`/masseuses/${m.slug}/`);
  for (const g of guides) paths.add(`/guides/${g.slug}/`);
  for (const a of areas) {
    paths.add(`/areas/${a.slug}/`);
    for (const t of treatments) paths.add(`/areas/${a.slug}/services/${t.slug}/`);
    for (const m of masseuses) paths.add(`/areas/${a.slug}/masseuses/${m.slug}/`);
  }
  return [...paths];
}

export function normPath(path) {
  if (path === "/" || path === "") return "/";
  const p = path.startsWith("/") ? path : `/${path}`;
  return p.endsWith("/") ? p : `${p}/`;
}

export function addIncoming(incoming, from, to) {
  const t = normPath(to);
  if (!incoming.has(t)) incoming.set(t, new Set());
  incoming.get(t).add(normPath(from));
}

export function parseAreaEnrichmentBlock(block) {
  return {
    sectionParagraphs: extractParagraphsFromSections(block),
    faqCount: countFaqsInBlock(block),
    faqTexts: extractFaqTexts(block),
  };
}

function parseRecordObject(source, constName, endMarker) {
  const startIdx = source.indexOf(constName);
  if (startIdx === -1) return {};
  const brace = source.indexOf("{", startIdx);
  let endIdx;
  if (endMarker) {
    endIdx = source.indexOf(endMarker, brace);
  } else {
    endIdx = source.indexOf("\n};", brace);
    if (endIdx !== -1) endIdx += 3;
  }
  const slice = source.slice(brace, endIdx === -1 ? undefined : endIdx);
  const entries = {};
  const keyRe = /\n  "?([a-z-]+)"?:\s*(?:\{|\[)/g;
  const keys = [];
  let km;
  while ((km = keyRe.exec(slice)) !== null) {
    keys.push({ slug: km[1], start: km.index });
  }
  for (let i = 0; i < keys.length; i++) {
    const { slug, start: s } = keys[i];
    const end = keys[i + 1]?.start ?? slice.length;
    entries[slug] = parseAreaEnrichmentBlock(slice.slice(s, end));
  }
  return entries;
}

function mergeEnrichment(target, extra) {
  if (!extra) return;
  target.sectionParagraphs.push(...(extra.sectionParagraphs ?? []));
  target.faqTexts.push(...(extra.faqTexts ?? []));
  target.faqCount = countFaqsFromTexts(target.faqTexts);
}

function countFaqsFromTexts(faqTexts) {
  return Math.floor(faqTexts.length / 2);
}

export function parseMergedAreaEnrichments(source) {
  const endMarker = "/** Additional Tier A copy merged";
  const base = parseRecordObject(source, "export const areaEnrichments", endMarker);
  const merged = {};
  for (const [slug, data] of Object.entries(base)) {
    merged[slug] = { ...data, faqCount: data.faqCount };
  }

  const extraNames = [
    "tierAExtra",
    "tierAExtra2",
    "tierAExtra4",
    "tierAExtra5",
    "tierAExtra6",
    "tierAExtra7",
    "tierAExtra10",
  ];
  for (const name of extraNames) {
    const endMarker =
      name === "tierAExtra10"
        ? "\nfor (const [slug, extra] of Object.entries(tierAExtra10))"
        : "\nconst tierA";
    const extras = parseRecordObject(source, name, endMarker);
    for (const [slug, data] of Object.entries(extras)) {
      if (!merged[slug]) merged[slug] = { sectionParagraphs: [], faqTexts: [], faqCount: 0 };
      mergeEnrichment(merged[slug], data);
    }
  }

  const extra12Match = source.match(/const tierAExtra12[\s\S]*?= \{([\s\S]*?)\n\};/);
  if (extra12Match) {
    const extra12 = parseRecordObject(`const tierAExtra12 = {${extra12Match[1]}\n};`, "tierAExtra12");
    for (const [slug, data] of Object.entries(extra12)) {
      if (!merged[slug]) merged[slug] = { sectionParagraphs: [], faqTexts: [], faqCount: 0 };
      mergeEnrichment(merged[slug], data);
    }
  }

  const extra13Match = source.match(/const tierAExtra13[\s\S]*?= \{([\s\S]*?)\n\};/);
  if (extra13Match) {
    const extra13 = parseRecordObject(`const tierAExtra13 = {${extra13Match[1]}\n};`, "tierAExtra13");
    for (const [slug, data] of Object.entries(extra13)) {
      if (!merged[slug]) merged[slug] = { sectionParagraphs: [], faqTexts: [], faqCount: 0 };
      mergeEnrichment(merged[slug], data);
    }
  }

  // tierAExtra3: Record<string, AreaSection[]>
  const extra3Match = source.match(/const tierAExtra3[\s\S]*?= \{([\s\S]*?)\n\};/);
  if (extra3Match) {
    const extra3 = parseRecordObject(`const tierAExtra3 = {${extra3Match[1]}\n};`, "tierAExtra3");
    for (const [slug, data] of Object.entries(extra3)) {
      if (!merged[slug]) merged[slug] = { sectionParagraphs: [], faqTexts: [], faqCount: 0 };
      mergeEnrichment(merged[slug], data);
    }
  }

  // tierAExtra8Final: single FAQ per slug
  const extra8Match = source.match(/const tierAExtra8Final[\s\S]*?= \{([\s\S]*?)\n\};/);
  if (extra8Match) {
    const block = extra8Match[1];
    const faqRe = /"?([a-z-]+)"?:\s*\{\s*\n\s*q:\s*"((?:\\.|[^"\\])*)"\s*,\s*\n\s*a:\s*"((?:\\.|[^"\\])*)"\s*,?\s*\n\s*\}/g;
    let fm;
    while ((fm = faqRe.exec(block)) !== null) {
      const slug = fm[1];
      if (!merged[slug]) merged[slug] = { sectionParagraphs: [], faqTexts: [], faqCount: 0 };
      merged[slug].faqTexts.push(unescapeTsString(fm[2]), unescapeTsString(fm[3]));
      merged[slug].faqCount = countFaqsFromTexts(merged[slug].faqTexts);
    }
  }

  const extra11Match = source.match(/const tierAExtra11Faqs[\s\S]*?= \{([\s\S]*?)\n\};/);
  if (extra11Match) {
    const block = extra11Match[1];
    const faqRe = /"?([a-z-]+)"?:\s*\{\s*q:\s*"((?:\\.|[^"\\])*)"\s*,\s*a:\s*"((?:\\.|[^"\\])*)"\s*\}/g;
    let fm;
    while ((fm = faqRe.exec(block)) !== null) {
      const slug = fm[1];
      if (!merged[slug]) merged[slug] = { sectionParagraphs: [], faqTexts: [], faqCount: 0 };
      merged[slug].faqTexts.push(unescapeTsString(fm[2]), unescapeTsString(fm[3]));
      merged[slug].faqCount = countFaqsFromTexts(merged[slug].faqTexts);
    }
  }

  const extra11bMatch = source.match(/const tierAExtra11Faqs2[\s\S]*?= \{([\s\S]*?)\n\};/);
  if (extra11bMatch) {
    const block = extra11bMatch[1];
    const faqRe = /"?([a-z-]+)"?:\s*\{\s*q:\s*"((?:\\.|[^"\\])*)"\s*,\s*a:\s*"((?:\\.|[^"\\])*)"\s*\}/g;
    let fm;
    while ((fm = faqRe.exec(block)) !== null) {
      const slug = fm[1];
      if (!merged[slug]) merged[slug] = { sectionParagraphs: [], faqTexts: [], faqCount: 0 };
      merged[slug].faqTexts.push(unescapeTsString(fm[2]), unescapeTsString(fm[3]));
      merged[slug].faqCount = countFaqsFromTexts(merged[slug].faqTexts);
    }
  }

  const extra14Match = source.match(/const tierAExtra14Faqs[\s\S]*?= \[([\s\S]*?)\n\];/);
  if (extra14Match) {
    const block = extra14Match[1];
    const faqRe = /slug:\s*"([a-z-]+)"[\s\S]*?q:\s*"((?:\\.|[^"\\])*)"[\s\S]*?a:\s*"((?:\\.|[^"\\])*)"/g;
    let fm;
    while ((fm = faqRe.exec(block)) !== null) {
      const slug = fm[1];
      if (!merged[slug]) merged[slug] = { sectionParagraphs: [], faqTexts: [], faqCount: 0 };
      merged[slug].faqTexts.push(unescapeTsString(fm[2]), unescapeTsString(fm[3]));
      merged[slug].faqCount = countFaqsFromTexts(merged[slug].faqTexts);
    }
  }

  return merged;
}

export function parseGuideDepthSections(source) {
  const startIdx = source.indexOf("guideDepthSections2");
  if (startIdx === -1) return {};
  const brace = source.indexOf("{", startIdx);
  const endIdx = source.indexOf("\n};", brace);
  const slice = source.slice(brace, endIdx === -1 ? undefined : endIdx + 3);
  const result = {};
  const keyRe = /\n  "?([a-z-]+)"?:\s*\[/g;
  const keys = [];
  let km;
  while ((km = keyRe.exec(slice)) !== null) {
    keys.push({ slug: km[1], start: km.index });
  }
  for (let i = 0; i < keys.length; i++) {
    const { slug, start: s } = keys[i];
    const end = keys[i + 1]?.start ?? slice.length;
    const block = slice.slice(s, end);
    result[slug] = extractParagraphsFromSections(block);
  }
  return result;
}

/** @deprecated use parseMergedAreaEnrichments */
export function parseAreaEnrichments(source) {
  return parseMergedAreaEnrichments(source);
}

export function comboOpeningParagraph(area, treatment, extras) {
  const extraKey = `${area.slug}|${treatment.slug}`;
  if (extras[extraKey]) return extras[extraKey];
  return pick(extraKey, [
    `${treatment.name} ranks among top bookings for guests travelling from ${area.name}. ${area.commute} Marcus Garvey Rd suites keep ${treatment.shortName.toLowerCase()} private and unhurried.`,
    `Guests from ${area.name} choose ${treatment.name} at Kilimani Hot Massage when mall spas feel loud—${area.commute}`,
    `${area.name} visitors book ${treatment.shortName} on Marcus Garvey Rd for ${treatment.tagline.toLowerCase().replace(/\.$/, "")}. ${area.commute}`,
  ]);
}
