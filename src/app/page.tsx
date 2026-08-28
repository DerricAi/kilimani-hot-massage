import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { CtaRow } from "@/components/cta/Conversion";
import { MapEmbed, JsonLd } from "@/components/seo/MapEmbed";
import { treatments } from "@/content/treatments";
import { masseuses } from "@/content/masseuses";
import { areas, areaPath } from "@/content/areas";
import { guides, guidePath } from "@/content/guides";
import { site } from "@/content/site";
import { media } from "@/content/media";
import { faqJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title:
    "BEST Massage Spa Kilimani Nairobi - Swedish, Deep Tissue, Nuru, Couples & more near me | Kilimani Hot Massage",
  description:
    "Massage Spa Kilimani on Marcus Garvey Rd. Open 24/7. Swedish, deep tissue, Nuru, couples & more. Call or WhatsApp 0746 203398.",
  alternates: { canonical: `${site.url}/` },
};

const homeFaqs = [
  {
    q: "Where is Kilimani Hot Massage located?",
    a: "On Marcus Garvey Rd, Kilimani, Nairobi—near Yaya Centre, Adlife Plaza, and Valley Arcade.",
  },
  {
    q: "Are you open overnight?",
    a: "Yes. We are open 24 hours, seven days a week.",
  },
  {
    q: "How do I book?",
    a: "Call or WhatsApp 0746 203398. Tell us your treatment and preferred time.",
  },
  {
    q: "Which Nairobi areas do you serve?",
    a: "Guests visit from across Nairobi County—Kilimani, Kileleshwa, Westlands, Upper Hill, Karen, CBD, and more. See Areas we serve.",
  },
  {
    q: "Can I request a specific masseuse?",
    a: "Yes—ask for Amara, Zuri, Aisha, Nuru, Keisha, or Lina by name when you WhatsApp. If she is unavailable we suggest another specialist.",
  },
  {
    q: "Do you offer couples and four-hands massage?",
    a: "Yes. Couples side-by-side tables and four-hands sessions are available 24/7—book both therapists in one message.",
  },
  {
    q: "Is parking available near the spa?",
    a: "Street and nearby lot options exist along Marcus Garvey Rd. WhatsApp us on arrival if you need a quick landmark tip from Yaya or Valley Arcade.",
  },
  {
    q: "What should first-time guests expect?",
    a: "Private suite, pressure check, and a clear conversation about boundaries. Read our first-visit guide or ask on WhatsApp before you arrive.",
  },
];

