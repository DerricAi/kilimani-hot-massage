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
import { pageMetadata } from "@/lib/seo";
import { FaqAccordion } from "@/components/seo/FaqAccordion";
import { faqJsonLd } from "@/lib/schema";
import { profTitleHome } from "@/lib/seo-titles";

const homeTitle = profTitleHome();

export const metadata: Metadata = pageMetadata({
  title: homeTitle,
  description:
    "Massage Kilimani & Spa Kilimani on Marcus Garvey Rd, massage near me, massage spa near me, Swedish, Nuru, full body & couples. Open 24/7. Call or WhatsApp 0746 203398.",
  path: "/",
});

const homeFaqs = [
  {
    q: "Is there a massage spa near me in Kilimani?",
    a: "Yes. Kilimani Hot Massage is a massage spa near me on Marcus Garvey Rd, steps from Yaya Centre and Adlife Plaza. Swedish, Nuru, full body, couples, and private suites run 24/7. WhatsApp 0746 203398 with your ETA.",
  },
  {
    q: "Do you offer private massage rooms near me on Marcus Garvey Rd?",
    a: "Every booking gets a locked private massage room near me, not a shared hotel lobby or mall cubicle. Suites on Marcus Garvey Rd include shower access, fresh linens, and discreet street parking. Message before you leave Kilimani or Westlands.",
  },
  {
    q: "Can I book a masseuse near me tonight?",
    a: "Yes, name Amara, Zuri, Aisha, Nuri, Keisha, or Lina when you WhatsApp 0746 203398. We staff a masseuse near me any hour, including post-midnight from Ngong Rd dinners or Upper Hill deadlines.",
  },
  {
    q: "Where exactly is the spa on Marcus Garvey Rd?",
    a: "Kilimani Hot Massage sits on Marcus Garvey Rd in Kilimani, between Yaya Centre, Adlife Plaza, and the Valley Arcade corridor. WhatsApp 0746 203398 for a pin if your driver knows the neighbourhood but not the gate.",
  },
  {
    q: "Do you really stay open all night?",
    a: "Yes, twenty-four hours, seven days. Kilimani dinner crowds, redeye flights, and Upper Hill deadline nights all book past midnight. Same reception line at 3 p.m. or 3 a.m.",
  },
  {
    q: "What's the fastest way to book?",
    a: "WhatsApp is quickest: send treatment, preferred therapist (optional), and time window. Call 0746 203398 if you prefer voice, we confirm suite and therapist before you leave Yaya or Junction.",
  },
  {
    q: "Which neighbourhoods drive to you most?",
    a: "Kilimani and Kileleshwa are five to ten minutes; Westlands, Upper Hill, Lavington, Hurlingham, and Karen are common too. Browse Areas we serve for ward-level pages with local directions.",
  },
  {
    q: "Can I ask for Amara, Zuri, or another therapist?",
    a: "Always. Name Amara, Zuri, Aisha, Nuri, Keisha, or Lina when you message. If she is in session we quote the next slot or suggest a colleague with the same specialty.",
  },
  {
    q: "Do you have couples rooms and four-hands?",
    a: "Yes, side-by-side couples tables and four-hands upgrades with paired staff. Weekend evenings from Wood Avenue and Ngong Rd fill early; weekday lunch slots are easier.",
  },
  {
    q: "Where do I park on Marcus Garvey Rd?",
    a: "Street and side-lane parking is usually available, message when you are five minutes out and we suggest the quietest pull-off for your vehicle size.",
  },
  {
    q: "First visit, what happens at the door?",
    a: "Brief check-in, pressure and boundary chat, then your suite. Robes, showers, and water are ready. Read our first-visit guide or ask anything on WhatsApp before you travel.",
  },
];

const whyKilimani = [
  "Locked private suites, not mall cubicles with lobby noise",
  "Marcus Garvey Rd address you can pin in ride-hail apps",
  "Six named therapists across Swedish, Nuru, couples, and sports recovery",
  "Twelve modalities without sending you to a second location",
  "Same phone line 0746 203398 day, night, and holidays",
];

