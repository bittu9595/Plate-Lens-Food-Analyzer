import "./index.scss";

interface GenerateRecipeButtonProps {
  disabled: boolean;
  isLoading: boolean;
  onClick: () => void;
}

export function GenerateRecipeButton({
  disabled,
  isLoading,
  onClick,
}: GenerateRecipeButtonProps) {
  return (
    <button
      type="button"
      className="generate-recipe-button"
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <span className="generate-recipe-button__spinner" />
          Generating...
        </>
      ) : (
        "✨ Generate Recipe"
      )}
    </button>
  );
}
