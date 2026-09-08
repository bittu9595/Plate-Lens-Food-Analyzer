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
    │   └── main.tsx               # React entry point
    ├── .env.example
    └── package.json
```
