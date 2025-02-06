import { EntityItem } from "@/types";
import React from "react";

interface SelectEntityItemInputProps {
  value: EntityItem | undefined;
  labelText: string;
  name: string;
  defaultValue?: string;
  values: EntityItem[];
  onChange: (entity: EntityItem) => void;
  error?: string;
}

const SelectEntityItemInput = React.memo(
  ({
    value,
    labelText,
    name,
    defaultValue,
    values,
    onChange,
    error,
  }: SelectEntityItemInputProps) => {
    return (
      <div className="flex-1 flex flex-col">
        <label htmlFor={name} className="mb-1">
          {labelText}
        </label>
        <div className="flex items-center">
          <select
            name={name}
            id={name}
            value={value?.id}
            onChange={(e) =>
              onChange({
                id: parseInt(e.target.value),
                name: e.target.selectedOptions[0].text,
              })
            }
            className="p-2 rounded bg-gray-700 text-lg w-full focus:bg-gray-700 min-w-16"
          >
            <option value="">{ defaultValue || "Select"}</option>
            {values.map((v, id) => (
              <option key={id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);
export default SelectEntityItemInput;
