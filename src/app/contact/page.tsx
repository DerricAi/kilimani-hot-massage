import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/seo/Breadcrumbs";
import { MapEmbed, JsonLd } from "@/components/seo/MapEmbed";
import { CtaRow } from "@/components/cta/Conversion";
import { absoluteUrl, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Kilimani Hot Massage on Marcus Garvey Rd, Kilimani. Call or WhatsApp 0746 203398. Open 24/7.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Contact", url: absoluteUrl("/contact/") },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Contact" },
        ]}
      />
      <section className="section-pad mx-auto max-w-7xl py-10">
        <h1 className="font-display text-4xl text-[var(--off-white)] sm:text-5xl">
          Contact Kilimani Hot Massage
        </h1>
        <p className="mt-4 max-w-2xl text-[var(--muted)]">
          The fastest way to book is a call or WhatsApp. We reply around the clock.
        </p>
        <p className="mt-4 rounded-xl border border-[var(--bronze)]/25 bg-white/[0.03] px-4 py-3 text-sm text-[var(--off-white)]">
          {site.napFooter}
        </p>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div>
            <dl className="space-y-5 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wider text-[var(--bronze)]">
                  Business name
                </dt>
                <dd className="mt-1 text-lg text-[var(--off-white)]">{site.name}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-[var(--bronze)]">
                  Phone & WhatsApp
                </dt>
                <dd className="mt-1 text-lg text-[var(--off-white)]">
                  <a href={`tel:${site.phoneTel}`} className="hover:text-[var(--bronze)]">
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-[var(--bronze)]">
                  Address
                </dt>
                <dd className="mt-1 text-lg text-[var(--off-white)]">{site.addressLine}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-[var(--bronze)]">
                  Hours
                </dt>
                <dd className="mt-1 text-lg text-[var(--off-white)]">{site.hoursLabel}</dd>
              </div>
            </dl>
            <div className="mt-8">
              <CtaRow />
            </div>
            <p className="mt-6 text-sm text-[var(--muted)]">
              Browse{" "}
              <Link href="/areas/" className="text-[var(--bronze)] hover:underline">
                areas we serve
              </Link>{" "}
              or{" "}
              <Link href="/massage-treatments/" className="text-[var(--bronze)] hover:underline">
                massage treatments
              </Link>
              .
            </p>
          </div>
          <MapEmbed className="h-[360px] w-full" />
        </div>
      </section>
    </>
  );
}
