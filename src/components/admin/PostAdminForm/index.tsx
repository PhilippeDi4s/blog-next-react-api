"use client";

import { AdminPostFormValuesDto } from "@/lib/post/schemas";
import { ConfirmAdminActionModal } from "../ConfirmAdminActionModal";
import { PostFormFields } from "@/components/post/PostFormFields";
import { useState } from "react";
import { usePostAdminForm } from "@/lib/post/usePostAdminForm";
import { Button } from "@/components/ui/Button";
import { Notice, redirectWithNotice } from "@/lib/notifications";

type PostAdminFormProps = {
  postId: string;
  slug: string;
  authorName: string;
  initialData: AdminPostFormValuesDto;
};

export function PostAdminForm({
  postId,
  slug,
  authorName,
  initialData,
}: PostAdminFormProps) {
  const { current, setCurrent, fieldErrors, handleSubmit, modalProps } =
    usePostAdminForm(postId, initialData, slug);

  const [contentValue, setContentValue] = useState(initialData.content);

  function handleFieldChange(
    field: keyof AdminPostFormValuesDto,
    value: string | boolean,
  ) {
    setCurrent((prev) => ({ ...prev, [field]: value }));
  }

  function handleContentChange(value: string) {
    setContentValue(value);
    setCurrent((prev) => ({ ...prev, content: value }));
  }

  function handleCancel() {
    redirectWithNotice("admin/posts", Notice.ACTION_CANCELLED);
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <PostFormFields
          id={postId}
          slug={slug}
          authorName={authorName}
          formState={current}
          isPending={modalProps.submitting}
          contentValue={contentValue}
          setContentValue={handleContentChange}
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
