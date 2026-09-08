# Food Analyzer — Backend

FastAPI service that receives an image, sends it to Gemini, and returns detected food ingredients.

## Setup

1. Create and activate a virtual environment:
   ```
   python -m venv venv
   .\venv\Scripts\activate
   ```
2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Copy `.env.example` to `.env` and set your real Gemini API key:
   ```
   copy .env.example .env
   ```

## Run

```
uvicorn app.main:app --reload
```

Open `http://127.0.0.1:8000/docs` to try the `POST /ingredients/analyze` endpoint by uploading an image.

## Docker

```
docker build -t food-analyzer-backend .
docker run --env-file .env -p 8000:8000 food-analyzer-backend
```
