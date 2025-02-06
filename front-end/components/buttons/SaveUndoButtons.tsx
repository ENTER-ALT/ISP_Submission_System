import React from "react";

interface SaveUndoButtonsProps {
  onSave: () => void;
  onUndo: () => void;
}

const SaveUndoButtons = React.memo(({ onSave, onUndo }: SaveUndoButtonsProps) => (
  <section className="flex flex-row items-end space-x-4 mr-8">
    <button
      type="button"
      onClick={onSave}
      className="bg-safe hover:shadow-success p-3 rounded shadow-regular"
    >
      Save
    </button>
    <button
      type="button"
      onClick={onUndo}
      className="bg-alter hover:shadow-success p-3 rounded shadow-regular"
    >
      Undo
    </button>
  </section>
));

export default SaveUndoButtons;
