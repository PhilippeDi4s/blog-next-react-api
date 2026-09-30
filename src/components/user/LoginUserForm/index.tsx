"use client";

import { loginAction } from "@/app/actions/login/login-action";
import { Button } from "@/components/ui/Button";
import { InputPassword } from "@/components/ui/InputPassword";
import { InputText } from "@/components/ui/InputText";
import { showMessage } from "@/lib/show-message";
import { UserFormStateSchema } from "@/lib/user/schemas";
import clsx from "clsx";
import { LogInIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect } from "react";

export function LoginUserForm() {
  const initialState = {
    formState: UserFormStateSchema.parse({}),
    success: false,
    errors: [],
  };
  const [state, action, isPending] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (state.errors.length === 0) return;
    showMessage.dismiss();
    state.errors.forEach((e) => {
      const message = Array.isArray(e.message)
        ? e.message.join(", ")
        : e.message;
      showMessage.error(message);
    });
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
          type="email"
          name="email"
          labelText="E-mail"
          placeholder="Seu e-mail"
          disabled={isPending}
          defaultValue={state.formState.email}
          icon={MailIcon}
          required
        />

        <InputPassword
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
          <Link href="/user/new" className="text-blue-500 underline">
            Criar minha conta
          </Link>
        </p>
      </form>
    </div>
  );
}
