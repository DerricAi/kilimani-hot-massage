#!/usr/bin/env python3
"""Dedupe and uniquify treatment page copy for Kilimani vs Lavington."""
import re
from pathlib import Path

path = Path(__file__).resolve().parents[1] / "src/content/treatments.ts"
text = path.read_text()

benefit_fixes = [
    ("Discreet Lavington location near Valley Arcade", "Discreet Marcus Garvey Rd suite near Adlife Plaza"),
    ("Central Lavington near Yaya Centre", "Central Kilimani on Marcus Garvey Rd near Yaya Centre"),
    ("Central Lavington location near Yaya Centre", "Central Kilimani location on Marcus Garvey Rd"),
    ("Private suite with shower—discreet Lavington location", "Private suite with shower—discreet Kilimani location on Marcus Garvey Rd"),
    ("Climate-controlled room near Lavington Mall", "Climate-controlled room near Yaya Centre and Adlife Plaza"),
    ("Near Valley Arcade and Lavington Mall for dinner-then-spa nights", "Near Yaya Centre and Wood Avenue for dinner-then-spa nights"),
    ("Private suites near Valley Arcade and Lavington Mall", "Private suites near Adlife Plaza and Valley Arcade"),
]

HEADINGS = {
    "swedish-massage": [
        ("What Swedish Massage Feels Like at Our Kilimani Spa", "Effleurage rhythm on Marcus Garvey Rd"),
        ("Your Session from Check-In to Aftercare", "Swedish session flow from door to shower"),
        ("Who Books Swedish Massage in Kilimani and Nearby Neighbourhoods", "Who books Swedish after Yaya Centre and Ngong Rd days"),
        ("Pressure, Oils, and How We Customise Your Swedish Session", "Pressure, oils, and custom Swedish on Wood Avenue nights"),
        ("Pairing Swedish with Other Massage Treatments", "Swedish plus hot stone, aromatherapy, or deep focus"),
        ("Finding Kilimani Hot Massage from Yaya Centre, Valley Arcade, and Beyond", "Directions from Yaya, Adlife Plaza, and Junction Mall"),
        ("Why Guests Return for Swedish at Our 24/7 Kilimani Studio", "Why Kilimani regulars rebook Swedish monthly"),
    ],
    "deep-tissue-massage": [
        ("What Deep Tissue Massage Is at Kilimani Hot Massage", "Deep tissue pressure map on Marcus Garvey Rd"),
        ("Your Deep Tissue Session from Arrival to Aftercare", "From warm-up strokes to trap release and aftercare"),
        ("Who Books Deep Tissue Massage in Kilimani and Nairobi", "Desk neck, gym DOMS, and Ngong Rd drivers who book deep tissue"),
        ("How We Customise Every Deep Tissue Appointment", "Custom zones: traps, lumbar, IT band, hip flexors"),
        ("Pairing Deep Tissue with Other Treatments", "Deep tissue hybrids with Swedish and hot stone"),
        ("Getting Here from Yaya Centre, Valley Arcade, and Ngong Rd", "Commute tips from Upper Hill, Westlands, and Kilimani"),
        ("Why Guests Return for Deep Tissue at Our 24/7 Studio", "Why deep tissue becomes a fortnightly Kilimani habit"),
    ],
    "nuru-massage": [
        ("What Nuru Massage Is at Kilimani Hot Massage", "Gel prep and suite privacy for Nuru in Kilimani"),
        ("Your Nuru Session from Arrival to Aftercare", "Nuru intake, gel temperature, and shower aftercare"),
        ("Who Books Nuru Massage in Kilimani and Nairobi", "Who requests Nuru on Marcus Garvey Rd after dark"),
        ("How We Customise Every Nuru Appointment", "Boundaries, gel amount, and focus areas for Nuru"),
        ("Pairing Nuru with Other Treatments", "Nuru with body-to-body or couples staging"),
        ("Getting Here from Yaya Centre, Valley Arcade, and Ngong Rd", "Discreet arrival routes near Yaya and Adlife Plaza"),
        ("Why Guests Return for Nuru at Our 24/7 Studio", "Why guests rebook Nuru with the same therapist"),
    ],
    "body-to-body-massage": [
        ("What Body-to-Body Massage Is at Kilimani Hot Massage", "Skin-to-skin flow and consent on Marcus Garvey Rd"),
        ("Your Body-to-Body Session from Arrival to Aftercare", "Body-to-body pacing from intake to shower"),
        ("Who Books Body-to-Body Massage in Kilimani and Nairobi", "Guests who want continuous contact without mall visibility"),
        ("How We Customise Every Body-to-Body Appointment", "Oil, gel, draping, and boundary choices"),
        ("Pairing Body-to-Body with Other Treatments", "Body-to-body before or after Nuru sessions"),
        ("Getting Here from Yaya Centre, Valley Arcade, and Ngong Rd", "Low-profile ride-hail pins for Marcus Garvey Rd"),
        ("Why Guests Return for Body-to-Body at Our 24/7 Studio", "Repeat body-to-body bookings and therapist continuity"),
    ],
    "four-hands-massage": [
        ("What Four-Hands Massage Is at Kilimani Hot Massage", "Dual-therapist synchrony in Kilimani suites"),
        ("Your Four-Hands Session from Arrival to Aftercare", "Staging two therapists and one shared rhythm"),
        ("Who Books Four-Hands Massage in Kilimani and Nairobi", "Anniversary, birthday, and immersion seekers"),
        ("How We Customise Every Four-Hands Appointment", "Pairing Zuri and Lina—or mixed specialty pairs"),
        ("Pairing Four-Hands with Other Treatments", "Four-hands plus couples or aromatherapy evenings"),
        ("Getting Here from Yaya Centre, Valley Arcade, and Ngong Rd", "Parking two guests on Marcus Garvey side streets"),
        ("Why Guests Return for Four-Hands at Our 24/7 Studio", "Why four-hands beats two separate bookings"),
    ],
    "sensual-massage": [
        ("What Sensual / Erotic Massage Is at Kilimani Hot Massage", "Adult-paced touch with spa hygiene on Marcus Garvey Rd"),
        ("Your Sensual Session from Arrival to Aftercare", "Consent checkpoints and unhurried sensual pacing"),
        ("Who Books Sensual / Erotic Massage in Kilimani and Nairobi", "Guests who want refined adult touch—not crude listings"),
        ("How We Customise Every Sensual Appointment", "Lighting, oil, pressure, and stop-word preferences"),
        ("Pairing Sensual with Other Treatments", "Sensual with tantric or aromatherapy wind-down"),
        ("Getting Here from Yaya Centre, Valley Arcade, and Ngong Rd", "Discreet WhatsApp booking before you leave Wood Avenue"),
        ("Why Guests Return for Sensual at Our 24/7 Studio", "Trust, boundaries, and therapist continuity"),
    ],
    "couples-massage": [
        ("What Couples Massage Is at Kilimani Hot Massage", "Twin-table timing after Yaya Centre dinners"),
        ("Your Couples Session from Arrival to Aftercare", "Couples check-in, matched start, shared finish"),
        ("Who Books Couples Massage in Kilimani and Nairobi", "Date nights from Kilimani, Kileleshwa, and Karen"),
        ("How We Customise Every Couples Appointment", "Same modality or mixed Swedish and deep tissue"),
        ("Pairing Couples Massage with Other Treatments", "Couples plus four-hands upgrade with Zuri and Lina"),
        ("Getting Here from Yaya Centre, Valley Arcade, and Ngong Rd", "Combine dinner near Adlife Plaza with Marcus Garvey Rd massage"),
        ("Why Guests Return for Couples at Our 24/7 Studio", "Anniversary rebooks and Valentine weekend planning"),
    ],
    "aromatherapy-massage": [
        ("What Aromatherapy Massage Is at Kilimani Hot Massage", "Scent-led calm near Ring Rd Kilimani flats"),
        ("Your Aromatherapy Session from Arrival to Aftercare", "Blend selection, stroke flow, and scent aftercare"),
        ("Who Books Aromatherapy Massage in Kilimani and Nairobi", "Stress weeks, Sunday resets, and scent-sensitive guests"),
        ("How We Customise Every Aromatherapy Appointment", "Unscented fallback and citrus versus lavender choices"),
        ("Pairing Aromatherapy with Other Treatments", "Aromatherapy Swedish and couples wind-down"),
        ("Getting Here from Yaya Centre, Valley Arcade, and Ngong Rd", "Quiet slots from Kileleshwa via Mandera Rd"),
        ("Why Guests Return for Aromatherapy at Our 24/7 Studio", "Same blend preferences stored visit to visit"),
    ],
    "hot-stone-massage": [
        ("What Hot Stone Massage Is at Kilimani Hot Massage", "Basalt heat on guarded shoulders—rainy Kilimani favourite"),
        ("Your Hot Stone Session from Arrival to Aftercare", "Stone layout, heat checks, and cool-down"),
        ("Who Books Hot Stone Massage in Kilimani and Nairobi", "Cold-season bookings from Ring Rd and Wood Avenue"),
        ("How We Customise Every Hot Stone Appointment", "Stone focus: back, neck, feet, or full map"),
        ("Pairing Hot Stone with Other Treatments", "Hot stone warm-up before deep tissue traps"),
        ("Getting Here from Yaya Centre, Valley Arcade, and Ngong Rd", "Book ahead so stones are staged on Marcus Garvey Rd"),
        ("Why Guests Return for Hot Stone at Our 24/7 Studio", "Heat-first relief when AC and rain tighten muscle"),
    ],
    "tantric-massage": [
        ("What Tantric Ritual Is at Kilimani Hot Massage", "Breath-led ritual pacing in locked Kilimani suites"),
        ("Your Tantric Session from Arrival to Aftercare", "Breath alignment, slow build, quiet exit"),
        ("Who Books Tantric Ritual in Kilimani and Nairobi", "Ritual-curious guests after high-stress project weeks"),
        ("How We Customise Every Tantric Appointment", "Nuri-led pacing and boundary language"),
        ("Pairing Tantric with Other Treatments", "Tantric with lingam or sensual follow-on"),
        ("Getting Here from Yaya Centre, Valley Arcade, and Ngong Rd", "Unhurried slots—avoid stacking meetings after"),
        ("Why Guests Return for Tantric at Our 24/7 Studio", "Structured ritual versus rushed adult novelty"),
    ],
    "lingam-massage": [
        ("What Lingam Massage Is at Kilimani Hot Massage", "Male wellness focus with clinical privacy"),
        ("Your Lingam Session from Arrival to Aftercare", "Intake, pacing, and post-session rest"),
        ("Who Books Lingam Massage in Kilimani and Nairobi", "Upper Hill and Westlands male wellness seekers"),
        ("How We Customise Every Lingam Appointment", "Therapist match, duration, and communication style"),
        ("Pairing Lingam with Other Treatments", "Lingam with tantric breath work"),
        ("Getting Here from Yaya Centre, Valley Arcade, and Ngong Rd", "Night bookings from CBD under twenty minutes"),
        ("Why Guests Return for Lingam at Our 24/7 Studio", "Discreet repeat bookings with Nuri"),
    ],
}

