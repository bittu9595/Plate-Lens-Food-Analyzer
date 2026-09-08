import "./index.scss";

interface SelectAllButtonProps {
  allSelected: boolean;
  onClick: () => void;
}

export function SelectAllButton({
  allSelected,
  onClick,
}: SelectAllButtonProps) {
  return (
    <button type="button" className="select-all-button" onClick={onClick}>
      {allSelected ? "Deselect all" : "Select all"}
    </button>
  );
}
