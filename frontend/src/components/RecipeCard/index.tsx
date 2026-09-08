import { useState } from "react";
import type { Recipe } from "../../types/recipe";
import "./index.scss";

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
}

export function RecipeCard({ recipe, index }: RecipeCardProps) {
  const [showSteps, setShowSteps] = useState(false);

  return (
    <article
      className="recipe-card"
      // Staggers the entry animation so cards appear one after another.
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="recipe-card__head">
        <span className="recipe-card__index">{index + 1}</span>
        <h3 className="recipe-card__name">{recipe.name}</h3>
      </div>

      <p className="recipe-card__description">{recipe.description}</p>

      <div className="recipe-card__chips">
        {recipe.ingredients_used.map((ingredient) => (
          <span className="recipe-card__chip" key={ingredient}>
            {ingredient}
          </span>
        ))}
      </div>

      <button
        type="button"
        className="recipe-card__toggle"
        aria-expanded={showSteps}
        onClick={() => setShowSteps((prev) => !prev)}
      >
        {showSteps ? "Hide steps" : `View steps (${recipe.steps.length})`}
      </button>

      {showSteps && (
        <ol className="recipe-card__steps">
          {recipe.steps.map((step) => (
            <li className="recipe-card__step" key={step}>
              {step}
            </li>
          ))}
        </ol>
      )}
    </article>
  );
}
