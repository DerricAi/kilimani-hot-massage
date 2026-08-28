import { site } from "@/content/site";

export function MapEmbed({
  className = "h-[320px] w-full",
  title = "Kilimani Hot Massage on Marcus Garvey Rd, Kilimani, Nairobi",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--bronze)]/20 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <iframe
        title={title}
        src={site.mapsEmbed}
        className={className}
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
