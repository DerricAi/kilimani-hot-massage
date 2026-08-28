#!/usr/bin/env python3
"""Fix Lavington/Argwings spa references for Kilimani Hot Massage."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKIP = {".git", "node_modules", ".next"}

# Guide slug migrations (old -> new)
SLUG_MAP = {
    "swedish-vs-deep-tissue-kilimani": "swedish-vs-deep-tissue-kilimani",
    "nuru-massage-guide-kilimani": "nuru-massage-guide-kilimani",
    "couples-massage-kilimani-date-night": "couples-massage-kilimani-date-night",
    "how-to-book-24-7-spa-kilimani": "how-to-book-24-7-spa-kilimani",
    "massage-near-yaya-centre-marcus-garvey": "massage-near-yaya-centre-marcus-garvey",
    "choosing-a-masseuse-in-kilimani": "choosing-a-masseuse-in-kilimani",
}

REPLACEMENTS = [
    # Spa address
    (r"Marcus Garvey Rd", "Marcus Garvey Rd"),
    (r"marcus-garvey", "marcus-garvey"),
    (r"Marcus Garvey Rd Rd", "Marcus Garvey Rd"),
    # Meta / titles — spa city
    (r"Massage Treatments Kilimani Nairobi", "Massage Treatments Kilimani Nairobi"),
    (r"Massage Guides Kilimani Nairobi", "Massage Guides Kilimani Nairobi"),
    (r"Lavington Nairobi \| Guide", "Kilimani Nairobi | Guide"),
    (r"Masseuse Kilimani Nairobi", "Masseuse Kilimani Nairobi"),
    (r"Masseuse Lavington \|", "Masseuse Kilimani |"),
    (r"Massage Kilimani Nairobi near me", "Massage Kilimani Nairobi near me"),
    (r"Swedish Massage Kilimani Nairobi", "Swedish Massage Kilimani Nairobi"),
    (r"Deep Tissue Massage Kilimani", "Deep Tissue Massage Kilimani"),
    (r"Nuru Massage Kilimani", "Nuru Massage Kilimani"),
    (r"Couples Massage Kilimani", "Couples Massage Kilimani"),
    (r"Hot Stone Massage Kilimani", "Hot Stone Massage Kilimani"),
    (r"Aromatherapy Massage Kilimani", "Aromatherapy Massage Kilimani"),
    (r"Four Hands Massage Kilimani", "Four Hands Massage Kilimani"),
    (r"Thai Massage Kilimani", "Thai Massage Kilimani"),
    (r"Tantric Massage Kilimani", "Tantric Massage Kilimani"),
    (r"Lingam Massage Kilimani", "Lingam Massage Kilimani"),
    (r"Body to Body Massage Kilimani", "Body to Body Massage Kilimani"),
    (r"Sensual Massage Kilimani", "Sensual Massage Kilimani"),
    (r"Sports Massage Kilimani", "Sports Massage Kilimani"),
    # Spa-as-destination phrases
    (r"wellness trips to Kilimani", "wellness trips to Kilimani"),
    (r"travel to Kilimani for", "travel to Kilimani for"),
    (r"travel to Kilimani", "travel to Kilimani"),
    (r"head to Kilimani for", "head to Kilimani for"),
    (r"head to Kilimani", "head to Kilimani"),
    (r"continue to Kilimani for", "continue to Kilimani for"),
    (r"extend trips to Kilimani", "extend trips to Kilimani"),
    (r"weekend Kilimani trips", "weekend Kilimani trips"),
    (r"Weekend Kilimani trips", "Weekend Kilimani trips"),
    (r"Date-night Kilimani trips", "Date-night Kilimani trips"),
    (r"Kilimani wellness", "Kilimani wellness"),
    (r"Kilimani massage", "Kilimani massage"),
    (r"Kilimani visits", "Kilimani visits"),
    (r"Kilimani rates", "Kilimani rates"),
    (r"Kilimani quality", "Kilimani quality"),
    (r"Kilimani escape", "Kilimani escape"),
    (r"Kilimani trips", "Kilimani trips"),
    (r"Kilimani treat", "Kilimani treat"),
    (r"Kilimani care", "Kilimani care"),
    (r"Kilimani pricing", "Kilimani pricing"),
    (r"Kilimani unwind", "Kilimani unwind"),
    (r"Kilimani access", "Kilimani access"),
    (r"Open 24/7 Kilimani", "Open 24/7 Kilimani"),
    (r"Affordable Kilimani", "Affordable Kilimani"),
    (r"Premium Kilimani", "Premium Kilimani"),
    (r"Reliable Kilimani", "Reliable Kilimani"),
    (r"Modern Kilimani", "Modern Kilimani"),
    (r"Honest Kilimani", "Honest Kilimani"),
    (r"Midnight Kilimani", "Midnight Kilimani"),
    (r"Off-peak Kilimani", "Off-peak Kilimani"),
    (r"Post-market Kilimani", "Post-market Kilimani"),
    (r"Post-shift Kilimani", "Post-shift Kilimani"),
    (r"Special-occasion Kilimani", "Special-occasion Kilimani"),
    (r"Monthly wellness pilgrimage to Kilimani", "Monthly wellness pilgrimage to Kilimani"),
    (r"Popular weekend spa trips to Kilimani", "Popular weekend spa trips to Kilimani"),
    (r"Short hop to Kilimani", "Short hop to Kilimani"),
    (r"Quick Ngong Rd to Kilimani", "Quick Ngong Rd to Kilimani"),
    (r"Ngong Rd alternate to Kilimani", "Ngong Rd alternate to Kilimani"),
    (r"Ngong Rd to Kilimani", "Ngong Rd to Kilimani"),
    (r"Haile Selassie to Kilimani", "Haile Selassie to Kilimani"),
    (r"Valley-to-Kilimani commute", "Valley-to-Kilimani commute"),
    (r"Dual-route Kilimani commute", "Dual-route Kilimani commute"),
    (r"Bypass-shortened Kilimani route", "Bypass-shortened Kilimani route"),
    (r"James Gichuru link to Kilimani", "James Gichuru link to Kilimani"),
    (r"Peponi Rd quick link to Kilimani", "Peponi Rd quick link to Kilimani"),
    (r"Affordable wellness in nearby Kilimani", "Affordable wellness in nearby Kilimani"),
    (r"Affordable Kilimani alternative", "Affordable Kilimani alternative"),
    (r"stretch out at Kilimani after", "stretch out at Kilimani after"),
    (r"unwind at Kilimani after", "unwind at Kilimani after"),
    (r"book Kilimani couples", "book Kilimani couples"),
    (r"families book Kilimani", "families book Kilimani"),
    (r"head to Kilimani for recovery", "head to Kilimani for recovery"),
    (r"Kilimani represents a premium wellness escape", "Kilimani represents a premium wellness escape"),
    (r"Marcus Garvey Rd U-turns", "Marcus Garvey Rd U-turns"),
    (r"meet Kilimani quality at our", "meet Kilimani quality at our"),
    (r"meets Kilimani quality at our", "meets Kilimani quality at our"),
    # Studio / spa references
    (r"Our Kilimani Spa", "Our Kilimani Spa"),
    (r"our Kilimani spa", "our Kilimani spa"),
    (r"our Kilimani studio", "our Kilimani studio"),
    (r"Our Kilimani studio", "Our Kilimani studio"),
    (r"24/7 Kilimani Studio", "24/7 Kilimani Studio"),
    (r"Kilimani studio over mall", "Kilimani studio over mall"),
    (r"leave Marcus Garvey Rd softer", "leave Marcus Garvey Rd softer"),
    (r"leave Kilimani softer", "leave Kilimani softer"),
    (r"your Kilimani visits", "your Kilimani visits"),
    (r"in Kilimani, Nairobi", "in Kilimani, Nairobi"),
    (r"Landmarks and timing around Kilimani", "Landmarks and timing around Kilimani"),
    (r"Getting to Marcus Garvey Rd without", "Getting to Marcus Garvey Rd without"),
    (r"Kilimani's five-minute escape to Marcus Garvey Rd", "Kilimani's five-minute escape on Marcus Garvey Rd"),
    (r"Parking on Marcus Garvey Rd", "Parking on Marcus Garvey Rd"),
    (r"Street parking along Marcus Garvey Rd", "Street parking along Marcus Garvey Rd"),
    (r"Street parking Marcus Garvey Rd", "Street parking Marcus Garvey Rd"),
    (r"Golf bag in car: still room for street parking Marcus Garvey Rd", "Golf bag in car: still room for street parking on Marcus Garvey Rd"),
    (r"Kileleshwa border walk-in possible dry season—usually drive\.", "Kileleshwa border walk-in possible dry season—usually drive."),
    (r"Kileleshwa walks to Marcus Garvey Rd", "Kileleshwa walks to Marcus Garvey Rd"),
    (r"eastern Kileleshwa walks to Marcus Garvey Rd", "eastern Kileleshwa walks to Marcus Garvey Rd"),
    (r"walks to Marcus Garvey Rd", "walks to Marcus Garvey Rd"),
    (r"Marcus Garvey Rd parking", "Marcus Garvey Rd parking"),
    (r"Marcus Garvey Rd suites", "Marcus Garvey Rd suites"),
    (r"Marcus Garvey Rd location", "Marcus Garvey Rd location"),
    (r"Marcus Garvey Rd sits centrally", "Marcus Garvey Rd sits centrally"),
    (r"Marcus Garvey Rd sits at", "Marcus Garvey Rd sits at"),
    (r"never visited Marcus Garvey Rd", "never visited Marcus Garvey Rd"),
    (r"toward Marcus Garvey Rd", "toward Marcus Garvey Rd"),
    (r"into Marcus Garvey Rd", "onto Marcus Garvey Rd"),
    (r"on Marcus Garvey Rd", "on Marcus Garvey Rd"),
    (r"along Marcus Garvey Rd", "along Marcus Garvey Rd"),
    (r"from Marcus Garvey Rd", "from Marcus Garvey Rd"),
    (r"to Marcus Garvey Rd", "to Marcus Garvey Rd"),
    (r"at Marcus Garvey Rd", "at Marcus Garvey Rd"),
    (r"via Marcus Garvey Rd", "via Marcus Garvey Rd"),
    (r"cut toward Marcus Garvey Rd", "cut toward Marcus Garvey Rd"),
    (r"feeding Marcus Garvey Rd", "feeding Marcus Garvey Rd"),
    (r"side streets feeding Marcus Garvey Rd", "side streets feeding Marcus Garvey Rd"),
    (r"Kilimani Hot Massage sits at the constituency's geographic heart—most wards reach us in five to fifteen minutes\. One phone line keeps pricing and quality consistent across Dagoretti North\.", "Kilimani Hot Massage on Marcus Garvey Rd sits at the constituency's geographic heart—most wards reach us in five to fifteen minutes. One phone line keeps pricing and quality consistent across Dagoretti North."),
    (r"meet Kilimani quality at our Marcus Garvey Rd spa", "meet Kilimani quality at our Marcus Garvey Rd spa"),
    (r"meets Kilimani quality at our Marcus Garvey Rd spa", "meets Kilimani quality at our Marcus Garvey Rd spa"),
    (r"Embakasi name meets Kilimani quality at our Marcus Garvey Rd spa", "Embakasi name meets Kilimani quality at our Marcus Garvey Rd spa"),
    (r"Walking from Yaya Centre to Marcus Garvey Rd", "Walking from Yaya Centre to Marcus Garvey Rd"),
    (r"most local drivers know Marcus Garvey Rd", "most local drivers know Marcus Garvey Rd"),
    (r"mention Lavington Green or proximity to Valley Arcade when ordering a ride; most local drivers know Marcus Garvey Rd", "mention Yaya Centre or Adlife Plaza when ordering a ride; most local drivers know Marcus Garvey Rd"),
    (r"Massage treatments", "Massage treatments"),
    (r"massage treatment", "massage treatment"),
    (r"Massage Treatments", "Massage Treatments"),
    (r"rgba\(196,165,116,0\.25\)", "rgba(200,56,90,0.25)"),
    (r"Near Yaya Centre & Adlife Plaza", "Near Yaya Centre & Adlife Plaza"),
    (r"Yaya Centre, Adlife Plaza, and Valley Arcade", "Yaya Centre, Adlife Plaza, and Valley Arcade"),
    (r"Yaya Centre", "Yaya Centre"),
    (r"live near Yaya Centre or commute", "live near Yaya Centre or commute"),
    (r"Kilimani,", "Kilimani,"),
]

def process_file(path: Path) -> bool:
    try:
        text = path.read_text(encoding="utf-8")
    except (UnicodeDecodeError, IsADirectoryError):
        return False
    original = text
    for old, new in SLUG_MAP.items():
        text = text.replace(old, new)
    for pattern, repl in REPLACEMENTS:
        text = re.sub(pattern, repl, text)
    if text != original:
        path.write_text(text, encoding="utf-8")
        return True
    return False

changed = 0
for path in ROOT.rglob("*"):
    if any(p in path.parts for p in SKIP):
        continue
    if path.suffix in {".ts", ".tsx", ".md", ".json", ".mjs", ".py", ".svg"}:
        if process_file(path):
            changed += 1
            print("Updated", path.relative_to(ROOT))

print(f"Done. {changed} files updated.")
