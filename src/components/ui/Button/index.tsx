import {
  BtnSize,
  BtnVariants,
  getButtonClasses,
} from "@/lib/styles/button-style";

type ButtonProps = {
  variant?: BtnVariants;
  size?: BtnSize;
} & React.ComponentProps<"button">;

export function Button({
  variant = "default",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={getButtonClasses({
        variant,
        size,
        className,
      })}
    />
  );
}
