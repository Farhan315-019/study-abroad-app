"""AI layer: optional LLM providers (OpenAI-compatible) + fallback engine.

Every feature works without an API key via the fallback engine; when a
provider is configured in Settings the AI is used to enhance responses.
"""
import re
from urllib.parse import urljoin

import httpx
from sqlalchemy import text

from ..models import Setting

DEFAULT_BASE_URLS = {
    "openai": "https://api.openai.com/v1",
    "openrouter": "https://openrouter.ai/api/v1",
    "groq": "https://api.groq.com/openai/v1",
    "gemini": "https://generativelanguage.googleapis.com/v1beta/openai",
    "ollama": "http://localhost:11434/v1",
}


def get_settings_map(db) -> dict:
    return {s.key: (s.value or "") for s in db.query(Setting).all()}


def ai_configured(settings: dict) -> bool:
    return bool(
        settings.get("ai_provider")
        and settings.get("ai_model")
        and settings.get("ai_api_key")
    )


def _endpoint(settings: dict) -> str:
    base = settings.get("ai_base_url") or DEFAULT_BASE_URLS.get(settings.get("ai_provider", ""), "")
    return urljoin(base.rstrip("/") + "/", "chat/completions")


def complete(settings: dict, messages: list[dict], max_tokens: int = 700, temperature: float = 0.3) -> str | None:
    """Call an OpenAI-compatible chat completions API. Returns text or None."""
    if not ai_configured(settings):
        return None
    headers = {"Authorization": f"Bearer {settings['ai_api_key']}"}
    if settings.get("ai_provider") == "openrouter":
        headers["HTTP-Referer"] = "http://localhost:5173"
        headers["X-Title"] = "StudyAbroad.AI"
    payload = {
        "model": settings["ai_model"],
        "messages": messages,
        "max_tokens": max_tokens,
        "temperature": temperature,
    }
    try:
        with httpx.Client(timeout=60) as client:
            resp = client.post(_endpoint(settings), json=payload, headers=headers)
            resp.raise_for_status()
            data = resp.json()
        content = data["choices"][0]["message"]["content"]
        return content.strip() if content else None
    except Exception:
        return None


def web_search(settings: dict, query: str, max_results: int = 5) -> list[dict]:
    """Search the web via Tavily or SerpAPI when configured."""
    provider = settings.get("websearch_provider", "").lower()
    key = settings.get("websearch_api_key", "")
    if not provider or not key:
        return []
    try:
        with httpx.Client(timeout=30) as client:
            if provider == "tavily":
                resp = client.post(
                    "https://api.tavily.com/search",
                    json={"api_key": key, "query": query, "max_results": max_results},
                )
                resp.raise_for_status()
                return [
                    {"title": r.get("title", ""), "url": r.get("url", ""), "snippet": r.get("content", "")}
                    for r in resp.json().get("results", [])
                ]
            if provider == "serpapi":
                resp = client.get(
                    "https://serpapi.com/search",
                    params={"q": query, "api_key": key, "engine": "google", "num": max_results},
                )
                resp.raise_for_status()
                out = []
                for r in resp.json().get("organic_results", []):
                    out.append(
                        {
                            "title": r.get("title", ""),
                            "url": r.get("link", ""),
                            "snippet": r.get("snippet", ""),
                        }
                    )
                return out
    except Exception:
        return []
    return []


FALLBACK_INTRO = (
    "I'm your study-abroad AI consultant. I can help with country comparisons, "
    "requirements, documents, deadlines, budgets and scholarships."
)

TOPIC_HINTS = {
    "ielts": "IELTS",
    "pte": "PTE",
    "toefl": "TOEFL",
    "document": "DOCUMENTS",
    "deadline": "DEADLINES",
    "dead line": "DEADLINES",
    "scholarship": "SCHOLARSHIP",
    "funding": "SCHOLARSHIP",
    "budget": "BUDGET",
    "cost": "BUDGET",
    "fee": "BUDGET",
    "country": "COUNTRIES",
    "german": "COUNTRIES",
    "canada": "COUNTRIES",
    "uk /": "COUNTRIES",
    "united kingdom": "COUNTRIES",
    "usa": "COUNTRIES",
    "australia": "COUNTRIES",
    "malaysia": "COUNTRIES",
    "recommend": "RECOMMEND",
    "which universit": "RECOMMEND",
    "good universit": "RECOMMEND",
    "best universit": "RECOMMEND",
    "university": "UNIVERSITY",
    "universities": "UNIVERSITY",
}


