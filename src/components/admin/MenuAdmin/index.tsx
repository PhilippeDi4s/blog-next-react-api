"use client";

import { logoutAction } from "@/app/actions/login/logout-action";
import clsx from "clsx";
import {
  CirclePlusIcon,
  CircleXIcon,
  FileTextIcon,
  HomeIcon,
  HourglassIcon,
  LogOutIcon,
  MenuIcon,
} from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";

export function MenuAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleLogout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault()

    startTransition(async () => {
      await logoutAction();
    })
  }

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
        {!isOpen && (
          <>
            <MenuIcon />
            Menu
          </>
        )}
        {isOpen && (
          <>
            <CircleXIcon />
            Fechar
          </>
        )}
      </button>
      <a
        className={linkClasses}
        href="/"
        target="_blank"
        onClick={() => setIsOpen(false)}
      >
        <HomeIcon /> Home
      </a>
      <Link
        className={linkClasses}
        href="/admin/post"
        onClick={() => setIsOpen(false)}
      >
        <FileTextIcon />
        Posts
      </Link>
      <Link className={linkClasses} href="/admin/post/new">
        <CirclePlusIcon />
        Criar Post
      </Link>
      <a href="#" className={linkClasses} onClick={handleLogout}>
        {isPending &&(
          <>
            <HourglassIcon/>
            Aguarde...
          </>
        )}
        {!isPending && (
          <>
          <LogOutIcon />
          Sair
          </>
        )}
      </a>
    </nav>
  );
}
