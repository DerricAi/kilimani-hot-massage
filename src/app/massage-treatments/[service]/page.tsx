import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { treatments, getTreatment } from "@/content/treatments";
import { areas, areaServicePath, TIER_A_SLUGS } from "@/content/areas";
import { masseuses } from "@/content/masseuses";
import { guidesForTreatment, guidePath } from "@/content/guides";
import { treatmentImage } from "@/content/media";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/MapEmbed";
import { CtaRow } from "@/components/cta/Conversion";
import { absoluteUrl } from "@/content/site";
import { FaqAccordion } from "@/components/seo/FaqAccordion";
import { faqJsonLd, serviceJsonLd } from "@/lib/schema";
import { absoluteTitle } from "@/lib/seo-titles";

type Props = { params: Promise<{ service: string }> };

export function generateStaticParams() {
  return treatments.map((t) => ({ service: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  const t = getTreatment(service);
  if (!t) return {};
  return {
    title: absoluteTitle(t.metaTitle),
    description: t.metaDescription,
    alternates: { canonical: absoluteUrl(`/massage-treatments/${t.slug}/`) },
  };
}

export default async function TreatmentPage({ params }: Props) {
  const { service } = await params;
  const t = getTreatment(service);
  if (!t) notFound();

  const relatedAreas = TIER_A_SLUGS.map((s) => areas.find((a) => a.slug === s)).filter(
    Boolean
  ) as typeof areas;
  const relatedMasseuses = masseuses.filter((m) =>
    m.specialties.includes(t.slug)
  );
  const relatedGuides = guidesForTreatment(t.slug).slice(0, 4);
  const img = treatmentImage(t.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Massage treatments", url: absoluteUrl("/massage-treatments/") },
            { name: t.name, url: absoluteUrl(`/massage-treatments/${t.slug}/`) },
          ]),
          serviceJsonLd({
            name: t.name,
            description: t.summary,
            url: absoluteUrl(`/massage-treatments/${t.slug}/`),
          }),
          faqJsonLd(t.faqs),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Massage treatments", href: "/massage-treatments/" },
          { name: t.name },
        ]}
      />
      <article className="section-pad mx-auto max-w-3xl py-10">
        <h1 className="font-display text-4xl text-[var(--off-white)] sm:text-5xl">
          {t.h1}
        </h1>
        <p className="mt-4 text-lg text-[var(--muted)]">{t.summary}</p>
        <div className="relative mt-8 aspect-[3/2] overflow-hidden rounded-xl border border-[var(--crimson)]/20">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
        <div className="mt-6">
          <CtaRow
            message={`Hi, I'd like to book ${t.name} at Kilimani Hot Massage.`}
          />
        </div>

        <div className="prose-spa mt-10">
          {t.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl text-[var(--crimson)]">
                {section.heading}
              </h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </section>
          ))}
        </div>

        <h2 className="mt-12 font-display text-2xl text-[var(--crimson)]">Benefits</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
          {t.benefits.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>

        <h2 className="mt-12 font-display text-2xl text-[var(--crimson)]">
          We serve these areas
        </h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Guests book {t.name} from neighbourhoods across Nairobi—including:
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {relatedAreas.map((a) => (
            <li key={a.slug}>
              <Link
                href={areaServicePath(a.slug, t.slug)}
                className="rounded-full border border-white/10 px-3 py-1.5 text-sm hover:border-[var(--crimson)]/40"
              >
                {t.shortName} in {a.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm">
          <Link href="/areas/" className="text-[var(--crimson)] hover:underline">
            See all Nairobi areas we serve →
          </Link>
        </p>

        {relatedMasseuses.length ? (
          <>
            <h2 className="mt-12 font-display text-2xl text-[var(--crimson)]">
              Masseuses for {t.shortName}
            </h2>
            <ul className="mt-4 space-y-2">
              {relatedMasseuses.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={`/masseuses/${m.slug}/`}
                    className="text-[var(--off-white)] hover:text-[var(--crimson)]"
                  >
                    Book {m.name}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}

        {relatedGuides.length ? (
          <>
            <h2 className="mt-12 font-display text-2xl text-[var(--crimson)]">
              Related guides
            </h2>
            <ul className="mt-4 space-y-2">
              {relatedGuides.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={guidePath(g.slug)}
                    className="text-[var(--off-white)] hover:text-[var(--crimson)]"
                  >
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}

        <h2 className="mt-12 font-display text-2xl text-[var(--crimson)]">FAQs</h2>
        <FaqAccordion faqs={t.faqs} className="mt-4 space-y-3" />

        <div className="mt-12">
          <CtaRow
            message={`Hi, I'd like to book ${t.name} at Kilimani Hot Massage.`}
          />
        </div>
      </article>
    </>
  );
}
