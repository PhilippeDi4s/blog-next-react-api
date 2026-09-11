// components/admin/users/user-admin-form.tsx
"use client";

import { useUserAdminForm } from "@/hooks/use-user-admin-form";
import { ConfirmPasswordModal } from "./confirm-password-modal";
import { UserFormData } from "@/lib/user/user-form-diff";

type UserAdminFormProps = {
  userId: string;
  initialData: UserFormData;
};

export function UserAdminForm({ userId, initialData }: UserAdminFormProps) {
  const {
    current,
    setCurrent,
    modalOpen,
    pendingActions,
    reasons,
    setReason,
    canConfirm,
    passwordError,
    submitting,
    fieldErrors,
    handleSubmit,
    handlePasswordConfirm,
    handleModalCancel,
  } = useUserAdminForm(userId, initialData);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-4"
      >
        {/* campos do form permanecem iguais aos da versão anterior */}
      </form>

      <ConfirmPasswordModal
        open={modalOpen}
        submitting={submitting}
        error={passwordError}
        pendingActions={pendingActions}
        reasons={reasons}
        onReasonChange={setReason}
        canConfirm={canConfirm}
        onConfirm={handlePasswordConfirm}
        onCancel={handleModalCancel}
      />
    </>
  );
}
