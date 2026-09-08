import io

from app.schemas.ingredients import IngredientAnalysisResponse
from app.services.gemini_service import GeminiService
from fastapi import UploadFile
from PIL import Image, UnidentifiedImageError


class InvalidImageError(Exception):
    """Raised when the uploaded file is not a valid, readable image."""


class AnalyzeService:
    """Orchestrates the validate -> Gemini -> parse -> normalize pipeline."""

    def __init__(self):
        self.gemini_service = GeminiService()

    async def analyze_ingredients(
        self, image: UploadFile
    ) -> IngredientAnalysisResponse:
        image_bytes = await image.read()
        self._validate_image(image_bytes)

        print(image_bytes)
        print(image.content_type)

        ingredients = await self.gemini_service.detect_ingredients(
            image_bytes,
            image.content_type,
        )

        return IngredientAnalysisResponse(ingredients=ingredients)

    def _validate_image(self, image_bytes: bytes) -> None:
        try:
            # verify() checks the bytes are a real, uncorrupted image without fully decoding it.
            Image.open(io.BytesIO(image_bytes)).verify()
        except UnidentifiedImageError as error:
            raise InvalidImageError("Uploaded file is not a valid image.") from error
