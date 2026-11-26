import { CollapsibleCard } from "@/components/layout/CollapsibleCard";
import { UserProfileResponseDto } from "@/lib/user/schemas";
import { formatDate } from "@/utils/format-datetime";
import {
  UserIcon,
  MailIcon,
  ShieldIcon,
  CalendarPlusIcon,
  CalendarClockIcon,
  FileTextIcon,
} from "lucide-react";

type UserProfileDataProps = {
  profile: UserProfileResponseDto;
};

export function UserProfileData({ profile }: UserProfileDataProps) {
  return (
    <CollapsibleCard
      toggleBtnContent={<>Dados do perfil</>}
      className="grid grid-cols-1 gap-5 p-4 md:grid-cols-2"
    >
      <ProfileValue label="Nome" icon={UserIcon} value={profile.name} />
      <ProfileValue label="E-mail" icon={MailIcon} value={profile.email} />
      <ProfileValue label="Cargo" icon={ShieldIcon} value={profile.role} />
      <ProfileValue
        label="Conta criada"
        icon={CalendarPlusIcon}
        value={formatDate(profile.createdAt)}
      />
      <ProfileValue
        label="Última atualização"
        icon={CalendarClockIcon}
        value={formatDate(profile.updatedAt)}
      />
      <ProfileValue
        label="Posts publicados"
        icon={FileTextIcon}
        value={String(profile.publishedPostsCount)}
      />
    </CollapsibleCard>
  );
}

function ProfileValue({
  label,
  icon: Icon,
  value,
}: {
  label: string;
  icon: typeof UserIcon;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span>{label}</span>
      <span className="flex items-center gap-2">
        <Icon size={18} aria-hidden="true" />
        {value}
      </span>
    </div>
  );
}
