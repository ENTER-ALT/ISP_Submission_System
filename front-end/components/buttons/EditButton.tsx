import React from "react";

interface EditButtonProps {
  handleEdit: () => Promise<void>;
  isActive: boolean;
}

const EditButton = React.memo(
  ({ handleEdit, isActive }: EditButtonProps) => {
    return (
      <article>
        <button
          className={`p-1 shadow-regular bg-danger rounded ${
            isActive ? "hover:shadow-success" : ""
          }`}
          onClick={async () => isActive && (await handleEdit())}
          disabled={!isActive}
        >
          Edit
        </button>
      </article>
    );
  }
);

export default EditButton;
