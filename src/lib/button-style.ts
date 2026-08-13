import clsx from "clsx";

export type BtnVariants = "danger" | "default" | "ghost";
export type BtnSize = "sm" | "md" | "lg";

type GetButtonClassesParams = {
  variant?: BtnVariants;
  size?: BtnSize;
  className?: string;
};

export function getButtonClasses({
  variant = "default",
  size = "md",
  className,
}: GetButtonClassesParams) {
  const btnVariants: Record<BtnVariants, string> = {
    default: clsx("bg-blue-600 text-blue-100"),
    danger: clsx("bg-red-600 text-red-100"),
    ghost: clsx("bg-transparent border border-slate-200 text-slate-100"),
  };

  const btnSize: Record<BtnSize, string> = {
    sm: clsx("text-sm/tight py-1 px-2 gap-1"),
    md: clsx("text-base/tight py-2 px-4 gap-2"),
    lg: clsx("text-lg/tight py-4 px-6 gap-3"),
  };

  return clsx(
    btnVariants[variant],
    btnSize[size],
    "rounded-xl",
    "transition",
    "cursor-pointer",
    "hover:brightness-50",
    "flex items-center justify-center",
    "disabled:opacity-50",
    "disabled:pointer-events-none",
    className,
  );
}
