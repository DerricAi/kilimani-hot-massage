#!/usr/bin/env node
/**
 * Best-effort GPS stamp for spa images near Marcus Garvey Rd / Kilimani.
 * Lat -1.293566, Lon 36.76345
 */
import { readdirSync, existsSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";

const LAT = -1.293566;
const LON = 36.76345;
const dir = join(process.cwd(), "public", "images");

if (!existsSync(dir)) {
  console.log("No public/images directory");
  process.exit(0);
}

const files = readdirSync(dir).filter((f) => /\.(jpe?g|webp|png)$/i.test(f));

let exiftool = false;
try {
  execSync("exiftool -ver", { stdio: "ignore" });
  exiftool = true;
} catch {
  console.log(
    "exiftool not found — documenting target GPS only. Install exiftool to write tags."
  );
}

for (const file of files) {
  const path = join(dir, file);
  if (exiftool) {
    try {
      execSync(
        `exiftool -overwrite_original -GPSLatitude=${Math.abs(LAT)} -GPSLatitudeRef=S -GPSLongitude=${LON} -GPSLongitudeRef=E "${path}"`,
        { stdio: "inherit" }
      );
      console.log("Tagged", file);
    } catch (e) {
      console.warn("Failed", file, e.message);
    }
  } else {
    console.log(`Would tag ${file} @ ${LAT},${LON}`);
  }
}

console.log("Done. Target GPS: Kilimani / Marcus Garvey Rd", LAT, LON);
