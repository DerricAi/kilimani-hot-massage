export {
  areas,
  getArea,
  getAreasByConstituency,
  getConstituencyAreas,
  TIER_A_SLUGS,
  type Area,
  type AreaKind,
} from "./data";

export {
  areaEnrichments,
  getAreaEnrichment,
  type AreaEnrichment,
  type AreaSection,
} from "./enrichment";

import { areas } from "./data";

export function areaPath(slug: string) {
  return `/areas/${slug}/`;
}

export function areaServicePath(areaSlug: string, serviceSlug: string) {
  return `/areas/${areaSlug}/services/${serviceSlug}/`;
}

export function areaMasseusePath(areaSlug: string, masseuseSlug: string) {
  return `/areas/${areaSlug}/masseuses/${masseuseSlug}/`;
}

export function allAreaSlugs() {
  return areas.map((a) => a.slug);
}
