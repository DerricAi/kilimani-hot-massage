import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArea, areaPath, areaMasseusePath, areaServicePath } from "@/content/areas";
import { getMasseuse, masseuses } from "@/content/masseuses";
import { getTreatment } from "@/content/treatments";
import {
  allAreaMasseuseParams,
  buildAreaMasseuseCombo,
} from "@/content/generate-combos";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/MapEmbed";
import { CtaRow } from "@/components/cta/Conversion";
import { absoluteUrl } from "@/content/site";
import { FaqAccordion } from "@/components/seo/FaqAccordion";
import { faqJsonLd, personJsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ area: string; masseuse: string }> };

export function generateStaticParams() {
  return allAreaMasseuseParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area, masseuse } = await params;
  const combo = buildAreaMasseuseCombo(area, masseuse);
  if (!combo) return {};
  return pageMetadata({
    title: combo.metaTitle,
    description: combo.metaDescription,
    path: areaMasseusePath(area, masseuse),
  });
}

export default async function AreaMasseusePage({ params }: Props) {
  const { area: areaSlug, masseuse: masseuseSlug } = await params;
  const combo = buildAreaMasseuseCombo(areaSlug, masseuseSlug);
  if (!combo) notFound();
  const { area, masseuse } = combo;
  const specialties = masseuse.specialties
    .map((s) => getTreatment(s))
    .filter(Boolean);
  const others = masseuses.filter((m) => m.slug !== masseuse.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Areas", url: absoluteUrl("/areas/") },
            { name: area.name, url: absoluteUrl(areaPath(area.slug)) },
            {
              name: masseuse.name,
              url: absoluteUrl(areaMasseusePath(area.slug, masseuse.slug)),
            },
          ]),
          personJsonLd({
            name: masseuse.name,
            url: absoluteUrl(areaMasseusePath(area.slug, masseuse.slug)),
            knowsAbout: specialties.map((t) => t!.name),
          }),
          ...(combo.faqs.length ? [faqJsonLd(combo.faqs)] : []),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Areas", href: "/areas/" },
          { name: area.name, href: areaPath(area.slug) },
          { name: masseuse.name },
        ]}
      />
      <article className="section-pad mx-auto max-w-3xl py-10">
        <h1 className="font-display text-4xl text-[var(--off-white)] sm:text-5xl">
          {combo.h1}
        </h1>
        <p className="mt-4 text-[var(--muted)]">{area.commute}</p>
        <div className="mt-6">
          <CtaRow
            message={`Hi, I'd like to book with ${masseuse.name} for a session — I'm in ${area.name}.`}
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
              FAQs — booking {masseuse.name} from {area.name}
            </h2>
            <FaqAccordion
              faqs={combo.faqs}
              className="mt-6 space-y-3"
              detailsClassName="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4"
              summaryClassName="cursor-pointer text-[var(--off-white)]"
              answerClassName="mt-3 text-sm text-[var(--muted)]"
            />
          </section>
        ) : null}

        <h2 className="mt-12 font-display text-2xl text-[var(--crimson)]">
          {masseuse.name}&apos;s specialties in {area.name}
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {specialties.map((t) =>
            t ? (
              <li key={t.slug}>
                <Link
                  href={areaServicePath(area.slug, t.slug)}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-sm hover:border-[var(--crimson)]/40"
                >
                  {t.name} in {area.name}
                </Link>
              </li>
            ) : null
          )}
        </ul>

        <p className="mt-6 text-sm">
          <Link
            href={`/masseuses/${masseuse.slug}/`}
            className="text-[var(--crimson)] hover:underline"
          >
            Full profile for {masseuse.name} →
          </Link>
        </p>

        <h2 className="mt-12 font-display text-2xl text-[var(--crimson)]">
          Other masseuses for {area.name}
        </h2>
        <ul className="mt-4 space-y-2">
          {others.map((m) => (
            <li key={m.slug}>
              <Link
                href={areaMasseusePath(area.slug, m.slug)}
                className="hover:text-[var(--crimson)]"
              >
                {m.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <Link
            href={areaPath(area.slug)}
            className="text-sm text-[var(--muted)] hover:text-[var(--crimson)]"
          >
            ← Back to {area.name}
          </Link>
        </div>
      </article>
    </>
  );
}
