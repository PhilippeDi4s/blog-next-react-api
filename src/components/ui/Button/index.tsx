import clsx from "clsx";

type BtnVariants = "danger" | "default" | "ghost";

type BtnSize = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: BtnVariants;
  size?: BtnSize;
} & React.ComponentProps<"button">;

export function Button({
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) {
  const btnVariants: Record<BtnVariants, string> = {
    default: clsx("bg-blue-600 text-blue-100"),
    danger: clsx("bg-red-600 text-red-100"),
    ghost: clsx("bg-transparent border border-slate-200 text-slate-100"),
  };

  const btnSize: Record<BtnSize, string> = {
    sm: clsx("text-sm/tight, py-1 px-2 gap-1"),
    md: clsx("text-base/tight py-2 px-4 gap-2"),
    lg: clsx("text-lg/tight py-4 px-6 gap-3"),
  };

  const btnClasses = clsx(
    btnVariants[variant],
    btnSize[size],
    "rounded",
    "transition",
    'cursor-pointer',
    'hover:brightness-50',
    'flex items-center justify-center',
    "disabled:opacity-50",
    "disabled:pointer-events-none",
    "disabled:hover:none",
    props.className,
  );
  return <button {...props} className={btnClasses}  />;
}
