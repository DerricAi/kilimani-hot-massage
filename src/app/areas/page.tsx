import Link from "next/link";
import type { Metadata } from "next";
import {
  areas,
  getConstituencyAreas,
  areaPath,
} from "@/content/areas";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/MapEmbed";
import { CtaRow } from "@/components/cta/Conversion";
import { absoluteUrl } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { profTitleHub } from "@/lib/seo-titles";

export const metadata: Metadata = pageMetadata({
  title: profTitleHub("areas"),
  description:
    "Kilimani Hot Massage serves guests across Nairobi County—17 constituencies, 85 wards, and key suburbs. Open 24/7 on Marcus Garvey Rd.",
  path: "/areas/",
});

export default function AreasHubPage() {
  const constituencies = getConstituencyAreas();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Areas we serve", url: absoluteUrl("/areas/") },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Areas we serve" },
        ]}
      />
      <section className="section-pad mx-auto max-w-7xl py-10">
        <h1 className="font-display text-4xl text-[var(--off-white)] sm:text-5xl">
          Areas We Serve in Nairobi County
        </h1>
        <p className="mt-4 max-w-3xl text-[var(--muted)]">
          Our studio is on Marcus Garvey Rd in Kilimani. Guests visit from every
          constituency—each area page lists every massage service and every masseuse, with
          nested pages for local search.
        </p>
        <div className="mt-6">
          <CtaRow message="Hi, I'm nearby and would like to book at Kilimani Hot Massage." />
        </div>

        <div className="mt-14 space-y-12">
          {constituencies.map((c) => {
            const children = areas.filter(
              (a) => a.constituencySlug === c.slug && a.slug !== c.slug
            );
            return (
              <div key={c.slug}>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="font-display text-2xl text-[var(--crimson)]">
                    <Link href={areaPath(c.slug)} className="hover:underline">
                      {c.name}
                    </Link>
                  </h2>
                  <Link
                    href={areaPath(c.slug)}
                    className="text-xs uppercase tracking-wider text-[var(--muted)] hover:text-[var(--crimson)]"
                  >
                    Constituency hub →
                  </Link>
                </div>
                <p className="mt-2 max-w-3xl text-sm text-[var(--muted)]">{c.commute}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {children.map((a) => (
                    <Link
                      key={a.slug}
                      href={areaPath(a.slug)}
                      className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-[var(--off-white)]/85 hover:border-[var(--crimson)]/40"
                    >
                      {a.name}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16">
          <h2 className="font-display text-2xl text-[var(--off-white)]">A–Z index</h2>
          <div className="mt-4 columns-2 gap-4 sm:columns-3 lg:columns-4">
            {[...areas]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((a) => (
                <Link
                  key={a.slug}
                  href={areaPath(a.slug)}
                  className="mb-2 block text-sm text-[var(--muted)] hover:text-[var(--crimson)]"
                >
                  {a.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
