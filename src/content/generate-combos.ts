import { areas, type Area } from "@/content/areas";
import { treatments, type Treatment } from "@/content/treatments";
import { masseuses, type Masseuse } from "@/content/masseuses";
import { site } from "@/content/site";

export type FaqItem = { q: string; a: string };

export type AreaServiceCombo = {
  area: Area;
  treatment: Treatment;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  paragraphs: string[];
  faqs: FaqItem[];
};

export type AreaMasseuseCombo = {
  area: Area;
  masseuse: Masseuse;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  paragraphs: string[];
  faqs: FaqItem[];
};

/** Hand-tuned opening paragraphs for high-value Tier A area×service pairs. */
const serviceComboExtras: Record<string, string> = {
  "kilimani|swedish-massage":
    "Swedish massage is the default first booking for Kilimani locals on Marcus Garvey Rd—quiet arrival, warm oil, and a full-body reset before heading back toward Yaya Centre or Adlife Plaza.",
  "kilimani|deep-tissue-massage":
    "From Kilimani apartments and offices, deep tissue on Marcus Garvey Rd is the after-hours answer to laptop shoulders and commute grip along Ring Rd Kilimani.",
  "kilimani|nuru-massage":
    "Nuru sessions in Kilimani stay suite-locked and discreet—gel-led body glide for adults who want privacy steps from Marcus Garvey Rd, not a hotel spa corridor.",
  "lavington|swedish-massage":
    "Lavington guests often book Swedish after errands near Valley Arcade—a short hop to our Kilimani studio on Marcus Garvey Rd for classic strokes when the day finally ends.",
  "lavington|deep-tissue-massage":
    "Deep tissue is a top rebook from Lavington commuters carrying desk tension; we warm tissue first on Marcus Garvey Rd before working traps and lumbar.",
  "westlands|swedish-massage":
    "Westlands professionals crossing toward Kilimani choose Swedish when they want full-body ease without another crowded mall spa waitlist.",
  "westlands|deep-tissue-massage":
    "After Waiyaki Way traffic, Westlands guests ask for deep tissue focused on neck, hips, and lower back—then drive home softer.",
  "kileleshwa|swedish-massage":
    "Kileleshwa is minutes from Marcus Garvey Rd; Swedish massage here is the neighbourhood reset for quiet evenings and early starts.",
  "karen|couples-massage":
    "Karen couples planning a shared evening often drive in for side-by-side tables—mention anniversary or hotel stay when you WhatsApp so we prep the room.",
  "upper-hill|deep-tissue-massage":
    "Upper Hill desk days and conference weeks end best with deep tissue in Kilimani—pressure that targets the exact zones long sitting creates.",
  "cbd-nairobi|swedish-massage":
    "CBD guests leaving Tom Mboya, Kenyatta Avenue, or hotel stays book Swedish for a full unwind before returning east or west across town.",
  "parklands-highridge|aromatherapy-massage":
    "Parklands and Highridge guests favour aromatherapy when scent-led calm beats another loud night out—unscented oil always available on request.",
};

function neighborsLine(area: Area): string {
  const n = area.neighboringAreas?.slice(0, 3) ?? [];
  if (!n.length) {
    return `Guests also arrive from neighbouring parts of ${area.constituencyName}.`;
  }
  const labels = n.map((slug) =>
    slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  );
  return `Neighbours in ${labels.join(", ")} use the same Marcus Garvey Rd studio.`;
}

function buildServiceParagraphs(area: Area, treatment: Treatment): string[] {
  const landmark = area.landmarks[0] ?? area.name;
  const landmark2 = area.landmarks[1] ?? landmark;
  const road = area.roads[0] ?? "Marcus Garvey Rd";
  const road2 = area.roads[1] ?? road;
  const extraKey = `${area.slug}|${treatment.slug}`;
  const opening =
    serviceComboExtras[extraKey] ??
    `${treatment.name} is one of the most requested treatments for guests travelling from ${area.name}. ${area.commute} Our private suites on Marcus Garvey Rd keep the experience discreet and unhurried.`;

  return [
    opening,
    area.intro,
    `Near ${landmark} and ${landmark2}, and along ${road} and ${road2}, visitors choose Kilimani Hot Massage when they want ${treatment.shortName.toLowerCase()} work without hotel-spa crowds. ${treatment.summary}`,
    `${neighborsLine(area)} Whether you live locally or are staying overnight near ${landmark}, the booking path is the same: call or WhatsApp ${site.phoneDisplay}, name ${treatment.name}, and tell us you are coming from ${area.name}.`,
    `Nairobi-specific pressure shows up differently by neighbourhood. From ${area.name}, guests often mention traffic grip along ${road}, desk hours, gym DOMS, or hotel jet lag. ${treatment.name} addresses those patterns with clear pressure checks and private-suite pacing—open 24/7 so late arrivals still get a full session.`,
    `Session flow is simple: arrive on Marcus Garvey Rd, settle in a locked suite, and let your therapist tailor ${treatment.shortName.toLowerCase()} to the zones you flag. Aftercare is hydration, easy movement, and a quiet exit—no lobby performance.`,
    `Explore the full ${treatment.name} guide on our treatments page, browse masseuses who specialise in this modality, or return to the ${area.name} hub for every service and therapist we list for your area.`,
    `WhatsApp ${site.phoneDisplay} to reserve ${treatment.name} and mention you are coming from ${area.name}—we will have the room ready. ${site.napFooter}`,
  ];
}

