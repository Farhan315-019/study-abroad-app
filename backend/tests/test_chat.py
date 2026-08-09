import uuid

from app.models import ChatMessage, Setting, User


def _register(client, email=None, name="Chatty"):
    if email is None:
        email = f"chat-{uuid.uuid4().hex[:8]}@test.com"
    r = client.post(
        "/api/auth/register",
        json={"name": name, "email": email, "password": "secretpass123"},
    )
    return r.json()["token"], email


def test_chat_requires_auth(client):
    assert client.post("/api/chat", json={"message": "hi"}).status_code == 401


def test_chat_fallback_flow(client):
    token, _ = _register(client)
    headers = {"Authorization": f"Bearer {token}"}

    r = client.post("/api/chat", json={"message": "What documents do I need?"}, headers=headers)
    assert r.status_code == 200
    body = r.json()
    assert body["ai"] is False
    assert "document" in body["reply"].lower()
    assert any(m["role"] == "user" for m in body["history"])
    assert any(m["role"] == "assistant" for m in body["history"])


def test_chat_topics(client):
    token, _ = _register(client)
    headers = {"Authorization": f"Bearer {token}"}
    cases = {
        "What is the IELTS requirement for top universities?": "ielts",
        "Tell me about scholarships": "scholarship",
        "Which universities do you recommend?": "recommend",
        "What are typical deadlines?": "deadline",
    }
    for q, kw in cases.items():
        body = client.post("/api/chat", json={"message": q}, headers=headers).json()
        assert kw in body["reply"].lower(), (q, body["reply"])


def test_chat_history(client):
    token, _ = _register(client)
    headers = {"Authorization": f"Bearer {token}"}
    client.post("/api/chat", json={"message": "hello there"}, headers=headers)
    h = client.get("/api/chat/history", headers=headers).json()["messages"]
    assert any(m["content"] == "hello there" for m in h)


def test_settings_require_admin(client):
    assert client.get("/api/settings").status_code == 401


def test_settings_update_masks_keys(client, db):
    token, email = _register(client, name="Admin")
    admin = db.query(User).filter_by(email=email).first()
    admin.is_admin = True
    db.commit()
    token = client.post(
        "/api/auth/login", json={"email": email, "password": "secretpass123"}
    ).json()["token"]
    headers = {"Authorization": f"Bearer {token}"}

    payload = {
        "ai_provider": "openai",
        "ai_base_url": "",
        "ai_model": "gpt-4o-mini",
        "ai_api_key": "sk-test-123",
        "websearch_provider": "tavily",
        "websearch_api_key": "tvly-test",
    }
    assert client.put("/api/settings", json=payload, headers=headers).status_code == 200

    got = client.get("/api/settings", headers=headers).json()
    assert got["ai_provider"] == "openai"
    assert got["ai_api_key"] == {"set": True}
    assert "sk-test-123" not in str(got)

    from app.services.ai import get_settings_map

    assert get_settings_map(db)["ai_api_key"] == "sk-test-123"


def test_settings_non_admin_forbidden(client):
    token, _ = _register(client)
    headers = {"Authorization": f"Bearer {token}"}
    assert client.get("/api/settings", headers=headers).status_code == 403
    assert client.put("/api/settings", json={}, headers=headers).status_code == 403
