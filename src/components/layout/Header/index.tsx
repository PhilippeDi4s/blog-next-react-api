"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathName = usePathname();

  let headerContent: string | null = null;

  if (pathName.includes("author")) {
    headerContent = "Author";
  }
  if (pathName.includes("admin")) {
    headerContent = "Admin";
  }
  if (pathName === "/") {
    headerContent = null;
  }

  return (
    <header
      className={clsx(
        "text-5xl font-extrabold py-8",
        "md:text-6xl md:py-11",
        "lg:text-7xl lg:py-12",
      )}
    >
      <h1>
        <Link href="/">
          The Blog {!headerContent ? "" : `- ${headerContent}`}
        </Link>
      </h1>
    </header>
  );
}
