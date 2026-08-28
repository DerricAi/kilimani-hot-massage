#!/usr/bin/env python3
"""Generate src/content/areas/data.ts for Kilimani Hot Massage local SEO."""

from __future__ import annotations

import json
import textwrap
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "src/content/areas/data.ts"

TIER_A_CONSTITUENCIES = {"westlands", "dagoretti-north", "langata", "starehe"}
TIER_A_SLUGS = TIER_A_CONSTITUENCIES | {
    "lavington", "kilimani", "kileleshwa", "parklands-highridge", "karen",
    "nairobi-central", "cbd-nairobi", "upper-hill", "hurlingham", "kitisuru",
    "spring-valley", "riverside", "woodley-kenyatta-golf-course", "kabiro",
}

CONSTITUENCY_NAMES = {
    "westlands": "Westlands",
    "dagoretti-north": "Dagoretti North",
    "dagoretti-south": "Dagoretti South",
    "langata": "Langata",
    "kibra": "Kibra",
    "roysambu": "Roysambu",
    "kasarani": "Kasarani",
    "ruaraka": "Ruaraka",
    "embakasi-south": "Embakasi South",
    "embakasi-north": "Embakasi North",
    "embakasi-central": "Embakasi Central",
    "embakasi-east": "Embakasi East",
    "embakasi-west": "Embakasi West",
    "makadara": "Makadara",
    "kamukunji": "Kamukunji",
    "starehe": "Starehe",
    "mathare": "Mathare",
}

WARDS: dict[str, list[tuple[str, str]]] = {
    "westlands": [
        ("kitisuru", "Kitisuru"),
        ("parklands-highridge", "Parklands/Highridge"),
        ("karura", "Karura"),
        ("kangemi", "Kangemi"),
        ("mountain-view", "Mountain View"),
    ],
    "dagoretti-north": [
        ("kilimani", "Kilimani"),
        ("kawangware", "Kawangware"),
        ("gatina", "Gatina"),
        ("kileleshwa", "Kileleshwa"),
        ("kabiro", "Kabiro"),
    ],
    "dagoretti-south": [
        ("mutuini", "Mutuini"),
        ("ngando", "Ngando"),
        ("riruta", "Riruta"),
        ("uthiru-ruthimitu", "Uthiru/Ruthimitu"),
        ("waithaka", "Waithaka"),
    ],
    "langata": [
        ("karen", "Karen"),
        ("nairobi-west", "Nairobi West"),
        ("mugumo-ini", "Mugumo-ini"),
        ("south-c", "South C"),
        ("nyayo-highrise", "Nyayo Highrise"),
    ],
    "kibra": [
        ("laini-saba", "Laini Saba"),
        ("lindi", "Lindi"),
        ("makina", "Makina"),
        ("woodley-kenyatta-golf-course", "Woodley/Kenyatta Golf Course"),
        ("sarangombe", "Sarang'ombe"),
    ],
    "roysambu": [
        ("githurai", "Githurai"),
        ("kahawa-west", "Kahawa West"),
        ("zimmerman", "Zimmerman"),
        ("roysambu-ward", "Roysambu"),
        ("kahawa", "Kahawa"),
    ],
    "kasarani": [
        ("clay-city", "Clay City"),
        ("mwiki", "Mwiki"),
        ("kasarani-ward", "Kasarani"),
        ("njiru", "Njiru"),
        ("ruai", "Ruai"),
    ],
    "ruaraka": [
        ("baba-dogo", "Baba Dogo"),
        ("utalii", "Utalii"),
        ("mathare-north", "Mathare North"),
        ("lucky-summer", "Lucky Summer"),
        ("korogocho", "Korogocho"),
    ],
    "embakasi-south": [
        ("imara-daima", "Imara Daima"),
        ("kwa-njenga", "Kwa Njenga"),
        ("kwa-reuben", "Kwa Reuben"),
        ("pipeline", "Pipeline"),
        ("kware", "Kware"),
    ],
    "embakasi-north": [
        ("kariobangi-north", "Kariobangi North"),
        ("dandora-area-i", "Dandora Area I"),
        ("dandora-area-ii", "Dandora Area II"),
        ("dandora-area-iii", "Dandora Area III"),
        ("dandora-area-iv", "Dandora Area IV"),
    ],
    "embakasi-central": [
        ("kayole-north", "Kayole North"),
        ("kayole-central", "Kayole Central"),
        ("kayole-south", "Kayole South"),
        ("komarock", "Komarock"),
        ("matopeni-spring-valley", "Matopeni/Spring Valley"),
    ],
    "embakasi-east": [
        ("upper-savanna", "Upper Savanna"),
        ("lower-savanna", "Lower Savanna"),
        ("embakasi-ward", "Embakasi"),
        ("utawala", "Utawala"),
        ("mihango", "Mihango"),
    ],
    "embakasi-west": [
        ("umoja-i", "Umoja I"),
        ("umoja-ii", "Umoja II"),
        ("mowlem", "Mowlem"),
        ("kariobangi-south", "Kariobangi South"),
        ("innercore", "Innercore"),
    ],
    "makadara": [
        ("maringo-hamza", "Maringo/Hamza"),
        ("viwandani", "Viwandani"),
        ("harambee", "Harambee"),
        ("makongeni", "Makongeni"),
        ("kaloleni", "Kaloleni"),
    ],
    "kamukunji": [
        ("pumwani", "Pumwani"),
        ("eastleigh-north", "Eastleigh North"),
        ("eastleigh-south", "Eastleigh South"),
        ("airbase", "Airbase"),
        ("california", "California"),
    ],
    "starehe": [
        ("nairobi-central", "Nairobi Central"),
        ("ngara", "Ngara"),
        ("pangani", "Pangani"),
        ("ziwani-kariokor", "Ziwani/Kariokor"),
        ("landimawe", "Landimawe"),
    ],
    "mathare": [
        ("hospital", "Hospital"),
        ("mabatini", "Mabatini"),
        ("huruma", "Huruma"),
        ("ngei", "Ngei"),
        ("mlango-kubwa", "Mlango Kubwa"),
    ],
}

