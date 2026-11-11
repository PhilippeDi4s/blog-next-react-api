import { CollapsibleCard } from "@/components/layout/CollapsibleCard";
import { InputText } from "@/components/ui/InputText";
import { SESSION_STATUS_LABELS } from "@/lib/user/enums/sessionStatus";
import { UserResponseDto } from "@/lib/user/schemas";
import { formatDate, formatDateTime } from "@/utils/format-datetime";
import {
  ActivityIcon,
  CalendarClockIcon,
  CalendarPlusIcon,
  TagIcon,
  TimerIcon,
} from "lucide-react";

type UserProfileDataAdminProps = {
  user: UserResponseDto;
};

export async function UserProfileDataAdmin({
  user,
}: UserProfileDataAdminProps) {
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
