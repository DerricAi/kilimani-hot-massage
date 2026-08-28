import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  areas,
  getArea,
  areaPath,
  areaServicePath,
  areaMasseusePath,
  getAreaEnrichment,
} from "@/content/areas";
import { treatments } from "@/content/treatments";
import { masseuses } from "@/content/masseuses";
import { guidesForArea, guidePath } from "@/content/guides";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/seo/Breadcrumbs";
import { JsonLd, MapEmbed } from "@/components/seo/MapEmbed";
import { CtaRow } from "@/components/cta/Conversion";
import { absoluteUrl, site, whatsappLink } from "@/content/site";
import { FaqAccordion } from "@/components/seo/FaqAccordion";
import { faqJsonLd } from "@/lib/schema";
import { treatmentImage } from "@/content/media";
import { pageMetadata } from "@/lib/seo";
import { profTitleAreaHub } from "@/lib/seo-titles";

type Props = { params: Promise<{ area: string }> };

export function generateStaticParams() {
  return areas.map((a) => ({ area: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area: slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  return pageMetadata({
    title: profTitleAreaHub(area.name),
    description: `${area.commute}. Book massage for ${area.name} guests at Kilimani Hot Massage on Marcus Garvey Rd. Open 24/7. Call ${site.phoneDisplay}.`,
    path: areaPath(area.slug),
  });
}

export default async function AreaPage({ params }: Props) {
  const { area: slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const parent =
    area.kind !== "constituency"
      ? getArea(area.constituencySlug)
      : null;
  const siblings = areas.filter(
    (a) =>
      a.constituencySlug === area.constituencySlug &&
      a.slug !== area.slug &&
      a.kind !== "constituency"
  );
  const neighbors = area.neighboringAreas
    .map((s) => getArea(s))
    .filter(Boolean) as typeof areas;
  const relatedGuides =
    area.tier === "A" ? guidesForArea(area.slug).slice(0, 3) : [];
  const enrichment = getAreaEnrichment(area);

  const jsonLdData: Record<string, unknown>[] = [
    breadcrumbJsonLd([
      { name: "Home", url: absoluteUrl("/") },
      { name: "Areas", url: absoluteUrl("/areas/") },
      ...(parent
        ? [{ name: parent.name, url: absoluteUrl(areaPath(parent.slug)) }]
        : []),
      { name: area.name, url: absoluteUrl(areaPath(area.slug)) },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Place",
      name: `${site.name} — serving ${area.name}`,
      url: absoluteUrl(areaPath(area.slug)),
      description: area.intro,
    },
  ];
  if (enrichment.faqs.length) {
    jsonLdData.push(faqJsonLd(enrichment.faqs));
  }

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Areas", href: "/areas/" },
  ];
  if (parent) crumbs.push({ name: parent.name, href: areaPath(parent.slug) });
  crumbs.push({ name: area.name, href: "" });

  return (
    <>
      <JsonLd data={jsonLdData} />
      <Breadcrumbs
        items={crumbs.map((c) =>
          c.href ? { name: c.name, href: c.href } : { name: c.name }
        )}
      />

      <article className="section-pad mx-auto max-w-7xl py-10">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--crimson)]">
          Massage near {area.name}
        </p>
        <h1 className="mt-3 font-display text-4xl text-[var(--off-white)] sm:text-5xl">
          Massage in {area.name}, Nairobi
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-[var(--muted)]">{area.commute}</p>
        <div className="mt-6">
          <CtaRow
            message={`Hi, I'm in ${area.name} and would like to book at Kilimani Hot Massage.`}
          />
        </div>

        <div className="prose-spa mt-10 max-w-3xl">
          <p>{area.intro}</p>
        </div>

        {enrichment.sections.map((section) => (
          <section key={section.heading} className="prose-spa mt-12 max-w-3xl">
            <h2 className="font-display text-2xl text-[var(--crimson)]">
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-4 text-[var(--muted)]">
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        {enrichment.localTips.length ? (
          <section className="mt-14 max-w-3xl">
            <h2 className="font-display text-2xl text-[var(--off-white)]">
              Local tips for {area.name}
            </h2>
            <ul className="mt-4 space-y-2">
              {enrichment.localTips.map((tip) => (
                <li
                  key={tip}
                  className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-[var(--muted)]"
                >
                  {tip}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {enrichment.faqs.length ? (
          <section className="mt-14 max-w-3xl">
            <h2 className="font-display text-2xl text-[var(--off-white)]">
              Frequently asked questions — {area.name}
            </h2>
            <FaqAccordion
              faqs={enrichment.faqs}
              className="mt-6 space-y-3"
              detailsClassName="group rounded-lg border border-white/10 bg-white/[0.02]"
              summaryClassName="cursor-pointer px-4 py-3 text-[var(--off-white)] marker:content-none"
              answerClassName="border-t border-white/5 px-4 py-3 text-sm text-[var(--muted)]"
            />
          </section>
        ) : null}

        <section className="mt-14">
          <h2 className="font-display text-3xl text-[var(--crimson)]">
            Near you in {area.name}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {area.whyVisit.map((w) => (
              <li
                key={w}
                className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-[var(--muted)]"
              >
                {w}
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--off-white)]">
                Landmarks
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-[var(--muted)]">
                {area.landmarks.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--off-white)]">
                Main roads
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-[var(--muted)]">
                {area.roads.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section-divider mt-16 bg-[var(--charcoal-soft)]/40 py-14">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-display text-3xl text-[var(--off-white)]">
              Massage Treatments in {area.name}
            </h2>
            <p className="mt-2 max-w-2xl text-[var(--muted)]">
              Every treatment has a dedicated {area.name} page with local directions and booking
              tips.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {treatments.map((t) => {
                const img = treatmentImage(t.slug);
                return (
                  <Link
                    key={t.slug}
                    href={areaServicePath(area.slug, t.slug)}
                    className="glass-card group overflow-hidden rounded-xl transition hover:border-[var(--crimson)]/40"
                  >
                    <div className="relative h-40 w-full overflow-hidden">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(min-width: 1024px) 33vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)] via-transparent to-transparent" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-xl text-[var(--crimson)]">
                        {t.name} in {area.name}
                      </h3>
                      <p className="mt-2 text-sm text-[var(--muted)]">{t.tagline}</p>
                      <span className="mt-3 inline-block text-xs text-[var(--crimson)]">
                        View {t.shortName} in {area.name} →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl text-[var(--off-white)]">
            Massage Therapists in {area.name}
          </h2>
          <p className="mt-2 text-[var(--muted)]">
            Request a therapist by name—each has a {area.name}-specific booking page.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {masseuses.map((m) => (
              <div
                key={m.slug}
                className="glass-card rounded-xl border border-white/10 p-5 transition hover:border-[var(--crimson)]/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--crimson)]/15 font-display text-xl text-[var(--crimson)]">
                  {m.name[0]}
                </div>
                <h3 className="mt-3 font-display text-xl text-[var(--off-white)]">
                  <Link href={areaMasseusePath(area.slug, m.slug)} className="hover:text-[var(--crimson)]">
                    {m.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{m.tagline}</p>
                <p className="mt-2 text-xs text-[var(--muted)]">
                  {m.shortBio.slice(0, 120)}…
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={areaMasseusePath(area.slug, m.slug)}
                    className="text-xs text-[var(--crimson)] hover:underline"
                  >
                    Book {m.name} in {area.name}
                  </Link>
                  <a
                    href={whatsappLink(
                      `Hi, I'm in ${area.name} and would like to book ${m.name} at Kilimani Hot Massage.`
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[var(--crimson)] hover:underline"
                  >
                    WhatsApp {m.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {neighbors.length ? (
          <section className="mt-16">
            <h2 className="font-display text-2xl text-[var(--off-white)]">
              Neighbouring areas
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {neighbors.map((n) => (
                <Link
                  key={n.slug}
                  href={areaPath(n.slug)}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-sm hover:border-[var(--crimson)]/40"
                >
                  {n.name}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {siblings.length && area.kind === "constituency" ? (
          <section className="mt-16">
            <h2 className="font-display text-2xl text-[var(--off-white)]">
              Wards & suburbs in {area.name}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {siblings.map((s) => (
                <Link
                  key={s.slug}
                  href={areaPath(s.slug)}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-sm hover:border-[var(--crimson)]/40"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {relatedGuides.length ? (
          <section className="mt-16">
            <h2 className="font-display text-2xl text-[var(--off-white)]">
              Guides for {area.name} guests
            </h2>
            <ul className="mt-4 space-y-2">
              {relatedGuides.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={guidePath(g.slug)}
                    className="text-[var(--crimson)] hover:underline"
                  >
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-16">
          <h2 className="font-display text-2xl text-[var(--off-white)]">
            Directions to our Kilimani studio
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">{site.napFooter}</p>
          <div className="mt-6 max-w-4xl">
            <MapEmbed />
          </div>
        </section>
      </article>
    </>
  );
}
