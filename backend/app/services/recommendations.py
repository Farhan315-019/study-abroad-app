"""Recommendation engine: scores universities and countries for a student profile."""
from collections import defaultdict

from sqlalchemy.orm import Session

from .. import models


def parse_countries(value: str | None) -> set[str]:
    if not value:
        return set()
    return {c.strip().lower() for c in value.split(",") if c.strip()}


def _lang_score(profile, uni) -> tuple[int, str]:
    score = 0
    reasons = []
    if profile.ielts is not None and uni.ielts_min is not None:
        if profile.ielts >= uni.ielts_min:
            score += 15
            reasons.append(
                f"IELTS {profile.ielts} meets the {uni.ielts_min} minimum"
            )
        elif profile.ielts + 0.5 >= uni.ielts_min:
            score += 4
            reasons.append(
                f"IELTS {profile.ielts} is slightly below {uni.ielts_min}; a retake or English course may help"
            )
        else:
            score -= 15
            reasons.append(f"IELTS requirement is {uni.ielts_min} but you have {profile.ielts}")
    if profile.pte is not None and uni.pte_min is not None:
        if profile.pte >= uni.pte_min:
            score += 8
            reasons.append(f"PTE {profile.pte} meets the {uni.pte_min} minimum")
        else:
            score -= 8
            reasons.append(f"PTE requirement is {uni.pte_min} but you have {profile.pte}")
    return score, reasons


def _budget_score(profile, uni) -> tuple[int, str]:
    if profile.budget_per_year_usd is None or uni.tuition_min_usd is None:
        return 0, []
    budget = profile.budget_per_year_usd
    if budget >= uni.tuition_min_usd:
        return 20, [f"Tuition from ${uni.tuition_min_usd:,}/yr fits your ${budget:,} budget"]
    if budget * 0.7 >= uni.tuition_min_usd:
        return 5, [f"Tuition (from ${uni.tuition_min_usd:,}) is close to your ${budget:,} budget"]
    return -25, [f"Tuition from ${uni.tuition_min_usd:,}/yr exceeds your ${budget:,} budget"]


def _gpa_score(profile, uni) -> tuple[int, str]:
    if profile.gpa is None or uni.rank_world is None:
        return 0, []
    if profile.gpa >= 3.3:
        if uni.rank_world <= 100:
            return 8, [f"Strong GPA ({profile.gpa}) suits this top-{uni.rank_world} ranked university"]
        return 5, [f"Solid GPA ({profile.gpa}) is competitive here"]
    if profile.gpa >= 2.8:
        if uni.rank_world <= 100:
            return -6, [f"Ranked #{uni.rank_world} is competitive for a GPA of {profile.gpa}"]
        return 6, [f"GPA {profile.gpa} fits this university's typical range"]
    if uni.rank_world <= 100:
        return -12, [f"Top-ranked schools usually expect a higher GPA than {profile.gpa}"]
    return 4, ["Less competitive entry; matches your GPA profile"]


def recommend(db: Session, profile, limit: int = 15) -> dict:
    universities = db.query(models.University).all()
    scholarship_count = defaultdict(int)
    for s in db.query(models.Scholarship.country).all():
        if s[0]:
            scholarship_count[s[0].lower()] += 1

    preferred = parse_countries(profile.preferred_countries)
    results = []
    for uni in universities:
        score = 0
        reasons = []

        if uni.country.lower() in preferred:
            score += 30
            reasons.append("Country is in your preferred list")
        elif preferred:
            score -= 5
            reasons.append(f"Not in your preferred countries ({', '.join(sorted(preferred))})")

        b_score, b_reasons = _budget_score(profile, uni)
        score += b_score
        reasons.extend(b_reasons)

        l_score, l_reasons = _lang_score(profile, uni)
        score += l_score
        reasons.extend(l_reasons)

        g_score, g_reasons = _gpa_score(profile, uni)
        score += g_score
        reasons.extend(g_reasons)

        if uni.status == "verified":
            score += 5
            reasons.append("Requirements verified from the official source")

        if scholarship_count[uni.country.lower()] > 0:
            score += 5
            reasons.append(
                f"{scholarship_count[uni.country.lower()]} scholarship(s) available in {uni.country}"
            )

        results.append(
            {
                "university": {
                    "id": uni.id,
                    "name": uni.name,
                    "country": uni.country,
                    "city": uni.city,
                    "rank_world": uni.rank_world,
                    "tuition_min_usd": uni.tuition_min_usd,
                    "ielts_min": uni.ielts_min,
                    "status": uni.status,
                },
                "score": score,
                "reasons": reasons[:6],
            }
        )

    results.sort(key=lambda r: r["score"], reverse=True)

    by_country = defaultdict(
        lambda: {"score": 0, "count": 0, "tuitions": [], "reasons": defaultdict(int)}
    )
    for r in results:
        key = r["university"]["country"].lower()
        c = by_country[key]
        c["score"] += max(0, r["score"])
        c["count"] += 1
        if r["university"]["tuition_min_usd"]:
            c["tuitions"].append(r["university"]["tuition_min_usd"])
        for reason in r["reasons"]:
            c["reasons"][reason] += 1

    countries = []
    for key, c in by_country.items():
        display_name = next(
            u["university"]["country"]
            for u in results
            if u["university"]["country"].lower() == key
        )
        top_reasons = sorted(c["reasons"].items(), key=lambda x: x[1], reverse=True)[:3]
        countries.append(
            {
                "country": display_name,
                "score": c["score"] / max(1, c["count"]),
                "universities": c["count"],
                "avg_tuition_min_usd": (
                    round(sum(c["tuitions"]) / len(c["tuitions"])) if c["tuitions"] else None
                ),
                "scholarships": scholarship_count[key],
                "top_reasons": [r for r, _ in top_reasons],
            }
        )
    countries.sort(key=lambda c: c["score"], reverse=True)

    return {
        "profile_summary": {
            "ielts": profile.ielts,
            "pte": profile.pte,
            "gpa": profile.gpa,
            "budget_per_year_usd": profile.budget_per_year_usd,
            "preferred_countries": profile.preferred_countries,
        },
        "countries": countries,
        "universities": results[:limit],
    }
