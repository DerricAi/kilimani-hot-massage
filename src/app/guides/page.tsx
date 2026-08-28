import Link from "next/link";
import type { Metadata } from "next";
import { guides, guidePath } from "@/content/guides";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/MapEmbed";
import { CtaRow } from "@/components/cta/Conversion";
import { absoluteUrl } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Massage Guides Kilimani Nairobi | Tips & Booking",
  description:
    "Massage guides for Kilimani and Nairobi—Swedish vs deep tissue, first visits, Nuru, couples, 24/7 booking on Marcus Garvey Rd. WhatsApp 0746 203398.",
  path: "/guides/",
});

export default function GuidesHubPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: guides.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: g.title,
      url: absoluteUrl(guidePath(g.slug)),
    })),
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Guides", url: absoluteUrl("/guides/") },
          ]),
          itemList,
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Guides" },
        ]}
      />
      <section className="section-pad mx-auto max-w-7xl py-10">
        <h1 className="font-display text-4xl text-[var(--off-white)] sm:text-5xl">
          Massage Guides for Kilimani & Nairobi
        </h1>
        <p className="mt-4 max-w-2xl text-[var(--muted)]">
          Practical articles on treatments, first visits, booking our 24/7 spa, and getting
          here from across Nairobi County—written for real guests, not keyword stuffing.
        </p>
        <div className="mt-6">
          <CtaRow message="Hi, I read your guides and I'd like to book at Kilimani Hot Massage." />
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={guidePath(g.slug)}
              className="flex flex-col rounded-xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-[var(--bronze)]/40"
            >
              <p className="text-xs uppercase tracking-wider text-[var(--bronze)]">
                {g.tags.slice(0, 2).join(" · ")}
              </p>
              <h2 className="mt-3 font-display text-2xl text-[var(--off-white)]">
                {g.title}
              </h2>
              <p className="mt-3 flex-1 text-sm text-[var(--muted)]">{g.excerpt}</p>
              <span className="mt-4 text-sm text-[var(--bronze)]">Read guide →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
