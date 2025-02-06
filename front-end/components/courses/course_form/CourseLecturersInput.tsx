import React from "react";
import StringsArrayFormItem from "../../forms/StringsArrayFormItem";

interface CourseLecturersInputProps {
  lecturers: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, value: string) => void;
  error?: string;
}

const CourseLecturersInput = React.memo(
  ({
    lecturers,
    onAdd,
    onRemove,
    onChange,
    error,
  }: CourseLecturersInputProps) => (
    <div className="flex gap-2 flex-col">
      <label htmlFor="lecturers" className="mb-1">
        Lecturers
      </label>
      <div className="flex items-center gap-2 flex-wrap">
        {lecturers.map((l, i) => (
          <div key={i}>
            <StringsArrayFormItem
              stringValue={l}
              keyValue={i}
              handleChange={onChange}
              onDelete={() => onRemove(i)}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={onAdd}
          className="bg-safe rounded-full h-8 w-8 shadow-regular hover:shadow-success"
        >
          +
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
);

export default CourseLecturersInput;
