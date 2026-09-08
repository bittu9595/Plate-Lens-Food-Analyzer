# PlateLens - Food Analyzer

PlateLens is an AI-powered food analyzer that turns a photo of ingredients into useful meal ideas.

Upload an image of food or a fridge, and the application:

1. Validates the uploaded image.
2. Sends it to Google Gemini for ingredient detection.
3. Parses and normalizes the detected ingredients.
4. Lets the user choose which ingredients to include.
5. Generates recipe suggestions based on those selected ingredients.

## Tech Stack

### Backend

- Python
- FastAPI
- Google Gemini API
- Pydantic
- Pillow

### Frontend

- React 19
- TypeScript
- Vite
- SCSS
- Material UI
- Lucide React icons

## Project Structure

```text
Plate-Lens-Food-Analyzer/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── ingredients.py     # Image-analysis API endpoint
│   │   │   └── recipes.py         # Recipe-generation API endpoint
│   │   ├── core/
│   │   │   └── config.py          # Environment settings
│   │   ├── schemas/
│   │   │   ├── ingredients.py     # Ingredient request/response models
│   │   │   └── recipes.py         # Recipe request/response models
│   │   ├── services/
│   │   │   ├── analyze_service.py # Validates images and starts analysis
│   │   │   ├── gemini_service.py  # Communicates with Gemini
│   │   │   └── recipe_service.py  # Creates recipe suggestions
│   │   └── main.py                # FastAPI app entry point
│   ├── .env.example
│   ├── .gitignore
│   ├── requirements.txt
│   ├── Dockerfile
│   └── README.md
│
└── frontend/
    ├── src/
    │   ├── api/                   # Backend API clients
    │   ├── components/            # Reusable UI components
    │   ├── layouts/               # Root layout and header
    │   ├── pages/                 # Application pages
    │   ├── styles/                # Global, light, dark, and SCSS variables
    │   ├── theme/                 # Light/dark mode context
    │   ├── types/                 # TypeScript interfaces
    │   ├── utils/                 # Shared frontend helpers
    │   ├── main.tsx               # React entry point
    │   └── router.tsx             # Application routes
    ├── .env.example
    ├── .gitignore
    └── package.json
```

## Prerequisites

Install the following before running the application:

- Python 3.10 or newer
- Node.js 20 or newer
- A Google Gemini API key

Create a Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey).

## Backend Setup

Open a terminal in the backend folder:

```powershell
cd backend
```

Create a Python virtual environment:

```powershell
python -m venv venv
```

Activate the virtual environment on Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

Install backend dependencies:

```powershell
pip install -r requirements.txt
```

Create the backend environment file:

```powershell
copy .env.example .env
```

Open `backend/.env` and add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Start the FastAPI server:

```powershell
uvicorn app.main:app --reload
```

The backend runs at `http://127.0.0.1:8000`.

Open FastAPI's interactive Swagger documentation at `http://127.0.0.1:8000/docs`.

## Frontend Setup

Open a second terminal in the frontend folder:

```powershell
cd frontend
```

Install frontend dependencies:

```powershell
npm install
```

Create the frontend environment file:

```powershell
copy .env.example .env
```

The frontend environment file should contain:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Start the Vite development server:

```powershell
npm run dev
```

Open the URL shown in the terminal, normally `http://localhost:5173`.

## Run the Full Application

Run backend and frontend in separate terminals.

### Terminal 1 - Backend

```powershell
cd backend
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload
```

### Terminal 2 - Frontend

```powershell
cd frontend
npm run dev
```

Then open `http://localhost:5173`.

## Backend Architecture

The backend follows a simple layered structure:

```text
API Route
    ↓
Service
    ↓
Gemini Service
    ↓
Google Gemini API
```

### Ingredient Analysis Flow

```text
Frontend uploads image
    ↓
POST /ingredients/analyze
    ↓
AnalyzeService reads image bytes
    ↓
Pillow validates the image
    ↓
GeminiService sends image to Gemini
    ↓
Gemini response is parsed as JSON
    ↓
Ingredient models validate the response
    ↓
Frontend receives ingredients
```

### Recipe Generation Flow

```text
Frontend sends selected ingredient names
    ↓
POST /recipes/generate
    ↓
RecipeService normalizes ingredient names
    ↓
GeminiService asks Gemini for recipe suggestions
    ↓
Gemini response is parsed as JSON
    ↓
Recipe models validate the response
    ↓
Frontend receives recipe ideas and steps
```

## API Endpoints

### Health Check

```text
GET /
```

Response:

```json
{
  "status": "ok"
}
```

### Analyze Ingredients

```text
POST /ingredients/analyze
```

Request type: `multipart/form-data`

Form field: `image`

Example response:

```json
{
  "ingredients": [
    {
      "name": "tomato",
      "category": "vegetable"
    },
    {
      "name": "egg",
      "category": "protein"
    }
  ]
}
```

### Generate Recipes

```text
POST /recipes/generate
```

Request body:

```json
{
  "ingredients": ["tomato", "egg", "bread"]
}
```

Example response:

```json
{
  "recipes": [
    {
      "name": "Tomato Egg Toast",
      "description": "A quick savory toast topped with tomato and egg.",
      "ingredients_used": ["tomato", "egg", "bread"],
      "steps": [
        "Toast the bread.",
        "Cook the egg.",
        "Top the toast with tomato and egg."
      ]
    }
  ]
}
```

## Frontend Features

- Drag-and-drop image upload
- Automatic ingredient analysis after selecting an image
- Animated scanning overlay while Gemini analyzes the image
- Ingredient selection with checkboxes
- Select all and deselect all controls
- Recipe suggestions based on selected ingredients
- Ingredients and recipes displayed in tabs
- Expandable recipe steps
- Responsive mobile and desktop layout
- Light and dark modes
- CSS-variable-based theme system
- Component-scoped SCSS styling

## Frontend Commands

Start development mode:

```powershell
npm run dev
```

Create a production build:

```powershell
npm run build
```

Run linting:

```powershell
npm run lint
```

Preview the production build:

```powershell
npm run preview
```

## Docker

Build the backend Docker image:

```powershell
cd backend
docker build -t platelens-backend .
```

Run the backend container:

```powershell
docker run --env-file .env -p 8000:8000 platelens-backend
```

The API will be available at `http://127.0.0.1:8000`.

## Environment Variables

### Backend

File: `backend/.env`

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### Frontend

File: `frontend/.env`

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Vite only exposes browser environment variables with the `VITE_` prefix.

## Security Notes

- Never commit `.env` files.
- Keep your Gemini API key private.
- Commit `.env.example` files only.
- Rotate your Gemini API key immediately if it is ever committed to Git history.
- Do not share screenshots or messages containing a real API key.

## Future Improvements

- Add user authentication.
- Save recipe history and favorites.
- Add recipe detail pages.
- Support dietary preferences such as vegetarian, vegan, and gluten-free.
- Allow manual ingredient additions and removals.
- Add ingredient quantities and confidence scores.
- Add backend and frontend tests.
- Replace the deprecated `google-generativeai` SDK with the current Google GenAI SDK.
