import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from .config import FRONTEND_URL
from .db import Base, engine
from .routers import (
    admin,
    applications,
    auth,
    chat,
    destinations,
    recommendations,
    resources,
    scholarships,
    settings,
    students,
    universities,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="Study Abroad AI API",
    version="0.1.0",
    lifespan=lifespan,
)

_cors_origins = [
    o
    for o in [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        FRONTEND_URL,
    ]
    if o
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(universities.router)
app.include_router(scholarships.router)
app.include_router(students.router)
app.include_router(destinations.router)
app.include_router(recommendations.router)
app.include_router(chat.router)
app.include_router(settings.router)
app.include_router(applications.router)
app.include_router(resources.router)
app.include_router(admin.router)


@app.get("/api/health")
def health():
    return {"status": "ok"}


FRONTEND_DIST = os.getenv("FRONTEND_DIST", "")
if FRONTEND_DIST and os.path.isdir(FRONTEND_DIST):
    assets_dir = os.path.join(FRONTEND_DIST, "assets")
    if os.path.isdir(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")
    index_file = os.path.join(FRONTEND_DIST, "index.html")

    @app.get("/{full_path:path}", include_in_schema=False)
    def spa(full_path: str):
        candidate = os.path.join(FRONTEND_DIST, full_path)
        if full_path and os.path.isfile(candidate):
            return FileResponse(candidate)
        return FileResponse(index_file)