SUBURBS = [
    ("lavington", "Lavington", "dagoretti-north"),
    ("upper-hill", "Upper Hill", "starehe"),
    ("hurlingham", "Hurlingham", "dagoretti-north"),
    ("spring-valley", "Spring Valley", "dagoretti-north"),
    ("loresho", "Loresho", "westlands"),
    ("runda", "Runda", "westlands"),
    ("gigiri", "Gigiri", "westlands"),
    ("muthaiga", "Muthaiga", "westlands"),
    ("riverside", "Riverside", "westlands"),
    ("eastleigh", "Eastleigh", "kamukunji"),
    ("cbd-nairobi", "CBD Nairobi", "starehe"),
    ("south-b", "South B", "langata"),
    ("donholm", "Donholm", "embakasi-east"),
    ("adams-arcade", "Adams Arcade", "dagoretti-north"),
    ("valley-arcade", "Valley Arcade", "dagoretti-north"),
]

# slug -> full content overrides (intro must be unique)
DETAILS: dict[str, dict] = {}

def d(slug, intro, why, commute, landmarks, roads, neighbors):
    DETAILS[slug] = {
        "intro": intro,
        "whyVisit": why,
        "commute": commute,
        "landmarks": landmarks,
        "roads": roads,
        "neighboringAreas": neighbors,
    }

# Load hand-authored details from JSON if present
_details_json = Path(__file__).with_name("areas-details.json")
if _details_json.exists():
    DETAILS.update(json.loads(_details_json.read_text(encoding="utf-8")))

def tier_for(slug: str, constituency_slug: str) -> str:
    if slug in TIER_A_SLUGS or constituency_slug in TIER_A_CONSTITUENCIES and slug == constituency_slug:
        if slug in TIER_A_SLUGS or slug in TIER_A_CONSTITUENCIES:
            return "A"
    if slug in TIER_A_SLUGS:
        return "A"
    if slug in TIER_A_CONSTITUENCIES:
        return "A"
    return "B"

def default_commute(constituency_slug: str) -> str:
    near = {"westlands", "dagoretti-north", "langata", "starehe", "kibra", "dagoretti-south"}
    mid = {"makadara", "kamukunji", "ruaraka", "mathare"}
    if constituency_slug in near:
        return "About 10–20 minutes via Marcus Garvey Rd or Ngong Rd"
    if constituency_slug in mid:
        return "About 20–30 minutes via Jogoo Rd or Juja Rd toward Marcus Garvey Rd"
    return "About 25–45 minutes via Jogoo Rd, Outer Ring Rd, or Thika Rd toward Marcus Garvey Rd"

