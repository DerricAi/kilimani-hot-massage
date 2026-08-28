import { areas, type Area } from "@/content/areas";
import { treatments, type Treatment } from "@/content/treatments";
import { masseuses, type Masseuse } from "@/content/masseuses";
import { site } from "@/content/site";
import { TIER_A_SLUGS } from "@/content/areas";
import {
  profTitleMasseuseCombo,
  profTitleServiceComboKeyed,
} from "@/lib/seo-titles";

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

const TOP_SERVICES = [
  "swedish-massage",
  "deep-tissue-massage",
  "nuru-massage",
  "couples-massage",
] as const;

/** Hand-tuned opening paragraphs for high-value Tier A area×service pairs. */
const serviceComboExtras: Record<string, string> = {
  "kilimani|swedish-massage":
    "Swedish massage is the default first booking for Kilimani locals on Marcus Garvey Rd—quiet arrival, warm oil, and a full-body reset before heading back toward Yaya Centre or Adlife Plaza.",
  "kilimani|deep-tissue-massage":
    "From Kilimani apartments and offices, deep tissue on Marcus Garvey Rd is the after-hours answer to laptop shoulders and commute grip along Ring Rd Kilimani.",
  "kilimani|nuru-massage":
    "Nuru sessions in Kilimani stay suite-locked and discreet—gel-led body glide for adults who want privacy steps from Marcus Garvey Rd, not a hotel spa corridor.",
  "kilimani|body-to-body-massage":
    "Body to Body Massage Kilimani bookings peak from Wood Avenue and Yaya Centre—locked suites on Marcus Garvey Rd with consent checkpoints before gel or oil work begins.",
  "kilimani|sensual-erotic-massage":
    "Erotic Massage Kilimani guests choose Marcus Garvey Rd for adult-paced touch with spa hygiene—Aisha handles many requests; boundaries confirmed on WhatsApp first.",
  "kilimani|lingam-massage":
    "Lingam Massage Nairobi searches from Kilimani land here—male-focused wellness in a private suite minutes from Yaya Centre, open 24/7.",
  "kilimani|full-body-massage":
    "Full Body Massage Kilimani is the umbrella menu entry for head-to-toe oil work—Swedish flow with pressure you choose, five minutes from Ring Rd Kilimani gyms.",
  "kilimani|couples-massage":
    "Kilimani couples book side-by-side tables after Wood Avenue dinners—Zuri stages shared suites five minutes from Yaya Centre.",
  "lavington|swedish-massage":
    "Lavington guests often book Swedish after errands near Valley Arcade—a short hop to our Kilimani studio on Marcus Garvey Rd for classic strokes when the day finally ends.",
  "lavington|deep-tissue-massage":
    "Deep tissue is a top rebook from Lavington commuters carrying desk tension; we warm tissue first on Marcus Garvey Rd before working traps and lumbar.",
  "lavington|nuru-massage":
    "Lavington professionals request discreet Nuru on Marcus Garvey Rd when hotel corridors feel too visible—Aisha and Nuri handle most bookings.",
  "lavington|couples-massage":
    "Lavington date nights often end with couples massage in Kilimani—drive from James Gichuru after babysitter handoff.",
  "westlands|swedish-massage":
    "Westlands professionals crossing toward Kilimani choose Swedish when they want full-body ease without another crowded mall spa waitlist.",
  "westlands|deep-tissue-massage":
    "After Waiyaki Way traffic, Westlands guests ask for deep tissue focused on neck, hips, and lower back—then drive home softer.",
  "westlands|nuru-massage":
    "Westlands hotel guests book Nuru on Marcus Garvey Rd for suite privacy away from lobby elevators.",
  "westlands|couples-massage":
    "Westlands couples skip mall spas for twin-table calm on Marcus Garvey Rd—message before leaving Sarit or Westgate.",
  "kileleshwa|swedish-massage":
    "Kileleshwa is minutes from Marcus Garvey Rd; Swedish massage here is the neighbourhood reset for quiet evenings and early starts.",
  "kileleshwa|deep-tissue-massage":
    "Kileleshwa desk workers book deep tissue after Mandera Rd commutes—trap focus without crossing town twice.",
  "kileleshwa|nuru-massage":
    "Kileleshwa guests who want adult privacy choose Nuru on Marcus Garvey Rd—discreet pin, locked suite.",
  "kileleshwa|couples-massage":
    "Kileleshwa couples coordinate babysitters then book side-by-side tables on Marcus Garvey Rd.",
  "karen|couples-massage":
    "Karen couples planning a shared evening often drive in for side-by-side tables—mention anniversary or hotel stay when you WhatsApp so we prep the room.",
  "karen|swedish-massage":
    "Karen weekend drivers book Swedish in Kilimani after Ngong Rd errands—unhurried reset before Sunday traffic home.",
  "karen|deep-tissue-massage":
    "Karen gym regulars target IT bands and lumbar on Marcus Garvey Rd after long Ngong Rd drives.",
  "karen|nuru-massage":
    "Karen guests wanting discreet adult sessions book Nuru on Marcus Garvey Rd—WhatsApp before you leave Langata.",
  "upper-hill|deep-tissue-massage":
    "Upper Hill desk days and conference weeks end best with deep tissue in Kilimani—pressure that targets the exact zones long sitting creates.",
  "upper-hill|swedish-massage":
    "Upper Hill bankers book Swedish after tower deadlines—Marcus Garvey Rd is the quiet offsite.",
  "upper-hill|nuru-massage":
    "Upper Hill executives request discreet Nuru on Marcus Garvey Rd after late deal nights.",
  "upper-hill|couples-massage":
    "Upper Hill couples book twin tables when Haile Selassie traffic finally clears toward Kilimani.",
  "cbd-nairobi|swedish-massage":
    "CBD guests leaving Tom Mboya, Kenyatta Avenue, or hotel stays book Swedish for a full unwind before returning east or west across town.",
  "cbd-nairobi|deep-tissue-massage":
    "CBD office workers escape west to Marcus Garvey Rd for trap and lumbar deep tissue—open past midnight.",
  "cbd-nairobi|nuru-massage":
    "CBD visitors book Nuru in Kilimani when hotel spas feel too public—locked suite on Marcus Garvey Rd.",
  "cbd-nairobi|couples-massage":
    "CBD couples celebrate with side-by-side massage in Kilimani—book before dinner reservations fill.",
  "parklands-highridge|aromatherapy-massage":
    "Parklands and Highridge guests favour aromatherapy when scent-led calm beats another loud night out—unscented oil always available on request.",
  "parklands-highridge|swedish-massage":
    "Parklands guests cross Limuru connectors for Swedish calm on Marcus Garvey Rd after Forest Rd noise.",
  "parklands-highridge|deep-tissue-massage":
    "Highridge flats residents book deep tissue after desk neck—James Gichuru link to Kilimani is short off-peak.",
  "parklands-highridge|couples-massage":
    "Parklands couples book twin tables on Marcus Garvey Rd for anniversaries away from mall corridors.",
  "hurlingham|swedish-massage":
    "Hurlingham guests pass Yaya Centre for Swedish resets on Marcus Garvey Rd—five-minute hop when junctions move.",
  "hurlingham|deep-tissue-massage":
    "Hurlingham desk tension meets deep tissue on Marcus Garvey Rd after State House Rd commutes.",
  "hurlingham|couples-massage":
    "Hurlingham date nights extend to couples massage in Kilimani—message when you leave dinner.",
  "hurlingham|nuru-massage":
    "Hurlingham professionals book discreet Nuru on Marcus Garvey Rd with WhatsApp intake first.",
  "riverside|swedish-massage":
    "Riverside corporate guests book Swedish on Marcus Garvey Rd after Riverside Drive meetings.",
  "riverside|deep-tissue-massage":
    "Riverside executives target trap release on Marcus Garvey Rd—chauffeurs know the Kilimani pin.",
  "riverside|couples-massage":
    "Riverside couples book side-by-side tables for quiet celebration in Kilimani suites.",
  "riverside|nuru-massage":
    "Riverside guests wanting privacy book Nuru on Marcus Garvey Rd—not hotel lobby visibility.",
  "spring-valley|swedish-massage":
    "Spring Valley diplomatic households book Swedish on Marcus Garvey Rd after gate delays clear.",
  "spring-valley|deep-tissue-massage":
    "Spring Valley runners book deep tissue for legs and hips on Marcus Garvey Rd post-training.",
  "spring-valley|couples-massage":
    "Spring Valley couples drive eight minutes to twin-table calm on Marcus Garvey Rd.",
  "spring-valley|nuru-massage":
    "Spring Valley guests request discreet Nuru sessions in Kilimani—consent confirmed on WhatsApp.",
  "langata|swedish-massage":
    "Langata drivers book Swedish in Kilimani after Wilson Airport or mall errands on Ngong Rd.",
  "langata|deep-tissue-massage":
    "Langata gym-goers book deep tissue on Marcus Garvey Rd before Sunday traffic toward Karen.",
  "langata|couples-massage":
    "Langata couples plan anniversary massage in Kilimani—side-by-side tables, matched timing.",
  "langata|nuru-massage":
    "Langata guests wanting adult privacy book Nuru on Marcus Garvey Rd with locked-suite entry.",
  "kitisuru|swedish-massage":
    "Kitisuru residents shop Peponi then unwind with Swedish on Marcus Garvey Rd.",
  "kitisuru|deep-tissue-massage":
    "Kitisuru embassy-adjacent guests book deep tissue after long seated dinners and drives.",
  "kitisuru|couples-massage":
    "Kitisuru couples book twin suites on Marcus Garvey Rd for quiet celebration nights.",
  "kitisuru|nuru-massage":
    "Kitisuru professionals book discreet Nuru in Kilimani when privacy outweighs convenience.",
  "kabiro|swedish-massage":
    "Kabiro hillside guests descend to Swedish calm on Marcus Garvey Rd after Kawangware fringe days.",
  "kabiro|deep-tissue-massage":
    "Kabiro commuters book deep tissue after Ngong Rd matatu legs and market carrying.",
  "kabiro|couples-massage":
    "Kabiro couples treat anniversaries with couples massage in Kilimani—book ahead weekends.",
  "kabiro|nuru-massage":
    "Kabiro guests wanting adult sessions book Nuru on Marcus Garvey Rd with clear WhatsApp intake.",
  "starehe|swedish-massage":
    "Starehe workers cross west for Swedish on Marcus Garvey Rd after Juja Rd shifts.",
  "starehe|deep-tissue-massage":
    "Starehe nurses and guards book deep tissue on Marcus Garvey Rd after long standing shifts.",
  "starehe|couples-massage":
    "Starehe couples plan rare date nights with twin-table massage in Kilimani.",
  "starehe|nuru-massage":
    "Starehe guests book discreet Nuru on Marcus Garvey Rd when privacy matters.",
  "nairobi-central|swedish-massage":
    "Nairobi Central hotel guests book Swedish in Kilimani for full-body calm away from CBD noise.",
  "nairobi-central|deep-tissue-massage":
    "Central Nairobi desk workers escape to Marcus Garvey Rd deep tissue after tower weeks.",
  "nairobi-central|couples-massage":
    "Central couples book side-by-side tables on Marcus Garvey Rd before late dinners.",
  "nairobi-central|nuru-massage":
    "Central visitors book Nuru in Kilimani suites—discreet WhatsApp booking first.",
  "dagoretti-north|swedish-massage":
    "Dagoretti North wards share one Marcus Garvey Rd studio—Swedish is the constituency default reset.",
  "dagoretti-north|deep-tissue-massage":
    "From Adams Arcade to Kilimani Green, deep tissue on Marcus Garvey Rd targets commute tension.",
  "dagoretti-north|couples-massage":
    "Dagoretti North couples meet neutral ground on Marcus Garvey Rd for twin-table evenings.",
  "dagoretti-north|nuru-massage":
    "Dagoretti North guests book discreet Nuru on Marcus Garvey Rd with consent-led intake.",
  "woodley-kenyatta-golf-course|swedish-massage":
    "Woodley golfers book Swedish on Marcus Garvey Rd after Kenyatta Golf rounds.",
  "woodley-kenyatta-golf-course|deep-tissue-massage":
    "Woodley players target legs and back deep tissue on Marcus Garvey Rd post-tournament.",
  "woodley-kenyatta-golf-course|couples-massage":
    "Woodley couples book twin tables in Kilimani after club dinners.",
  "woodley-kenyatta-golf-course|nuru-massage":
    "Woodley guests wanting privacy book Nuru on Marcus Garvey Rd—WhatsApp before travel.",
};

