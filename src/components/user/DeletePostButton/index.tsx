"use client";

import { deletePostAction } from "@/app/actions/post/delete-post-action";
import clsx from "clsx";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { DefaultModal } from "@/components/ui/DefaultModal";
import { showMessage } from "@/lib/show-message";
import { Button } from "@/components/ui/Button";

type DeletePostButtonProps = {
  id: string;
  title: string;
};

export function DeletePostButton({ id, title }: DeletePostButtonProps) {
  const [modal, setModal] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  async function handleDeletePost(id: string) {
    showMessage.dismiss();
    setIsPending(true);
    const res = await deletePostAction(id);

    if (res.errors.length > 0) {
      setIsPending(false);
      showMessage.dismiss();

      res.errors.forEach((error) => {
        const messages = Array.isArray(error.message)
          ? error.message
          : [error.message];

        messages.forEach((msg) => showMessage.error(msg));
      });
    }

    closeModal();
    setIsPending(false);
  }

  return (
    <>
      <button
        className={clsx(
          "text-red-500",
          "cursor-pointer",
          "hover:scale-120",
          "hover:text-red-400",
          "transition",
        )}
        aria-label={`Apagar post ${title}`}
        title={`Apagar post ${title}`}
        onClick={openModal}
      >
        <Trash2Icon />
      </button>

      <DefaultModal
        modalTitle={<h3 className="text-xl font-extrabold">Apagar Post</h3>}
        modalQuestion={
          <p className="text-xl">
            Você tem certeza que deseja apagar o post &quot;
            <span className="font-bold italic">{title}</span>&quot;{" "}
          </p>
        }
        isOpen={modal}
        onClose={closeModal}
      >
        <div className="flex flex-wrap items-center justify-center gap-5 w-full">
          <Button variant="default" onClick={() => handleDeletePost(id)}>
            {isPending ? "Deletando..." : "Deletar"}
          </Button>
          <Button variant="ghost" onClick={closeModal}>
            Cancelar
          </Button>
        </div>
      </DefaultModal>
    </>
  );
}