const featuredAreas = [
  "kilimani",
  "kileleshwa",
  "lavington",
  "westlands",
  "upper-hill",
  "karen",
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />

      <section className="relative overflow-hidden border-b border-[var(--crimson)]/15">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(200,56,90,0.22), transparent 50%), radial-gradient(circle at 80% 0%, rgba(36,36,36,0.8), transparent 40%), linear-gradient(135deg, rgba(18,18,18,0.3), rgba(18,18,18,0.92))",
          }}
        />
        <div className="section-pad relative mx-auto grid max-w-7xl items-center gap-8 py-8 lg:min-h-[90vh] lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div className="order-2 animate-fade-up lg:order-1">
            <h1 className="font-display text-4xl leading-[1.05] text-[var(--off-white)] sm:text-5xl lg:text-6xl">
              Massage Spa Kilimani
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Private apartment on Marcus Garvey Rd, minutes from Yaya Centre. Swedish, deep tissue,
              Nuru, and erotic Massage, booked on WhatsApp.
            </p>
            <div className="mt-8">
              <CtaRow />
            </div>
          </div>
          <div className="order-1 animate-fade-up-delay relative lg:order-2">
            <div className="relative min-h-[52vh] overflow-hidden rounded-2xl border border-[var(--crimson)]/25 shadow-[0_24px_80px_rgba(200,56,90,0.12)] lg:min-h-0 lg:h-[440px]">
              <Image
                src={media.hero.src}
                alt={media.hero.alt}
                fill
                priority
                unoptimized
                className="object-cover object-[center_20%]"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad mx-auto max-w-7xl py-20">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--crimson)]">
              Our massage girls
            </p>
            <h2 className="mt-3 font-display text-3xl text-[var(--off-white)] sm:text-4xl">
              Massage Therapists in Kilimani
            </h2>
            <p className="mt-3 max-w-xl text-[var(--muted)]">
              Amara, Zuri, Aisha, Nuri, Keisha, and Lina work from Marcus Garvey Rd, name your
              preference on WhatsApp and we staff the suite accordingly.
            </p>
          </div>
          <Link
            href="/masseuses/"
            className="text-sm text-[var(--crimson)] hover:underline"
          >
            Full therapist profiles →
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {masseuses.map((m) => (
            <Link
              key={m.slug}
              href={`/masseuses/${m.slug}/`}
              className="glass-card group rounded-xl p-6 transition hover:border-[var(--crimson)]/40"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--crimson)]/15 font-display text-2xl text-[var(--crimson-light)] transition group-hover:bg-[var(--crimson)]/25">
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
          Spa near me on Marcus Garvey Rd
        </h2>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Spa Kilimani guests and spa near me searches land here, street-front suites with Swedish,
          Nuru, full body, couples, and adult sessions. Pick a treatment below or WhatsApp 0746
          203398 for the fastest slot.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {["swedish-massage", "full-body-massage", "nuru-massage", "couples-massage"].map(
            (slug) => {
              const t = treatments.find((x) => x.slug === slug);
              if (!t) return null;
              return (
                <Link
                  key={slug}
                  href={`/massage-treatments/${slug}/`}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-[var(--off-white)]/85 hover:border-[var(--crimson)]/50 hover:text-[var(--crimson-light)]"
                >
                  {t.name}
                </Link>
              );
            }
          )}
        </div>
      </section>

      <section className="bg-[var(--charcoal-soft)]/50 py-20">
        <div className="section-pad mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--crimson)]">
            Massage menu
          </p>
          <h2 className="mt-3 font-display text-3xl text-[var(--off-white)] sm:text-4xl">
            Treatments on Marcus Garvey Rd
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--muted)]">
            Pick a modality. Each links to a full Kilimani guide with FAQs, therapist matches,
            and area combo pages across Nairobi.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {treatments.map((t) => (
              <Link
                key={t.slug}
                href={`/massage-treatments/${t.slug}/`}
                className="glass-card rounded-xl p-5 transition hover:border-[var(--crimson)]/40"
              >
                <h3 className="font-display text-lg text-[var(--crimson-light)]">
                  {t.name}
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{t.tagline}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/massage-treatments/"
              className="text-sm text-[var(--crimson)] hover:underline"
            >
              Compare all massage treatments →
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad mx-auto max-w-7xl py-20">
        <h2 className="font-display text-3xl text-[var(--off-white)] sm:text-4xl">
          Why Kilimani guests choose us
        </h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {whyKilimani.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-[var(--muted)]"
            >
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--crimson)]" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="section-pad mx-auto max-w-7xl py-16">
        <h2 className="font-display text-3xl text-[var(--off-white)] sm:text-4xl">
          Nairobi neighbourhoods we serve
        </h2>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Every ward gets its own landing page with local commute notes, treatment combos, and
          therapist links, start with Kilimani or browse the full county matrix.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {featuredAreas.map((slug) => {
            const a = areas.find((x) => x.slug === slug);
            if (!a) return null;
            return (
              <Link
                key={slug}
                href={areaPath(slug)}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-[var(--off-white)]/85 hover:border-[var(--crimson)]/50 hover:text-[var(--crimson-light)]"
              >
                {a.name}
              </Link>
            );
          })}
        </div>
        <div className="mt-6">
          <Link href="/areas/" className="text-sm text-[var(--crimson)] hover:underline">
            All Nairobi County areas →
          </Link>
        </div>
      </section>

      <section className="section-pad mx-auto max-w-7xl py-16">
        <h2 className="font-display text-3xl text-[var(--off-white)] sm:text-4xl">
          Kilimani massage guides
        </h2>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Modality comparisons, Yaya Centre directions, couples booking tips, and first-visit
          etiquette, written for Marcus Garvey Rd guests, not generic copy.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.slice(0, 6).map((g) => (
            <Link
              key={g.slug}
              href={guidePath(g.slug)}
              className="glass-card rounded-xl p-5 transition hover:border-[var(--crimson)]/40"
            >
              <h3 className="font-display text-lg text-[var(--crimson-light)]">{g.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{g.excerpt}</p>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/guides/" className="text-sm text-[var(--crimson)] hover:underline">
            Read all guides →
          </Link>
        </div>
      </section>

      <section className="section-pad mx-auto max-w-7xl py-16">
        <h2 className="font-display text-3xl text-[var(--off-white)]">
          Studio location: Kilimani
        </h2>
        <p className="mt-3 text-[var(--muted)]">{site.napFooter}</p>
        <div className="mt-8">
          <MapEmbed />
        </div>
      </section>

      <section className="section-pad mx-auto max-w-7xl py-16">
        <h2 className="font-display text-3xl text-[var(--off-white)]">
          Questions before you book
        </h2>
        <FaqAccordion
          faqs={homeFaqs}
          className="mt-8 space-y-4"
          detailsClassName="glass-card rounded-xl px-5 py-4"
          summaryClassName="cursor-pointer text-[var(--off-white)]"
          answerClassName="mt-3 text-sm text-[var(--muted)]"
        />
      </section>
    </>
  );
}
