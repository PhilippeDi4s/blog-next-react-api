"use client";

import { useUserAdminForm } from "@/lib/hooks/use-user-admin-form";
import { ConfirmPasswordModal } from "./confirm-password-modal";
import { AdminUpdateUserPayloadDto } from "@/lib/user/schemas";
import { InputText } from "@/components/ui/InputText";
import { InputCheckbox } from "@/components/ui/InputCheckbox";
import { InputSelect } from "@/components/ui/InputSelect";
import { roleOptions, Roles } from "@/lib/user/roles";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ModalOverlay } from "@/components/ui/ModalOverlay";

type UserAdminFormProps = {
  userId: string;
  initialData: AdminUpdateUserPayloadDto;
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
  } = useUserAdminForm(userId, initialData);

  const [archivedIntent, setArchivedIntent] = useState(
    current.deletedAt !== null,
  );

  const nameError = fieldErrors.find(
    (error) => error.code === "INVALID_NAME",
  )?.message;

  const emailError = fieldErrors.find(
    (error) => error.code === "INVALID_EMAIL",
  )?.message;

  const roleError = fieldErrors.find(
    (error) => error.code === "INVALID_ROLE",
  )?.message;

  const deletedAtError = fieldErrors.find(
    (error) => error.code === "INVALID_DELETEDAT",
  )?.message;

  const isBlockedError = fieldErrors.find(
    (error) => error.code === "INVALID_ISBLOCKED",
  )?.message;

  const forceLogoutError = fieldErrors.find(
    (error) => error.code === "INVALID_FORCELOGOUT",
  )?.message;

  if (!modalOpen) return null;

  return (
    <>
      <ModalOverlay onClose={onClose}>
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
            error={nameError}
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
            error={emailError}
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
            error={roleError}
            value={current.role}
            onChange={(value) =>
              setCurrent({ ...current, role: value as Roles })
            }
            options={roleOptions}
          />

          <InputSelect
            labelText="Situação do usuário"
            name="deletedAt"
            error={deletedAtError}
            value={archivedIntent ? "archived" : "active"}
            onChange={(value) => setArchivedIntent(value === "archived")}
          >
            <option value="active">Ativo</option>
            <option value="archived">Arquivado</option>
          </InputSelect>

          <InputCheckbox
            labelText="Está bloqueado?"
            name="isBlocked"
            error={isBlockedError}
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
            error={forceLogoutError}
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
      </ModalOverlay>
      <ConfirmPasswordModal
        open={modalOpen}
        submitting={submitting}
        passwordError={passwordError}
        reasonErrors={reasonError}
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
