import clsx from "clsx";

type HeadingProps = {
  className?: string;
  as?: "h1" | "h2" | "h3";
  children: React.ReactNode;
};

export function Heading({ className, as: Tag = "h1", children }: HeadingProps) {
  const headingStyle = {
    h1: "text-2xl font-extrabold",
    h2: "text-xl font-bold",
    h3: "text-lg font-semibold",
  };

  return (
    <Tag className={clsx(`${headingStyle[Tag]}`, className)}>{children}</Tag>
  );
}
