# Notes App

Full-stack notes management application with Django REST Framework backend and React frontend.

## Prerequisites

- Python 3.8+
- Node.js 16+
- SQLite (included with Python)

## Installation

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

Backend runs on `http://127.0.0.1:8000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

## Project Structure

```
notes-app/
├── backend/
│   ├── notes_api/          # Django project
│   ├── notes/              # Notes app
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── api/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## API Endpoints

- `GET /api/v1/notes/` - List notes (paginated, 3 per page)
- `GET /api/v1/notes/?search=<term>` - Search notes
- `GET /api/v1/notes/?page=<number>` - Get specific page
- `POST /api/v1/notes/` - Create note
- `GET /api/v1/notes/<uuid>/` - Get note
- `PUT /api/v1/notes/<uuid>/` - Update note
- `DELETE /api/v1/notes/<uuid>/` - Delete note

## Technologies

- Backend: Django 5.0.3, Django REST Framework 3.14.0, django-cors-headers 4.3.1
- Frontend: React 18.2.0, Vite 5.0.8
- Database: SQLite
