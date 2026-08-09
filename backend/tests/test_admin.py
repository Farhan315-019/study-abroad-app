import uuid

from app.models import User


def _admin(client, db):
    email = f"admin-{uuid.uuid4().hex[:8]}@test.com"
    token = client.post(
        "/api/auth/register",
        json={"name": "Root", "email": email, "password": "secretpass123"},
    ).json()["token"]
    u = db.query(User).filter_by(email=email).first()
    u.is_admin = True
    db.commit()
    return {"Authorization": f"Bearer {token}"}


def _user(client, db):
    _admin(client, db)
    email = f"user-{uuid.uuid4().hex[:8]}@test.com"
    token = client.post(
        "/api/auth/register",
        json={"name": "Plain", "email": email, "password": "secretpass123"},
    ).json()["token"]
    return {"Authorization": f"Bearer {token}"}


def test_admin_endpoints_require_admin(client):
    assert client.get("/api/admin/universities").status_code == 401


def test_non_admin_forbidden(client, db):
    headers = _user(client, db)
    assert client.get("/api/admin/universities", headers=headers).status_code == 403
    assert (
        client.patch(
            "/api/admin/universities/1",
            json={"status": "verified"},
            headers=headers,
        ).status_code
        == 403
    )


def test_admin_list_and_update_status(client, db):
    headers = _admin(client, db)
    r = client.get("/api/admin/universities", params={"page_size": 5}, headers=headers)
    assert r.status_code == 200
    body = r.json()
    assert body["total"] >= 100
    uni = body["items"][0]

    up = client.patch(
        f"/api/admin/universities/{uni['id']}",
        json={"status": "verified", "notes": "checked on official site"},
        headers=headers,
    )
    assert up.status_code == 200
    assert up.json()["status"] == "verified"
    assert up.json()["verified_at"] is not None

    bad = client.patch(
        f"/api/admin/universities/{uni['id']}", json={"status": "bogus"}, headers=headers
    )
    assert bad.status_code == 400

    filtered = client.get(
        "/api/admin/universities", params={"status": "verified"}, headers=headers
    ).json()
    assert all(u["status"] == "verified" for u in filtered["items"])


def test_verification_agent_fallback(client, db):
    headers = _admin(client, db)
    unis = client.get(
        "/api/admin/universities", params={"page_size": 1}, headers=headers
    ).json()["items"]
    r = client.post(f"/api/admin/universities/{unis[0]['id']}/verify", headers=headers)
    assert r.status_code == 200
    body = r.json()
    assert body["university"]["id"] == unis[0]["id"]
    assert body["status"] in {"verified", "approx", "manual"}
