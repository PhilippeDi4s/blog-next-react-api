"use client";

import { loginAction } from "@/app/actions/login/login-action";
import { Button } from "@/components/ui/Button";
import { InputText } from "@/components/ui/InputText";
import clsx from "clsx";
import { LogInIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";

export function LoginUserForm() {
  const initialState = {
    email: "",
    errors: [],
  };
  const [state, action, isPending] = useActionState(loginAction, initialState);
  const PARAM_MESSAGES = useMemo(
    () =>
      ({
        "user-changed": "Seu usuário foi modificado. Faça login novamente.",
        created: "Seu usuário foi criado.",
        blocked: "Usuário bloqueado",
        "force-logout": "Faça login novamente",
        "user-deleted": "Usuário deletado",
      }) satisfies Record<string, string>,
    [],
  );

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach((e) => toast.error(e));
    }
  }, [state]);

  useEffect(() => {
    const url = new URL(window.location.href);
    let changed = false;

    for (const [param, message] of Object.entries(PARAM_MESSAGES)) {
      if (searchParams.get(param) === "1") {
        toast.dismiss();
        toast.success(message);
        url.searchParams.delete(param);
        changed = true;
      }
    }

    if (changed) {
      router.replace(url.toString());
    }
  }, [searchParams, router, PARAM_MESSAGES]);

  return (
    <div
      className={clsx(
        "flex items-center justify-center",
        "text-center max-w-sm mt-16 mb-32 mx-auto",
      )}
    >
      <form action={action} className="flex-1 flex flex-col gap-6">
        <InputText
          type="email"
          name="email"
          labelText="E-mail"
          placeholder="Seu e-mail"
          disabled={isPending}
          defaultValue={state.email}
          required
        />

        <InputText
          type="password"
          name="password"
          labelText="Senha"
          placeholder="Sua senha"
          disabled={isPending}
          required
        />

        <Button disabled={isPending} type="submit" className="mt-4">
          <LogInIcon />
          Entrar
        </Button>

        <p className="text-sm/tight">
          <Link href="/user/new">Criar minha conta</Link>
        </p>
      </form>
    </div>
  );
}
