import React from "react";

interface FixedCreateButtonProps {
  onClick: () => void;
  isActive: boolean;
}

const FixedCreateButton = React.memo(
  ({ onClick, isActive }: FixedCreateButtonProps) => {
    return (
      <section className="fixed bottom-8 right-8">
        <button
          className={`bg-safe p-3 rounded shadow-regular ${
            isActive ? "hover:shadow-success" : "opacity-50"
          }`}
          onClick={onClick}
          disabled={!isActive}
        >
          Create
        </button>
      </section>
    );
  }
);

export default FixedCreateButton;
