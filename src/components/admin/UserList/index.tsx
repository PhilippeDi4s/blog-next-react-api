import { ErrorMessage } from "@/components/feedBack/ErrorMessage";
import { getUsers } from "@/lib/user/queries/admin";
import { AdminList } from "../AdminList";
import { formatDate } from "@/utils/format-datetime";
import { SESSION_STATUS_LABELS } from "@/lib/user/enums/sessionStatus";

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
          cell: (user) => user.id,
        },
        {
          header: "Nome",
          cell: (user) => user.name,
        },
        {
          header: "E-mail",
          cell: (user) => user.email,
        },
        {
          header: "Perfil",
          cell: (user) => user.role,
        },
        {
          header: "Status",
          cell: (user) => {
            if (user.deletedAt) return "Arquivado";
            if (user.isBlocked) return "Bloqueado";
            return SESSION_STATUS_LABELS[user.sessionStatus];
          },
        },
        {
          header: "Criado em",
          cell: (user) => formatDate(user.createdAt),
        },
        {
          header: "Atualizado em",
          cell: (user) => formatDate(user.updatedAt),
        },
      ]}
    />
  );
}
