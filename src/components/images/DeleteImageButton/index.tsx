"use client";

import { deleteImageAction } from "@/app/actions/image/delete-image-action";
import { Button } from "@/components/ui/Button";
import { DefaultModal } from "@/components/ui/DefaultModal";
import { showMessage } from "@/lib/show-message";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";

type DeleteImageProps = {
  id: string;
  onDeleted?: () => void;
};

export function DeleteImageButton({ id, onDeleted }: DeleteImageProps) {
  const [modal, setModal] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  async function handleDeleteImage(id: string) {
    showMessage.dismiss();
    setIsPending(true);

    try {
      const res = await deleteImageAction(id);
      if (res.errors.length > 0) {
        showMessage.dismiss();

        res.errors.forEach((error) => {
          const messages = Array.isArray(error.message)
            ? error.message
            : [error.message];

          messages.forEach((msg) => showMessage.error(msg));
        });
      }

      showMessage.success("Imagem deletada!");
      closeModal();
      onDeleted?.();
    } finally {
      setIsPending(false);
    }
  }

  return (
    <>
      <Button variant="danger" onClick={openModal}>
        <Trash2Icon />
        Deletar Imagem
      </Button>

      <DefaultModal
        isOpen={modal}
        onClose={closeModal}
        modalTitle="Apagar Imagem"
        modalQuestion="Você tem certeza que deseja deletar essa imagem?"
      >
        <div className="flex flex-wrap gap-5 w-full items-center justify-center">
          <Button
            variant="default"
            onClick={() => handleDeleteImage(id)}
            disabled={isPending}
          >
            {isPending ? "Deletando..." : "Deletar"}
          </Button>
          <Button variant="ghost" onClick={closeModal} disabled={isPending}>
            Cancelar
          </Button>
        </div>
      </DefaultModal>
    </>
  );
}
