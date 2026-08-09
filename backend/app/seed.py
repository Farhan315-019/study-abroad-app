"""Seed the study_abroad database from data/*.csv. Run: python -m app.seed"""
import csv
import os
from datetime import datetime, timezone

from .db import Base, SessionLocal, engine
from .models import Scholarship, Setting, University

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")


def _utcnow():
    return datetime.now(timezone.utc).replace(tzinfo=None)


def _read_csv(filename):
    path = os.path.join(DATA_DIR, filename)
    with open(path, newline="", encoding="utf-8-sig") as f:
        return list(csv.DictReader(f))


def _to_int(value):
    try:
        return int(float(value)) if value else None
    except (TypeError, ValueError):
        return None


def seed_universities(db):
    rows = _read_csv("universities.csv")
    existing = {u.name: u for u in db.query(University).all()}
    count = 0
    updated = 0
    for r in rows:
        fields = dict(
            country=r["country"],
            city=r["city"] or None,
            rank_world=_to_int(r["rank_world"]),
            intake_seasons=r["intake_seasons"] or None,
            ielts_min=float(r["ielts_min"]) if r["ielts_min"] else None,
            pte_min=float(r["pte_min"]) if r["pte_min"] else None,
            toefl_min=_to_int(r["toefl_min"]),
            gpa_requirement=r["gpa_requirement"] or None,
            tuition_fees=r["tuition_fees"] or None,
            tuition_min_usd=_to_int(r["tuition_min_usd"]),
            tuition_max_usd=_to_int(r["tuition_max_usd"]),
            application_fee=r["application_fee"] or None,
            documents_required=r["documents_required"] or None,
            deadlines=r["deadlines"] or None,
            official_website=r["official_website"] or None,
            admissions_page=r["admissions_page"] or None,
            notes=r["notes"] or None,
            status=r["status"] or "approx",
        )
        if r["status"] == "verified":
            fields["verified_at"] = _utcnow()
        uni = existing.get(r["name"])
        if uni is None:
            db.add(University(name=r["name"], **fields))
            count += 1
        else:
            for k, v in fields.items():
                setattr(uni, k, v)
            updated += 1
    db.commit()
    return count, updated


def seed_scholarships(db):
    rows = _read_csv("scholarships.csv")
    existing = {s.name: s for s in db.query(Scholarship).all()}
    count = 0
    updated = 0
    for r in rows:
        fields = dict(
            country=r["country"] or None,
            eligibility=r["eligibility"] or None,
            coverage=r["coverage"] or None,
            amount_per_year_usd=_to_int(r["amount_per_year_usd"]),
            deadline=r["deadline"] or None,
            link=r["link"] or None,
            notes=r["notes"] or None,
            status=r["status"] or "approx",
        )
        sch = existing.get(r["name"])
        if sch is None:
            db.add(Scholarship(name=r["name"], **fields))
            count += 1
        else:
            for k, v in fields.items():
                setattr(sch, k, v)
            updated += 1
    db.commit()
    return count, updated


def seed_settings(db):
    defaults = {
        "ai_provider": "",
        "ai_base_url": "",
        "ai_model": "",
        "ai_api_key": "",
        "websearch_provider": "",
        "websearch_api_key": "",
        "hipolabs_refresh_hours": "72",
    }
    count = 0
    for k, v in defaults.items():
        if db.get(Setting, k) is None:
            db.add(Setting(key=k, value=v))
            count += 1
    db.commit()
    return count


def main():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        u_added, u_updated = seed_universities(db)
        s_added, s_updated = seed_scholarships(db)
        print(f"universities added={u_added} updated={u_updated}")
        print(f"scholarships added={s_added} updated={s_updated}")
        print(f"settings added: {seed_settings(db)}")
        print(
            "totals: "
            f"universities={db.query(University).count()}, "
            f"scholarships={db.query(Scholarship).count()}"
        )
    finally:
        db.close()


if __name__ == "__main__":
    main()
