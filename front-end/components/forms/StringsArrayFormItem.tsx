import React from "react";

interface StringsArrayFormItemProps {
  stringValue: string;
  keyValue: number;
  handleChange: (index: number, value: string) => void;
  onDelete: (index: number) => void;
}

const StringsArrayFormItem = React.memo(({
  stringValue,
  keyValue,
  handleChange,
  onDelete,
}: StringsArrayFormItemProps) => {
  const inputSize = stringValue ? stringValue.length : 3;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(keyValue, event.target.value);
  };

  return (
    <div className="relative flex items-center rounded-full ">
      <input
        key={keyValue}
        type="text"
        value={stringValue}
        onChange={handleInputChange}
        size={inputSize}
        className="rounded-full h-full bg-inherit text-lg bg-gray-500 border-2 border-gray-700 focus:bg-gray-700 min-w-16"
      />
      <button
        onClick={() => onDelete(keyValue)}
        className="absolute text-sm right-0 mr-2 bg-indigo-700 hover:bg-indigo-950 w-6 h-6 rounded-full"
      >
        X
      </button>
    </div>
  );
});

export default StringsArrayFormItem;
