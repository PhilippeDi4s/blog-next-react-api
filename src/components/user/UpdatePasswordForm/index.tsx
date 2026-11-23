"use client";

import { UpdateUserPasswordAction } from "@/app/actions/user/update-user-password";
import { Button } from "@/components/ui/Button";
import { InputPassword } from "@/components/ui/InputPassword";
import { showMessage } from "@/lib/notifications/toast/show-message";
import { useActionState, useEffect } from "react";

export function UpdatePasswordForm() {
  const [state, action, isPending] = useActionState(UpdateUserPasswordAction, {
    success: false,
    errors: [],
  });

  useEffect(() => {
    if (state.errors.length === 0) return;
    showMessage.dismiss();
    state.errors.forEach((error) => showMessage.error(error.message));
  }, [state]);

  return (
    <form action={action} className="flex flex-col gap-5">
      <InputPassword name="currentPassword" labelText="Senha atual" disabled={isPending} required />
      <InputPassword name="newPassword" labelText="Nova senha" disabled={isPending} required />
      <InputPassword name="confirmNewPassword" labelText="Confirmar nova senha" disabled={isPending} required />
      <Button type="submit" disabled={isPending}>{isPending ? "Atualizando..." : "Atualizar senha"}</Button>
    </form>
  );
}
