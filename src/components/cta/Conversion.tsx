import { site, whatsappLink } from "@/content/site";
import { Phone } from "lucide-react";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink("Hello Kilimani Hot Massage, I'd like to book a session.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Book on WhatsApp"
      className="whatsapp-pulse fixed bottom-[calc(3.75rem+env(safe-area-inset-bottom,0px))] right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-2 ring-white/30 transition hover:scale-105 md:bottom-6 md:right-6"
    >
      <svg viewBox="0 0 32 32" className="h-8 w-8" fill="currentColor" aria-hidden>
        <path d="M16.003 3C9.374 3 4 8.373 4 14.999c0 2.295.643 4.44 1.756 6.27L4 29l7.918-1.715a11.96 11.96 0 0 0 4.085.713h.005C22.626 27.998 28 22.625 28 15.999 28 12.79 26.751 9.776 24.48 7.51A11.92 11.92 0 0 0 16.003 3Z" />
      </svg>
    </a>
  );
}

export function MobileDock() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-white/10 bg-[var(--charcoal)]/95 backdrop-blur md:hidden">
      <a
        href={`tel:${site.phoneTel}`}
        className="flex flex-1 items-center justify-center gap-2 py-3 text-sm font-semibold text-[var(--crimson)]"
      >
        <Phone className="h-4 w-4" />
        Call 0746 203398
      </a>
      <a
        href={whatsappLink("Hi, I'd like to book at Kilimani Hot Massage.")}
        target="_blank"
        rel="noreferrer"
        className="flex flex-1 items-center justify-center gap-2 bg-[#25D366] py-3 text-sm font-semibold text-white"
      >
        WhatsApp Us
      </a>
    </div>
  );
}

export function CtaRow({ message }: { message?: string }) {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={`tel:${site.phoneTel}`}
        className="inline-flex h-11 items-center rounded-md bg-[var(--crimson)] px-5 text-sm font-semibold text-[var(--charcoal)] hover:bg-[var(--crimson-light)]"
      >
        Call {site.phoneDisplay}
      </a>
      <a
        href={whatsappLink(
          message ?? "Hi Kilimani Hot Massage, I'd like to book a session."
        )}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-11 items-center rounded-md border border-[var(--crimson)]/50 px-5 text-sm font-semibold text-[var(--off-white)] hover:bg-[var(--crimson)]/10"
      >
        WhatsApp Us
      </a>
    </div>
  );
}
