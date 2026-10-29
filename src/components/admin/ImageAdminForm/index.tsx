"use client";

import { ImagePreview } from "@/components/images/ImagePreview";
import { Button } from "@/components/ui/Button";
import { CopyTextButton } from "@/components/ui/CopyTextButton";
import { InputSelect } from "@/components/ui/InputSelect";
import { InputText } from "@/components/ui/InputText";
import { ImageResponseDto } from "@/lib/image/schema";
import { ImageWithFallback } from "@/components/ui/ImageFallback";
import { formatDateTime } from "@/utils/format-datetime";
import {
  CalendarIcon,
  CheckCircle2Icon,
  LinkIcon,
  MailIcon,
  TagIcon,
  TrashIcon,
  UserIcon,
} from "lucide-react";
import { useState } from "react";
import { ConfirmAdminActionModal } from "../ConfirmAdminActionModal";
import { PendingAction } from "@/lib/shared/types/action";
import { ConfirmActionAdminSchema } from "@/lib/sharedSchemas/confirmAdminAction";
import { deleteImageActionAdmin } from "@/app/actions/admin/image/deleteImageActionAdmin";
import { Notice, redirectWithNotice } from "@/lib/notifications";

type ImageAdminFormProps = {
  imageData: ImageResponseDto;
};

const DELETE_KEY = "deleteImage";

export function ImageAdminForm({ imageData }: ImageAdminFormProps) {
  const [imagePreview, setImagePreview] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const [reasonErrors, setReasonErrors] = useState<Record<string, string>>({});
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const pendingActions: PendingAction[] =
    status === "delete"
      ? [
          {
            key: DELETE_KEY,
            label: "Motivo da exclusão da imagem",
            needsPassword: true,
            run: (reason: string) => {
              const formData = new FormData();
              formData.append("reason", reason);
              return deleteImageActionAdmin(imageData.id, formData);
            },
          },
        ]
      : [];

  function openPreview() {
    setImagePreview(true);
  }

  function closePreview() {
    setImagePreview(false);
  }

  function resetModalState() {
    setReasons({});
    setReasonErrors({});
    setPasswordError(null);
  }

  function handleOpenModal() {
    if (pendingActions.length === 0) return;
    setModalOpen(true);
  }

  function handleCancel() {
    setModalOpen(false);
    resetModalState();
  }

  function handleReasonChange(key: string, value: string) {
    setReasons((prev) => ({ ...prev, [key]: value }));
    setReasonErrors((prev) => ({ ...prev, [key]: "" }));
  }

  function canConfirm(password: string) {
    return ConfirmActionAdminSchema.safeParse({
      reason: reasons[DELETE_KEY] ?? "",
      password,
    }).success;
  }

  async function handleConfirm(password: string) {
    setSubmitting(true);
    setPasswordError(null);

    const formData = new FormData();
    formData.append("reason", reasons[DELETE_KEY] ?? "");
    formData.append("password", password);

    console.log(Object.fromEntries(formData));

    const result = await deleteImageActionAdmin(imageData.id, formData);

    setSubmitting(false);

    if (!result.success) {
      for (const error of result.errors) {
        if (error.field === "password") setPasswordError(error.message);
        if (error.field === "reason")
          setReasonErrors({ [DELETE_KEY]: error.message });
      }
      return;
    }

    setModalOpen(false);
    resetModalState();
    redirectWithNotice("admin/images", Notice.IMAGE_DELETED);
  }

  return (
    <>
      <button onClick={openPreview} className="w-full my-5">
        <ImageWithFallback
          alt=""
          src={imageData.url}
          containerClassName="w-[80%] h-100 object-cover mx-auto"
          imageClassName="object-cover cursor-zoom-in rounded-xl transition hover:scale-105 hover:ring-2 hover:ring-blue-500"
        />
      </button>
      <ImagePreview
        imageSrc={imageData.url}
        isOpen={imagePreview}
        onClose={closePreview}
      />
      <form
        className="flex flex-col gap-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="w-full grid grid-cols-2 gap-5 items-end">
          <InputText
            disabled
            defaultValue={imageData.url}
            icon={LinkIcon}
            labelText="URL da imagem"
          />
          <CopyTextButton
            buttonText="Copiar URL"
            textToCopy={imageData.url}
            variant="default"
          />
        </div>
        <InputText
          disabled
          defaultValue={imageData.id}
          icon={TagIcon}
          labelText="ID da imagem"
        />
        <InputText
          disabled
          defaultValue={formatDateTime(imageData.createdAt)}
          labelText="Data de upload"
          icon={CalendarIcon}
        />
        <InputText
          disabled
          defaultValue={imageData.uploadedBy.name}
          icon={UserIcon}
          labelText="Usuário"
        />
        <InputText
          disabled
          defaultValue={imageData.uploadedBy.email}
          icon={MailIcon}
          labelText="E-mail do usuário"
        />
        <InputText
          disabled
          defaultValue={imageData.uploadedBy.id}
          icon={TagIcon}
          labelText="ID do usuário"
        />
        <InputSelect
          name="deleteImage"
          defaultValue=""
          onChange={(value) => setStatus(value === "delete" ? "delete" : "")}
          className="justify-start"
          options={[
            {
              label: "Ativa",
              value: "",
              icon: CheckCircle2Icon,
              iconClassName: "text-green-600",
            },
            {
              label: "Deletar",
              value: "delete",
              icon: TrashIcon,
              iconClassName: "text-red-600",
            },
          ]}
        ></InputSelect>

        <div className="flex gap-5 w-full">
          <Button
            variant="danger"
            onClick={handleOpenModal}
            disabled={pendingActions.length < 1}
          >
            Atualizar
          </Button>
          <Button
            onClick={() =>
              redirectWithNotice("admin/images", Notice.ACTION_CANCELLED)
            }
          >
            Cancelar
          </Button>
        </div>
      </form>
      <ConfirmAdminActionModal
        open={modalOpen}
        submitting={submitting}
        needAdminPassword={true}
        pendingActions={pendingActions}
        reasons={reasons}
        reasonErrors={reasonErrors}
        passwordError={passwordError}
        canConfirm={canConfirm}
        onReasonChange={handleReasonChange}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}
