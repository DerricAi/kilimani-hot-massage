import type { Metadata } from "next";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/MapEmbed";
import { CtaRow } from "@/components/cta/Conversion";
import { absoluteUrl, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { profTitleHub } from "@/lib/seo-titles";

export const metadata: Metadata = pageMetadata({
  title: profTitleHub("about"),
  description:
    "About Kilimani Hot Massage: premium 24/7 massage spa on Marcus Garvey Rd, Kilimani, Nairobi.",
  path: "/about-us/",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: absoluteUrl("/") },
          { name: "About us", url: absoluteUrl("/about-us/") },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "About us" },
        ]}
      />
      <article className="section-pad mx-auto max-w-3xl py-10">
        <h1 className="font-display text-4xl text-[var(--off-white)] sm:text-5xl">
          About Kilimani Hot Massage
        </h1>
        <div className="prose-spa mt-8">
          <p>
            Kilimani Hot Massage is a private massage spa on Marcus Garvey Rd in
            Kilimani, Nairobi. We designed the studio for guests who want calm rooms,
            trained therapists, and true 24/7 availability, without hotel-spa formality.
          </p>
          <p>
            Our menu spans classic Swedish and deep tissue through aromatherapy and hot
            stone, plus discreet adult-oriented sessions including Nuru, body-to-body,
            tantric ritual, and lingam. Every booking is consent-led and privacy-first.
          </p>
          <p>
            Guests visit from Kilimani, Kileleshwa, Westlands, Upper Hill, Karen, the CBD,
            and across Nairobi County. Whether you are five minutes from Yaya Centre or
            driving in from Embakasi, WhatsApp us and we will have a suite ready.
          </p>
          <p>
            NAP never changes: <strong>{site.napFooter}</strong>. Open 24 hours, seven days
            a week.
          </p>
        </div>
        <div className="mt-10">
          <CtaRow message="Hi, I'd like to learn more and book at Kilimani Hot Massage." />
        </div>
      </article>
    </>
  );
}
