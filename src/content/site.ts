export const site = {
  name: "Kilimani Hot Massage",
  category: "Massage Spa",
  primaryKeyword: "Massage Spa Kilimani",
  phoneDisplay: "0746 203398",
  phoneTel: "+254746203398",
  whatsappUrl: "https://wa.me/254746203398",
  streetAddress: "Marcus Garvey Rd",
  addressLocality: "Kilimani",
  addressRegion: "Nairobi County",
  addressCountry: "KE",
  addressLine: "Marcus Garvey Rd, Nairobi",
  napFooter: "Kilimani Hot Massage · 0746 203398 · Marcus Garvey Rd, Nairobi",
  hoursLabel: "Open 24 Hours (7 days a week)",
  hoursShort: "Open 24/7",
  topBar: "Open 24/7 | Private Spa on Marcus Garvey Rd, Kilimani",
  url: "https://kilimanihotmassage.co.ke",
  mapsShort: "https://share.google/KmKDbFZFxQTmNz0ex",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31910.41214710796!2d36.76344980404874!3d-1.2935656664233064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f111bcfe871e1%3A0x34faa6b3e19da20b!2sKilimani%20Hot%20Massage!5e0!3m2!1sen!2ske!4v1787885982459!5m2!1sen!2ske",
  geo: { latitude: -1.293566, longitude: 36.76345 },
  priceRange: "$$",
  email: null as string | null,
  socials: [] as string[],
} as const;

export function whatsappLink(message?: string) {
  if (!message) return site.whatsappUrl;
  return `${site.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

export function treatmentPath(slug: string) {
  return `/massage-treatments/${slug}/`;
}

export function absoluteUrl(path = "/") {
  const raw = path.startsWith("/") ? path : `/${path}`;
  if (raw === "/") return `${site.url}/`;
  const withSlash = raw.endsWith("/") ? raw : `${raw}/`;
  return `${site.url}${withSlash}`;
}