/** Hand-tuned openings for Tier A area×masseuse pairs. */
const masseuseComboExtras: Record<string, string> = {
  "kilimani|amara":
    "Kilimani guests request Amara for Swedish and deep tissue after Yaya Centre errands—steady pressure on Marcus Garvey Rd without chatter.",
  "kilimani|zuri":
    "Zuri stages aromatherapy and couples rooms for Kilimani date nights—scent-light suites on Marcus Garvey Rd.",
  "kilimani|aisha":
    "Aisha handles discreet Nuru requests from Kilimani towers—consent confirmed before gel prep on Marcus Garvey Rd.",
  "kilimani|nuri":
    "Nuri leads tantric and lingam sessions for Kilimani professionals who want breath-led pacing on Marcus Garvey Rd.",
  "kilimani|keisha":
    "Keisha is the Kilimani go-to for firm deep tissue after Ring Rd gym days and Ngong Rd commutes.",
  "kilimani|lina":
    "Lina pairs with Zuri for four-hands immersion—popular Kilimani anniversary bookings on Marcus Garvey Rd.",
  "lavington|amara":
    "Lavington regulars ask for Amara by name—short James Gichuru hop to Marcus Garvey Rd for trap and Swedish work.",
  "lavington|zuri":
    "Zuri synchronises couples tables for Lavington date nights ending on Marcus Garvey Rd.",
  "westlands|keisha":
    "Westlands gym crowd books Keisha for sports-leaning deep tissue after Waiyaki Way traffic.",
  "westlands|zuri":
    "Westlands couples request Zuri for aromatherapy evenings in Kilimani—away from mall noise.",
  "kileleshwa|amara":
    "Kileleshwa guests book Amara for quiet Swedish and deep tissue—Mandera Rd commute melts on Marcus Garvey Rd.",
  "upper-hill|keisha":
    "Upper Hill desk neck meets Keisha's firm deep tissue on Marcus Garvey Rd after tower deadlines.",
  "karen|zuri":
    "Karen couples driving from Ngong Rd request Zuri for side-by-side couples staging in Kilimani.",
  "cbd-nairobi|amara":
    "CBD guests escaping Tom Mboya chaos book Amara for Swedish calm on Marcus Garvey Rd.",
  "hurlingham|aisha":
    "Hurlingham guests wanting discreet adult work request Aisha for Nuru on Marcus Garvey Rd.",
};

