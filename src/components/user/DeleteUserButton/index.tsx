"use client";

import { DeleteUserAction } from "@/app/actions/user/delete-user-action";
import { Button } from "@/components/ui/Button";
import { DefaultModal } from "@/components/ui/DefaultModal";
import { showMessage } from "@/lib/notifications/toast/show-message";
import { Trash2Icon } from "lucide-react";
import { useState, useTransition } from "react";

export function DeleteUserButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      showMessage.dismiss();
      const result = await DeleteUserAction();
      if (!result.success) {
        setIsOpen(false);
        result.errors.forEach((error) => showMessage.error(error.message));
      }
    });
  }

  return (
    <>
      <p className="mb-4 text-slate-600 dark:text-slate-300">
        Ao excluir sua conta, todos os seus dados serão removidos permanentemente. Esta ação não pode ser desfeita.
      </p>
      <Button type="button" variant="danger" onClick={() => setIsOpen(true)}>
        <Trash2Icon />
        Excluir conta
      </Button>
      <DefaultModal
        modalTitle="Excluir conta"
        modalQuestion="Tem certeza que deseja excluir sua conta? Esta ação é irreversível."
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isDismissible={!isPending}
      >
        <Button variant="ghost" onClick={() => setIsOpen(false)} disabled={isPending}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={isPending}>
          {isPending ? "Excluindo..." : "Sim, excluir conta"}
        </Button>
      </DefaultModal>
    </>
  );
}
