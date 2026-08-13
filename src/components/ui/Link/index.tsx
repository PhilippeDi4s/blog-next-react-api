import { BtnVariants, BtnSize, getButtonClasses } from "@/lib/button-style";
import Link from "next/link";

type LinkButtonProps = {
  variant?: BtnVariants;
  size?: BtnSize;
} & React.ComponentProps<typeof Link>;

export function LinkButton({
  variant = "default",
  size = "md",
  ...props
}: LinkButtonProps) {
  return (
    <Link
      {...props}
      className={getButtonClasses({
        variant,
        size,
        className: props.className,
      })}
    />
  );
}
