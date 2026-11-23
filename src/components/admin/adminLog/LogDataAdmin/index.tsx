"use client";

import { CollapsibleSection } from "@/components/layout/CollapsibleSection";
import {
  sectionClassName,
  toggleBtnClassName,
} from "@/components/admin/adminLog/logSectionStyles";
import { InputSelect } from "@/components/ui/InputSelect";
import { InputText } from "@/components/ui/InputText";
import { InputTextArea } from "@/components/ui/InputTextArea";
import { entityTypeOptions } from "@/lib/logs/enums/entityType";
import { ActivityLog } from "@/lib/logs/types/log-types";
import {
  Calendar1Icon,
  IdCardIcon,
  LayersIcon,
  LockKeyholeIcon,
  MailIcon,
  MessageSquareIcon,
  ShieldIcon,
  TagIcon,
  UserIcon,
} from "lucide-react";
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

  return (
    <div className="w-full items-start bg-slate-800 p-2 md:p-6 rounded-4xl flex flex-col gap-5">
      <CollapsibleSection
        toggleBtnContent={<>Ator</>}
        className={sectionClassName}
        toggleBtnClassName={toggleBtnClassName}
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
          icon={ShieldIcon}
        />
        <InputText
          disabled
          labelText="Status da conta"
          defaultValue={log.actor.isBlocked ? "Bloqueado" : "Não bloqueado"}
          icon={LockKeyholeIcon}
        />
        <InputText
          disabled
          labelText="ID do ator"
          defaultValue={log.actor.id}
          icon={IdCardIcon}
        />
        <InputText
          disabled
          labelText="Criado em"
          defaultValue={formatDate(log.actor.createdAt)}
          icon={Calendar1Icon}
        />
        <InputText
          disabled
          labelText="Atualizado em"
          defaultValue={formatDate(log.actor.updatedAt)}
          icon={Calendar1Icon}
        />
        {log.actor.deletedAt && (
          <InputText
            disabled
            labelText="Excluido em"
            defaultValue={formatDate(log.actor.deletedAt)}
            icon={Calendar1Icon}
          />
        )}
      </CollapsibleSection>

      {log.metadata.isAdminAction && (
        <CollapsibleSection
          toggleBtnContent={<>Usuário afetado</>}
          className={sectionClassName}
          toggleBtnClassName={toggleBtnClassName}

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
            icon={ShieldIcon}
          />
          <InputText
            disabled
            labelText="Status da conta"
            defaultValue={
              log.affectedUser?.isBlocked ? "Bloqueado" : "Não bloqueado"
            }
            icon={LockKeyholeIcon}
          />
          <InputText
            disabled
            labelText="ID do usuário"
            defaultValue={log.affectedUser?.id}
            icon={UserIcon}
          />
          <InputText
            disabled
            labelText="Criado em"
            defaultValue={
              log.affectedUser?.createdAt
                ? formatDate(log.affectedUser.createdAt)
                : ""
            }
            icon={Calendar1Icon}
          />
          <InputText
            disabled
            labelText="Atualizado em"
            defaultValue={
              log.affectedUser?.updatedAt
                ? formatDate(log.affectedUser.updatedAt)
                : ""
            }
            icon={Calendar1Icon}
          />
          {log.actor.deletedAt && (
            <InputText
              disabled
              labelText="Excluido em"
              defaultValue={formatDate(log.actor.deletedAt)}
              icon={Calendar1Icon}
            />
          )}
        </CollapsibleSection>
      )}

      <CollapsibleSection
        toggleBtnContent={<>Log da Atividade</>}
        className={sectionClassName}
        toggleBtnClassName={toggleBtnClassName}
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
          icon={LayersIcon}
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
        toggleBtnContent={<>Metadata</>}
        toggleBtnClassName={toggleBtnClassName}
        className="px-4 pb-6"
      >
        {renderMetadataAdmin(log)}
      </CollapsibleSection>
    </div>
  );
}
