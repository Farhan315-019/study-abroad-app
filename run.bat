@echo off
REM ============================================================
REM StudyAbroad.AI launcher
REM Prereqs: XAMPP MySQL running (study_abroad DB seeded), Node, Python venv
REM ============================================================
cd /d "%~dp0"

if not exist backend\.venv\Scripts\python.exe (
    echo [ERROR] Backend venv not found. Run:
    echo   cd backend ^& py -3.13 -m venv .venv ^& .venv\Scripts\pip install -r requirements.txt
    exit /b 1
)
if not exist frontend\node_modules (
    echo [ERROR] Frontend deps not installed. Run:
    echo   cd frontend ^& npm install
    exit /b 1
)

echo [1/3] Seeding database (creates tables + data if missing)...
cd backend
.venv\Scripts\python -m app.seed
if errorlevel 1 (
    echo [ERROR] Database seed failed. Make sure MySQL is running and study_abroad DB exists.
    exit /b 1
)
cd ..

echo [2/3] Starting backend on http://localhost:8000 ...
start "StudyAbroad Backend" cmd /k "cd /d %~dp0backend && .venv\Scripts\python -m uvicorn app.main:app --host 127.0.0.1 --port 8000"

echo [3/3] Starting frontend on http://localhost:5173 ...
start "StudyAbroad Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo Both servers launching. Backend: http://localhost:8000/docs
echo Frontend: http://localhost:5173
echo Note: the first registered user becomes the admin.
