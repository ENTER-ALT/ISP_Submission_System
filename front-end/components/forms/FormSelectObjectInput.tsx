import React from "react";

interface FormSelectObjectInputProps {
  objectIndex: number;
  name: string;
  labelText: string;
  onChange: (availableObjectsIndex: number) => void;
  availableObjects: String[];
  error?: string;
}

const FormSelectObjectInput = React.memo(
  ({
    objectIndex,
    name,
    labelText,
    onChange,
    availableObjects,
    error,
  }: FormSelectObjectInputProps) => {
    const handleChange = (
      e: React.ChangeEvent<HTMLSelectElement>
    ) => {
      const availableObjectIndex: number = parseInt(e.target.value);
      onChange( availableObjectIndex);
    };

    return (
      <div className="flex-1 flex flex-col">
        <label htmlFor={name} className="mb-1">
          {labelText}
        </label>
        <div className="flex items-center">
          <select
            name={name}
            id={name}
            value={objectIndex}
            onChange={(e) => handleChange(e)}
            className="p-2 rounded bg-gray-700 text-lg w-full focus:bg-gray-700 min-w-16"
          >
            <option value={-1}>{"Select user"}</option>
            {availableObjects.map((v, id) => (
              <option key={id} value={id}>
                {v}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

export default FormSelectObjectInput;
