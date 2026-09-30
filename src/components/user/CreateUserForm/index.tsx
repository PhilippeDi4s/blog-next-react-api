"use client";

import clsx from "clsx";
import { MailIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { UserFormStateSchema } from "@/lib/user/schemas";
import { useActionState, useEffect } from "react";
import { createUserAction } from "@/app/actions/user/create-user-action";
import { InputText } from "@/components/ui/InputText";
import { Button } from "@/components/ui/Button";
import { showMessage } from "@/lib/show-message";
import { InputPassword } from "@/components/ui/InputPassword";

export function CreateUserForm() {
  const [state, action, isPending] = useActionState(createUserAction, {
    formState: UserFormStateSchema.parse({}),
    errors: [],
    success: false,
  });

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
          type="text"
          name="name"
          labelText="Nome"
          placeholder="Seu nome"
          disabled={isPending}
          defaultValue={state.formState.name}
          icon={UserIcon}
          required
        />
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
        <InputPassword
          name="confirmPassword"
          labelText="Repetir senha"
          placeholder="Sua senha novamente"
          disabled={isPending}
          required
        />

        <Button disabled={isPending} type="submit" size="md" className="mt-4">
          {!isPending && "Criar conta"}
          {isPending && "Criando..."}
        </Button>

        <p className="text-sm/tight">
          <Link href="/login" className="text-blue-500 underline">
            Já tem conta? Entrar
          </Link>
        </p>
      </form>
    </div>
  );
}
