# Books Web App (Python + React)

A simple full-stack web app for managing books.

## Tech Stack

- **Backend:** Python (Flask)
- **Frontend:** React + Vite

## Project Structure

- `backend/` Flask API with in-memory books list
- `frontend/` React app that fetches and creates books

## Backend Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

Backend runs at `http://localhost:5000`.

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` and calls backend API at `http://localhost:5000`.

To change API URL, set `VITE_API_BASE_URL`.
