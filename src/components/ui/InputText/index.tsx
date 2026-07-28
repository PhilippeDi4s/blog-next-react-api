import clsx from "clsx";
import { useId } from "react";

type InputTextProps = {
  labelText?: string;
} & React.ComponentProps<"input">;

export function InputText({ labelText: labelTetx, ...props }: InputTextProps) {
  const id = useId();
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm" htmlFor={id}>
        {labelTetx}
      </label>
      <input
        className={clsx(
          "bg-white",
          "outline-0",
          "ring-2",
          "ring-slate-400",
          "rounded",
          "p-2",
          "text-base/tight",
          "transition",
          "focus:ring-blue-600",
          "placeholder:text-slate-300",
          "disabled:opacity-50",
          "dark:bg-slate-700",
          "dark:ring-slate-500",
          "dark:placeholder:text-slate-400",
          "read-only:bg-transparent",
          props.className,
        )}
        id={id}
        {...props}
      />
    </div>
  );
}
