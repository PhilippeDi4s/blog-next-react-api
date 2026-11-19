import { CollapsibleSection } from "@/components/layout/CollapsibleSection";
import { InputSelect } from "@/components/ui/InputSelect";
import { InputText } from "@/components/ui/InputText";
import { ActionType } from "@/lib/logs/enums/actionType";
import { ActivityLog, UserLogSnapshot } from "@/lib/logs/types/log-types";
import { roleOptions } from "@/lib/user/enums/roles";
import { MailIcon, UserIcon } from "lucide-react";

type UserMetadataProps = {
  log: ActivityLog;
};

const STATUS_MESSAGES: Partial<
  Record<ActionType, { text: string; className?: string }>
> = {
  [ActionType.BLOCK_USER]: {
    text: "Usuário foi bloqueado",
    className: "text-red-700",
  },
  [ActionType.UNBLOCK_USER]: {
    text: "Usuário foi desbloqueado",
    className: "text-green-700",
  },
  [ActionType.LOGIN]: { text: "Usuário fez login" },
  [ActionType.LOGOUT]: { text: "Usuário foi deslogado" },
  [ActionType.PASSWORD_CHANGE]: { text: "Usuário alterou sua senha" },
};

function UserFields({ snapshot }: { snapshot?: Partial<UserLogSnapshot> }) {
  if (!snapshot) return null;

  return (
    <>
      {snapshot.name !== undefined && (
        <InputText
          labelText="Nome"
          icon={UserIcon}
          disabled
          defaultValue={snapshot.name}
        />
      )}
      {snapshot.email !== undefined && (
        <InputText
          labelText="E-mail"
          icon={MailIcon}
          disabled
          defaultValue={snapshot.email}
        />
      )}
      {snapshot.role !== undefined && (
        <InputSelect
          labelText="Cargo"
          options={roleOptions}
          defaultValue={snapshot.role}
          disabled
        />
      )}
    </>
  );
}

export function UserMetadata({ log }: UserMetadataProps) {
  switch (log.action) {
    case ActionType.UPDATED:
    case ActionType.PROMOTE:
    case ActionType.DEMOTE: {
      const before = log.metadata.before as Partial<UserLogSnapshot>;
      const after = log.metadata.after as Partial<UserLogSnapshot>;

      return (
        <>
          <CollapsibleSection toggleBtnContent={<>Antes</>}>
            <UserFields snapshot={before} />
          </CollapsibleSection>
          <CollapsibleSection toggleBtnContent={<>Depois</>}>
            <UserFields snapshot={after} />
          </CollapsibleSection>
        </>
      );
    }

    case ActionType.CREATED:
      return (
        <UserFields
          snapshot={log.metadata.created as Partial<UserLogSnapshot>}
        />
      );

    case ActionType.DELETED:
      return (
        <UserFields
          snapshot={log.metadata.deleted as Partial<UserLogSnapshot>}
        />
      );

    default: {
      const message = STATUS_MESSAGES[log.action];
      if (!message) return null;
      return (
        <span className={`text-xl ${message.className ?? ""}`}>
          {message.text}
        </span>
      );
    }
  }
}
