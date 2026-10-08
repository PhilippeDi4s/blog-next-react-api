import type { LucideIcon } from "lucide-react";

export type MenuItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive?: (pathname: string) => boolean;
  external?: boolean;
};