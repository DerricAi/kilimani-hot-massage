import Link from "next/link";
import type { Metadata } from "next";
import { treatments } from "@/content/treatments";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/MapEmbed";
import { CtaRow } from "@/components/cta/Conversion";
import { absoluteUrl } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { profTitleHub } from "@/lib/seo-titles";

export const metadata: Metadata = pageMetadata({
  title: profTitleHub("treatments"),
  description:
    "Browse Swedish, deep tissue, Nuru, couples, hot stone and more at Kilimani Hot Massage. Open 24/7 on Marcus Garvey Rd.",
  path: "/massage-treatments/",
});

export default function TreatmentsHubPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Massage treatments", url: absoluteUrl("/massage-treatments/") },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Massage treatments" },
        ]}
      />
      <section className="section-pad mx-auto max-w-7xl py-10">
        <h1 className="font-display text-4xl text-[var(--off-white)] sm:text-5xl">
          Massage Treatments in Kilimani
        </h1>
        <p className="mt-4 max-w-2xl text-[var(--muted)]">
          Every treatment is available 24/7 at our Marcus Garvey Rd studio. Choose a
          modality, then book by call or WhatsApp.
        </p>
        <div className="mt-6">
          <CtaRow message="Hi, I'd like to book a massage treatment at Kilimani Hot Massage." />
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((t) => (
            <Link
              key={t.slug}
              href={`/massage-treatments/${t.slug}/`}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-[var(--crimson)]/40"
            >
              <h2 className="font-display text-2xl text-[var(--crimson)]">{t.name}</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">{t.tagline}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
