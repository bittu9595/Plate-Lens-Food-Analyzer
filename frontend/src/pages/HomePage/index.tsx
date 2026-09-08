import { useActionState, useEffect, useState } from "react";
import { ImageUploader } from "../../components/ImageUploader";
import { ResultsPanel, type ResultsTab } from "../../components/ResultsPanel";
import { analyzeImage } from "../../api/ingredientsApi";
import { generateRecipes } from "../../api/recipesApi";
import type { Ingredient } from "../../types/ingredient";
import type { Recipe } from "../../types/recipe";
import "./index.scss";

interface AnalyzeState {
  ingredients: Ingredient[];
  error: string | null;
  elapsedSeconds: number | null;
}

const initialState: AnalyzeState = {
  ingredients: [],
  error: null,
  elapsedSeconds: null,
};

async function analyzeAction(
  _prev: AnalyzeState,
  formData: FormData,
): Promise<AnalyzeState> {
  const image = formData.get("image");
  if (!(image instanceof File) || image.size === 0) {
    return {
      ingredients: [],
      error: "Please choose an image first.",
      elapsedSeconds: null,
    };
  }

  const startedAt = performance.now();
  try {
    const ingredients = await analyzeImage(image);
    const elapsedSeconds = (performance.now() - startedAt) / 1000;
    return { ingredients, error: null, elapsedSeconds };
  } catch {
    return {
      ingredients: [],
      error: "Failed to analyze image. Please try again.",
      elapsedSeconds: null,
    };
  }
}

export function HomePage() {
  // useActionState (React 19) runs analyzeAction on form submit and tracks pending state for us.
  const [state, formAction, isPending] = useActionState(
    analyzeAction,
    initialState,
  );
  const [checkedNames, setCheckedNames] = useState<Set<string>>(new Set());
  const [dismissed, setDismissed] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [recipesError, setRecipesError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ResultsTab>("ingredients");

  useEffect(() => {
    setCheckedNames(
      new Set(state.ingredients.map((ingredient) => ingredient.name)),
    );
    setDismissed(false);
    setRecipes([]);
    setRecipesError(null);
    setActiveTab("ingredients");
  }, [state.ingredients]);

  function handleToggle(name: string) {
    setCheckedNames((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  }

  function handleToggleAll() {
    setCheckedNames((prev) =>
      prev.size === state.ingredients.length
        ? new Set()
        : new Set(state.ingredients.map((ingredient) => ingredient.name)),
    );
  }

  async function handleGenerateRecipe() {
    setIsGenerating(true);
    setRecipesError(null);
    setRecipes([]);
    setActiveTab("recipes");

    try {
      setRecipes(await generateRecipes([...checkedNames]));
    } catch {
      setRecipesError("Could not generate recipes. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  const visibleIngredients = isPending || dismissed ? [] : state.ingredients;

  return (
    <div className="home-page">
      <div className="home-page__grid">
        <ImageUploader
          action={formAction}
          isPending={isPending}
          resultCount={
            state.ingredients.length > 0 ? state.ingredients.length : null
          }
          elapsedSeconds={state.elapsedSeconds}
          error={state.error}
          onReset={() => setDismissed(true)}
        />

        <ResultsPanel
          ingredients={visibleIngredients}
          checkedNames={checkedNames}
          onToggle={handleToggle}
          onToggleAll={handleToggleAll}
          recipes={recipes}
          recipesError={recipesError}
          isGenerating={isGenerating}
          onGenerateRecipe={handleGenerateRecipe}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </div>
  );
}
