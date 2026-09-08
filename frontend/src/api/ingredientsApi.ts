import type { Ingredient } from "../types/ingredient";
import { API_BASE_URL } from "./config";

export async function analyzeImage(image: File): Promise<Ingredient[]> {
  const formData = new FormData();
  formData.append("image", image);

  const response = await fetch(`${API_BASE_URL}/ingredients/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(
      body?.detail ?? `Request failed with status ${response.status}`,
    );
  }

  const data = (await response.json()) as { ingredients: Ingredient[] };
  return data.ingredients;
}
