import React from "react";

interface SelectListInputProps<T extends string | number> {
  value: T | undefined;
  labelText: string;
  name: string;
  defaultValue?: string;
  values: T[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  parseValue?: (value: T) => string;
  error?: string;
}

const SelectListInput = React.memo(
  <T extends string | number>({
    value,
    labelText,
    name,
    defaultValue,
    values,
    onChange,
    parseValue,
    error,
  }: SelectListInputProps<T>) => {
    const tryParseValue = (val: T | undefined) => {
      return parseValue && val !== undefined ? parseValue(val) : val;
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
            value={value}
            onChange={onChange}
            className="p-2 rounded bg-gray-700 text-lg w-full focus:bg-gray-700 min-w-16"
          >
            <option value="">{defaultValue || "Select"}</option>
            {values.map((v, id) => (
              <option key={id} value={v}>
                {tryParseValue(v)}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
) as <T extends string | number>(props: SelectListInputProps<T>) => JSX.Element;

export default SelectListInput;
