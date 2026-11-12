import { CollapsibleSection } from "@/components/layout/CollapsibleSection";
import { Heading } from "@/components/ui/Heading";
import { InputSelect } from "@/components/ui/InputSelect";
import { InputText } from "@/components/ui/InputText";
import { InputTextArea } from "@/components/ui/InputTextArea";
import { entityTypeOptions } from "@/lib/logs/enums/entityType";
import { ActivityLog } from "@/lib/logs/types/log-types";
import { MailIcon, MessageSquareIcon, TagIcon, UserIcon } from "lucide-react";

type LogDataAdminProps = {
  log: ActivityLog;
};

export function LogDataAdmin({ log }: LogDataAdminProps) {
  return (
    <div className="w-full bg-slate-800 p-2 md:p-6 rounded-4xl flex flex-col gap-5">
      <div>
        <Heading as="h3">Ator</Heading>
        <CollapsibleSection
          toggleBtnContent={<>Ator</>}
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          <InputText
            disabled
            labelText="ID do ator"
            defaultValue={log.actor.id}
            icon={TagIcon}
          />
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
        </CollapsibleSection>
        <CollapsibleSection
          toggleBtnContent={<>Usuário afetado</>}
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          <InputText
            disabled
            labelText="ID do ator"
            defaultValue={log.actor.id}
            icon={TagIcon}
          />
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
        </CollapsibleSection>
        <CollapsibleSection
          toggleBtnContent={<>Log da Atividade</>}
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          <InputText
            disabled
            labelText="ID do log"
            defaultValue={log.id}
            icon={TagIcon}
          />
          <InputText
            disabled
            labelText="ID da entidade"
            defaultValue={log.entityId}
            icon={TagIcon}
          />
          <InputSelect
            labelText="Entidade afetada"
            defaultValue={log.entityType}
            options={entityTypeOptions}
            disabled
          />
          {log.reason && (
            <InputTextArea
              labelText="Motivo da ação"
              icon={MessageSquareIcon}
              defaultValue={log.reason}
              disabled
            />
          )}
        </CollapsibleSection>
        <CollapsibleSection
          toggleBtnContent={<>Metadata</>}
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          <Heading>Trabalhando nisso</Heading>
          {/* TODO: TERMINAR DE CRIAR COMPONENTES DE METADATA */}
        </CollapsibleSection>
      </div>
    </div>
  );
}
