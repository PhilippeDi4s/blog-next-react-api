import clsx from "clsx";

export const inputStyle = clsx(
  "bg-white",
  "w-full",
  "outline-0",
  "ring-2",
  "ring-slate-400",
  "rounded",
  "p-3",
  "pl-10",
  "md:pl-12",
  "text-base/tight",
  "transition",
  "focus:ring-blue-600",
  "placeholder:text-slate-300",
  "disabled:opacity-50",
  "dark:bg-slate-700",
  "dark:ring-slate-500",
  "dark:placeholder:text-slate-400",
  "read-only:bg-transparent",
  "peer",
);

export const inputWrapper = clsx("w-full", "relative", "flex", "items-center");

const commonIconStyles = clsx("absolute", "z-1", "peer-focus:text-blue-600", "w-4", "md:w-5");

export const inputLeftIcon = clsx("left-3", commonIconStyles);

export const inputRightIcon = clsx("right-4", commonIconStyles);

export const inputError = clsx("text-xs", "text-red-700");
