from app.models import Scholarship, University


def _register(client, email="stu@test.com"):
    return client.post(
        "/api/auth/register",
        json={"name": "Stu", "email": email, "password": "secretpass123"},
    )


def _seed(client):
    unis = client.get("/api/universities", params={"page_size": 3}).json()["items"]
    assert len(unis) == 3, "seed data must be loaded before running tests"
    return unis[0]


def test_search_universities(client):
    r = client.get("/api/universities", params={"q": "Munich", "page_size": 5})
    assert r.status_code == 200
    body = r.json()
    assert body["total"] >= 1
    assert all("munich" in u["name"].lower() or "munich" in u["city"].lower() for u in body["items"])


def test_search_by_country_and_budget(client):
    r = client.get(
        "/api/universities",
        params={"country": "Germany", "budget_max": 5000, "page_size": 50},
    )
    body = r.json()
    assert body["total"] > 0
    for u in body["items"]:
        assert u["country"] == "Germany"
        assert (u["tuition_min_usd"] or 0) <= 5000


def test_university_detail_public(client):
    uni = _seed(client)
    r = client.get(f"/api/universities/{uni['id']}")
    assert r.status_code == 200
    assert r.json()["name"] == uni["name"]
    assert r.json()["admissions_page"]


def test_university_detail_404(client):
    assert client.get("/api/universities/99999").status_code == 404


def test_save_and_unsave_requires_auth(client):
    uni = _seed(client)
    assert client.post(f"/api/universities/{uni['id']}/save").status_code == 401


def test_save_unsave_flow(client):
    _register(client)
    token = client.post(
        "/api/auth/login", json={"email": "stu@test.com", "password": "secretpass123"}
    ).json()["token"]
    headers = {"Authorization": f"Bearer {token}"}
    uni = _seed(client)

    saved = client.post(f"/api/universities/{uni['id']}/save", headers=headers)
    assert saved.status_code == 200
    assert saved.json()["saved"] is True

    mine = client.get("/api/universities/saved/me", headers=headers)
    assert mine.status_code == 200
    assert any(u["id"] == uni["id"] for u in mine.json()["items"])

    unsaved = client.delete(f"/api/universities/{uni['id']}/save", headers=headers)
    assert unsaved.status_code == 200
    assert unsaved.json()["saved"] is False

    mine2 = client.get("/api/universities/saved/me", headers=headers)
    assert all(u["id"] != uni["id"] for u in mine2.json()["items"])


def test_profile_requires_auth(client):
    assert client.get("/api/me/profile").status_code == 401


def test_profile_upsert_flow(client):
    r = _register(client, email="pro@test.com")
    headers = {"Authorization": f"Bearer {r.json()['token']}"}

    assert client.get("/api/me/profile", headers=headers).json() is None

    payload = {
        "current_country": "Pakistan",
        "nationality": "Pakistan",
        "highest_education": "High school (FSc)",
        "gpa": 3.2,
        "ielts": 6.5,
        "budget_per_year_usd": 20000,
        "preferred_countries": "Canada, Germany, Malaysia",
        "target_intake": "Fall 2026",
        "goal": "Computer Science bachelor",
        "completed": True,
    }
    put = client.put("/api/me/profile", json=payload, headers=headers)
    assert put.status_code == 200
    body = put.json()
    assert body["gpa"] == 3.2
    assert body["budget_per_year_usd"] == 20000
    assert body["completed"] is True

    got = client.get("/api/me/profile", headers=headers)
    assert got.json()["current_country"] == "Pakistan"


def test_scholarships_list(client):
    r = client.get("/api/scholarships", params={"page_size": 5})
    assert r.status_code == 200
    body = r.json()
    assert body["total"] >= 50
    assert body["items"][0]["link"]


def test_scholarships_filter_by_country(client):
    r = client.get("/api/scholarships", params={"country": "United Kingdom"})
    body = r.json()
    assert body["total"] >= 5
    assert all(u["country"] == "United Kingdom" for u in body["items"])


def test_scholarship_detail(client):
    sch = client.get("/api/scholarships", params={"page_size": 1}).json()["items"][0]
    r = client.get(f"/api/scholarships/{sch['id']}")
    assert r.status_code == 200
    assert r.json()["name"] == sch["name"]


def test_partner_inquiry_creation(client):
    payload = {
        "university_name": "Test University",
        "country": "Canada",
        "contact_name": "Jane Dean",
        "email": "jane@testuniversity.edu",
        "role": "International Office",
        "website": "https://testuniversity.edu",
        "message": "We want to partner.",
    }
    r = client.post("/api/resources/partner-inquiries", json=payload)
    assert r.status_code == 201
    body = r.json()
    assert body["id"] > 0
    assert body["university_name"] == "Test University"
    assert body["status"] == "new"


def test_partner_inquiry_validation(client):
    r = client.post(
        "/api/resources/partner-inquiries",
        json={"university_name": "", "country": "", "contact_name": "", "email": "not-an-email", "role": ""},
    )
    assert r.status_code == 422
