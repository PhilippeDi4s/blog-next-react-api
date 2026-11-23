"use client";

import { UpdateUserAction } from "@/app/actions/user/update-user-action";
import { Button } from "@/components/ui/Button";
import { InputText } from "@/components/ui/InputText";
import { UserFormStateSchema } from "@/lib/user/schemas";
import { showMessage } from "@/lib/notifications/toast/show-message";
import { MailIcon, UserIcon } from "lucide-react";
import { useActionState, useEffect, useState } from "react";

export function UpdateUserForm({ name, email }: { name: string; email: string }) {
  const initialState = {
    formState: UserFormStateSchema.parse({ name, email }),
    errors: [],
    success: false,
  };
  const [state, action, isPending] = useActionState(
    UpdateUserAction,
    initialState,
  );
  const [values, setValues] = useState(state.formState);
  const hasChanges = values.name !== name || values.email !== email;

  useEffect(() => {
    if (state.errors.length === 0) return;
    showMessage.dismiss();
    state.errors.forEach((error) => showMessage.error(error.message));
    setValues(state.formState);
  }, [state]);

  return (
    <form action={action} className="flex flex-col gap-5">
      <InputText
        name="name"
        labelText="Nome"
        icon={UserIcon}
        defaultValue={state.formState.name}
        disabled={isPending}
        onChange={(event) =>
          setValues((old) => ({ ...old, name: event.target.value }))
        }
        required
      />
      <InputText
        name="email"
        type="email"
        labelText="E-mail"
        icon={MailIcon}
        defaultValue={state.formState.email}
        disabled={isPending}
        onChange={(event) =>
          setValues((old) => ({ ...old, email: event.target.value }))
        }
        required
      />
      <Button type="submit" disabled={isPending || !hasChanges}>
        {isPending ? "Salvando..." : "Salvar dados"}
      </Button>
    </form>
  );
}
