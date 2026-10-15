"use client";

import { AdminUserFormValuesDto } from "@/lib/user/schemas";
import { InputText } from "@/components/ui/InputText";
import { InputCheckbox } from "@/components/ui/InputCheckbox";
import { InputSelect } from "@/components/ui/InputSelect";
import { roleOptions, Roles } from "@/lib/user/enums/roles";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ConfirmAdminActionModal } from "../ConfirmAdminActionModal";
import { getFieldErrors } from "@/lib/shared/getFieldErrors";
import { useUserAdminForm } from "@/lib/user/useUserAdminForm";
import { Notice, redirectWithNotice } from "@/lib/notifications";
import { InfoMessage } from "@/components/ui/InfoMessage";

type UserAdminFormProps = {
  userId: string;
  initialData: AdminUserFormValuesDto;
};

export function UserAdminForm({ userId, initialData }: UserAdminFormProps) {
  const {
    current,
    setCurrent,
    fieldErrors,
    handleSubmit,
    modalProps,
    hasChanges,
  } = useUserAdminForm(userId, initialData);

  const [archivedIntent, setArchivedIntent] = useState(
    current.deletedAt !== null,
  );

  const errorsByField = getFieldErrors(fieldErrors);

  function handleCancelForm() {
    redirectWithNotice("admin/users", Notice.ACTION_CANCELLED);
  }

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
          onChange={(value) => {
            const archived = value === "archived";
            setArchivedIntent(archived);
            setCurrent((prev) => ({
              ...prev,
              deletedAt: archived
                ? (initialData.deletedAt ?? new Date().toISOString())
                : null,
            }));
          }}
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
        {current.sessionExpiresAt && (
          <>
            <InputCheckbox
              labelText="Forçar logout"
              name="isLogged"
              error={errorsByField.isLogged}
              onChange={(e) => {
                setCurrent((prev) => ({
                  ...prev,
                  isLogged: !e.target.checked,
                }));
              }}
            />
            <InfoMessage>
              A opção de forçar logout só aparecerá se o usuário possuir uma
              sessão registrada como aberta.
            </InfoMessage>{" "}
          </>
        )}

        <div className="flex gap-2 w-full">
          <Button variant="danger" type="submit" disabled={!hasChanges}>
            Atualizar
          </Button>

          <Button variant="default" type="button" onClick={handleCancelForm}>
            Cancelar
          </Button>
        </div>
      </form>
      <ConfirmAdminActionModal {...modalProps} />
    </>
  );
}