function comboHash(key: string): number {
  let h = 0;
  for (let i = 0; i < key.length; i++) {
    h = (h * 31 + key.charCodeAt(i)) >>> 0;
  }
  return h;
}

function pick<T>(key: string, options: T[]): T {
  return options[comboHash(key) % options.length]!;
}

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

function pressureParagraph(area: Area, treatment: Treatment, key: string): string {
  const road = area.roads[0] ?? "Marcus Garvey Rd";
  const templates = [
    `From ${area.name}, ${treatment.shortName.toLowerCase()} guests often arrive with ${road} traffic tension, desk hours, or gym soreness. ${treatment.name} on Marcus Garvey Rd uses clear pressure checks—open 24/7 for late ${area.name} arrivals.`,
    `${area.name} commuters mention ${road} grip and laptop posture; ${treatment.name} maps those patterns in a locked Kilimani suite with unhurried pacing.`,
    `Whether you leave ${area.name} after shifts near ${area.landmarks[0] ?? area.name} or a long ${road} drive, ${treatment.shortName.toLowerCase()} at Kilimani Hot Massage targets the zones you flag on WhatsApp.`,
    `Nairobi rhythm in ${area.name} stacks meetings, matatus, and gym days—${treatment.name} on Marcus Garvey Rd is the deliberate counterweight with private-suite calm.`,
  ];
  return pick(key + "|pressure", templates);
}

