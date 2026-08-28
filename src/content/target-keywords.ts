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
