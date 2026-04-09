# Appointment Project

Appointment is a full-stack template project with:

- Frontend: Vite + React
- Backend: Python + FastAPI + LangChain
- Cursor config: reusable AI rules and scripts

## Project Structure

```text
my_project/
├─ frontend/
├─ backend/
├─ zcursor/
├─ config.json
└─ README.md
```

## Quick Start

### 1) Frontend

```bash
cd frontend
npm install
npm run dev
```

### 2) Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## API Test

Open:

- `http://127.0.0.1:8000/health`

Expected response:

```json
{
  "status": "ok"
}
```

## zcursor Usage

`zcursor` stores AI collaboration context and helper scripts.

- `zcursor/rules/`: rule definitions for coding behavior and doc constraints
- `zcursor/documents/`: project knowledge docs (flow, interaction, data notes)
- `zcursor/context/`: session state and lightweight history
- `zcursor/scripts/`: helper scripts to load docs/rules and run AI workflows

### Recommended Flow

1. Maintain rules in `zcursor/rules/`
2. Keep docs up to date in `zcursor/documents/`
3. Run helper scripts from `zcursor/scripts/` during AI-assisted development
