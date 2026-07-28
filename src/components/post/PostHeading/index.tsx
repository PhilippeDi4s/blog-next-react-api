import clsx from "clsx";

type PostHeadingProps = {
  children: React.ReactNode;
  as?: "h1" | "h2";
};

export function PostHeading({
  children,
  as: Tag = "h1",
}: PostHeadingProps) {

  const headingTypes = {
    h1: "text-2xl/tight font-extrabold sm:text-4xl",
    h2: "text-xl/tight font-bold",
  };

  const commonClasses = "group-hover:brightness-70";

  return (
    <Tag className={clsx(headingTypes[Tag], commonClasses)}>
      {children}
    </Tag>
  );
}
