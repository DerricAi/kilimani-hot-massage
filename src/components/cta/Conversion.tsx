import { site, whatsappLink } from "@/content/site";
import { Phone } from "lucide-react";

export function CtaRow({ message }: { message?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      <a
        href={whatsappLink(
          message ?? "Hi Kilimani Hot Massage, I'd like to book a session."
        )}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-11 items-center rounded-md bg-[var(--crimson)] px-5 text-sm font-semibold text-[var(--charcoal)] hover:bg-[var(--crimson-light)]"
      >
        WhatsApp Us
      </a>
      <a
        href={`tel:${site.phoneTel}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--off-white)]/85 underline-offset-4 hover:text-[var(--crimson)] hover:underline"
      >
        <Phone className="h-4 w-4 text-[var(--crimson)]" />
        Call {site.phoneDisplay}
      </a>
    </div>
  );
}
