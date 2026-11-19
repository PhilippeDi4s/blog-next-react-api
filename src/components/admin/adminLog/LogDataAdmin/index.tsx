"use client";

import { CollapsibleSection } from "@/components/layout/CollapsibleSection";
import { InputSelect } from "@/components/ui/InputSelect";
import { InputText } from "@/components/ui/InputText";
import { InputTextArea } from "@/components/ui/InputTextArea";
import { entityTypeOptions } from "@/lib/logs/enums/entityType";
import { ActivityLog } from "@/lib/logs/types/log-types";
import { MailIcon, MessageSquareIcon, TagIcon, UserIcon } from "lucide-react";
import { Notice, redirectWithNotice } from "@/lib/notifications";
import { renderMetadataAdmin } from "../metadata/render-metadata-admin";
import { formatDate } from "@/utils/format-datetime";

type LogDataAdminProps = {
  log: ActivityLog;
};

export function LogDataAdmin({ log }: LogDataAdminProps) {
  if (!log) {
    return redirectWithNotice("*", Notice.LOG_NOT_FOUND);
  }

  const toggleBtnStyle = "text-2xl font-semibold";

  return (
    <div className="w-full items-start bg-slate-800 p-2 md:p-6 rounded-4xl flex flex-col gap-5">
      <CollapsibleSection
        toggleBtnContent={<>Ator</>}
        className="grid grid-cols-1 gap-5 md:grid-cols-3 px-4 pb-6  border-b border-white/50"
        toggleBtnClassName={toggleBtnStyle}
      >
        <InputText
          disabled
          labelText="Nome do ator"
          defaultValue={log.actor.name}
          icon={UserIcon}
        />
        <InputText
          disabled
          labelText="E-mail do ator"
          defaultValue={log.actor.email}
          icon={MailIcon}
        />
        <InputText
          disabled
          labelText="Papel do ator"
          defaultValue={log.actor.role}
          icon={MailIcon}
        />
        <InputText
          disabled
          labelText="Status da conta"
          defaultValue={log.actor.isBlocked ? "Bloqueado" : "Não bloqueado"}
          icon={UserIcon}
        />
        <InputText
          disabled
          labelText="ID do ator"
          defaultValue={log.actor.id}
          icon={TagIcon}
        />
        <InputText
          disabled
          labelText="Criado em"
          defaultValue={formatDate(log.actor.createdAt)}
          icon={UserIcon}
        />
        <InputText
          disabled
          labelText="Atualizado em"
          defaultValue={formatDate(log.actor.updatedAt)}
          icon={UserIcon}
        />
        {log.actor.deletedAt && (
          <InputText
            disabled
            labelText="Excluido em"
            defaultValue={formatDate(log.actor.deletedAt)}
            icon={UserIcon}
          />
        )}
      </CollapsibleSection>
      <CollapsibleSection
        toggleBtnContent={<>Usuário afetado</>}
        className="grid grid-cols-1 gap-5 md:grid-cols-3 px-4 pb-6  border-b border-white/50"
        toggleBtnClassName={toggleBtnStyle}
      >
        <InputText
          disabled
          labelText="Nome do usuário"
          defaultValue={log.affectedUser?.name}
          icon={UserIcon}
        />
        <InputText
          disabled
          labelText="E-mail do usuário"
          defaultValue={log.affectedUser?.email}
          icon={MailIcon}
        />
        <InputText
          disabled
          labelText="Papel do usuário"
          defaultValue={log.affectedUser?.role}
          icon={MailIcon}
        />
        <InputText
          disabled
          labelText="Status da conta"
          defaultValue={
            log.affectedUser?.isBlocked ? "Bloqueado" : "Não bloqueado"
          }
          icon={UserIcon}
        />
        <InputText
          disabled
          labelText="ID do usuário"
          defaultValue={log.affectedUser?.id}
          icon={TagIcon}
        />
        <InputText
          disabled
          labelText="Criado em"
          defaultValue={
            log.affectedUser?.createdAt
              ? formatDate(log.affectedUser.createdAt)
              : ""
          }
          icon={UserIcon}
        />
        <InputText
          disabled
          labelText="Atualizado em"
          defaultValue={
            log.affectedUser?.updatedAt
              ? formatDate(log.affectedUser.updatedAt)
              : ""
          }
          icon={UserIcon}
        />
        {log.actor.deletedAt && (
          <InputText
            disabled
            labelText="Excluido em"
            defaultValue={formatDate(log.actor.deletedAt)}
            icon={UserIcon}
          />
        )}
      </CollapsibleSection>
      <CollapsibleSection
        defaultOpen={true}
        toggleBtnContent={<>Log da Atividade</>}
        className="grid grid-cols-1 gap-5 md:grid-cols-3 px-4 pb-6  border-b border-white/50"
        toggleBtnClassName={toggleBtnStyle}
      >
        <InputText
          disabled
          labelText="ID do log"
          defaultValue={log.activityLogId}
          icon={TagIcon}
        />
        <InputSelect
          labelText="Entidade afetada"
          defaultValue={log.entityType}
          options={entityTypeOptions}
          disabled
        />
        <InputText
          disabled
          labelText="ID da entidade"
          defaultValue={log.entityId}
          icon={TagIcon}
        />
        {log.reason && (
          <InputTextArea
            className="md:col-span-full"
            labelText="Motivo da ação"
            icon={MessageSquareIcon}
            defaultValue={log.reason}
            disabled
          />
        )}
      </CollapsibleSection>
      <CollapsibleSection
        defaultOpen={true}
        toggleBtnContent={<>Metadata</>}
        toggleBtnClassName={toggleBtnStyle}
      >
        {renderMetadataAdmin(log)}
      </CollapsibleSection>
    </div>
  );
}
