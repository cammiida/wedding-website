import type { ReactNode } from "react";
import React, { useRef, useState } from "react";
import { useOutsideClick } from "~/hooks/useOutsideClick";

type SelectProps = {
  label: string;
  name: string;
  options: string[];
  placeholder: string;
  description?: ReactNode;
  required?: boolean;
};

const Select: React.FC<SelectProps> = ({
  label,
  name,
  options,
  placeholder,
  description,
  required = false,
}) => {
  const optionsRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [chosenOption, setChosenOption] = useState<string>("");
  useOutsideClick(optionsRef, () => setIsOpen(false));

  function handleChoice(option: string) {
    setChosenOption(option);
    setIsOpen(false);
  }

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {description}
      <div className="relative" ref={optionsRef}>
        <input
          name={name}
          className="w-full cursor-pointer rounded-md bg-white p-4 text-grey placeholder:text-med-grey"
          onClick={() => setIsOpen((prev) => !prev)}
          placeholder={placeholder}
          readOnly
          value={chosenOption}
        />
        <div
          className={`${
            !isOpen && "hidden"
          } border-shadow absolute top-16 max-h-[50vh] w-full overflow-y-scroll rounded-md bg-white`}
        >
          {options.map((option, i) => (
            <React.Fragment key={option}>
              {i > 0 && (
                <hr className="mx-2 border-t-[1px] border-solid border-t-orange" />
              )}
              <p
                className="flex cursor-pointer rounded-md p-4 text-grey hover:bg-light-grey"
                onClick={() => handleChoice(option)}
              >
                {option}
              </p>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Select;
