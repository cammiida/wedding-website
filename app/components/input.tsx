import React from "react";

type InputProps = {
  name: string;
  label: string;
  placeholder: string;
  description?: string;
  error?: string;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
};

const Input: React.FC<InputProps> = ({
  name,
  label,
  placeholder,
  description,
  error,
  type,
  required = false,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {description && <p className="pb-3">{description}</p>}
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className="rounded-md p-2 text-grey placeholder:text-med-grey"
      />
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
};

export default Input;
