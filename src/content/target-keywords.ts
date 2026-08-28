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
  // Modality
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
    phrase: "Lingam Massage Nairobi",
    primaryPath: "/massage-treatments/lingam-massage/",
    tier: "modality",
    treatmentSlug: "lingam-massage",
  },
  {
    phrase: "Erotic Massage Kilimani",
    primaryPath: "/massage-treatments/sensual-erotic-massage/",
    tier: "modality",
    treatmentSlug: "sensual-erotic-massage",
  },
  {
    phrase: "Full Body Massage Kilimani",
    primaryPath: "/massage-treatments/full-body-massage/",
    tier: "modality",
    treatmentSlug: "full-body-massage",
  },
  {
    phrase: "Massage and Extras near me",
    primaryPath: "/guides/massage-and-extras-kilimani/",
    tier: "head",
  },
];

export const KEYED_TREATMENT_SLUGS = [
  "sensual-erotic-massage",
  "nuru-massage",
  "lingam-massage",
  "body-to-body-massage",
  "full-body-massage",
] as const;

export type KeyedTreatmentSlug = (typeof KEYED_TREATMENT_SLUGS)[number];

/**
 * Exact title phrase (before ` | Brand`) — priority keyword list, not generic
 * "Kilimani Nairobi near me".
 */
export const treatmentTitlePhrase: Record<KeyedTreatmentSlug, string> = {
  "sensual-erotic-massage": "Erotic Massage near me Kilimani",
  "nuru-massage": "Nuru Massage near me Kilimani",
  "lingam-massage": "Lingam Massage near me Nairobi",
  "body-to-body-massage": "Body to Body Massage near me Kilimani",
  "full-body-massage": "Full Body Massage near me Kilimani",
};

/** Guide slugs → keyword-led title phrase */
export const guideTitlePhrase: Record<string, string> = {
  "massage-and-extras-kilimani": "Massage and Extras near me Kilimani",
  "choosing-a-masseuse-in-kilimani": "Masseuse near me Kilimani",
  "nuru-massage-guide-kilimani": "Nuru Massage near me Kilimani",
  "massage-near-yaya-centre-marcus-garvey": "Massage spa near me Kilimani",
  "how-to-book-24-7-spa-kilimani": "Massage spa near me Kilimani open 24/7",
};
