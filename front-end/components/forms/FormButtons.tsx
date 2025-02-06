import React from "react";

interface FormButtonsProps {
  onCancel: () => void;
  onDelete?: () => void;
}

const FormButtons = React.memo(
  ({ onCancel, onDelete }: FormButtonsProps) => (
    <div className="flex items-center space-x-2 mt-4">
      <button
        type="submit"
        className="flex-1 bg-safe hover:shadow-success font-semibold py-2 rounded shadow-regular"
      >
        Save
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="flex-1 bg-alter hover:shadow-success font-semibold py-2 rounded shadow-regular"
      >
        Cancel
      </button>
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="flex-1 bg-danger hover:shadow-success font-semibold py-2 rounded shadow-regular"
        >
          Delete
        </button>
      )}
    </div>
  )
);

export default FormButtons;
