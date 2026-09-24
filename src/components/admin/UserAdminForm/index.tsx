"use client";

import { AdminUserFormValuesDto } from "@/lib/user/schemas";
import { InputText } from "@/components/ui/InputText";
import { InputCheckbox } from "@/components/ui/InputCheckbox";
import { InputSelect } from "@/components/ui/InputSelect";
import { roleOptions, Roles } from "@/lib/user/roles";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ConfirmAdminActionModal } from "../ConfirmAdminActionModal";
import { getFieldErrors } from "@/lib/shared/getFieldErrors";
import { useUserAdminForm } from "@/lib/user/useUserAdminForm";

type UserAdminFormProps = {
  userId: string;
  initialData: AdminUserFormValuesDto;
  isFormModalOpen: boolean;
  onClose: () => void;
};

export function UserAdminForm({
  userId,
  initialData,
  onClose,
}: UserAdminFormProps) {
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
  } = useUserAdminForm(userId, initialData);
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

  if (!modalOpen) return null;

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-4"
      >
        <InputText
          labelText="Nome do usuário"
          placeholder="Digite o nome do usuário"
          type="text"
          name="name"
          error={errorsByField.name}
          value={current.name}
          onChange={(e) => {
            setCurrent((prev) => ({
              ...prev,
              name: e.target.value,
            }));
          }}
        />

        <InputText
          labelText="E-mail do usuário"
          placeholder="Digite o e-mail do usuário"
          type="email"
          name="email"
          error={errorsByField.email}
          value={current.email}
          onChange={(e) => {
            setCurrent((prev) => ({
              ...prev,
              email: e.target.value,
            }));
          }}
        />

        <InputSelect
          labelText="Papel do usuário"
          name="role"
          error={errorsByField.role}
          value={current.role}
          onChange={(value) => setCurrent({ ...current, role: value as Roles })}
          options={roleOptions}
        />

        <InputSelect
          labelText="Situação do usuário"
          name="deletedAt"
          error={errorsByField.deletedAt}
          value={archivedIntent ? "archived" : "active"}
          onChange={(value) => setArchivedIntent(value === "archived")}
        >
          <option value="active">Ativo</option>
          <option value="archived">Arquivado</option>
        </InputSelect>

        <InputCheckbox
          labelText="Está bloqueado?"
          name="isBlocked"
          error={errorsByField.isBlocked}
          checked={current.isBlocked}
          onChange={(e) => {
            setCurrent((prev) => ({
              ...prev,
              isBlocked: e.target.checked,
            }));
          }}
        />

        <InputCheckbox
          labelText="Está deslogado?"
          name="forceLogout"
          error={errorsByField.forceLogout}
          checked={current.forceLogout}
          onChange={(e) => {
            setCurrent((prev) => ({
              ...prev,
              forceLogout: e.target.checked,
            }));
          }}
        />

        <div className="flex gap-2 w-full">
          <Button variant="danger" type="submit">
            Atualizar
          </Button>

          <Button variant="default" type="button" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </form>
      <ConfirmAdminActionModal {...modalProps} />
    </>
  );
}
