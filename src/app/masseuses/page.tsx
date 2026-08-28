import Link from "next/link";
import type { Metadata } from "next";
import { masseuses } from "@/content/masseuses";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/MapEmbed";
import { CtaRow } from "@/components/cta/Conversion";
import { absoluteUrl } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Massage Therapists in Kilimani Nairobi",
  description:
    "Meet our massage therapists at Kilimani Hot Massage—Amara, Zuri, Aisha, Nuru, Keisha, and Lina. Open 24/7. WhatsApp 0746 203398.",
  path: "/masseuses/",
});

export default function MasseusesHubPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Masseuses", url: absoluteUrl("/masseuses/") },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Masseuses" },
        ]}
      />
      <section className="section-pad mx-auto max-w-7xl py-10">
        <h1 className="font-display text-4xl text-[var(--off-white)] sm:text-5xl">
          Massage Therapists in Kilimani, Nairobi
        </h1>
        <p className="mt-4 max-w-2xl text-[var(--muted)]">
          Request Amara, Zuri, Aisha, Nuri, Keisha, or Lina by name. Every session happens at
          our Marcus Garvey Rd studio—open around the clock for Kilimani and county-wide guests.
        </p>
        <div className="mt-6">
          <CtaRow message="Hi, I'd like to book with a masseuse at Kilimani Hot Massage." />
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {masseuses.map((m) => (
            <Link
              key={m.slug}
              href={`/masseuses/${m.slug}/`}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-[var(--bronze)]/40"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--bronze)]/15 font-display text-3xl text-[var(--bronze)]">
                {m.name[0]}
              </div>
              <h2 className="mt-4 font-display text-2xl text-[var(--off-white)]">
                {m.name}
              </h2>
              <p className="mt-2 text-sm text-[var(--muted)]">{m.tagline}</p>
              <p className="mt-3 text-sm text-[var(--off-white)]/80">{m.shortBio}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
