import { site, absoluteUrl } from "@/content/site";
import { treatments } from "@/content/treatments";
import { areas } from "@/content/areas";

export function daySpaJsonLd() {
  const areaServed = [
    { "@type": "AdministrativeArea", name: "Nairobi County" },
    ...areas
      .filter((a) => a.kind === "constituency")
      .map((a) => ({ "@type": "AdministrativeArea", name: a.name })),
    { "@type": "AdministrativeArea", name: "Lavington" },
    { "@type": "AdministrativeArea", name: "Kilimani" },
    { "@type": "AdministrativeArea", name: "Kileleshwa" },
    { "@type": "AdministrativeArea", name: "Westlands" },
    { "@type": "AdministrativeArea", name: "Upper Hill" },
    { "@type": "AdministrativeArea", name: "Nairobi CBD" },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "DaySpa",
    "@id": `${site.url}/#dayspa`,
    name: site.name,
    telephone: site.phoneDisplay,
    url: site.url,
    priceRange: site.priceRange,
    category: site.category,
    image: absoluteUrl("/images/og-kilimani-hot-massage.webp"),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.streetAddress,
      addressLocality: site.addressLocality,
      addressRegion: site.addressRegion,
      addressCountry: site.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    hasMap: site.mapsShort,
    areaServed,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Spa & Massage Services",
      itemListElement: treatments.map((t) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `${t.name} Kilimani`,
          url: absoluteUrl(`/massage-treatments/${t.slug}/`),
        },
      })),
    },
    sameAs: [site.whatsappUrl, site.mapsShort, ...site.socials],
    // Do NOT invent AggregateRating. Add only when the client supplies a live
    // Google rating + review count that matches the public GBP profile.
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function personJsonLd(opts: {
  name: string;
  url: string;
  jobTitle?: string;
  knowsAbout?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: opts.name,
    url: opts.url,
    jobTitle: opts.jobTitle ?? "Massage Therapist",
    worksFor: { "@id": `${site.url}/#dayspa` },
    knowsAbout: opts.knowsAbout,
  };
}

export function serviceJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  areaName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: { "@id": `${site.url}/#dayspa` },
    areaServed: opts.areaName
      ? { "@type": "AdministrativeArea", name: opts.areaName }
      : { "@type": "AdministrativeArea", name: "Nairobi County" },
  };
}
