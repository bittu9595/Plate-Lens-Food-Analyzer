import json

import google.generativeai as genai
from app.core.config import settings
from app.schemas.ingredients import Ingredient
from app.schemas.recipes import Recipe

genai.configure(api_key=settings.gemini_api_key)

INGREDIENTS_PROMPT = (
    "List the distinct food ingredients visible in this image. "
    "Respond with ONLY a JSON array of objects like: "
    '[{"name": "tomato", "category": "vegetable"}]. No extra text.'
)

RECIPES_PROMPT = (
    "Suggest up to 5 dishes that can be made using mainly these ingredients: {ingredients}. "
    "Assume basic staples like salt, oil and water are available. "
    "Respond with ONLY a JSON array of objects like: "
    '[{{"name": "Tomato soup", "description": "A warm blended soup.", '
    '"ingredients_used": ["tomato"], "steps": ["Chop the tomatoes."]}}]. No extra text.'
)


def _parse_json(text: str):
    # Gemini sometimes wraps JSON in markdown code fences, so strip those before parsing.
    cleaned = (
        text.strip()
        .removeprefix("```json")
        .removeprefix("```")
        .removesuffix("```")
        .strip()
    )
    return json.loads(cleaned)


class GeminiService:
    """Talks to the Gemini API for image analysis and recipe suggestions."""

    def __init__(self):
        self.model = genai.GenerativeModel("gemini-3.6-flash")

    async def detect_ingredients(
        self, image_bytes: bytes, mime_type: str
    ) -> list[Ingredient]:
        response = await self.model.generate_content_async(
            [
                INGREDIENTS_PROMPT,
                {"mime_type": mime_type, "data": image_bytes},
            ]
        )

        return [Ingredient(**item) for item in _parse_json(response.text)]

    async def suggest_recipes(self, ingredients: list[str]) -> list[Recipe]:
        prompt = RECIPES_PROMPT.format(ingredients=", ".join(ingredients))
        response = await self.model.generate_content_async(prompt)

        return [Recipe(**item) for item in _parse_json(response.text)]
