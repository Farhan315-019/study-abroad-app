# StudyAbroad.AI

A full-stack study-abroad assistant for South-Asian students. It helps students find
universities, discover scholarships, get AI-powered guidance, track applications and
generate SOP/email/checklist drafts.

## Stack

- **Backend**: FastAPI + SQLAlchemy + MySQL (XAMPP or Docker), JWT auth, optional LLM providers
- **Frontend**: React + Vite + TypeScript + Tailwind CSS
- **AI**: Works fully offline via a built-in fallback engine; optionally enhanced with
  OpenAI / OpenRouter / Groq / Gemini / Ollama + Tavily/SerpAPI web search.

## Features

- University catalog (141 universities, searchable, with verified/adjusted requirements)
- Scholarship catalog + **profile-matched scholarships**
- Personalized country & university recommendations with explained reasons
- AI consultant chat (streams from DB when no AI key, LLM when configured)
- Application tracker with SOP / email / checklist draft generator
- Printable application package
- **Admin dashboard**: stats, university verification agent, user management,
  application oversight, scholarship CRUD
- AI settings configuration (provider, model, keys) stored server-side
- **3D illustration design system**: built-in isometric SVG art (`src/components/Art.tsx`)
  across the homepage and all main pages — optional AI-generated photos drop in
  automatically when generated (see below)

## Quick start (local, no Docker)

Prereqs: XAMPP MySQL running (or any MySQL), Node 18+, Python 3.13.

```bash
# 1. Create the database (once)
mysql -u root -e "CREATE DATABASE IF NOT EXISTS study_abroad CHARACTER SET utf8mb4"

# 2. Backend
cd backend
py -3.13 -m venv .venv
.venv\Scripts\pip install -r requirements.txt
copy .env.example .env        # edit DATABASE_URL / SECRET_KEY if needed

# 3. Frontend
cd ../frontend
npm install

# 4. Run everything (seeds DB, starts backend :8000 and frontend :5173)
cd ..
run.bat
```

- Frontend: http://localhost:5173
- API docs: http://localhost:8000/docs
- The first registered user becomes the admin.

## Docker deployment

```bash
docker compose up --build
```

- Frontend: http://localhost:8080
- API docs: http://localhost:8000/docs
- MySQL runs in a named volume (`db_data`); the backend seeds the DB on startup.

Environment variables for the backend container:

| Variable      | Default                              | Purpose                        |
| ------------- | ------------------------------------ | ------------------------------ |
| `DATABASE_URL`| `mysql+pymysql://root:@localhost/...`| SQLAlchemy connection string   |
| `SECRET_KEY`  | `dev-secret-change-me-in-production` | JWT signing secret             |
| `JWT_ALGORITHM`| `HS256`                             | JWT algorithm                  |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `60`                | Session length                 |

## Tests

```bash
cd backend
.venv\Scripts\pytest          # requires a running MySQL (uses study_abroad_test DB)
```

Frontend typecheck + production build:

```bash
cd frontend
npm run build
```

## Data

- `backend/data/universities.csv` — university catalog (seeded on startup / via `python -m app.seed`)
- `backend/data/scholarships.csv` — scholarship catalog
- `backend/scripts/build_universities.py` — rebuilds `universities.csv` from the HipoLabs API

## Design & AI image generation

The UI ships with built-in **3D isometric SVG illustrations** (`frontend/src/components/Art.tsx`)
used by a shared `PageHero` component, so every main page has a themed hero illustration
(globe, campus, scholarship, robot, rocket, documents, visa) with floating/glow animations.

A **journey-themed motion system** (`frontend/src/components/Effects.tsx` + `index.css`) powers
the animated experience: a paper plane flying along a dotted flight route, orbiting
plane/passport/grad-cap icon chips, typewriter headline, floating destination chips, magnetic
buttons, scroll progress bar, cursor ambient glow, staggered entrances, and an animated gradient
mesh behind every page (all respect `prefers-reduced-motion`).

To optionally upgrade to **AI-generated photorealistic images** (needs an OpenAI API key):

```bash
cd backend
.venv\Scripts\python -m scripts.generate_images --list       # see the 8 available images
.venv\Scripts\python -m scripts.generate_images             # generate all (uses OPENAI_API_KEY)
.venv\Scripts\python -m scripts.generate_images --name hero-student   # single image
```

Images are written to `frontend/public/images/ai/` (gitignored). The `PageHero` component
auto-detects them and swaps the SVG fallback for the generated PNG — no code changes needed.
Delete the PNGs to go back to the built-in SVG art.

## Admin usage

1. Register a normal account (the first user becomes admin automatically).
2. Open the **Admin** tab:
   - **Overview** — platform stats
   - **Verification** — mark universities verified/approx/manual, run the web-search agent
   - **Users** — promote/demote/delete users
   - **Applications** — see every student application
   - **Scholarships** — add/edit/delete scholarships
3. Optional: add AI keys in **Settings** to enable LLM chat and the verification agent.
