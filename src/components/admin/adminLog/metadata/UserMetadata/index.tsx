import { StatusMessage } from "@/components/admin/adminLog/metadata/StatusMessage";
import type { StatusTone } from "@/components/admin/adminLog/metadata/StatusMessage";
import {
  getDiffClassName,
  UpdateMetadataSections,
  type DiffVariant,
} from "@/components/admin/adminLog/metadata/UpdateMetadataSections";
import { InputSelect } from "@/components/ui/InputSelect";
import { InputText } from "@/components/ui/InputText";
import { ActionType } from "@/lib/logs/enums/actionType";
import { ActivityLog, UserLogSnapshot } from "@/lib/logs/types/log-types";
import { roleOptions } from "@/lib/user/enums/roles";
import {
  KeyRoundIcon,
  LogInIcon,
  LogOutIcon,
  MailIcon,
  type LucideIcon,
  UserCheckIcon,
  UserIcon,
  UserXIcon,
} from "lucide-react";

type UserMetadataProps = {
  log: ActivityLog;
};

const STATUS_MESSAGES: Partial<
  Record<
    ActionType,
    { text: string; icon: LucideIcon; tone: StatusTone }
  >
> = {
  [ActionType.BLOCK_USER]: {
    text: "Usuário foi bloqueado",
    icon: UserXIcon,
    tone: "danger",
  },
  [ActionType.UNBLOCK_USER]: {
    text: "Usuário foi desbloqueado",
    icon: UserCheckIcon,
    tone: "success",
  },
  [ActionType.LOGIN]: {
    text: "Usuário fez login",
    icon: LogInIcon,
    tone: "success",
  },
  [ActionType.LOGOUT]: {
    text: "Usuário foi deslogado",
    icon: LogOutIcon,
    tone: "danger",
  },
  [ActionType.PASSWORD_CHANGE]: {
    text: "Usuário alterou sua senha",
    icon: KeyRoundIcon,
    tone: "warning",
  },
};

function UserFields({
  snapshot,
  variant,
  changedKeys,
}: {
  snapshot?: Partial<UserLogSnapshot>;
  variant?: DiffVariant;
  changedKeys?: ReadonlySet<string>;
}) {
  if (!snapshot) return null;
  const fieldClassName = (key: string) =>
    getDiffClassName(variant ?? "before", changedKeys?.has(key) ?? false);

  return (
    <>
      {snapshot.name !== undefined && (
        <div className={fieldClassName("name")}>
          <InputText
            labelText="Nome"
            icon={UserIcon}
            disabled
            defaultValue={snapshot.name}
          />
        </div>
      )}
      {snapshot.email !== undefined && (
        <div className={fieldClassName("email")}>
          <InputText
            labelText="E-mail"
            icon={MailIcon}
            disabled
            defaultValue={snapshot.email}
          />
        </div>
      )}
      {snapshot.role !== undefined && (
        <div className={fieldClassName("role")}>
          <InputSelect
            labelText="Cargo"
            options={roleOptions}
            defaultValue={snapshot.role}
            disabled
          />
        </div>
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
        <UpdateMetadataSections
          before={before}
          after={after}
          renderFields={(snapshot, variant, changedKeys) => (
            <UserFields
              snapshot={snapshot}
              variant={variant}
              changedKeys={changedKeys}
            />
          )}
        />
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
      return <StatusMessage {...message} />;
    }
  }
}
