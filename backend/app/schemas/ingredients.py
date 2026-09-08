from pydantic import BaseModel


class IngredientAnalysisRequest(BaseModel):
    """
    Optional parameters for fridge analysis.
    """

    language: str = "en"


class Ingredient(BaseModel):
    name: str
    category: str

class IngredientAnalysisResponse(BaseModel):
    ingredients: list[Ingredient]