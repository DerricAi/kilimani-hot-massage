import { site } from "@/content/site";
import {
  guideTitlePhrase,
  treatmentTitlePhrase,
  type KeyedTreatmentSlug,
} from "@/content/target-keywords";

/** Prof checklist 4.x — full title strings (use with metadata title.absolute). */
const BRAND = site.name;

function withBrand(phrase: string): string {
  return `${phrase} | ${BRAND}`;
}

export function profTitleHome(): string {
  return `BEST Massage Spa Kilimani - Kilimani massage & spa near me - if you want massage spa near me, Swedish, Nuru, full body & couples on Marcus Garvey Rd - ${BRAND} open 24/7`;
}

/** Default treatment — Massage near me + Kilimani */
export function profTitleTreatment(serviceName: string): string {
  return withBrand(`${serviceName} near me Kilimani`);
}

/** Per-slug exact keyword phrase for treatment pages. */
export function profTitleTreatmentKeyed(slug: string, name: string): string {
  const phrase = treatmentTitlePhrase[slug as KeyedTreatmentSlug];
  if (phrase) return withBrand(phrase);
  return profTitleTreatment(name);
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

export function profTitleServiceCombo(serviceName: string, areaName: string): string {
  if (areaName === "Kilimani") {
    return withBrand(`${serviceName} near me Kilimani`);
  }
  return withBrand(`${serviceName} near me ${areaName}`);
}

/** Tier-A Kilimani combo boost — exact modality keyword phrase. */
export function profTitleServiceComboKeyed(
  serviceSlug: string,
  serviceName: string,
  areaName: string
): string {
  const phrase = treatmentTitlePhrase[serviceSlug as KeyedTreatmentSlug];
  if (phrase && areaName === "Kilimani") {
    return withBrand(phrase);
  }
  return profTitleServiceCombo(serviceName, areaName);
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