const featuredAreas = [
  "lavington",
  "kilimani",
  "kileleshwa",
  "westlands",
  "upper-hill",
  "karen",
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />

      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 40%, rgba(200,56,90,0.25), transparent 45%), linear-gradient(120deg, rgba(18,21,26,0.2), rgba(18,21,26,0.85))",
          }}
        />
        <div className="section-pad relative mx-auto grid min-h-[88vh] max-w-7xl items-center py-16 lg:grid-cols-2 lg:gap-12">
          <div className="animate-fade-up">
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--bronze)]">
              Kilimani Hot Massage
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-[var(--off-white)] sm:text-5xl lg:text-6xl">
              Massage Spa Kilimani
            </h1>
            <p className="mt-5 max-w-xl text-base text-[var(--muted)] sm:text-lg">
              Private suites on Marcus Garvey Rd. Swedish, deep tissue, Nuru, couples,
              and signature sensual treatments—open 24/7 across Nairobi.
            </p>
            <div className="mt-8">
              <CtaRow />
            </div>
            <p className="mt-6 text-sm text-[var(--muted)]">{site.napFooter}</p>
          </div>
          <div className="animate-fade-up-delay relative mt-10 hidden h-[420px] overflow-hidden rounded-2xl border border-[var(--bronze)]/20 lg:block">
            <Image
              src={media.hero.src}
              alt={media.hero.alt}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)] via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="font-display text-3xl text-[var(--bronze)]">Open 24/7</p>
              <p className="mt-2 text-sm text-[var(--off-white)]/80">
                Marcus Garvey Rd · Near Yaya Centre & Adlife Plaza
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad mx-auto max-w-7xl py-16">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--bronze)]">
          Massage treatments
        </p>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          From classic Swedish to discreet signature sessions—book the modality that fits
          tonight.
        </p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {treatments.slice(0, 4).map((t) => (
            <div key={t.slug}>
              <h2 className="font-display text-2xl text-[var(--off-white)] sm:text-3xl">
                <Link
                  href={`/massage-treatments/${t.slug}/`}
                  className="hover:text-[var(--bronze)]"
                >
                  {t.name}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-[var(--muted)]">{t.tagline}</p>
              <Link
                href={`/massage-treatments/${t.slug}/`}
                className="mt-3 inline-block text-sm text-[var(--bronze)] hover:underline"
              >
                Book {t.shortName} →
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.slice(4).map((t) => (
            <Link
              key={t.slug}
              href={`/massage-treatments/${t.slug}/`}
              className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-[var(--bronze)]/40"
            >
              <h3 className="font-display text-xl text-[var(--bronze)] group-hover:text-[var(--bronze-light)]">
                {t.name}
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{t.tagline}</p>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/massage-treatments/" className="text-sm text-[var(--bronze)] hover:underline">
            View all massage treatments →
          </Link>
        </div>
      </section>

      <section className="section-pad mx-auto max-w-7xl py-16">
        <h2 className="font-display text-3xl text-[var(--off-white)] sm:text-4xl">
          Meet our massage therapists
        </h2>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Request your preferred therapist by name when you WhatsApp.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {masseuses.map((m) => (
            <Link
              key={m.slug}
              href={`/masseuses/${m.slug}/`}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-[var(--bronze)]/40"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--bronze)]/15 font-display text-2xl text-[var(--bronze)]">
                {m.name[0]}
              </div>
              <h3 className="mt-4 font-display text-xl text-[var(--off-white)]">{m.name}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{m.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-pad mx-auto max-w-7xl py-16">
        <h2 className="font-display text-3xl text-[var(--off-white)] sm:text-4xl">
          Areas we serve
        </h2>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Guests visit from across Nairobi County. Explore neighbourhood pages for services
          and masseuses near you.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {featuredAreas.map((slug) => {
            const a = areas.find((x) => x.slug === slug);
            if (!a) return null;
            return (
              <Link
                key={slug}
                href={areaPath(slug)}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-[var(--off-white)]/85 hover:border-[var(--bronze)]/50 hover:text-[var(--bronze)]"
              >
                {a.name}
              </Link>
            );
          })}
        </div>
        <div className="mt-6">
          <Link href="/areas/" className="text-sm text-[var(--bronze)] hover:underline">
            Browse all Nairobi areas →
          </Link>
        </div>
      </section>

      <section className="section-pad mx-auto max-w-7xl py-16">
        <h2 className="font-display text-3xl text-[var(--off-white)] sm:text-4xl">
          Guides
        </h2>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          First visits, Swedish vs deep tissue, booking 24/7, and more—written for Nairobi
          guests.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.slice(0, 6).map((g) => (
            <Link
              key={g.slug}
              href={guidePath(g.slug)}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-[var(--bronze)]/40"
            >
              <h3 className="font-display text-xl text-[var(--bronze)]">{g.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{g.excerpt}</p>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/guides/" className="text-sm text-[var(--bronze)] hover:underline">
            All massage guides →
          </Link>
        </div>
      </section>

      <section className="section-pad mx-auto max-w-7xl py-16">
        <h2 className="font-display text-3xl text-[var(--off-white)]">Find us in Kilimani</h2>
        <p className="mt-3 text-[var(--muted)]">{site.napFooter}</p>
        <div className="mt-8">
          <MapEmbed />
        </div>
      </section>

      <section className="section-pad mx-auto max-w-7xl py-16">
        <h2 className="font-display text-3xl text-[var(--off-white)]">FAQs</h2>
        <div className="mt-8 space-y-4">
          {homeFaqs.map((f) => (
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
    </>
  );
}
