/** Canonical keyword map — docs + scripts/check-keywords.mjs */

export type KeywordTier = "head" | "modality" | "near-me";

export type TargetKeyword = {
  phrase: string;
  primaryPath: string;
  tier: KeywordTier;
  /** Treatment slug when tier is modality */
  treatmentSlug?: string;
};

export const targetKeywords: TargetKeyword[] = [
  // Head terms
  { phrase: "Massage spa Kilimani", primaryPath: "/", tier: "head" },
  { phrase: "Massage Kilimani", primaryPath: "/", tier: "head" },
  { phrase: "Kilimani massage", primaryPath: "/", tier: "head" },
  { phrase: "Spa Kilimani", primaryPath: "/", tier: "head" },
  { phrase: "Spa near me", primaryPath: "/", tier: "head" },
  { phrase: "Massage spa near me", primaryPath: "/", tier: "head" },
  { phrase: "Masseuse near me", primaryPath: "/masseuses/", tier: "head" },
  { phrase: "Massage rooms near me", primaryPath: "/", tier: "head" },
  { phrase: "Massage near me", primaryPath: "/", tier: "near-me" },
  // Modality — all 12 treatment services
  {
    phrase: "Swedish Massage Kilimani",
    primaryPath: "/massage-treatments/swedish-massage/",
    tier: "modality",
    treatmentSlug: "swedish-massage",
  },
  {
    phrase: "Deep Tissue Massage Kilimani",
    primaryPath: "/massage-treatments/deep-tissue-massage/",
    tier: "modality",
    treatmentSlug: "deep-tissue-massage",
  },
  {
    phrase: "Full Body Massage Kilimani",
    primaryPath: "/massage-treatments/full-body-massage/",
    tier: "modality",
    treatmentSlug: "full-body-massage",
  },
  {
    phrase: "Nuru Massage Kilimani",
    primaryPath: "/massage-treatments/nuru-massage/",
    tier: "modality",
    treatmentSlug: "nuru-massage",
  },
  {
    phrase: "Body to Body Massage Kilimani",
    primaryPath: "/massage-treatments/body-to-body-massage/",
    tier: "modality",
    treatmentSlug: "body-to-body-massage",
  },
  {
    phrase: "Four Hands Massage Kilimani",
    primaryPath: "/massage-treatments/four-hands-massage/",
    tier: "modality",
    treatmentSlug: "four-hands-massage",
  },
  {
    phrase: "Erotic Massage Kilimani",
    primaryPath: "/massage-treatments/sensual-erotic-massage/",
    tier: "modality",
    treatmentSlug: "sensual-erotic-massage",
  },
  {
    phrase: "Couples Massage Kilimani",
    primaryPath: "/massage-treatments/couples-massage/",
    tier: "modality",
    treatmentSlug: "couples-massage",
  },
  {
    phrase: "Aromatherapy Massage Kilimani",
    primaryPath: "/massage-treatments/aromatherapy-massage/",
    tier: "modality",
    treatmentSlug: "aromatherapy-massage",
  },
  {
    phrase: "Hot Stone Massage Kilimani",
    primaryPath: "/massage-treatments/hot-stone-massage/",
    tier: "modality",
    treatmentSlug: "hot-stone-massage",
  },
  {
    phrase: "Tantric Massage Kilimani",
    primaryPath: "/massage-treatments/tantric-ritual/",
    tier: "modality",
    treatmentSlug: "tantric-ritual",
  },
  {
    phrase: "Lingam Massage Nairobi",
    primaryPath: "/massage-treatments/lingam-massage/",
    tier: "modality",
    treatmentSlug: "lingam-massage",
  },
  {
    phrase: "Massage and Extras near me",
    primaryPath: "/guides/massage-and-extras-kilimani/",
    tier: "head",
  },
];

export const ALL_TREATMENT_SLUGS = [
  "swedish-massage",
  "deep-tissue-massage",
  "full-body-massage",
  "nuru-massage",
  "body-to-body-massage",
  "four-hands-massage",
  "sensual-erotic-massage",
  "couples-massage",
  "aromatherapy-massage",
  "hot-stone-massage",
  "tantric-ritual",
  "lingam-massage",
] as const;

export type TreatmentSlug = (typeof ALL_TREATMENT_SLUGS)[number];

/** Modality keyword lead only (no near me / location) — all 12 services. */
export const treatmentKeywordLead: Record<TreatmentSlug, string> = {
  "swedish-massage": "Swedish Massage",
  "deep-tissue-massage": "Deep Tissue Massage",
  "full-body-massage": "Full Body Massage",
  "nuru-massage": "Nuru Massage",
  "body-to-body-massage": "Body to Body Massage",
  "four-hands-massage": "Four Hands Massage",
  "sensual-erotic-massage": "Erotic Massage",
  "couples-massage": "Couples Massage",
  "aromatherapy-massage": "Aromatherapy Massage",
  "hot-stone-massage": "Hot Stone Massage",
  "tantric-ritual": "Tantric Massage",
  "lingam-massage": "Lingam Massage",
};

/** Short keyword phrase — tests and keyword guards. */
export function treatmentTitleForArea(
  slug: string,
  areaName: string,
  fallbackName: string
): string {
  const lead = treatmentKeywordLead[slug as TreatmentSlug] ?? fallbackName;
  return `${lead} near me ${areaName}`;
}

/** Prof hybrid — keyword lead + Marcus Garvey / open 24/7 tail (before ` | Brand`). */
export function profTreatmentTitleForArea(
  slug: string,
  areaName: string,
  fallbackName: string
): string {
  const lead = treatmentKeywordLead[slug as TreatmentSlug] ?? fallbackName;
  if (areaName === "Kilimani") {
    return `${lead} near me Kilimani - book ${lead} on Marcus Garvey Rd massage spa - open 24/7`;
  }
  return `${lead} near me ${areaName} - from ${areaName} to Marcus Garvey Rd Kilimani - open 24/7`;
}

export const PROF_GUIDE_TAIL = "Marcus Garvey Rd Kilimani open 24/7";

/** Guide keyword phrase + Prof tail (before ` | Brand`). */
export function profGuideTitlePhrase(phrase: string): string {
  return `${phrase} - ${PROF_GUIDE_TAIL}`;
}

/** Guide slugs → keyword-led title phrase */
export const guideTitlePhrase: Record<string, string> = {
  "massage-and-extras-kilimani": "Massage and Extras near me Kilimani",
  "choosing-a-masseuse-in-kilimani": "Masseuse near me Kilimani",
  "nuru-massage-guide-kilimani": "Nuru Massage near me Kilimani",
  "massage-near-yaya-centre-marcus-garvey": "Massage spa near me Kilimani",
  "how-to-book-24-7-spa-kilimani": "Massage spa near me Kilimani open 24/7",
};
