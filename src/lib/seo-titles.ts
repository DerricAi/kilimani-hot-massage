import { site } from "@/content/site";
import {
  guideTitlePhrase,
  treatmentTitleForArea,
} from "@/content/target-keywords";

/** Prof checklist 4.x — full title strings (use with metadata title.absolute). */
const BRAND = site.name;

function withBrand(phrase: string): string {
  return `${phrase} | ${BRAND}`;
}

export function profTitleHome(): string {
  return `BEST Massage Spa Kilimani - Kilimani massage & spa near me - if you want massage spa near me, Swedish, Nuru, full body & couples on Marcus Garvey Rd - ${BRAND} open 24/7`;
}

/** Treatment hub page — studio location Kilimani. */
export function profTitleTreatmentKeyed(slug: string, name: string): string {
  return withBrand(treatmentTitleForArea(slug, "Kilimani", name));
}

export function profTitleMasseuseHub(): string {
  return withBrand("Masseuse near me Kilimani");
}

export function profTitleAreaHub(areaName: string): string {
  if (areaName === "Kilimani") {
    return withBrand("Massage Kilimani near me");
  }
  return withBrand(`Massage near me ${areaName}`);
}

/** Area×service combo — keyword lead + specific area name. */
export function profTitleServiceComboKeyed(
  serviceSlug: string,
  serviceName: string,
  areaName: string
): string {
  return withBrand(treatmentTitleForArea(serviceSlug, areaName, serviceName));
}

export function profTitleMasseuseCombo(masseuseName: string, areaName: string): string {
  return withBrand(`Book ${masseuseName} masseuse near me ${areaName}`);
}

export function profTitleMasseuse(masseuseName: string): string {
  return withBrand(`${masseuseName} masseuse near me Kilimani`);
}

export function profTitleGuide(topic: string): string {
  return withBrand(`${topic} near me Kilimani`);
}

export function profTitleGuideSlug(slug: string, topic: string): string {
  const phrase = guideTitlePhrase[slug];
  if (phrase) return withBrand(phrase);
  return profTitleGuide(topic);
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
      return withBrand("BEST Massage Treatments near me Kilimani");
    case "areas":
      return withBrand("Massage near me Nairobi areas");
    case "guides":
      return withBrand("Massage spa guides near me Kilimani");
    case "masseuses":
      return profTitleMasseuseHub();
    case "about":
      return `About ${BRAND} Spa Marcus Garvey Rd Kilimani | Open 24/7`;
    case "contact":
      return withBrand(`Contact Massage Spa Kilimani near me | Call ${site.phoneDisplay}`);
  }
}

/** Wrap a complete Prof title for Next.js metadata (bypasses layout template). */
export function absoluteTitle(title: string): { absolute: string } {
  return { absolute: title };
}
