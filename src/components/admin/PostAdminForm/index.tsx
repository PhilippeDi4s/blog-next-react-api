"use client";

import {  PostResponseDto } from "@/lib/post/schemas";
import { ConfirmAdminActionModal } from "../ConfirmAdminActionModal";
import { PostFormFields } from "@/components/post/PostFormFields";
import { useState } from "react";
import { usePostAdminForm } from "@/lib/post/usePostAdminForm";
import { Button } from "@/components/ui/Button";
import { Notice, redirectWithNotice } from "@/lib/notifications";

type PostAdminFormProps = {
  initialData: PostResponseDto;
};

export function PostAdminForm({ initialData }: PostAdminFormProps) {
  const { current, setCurrent, fieldErrors, handleSubmit, modalProps } =
    usePostAdminForm(initialData);

  const [contentValue, setContentValue] = useState(initialData.content);

  function handleFieldChange(
    field: keyof PostResponseDto,
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
