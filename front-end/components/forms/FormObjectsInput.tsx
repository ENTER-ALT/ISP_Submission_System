import React from "react";

interface FormObjectsInputProps {
  objects: String[];
  name: string;
  labelText: string;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, availableObjectsIndex: number) => void;
  availableObjects: String[];
  canAddNewObject: boolean;
  error?: string;
}

const FormObjectsInput = React.memo(
  ({
    objects,
    name,
    labelText,
    onAdd,
    onRemove,
    onChange,
    availableObjects,
    canAddNewObject,
    error,
  }: FormObjectsInputProps) => {
    const handleChange = (
      index: number,
      e: React.ChangeEvent<HTMLSelectElement>
    ) => {
      const availableObjectIndex: number = parseInt(e.target.value);
      onChange(index, availableObjectIndex);
    };

    return (
      <div className="flex-1 flex flex-col">
        <label htmlFor={name} className="mb-1">
          {labelText}
        </label>
        <div className="flex items-center gap-2 flex-wrap">
          {objects.map((obj, index) => (
            <div
              key={index}
              className="relative flex items-center rounded-full"
            >
              <select
                name={name}
                id={name}
                value={index}
                onChange={(e) => handleChange(index, e)}
                className="rounded-full h-full bg-inherit text-lg bg-gray-500 border-2 border-gray-700 focus:bg-gray-700 min-w-16"
              >
                {(obj === "" && (
                  <option value={index}>Choose option</option>
                )) || <option value={index}>{obj}</option>}{" "}
                // get available entities filters out the selected entity
                {availableObjects.map((obj, index) => (
                  <option key={index} value={index}>
                    {obj}
                  </option>
                ))}
              </select>
              <button
                onClick={() => onRemove(index)}
                className="absolute text-sm right-0 mr-2 bg-indigo-700 hover:bg-indigo-950 w-6 h-6 rounded-full"
              >
                X
              </button>
            </div>
          ))}
          {canAddNewObject && (
            <button
              type="button"
              onClick={onAdd}
              className="bg-safe rounded-full h-8 w-8 shadow-regular hover:shadow-success"
            >
              +
            </button>
          )}
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

export default FormObjectsInput;
