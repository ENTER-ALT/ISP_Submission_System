import React from "react";

interface SelectButtonProps {
  toggleSelect: () => void;
  selected: boolean;
  isActive: boolean;
}

const SelectButton = React.memo(
  ({ toggleSelect, selected, isActive }: SelectButtonProps) => {
    return (
      <article className="flex items-center">
        <input
          name="select"
          id="select"
          type="checkbox"
          checked={selected}
          onChange={() => isActive && toggleSelect()}
          className={`p-1 w-8 h-8 rounded-full check-box-clean hover:cursor-pointer
      ${
        selected
          ? "checked:bg-success checked:focus:bg-success checked:hover:bg-success bg-success checked:shadow-regular hover:shadow-secondary"
          : "bg-secondary shadow-activated hover:shadow-innerGlow"
      }
    `}
        />
      </article>
    );
  }
);

export default SelectButton;
