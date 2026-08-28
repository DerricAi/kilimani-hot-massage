import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { TopBar, Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab, MobileDock } from "@/components/cta/Conversion";
import { JsonLd } from "@/components/seo/MapEmbed";
import { daySpaJsonLd } from "@/lib/schema";
import { site } from "@/content/site";
import { profTitleHome } from "@/lib/seo-titles";

const defaultTitle = profTitleHome();

const sans = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const display = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: `%s | ${site.name}`,
  },
  description:
    "BEST Massage Spa Kilimani Nairobi — Swedish, deep tissue, Nuru, couples & more near me on Marcus Garvey Rd. Open 24/7. Call 0746 203398.",
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: `${site.url}/`,
    siteName: site.name,
    title: defaultTitle,
    description:
      "BEST Massage Spa Kilimani on Marcus Garvey Rd. Open 24/7. Call or WhatsApp 0746 203398.",
    images: [{ url: "/images/og-kilimani-hot-massage.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description:
      "BEST Massage Spa Kilimani on Marcus Garvey Rd. Open 24/7. Call or WhatsApp 0746 203398.",
    images: ["/images/og-kilimani-hot-massage.webp"],
  },
  alternates: { canonical: `${site.url}/` },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <JsonLd data={daySpaJsonLd()} />
        <TopBar />
        <Header />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <WhatsAppFab />
        <MobileDock />
      </body>
    </html>
  );
}