def fallback_intro(name: str, kind: str, constituency_name: str, roads: list[str], landmarks: list[str]) -> str:
    road = roads[0] if roads else "major Nairobi roads"
    lm = landmarks[0] if landmarks else constituency_name
    if kind == "constituency":
        return (
            f"{name} is one of Nairobi County's seventeen constituencies, anchored around {lm} and served by {road}. "
            f"Residents and workers across {name} often travel to Kilimani on Marcus Garvey Rd for trusted wellness services. "
            f"Kilimani Hot Massage welcomes guests from {name} around the clock."
        )
    if kind == "suburb":
        return (
            f"{name} is a well-known Nairobi suburb within {constituency_name}, close to {lm} along {road}. "
            f"Neighbours and visitors use Marcus Garvey Rd to reach Kilimani Hot Massage for Swedish, deep tissue, and couples sessions. "
            f"Our spa is open 24/7 for {name} residents after work or weekend errands."
        )
    return (
        f"{name} ward sits in {constituency_name} constituency, with daily life centred on {lm} and {road}. "
        f"Matatu and private-car commuters from {name} regularly head to Kilimani Hot Massage on Marcus Garvey Rd. "
        f"We keep quiet suites ready day and night for {name} guests."
    )

def fallback_why(name: str, kind: str) -> list[str]:
    base = [
        f"Trusted massage spa reachable from {name}",
        "Open 24 hours, seven days a week on Marcus Garvey Rd",
        "WhatsApp booking for quick confirmation",
        "Professional therapists for Swedish, deep tissue, and more",
    ]
    if kind == "constituency":
        base[0] = f"Central wellness option for all of {name} constituency"
    return base

def fallback_landmarks(name: str, constituency_name: str) -> list[str]:
    return [f"{name} centre", f"{constituency_name} boundary", "Local shopping centre", "Matatu stage"]

def fallback_roads(constituency_slug: str) -> list[str]:
    m = {
        "westlands": ["Waiyaki Way", "Marcus Garvey Rd", "James Gichuru Rd"],
        "dagoretti-north": ["Marcus Garvey Rd", "Ngong Rd", "James Gichuru Rd"],
        "dagoretti-south": ["Ngong Rd", "Waiyaki Way", "Dagoretti Rd"],
        "langata": ["Langata Rd", "Ngong Rd", "Mombasa Rd"],
        "kibra": ["Ngong Rd", "Langata Rd", "Kibera Dr"],
        "roysambu": ["Thika Rd", "Roysambu Rd", "Eastern Bypass"],
        "kasarani": ["Outer Ring Rd", "Thika Rd", "Mwiki Rd"],
        "ruaraka": ["Outer Ring Rd", "Juja Rd", "Thika Rd"],
        "embakasi-south": ["Mombasa Rd", "Jogoo Rd", "Outer Ring Rd"],
        "embakasi-north": ["Jogoo Rd", "Outer Ring Rd", "Kariobangi Rd"],
        "embakasi-central": ["Kangundo Rd", "Outer Ring Rd", "Jogoo Rd"],
        "embakasi-east": ["Jogoo Rd", "Eastern Bypass", "Mombasa Rd"],
        "embakasi-west": ["Jogoo Rd", "Outer Ring Rd", "Umoja Rd"],
        "makadara": ["Jogoo Rd", "Mombasa Rd", "Landhies Rd"],
        "kamukunji": ["Juja Rd", "General Waruinge St", "First Avenue Eastleigh"],
        "starehe": ["Haile Selassie Ave", "Moi Ave", "Marcus Garvey Rd"],
        "mathare": ["Juja Rd", "Thika Rd", "Outer Ring Rd"],
    }
    return m.get(constituency_slug, ["Jogoo Rd", "Thika Rd", "Marcus Garvey Rd"])

def ward_neighbors(slug: str, constituency_slug: str) -> list[str]:
    wards = [w[0] for w in WARDS[constituency_slug]]
    idx = next((i for i, w in enumerate(wards) if w == slug), 0)
    n = [wards[(idx + i) % len(wards)] for i in [1, 2, -1]]
    n.append(constituency_slug)
    if constituency_slug == "dagoretti-north" and slug != "lavington":
        n.append("lavington")
    return list(dict.fromkeys(n))[:5]

def ts_string(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)

