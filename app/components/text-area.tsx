import React, { useState } from "react";

type TextAreaProps = {
  name: string;
  label: string;
  placeholder: string;
  description?: string;
  error?: string;
  required?: boolean;
  maxLength?: number;
};

const TextArea: React.FC<TextAreaProps> = ({
  name,
  label,
  placeholder,
  description,
  error,
  required,
  maxLength = 2000,
}) => {
  const [value, setValue] = useState<string>("");

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {description && <p className="pb-3">{description}</p>}
      <textarea
        name={name}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full rounded-md p-2 text-grey placeholder:text-med-grey"
        maxLength={maxLength}
      />
      <small className="ml-auto">
        {value.length} / {maxLength}
      </small>
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
};

export default TextArea;
