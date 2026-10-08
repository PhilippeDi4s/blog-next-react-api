import clsx from "clsx";
import Link from "next/link";

type HeaderProps = {
  section?: string;
};

export function Header({ section }: HeaderProps) {
  return (
    <header
      className={clsx(
        "text-5xl font-extrabold py-8",
        "md:text-6xl md:py-11",
        "lg:text-7xl lg:py-12",
      )}
    >
      <h1>
        <Link href="/">The Blog{section ? ` - ${section}` : ""}</Link>
      </h1>
    </header>
  );
}