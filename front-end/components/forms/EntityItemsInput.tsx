import { EntityItem } from "@/types";
import React from "react";

interface EntityItemsInputProps {
  entityItems: EntityItem[];
  name: string;
  labelText: string;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, entity: EntityItem) => void;
  getAvailableEntities: () => EntityItem[];
  error?: string;
}

const EntityItemsInput = React.memo(
  ({
    entityItems,
    name,
    labelText,
    onAdd,
    onRemove,
    onChange,
    getAvailableEntities,
    error,
  }: EntityItemsInputProps) => {
    const canAddNewCourse = !entityItems.some((e) => e.id === -1);

    return (
      <div className="flex-1 flex flex-col">
        <label htmlFor={name} className="mb-1">
          {labelText}
        </label>
        <div className="flex items-center gap-2 flex-wrap">
          {entityItems.map((entity, index) => (
            <div
              key={index}
              className="relative flex items-center rounded-full"
            >
              <select
                name={name}
                id={name}
                value={entity.id}
                onChange={(e) =>
                  onChange(index, {
                    id: parseInt(e.target.value),
                    name: e.target.selectedOptions[0].text,
                  })
                }
                className="rounded-full h-full bg-inherit text-lg bg-gray-500 border-2 border-gray-700 focus:bg-gray-700 min-w-16"
              >
                <option value="">{"Select a course"}</option>
                {entity.id !== -1 && (
                  <option value={entity.id}>{entity.name}</option>
                )}{" "}
                // get available entities filters out the selected entity
                {getAvailableEntities().map((courseOption) => (
                  <option key={courseOption.id} value={courseOption.id}>
                    {courseOption.name}
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
          {canAddNewCourse && (
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

export default EntityItemsInput;
