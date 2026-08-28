import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArea, areaPath, areaServicePath } from "@/content/areas";
import { getTreatment, treatments } from "@/content/treatments";
import { masseuses } from "@/content/masseuses";
import {
  allAreaServiceParams,
  buildAreaServiceCombo,
} from "@/content/generate-combos";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/MapEmbed";
import { CtaRow } from "@/components/cta/Conversion";
import { absoluteUrl } from "@/content/site";
import { faqJsonLd, serviceJsonLd } from "@/lib/schema";
import { absoluteTitle } from "@/lib/seo-titles";

type Props = { params: Promise<{ area: string; service: string }> };

export function generateStaticParams() {
  return allAreaServiceParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area, service } = await params;
  const combo = buildAreaServiceCombo(area, service);
  if (!combo) return {};
  return {
    title: absoluteTitle(combo.metaTitle),
    description: combo.metaDescription,
    alternates: {
      canonical: absoluteUrl(areaServicePath(area, service)),
    },
  };
}

export default async function AreaServicePage({ params }: Props) {
  const { area: areaSlug, service } = await params;
  const combo = buildAreaServiceCombo(areaSlug, service);
  if (!combo) notFound();
  const { area, treatment } = combo;
  const otherServices = treatments.filter((t) => t.slug !== treatment.slug).slice(0, 5);
  const specialists = masseuses.filter((m) =>
    m.specialties.includes(treatment.slug)
  );

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Areas", url: absoluteUrl("/areas/") },
            { name: area.name, url: absoluteUrl(areaPath(area.slug)) },
            {
              name: treatment.name,
              url: absoluteUrl(areaServicePath(area.slug, treatment.slug)),
            },
          ]),
          serviceJsonLd({
            name: `${treatment.name} in ${area.name}`,
            description: combo.metaDescription,
            url: absoluteUrl(areaServicePath(area.slug, treatment.slug)),
            areaName: area.name,
          }),
          ...(combo.faqs.length ? [faqJsonLd(combo.faqs)] : []),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Areas", href: "/areas/" },
          { name: area.name, href: areaPath(area.slug) },
          { name: treatment.name },
        ]}
      />
      <article className="section-pad mx-auto max-w-3xl py-10">
        <h1 className="font-display text-4xl text-[var(--off-white)] sm:text-5xl">
          {combo.h1}
        </h1>
        <p className="mt-4 text-[var(--muted)]">{area.commute}</p>
        <div className="mt-6">
          <CtaRow
            message={`Hi, I'd like to book ${treatment.name} — I'm coming from ${area.name}.`}
          />
        </div>
        <div className="prose-spa mt-10">
          {combo.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>

        {combo.faqs.length ? (
          <section className="mt-12">
            <h2 className="font-display text-2xl text-[var(--crimson)]">
              FAQs — {treatment.shortName} in {area.name}
            </h2>
            <div className="mt-6 space-y-3">
              {combo.faqs.map((f) => (
                <details
                  key={f.q}
                  className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4"
                >
                  <summary className="cursor-pointer font-medium text-[var(--off-white)]">
                    {f.q}
                  </summary>
                  <p className="mt-3 text-sm text-[var(--muted)]">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        <h2 className="mt-12 font-display text-2xl text-[var(--crimson)]">
          Landmarks near {area.name}
        </h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          {area.landmarks.join(" · ")} — along {area.roads.slice(0, 3).join(", ")}.
        </p>

        <h2 className="mt-12 font-display text-2xl text-[var(--crimson)]">
          Other services in {area.name}
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {otherServices.map((t) => (
            <li key={t.slug}>
              <Link
                href={areaServicePath(area.slug, t.slug)}
                className="rounded-full border border-white/10 px-3 py-1.5 text-sm hover:border-[var(--crimson)]/40"
              >
                {t.name}
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm">
          <Link
            href={`/massage-treatments/${treatment.slug}/`}
            className="text-[var(--crimson)] hover:underline"
          >
            Full {treatment.name} page →
          </Link>
        </p>

        {specialists.length ? (
          <>
            <h2 className="mt-12 font-display text-2xl text-[var(--crimson)]">
              Masseuses for {treatment.shortName}
            </h2>
            <ul className="mt-4 space-y-2">
              {specialists.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={`/areas/${area.slug}/masseuses/${m.slug}/`}
                    className="hover:text-[var(--crimson)]"
                  >
                    Book {m.name} in {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}

        <div className="mt-12">
          <Link href={areaPath(area.slug)} className="text-sm text-[var(--muted)] hover:text-[var(--crimson)]">
            ← Back to {area.name}
          </Link>
        </div>
      </article>
    </>
  );
}
