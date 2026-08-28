export type FaqItem = { q: string; a: string };

type FaqAccordionProps = {
  faqs: FaqItem[];
  className?: string;
  detailsClassName?: string;
  summaryClassName?: string;
  answerClassName?: string;
};

/** Semantic FAQ accordion — question as h3 inside summary for outline/SEO. */
export function FaqAccordion({
  faqs,
  className = "space-y-3",
  detailsClassName = "rounded-lg border border-white/10 px-4 py-3",
  summaryClassName = "cursor-pointer",
  answerClassName = "mt-2 text-sm text-[var(--muted)]",
}: FaqAccordionProps) {
  return (
    <div className={className}>
      {faqs.map((f) => (
        <details key={f.q} className={detailsClassName}>
          <summary className={summaryClassName}>
            <h3 className="inline text-inherit font-medium">{f.q}</h3>
          </summary>
          <p className={answerClassName}>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
