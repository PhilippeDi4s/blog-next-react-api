import { ErrorMessage } from "@/components/feedBack/ErrorMessage";
import { CollapsibleCard } from "@/components/layout/CollapsibleCard";
import { InputText } from "@/components/ui/InputText";
import { roleLabels, roleOptions } from "@/lib/user/enums/roles";
import { SESSION_STATUS_LABELS } from "@/lib/user/enums/sessionStatus";
import { getUserById } from "@/lib/user/queries/admin-user";
import { formatDate, formatDateTime } from "@/utils/format-datetime";
import {
  ActivityIcon,
  CalendarClockIcon,
  CalendarPlusIcon,
  MailIcon,
  TagIcon,
  TimerIcon,
  UserIcon,
} from "lucide-react";

type UserProfileDataAdminProps = {
  userId: string;
};

export async function UserProfileDataAdmin({
  userId,
}: UserProfileDataAdminProps) {
  const res = await getUserById(userId);

  if (!res.success) {
    return (
      <ErrorMessage
        pageTitle="Perfil do usuário"
        contentTitle="Não foi possível carregar o perfil"
        content={
          res.errors[0]?.message ?? "Tente novamente em alguns instantes."
        }
      />
    );
  }

  const user = res.data;

  return (
    <CollapsibleCard
      toggleBtnContent={<>Dados Usuário</>}
      className="flex flex-col gap-5 md:grid md:grid-cols-3 md:gap-10"
    >
      <>
        <InputText
          disabled
          labelText="ID"
          icon={TagIcon}
          defaultValue={user.id}
        />
        <InputText
          disabled
          labelText="Status da seção"
          icon={ActivityIcon}
          defaultValue={SESSION_STATUS_LABELS[user.sessionStatus]}
        />
        {user.sessionExpiresAt && (
          <InputText
            disabled
            labelText="Expiração da sessão"
            icon={TimerIcon}
            defaultValue={formatDateTime(user.sessionExpiresAt)}
          />
        )}
        <InputText
          disabled
          labelText="Data de Criação"
          icon={CalendarPlusIcon}
          defaultValue={formatDate(user.createdAt)}
        />
        <InputText
          disabled
          labelText="Última Atualização"
          icon={CalendarClockIcon}
          defaultValue={formatDate(user.updatedAt)}
        />
      </>
    </CollapsibleCard>
  );
}
