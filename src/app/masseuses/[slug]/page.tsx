import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { masseuses, getMasseuse } from "@/content/masseuses";
import { getTreatment } from "@/content/treatments";
import { areas, areaMasseusePath, TIER_A_SLUGS } from "@/content/areas";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/MapEmbed";
import { CtaRow } from "@/components/cta/Conversion";
import { absoluteUrl } from "@/content/site";
import { personJsonLd, faqJsonLd } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return masseuses.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const m = getMasseuse(slug);
  if (!m) return {};
  return {
    title: m.metaTitle,
    description: m.metaDescription,
    alternates: { canonical: absoluteUrl(`/masseuses/${m.slug}/`) },
  };
}

export default async function MasseusePage({ params }: Props) {
  const { slug } = await params;
  const m = getMasseuse(slug);
  if (!m) notFound();

  const specialtyTreatments = m.specialties
    .map((s) => getTreatment(s))
    .filter(Boolean);
  const nearby = TIER_A_SLUGS.slice(0, 6)
    .map((s) => areas.find((a) => a.slug === s))
    .filter(Boolean) as typeof areas;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Masseuses", url: absoluteUrl("/masseuses/") },
            { name: m.name, url: absoluteUrl(`/masseuses/${m.slug}/`) },
          ]),
          personJsonLd({
            name: m.name,
            url: absoluteUrl(`/masseuses/${m.slug}/`),
            knowsAbout: specialtyTreatments.map((t) => t!.name),
          }),
          faqJsonLd(m.faqs),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Masseuses", href: "/masseuses/" },
          { name: m.name },
        ]}
      />
      <article className="section-pad mx-auto max-w-3xl py-10">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--crimson)]/15 font-display text-4xl text-[var(--crimson)]">
          {m.name[0]}
        </div>
        <h1 className="mt-6 font-display text-4xl text-[var(--off-white)] sm:text-5xl">
          {m.h1}
        </h1>
        <p className="mt-4 text-lg text-[var(--muted)]">{m.shortBio}</p>
        <div className="mt-6">
          <CtaRow
            message={`Hi, I'd like to book with ${m.name} at Kilimani Hot Massage.`}
          />
        </div>
        <div className="prose-spa mt-10">
          {m.longBio.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>

        <h2 className="mt-12 font-display text-2xl text-[var(--crimson)]">Specialties</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {specialtyTreatments.map((t) =>
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

        <p className="mt-6 text-sm text-[var(--muted)]">
          Languages: {m.languages.join(", ")}
        </p>

        <h2 className="mt-12 font-display text-2xl text-[var(--crimson)]">
          Book {m.name} from nearby areas
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {nearby.map((a) => (
            <li key={a.slug}>
              <Link
                href={areaMasseusePath(a.slug, m.slug)}
                className="rounded-full border border-white/10 px-3 py-1.5 text-sm hover:border-[var(--crimson)]/40"
              >
                {m.name} in {a.name}
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="mt-12 font-display text-2xl text-[var(--crimson)]">FAQs</h2>
        <div className="mt-4 space-y-3">
          {m.faqs.map((f) => (
            <details key={f.q} className="rounded-lg border border-white/10 px-4 py-3">
              <summary className="cursor-pointer">{f.q}</summary>
              <p className="mt-2 text-sm text-[var(--muted)]">{f.a}</p>
            </details>
          ))}
        </div>
      </article>
    </>
  );
}
