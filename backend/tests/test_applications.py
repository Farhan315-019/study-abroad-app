import uuid

from app.models import University


def _register(client):
    email = f"app-{uuid.uuid4().hex[:8]}@test.com"
    r = client.post(
        "/api/auth/register",
        json={"name": "Applier", "email": email, "password": "secretpass123"},
    )
    return r.json()["token"]


def _uni_id(client):
    return client.get("/api/universities", params={"page_size": 1}).json()["items"][0]["id"]


def test_applications_require_auth(client):
    assert client.get("/api/applications").status_code == 401


def test_add_list_remove_flow(client):
    token = _register(client)
    headers = {"Authorization": f"Bearer {token}"}
    uid = _uni_id(client)

    r = client.post("/api/applications", json={"university_id": uid}, headers=headers)
    assert r.status_code == 200
    app_id = r.json()["id"]

    mine = client.get("/api/applications", headers=headers)
    assert mine.status_code == 200
    assert any(a["id"] == app_id for a in mine.json()["items"])

    assert (
        client.delete(f"/api/applications/{app_id}", headers=headers).status_code == 200
    )
    mine2 = client.get("/api/applications", headers=headers)
    assert all(a["id"] != app_id for a in mine2.json()["items"])


def test_application_cap_and_duplicate(client):
    token = _register(client)
    headers = {"Authorization": f"Bearer {token}"}
    unis = client.get("/api/universities", params={"page_size": 10}).json()["items"]
    for u in unis:
        r = client.post("/api/applications", json={"university_id": u["id"]}, headers=headers)
        assert r.status_code == 200, r.text

    extra = client.get("/api/universities", params={"page_size": 1, "offset": 10}).json()
    if extra["total"] > 10:
        r = client.post(
            "/api/applications", json={"university_id": extra["items"][0]["id"]}, headers=headers
        )
        assert r.status_code == 400
        assert "max 10" in r.json()["detail"]

    dup = client.post("/api/applications", json={"university_id": unis[0]["id"]}, headers=headers)
    assert dup.status_code == 400


def test_drafts_generated(client):
    token = _register(client)
    headers = {"Authorization": f"Bearer {token}"}
    uid = _uni_id(client)
    app_id = client.post(
        "/api/applications", json={"university_id": uid}, headers=headers
    ).json()["id"]

    sop = client.post(f"/api/applications/{app_id}/draft-sop", headers=headers)
    assert sop.status_code == 200
    assert "Statement of Purpose" in sop.json()["sop_draft"]

    email = client.post(
        f"/api/applications/{app_id}/draft-email",
        json={"purpose": "the program start date"},
        headers=headers,
    )
    assert email.status_code == 200
    assert "Subject:" in email.json()["email_draft"]

    chk = client.post(f"/api/applications/{app_id}/checklist", headers=headers)
    assert chk.status_code == 200
    assert "transcripts" in chk.json()["checklist"].lower()

    pkg = client.get("/api/applications/package", headers=headers)
    assert pkg.status_code == 200
    assert pkg.json()["user"]["name"] == "Applier"
    assert len(pkg.json()["applications"]) == 1


def test_update_status_and_permissions(client):
    token = _register(client)
    headers = {"Authorization": f"Bearer {token}"}
    uid = _uni_id(client)
    app_id = client.post(
        "/api/applications", json={"university_id": uid}, headers=headers
    ).json()["id"]

    r = client.patch(
        f"/api/applications/{app_id}", json={"status": "submitted", "notes": "sent SOP"}, headers=headers
    )
    assert r.status_code == 200
    assert r.json()["status"] == "submitted"
    assert r.json()["notes"] == "sent SOP"

    bad = client.patch(f"/api/applications/{app_id}", json={"status": "nonsense"}, headers=headers)
    assert bad.status_code == 400

    token2 = _register(client)
    headers2 = {"Authorization": f"Bearer {token2}"}
    assert client.patch(
        f"/api/applications/{app_id}", json={"status": "submitted"}, headers=headers2
    ).status_code == 404
    assert client.delete(f"/api/applications/{app_id}", headers=headers2).status_code == 404
