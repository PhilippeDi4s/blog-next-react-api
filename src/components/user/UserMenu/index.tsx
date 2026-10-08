import { Menu } from "@/components/Menu";
import type { MenuItem } from "@/components/Menu/types";
import {
  CirclePlusIcon,
  FileTextIcon,
  HomeIcon,
  ImageIcon,
} from "lucide-react";

const items: MenuItem[] = [
  { label: "Home", href: "/", icon: HomeIcon, external: true },
  {
    label: "Posts",
    href: "/author/post",
    icon: FileTextIcon,
    isActive: (p) => p.startsWith("/author/post") && p !== "/author/post/new",
  },
  {
    label: "Criar Post",
    href: "/author/post/new",
    icon: CirclePlusIcon,
    isActive: (p) => p === "/author/post/new",
  },
  {
    label: "Minhas imagens",
    href: "/author/imageGallery",
    icon: ImageIcon,
    isActive: (p) => p.startsWith("/author/imageGallery"),
  },
];

export function UserMenu() {
  return <Menu items={items} />;
}
