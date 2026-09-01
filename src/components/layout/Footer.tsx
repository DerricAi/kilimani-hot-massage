import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";
import { site, whatsappLink } from "@/content/site";
import { MapEmbed } from "@/components/seo/MapEmbed";

export function Footer({ showMap = true }: { showMap?: boolean }) {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[var(--charcoal)]/95 pb-24 md:pb-8">
      {showMap ? (
        <div className="border-b border-white/10">
          <div className="section-pad mx-auto grid max-w-7xl gap-8 py-12 md:grid-cols-5 md:py-16">
            <div className="md:col-span-3">
              <MapEmbed className="h-[260px] w-full md:h-[320px]" />
            </div>
            <div className="flex flex-col justify-center md:col-span-2">
              <p className="font-display text-3xl text-[var(--crimson)]">Find us</p>
              <h3 className="mt-1 font-display text-2xl text-[var(--off-white)]">
                Visit our Kilimani spa
              </h3>
              <p className="mt-3 text-sm text-[var(--muted)]">
                {site.addressLine} · {site.hoursLabel}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={site.mapsShort}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center rounded-md bg-[var(--crimson)] px-4 text-sm font-semibold text-[var(--charcoal)]"
                >
                  Get directions
                </a>
                <a
                  href={whatsappLink("Hi Kilimani Hot Massage, I'd like to book.")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center rounded-md border border-[var(--crimson)]/40 px-4 text-sm"
                >
                  WhatsApp us
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="section-pad mx-auto grid max-w-7xl gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="font-display text-3xl text-[var(--crimson)]">
            Kilimani Hot Massage
          </Link>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--muted)]">
            Premium massage spa on Marcus Garvey Rd, Kilimani. Open 24/7 for guests
            across Nairobi County, from Kilimani and Westlands to Karen and the CBD.
          </p>
          <p className="mt-4 text-sm font-medium text-[var(--off-white)]/90">
            {site.napFooter}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--off-white)]">
            Visit
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--crimson)]" />
              {site.addressLine}
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--crimson)]" />
              <a href={`tel:${site.phoneTel}`} className="hover:text-[var(--crimson)]">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--crimson)]" />
              {site.hoursShort} every day
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--off-white)]">
            Explore
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
            <li>
              <Link href="/massage-treatments/" className="hover:text-[var(--crimson)]">
                Massage treatments
              </Link>
            </li>
            <li>
              <Link href="/areas/" className="hover:text-[var(--crimson)]">
                Areas we serve
              </Link>
            </li>
            <li>
              <Link href="/masseuses/" className="hover:text-[var(--crimson)]">
                Masseuses
              </Link>
            </li>
            <li>
              <Link href="/guides/" className="hover:text-[var(--crimson)]">
                Guides
              </Link>
            </li>
            <li>
              <Link href="/about-us/" className="hover:text-[var(--crimson)]">
                About us
              </Link>
            </li>
            <li>
              <Link href="/contact/" className="hover:text-[var(--crimson)]">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-[var(--muted)]">
        © {new Date().getFullYear()} Kilimani Hot Massage · Marcus Garvey Rd, Nairobi
      </div>
    </footer>
  );
}
