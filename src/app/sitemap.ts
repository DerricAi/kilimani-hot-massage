import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { treatments } from "@/content/treatments";
import { masseuses } from "@/content/masseuses";
import { guides, guidePath } from "@/content/guides";
import { areas, areaPath, areaServicePath, areaMasseusePath } from "@/content/areas";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/massage-treatments`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/masseuses`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/areas`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/guides`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${base}/about-us`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  for (const t of treatments) {
    entries.push({
      url: `${base}/massage-treatments/${t.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }
  for (const m of masseuses) {
    entries.push({
      url: `${base}/masseuses/${m.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }
  for (const g of guides) {
    entries.push({
      url: `${base}${guidePath(g.slug).replace(/\/$/, "")}`,
      lastModified: new Date(g.publishedAt),
      changeFrequency: "monthly",
      priority: 0.75,
    });
  }
  for (const a of areas) {
    entries.push({
      url: `${base}${areaPath(a.slug).replace(/\/$/, "")}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: a.tier === "A" ? 0.85 : 0.7,
    });
    for (const t of treatments) {
      entries.push({
        url: `${base}${areaServicePath(a.slug, t.slug).replace(/\/$/, "")}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
    for (const m of masseuses) {
      entries.push({
        url: `${base}${areaMasseusePath(a.slug, m.slug).replace(/\/$/, "")}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.55,
      });
    }
  }

  return entries;
}