def detect_topic(question: str) -> str:
    q = question.lower()
    for hint, topic in TOPIC_HINTS.items():
        if hint in q:
            return topic
    return "GENERAL"


def _countries_summary(db) -> str:
    rows = db.execute(text(
        "SELECT country, COUNT(*) AS n, MIN(tuition_min_usd) AS min_cost "
        "FROM universities GROUP BY country ORDER BY n DESC LIMIT 10"
    )).all()
    return "\n".join(f"- {r[0]}: {r[1]} universities, tuition from ${r[2] or 0:,}/yr" for r in rows)


def _top_universities(db, limit: int = 8) -> str:
    rows = db.execute(text(
        "SELECT name, country, rank_world, ielts_min, tuition_min_usd, status "
        "FROM universities ORDER BY rank_world IS NULL, rank_world LIMIT :lim"
    ), {"lim": limit}).all()
    return "\n".join(
        f"- {r[0]} ({r[1]}), rank {r[2] or 'n/a'}, IELTS {r[3] or 'n/a'}, "
        f"from ${r[4] or 0:,}/yr [{r[5]}]"
        for r in rows
    )


def _scholarships_summary(db, limit: int = 5) -> str:
    rows = db.execute(text(
        "SELECT name, country, amount_per_year_usd FROM scholarships "
        "WHERE amount_per_year_usd > 0 ORDER BY amount_per_year_usd DESC LIMIT :lim"
    ), {"lim": limit}).all()
    return "\n".join(f"- {r[0]} ({r[1] or 'Global'}): up to ${r[2]:,}/yr" for r in rows)


def build_context(db) -> str:
    try:
        return (
            "Relevant local data (study abroad database):\n"
            "## Top ranked universities\n"
            f"{_top_universities(db)}\n\n"
            "## Countries we cover\n"
            f"{_countries_summary(db)}\n\n"
            "## Top scholarships\n"
            f"{_scholarships_summary(db)}"
        )
    except Exception:
        return "No local data available."


def ai_answer(settings: dict, db, question: str) -> str | None:
    system = (
        "You are a friendly study-abroad consultant helping a student from a South-Asian "
        "background plan their studies abroad. Be practical and specific. Use the provided "
        "database facts when relevant, and always tell the student to confirm on the official "
        "university website. Answer in short paragraphs."
    )
    return complete(
        settings,
        [
            {"role": "system", "content": system},
            {"role": "user", "content": f"Database:\n{build_context(db)}\n\nQuestion: {question}"},
        ],
    )


