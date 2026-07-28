"use client";

import { deletePostAction } from "@/app/actions/delete-post-action";
import clsx from "clsx";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { DefaultModal } from "@/components/ui/DefaultModal";
import { PendingBridge } from "../../form/PendingBridge";
import { showMessage } from "@/adapters";
import { FormActions } from "@/components/form/FormActions";
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
        isPending={isPending}
        onClose={closeModal}
      >
        <form
          action={async (formData: FormData) => {
            const result = await deletePostAction(formData);

            if (result.error) {
              showMessage.dismiss();
              showMessage.error("Não foi possível deletar o Post");
              return;
            }
            showMessage.dismiss();
            showMessage.succsses("Post deletado com sucesso!");
            closeModal();
          }}
          className="flex items-center justify-center gap-6 text-slate-100 flex-wrap"
        >
          <input type="hidden" name="post_id" defaultValue={id} />
          <FormActions>
            {(pending) => (
              <>
                <Button
                  variant="default"
                  onClick={closeModal}
                  disabled={pending}
                >
                  Cancelar
                </Button>
                <Button type="submit" variant="ghost" disabled={pending}>
                  {pending ? "Deletando..." : "Deletar"}
                </Button>
              </>
            )}
          </FormActions>
          <PendingBridge setPending={setIsPending}/>
        </form>
      </DefaultModal>
    </>
  );
}
