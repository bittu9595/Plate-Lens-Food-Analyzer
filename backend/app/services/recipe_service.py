from app.schemas.recipes import RecipeResponse
from app.services.gemini_service import GeminiService


class RecipeService:
    """Turns a list of ingredient names into recipe suggestions."""

    def __init__(self):
        self.gemini_service = GeminiService()

    async def suggest_recipes(self, ingredients: list[str]) -> RecipeResponse:
        normalized = self._normalize(ingredients)
        recipes = await self.gemini_service.suggest_recipes(normalized)

        return RecipeResponse(recipes=recipes)

    def _normalize(self, ingredients: list[str]) -> list[str]:
        seen: dict[str, None] = {}
        for ingredient in ingredients:
            cleaned = ingredient.strip().lower()
            if cleaned:
                seen.setdefault(cleaned, None)
        return list(seen)
