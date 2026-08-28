/** Local media pack — geotagged WebP under public/images/ (Kilimani GPS -1.293566, 36.76345). */
export const media = {
  og: {
    src: "/images/og-kilimani-hot-massage.webp",
    alt: "Kilimani Hot Massage Spa on Marcus Garvey Rd, Kilimani Nairobi",
  },
  hero: {
    src: "/images/hero-marcus-garvey-kilimani-spa.webp",
    alt: "Private massage spa atmosphere near Marcus Garvey Rd, Kilimani",
  },
  masseuseAmbiance: {
    src: "/images/masseuse-portrait-ambiance-kilimani.webp",
    alt: "Calm therapist suite ambiance at Kilimani Hot Massage",
  },
} as const;

const treatmentImages: Record<string, { src: string; alt: string }> = {
  "swedish-massage": {
    src: "/images/swedish-massage-kilimani-suite.webp",
    alt: "Swedish massage suite at Kilimani Hot Massage, Marcus Garvey Rd",
  },
  "deep-tissue-massage": {
    src: "/images/deep-tissue-massage-nairobi.webp",
    alt: "Deep tissue massage setting in Kilimani, Nairobi",
  },
  "nuru-massage": {
    src: "/images/nuru-massage-private-suite-kilimani.webp",
    alt: "Private Nuru massage suite in Kilimani",
  },
  "hot-stone-massage": {
    src: "/images/hot-stone-massage-kilimani.webp",
    alt: "Hot stone massage ambiance at Kilimani Hot Massage",
  },
  "full-body-massage": {
    src: "/images/swedish-massage-kilimani-suite.webp",
    alt: "Full body massage suite at Kilimani Hot Massage, Marcus Garvey Rd",
  },
  "couples-massage": {
    src: "/images/couples-massage-kilimani-spa.webp",
    alt: "Couples massage room preparation in Kilimani spa",
  },
};

export function treatmentImage(slug: string) {
  return (
    treatmentImages[slug] ?? {
      src: media.hero.src,
      alt: `Massage treatment at Kilimani Hot Massage near Marcus Garvey Rd`,
    }
  );
}
