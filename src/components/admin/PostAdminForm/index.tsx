import { AdminPostFormValuesDto, AdminUpdatePostDto } from "@/lib/post/schemas";
import { ConfirmAdminActionModal } from "../ConfirmAdminActionModal";
import { PostFormFields } from "@/components/post/PostFormFields";
import { useAdminForm } from "@/lib/shared/useAdminForm";
import { useState } from "react";
import { getFieldErrors } from "@/lib/shared/getFielErrors";
import { buildPostAction } from "@/lib/post/build-post-action";
import { Notice } from "@/lib/notifications";

type PostAdminForm = {
  postId: string;
  authorName: string;
  initialData: AdminPostFormValuesDto;
};

export function PostAdminForm({ postId, initialData }: PostAdminForm) {
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
  } = useAdminForm(postId, initialData, {
    buildActions: buildPostAction,
    redirectPath: `admin/post/${postId}`,
    notice: Notice.POST_UPDATED,
  });

  const [archivedIntent, setArchivedIntent] = useState(
    current.deletedAt !== null,
  );

  const errorsByField = getFieldErrors(fieldErrors);

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
          id={}
          slug={}
          authorName={}
          contentValue={}
          formState={initialData}
          isPending={}
          setContentValue={}
        />
      </form>
      <ConfirmAdminActionModal
        canConfirm={}
        needAdminPassword={}
        onCancel={}
        onConfirm={}
        onReasonChange={}
        open={}
        passwordError={}
        pendingActions={}
        reasonErrors={}
        reasons={}
        submitting={}
      />
    </>
  );
}
