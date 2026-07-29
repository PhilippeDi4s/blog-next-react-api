"use client";

import { showMessage } from "@/adapters";
import { loginAction } from "@/app/actions/login/login-action";
import { Button } from "@/components/ui/Button";
import { InputText } from "@/components/ui/InputText";
import clsx from "clsx";
import { LogInIcon } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect } from "react";

export function LoginUserForm() {
  const initialState = {
    userName: "",
    error: "",
  };

  const [state, action, isPending] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (state.error) {
      showMessage.error(state.error);
    }
  }, [state]);

  return (
    <div
      className={clsx(
        "flex items-center justify-center",
        "text-center max-w-sm mt-16 mb-32 mx-auto",
      )}
    >
      <form action={action} className="flex-1 flex flex-col gap-6">
        <InputText
          type="text"
          name="userName"
          labelText="Usuário"
          placeholder="Seu usuário"
          disabled={isPending}
          defaultValue={state.userName}
        />

        <InputText
          type="password"
          name="password"
          labelText="Senha"
          placeholder="Sua senha"
          disabled={isPending}
        />

        <Button disabled={isPending} type="submit" className="mt-4">
          <LogInIcon />
          Entrar
        </Button>

        <p className="text-sm/tight">
          <Link href="/user/new">Criar minha conta</Link>
        </p>

        {!!state.error && <span className="text-red-600">{state.error}</span>}
      </form>
    </div>
  );
}
