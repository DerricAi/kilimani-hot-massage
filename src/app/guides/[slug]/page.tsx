import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { guides, getGuide, guidePath } from "@/content/guides";
import { getTreatment } from "@/content/treatments";
import { getArea, areaPath } from "@/content/areas";
import { getMasseuse } from "@/content/masseuses";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/MapEmbed";
import { CtaRow } from "@/components/cta/Conversion";
import { absoluteUrl, site } from "@/content/site";
import { faqJsonLd } from "@/lib/schema";
import { absoluteTitle } from "@/lib/seo-titles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return {
    title: absoluteTitle(g.metaTitle),
    description: g.metaDescription,
    alternates: { canonical: absoluteUrl(guidePath(g.slug)) },
    openGraph: {
      type: "article",
      publishedTime: g.publishedAt,
      title: g.metaTitle,
      description: g.metaDescription,
    },
  };
}

export default async function GuideArticlePage({ params }: Props) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  const treatments = g.relatedTreatments
    .map((s) => getTreatment(s))
    .filter(Boolean);
  const areas = g.relatedAreas.map((s) => getArea(s)).filter(Boolean);
  const masseuses = (g.relatedMasseuses ?? [])
    .map((s) => getMasseuse(s))
    .filter(Boolean);
  const moreGuides = (g.relatedGuides ?? [])
    .map((s) => getGuide(s))
    .filter(Boolean);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.h1,
    description: g.metaDescription,
    datePublished: g.publishedAt,
    dateModified: g.publishedAt,
    author: { "@type": "Organization", name: site.name },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: absoluteUrl(guidePath(g.slug)),
    articleSection: "Massage Guides",
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Guides", url: absoluteUrl("/guides/") },
            { name: g.title, url: absoluteUrl(guidePath(g.slug)) },
          ]),
          articleLd,
          faqJsonLd(g.faqs),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides/" },
          { name: g.title },
        ]}
      />
      <article className="section-pad mx-auto max-w-3xl py-10">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--crimson)]">
          {g.publishedAt} · {g.tags.join(" · ")}
        </p>
        <h1 className="mt-3 font-display text-4xl text-[var(--off-white)] sm:text-5xl">
          {g.h1}
        </h1>
        <p className="mt-4 text-lg text-[var(--muted)]">{g.excerpt}</p>
        <div className="mt-6">
          <CtaRow
            message={`Hi, I read "${g.title}" and I'd like to book at Kilimani Hot Massage.`}
          />
        </div>

        <div className="mt-12 space-y-10">
          {g.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl text-[var(--crimson)]">
                {section.heading}
              </h2>
              <div className="prose-spa mt-4">
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {treatments.length ? (
          <section className="mt-14">
            <h2 className="font-display text-2xl text-[var(--off-white)]">
              Related treatments
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {treatments.map((t) =>
                t ? (
                  <li key={t.slug}>
                    <Link
                      href={`/massage-treatments/${t.slug}/`}
                      className="rounded-full border border-white/10 px-3 py-1.5 text-sm hover:border-[var(--crimson)]/40"
                    >
                      {t.name}
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          </section>
        ) : null}

        {areas.length ? (
          <section className="mt-10">
            <h2 className="font-display text-2xl text-[var(--off-white)]">
              Related areas
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {areas.map((a) =>
                a ? (
                  <li key={a.slug}>
                    <Link
                      href={areaPath(a.slug)}
                      className="rounded-full border border-white/10 px-3 py-1.5 text-sm hover:border-[var(--crimson)]/40"
                    >
                      Massage in {a.name}
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          </section>
        ) : null}

        {masseuses.length ? (
          <section className="mt-10">
            <h2 className="font-display text-2xl text-[var(--off-white)]">
              Masseuses to request
            </h2>
            <ul className="mt-4 space-y-2">
              {masseuses.map((m) =>
                m ? (
                  <li key={m.slug}>
                    <Link
                      href={`/masseuses/${m.slug}/`}
                      className="hover:text-[var(--crimson)]"
                    >
                      {m.name} — {m.tagline}
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          </section>
        ) : null}

        <section className="mt-14">
          <h2 className="font-display text-2xl text-[var(--crimson)]">FAQs</h2>
          <div className="mt-4 space-y-3">
            {g.faqs.map((f) => (
              <details
                key={f.q}
                className="rounded-lg border border-white/10 px-4 py-3"
              >
                <summary className="cursor-pointer">{f.q}</summary>
                <p className="mt-2 text-sm text-[var(--muted)]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {moreGuides.length ? (
          <section className="mt-14">
            <h2 className="font-display text-2xl text-[var(--off-white)]">
              Keep reading
            </h2>
            <ul className="mt-4 space-y-2">
              {moreGuides.map((x) =>
                x ? (
                  <li key={x.slug}>
                    <Link
                      href={guidePath(x.slug)}
                      className="text-[var(--crimson)] hover:underline"
                    >
                      {x.title}
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          </section>
        ) : null}

        <div className="mt-12">
          <CtaRow
            message={`Hi, I read "${g.title}" and I'd like to book at Kilimani Hot Massage.`}
          />
        </div>
        <p className="mt-8 text-sm text-[var(--muted)]">
          <Link href="/guides/" className="hover:text-[var(--crimson)]">
            ← All guides
          </Link>
        </p>
      </article>
    </>
  );
}