SUMMARIES = {
    "swedish-massage": "Swedish massage at Kilimani Hot Massage is unhurried full-body work on Marcus Garvey Rd—warm oil, measured effleurage, and quiet suites steps from Yaya Centre and Adlife Plaza. Ideal after Ngong Rd commutes, Ring Rd Kilimani gym days, or Upper Hill deadlines when you need nervous-system calm without aggressive pressure. Therapists adjust stroke depth continuously; sessions run any hour. Many Kilimani and Kileleshwa guests book Swedish as their standing reset—WhatsApp 0746 203398 to reserve.",
    "deep-tissue-massage": "Deep tissue at our Kilimani studio targets trap knots, lumbar tightness, and gym soreness with slow, informed pressure—never sharp surprise on Marcus Garvey Rd. We warm tissue first, then map desk neck, IT bands, and hip flexors common to Nairobi commutes. Keisha and Amara lead most deep bookings from Westlands and Upper Hill; open 24/7 for post-midnight recovery. Book sixty or ninety minutes when one zone needs real time.",
    "nuru-massage": "Nuru massage at Kilimani Hot Massage uses warmed gel, locked-suite privacy, and consent-led pacing on Marcus Garvey Rd—minutes from Yaya Centre but away from hotel-lobby visibility. Aisha and Nuri handle most Nuru requests; boundaries are confirmed on WhatsApp before you travel. Adults only; shower access in-suite. Same-night slots are realistic when you message before leaving Adlife Plaza or Wood Avenue.",
    "couples-massage": "Couples massage at Kilimani Hot Massage means side-by-side tables, matched timing, and shared calm on Marcus Garvey Rd—popular after dinners near Yaya Centre, Adlife Plaza, or Junction Mall. Partners can choose the same modality or mix Swedish with deep tissue; Zuri stages most couples rooms. Book forty-eight hours ahead on Valentine weekends; weekday lunch slots from Kileleshwa are easier.",
}

