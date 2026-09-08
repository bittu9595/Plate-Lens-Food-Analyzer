import { IngredientsList } from "../IngredientsList";
import { RecipeCard } from "../RecipeCard";
import { GenerateRecipeButton } from "../GenerateRecipeButton";
import { SelectAllButton } from "../SelectAllButton";
import type { Ingredient } from "../../types/ingredient";
import type { Recipe } from "../../types/recipe";
import "./index.scss";

export type ResultsTab = "ingredients" | "recipes";

interface ResultsPanelProps {
  ingredients: Ingredient[];
  checkedNames: Set<string>;
  onToggle: (name: string) => void;
  onToggleAll: () => void;
  recipes: Recipe[];
  recipesError: string | null;
  isGenerating: boolean;
  onGenerateRecipe: () => void;
  activeTab: ResultsTab;
  onTabChange: (tab: ResultsTab) => void;
}

export function ResultsPanel({
  ingredients,
  checkedNames,
  onToggle,
  onToggleAll,
  recipes,
  recipesError,
  isGenerating,
  onGenerateRecipe,
  activeTab,
  onTabChange,
}: ResultsPanelProps) {
  const hasIngredients = ingredients.length > 0;
  const allSelected =
    checkedNames.size === ingredients.length && hasIngredients;
  const showRecipes = activeTab === "recipes";

  return (
    <section className="results-panel card">
      <div className="results-panel__header">
        <div>
          <h2 className="results-panel__title">
            {showRecipes ? "Recipe ideas" : "Detected ingredients"}
          </h2>
          <p className="results-panel__subtitle">
            {showRecipes
              ? "Tap a recipe to see the full method"
              : "Toggle what you want to include before generating"}
          </p>
        </div>
        <div className="results-panel__count">
          <span className="results-panel__count-badge">
            {showRecipes ? recipes.length : checkedNames.size}
          </span>
          <span className="results-panel__count-label">
            {showRecipes ? "recipes" : "selected"}
          </span>
        </div>
      </div>

      {/* Tabs only make sense once an image has produced ingredients. */}
      {hasIngredients && (
        <div className="results-panel__tabs">
          <button
            type="button"
            className={`results-panel__tab ${!showRecipes ? "results-panel__tab--active" : ""}`}
            onClick={() => onTabChange("ingredients")}
          >
            Ingredients
            <span className="results-panel__tab-count">
              {ingredients.length}
            </span>
          </button>
          <button
            type="button"
            className={`results-panel__tab ${showRecipes ? "results-panel__tab--active" : ""}`}
            onClick={() => onTabChange("recipes")}
          >
            Recipes
            {recipes.length > 0 && (
              <span className="results-panel__tab-count">{recipes.length}</span>
            )}
          </button>
        </div>
      )}

      {showRecipes ? (
        <RecipesTabBody
          recipes={recipes}
          isGenerating={isGenerating}
          error={recipesError}
        />
      ) : hasIngredients ? (
        <div className="results-panel__scroll">
          <IngredientsList
            ingredients={ingredients}
            checkedNames={checkedNames}
            onToggle={onToggle}
          />
        </div>
      ) : (
        <div className="results-panel__empty">
          <p className="results-panel__empty-title">
            Upload a dish to see its ingredients
          </p>
          <p className="results-panel__empty-text">
            Everything detected lands here, pre-selected for you.
          </p>
        </div>
      )}

      <div className="results-panel__actions">
        <GenerateRecipeButton
          disabled={checkedNames.size === 0}
          isLoading={isGenerating}
          onClick={onGenerateRecipe}
        />
        {hasIngredients && !showRecipes && (
          <SelectAllButton allSelected={allSelected} onClick={onToggleAll} />
        )}
      </div>

      <div className="results-panel__status">
        <span className="results-panel__status-dot" />
        <span className="results-panel__status-text">
          {getStatusText({
            hasIngredients,
            showRecipes,
            recipeCount: recipes.length,
            selectedCount: checkedNames.size,
          })}
        </span>
      </div>
    </section>
  );
}

function RecipesTabBody({
  recipes,
  isGenerating,
  error,
}: {
  recipes: Recipe[];
  isGenerating: boolean;
  error: string | null;
}) {
  if (isGenerating) {
    return (
      <div className="results-panel__scroll">
        <div className="results-panel__recipes">
          {Array.from({ length: 3 }, (_, index) => (
            <div className="results-panel__skeleton" key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="results-panel__error">{error}</p>;
  }

  if (recipes.length === 0) {
    return (
      <div className="results-panel__empty">
        <p className="results-panel__empty-title">No recipes yet</p>
        <p className="results-panel__empty-text">
          Hit Generate Recipe to see dishes you can cook.
        </p>
      </div>
    );
  }

  return (
    <div className="results-panel__scroll">
      <div className="results-panel__recipes">
        {recipes.map((recipe, index) => (
          <RecipeCard key={recipe.name} recipe={recipe} index={index} />
        ))}
      </div>
    </div>
  );
}

function getStatusText({
  hasIngredients,
  showRecipes,
  recipeCount,
  selectedCount,
}: {
  hasIngredients: boolean;
  showRecipes: boolean;
  recipeCount: number;
  selectedCount: number;
}) {
  if (!hasIngredients) return "AI engine ready";
  if (showRecipes) {
    return recipeCount > 0
      ? `${recipeCount} recipe${recipeCount === 1 ? "" : "s"} ready to cook`
      : "Waiting for your first recipe";
  }
  return `Ready to cook with ${selectedCount} ingredient${selectedCount === 1 ? "" : "s"}`;
}
