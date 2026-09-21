import { AdminUpdatePostDto } from "@/lib/post/schemas";
import { ConfirmAdminActionModal } from "../ConfirmAdminActionModal";

type PostAdminForm = {
  postId: string;
  initialData: AdminUpdatePostDto;
  isFormModalOpen: boolean;
  onClose: () => void;
};

export function PostAdminForm() {
  return (
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
  );
}
