import {
  inputError,
  inputLeftIcon,
  inputStyle,
  inputWrapper,
} from "@/lib/input-styles";
import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import { useId } from "react";

type InputTextProps = {
  labelText?: string;
  error?: string;
  icon?: LucideIcon;
} & React.ComponentProps<"input">;

export function InputText({
  labelText: labelTetx,
  error,
  className,
  icon: Icon,
  ...props
}: InputTextProps) {
  const id = useId();
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm" htmlFor={id}>
        {labelTetx}
      </label>
      <div className={inputWrapper}>
        <input id={id} {...props} className={clsx(inputStyle, className)} />
        {Icon ? <Icon className={inputLeftIcon} /> : null}
      </div>
      {error && <span className={inputError}>{error}</span>}
    </div>
  );
}
