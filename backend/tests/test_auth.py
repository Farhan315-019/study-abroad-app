import pytest


def _register(client, email="student@example.com", password="secretpass123", name="Ali"):
    return client.post(
        "/api/auth/register",
        json={"name": name, "email": email, "password": password},
    )


def test_health(client):
    r = client.get("/api/health")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"


def test_register_success(client):
    r = _register(client)
    assert r.status_code == 201
    data = r.json()
    assert data["token"]
    assert data["user"]["email"] == "student@example.com"
    assert data["user"]["is_admin"] is False


def test_register_normalizes_email(client):
    r = _register(client, email="  Ali@Example.COM ")
    assert r.status_code == 201
    assert r.json()["user"]["email"] == "ali@example.com"


def test_register_duplicate_email(client):
    assert _register(client, email="dup@example.com").status_code == 201
    r = _register(client, email="dup@example.com")
    assert r.status_code == 409


def test_register_short_password(client):
    r = _register(client, password="short")
    assert r.status_code == 422


def test_login_success(client):
    _register(client, email="login@example.com")
    r = client.post(
        "/api/auth/login",
        json={"email": "login@example.com", "password": "secretpass123"},
    )
    assert r.status_code == 200
    assert r.json()["token"]


def test_login_wrong_password(client):
    _register(client, email="wrong@example.com")
    r = client.post(
        "/api/auth/login",
        json={"email": "wrong@example.com", "password": "wrongpass123"},
    )
    assert r.status_code == 401


def test_me_requires_token(client):
    assert client.get("/api/auth/me").status_code == 401
    assert client.get("/api/auth/me", headers={"Authorization": "Bearer bad"}).status_code == 401


def test_me_with_token(client):
    r = _register(client, email="me@example.com")
    token = r.json()["token"]
    me = client.get("/api/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert me.status_code == 200
    assert me.json()["email"] == "me@example.com"


def test_logout_invalidates_token(client):
    r = _register(client, email="logout@example.com")
    token = r.json()["token"]
    headers = {"Authorization": f"Bearer {token}"}
    assert client.get("/api/auth/me", headers=headers).status_code == 200
    assert client.post("/api/auth/logout", headers=headers).status_code == 200
    assert client.get("/api/auth/me", headers=headers).status_code == 401
