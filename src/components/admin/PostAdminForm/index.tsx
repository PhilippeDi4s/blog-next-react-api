"use client";

import { AdminPostFormValuesDto, PostResponseDto } from "@/lib/post/schemas";
import { ConfirmAdminActionModal } from "../ConfirmAdminActionModal";
import { PostFormFields } from "@/components/post/PostFormFields";
import { usePostAdminForm } from "@/lib/post/usePostAdminForm";
import { Button } from "@/components/ui/Button";
import { Notice, redirectWithNotice } from "@/lib/notifications";

type PostAdminFormProps = {
  initialData: PostResponseDto;
};

export function PostAdminForm({ initialData }: PostAdminFormProps) {
  const {
    current,
    setCurrent,
    fieldErrors,
    clearFieldError,
    handleSubmit,
    modalProps,
  } = usePostAdminForm(initialData);

  function handleFieldChange(
    field: keyof AdminPostFormValuesDto,
    value: string | boolean,
  ) {
    setCurrent((prev) => ({ ...prev, [field]: value }));
    clearFieldError(field);
  }

  function handleCancel() {
    redirectWithNotice("admin/posts", Notice.ACTION_CANCELLED);
  }

  return (
    <>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <PostFormFields
          id={initialData.id}
          slug={initialData.slug}
          authorName={initialData.author.name}
          formState={current}
          isPending={modalProps.submitting}
          contentValue={current.content}
          setContentValue={(v) => {
            setCurrent((prev) => ({ ...prev, content: v }));
            clearFieldError("content");
          }}
          onFieldChange={handleFieldChange}
          errors={fieldErrors}
        />
        <div className="flex gap-2 w-full">
          <Button
            variant="danger"
            type="submit"
            disabled={modalProps.submitting}
          >
            Atualizar
          </Button>
          <Button
            variant="default"
            type="button"
            disabled={modalProps.submitting}
            onClick={handleCancel}
          >
            Cancelar
          </Button>
        </div>
      </form>
      <ConfirmAdminActionModal {...modalProps} />
    </>
  );
}
