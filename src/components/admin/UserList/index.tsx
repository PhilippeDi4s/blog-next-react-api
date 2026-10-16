import { ErrorMessage } from "@/components/feedBack/ErrorMessage";
import { getUsers } from "@/lib/user/queries/admin";
import { AdminList } from "../AdminList";
import { formatDate } from "@/utils/format-datetime";
import { SESSION_STATUS_LABELS } from "@/lib/user/enums/sessionStatus";
import { roleLabels } from "@/lib/user/enums/roles";
import {
  ActivityIcon,
  ArchiveIcon,
  Calendar1Icon,
  CalendarIcon,
  CheckIcon,
  Clock3Icon,
  IdCardIcon,
  LockKeyholeIcon,
  ShieldIcon,
  User2Icon,
  UserCogIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import { CopyTextButton } from "@/components/ui/CopyTextButton";

export async function UserList() {
  const res = await getUsers();

  if (!res.success) {
    return (
      <ErrorMessage
        pageTitle="Usuários"
        contentTitle="Não foi possível carregar os usuários"
        contentTitleClassName="text-4xl/tight md:text-5xl"
        content={res.errors.map((e) => e.message).join(" ")}
      />
    );
  }

  const { data: users } = res.data;

  return (
    <AdminList
      items={users}
      getRowKey={(user) => user.id}
      getRowHref={(user) => `/admin/users/${user.id}`}
      noDataMessage={{
        pageTitle: "Usuários",
        emptyMessageTitle: "Nenhum usuário encontrado",
        emptyMessage:
          "Ainda não há usuários cadastrados ou nenhum corresponde ao filtro.",
      }}
      columns={[
        {
          header: "ID",
          headerIcon: IdCardIcon,
          cell: (user) => (
            <CopyTextButton
              buttonText="Copiar id"
              textToCopy={user.id}
              variant="ghost"
              size="sm"
            />
          ),
        },
        {
          header: "Usuário",
          headerIcon: UserIcon,
          cell: (user) => (
            <div className="flex flex-col">
              <span className="truncate">{user.name}</span>
              <span className="text-sm opacity-70 truncate">{user.email}</span>
            </div>
          ),
          className: "max-w-55",
        },
        {
          header: "Perfil",
          headerIcon: UserCogIcon,
          cell: (user) => {
            const isAdmin = user.role === "admin";
            const ProfileIcon = isAdmin ? ShieldIcon : User2Icon;

            return (
              <div
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1`}
              >
                <ProfileIcon
                  size={15}
                  aria-hidden="true"
                  className={isAdmin ? "text-violet-700" : "text-sky-700"}
                />
                <span>{roleLabels[user.role]}</span>
              </div>
            );
          },
        },
        {
          header: "Status",
          headerIcon: ActivityIcon,
          cell: (user) => {
            let userState = SESSION_STATUS_LABELS[user.sessionStatus];
            let StatusIcon = CheckIcon;
            let statusClassName = " text-green-700";

            if (user.sessionStatus === "EXPIRED") {
              StatusIcon = Clock3Icon;
              statusClassName = " text-orange-700";
            } else if (user.sessionStatus === "LOGGED_OUT") {
              StatusIcon = XIcon;
              statusClassName = " text-red-700";
            }

            if (user.deletedAt) {
              userState = "Arquivado";
              StatusIcon = ArchiveIcon;
              statusClassName = " text-amber-700";
            }

            if (user.isBlocked) {
              userState = "Bloqueado";
              StatusIcon = LockKeyholeIcon;
              statusClassName = " text-red-700";
            }

            return (
              <div
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1`}
              >
                <StatusIcon
                  size={15}
                  aria-hidden="true"
                  className={`${statusClassName}`}
                />
                <span>{userState}</span>
              </div>
            );
          },
        },
        {
          header: "Criado em",
          headerIcon: Calendar1Icon,
          cell: (user) => formatDate(user.createdAt),
        },
        {
          header: "Atualizado em",
          headerIcon: CalendarIcon,
          cell: (user) => formatDate(user.updatedAt),
        },
      ]}
    />
  );
}