function buildServiceFaqs(area: Area, treatment: Treatment): FaqItem[] {
  const landmark = area.landmarks[0] ?? area.name;
  const road = area.roads[0] ?? "Marcus Garvey Rd";
  return [
    {
      q: `How do I book ${treatment.name} from ${area.name}?`,
      a: `WhatsApp or call ${site.phoneDisplay}. Say you are coming from ${area.name}, name ${treatment.name}, and share your preferred time—we confirm availability for our 24/7 Kilimani studio.`,
    },
    {
      q: `How long is the drive from ${area.name} to Kilimani Hot Massage?`,
      a: area.commute,
    },
    {
      q: `Is ${treatment.name} available overnight for ${area.name} guests?`,
      a: `Yes. We are open 24 hours. Late sessions after work near ${landmark} or along ${road} are common—book ahead on busy weekend nights.`,
    },
    {
      q: `Where exactly is the spa relative to ${area.name}?`,
      a: `We are on Marcus Garvey Rd, Kilimani, Nairobi. Guests from ${area.name} typically navigate via ${road}. Exact pin: ${site.mapsShort}`,
    },
    {
      q: `Can I request a specific masseuse for ${treatment.shortName} from ${area.name}?`,
      a: `Yes—name your preferred therapist when you WhatsApp. If she is unavailable, we suggest another specialist for ${treatment.name}.`,
    },
    {
      q: `What should I bring for a session from ${area.name}?`,
      a: `Just yourself. Arrive a few minutes early if traffic from ${area.name} is unpredictable. Shower facilities and private suites are on site.`,
    },
  ];
}

function buildMasseuseParagraphs(area: Area, masseuse: Masseuse): string[] {
  const landmark = area.landmarks[0] ?? area.name;
  const landmark2 = area.landmarks[1] ?? landmark;
  const road = area.roads[0] ?? "Marcus Garvey Rd";
  const specs = masseuse.specialties.map((s) => s.replace(/-/g, " ")).join(", ");

  return [
    `${masseuse.name} welcomes guests from ${area.name} at our Marcus Garvey Rd studio. ${area.commute}`,
    masseuse.shortBio,
    `${area.intro}`,
    `Whether you are near ${landmark} or ${landmark2}, or driving in along ${road} from further across ${area.constituencyName}, ask for ${masseuse.name} by name on WhatsApp so we can confirm her availability.`,
    `Specialties include ${specs}. ${masseuse.tagline} Sessions run any hour—we are open 24/7 for ${area.name} visitors who finish late or prefer early quiet.`,
    `${neighborsLine(area)} Guests often combine a visit after dinner near ${landmark} or before flights and meetings the next morning.`,
    `Read ${masseuse.name}'s full profile for bio and FAQs, or open the ${area.name} hub to book her with a specific treatment. WhatsApp ${site.phoneDisplay} and mention ${area.name}.`,
  ];
}

function buildMasseuseFaqs(area: Area, masseuse: Masseuse): FaqItem[] {
  return [
    {
      q: `How do I book ${masseuse.name} from ${area.name}?`,
      a: `WhatsApp ${site.phoneDisplay} with her name, your preferred treatment, and that you are coming from ${area.name}. We confirm if she is free.`,
    },
    {
      q: `Does ${masseuse.name} work overnight for ${area.name} guests?`,
      a: `Our studio is open 24/7. Therapist schedules rotate—ask early for late-night slots from ${area.name}.`,
    },
    {
      q: `What treatments does ${masseuse.name} offer for visitors from ${area.name}?`,
      a: `Her specialties include ${masseuse.specialties
        .map((s) => s.replace(/-/g, " "))
        .join(", ")}. Name the modality when you book.`,
    },
    {
      q: `How do I reach the spa from ${area.name} to see ${masseuse.name}?`,
      a: area.commute,
    },
  ];
}

export function buildAreaServiceCombo(
  areaSlug: string,
  serviceSlug: string
): AreaServiceCombo | null {
  const area = areas.find((a) => a.slug === areaSlug);
  const treatment = treatments.find((t) => t.slug === serviceSlug);
  if (!area || !treatment) return null;

  const paragraphs = buildServiceParagraphs(area, treatment);
  const faqs = area.tier === "A" ? buildServiceFaqs(area, treatment) : [];

  return {
    area,
    treatment,
    metaTitle: `${treatment.name} in ${area.name} | ${site.name}`,
    metaDescription: `Book ${treatment.name} for guests in ${area.name}. Studio on Marcus Garvey Rd, Kilimani. Open 24/7. Call ${site.phoneDisplay}.`,
    h1: `${treatment.name} for ${area.name}`,
    paragraphs,
    faqs,
  };
}

export function buildAreaMasseuseCombo(
  areaSlug: string,
  masseuseSlug: string
): AreaMasseuseCombo | null {
  const area = areas.find((a) => a.slug === areaSlug);
  const masseuse = masseuses.find((m) => m.slug === masseuseSlug);
  if (!area || !masseuse) return null;

  const paragraphs = buildMasseuseParagraphs(area, masseuse);
  const faqs = area.tier === "A" ? buildMasseuseFaqs(area, masseuse) : [];

  return {
    area,
    masseuse,
    metaTitle: `Book ${masseuse.name} in ${area.name} | ${site.name}`,
    metaDescription: `Request ${masseuse.name} when visiting from ${area.name}. ${masseuse.tagline} Open 24/7 in Kilimani. WhatsApp ${site.phoneDisplay}.`,
    h1: `Book ${masseuse.name} — serving ${area.name}`,
    paragraphs,
    faqs,
  };
}

export function allAreaServiceParams() {
  const params: { area: string; service: string }[] = [];
  for (const area of areas) {
    for (const t of treatments) {
      params.push({ area: area.slug, service: t.slug });
    }
  }
  return params;
}

export function allAreaMasseuseParams() {
  const params: { area: string; masseuse: string }[] = [];
  for (const area of areas) {
    for (const m of masseuses) {
      params.push({ area: area.slug, masseuse: m.slug });
    }
  }
  return params;
}