def fallback_answer(db, question: str) -> str:
    topic = detect_topic(question)
    q = question.lower()
    if topic == "UNIVERSITY":
        uni = db.execute(text(
            "SELECT name, country, ielts_min, pte_min, toefl_min, tuition_min_usd, "
            "application_fee, documents_required, deadlines, admissions_page "
            "FROM universities ORDER BY rank_world IS NULL, rank_world LIMIT 3"
        )).fetchall()
        lines = [
            "Popular universities in our database (top ranked):",
        ]
        for r in uni:
            lines.append(
                f"- {r[0]} ({r[1]}): IELTS {r[2] or 'n/a'}, PTE {r[3] or 'n/a'}, TOEFL {r[4] or 'n/a'}, "
                f"from ${r[5] or 0:,}/yr"
            )
        lines.append(
            "Every university links to its official admissions page where you can confirm "
            "requirements before applying."
        )
        return "\n".join(lines)
    if topic == "DOCUMENTS":
        return (
            "Typical documents for a study-abroad application:\n"
            "1. Academic transcripts + degree certificates (translated & attested if needed)\n"
            "2. Passport copy (valid 2+ years)\n"
            "3. English proficiency result (IELTS/PTE/TOEFL)\n"
            "4. Statement of Purpose (SOP)\n"
            "5. Letters of recommendation (usually 2)\n"
            "6. CV / resume\n"
            "7. Financial documents / bank statements\n"
            "8. Application fee receipt\n"
            "Each university's 'admissions page' lists the exact set — check the Details page."
        )
    if topic == "DEADLINES":
        return (
            "Deadlines depend on the university and intake. Most universities have Fall and "
            "Spring intakes, sometimes Winter/Summer.\n"
            "General rule of thumb:\n"
            "- Fall intake: apply 8-12 months before (Oct-Jan for many)\n"
            "- Spring intake: apply by Jun-Aug of the prior year\n"
            "- Some competitive universities close 12-18 months ahead\n"
            "Open the university Details page to see its deadlines, and always confirm on the "
            "official admissions page."
        )
    if topic == "SCHOLARSHIP":
        return (
            "Funding options in our database (by amount):\n"
            f"{_scholarships_summary(db, 8)}\n\n"
            "Tips: apply early, prepare a strong SOP, and also check government scholarships "
            "in your target country. See the Scholarships page for full details."
        )
    if topic == "BUDGET":
        return (
            "Annual budgets depend heavily on the country:\n"
            f"{_countries_summary(db)}\n\n"
            "Remember: tuition is only part of the cost — add living expenses "
            "(roughly $8,000-$20,000/yr depending on country), insurance, flights and visa fees."
        )
    if topic == "COUNTRIES":
        return (
            "Here is how the countries we cover compare:\n"
            f"{_countries_summary(db)}\n\n"
            "For affordability, Germany and Malaysia are popular for lower tuition; the UK, "
            "USA, Canada and Australia have higher fees but strong post-study work options."
        )
    if topic == "IELTS" or topic == "PTE":
        return (
            "English tests are required for most universities.\n"
            "- IELTS: typical minimum is 6.0-6.5 (band-wise too); 7.0+ for top universities.\n"
            "- PTE: typical minimum is 50-65; many universities accept PTE in place of IELTS.\n"
            "- TOEFL iBT: typical minimum 79-100.\n"
            "Check each university's exact minimum on its Details page — every requirement is "
            "linked to the official source."
        )
    if topic == "RECOMMEND":
        return (
            "To get personalized recommendations, complete your profile (GPA, IELTS, budget, "
            "preferred countries) and open the Recommendations page. I match you against 141 "
            "universities and explain the reasons behind each pick.\n"
            f"{_top_universities(db, 5)}"
        )
    return (
        FALLBACK_INTRO
        + "\n\nYou can ask me things like:\n"
        + "- Which countries are affordable for a $15,000 budget?\n"
        + "- What documents do I need for a UK university?\n"
        + "- Which universities accept IELTS 6.0?\n"
        + "- How do I apply for scholarships?\n"
        + "- What are typical application deadlines?"
    )


def consultant_answer(db, question: str, settings: dict) -> dict:
    """Returns {'text': ..., 'ai': bool}."""
    text = ai_answer(settings, db, question)
    if text:
        return {"text": text, "ai": True}
    return {"text": fallback_answer(db, question), "ai": False}


def verify_university(settings: dict, uni) -> dict:
    """Verification agent: web search + AI summary. Returns status/summary/sources.

    Always falls back to a manual/approx verdict when no tooling is configured.
    """
    query = f"{uni.name} {uni.country} admission requirements international students IELTS"
    sources = web_search(settings, query)
    summary = ""

    if sources:
        evidence = "\n".join(
            f"- {s['title']}: {s['snippet']}" for s in sources[:4]
        )
        if ai_configured(settings):
            verdict = complete(
                settings,
                [
                    {
                        "role": "system",
                        "content": (
                            "You are a university admissions researcher. Review the web evidence "
                            "and state whether our stored requirement for the university appears "
                            "accurate. Answer with one of: VERIFIED / APPROX / MANUAL, then one "
                            "short sentence of reasoning."
                        ),
                    },
                    {
                        "role": "user",
                        "content": (
                            f"University: {uni.name}\nStored: IELTS {uni.ielts_min}, "
                            f"tuition from ${uni.tuition_min_usd or 0}, status {uni.status}\n\n"
                            f"Web evidence:\n{evidence}"
                        ),
                    },
                ],
                max_tokens=120,
            )
            if verdict:
                if "VERIFIED" in verdict.upper():
                    status = "verified"
                elif "APPROX" in verdict.upper():
                    status = "approx"
                else:
                    status = "manual"
                summary = verdict
        else:
            summary = (
                f"Found {len(sources)} web results. No AI key configured to judge them, "
                "so this is marked APPROX."
            )
            status = "approx"
    else:
        status = "manual"
        summary = (
            "No web search key configured and no AI verdict. Marked MANUAL — confirm "
            "requirements on the official admissions page and update the status."
        )

    return {
        "status": status,
        "summary": summary.strip(),
        "sources": sources[:4],
        "query": query,
    }
