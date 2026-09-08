import type { Recipe } from "../types/recipe";
import { API_BASE_URL } from "./config";

export async function generateRecipes(
  ingredients: string[],
): Promise<Recipe[]> {
  const response = await fetch(`${API_BASE_URL}/recipes/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(
      body?.detail ?? `Request failed with status ${response.status}`,
    );
  }

  const data = (await response.json()) as { recipes: Recipe[] };
  return data.recipes;
}
