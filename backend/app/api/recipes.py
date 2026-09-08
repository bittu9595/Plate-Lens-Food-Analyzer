import logging

from app.schemas.recipes import RecipeRequest, RecipeResponse
from app.services.recipe_service import RecipeService
from fastapi import APIRouter, HTTPException

logger = logging.getLogger(__name__)

router = APIRouter()
recipe_service = RecipeService()


@router.post("/generate")
async def generate_recipes(request: RecipeRequest) -> RecipeResponse:
    try:
        return await recipe_service.suggest_recipes(request.ingredients)
    except Exception as error:
        # Unhandled errors would return a 500 without CORS headers, which the browser
        # reports as a confusing CORS failure instead of the real problem.
        logger.exception("Recipe generation failed")
        raise HTTPException(
            status_code=502, detail="Could not generate recipes. Please try again."
        ) from error
