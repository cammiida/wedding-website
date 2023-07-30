import React from "react";

type InputProps = {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
};

const Input: React.FC<InputProps> = ({
  name,
  label,
  placeholder,
  required = false,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        placeholder={placeholder}
        name={name}
        className="rounded-md p-2 text-med-grey"
      />
    </div>
  );
};

export default Input;
