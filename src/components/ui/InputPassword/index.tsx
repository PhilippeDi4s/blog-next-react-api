"use client";

import { inputError, inputLeftIcon, inputRightIcon, inputStyle, inputWrapper } from "@/lib/input-styles";
import clsx from "clsx";
import { EyeClosedIcon, EyeIcon, LockKeyholeIcon } from "lucide-react";
import { useId, useState } from "react";

type InputPasswordProps = {
  labelText: string;
  error: string | null;
  className?: string;
} & Omit<React.ComponentProps<"input">, "type" | "id" | "className">;

export function InputPassword({
  labelText,
  error,
  className,
  ...props
}: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);
  const id = useId();
  return (
    <div className="flex flex-col gap-1">
      <label className="" htmlFor={id}>
        {labelText}
      </label>
      <div className={inputWrapper}>
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          className={clsx(inputStyle, className)}
          {...props}
        />
        <LockKeyholeIcon className={inputLeftIcon} />
        <button
          type="button"
          className={clsx(inputRightIcon, "cursor-pointer")}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
        </button>
      </div>
      {error && <span className={inputError}>{error}</span>}
    </div>
  );
}
