from app.api import ingredients, recipes
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Food Analyzer")

# Allows the Vite dev server (a different origin) to call this API from the browser.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ingredients.router, prefix="/api/ingredients")
app.include_router(recipes.router, prefix="/api/recipes")


@app.get("/api/")
async def health_check() -> dict[str, str]:
    return {"status": "ok"}
