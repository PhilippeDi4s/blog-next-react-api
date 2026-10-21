import { CopyTextButton } from "@/components/ui/CopyTextButton";
import { ACTION_TYPE_LABELS, ActionType } from "@/lib/logs/enums/actionType";
import { ENTITY_TYPE_LABELS } from "@/lib/logs/enums/entityType";
import { LogResponseDto } from "@/lib/logs/schema";
import { formatDate } from "@/utils/format-datetime";
import {
  ActivityIcon,
  ArchiveIcon,
  ArchiveRestoreIcon,
  Calendar1Icon,
  CirclePlusIcon,
  IdCardIcon,
  KeyRoundIcon,
  LayersIcon,
  LockKeyholeIcon,
  LogInIcon,
  LogOutIcon,
  MessageSquareTextIcon,
  PencilIcon,
  ShieldIcon,
  UnlockKeyholeIcon,
  UserIcon,
} from "lucide-react";
import { AdminList } from "../AdminList";

const actionPresentation = {
  [ActionType.CREATED]: { Icon: CirclePlusIcon, className: "text-green-700" },
  [ActionType.UPDATED]: { Icon: PencilIcon, className: "text-sky-700" },
  [ActionType.DELETED]: { Icon: ArchiveIcon, className: "text-amber-700" },
  [ActionType.RESTORED]: {
    Icon: ArchiveRestoreIcon,
    className: "text-green-700",
  },
  [ActionType.LOGIN]: { Icon: LogInIcon, className: "text-green-700" },
  [ActionType.LOGOUT]: { Icon: LogOutIcon, className: "text-orange-700" },
  [ActionType.REVOKE_FORCE_LOGOUT]: {
    Icon: LogOutIcon,
    className: "text-red-700",
  },
  [ActionType.PASSWORD_RESET]: {
    Icon: KeyRoundIcon,
    className: "text-orange-700",
  },
  [ActionType.PASSWORD_CHANGE]: {
    Icon: KeyRoundIcon,
    className: "text-sky-700",
  },
  [ActionType.PROMOTE]: { Icon: ShieldIcon, className: "text-green-700" },
  [ActionType.DEMOTE]: { Icon: ShieldIcon, className: "text-orange-700" },
  [ActionType.BLOCK_USER]: {
    Icon: LockKeyholeIcon,
    className: "text-red-700",
  },
  [ActionType.UNBLOCK_USER]: {
    Icon: UnlockKeyholeIcon,
    className: "text-green-700",
  },
} satisfies Record<
  ActionType,
  { Icon: typeof ActivityIcon; className: string }
>;

type LogListProps = {
  logs: LogResponseDto[];
};

export function LogList({ logs }: LogListProps) {
  return (
    <AdminList
      items={logs}
      getRowKey={(log) => log.activityLogId}
      getRowHref={(log) => `/admin/logs/${log.activityLogId}`}
      noDataMessage={{
        pageTitle: "Logs",
        emptyMessageTitle: "Nenhum registro encontrado",
        emptyMessage: "Ainda não há registros de atividade.",
      }}
      columns={[
        {
          header: "ID",
          headerIcon: IdCardIcon,
          cell: (log) => (
            <CopyTextButton
              buttonText="Copiar id"
              textToCopy={log.activityLogId}
              variant="ghost"
              size="sm"
            />
          ),
        },
        {
          header: "Ator",
          headerIcon: UserIcon,
          cell: (log) => (
            <div className="flex flex-col">
              <span className="truncate">{log.user.name}</span>
              <span className="truncate text-sm opacity-70">
                {log.user.email}
              </span>
            </div>
          ),
          className: "max-w-60",
        },
        {
          header: "Ação",
          headerIcon: ActivityIcon,
          cell: (log) => {
            const { Icon, className } = actionPresentation[log.action];
            return (
              <div className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1">
                <Icon size={15} aria-hidden="true" className={className} />
                <span>{ACTION_TYPE_LABELS[log.action]}</span>
              </div>
            );
          },
        },
        {
          header: "Entidade",
          headerIcon: LayersIcon,
          cell: (log) => (
            <div className="flex max-w-60 flex-col">
              <span>{ENTITY_TYPE_LABELS[log.entityType]}</span>
              <span className="truncate text-sm opacity-70" title={log.entityId}>
                {log.entityId}
              </span>
            </div>
          ),
          className: "max-w-60",
        },
        {
          header: "Motivo",
          headerIcon: MessageSquareTextIcon,
          cell: (log) => (
            <span className="block max-w-60 truncate" title={log.reason ?? "—"}>
              {log.reason ?? "—"}
            </span>
          ),
          className: "max-w-60",
        },
        {
          header: "Criado em",
          headerIcon: Calendar1Icon,
          cell: (log) => formatDate(log.createdAt),
        },
      ]}
    />
  );
}
