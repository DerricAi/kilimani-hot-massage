#!/usr/bin/env python3
"""Differentiate Kilimani copy from lavingtonhotmassage.co.ke."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

TAGLINES = {
    "swedish-massage": "Classic effleurage and kneading—reset after Ngong Rd traffic or a Yaya Centre errand.",
    "deep-tissue-massage": "Slow, targeted pressure for trap knots, gym soreness, and Kilimani desk strain.",
    "nuru-massage": "Warm gel glide in a dim suite—full-body contact with clear consent checkpoints.",
    "body-to-body-massage": "Skin-to-skin flow with draping choices—discreet Marcus Garvey Rd adult sessions.",
    "four-hands-massage": "Two therapists, one rhythm—our most immersive upgrade on Wood Avenue nights.",
    "sensual-massage": "Adult-paced touch with consent at every stage—never rushed, never vague.",
    "couples-massage": "Twin tables, matched timing—book after Adlife Plaza or Junction dinners.",
    "aromatherapy-massage": "Scent you choose—lavender wind-down or citrus lift over warmed oil.",
    "hot-stone-massage": "Heated basalt on guarded shoulders—rainy-season favourite near Yaya Centre.",
    "tantric-massage": "Breath-led ritual pacing—slow build in a locked Kilimani suite.",
    "lingam-massage": "Male-focused wellness with clinical privacy—Marcus Garvey Rd, open 24/7.",
}

MASSEUSE_TAGLINES = {
    "amara": "Measured pressure, quiet suites—Swedish, deep tissue, and hot stone specialist.",
    "zuri": "Scent-led evenings and paired rooms—aromatherapy, couples, and four-hands.",
    "aisha": "Consent-first Nuru and sensual work—discreet Kilimani night sessions.",
    "nuri": "Tantric pacing and male wellness—Nuru, lingam, and breath-led ritual.",
    "keisha": "Firm sports recovery—deep tissue for gym days and Upper Hill desk neck.",
    "lina": "Synchronized four-hands with Zuri—couples and aromatherapy staging expert.",
}

# Replace identical cross-treatment boilerplate with slug-specific lines
BOILERPLATE_REPLACEMENTS = {
    "Hygiene and boundaries are clear from the first WhatsApp message to 0746 203398. We prepare oils, gel, stones, or aromatherapy blends before you arrive so transition from street to table is seamless. Whether you live near Lavington Mall or commute from Upper Hill, the standard is identical: premium touch, total privacy.": None,  # handled per slug below
}

PER_SLUG_HYGIENE = {
    "swedish-massage": "Fresh linens, unscented or aromatherapy oil warmed before you enter, and a two-minute pressure chat—that is how Swedish starts at Kilimani Hot Massage on Marcus Garvey Rd. Guests from Yaya Centre and Adlife Plaza step straight from ride-hail into a quiet suite without lobby queues.",
    "deep-tissue-massage": "Deep tissue here means slow warm-up strokes before any firm work—no cold-table surprises on Marcus Garvey Rd. We note injuries on WhatsApp 0746 203398 so your therapist stages heat, gel, or extra trap time before you arrive from Kilimani or Westlands.",
    "nuru-massage": "Nuru suites are prepared with gel temperature, airflow, and shower access checked before you walk in from Marcus Garvey Rd. Boundaries are confirmed in writing on WhatsApp when you book—standard for every Kilimani guest, whether local or visiting from Junction Mall.",
    "body-to-body-massage": "Body-to-body sessions lock the door, confirm consent lines, and only then begin oil or gel work—no ambiguity at our Marcus Garvey Rd studio. Discreet entry from Ring Rd Kilimani or Wood Avenue; reception never announces guest names aloud.",
    "four-hands-massage": "Four-hands bookings require paired therapists on the same shift—we confirm both names on WhatsApp 0746 203398 before you leave Yaya Centre or Adlife Plaza. Rooms are widened and synchronized so elbows never compete for space on Marcus Garvey Rd.",
    "sensual-massage": "Sensual sessions use low light, clear stop words, and therapist-led pacing—professional adult touch without crude atmosphere. Kilimani Hot Massage on Marcus Garvey Rd keeps the tone spa-first; boundaries are reconfirmed at the door every visit.",
    "couples-massage": "Couples rooms receive twin fresh setups—two tables, two oil warmers, matched start times. Tell us if partners want different modalities when you WhatsApp from Kilimani, Kileleshwa, or after dinner on Ngong Rd.",
    "aromatherapy-massage": "Blends are mixed after your scent preference is noted—never overpowering in our small Marcus Garvey Rd suites. Unscented oil remains available for guests sensitive after a day in air-conditioned Kilimani offices.",
    "hot-stone-massage": "Basalt stones are heated to skin-safe temperature before you arrive—especially important on cool Kilimani evenings after rain. Stone layout is discussed during intake so shoulders or lumbar get priority based on your commute from Yaya or Valley Arcade.",
    "tantric-massage": "Tantric ritual begins with breath alignment and consent—not performance. Marcus Garvey Rd suites stay private and quiet; guests from Kilimani flats and Westlands hotels receive the same unhurried introduction.",
    "lingam-massage": "Lingam-focused work is booked as male wellness with clinical privacy—locked suite, no waiting-area exposure on Marcus Garvey Rd. WhatsApp 0746 203398 confirms duration and therapist match before you travel from Upper Hill or the CBD.",
}

PER_SLUG_WHO_BOOKS = {
    "swedish-massage": "Swedish draws Kilimani remote workers after balcony-laptop weeks, Kileleshwa parents on school-break mornings, and Westlands consultants who want predictable full-body calm without intensity. First-timers from Adlife Plaza offices often choose Swedish because the sequence feels familiar and complete.",
    "deep-tissue-massage": "Deep tissue fills weekday books for Ngong Rd commuters, CrossFit regulars off Ring Rd Kilimani, and Upper Hill bankers carrying trap tension. Many guests alternate: deep tissue after gym, Swedish on recovery days—same Marcus Garvey Rd suite, different pacing.",
    "nuru-massage": "Nuru guests include discreet professionals from Kilimani towers, couples exploring shared sessions, and travellers who want gel-based glide without hotel-spa visibility. Aisha and Nuri are frequently requested when guests WhatsApp from Yaya Centre after midnight.",
    "body-to-body-massage": "Body-to-body suits guests who want continuous contact and clear adult framing—common among Westlands hotel stays and Kilimani residents who prefer locked-suite privacy over mall spas. Book Aisha when you want consent-led pacing explained before hands begin.",
    "four-hands-massage": "Four-hands is a birthday and anniversary upgrade—Zuri and Lina pair most often. Kilimani couples message after Wood Avenue dinners; solo guests book four-hands when they want immersive rhythm without managing two separate appointments.",
    "sensual-massage": "Sensual bookings peak on Friday and Saturday nights from Kilimani, Lavington, and Hurlingham—guests who want adult touch with spa hygiene standards. Aisha handles many sensual requests; boundaries are set in the first five minutes every time.",
    "couples-massage": "Couples massage is our strongest date-night SKU near Yaya Centre—partners mix Swedish and deep tissue in one room. Zuri stages shared suites; book forty-eight hours ahead on Valentine weekends when Marcus Garvey Rd parking fills early.",
    "aromatherapy-massage": "Aromatherapy fits stress-heavy weeks in Kilimani co-working spaces and quiet Sunday resets from Kileleshwa compounds. Zuri and Lina adjust blends for scent sensitivity—citrus for alertness, lavender for sleep-focused evenings.",
    "hot-stone-massage": "Hot stone spikes when Nairobi rains cool Ring Rd Kilimani flats—guests want heat before hands. Amara often pairs stones with Swedish back work; mention guarded shoulders when booking after Adlife Plaza meetings.",
    "tantric-massage": "Tantric draws guests curious about breath-led ritual—not rushed adult novelty. Nuri paces sessions slowly; ideal after travel or high-stress project weeks when Kilimani professionals want downshift without losing structure.",
    "lingam-massage": "Lingam wellness bookings come from Upper Hill executives and Westlands residents who want male-focused work without clinical coldness. Nuri leads most lingam sessions; WhatsApp confirms therapist and duration before Marcus Garvey Rd arrival.",
}

PER_SLUG_DIRECTIONS = {
    "swedish-massage": "Find us on Marcus Garvey Rd in Kilimani—pin “Kilimani Hot Massage” for ride-hail. From Yaya Centre, James Gichuru northbound is often fastest; from Adlife Plaza, cut via Wood Avenue toward Ngong Rd connectors. Message 0746 203398 with your landmark and we hold your Swedish suite.",
    "deep-tissue-massage": "Deep tissue guests often arrive from Upper Hill via Haile Selassie or from Westlands via James Gichuru—both merge toward Marcus Garvey Rd. Allow ten minutes at evening peak; we adjust room holds when you text from Junction Mall or Valley Arcade.",
    "nuru-massage": "Nuru sessions need shower access—arrive five minutes early if first visit. Drivers know Marcus Garvey Rd near Yaya Centre; mention Kilimani Hot Massage, not generic Kilimani pins that drift toward Westlands.",
    "body-to-body-massage": "Discreet arrivals: use rear street parking when instructed on WhatsApp. Marcus Garvey Rd sits between Yaya Centre energy and Valley Arcade calm—ideal for guests who want low visibility.",
    "four-hands-massage": "Four-hands requires both therapists on site—confirm pairing when you book from Kilimani or Lavington. Parking two cars is possible on side streets off Marcus Garvey Rd on weeknights.",
    "sensual-massage": "Sensual bookings: WhatsApp preferred for initial questions. Studio entrance on Marcus Garvey Rd; we send a location pin after time confirmation—helpful for first-time Kilimani visitors.",
    "couples-massage": "Couples often dine near Yaya Centre then ride five minutes to Marcus Garvey Rd—message when you pay the bill and we warm both tables. Junction Mall shoppers use the same pattern on Sunday afternoons.",
    "aromatherapy-massage": "Aromatherapy guests from Kileleshwa approach via Ring Rd or Mandera Rd into Marcus Garvey Rd. Mention scent allergies on WhatsApp so blends are ready—not mixed at the door.",
    "hot-stone-massage": "Hot stone needs stone staging time—book at least an hour ahead when possible. Rainy-season Kilimani traffic slows Ngong Rd; James Gichuru alternate saves minutes to Marcus Garvey Rd.",
    "tantric-massage": "Tantric sessions are unhurried—avoid stacking immediate meetings after. Marcus Garvey Rd studio is five to twelve minutes from most Kilimani and Kileleshwa addresses off-peak.",
    "lingam-massage": "Lingam wellness: confirm therapist gender preference on WhatsApp 0746 203398. Marcus Garvey Rd location keeps CBD and Upper Hill drives under twenty minutes at night.",
}

OLD_HYGIENE = "Hygiene and boundaries are clear from the first WhatsApp message to 0746 203398. We prepare oils, gel, stones, or aromatherapy blends before you arrive so transition from street to table is seamless. Whether you live near Lavington Mall or commute from Upper Hill, the standard is identical: premium touch, total privacy."

OLD_WHO = re.compile(
    r"[A-Za-z /]+ draws solo professionals, couples, and travellers from across Nairobi County\. Lavington neighbours walk over; Kilimani and Kileleshwa clients pass Yaya Centre; Westlands guests cut via James Gichuru when lanes are clear\. Upper Hill executives book late slots when meetings finally end\.",
    re.MULTILINE,
)

OLD_INTL = "International guests comparing Nairobi spas to Dubai or Bangkok standards frequently pick Kilimani Hot Massage for {key} because we combine discretion with genuine skill. Local landmarks—Lavington Mall, Valley Arcade, Yaya Centre—help drivers find us fast even if you are new to the city."

OLD_STUDIO = re.compile(
    r"Our studio sits on Marcus Garvey Rd, Kilimani, between Lavington Green and corridors leading to Valley Arcade and Yaya Centre\. From Kilimani, follow Ngong Rd toward Kilimani; from Kileleshwa, James Gichuru or Denis Pritt depending on jams\. Westlands routes often use James Gichuru southbound; Upper Hill drivers may loop via Ngong Rd\.",
    re.MULTILINE,
)

OLD_RIDE = "Ride-hail drivers usually know Marcus Garvey Rd once you mention Lavington Mall or Valley Arcade. Save 0746 203398 in your phone before travelling; we send pin-friendly directions on WhatsApp. Parking is simpler than CBD spas—still, share ETA when you book {key} after dark for smooth entry."

OLD_AFTER = "After {key}, neighbouring cafes at Yaya Centre or shops at Lavington Mall let you extend a relaxed evening—or head straight home to Kilimani or Kileleshwa for sleep."


def update_treatments():
    path = ROOT / "src/content/treatments.ts"
    text = path.read_text()
    for slug, tagline in TAGLINES.items():
        # update tagline line after slug block - find slug and next tagline
        pattern = rf'(slug: "{slug}",\s*\n\s*name:.*?\n\s*shortName:.*?\n\s*)tagline: "[^"]+",'
        text = re.sub(pattern, rf'\1tagline: "{tagline}",', text, count=1, flags=re.DOTALL)
        if OLD_HYGIENE in text and slug in PER_SLUG_HYGIENE:
            text = text.replace(OLD_HYGIENE, PER_SLUG_HYGIENE[slug], 1)
    path.write_text(text)
    print("Updated treatments.ts taglines + first hygiene block pass")


def update_masseuses():
    path = ROOT / "src/content/masseuses.ts"
    text = path.read_text()
    for slug, tagline in MASSEUSE_TAGLINES.items():
        text = re.sub(
            rf'(slug: "{slug}",\s*\n\s*name:.*?\n\s*)tagline: "[^"]+",',
            rf'\1tagline: "{tagline}",',
            text,
            count=1,
            flags=re.DOTALL,
        )
    text = text.replace("cool Lavington evenings", "cool Kilimani evenings")
    path.write_text(text)
    print("Updated masseuses.ts taglines")


def fix_argwings():
    for rel in [
        "src/content/areas/enrichment.ts",
        "src/app/masseuses/page.tsx",
    ]:
        path = ROOT / rel
        if not path.exists():
            continue
        text = path.read_text()
        text = text.replace("Argwings Kodhek Rd studio", "Marcus Garvey Rd studio")
        text = text.replace("our Argwings\n          Kodhek Rd studio", "our Marcus Garvey Rd studio")
        text = text.replace("the Argwings place", "the Marcus Garvey spa")
        text = text.replace("Argwings escape", "Marcus Garvey escape")
        text = text.replace("Argwings bound", "Marcus Garvey Rd bound")
        text = text.replace("'Argwings spa'", "'Kilimani spa'")
        text = text.replace("commuting Argwings", "commuting to Marcus Garvey Rd")
        text = text.replace("Argwings slots", "Marcus Garvey Rd slots")
        text = text.replace("Argwings rooms", "Marcus Garvey Rd rooms")
        text = text.replace("Argwings gate", "Marcus Garvey Rd gate")
        text = text.replace("Argwings massage", "Kilimani massage")
        text = text.replace("Argwings bookings", "Kilimani bookings")
        text = text.replace("first Lavington trip", "first Kilimani trip")
        path.write_text(text)
    print("Fixed Argwings references")


def fix_meta_titles():
    path = ROOT / "src/content/treatments.ts"
    text = path.read_text()
    text = re.sub(r"Lavington Nairobi", "Kilimani Nairobi", text)
    text = re.sub(r"Massage Lavington", "Massage Kilimani", text)
    text = re.sub(r"h1: \"Body-to-Body Massage Lavington\"", 'h1: "Body-to-Body Massage in Kilimani"', text)
    text = re.sub(r"Private suite with shower—discreet Lavington location", "Private suite with shower—discreet Kilimani location", text)
    text = re.sub(r"Climate-controlled room near Lavington Mall", "Climate-controlled room near Yaya Centre", text)
    text = re.sub(r"Central Lavington location near Yaya Centre", "Central Kilimani location near Yaya Centre", text)
    text = re.sub(r"reserving your Lavington suite", "reserving your Kilimani suite", text)
    path.write_text(text)
    print("Fixed treatment meta titles")


if __name__ == "__main__":
    update_treatments()
    update_masseuses()
    fix_argwings()
    fix_meta_titles()
