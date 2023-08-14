type RadioOption<V extends string> = {
  value: V;
  id: string;
  label: string;
};

type RadioButtonsProps<V extends string> = {
  name: string;
  label: string;
  options: RadioOption<V>[];
  description?: string;
  required?: boolean;
  onChange?: (value: V | undefined) => void;
  error?: string;
};

const RadioButtons = <V extends string>({
  name,
  label,
  options,
  description,
  required = false,
  onChange,
  error,
}: RadioButtonsProps<V>) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {description && <p className="pb-3">{description}</p>}
      <div className="flex gap-4">
        {options.map(({ id, value, label: optionLabel }) => (
          <label key={id} htmlFor={name} className="flex gap-2">
            <input
              name={name}
              id={id}
              type="radio"
              value={value}
              onChange={(e) => onChange && onChange(e.currentTarget.value as V)}
              className="checkbox h-6 w-6 cursor-pointer appearance-none rounded-full border border-yellow bg-grey checked:border-none checked:bg-yellow focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2"
            />
            {optionLabel}
          </label>
        ))}
      </div>
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
};

export default RadioButtons;
