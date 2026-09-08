from pydantic import BaseModel, Field


class RecipeRequest(BaseModel):
    ingredients: list[str] = Field(min_length=1)


class Recipe(BaseModel):
    name: str
    description: str
    ingredients_used: list[str]
    steps: list[str]


class RecipeResponse(BaseModel):
    recipes: list[Recipe]
