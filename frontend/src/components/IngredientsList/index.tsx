import type { Ingredient } from "../../types/ingredient";
import { getCategoryEmoji } from "../../utils/categoryIcons";
import "./index.scss";

interface IngredientsListProps {
  ingredients: Ingredient[];
  checkedNames: Set<string>;
  onToggle: (name: string) => void;
}

export function IngredientsList({
  ingredients,
  checkedNames,
  onToggle,
}: IngredientsListProps) {
  return (
    <div className="ingredients-list">
      {ingredients.map((ingredient) => (
        <label className="ingredients-list__item" key={ingredient.name}>
          <input
            className="ingredients-list__checkbox"
            type="checkbox"
            checked={checkedNames.has(ingredient.name)}
            onChange={() => onToggle(ingredient.name)}
          />
          <span className="ingredients-list__emoji">
            {getCategoryEmoji(ingredient.category)}
          </span>
          <span className="ingredients-list__name">{ingredient.name}</span>
          <span className="ingredients-list__category">
            {ingredient.category}
          </span>
        </label>
      ))}
    </div>
  );
}