function aftercareLine(treatment: Treatment, key: string): string {
  const templates = [
    `After ${treatment.shortName.toLowerCase()}, hydrate and take a quiet exit—many ${treatment.shortName.toLowerCase()} guests head toward Yaya Centre or straight home without mall detours.`,
    `Post-session: water, easy movement, and a calm ride from Marcus Garvey Rd—avoid stacking intense gym work immediately after deeper ${treatment.shortName.toLowerCase()} pressure.`,
    `${treatment.shortName} aftercare is simple on Marcus Garvey Rd: shower if you wish, rehydrate, and message us if you want the same therapist next visit.`,
    `Most guests leave Kilimani softer than they arrived—plan a low-noise hour after ${treatment.shortName.toLowerCase()} before diving back into Ngong Rd traffic.`,
  ];
  return pick(key + "|after", templates);
}

function bookingLine(area: Area, treatment: Treatment, landmark: string): string {
  return pick(`${area.slug}|${treatment.slug}|book`, [
    `${neighborsLine(area)} WhatsApp ${site.phoneDisplay} from ${area.name}, name ${treatment.name}, and mention ${landmark} as your starting landmark.`,
    `Locals near ${landmark} and visitors across ${area.constituencyName} book the same way: call ${site.phoneDisplay}, say ${area.name}, request ${treatment.shortName}.`,
    `Whether you live in ${area.name} or are staying near ${landmark}, Marcus Garvey Rd check-in stays discreet—message treatment and ETA on WhatsApp.`,
  ]);
}

