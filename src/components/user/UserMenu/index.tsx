"use client";

import { logoutAction } from "@/app/actions/login/logout-action";
import clsx from "clsx";
import {
  CirclePlusIcon,
  CircleXIcon,
  FileTextIcon,
  HomeIcon,
  HourglassIcon,
  ImageIcon,
  LogOutIcon,
  MenuIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function handleLogout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();

    startTransition(async () => {
      await logoutAction();
    });
  }

  const isPostsPage =
    pathname.startsWith("/author/post") && pathname !== "/author/post/new";
  const isNewPostPage = pathname === "/author/post/new";
  const isGalleryPage = pathname.startsWith("/author/imageGallery");

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

  // Mesmo efeito do hover, fixo, mais um destaque no texto
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
        className={clsx(linkClasses, isPostsPage && isSelected)}
        href="/author/post"
        aria-current={isPostsPage ? "page" : undefined}
        onClick={() => setIsOpen(false)}
      >
        <FileTextIcon />
        Posts
      </Link>

      <Link
        className={clsx(linkClasses, isNewPostPage && isSelected)}
        href="/author/post/new"
        aria-current={isNewPostPage ? "page" : undefined}
        onClick={() => setIsOpen(false)}
      >
        <CirclePlusIcon />
        Criar Post
      </Link>

      <Link
        className={clsx(linkClasses, isGalleryPage && isSelected)}
        href="/author/imageGallery"
        aria-current={isGalleryPage ? "page" : undefined}
        onClick={() => setIsOpen(false)}
      >
        <ImageIcon />
        Minhas imagens
      </Link>

      <a href="#" className={linkClasses} onClick={handleLogout}>
        {isPending && (
          <>
            <HourglassIcon />
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
