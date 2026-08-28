import { site } from "@/content/site";
import type { KeyedTreatmentSlug } from "@/content/target-keywords";

/** Prof checklist 4.x — full title strings (use with metadata title.absolute). */
const BRAND = site.name;
const CITY = "Kilimani Nairobi";

const TREATMENT_TITLE_LEADS: Record<KeyedTreatmentSlug, string> = {
  "sensual-erotic-massage": "Erotic Massage",
  "nuru-massage": "Nuru Massage",
  "lingam-massage": "Lingam Massage",
  "body-to-body-massage": "Body to Body Massage",
  "full-body-massage": "Full Body Massage",
};

export function profTitleHome(): string {
  return `BEST Massage Spa Kilimani - Kilimani massage & spa near me - if you want massage spa near me, Swedish, Nuru, full body & couples on Marcus Garvey Rd - ${BRAND} open 24/7`;
}

export function profTitleTreatment(serviceName: string): string {
  return `${serviceName} ${CITY} near me | ${BRAND}`;
}

/** Per-slug exact keyword lead for treatment pages. */
export function profTitleTreatmentKeyed(slug: string, name: string): string {
  const lead = TREATMENT_TITLE_LEADS[slug as KeyedTreatmentSlug];
  if (lead) {
    if (slug === "lingam-massage") {
      return `${lead} Nairobi near me | ${BRAND}`;
    }
    return `${lead} ${CITY} near me | ${BRAND}`;
  }
  return profTitleTreatment(name);
}

export function profTitleMasseuseHub(): string {
  return `Masseuse near me ${CITY} | ${BRAND}`;
}

export function profTitleAreaHub(areaName: string): string {
  return `Massage in ${areaName} Nairobi near me | ${BRAND}`;
}

export function profTitleServiceCombo(serviceName: string, areaName: string): string {
  return `${serviceName} in ${areaName} Nairobi near me | ${BRAND}`;
}

/** Tier-A Kilimani combo boost — exact modality keyword in title lead. */
export function profTitleServiceComboKeyed(
  serviceSlug: string,
  serviceName: string,
  areaName: string
): string {
  const lead = TREATMENT_TITLE_LEADS[serviceSlug as KeyedTreatmentSlug];
  if (lead && areaName === "Kilimani") {
    return `${lead} in ${areaName} Nairobi near me | ${BRAND}`;
  }
  return profTitleServiceCombo(serviceName, areaName);
}

export function profTitleMasseuseCombo(masseuseName: string, areaName: string): string {
  return `Book ${masseuseName} in ${areaName} Nairobi near me | ${BRAND}`;
}

export function profTitleMasseuse(masseuseName: string): string {
  return `${masseuseName} Massage Therapist ${CITY} near me | ${BRAND}`;
}

export function profTitleGuide(topic: string): string {
  return `${topic} ${CITY} near me | ${BRAND}`;
}

export type HubKind =
  | "treatments"
  | "areas"
  | "guides"
  | "masseuses"
  | "about"
  | "contact";

export function profTitleHub(kind: HubKind): string {
  switch (kind) {
    case "treatments":
      return `BEST Massage Treatments ${CITY} near me | ${BRAND}`;
    case "areas":
      return `Massage Areas We Serve Nairobi near me | ${BRAND}`;
    case "guides":
      return `Massage Spa Guides ${CITY} near me | ${BRAND}`;
    case "masseuses":
      return profTitleMasseuseHub();
    case "about":
      return `About ${BRAND} Spa Marcus Garvey Rd Nairobi | Open 24/7`;
    case "contact":
      return `Contact ${BRAND} Nairobi near me | Call ${site.phoneDisplay}`;
  }
}

/** Wrap a complete Prof title for Next.js metadata (bypasses layout template). */
export function absoluteTitle(title: string): { absolute: string } {
  return { absolute: title };
}
