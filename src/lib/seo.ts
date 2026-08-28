import type { Metadata } from "next";
import { absoluteUrl, site } from "@/content/site";
import { absoluteTitle } from "@/lib/seo-titles";

const DEFAULT_OG = "/images/og-kilimani-hot-massage.webp";

export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image.startsWith("/") ? image : `/${image}`);

  return {
    title: absoluteTitle(title),
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_KE",
      url,
      siteName: site.name,
      title,
      description,
      images: [{ url: imageUrl, alt: `${site.name} — Massage Spa Kilimani` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