def ts_array(items: list[str], indent: str = "    ") -> str:
    if not items:
        return "[]"
    lines = ["["]
    for item in items:
        lines.append(f'{indent}  {ts_string(item)},')
    lines.append(f"{indent}]")
    return "\n".join(lines)

def build_area(slug: str, name: str, kind: str, constituency_slug: str) -> dict:
    constituency_name = CONSTITUENCY_NAMES[constituency_slug]
    det = DETAILS.get(slug, {})
    roads = det.get("roads") or fallback_roads(constituency_slug)
    landmarks = det.get("landmarks") or fallback_landmarks(name, constituency_name)
    intro = det.get("intro") or fallback_intro(name, kind, constituency_name, roads, landmarks)
    why = det.get("whyVisit") or fallback_why(name, kind)
    commute = det.get("commute") or default_commute(constituency_slug)
    if kind == "constituency":
        neighbors = det.get("neighboringAreas") or [w[0] for w in WARDS[slug][:3]] + ["lavington"]
    elif kind == "suburb":
        neighbors = det.get("neighboringAreas") or ward_neighbors(slug, constituency_slug)
    else:
        neighbors = det.get("neighboringAreas") or ward_neighbors(slug, constituency_slug)
    t = "A" if slug in TIER_A_SLUGS else "B"
    return {
        "slug": slug,
        "name": name,
        "kind": kind,
        "constituencySlug": constituency_slug,
        "constituencyName": constituency_name,
        "tier": t,
        "commute": commute,
        "landmarks": landmarks[:4],
        "roads": roads[:4],
        "neighboringAreas": neighbors[:5],
        "intro": intro,
        "whyVisit": why[:4],
    }

def render_area(a: dict) -> str:
    return f"""  {{
    slug: {ts_string(a["slug"])},
    name: {ts_string(a["name"])},
    kind: {ts_string(a["kind"])},
    constituencySlug: {ts_string(a["constituencySlug"])},
    constituencyName: {ts_string(a["constituencyName"])},
    tier: {ts_string(a["tier"])},
    commute: {ts_string(a["commute"])},
    landmarks: {ts_array(a["landmarks"], "    ")},
    roads: {ts_array(a["roads"], "    ")},
    neighboringAreas: {ts_array(a["neighboringAreas"], "    ")},
    intro: {ts_string(a["intro"])},
    whyVisit: {ts_array(a["whyVisit"], "    ")},
  }},"""

def main():
    areas: list[dict] = []
    for slug, cname in CONSTITUENCY_NAMES.items():
        areas.append(build_area(slug, cname, "constituency", slug))
    for con_slug, ward_list in WARDS.items():
        for slug, name in ward_list:
            areas.append(build_area(slug, name, "ward", con_slug))
    for slug, name, con_slug in SUBURBS:
        areas.append(build_area(slug, name, "suburb", con_slug))

    slugs = {a["slug"] for a in areas}
    assert len(areas) == len(slugs), "duplicate slugs"
    assert len(areas) == 117, f"expected 117 areas, got {len(areas)}"

    tier_a = sorted(s for s in TIER_A_SLUGS if s in slugs)

    body = "\n".join(render_area(a) for a in areas)
    header = textwrap.dedent("""\
        export type AreaKind = "constituency" | "ward" | "suburb";

        export type Area = {
          slug: string;
          name: string;
          kind: AreaKind;
          constituencySlug: string;
          constituencyName: string;
          tier: "A" | "B";
          commute: string;
          landmarks: string[];
          roads: string[];
          neighboringAreas: string[];
          intro: string;
          whyVisit: string[];
        };

        export const areas: Area[] = [
        """)
    footer = (
        "];\n\n"
        f"export const TIER_A_SLUGS: string[] = {json.dumps(tier_a, indent=2)};\n\n"
        "export function getArea(slug: string): Area | undefined {\n"
        "  return areas.find((a) => a.slug === slug);\n"
        "}\n\n"
        "export function getAreasByConstituency(constituencySlug: string): Area[] {\n"
        "  return areas.filter((a) => a.constituencySlug === constituencySlug);\n"
        "}\n\n"
        "export function getConstituencyAreas(): Area[] {\n"
        "  return areas.filter((a) => a.kind === \"constituency\");\n"
        "}\n"
    )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(header + body + "\n" + footer, encoding="utf-8")
    print(f"Wrote {OUT} with {len(areas)} areas")

if __name__ == "__main__":
    main()
