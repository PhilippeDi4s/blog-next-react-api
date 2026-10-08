"use client";

import clsx from "clsx";
import {
  CircleXIcon,
  MenuIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { MenuItem } from "./types";

type MenuProps = {
  items: MenuItem[];
};

export function Menu({ items }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();


  const navClasses = clsx(
    "flex",
    "flex-col",
    "mb-8",
    "bg-slate-900",
    "text-slate-100",
    "dark:bg-slate-600",
    "rounded-lg",
    !isOpen && "h-10",
    !isOpen && "overflow-hidden",
    "sm:flex-row",
    "sm:flex-wrap",
    "sm:overflow-visible",
  );

  const linkClasses = clsx(
    "[&>svg]:w-[16px]",
    "[&>svg]:h-[16px]",
    "px-4",
    "flex",
    "items-center",
    "justify-start",
    "gap-2",
    "transition",
    "hover:backdrop-brightness-50",
    "rounded-lg",
    "h-10",
    "shrink-0",
    "cursor-pointer",
  );

  const isSelected = clsx("backdrop-brightness-50", "font-semibold");
  const openCloseBtnClasses = clsx(
    linkClasses,
    "text-slate-200 italic",
    "sm:hidden",
  );

  return (
    <nav className={navClasses}>
      <button
        onClick={() => setIsOpen((s) => !s)}
        title={isOpen ? "Fechar menu" : "Abrir Menu"}
        aria-label={isOpen ? "Fechar menu" : "Abrir Menu"}
        className={openCloseBtnClasses}
      >
        {!isOpen ? (
          <>
            <MenuIcon />
            Menu
          </>
        ) : (
          <>
            <CircleXIcon />
            Fechar
          </>
        )}
      </button>

      {items.map(({ label, href, icon: Icon, isActive, external }) => {
        const active = isActive?.(pathname) ?? false;

        if (external) {
          return (
            <a
              key={href}
              className={linkClasses}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
            >
              <Icon /> {label}
            </a>
          );
        }

        return (
          <Link
            key={href}
            className={clsx(linkClasses, active && isSelected)}
            href={href}
            aria-current={active ? "page" : undefined}
            onClick={() => setIsOpen(false)}
          >
            <Icon />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}