for old, new in benefit_fixes:
    text = text.replace(old, new)

for slug, pairs in HEADINGS.items():
    for old, new in pairs:
        text = text.replace(old, new, 1)

for slug, summary in SUMMARIES.items():
    pattern = rf'(slug: "{slug}",[\s\S]*?summary: ")([^"]+)(")'
    text = re.sub(pattern, rf"\1{summary}\3", text, count=1)

AFTER_REPLACEMENTS = [
    (
        "After deep tissue, neighbouring cafes at Yaya Centre or shops at Lavington Mall let you extend a relaxed evening—or head straight home to Kilimani or Kileleshwa for sleep.",
        "Post deep tissue, hydrate and skip heavy gym for twenty-four hours—then enjoy a slow drive home via Valley Arcade without shoulder bracing.",
    ),
    (
        "After sensual, neighbouring cafes at Yaya Centre or shops at Lavington Mall let you extend a relaxed evening—or head straight home to Kilimani or Kileleshwa for sleep.",
        "After sensual sessions, many Kilimani guests prefer straight home—suites stay private; reception does not delay exit.",
    ),
    (
        "After hot stone, neighbouring cafes at Yaya Centre or shops at Lavington Mall let you extend a relaxed evening—or head straight home to Kilimani or Kileleshwa for sleep.",
        "Heat can induce sleepiness—night bookings after hot stone often end with early bed near Yaya Centre rather than late Ngong Rd drives.",
    ),
    (
        "After tantric, neighbouring cafes at Yaya Centre or shops at Lavington Mall let you extend a relaxed evening—or head straight home to Kilimani or Kileleshwa for sleep.",
        "Tantric aftercare is quiet time—many guests skip screens for an hour after returning to Kilimani flats.",
    ),
]

