from app.models import Scholarship, StudentProfile, University
from app.services import recommendations as reco


def _register(client, email="reco@test.com"):
    r = client.post(
        "/api/auth/register",
        json={"name": "Reco", "email": email, "password": "secretpass123"},
    )
    return r.json()["token"]


def test_recommendations_requires_profile(client):
    token = _register(client)
    headers = {"Authorization": f"Bearer {token}"}
    assert client.get("/api/recommendations", headers=headers).status_code == 404


def test_recommendations_unauth(client):
    assert client.get("/api/recommendations").status_code == 401


def test_recommendations_after_profile(client, db):
    token = _register(client, email="reco2@test.com")
    headers = {"Authorization": f"Bearer {token}"}
    payload = {
        "gpa": 3.1,
        "ielts": 6.5,
        "budget_per_year_usd": 15000,
        "preferred_countries": "Germany, Canada",
        "completed": True,
    }
    assert client.put("/api/me/profile", json=payload, headers=headers).status_code == 200

    r = client.get("/api/recommendations", headers=headers)
    assert r.status_code == 200
    body = r.json()
    assert len(body["universities"]) > 0
    assert len(body["countries"]) > 0
    assert all("reasons" in u for u in body["universities"])
    assert any(u["university"]["country"] == "Germany" for u in body["universities"])


def test_recommendations_prefers_country(client):
    token = _register(client, email="reco3@test.com")
    headers = {"Authorization": f"Bearer {token}"}
    r = client.post(
        "/api/recommendations",
        json={
            "gpa": 3.0,
            "ielts": 6.0,
            "budget_per_year_usd": 12000,
            "preferred_countries": "Malaysia",
            "limit": 5,
        },
        headers=headers,
    )
    assert r.status_code == 200
    unis = r.json()["universities"]
    assert unis
    assert unis[0]["university"]["country"] == "Malaysia"


def test_recommend_engine_reasons(db):
    profile = StudentProfile(
        gpa=3.4,
        ielts=7.0,
        budget_per_year_usd=30000,
        preferred_countries="United States",
    )
    result = reco.recommend(db, profile, limit=10)
    assert result["universities"]
    top = result["universities"][0]
    assert top["score"] > 0
    assert any("IELTS" in r or "IELTS" in r for r in top["reasons"])
    assert any("preferred" in r.lower() for r in top["reasons"])


def test_recommend_engine_excludes_exceeding_budget(db):
    profile = StudentProfile(budget_per_year_usd=2000, preferred_countries="USA")
    result = reco.recommend(db, profile, limit=10**9)
    expensive = [
        u for u in result["universities"]
        if u["university"]["country"] == "USA" and u["university"]["tuition_min_usd"]
    ]
    assert expensive
    worst = expensive[-1]
    assert any("exceeds" in r.lower() for r in worst["reasons"])
