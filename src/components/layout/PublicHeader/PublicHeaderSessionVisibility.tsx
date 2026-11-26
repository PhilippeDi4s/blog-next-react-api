"use client";

import { usePathname } from "next/navigation";

export function PublicHeaderSessionVisibility({
  children,
}: {
  children: React.ReactNode;
}) {
  if (usePathname() === "/login") return null;
  return children;
}
