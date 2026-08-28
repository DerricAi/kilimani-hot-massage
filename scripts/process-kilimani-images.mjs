#!/usr/bin/env node
/**
 * Apply Kilimani-specific overlays so WebP hashes differ from Lavington copies.
 * Regenerates og-kilimani-hot-massage.webp from SVG.
 */
import sharp from "sharp";
import { readdirSync, existsSync, readFileSync } from "fs";
import { join } from "path";

const dir = join(process.cwd(), "public", "images");
const CRIMSON = { r: 200, g: 56, b: 90, alpha: 0.55 };

async function overlayKilimani(inputPath, outputPath) {
  const meta = await sharp(inputPath).metadata();
  const w = meta.width ?? 800;
  const h = meta.height ?? 600;
  const barH = Math.max(36, Math.round(h * 0.08));

  const barSvg = Buffer.from(`
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(200,56,90,0)"/>
          <stop offset="100%" stop-color="rgba(200,56,90,0.35)"/>
        </linearGradient>
      </defs>
      <rect x="0" y="${h - barH}" width="${w}" height="${barH}" fill="url(#g)"/>
      <rect x="0" y="${h - 4}" width="${w}" height="4" fill="#c8385a"/>
      <text x="16" y="${h - Math.round(barH * 0.35)}"
        font-family="Arial,sans-serif" font-size="${Math.max(14, Math.round(barH * 0.38))}"
        font-weight="600" fill="#f4f4f5">Marcus Garvey Rd | Kilimani</text>
    </svg>
  `);

  await sharp(inputPath)
    .composite([{ input: barSvg, top: 0, left: 0 }])
    .webp({ quality: 82 })
    .toFile(outputPath);
  console.log("Processed", outputPath);
}

async function exportOgWebp() {
  const svgPath = join(dir, "og-kilimani-hot-massage.svg");
  const outPath = join(dir, "og-kilimani-hot-massage.webp");
  await sharp(readFileSync(svgPath))
    .resize(1200, 630)
    .webp({ quality: 90 })
    .toFile(outPath);
  console.log("Exported OG webp", outPath);
}

const kilimaniWebps = readdirSync(dir).filter(
  (f) => f.includes("kilimani") && f.endsWith(".webp") && f !== "og-kilimani-hot-massage.webp"
);

async function main() {
  await exportOgWebp();
  for (const file of kilimaniWebps) {
    const input = join(dir, file);
    const tmp = join(dir, `.tmp-${file}`);
    await overlayKilimani(input, tmp);
    await sharp(tmp).toFile(input);
    const { unlinkSync } = await import("fs");
    unlinkSync(tmp);
  }
  // deep-tissue is shared nairobi name — overlay too
  const dt = join(dir, "deep-tissue-massage-nairobi.webp");
  if (existsSync(dt)) {
    const tmp = join(dir, ".tmp-deep.webp");
    await overlayKilimani(dt, tmp);
    await sharp(tmp).toFile(dt);
    const { unlinkSync } = await import("fs");
    unlinkSync(tmp);
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
