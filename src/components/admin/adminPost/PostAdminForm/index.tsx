"use client";

import { AdminPostFormValuesDto, PostResponseDto } from "@/lib/post/schemas";
import { ConfirmAdminActionModal } from "../../ConfirmAdminActionModal";
import { PostFormFields } from "@/components/post/PostFormFields";
import { usePostAdminForm } from "@/lib/post/usePostAdminForm";
import { Button } from "@/components/ui/Button";
import { Notice, redirectWithNotice } from "@/lib/notifications";
import { getAllImagesAdminAction } from "@/app/actions/admin/image/get-all-images-admin-action";
import type { FetchImages } from "@/lib/image/types/imageGalleryModalType";

const fetchAdminGalleryImages: FetchImages = async () => {
  const res = await getAllImagesAdminAction();

  if (!res.success) {
    return { success: false, errors: res.errors };
  }

  return { success: true, errors: res.errors, data: res.data.data };
};

type PostAdminFormProps = {
  initialData: PostResponseDto;
};

export function PostAdminForm({ initialData }: PostAdminFormProps) {
  if (!initialData) {
    redirectWithNotice("*", Notice.POST_NOT_FOUND);
  }

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
          fetchImages={fetchAdminGalleryImages}
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