function buildServiceParagraphs(area: Area, treatment: Treatment): string[] {
  const landmark = area.landmarks[0] ?? area.name;
  const landmark2 = area.landmarks[1] ?? landmark;
  const road = area.roads[0] ?? "Marcus Garvey Rd";
  const road2 = area.roads[1] ?? road;
  const extraKey = `${area.slug}|${treatment.slug}`;
  const opening =
    serviceComboExtras[extraKey] ??
    pick(extraKey, [
      `${treatment.name} ranks among top bookings for guests travelling from ${area.name}. ${area.commute} Marcus Garvey Rd suites keep ${treatment.shortName.toLowerCase()} private and unhurried.`,
      `Guests from ${area.name} choose ${treatment.name} at Kilimani Hot Massage when mall spas feel loud—${area.commute}`,
      `${area.name} visitors book ${treatment.shortName} on Marcus Garvey Rd for ${treatment.tagline.toLowerCase().replace(/\.$/, "")}. ${area.commute}`,
    ]);

  return [
    opening,
    area.intro,
    pick(extraKey + "|near", [
      `Near ${landmark} and ${landmark2} along ${road}, Kilimani Hot Massage delivers ${treatment.shortName.toLowerCase()} without hotel-lobby visibility. ${treatment.summary}`,
      `Drivers from ${area.name} merge toward ${road} and ${road2} for ${treatment.name} on Marcus Garvey Rd—${treatment.summary}`,
      `Starting from ${landmark}? ${treatment.name} sessions anchor on Marcus Garvey Rd with Adlife Plaza and Yaya Centre as familiar pins. ${treatment.summary}`,
    ]),
    bookingLine(area, treatment, landmark),
    pressureParagraph(area, treatment, extraKey),
    pick(extraKey + "|flow", [
      `Session flow: discreet check-in on Marcus Garvey Rd, locked suite, ${treatment.shortName.toLowerCase()} tailored to your zones, then quiet exit.`,
      `Arrive on Marcus Garvey Rd, confirm pressure and boundaries, enjoy ${treatment.shortName.toLowerCase()} in a private Kilimani suite—no lobby performance.`,
      `Your ${treatment.name} visit follows a simple arc: WhatsApp booking, Marcus Garvey Rd arrival, therapist-led ${treatment.shortName.toLowerCase()}, optional shower.`,
    ]),
    aftercareLine(treatment, extraKey),
    `Read the full ${treatment.name} guide, browse specialists, or return to the ${area.name} hub for every combo we list.`,
    `WhatsApp ${site.phoneDisplay} to reserve ${treatment.name} from ${area.name}. ${site.napFooter}`,
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
  const extraKey = `${area.slug}|${masseuse.slug}`;
  const opening =
    masseuseComboExtras[extraKey] ??
    pick(extraKey, [
      `${masseuse.name} welcomes ${area.name} guests at our Marcus Garvey Rd studio. ${area.commute}`,
      `From ${area.name}, ${masseuse.name} is a frequent request for ${specs}—${area.commute}`,
      `${area.name} visitors ask for ${masseuse.name} by name when booking ${specs} on Marcus Garvey Rd. ${area.commute}`,
    ]);

  return [
    opening,
    masseuse.shortBio,
    area.intro,
    pick(extraKey + "|reach", [
      `Near ${landmark} or ${landmark2}, message ${masseuse.name} on WhatsApp ${site.phoneDisplay} before you leave ${area.name}.`,
      `Driving from ${road} across ${area.constituencyName}? Name ${masseuse.name} when booking so we confirm her shift.`,
      `Whether you start at ${landmark} or deeper in ${area.name}, ${masseuse.name} sessions happen on Marcus Garvey Rd—pin sent on request.`,
    ]),
    `${masseuse.tagline} Specialties: ${specs}. Open 24/7 for ${area.name} guests finishing late or booking early quiet.`,
    pick(extraKey + "|combo", [
      `${neighborsLine(area)} Many combine dinner near ${landmark} with ${masseuse.name} afterward on Marcus Garvey Rd.`,
      `Guests from neighbouring wards share the same ${masseuse.name} booking line—mention ${area.name} for commute-aware holds.`,
      `${area.name} regulars rebook ${masseuse.name} monthly; first-timers should name specialties when messaging.`,
    ]),
    `Full profile: /masseuses/${masseuse.slug}/. Area hub: /areas/${area.slug}/. WhatsApp ${site.phoneDisplay} with ${masseuse.name} and ${area.name}.`,
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

// Pre-seed Tier A × top services if missing (fallback generator)
for (const slug of TIER_A_SLUGS) {
  for (const svc of TOP_SERVICES) {
    const k = `${slug}|${svc}`;
    if (!serviceComboExtras[k]) {
      const areaName = slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      serviceComboExtras[k] =
        `${areaName} guests book ${svc.replace(/-/g, " ")} on Marcus Garvey Rd—WhatsApp ${site.phoneDisplay} from ${areaName} with your ETA.`;
    }
  }
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
    metaTitle: profTitleServiceComboKeyed(treatment.slug, treatment.name, area.name),
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
    metaTitle: profTitleMasseuseCombo(masseuse.name, area.name),
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
