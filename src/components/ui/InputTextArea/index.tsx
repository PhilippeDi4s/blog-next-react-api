import {
  inputError,
  inputLeftIcon,
  inputStyle,
  inputWrapper,
} from "@/lib/styles/input-styles";
import clsx from "clsx";
import { LucideIcon, MessageSquareIcon } from "lucide-react";
import { useId } from "react";

type InputTextAreaProps = {
  labelText: string;
  className?: string;
  icon?: LucideIcon;
  error?: string | null;
} & Omit<React.ComponentProps<"textarea">, "className">;

export function InputTextArea({
  labelText,
  className,
  error,
  ...props
}: InputTextAreaProps) {
  const id = useId();
  return (
    <div className={clsx("flex flex-col gap-1", className)}>
      <label htmlFor={id}>{labelText}</label>
      <div className={inputWrapper}>
        <textarea
          className={clsx(inputStyle, "min-h-32 resize-none")}
          id={id}
          {...props}
        ></textarea>
        <MessageSquareIcon className={clsx(inputLeftIcon, "top-3")} />
      </div>
      <span className={clsx(inputError)}>{error}</span>
    </div>
  );
}
