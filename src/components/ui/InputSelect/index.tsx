import { useId } from "react";

type InputSelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  options?: InputSelectOption[];
  children?: React.ReactNode;
  className?: string;
  labelText?: string;
  error?: string;
} & React.ComponentProps<"input">;

export function InputSelect({
  name,
  value,
  onChange,
  options,
  children,
  className,
  labelText,
  error,
}: SelectProps) {
  const id = useId();
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>{labelText}</label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className={className}
      >
        {options
          ? options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))
          : children}
      </select>
      {error && <span className="mt-2 text-xs text-red-700">{error}</span>}
    </div>
  );
}
