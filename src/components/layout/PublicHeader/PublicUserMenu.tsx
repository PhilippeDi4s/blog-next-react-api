"use client";

import { logoutAction } from "@/app/actions/login/logout-action";
import { LinkButton } from "@/components/ui/Link";
import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import {
  LogInIcon,
  LogOutIcon,
  PencilIcon,
  ShieldIcon,
  UserRoundIcon,
} from "lucide-react";
import { UserResponseDto } from "@/lib/user/schemas";
import { showMessage } from "@/lib/notifications";
import { Button } from "@/components/ui/Button";

type PublicUserMenuProps = {
  user?: UserResponseDto;
};

export function PublicUserMenu({ user }: PublicUserMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    function closeOnOutside(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !rootRef.current?.contains(event.target)
      )
        setOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  function handleLogout() {
    showMessage.dismiss();
    startTransition(async () => {
      const res = await logoutAction();
      if (!res.success) {
        showMessage.error("Erro inesperado, tente novamente mais tarde");
      }
    });
  }

  if (!user)
    return (
      <LinkButton
        href="/login"
        variant="default"
        size="sm"
        className="bg-slate-200 text-slate-900 py-2 px-3 md:px-5 md:py-3 md:gap-2"
      >
        <LogInIcon className="w-5 h-5" />
        Entrar
      </LinkButton>
    );
  const menuItems = [
    { label: "Meu perfil", href: "/user/profile", icon: UserRoundIcon },
    { label: "Área do autor", href: "/author/post", icon: PencilIcon },
    ...(user.role === "admin"
      ? [{ label: "Painel admin", href: "/admin/users", icon: ShieldIcon }]
      : []),
  ];

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label="Abrir menu do usuário"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="
        flex 
        h-11 
        w-11 
        lg:h-13 
        lg:w-13 
        lg:text-xl 
        leading-none
        items-center 
        justify-center 
        rounded-full 
        bg-white 
        font-semibold 
        text-slate-900 
        cursor-pointer 
        transition 
        duration-300
        transform-gpu 
        will-change-transform
        hover:scale-105 
        hover:brightness-90"
      >
        {user.name.trim().charAt(0).toLocaleUpperCase("pt-BR") || "?"}
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-56 rounded-xl bg-slate-700 text-slate-200 shadow-lg overflow-hidden"
        >
          {menuItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              role="menuitem"
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 hover:bg-slate-600"
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
          <Button
            role="menuitem"
            type="button"
            variant="unstyled"
            className="w-full justify-start hover:bg-slate-600 hover:brightness-100 rounded-none"
            onClick={handleLogout}
            disabled={isPending}
          >
            <LogOutIcon size={18} className="text-red-500" />
            {isPending ? "Saindo..." : "Sair"}
          </Button>
        </div>
      )}
    </div>
  );
}
