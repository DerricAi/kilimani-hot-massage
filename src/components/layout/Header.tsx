import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";
import { site, whatsappLink } from "@/content/site";

const nav = [
  { href: "/", label: "Home" },
  { href: "/massage-treatments/", label: "Massage Treatments" },
  { href: "/masseuses/", label: "Massage Therapists" },
  { href: "/areas/", label: "Areas We Serve" },
  { href: "/guides/", label: "Guides" },
  { href: "/about-us/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export function TopBar() {
  return (
    <div className="border-b border-white/5 bg-[var(--charcoal)]/90 text-center text-xs tracking-wide text-[var(--muted)] sm:text-sm">
      <p className="section-pad py-2">{site.topBar}</p>
    </div>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[var(--charcoal)]/85 backdrop-blur-md">
      <div className="section-pad mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 lg:h-20">
        <Link href="/" className="group flex flex-col leading-none">
          <span className="font-display text-xl text-[var(--crimson)] transition group-hover:text-[var(--crimson-light)] sm:text-2xl">
            Kilimani Hot Massage
          </span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
            Massage Spa · Nairobi
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[var(--off-white)]/80 transition hover:text-[var(--crimson)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phoneTel}`}
            className="hidden items-center gap-2 text-sm text-[var(--off-white)]/85 hover:text-[var(--crimson)] md:inline-flex"
          >
            <Phone className="h-4 w-4 text-[var(--crimson)]" />
            {site.phoneDisplay}
          </a>
          <a
            href={whatsappLink("Hi Kilimani Hot Massage, I'd like to book a session.")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center rounded-md bg-[var(--crimson)] px-3 text-xs font-semibold text-[var(--charcoal)] hover:bg-[var(--crimson-light)] sm:px-4 sm:text-sm"
          >
            Book Now
          </a>
          <details className="relative lg:hidden">
            <summary className="flex h-9 w-9 list-none items-center justify-center rounded-md border border-white/10 [&::-webkit-details-marker]:hidden">
              <Menu className="h-5 w-5" />
            </summary>
            <div className="absolute right-0 mt-2 w-56 rounded-lg border border-white/10 bg-[var(--charcoal-soft)] p-3 shadow-xl">
              <div className="mb-2 flex justify-end text-[var(--muted)]">
                <X className="h-4 w-4" />
              </div>
              <nav className="flex flex-col gap-1">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-3 py-2 text-sm hover:bg-white/5 hover:text-[var(--crimson)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
