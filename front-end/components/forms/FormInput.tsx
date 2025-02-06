import React from "react";

interface FormInputProps {
  name: string;
  labelText: string;
  inputType: "text" | "number" | "checkbox" | "textarea" | "email" | "password";
  value?: string | number;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  inputClassName?: string;
  required?: boolean;
}

const FormInput = React.memo(
  ({
    name,
    labelText,
    inputType,
    value,
    checked,
    onChange,
    error,
    inputClassName,
    required
  }: FormInputProps) => {
    const inputClass = inputClassName || "p-2 rounded bg-gray-700 text-lg";
    return (
      <div
        className={`flex-1 flex ${
          inputType === "checkbox" ? "flex-row gap-2 items-center" : "flex-col"
        } `}
      >
        <label htmlFor={name} className="mb-1">
          {labelText}
        </label>
        <input
          type={inputType}
          name={name}
          id={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className={inputClass}
          required={required}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

export default FormInput;
