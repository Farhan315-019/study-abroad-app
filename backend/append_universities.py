"""Append new university rows from pipe-delimited group files (_gen/*.txt) into data/universities.csv.
Line format (12 fields, pipe-separated):
Name|Country|City|WorldRank|IELTS|PTE|TOEFL|GPA|TuitionMinUSD|TuitionMaxUSD|Website|Status
Run from backend/:  python append_universities.py
"""
import csv
import os

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "data", "universities.csv")
GEN_DIRS = [os.path.join(HERE, "_gen"), os.path.join(HERE, "_gen_colleges"), os.path.join(HERE, "_gen_bulk")]

ALLOWED = {
    "Azerbaijan", "Cyprus", "Georgia", "Kuwait", "Russia", "Albania", "Chile",
    "Andorra", "Belarus", "Bosnia and Herzegovina", "Bulgaria", "Croatia",
    "Estonia", "Iceland", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg",
    "Malta", "Moldova", "Monaco", "Montenegro", "North Macedonia", "Romania",
    "San Marino", "Serbia", "Slovakia", "Slovenia", "Ukraine", "Mexico",
    "Argentina", "India", "Indonesia", "Thailand", "Hong Kong",
    "Australia", "Canada", "China", "Denmark", "France", "Germany", "Ireland",
    "Italy", "Japan", "Malaysia", "Netherlands", "New Zealand", "Norway",
    "Pakistan", "Saudi Arabia", "Singapore", "South Korea", "Spain", "Sweden",
    "Switzerland", "Turkey", "UAE", "USA", "United Kingdom",
}

DOCS = "Academic transcripts, English proficiency, Passport copy, Statement of purpose, Reference letters"


def parse_line(line):
    parts = [p.strip() for p in line.split("|")]
    if len(parts) != 12:
        return None
    return parts


def to_int(v):
    try:
        return int(float(v)) if v else None
    except (TypeError, ValueError):
        return None


def main():
    existing = set()
    if os.path.exists(DATA):
        with open(DATA, newline="", encoding="utf-8-sig") as f:
            for r in csv.DictReader(f):
                existing.add(r["name"])

    files = []
    for d in GEN_DIRS:
        if os.path.isdir(d):
            files += [os.path.join(d, f) for f in os.listdir(d) if f.endswith(".txt")]
    files.sort()
    new_rows = []
    skipped = []
    per_country = {}
    for path in files:
        fn = os.path.basename(path)
        allow_any_country = "_gen_bulk" in path
        with open(path, encoding="utf-8") as f:
            for ln, raw in enumerate(f, 1):
                raw = raw.strip()
                if not raw or raw.startswith("#"):
                    continue
                p = parse_line(raw)
                if p is None:
                    skipped.append(f"{fn}:{ln} bad fields: {raw[:80]}")
                    continue
                name, country, city, rank, ielts, pte, toefl, gpa, tmin, tmax, site, status = p
                if not name:
                    skipped.append(f"{fn}:{ln} empty name")
                    continue
                if country not in ALLOWED and not allow_any_country:
                    skipped.append(f"{fn}:{ln} bad country {country!r}")
                    continue
                if name in existing:
                    continue
                existing.add(name)
                tmin_i, tmax_i = to_int(tmin), to_int(tmax)
                fees = ""
                if tmin_i is not None and tmax_i is not None:
                    fees = f"USD {tmin_i:,}-{tmax_i:,}/year"
                elif tmin_i is not None:
                    fees = f"USD {tmin_i:,}/year"
                new_rows.append({
                    "id": "",
                    "name": name,
                    "country": country,
                    "city": city or "",
                    "rank_world": rank if rank else "",
                    "intake_seasons": "Sep/Feb",
                    "ielts_min": ielts if ielts else "",
                    "pte_min": pte if pte else "",
                    "toefl_min": toefl if toefl else "",
                    "gpa_requirement": gpa,
                    "tuition_fees": fees,
                    "tuition_min_usd": tmin,
                    "tuition_max_usd": tmax,
                    "application_fee": "USD 50",
                    "documents_required": DOCS,
                    "deadlines": "Fall: Apr / Spring: Nov",
                    "official_website": f"https://{site}" if site else "",
                    "admissions_page": f"https://{site}" if site else "",
                    "notes": "",
                    "status": status if status in ("verified", "approx", "manual") else "approx",
                })
                per_country[country] = per_country.get(country, 0) + 1

    if new_rows:
        with open(DATA, "a", newline="", encoding="utf-8") as f:
            w = csv.DictWriter(f, fieldnames=list(new_rows[0].keys()))
            w.writerows(new_rows)

    print("added:", len(new_rows))
    for c, n in sorted(per_country.items()):
        print(f"  {c}: {n}")
    print("skipped:", len(skipped))
    for s in skipped[:40]:
        print("  ", s)


if __name__ == "__main__":
    main()