RIDE_REPLACEMENTS = [
    (
        "Ride-hail drivers usually know Marcus Garvey Rd once you mention Lavington Mall or Valley Arcade. Save 0746 203398 in your phone before travelling; we send pin-friendly directions on WhatsApp. Parking is simpler than CBD spas—still, share ETA when you book deep tissue after dark for smooth entry.",
        "Pin Kilimani Hot Massage on Marcus Garvey Rd for ride-hail—mention Adlife Plaza if your driver knows Kilimani but not our gate. Save 0746 203398; we WhatsApp directions. Share ETA for after-dark deep tissue arrivals.",
    ),
    (
        "Ride-hail drivers usually know Marcus Garvey Rd once you mention Lavington Mall or Valley Arcade. Save 0746 203398 in your phone before travelling; we send pin-friendly directions on WhatsApp. Parking is simpler than CBD spas—still, share ETA when you book sensual after dark for smooth entry.",
        "Discreet arrivals: WhatsApp preferred for first questions. Mention Wood Avenue or Yaya Centre landmarks; we send a Marcus Garvey Rd pin after time confirmation.",
    ),
    (
        "Ride-hail drivers usually know Marcus Garvey Rd once you mention Lavington Mall or Valley Arcade. Save 0746 203398 in your phone before travelling; we send pin-friendly directions on WhatsApp. Parking is simpler than CBD spas—still, share ETA when you book hot stone after dark for smooth entry.",
        "Hot stone needs staging time—book ahead when possible. James Gichuru alternate saves minutes when Ngong Rd floods toward Kilimani.",
    ),
    (
        "Ride-hail drivers usually know Marcus Garvey Rd once you mention Lavington Mall or Valley Arcade. Save 0746 203398 in your phone before travelling; we send pin-friendly directions on WhatsApp. Parking is simpler than CBD spas—still, share ETA when you book tantric after dark for smooth entry.",
        "Tantric sessions are unhurried—avoid stacking meetings immediately after. Ride-hail to Marcus Garvey Rd; pin saves confusion near Adlife Plaza junction.",
    ),
]

for old, new in AFTER_REPLACEMENTS + RIDE_REPLACEMENTS:
    text = text.replace(old, new)

text = text.replace(
    "Ride-hail drivers usually know Marcus Garvey Rd once you mention Lavington Mall or Valley Arcade.",
    "Ride-hail drivers usually know Marcus Garvey Rd once you mention Yaya Centre or Adlife Plaza.",
)

path.write_text(text)
print("treatments.ts updated")
