import { Menu } from "@/components/Menu";
import type { MenuItem } from "@/components/Menu/types";
import { FileTextIcon, HomeIcon, ImageIcon, UserIcon } from "lucide-react";

const items: MenuItem[] = [
  { label: "Home", href: "/", icon: HomeIcon, external: true },
  {
    label: "Usuários",
    href: "/admin/users",
    icon: UserIcon,
    isActive: (p) => p.startsWith("/admin/users"),
  },
  {
    label: "Posts",
    href: "/admin/posts",
    icon: FileTextIcon,
    isActive: (p) => p.startsWith("/admin/posts"),
  },
  {
    label: "Imagens",
    href: "/admin/images",
    icon: ImageIcon,
    isActive: (p) => p.startsWith("/admin/images"),
  },
  {
    label: "Logs",
    href: "/admin/logs",
    icon: UserIcon,
    isActive: (p) => p.startsWith("/admin/logs"),
  },
];

export function UserMenu() {
  return <Menu items={items} />;
}
