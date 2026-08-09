"""Generate bulk university rows from the Hipolabs public dataset (data/hipolabs_all.json).
Writes pipe-delimited 12-field files into backend/_gen_bulk/. Run: python gen_hipolabs_bulk.py
"""
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "data", "hipolabs_all.json")
OUT_DIR = os.path.join(HERE, "_gen_bulk")

COUNTRY_MAP = {
    "Moldova, Republic of": "Moldova",
    "Russian Federation": "Russia",
    "Korea, Republic of": "South Korea",
    "Turkiye": "Turkey",
    "United Arab Emirates": "UAE",
    "United States": "USA",
}

CHUNKS = 8


def clean(v):
    if not v:
        return ""
    v = re.sub(r"\s+", " ", v).strip()
    return v.replace("|", "/")


def main():
    rows = json.load(open(DATA, encoding="utf-8"))
    os.makedirs(OUT_DIR, exist_ok=True)
    chunks = [[] for _ in range(CHUNKS)]
    seen = set()
    skipped = 0
    for i, r in enumerate(rows):
        name = clean(r.get("name"))
        if not name:
            skipped += 1
            continue
        country = COUNTRY_MAP.get(r.get("country"), r.get("country") or "")
        if not country:
            skipped += 1
            continue
        key = (name.lower(), country.lower())
        if key in seen:
            skipped += 1
            continue
        seen.add(key)
        city = clean(r.get("state-province"))
        site = ""
        if r.get("domains"):
            site = clean(r["domains"][0])
        line = f"{name}|{country}|{city}||||||||{site}|approx"
        chunks[i % CHUNKS].append(line)

    for idx, chunk in enumerate(chunks):
        path = os.path.join(OUT_DIR, f"bulk_{idx + 1}.txt")
        with open(path, "w", encoding="utf-8") as f:
            f.write("\n".join(chunk) + "\n")
    print(f"rows written: {len(seen)}  skipped: {skipped}  files: {len(chunks)}")


if __name__ == "__main__":
    main()
