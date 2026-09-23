import clsx from "clsx";
import { AlertCircleIcon } from "lucide-react";

const infoMessageSizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

type InfoMessageProps = {
  size?: keyof typeof infoMessageSizes;
  children: React.ReactNode;
};

export function InfoMessage({ children, size = "sm" }: InfoMessageProps) {
  return (
    <span
      className={clsx(
        "mt-1",
        infoMessageSizes[size],
        "text-gray-400",
        "flex",
        "items-center",
        "gap-2",
        "leading-4",
        "md:leading-6",
      )}
    >
      <AlertCircleIcon size={15} />
      {children}
    </span>
  );
}
