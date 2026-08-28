import { site } from "@/content/site";
import {
  guideTitlePhrase,
  profGuideTitlePhrase,
  profTreatmentTitleForArea,
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
  return withBrand(profTreatmentTitleForArea(slug, "Kilimani", name));
}

export function profTitleMasseuseHub(): string {
  return withBrand(
    "Masseuse near me Kilimani - book on Marcus Garvey Rd massage spa open 24/7"
  );
}

export function profTitleAreaHub(areaName: string): string {
  if (areaName === "Kilimani") {
    return withBrand(
      "Massage Kilimani near me - Kilimani guests Marcus Garvey Rd spa open 24/7"
    );
  }
  return withBrand(
    `Massage near me ${areaName} - ${areaName} guests Marcus Garvey Rd spa open 24/7`
  );
}

/** Area×service combo — keyword lead + specific area + Prof tail. */
export function profTitleServiceComboKeyed(
  serviceSlug: string,
  serviceName: string,
  areaName: string
): string {
  return withBrand(profTreatmentTitleForArea(serviceSlug, areaName, serviceName));
}

export function profTitleMasseuseCombo(masseuseName: string, areaName: string): string {
  return withBrand(
    `Book ${masseuseName} masseuse near me ${areaName} - from ${areaName} to Marcus Garvey Rd open 24/7`
  );
}

export function profTitleMasseuse(masseuseName: string): string {
  return withBrand(
    `${masseuseName} masseuse near me Kilimani - book on Marcus Garvey Rd open 24/7`
  );
}

export function profTitleGuide(topic: string): string {
  return withBrand(profGuideTitlePhrase(`${topic} near me Kilimani`));
}

export function profTitleGuideSlug(slug: string, topic: string): string {
  const phrase = guideTitlePhrase[slug];
  if (phrase) return withBrand(profGuideTitlePhrase(phrase));
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
      return withBrand(
        "BEST Massage Treatments near me Kilimani - Marcus Garvey Rd spa open 24/7"
      );
    case "areas":
      return withBrand(
        "Massage near me Nairobi areas - Marcus Garvey Rd Kilimani spa open 24/7"
      );
    case "guides":
      return withBrand(
        "Massage spa guides near me Kilimani - Marcus Garvey Rd open 24/7"
      );
    case "masseuses":
      return profTitleMasseuseHub();
    case "about":
      return `About ${BRAND} Spa Marcus Garvey Rd Kilimani | Open 24/7`;
    case "contact":
      return withBrand(
        `Contact Massage Spa Kilimani near me - Marcus Garvey Rd open 24/7 | Call ${site.phoneDisplay}`
      );
  }
}

/** Wrap a complete Prof title for Next.js metadata (bypasses layout template). */
export function absoluteTitle(title: string): { absolute: string } {
  return { absolute: title };
}
