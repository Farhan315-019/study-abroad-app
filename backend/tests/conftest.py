import os
import sys

os.environ["DATABASE_URL"] = (
    "mysql+pymysql://root:@localhost/study_abroad_test?charset=utf8mb4"
)
os.environ["SECRET_KEY"] = "test-secret-key-0123456789-0123456789"

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pymysql  # noqa: E402
import pytest  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402


def _ensure_test_db():
    conn = pymysql.connect(host="localhost", user="root", password="")
    try:
        with conn.cursor() as cur:
            cur.execute(
                "CREATE DATABASE IF NOT EXISTS study_abroad_test "
                "CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
            )
        conn.commit()
    finally:
        conn.close()


_ensure_test_db()

from app.db import Base, SessionLocal, engine  # noqa: E402
from app.main import app  # noqa: E402
from app.seed import seed_scholarships, seed_settings, seed_universities  # noqa: E402


@pytest.fixture(scope="session", autouse=True)
def _prepare_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_universities(db)
        seed_scholarships(db)
        seed_settings(db)
    finally:
        db.close()
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.fixture()
def client():
    with TestClient(app) as c:
        yield c


@pytest.fixture()
def db():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
