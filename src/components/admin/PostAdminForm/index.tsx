import { AdminPostFormValuesDto } from "@/lib/post/schemas";
import { ConfirmAdminActionModal } from "../ConfirmAdminActionModal";
import { PostFormFields } from "@/components/post/PostFormFields";
import { useState } from "react";
import { usePostAdminForm } from "@/lib/post/usePostAdminForm";

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
  const {
    current,
    setCurrent,
    modalOpen,
    pendingActions,
    reasons,
    reasonError,
    setReason,
    canConfirm,
    passwordError,
    submitting,
    fieldErrors,
    handleSubmit,
    handlePasswordConfirm,
    handleModalCancel,
    needsPassword,
  } = usePostAdminForm(postId, initialData, slug);

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

  const modalProps = needsPassword()
    ? {
        open: modalOpen,
        submitting,
        passwordError,
        reasonErrors: reasonError,
        pendingActions,
        reasons,
        onReasonChange: setReason,
        canConfirm,
        onConfirm: handlePasswordConfirm,
        onCancel: handleModalCancel,
        needAdminPassword: true as const,
      }
    : {
        open: modalOpen,
        submitting,
        reasonErrors: reasonError,
        pendingActions,
        reasons,
        onReasonChange: setReason,
        onConfirm: () => handlePasswordConfirm(""),
        onCancel: handleModalCancel,
        needAdminPassword: false as const,
      };
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
          isPending={submitting}
          contentValue={contentValue}
          setContentValue={handleContentChange}
          onFieldChange={handleFieldChange}
          errors={fieldErrors}
        />
      </form>
      <ConfirmAdminActionModal {...modalProps} />
    </>
  );
}
