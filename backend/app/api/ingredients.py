import logging
from typing import Annotated

from app.schemas.ingredients import IngredientAnalysisResponse
from app.services.analyze_service import AnalyzeService, InvalidImageError
from fastapi import APIRouter, File, HTTPException, UploadFile

logger = logging.getLogger(__name__)

router = APIRouter()
analyze_service = AnalyzeService()


@router.post("/analyze")
async def analyze_ingredients(
    image: Annotated[UploadFile, File()],
) -> IngredientAnalysisResponse:
    try:
        return await analyze_service.analyze_ingredients(image)
    except InvalidImageError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error
    except Exception as error:
        # Unhandled errors would return a 500 without CORS headers, which the browser
        # reports as a confusing CORS failure instead of the real problem.
        logger.exception("Ingredient analysis failed")
        raise HTTPException(
            status_code=502, detail="Could not analyze the image. Please try again."
        ) from error
