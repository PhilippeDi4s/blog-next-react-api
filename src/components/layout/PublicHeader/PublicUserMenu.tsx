"use client";

import { logoutAction } from "@/app/actions/login/logout-action";
import { LinkButton } from "@/components/ui/Link";
import { getButtonClasses } from "@/lib/styles/button-style";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LogOutIcon, ShieldIcon, UserIcon, UserRoundIcon } from "lucide-react";

type MenuUser = { name: string; role: string };

export function PublicUserMenu({ user }: { user?: MenuUser }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeOnOutside(event: PointerEvent) {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false);
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

  if (!user) return <LinkButton href="/login" variant="default" size="sm" className="bg-white text-slate-900">Entrar</LinkButton>;
  const menuItems = [
    { label: "Meu perfil", href: "/user/profile", icon: UserRoundIcon },
    { label: "Área do autor", href: "/author", icon: UserIcon },
    ...(user.role === "admin" ? [{ label: "Painel admin", href: "/admin", icon: ShieldIcon }] : []),
  ];

  return (
    <div ref={rootRef} className="relative">
      <button type="button" aria-label="Abrir menu do usuário" aria-haspopup="menu" aria-expanded={open}
        onClick={() => setOpen((value) => !value)} className="flex h-11 w-11 items-center justify-center rounded-full bg-white font-semibold text-slate-900">
        {user.name.trim().charAt(0).toLocaleUpperCase("pt-BR") || "?"}
      </button>
      {open && <div role="menu" className="absolute right-0 z-50 mt-2 w-56 rounded-xl bg-white p-2 text-slate-900 shadow-lg">
        {menuItems.map(({ label, href, icon: Icon }) => <Link key={href} role="menuitem" href={href} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-slate-100"><Icon size={18} />{label}</Link>)}
        <form action={async () => { await logoutAction(); }}><button role="menuitem" type="submit" className={`${getButtonClasses({ variant: "unstyled", size: "md" })} w-full justify-start gap-3 px-3 py-2 text-slate-900 hover:bg-slate-100`}><LogOutIcon size={18} />Sair</button></form>
      </div>}
    </div>
  );
}
