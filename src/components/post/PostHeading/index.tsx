import clsx from "clsx";

type PostHeadingProps = {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2";
} & Omit<React.ComponentProps<"h1">, "className">;

export function PostHeading({
  className,
  children,
  as: Tag = "h1",
  ...props
}: PostHeadingProps) {
  const headingTypes = {
    h1: "text-3xl/tight font-extrabold line-clamp-3 sm:text-4xl",
    h2: "text-2xl/tight font-bold",
  };

  const commonClasses = "group-hover:brightness-70 wrap-break-word";

  return (
    <Tag
      className={clsx(headingTypes[Tag], commonClasses, className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
