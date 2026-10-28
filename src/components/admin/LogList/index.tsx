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
  FileTextIcon,
  IdCardIcon,
  ImageIcon,
  KeyRoundIcon,
  LayersIcon,
  LockKeyholeIcon,
  LogInIcon,
  LogOutIcon,
  MessageSquareTextIcon,
  PencilIcon,
  ShieldIcon,
  UnlockKeyholeIcon,
  UploadIcon,
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
              <span className="truncate">{log.actor.name}</span>
              <span className="truncate text-sm opacity-70">
                {log.actor.email}
              </span>
            </div>
          ),
          className: "max-w-60",
        },
        {
          header: "ID Ator",
          headerIcon: UserIcon,
          cell: (log) => (
            <CopyTextButton
              buttonText="Copiar id"
              textToCopy={log.activityLogId}
              variant="ghost"
              size="sm"
            />
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
          header: "Tipo Entidade",
          headerIcon: LayersIcon,
          cell: (log) => (
            <span className="inline-flex items-center gap-2">
              {log.entityType === "USER" && <UserIcon size={16} />}
              {log.entityType === "POST" && <FileTextIcon size={16} />}
              {log.entityType === "IMAGE" && <ImageIcon size={16} />}
              {log.entityType === "UPLOAD" && <UploadIcon size={16} />}
              {ENTITY_TYPE_LABELS[log.entityType]}
            </span>
          ),
        },
        {
          header: "ID Entidade",
          headerIcon: LayersIcon,
          cell: (log) => (
            <CopyTextButton
              buttonText="Copiar id"
              textToCopy={log.entityId}
              variant="ghost"
              size="sm"
            />
          ),
        },
        {
          header: "Usuário Afetado",
          headerIcon: UserIcon,
          cell: (log) => {
            const user = log.affectedUser;
            if (!user) return "Não registrado";
            return (
              <div className="flex flex-col">
                <span className="truncate">{user.name}</span>
                <span className="truncate text-sm opacity-70">
                  {user.email}
                </span>
              </div>
            );
          },
          className: "max-w-60",
        },
        {
          header: "ID Usário",
          headerIcon: LayersIcon,
          cell: (log) => {
            const user = log.affectedUser;

            if (!user) return "Não registrado";
            return (
              <CopyTextButton
                buttonText="Copiar id"
                textToCopy={user.id}
                variant="ghost"
                size="sm"
              />
            );
          },
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
