import clsx from "clsx";
import { useId } from "react";

type InputCheckboxProps = {
  labelText?: string;
  type?: "checkbox";
  error?: string;
} & React.ComponentProps<"input">;

export function InputCheckbox({
  labelText = "",
  type = "checkbox",
  error,
  ...props
}: InputCheckboxProps) {
  const id = useId();

  return (
    <div className="flex items-center gap-3">
      {labelText && (
        <label className="text-sm" htmlFor={id}>
          {labelText}
        </label>
      )}
      <input
        {...props}
        className={clsx(
          "w-4 h-4 outline-none focus:ring-2 focus:ring-blue-500",
          props.className,
        )}
        id={id}
        type={type}
      />
      {error && <span className="mt-2 text-xs text-red-700">{error}</span>}
    </div>
  );
}
