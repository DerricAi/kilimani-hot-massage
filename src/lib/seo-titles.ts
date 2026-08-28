import { site } from "@/content/site";

/** Prof checklist 4.x — full title strings (use with metadata title.absolute). */
const BRAND = site.name;
const CITY = "Kilimani Nairobi";

export function profTitleHome(): string {
  return `BEST Massage Spa Kilimani Nairobi - if you're looking for Swedish, Deep Tissue, Nuru, Couples, Hot Stone & Four Hands massage near me on Marcus Garvey Rd - ${BRAND} open 24/7`;
}

export function profTitleTreatment(serviceName: string): string {
  return `${serviceName} ${CITY} near me | ${BRAND}`;
}

export function profTitleAreaHub(areaName: string): string {
  return `Massage in ${areaName} Nairobi near me | ${BRAND}`;
}

export function profTitleServiceCombo(serviceName: string, areaName: string): string {
  return `${serviceName} in ${areaName} Nairobi near me | ${BRAND}`;
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
      return `Massage Therapists ${CITY} near me | ${BRAND}`;
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
