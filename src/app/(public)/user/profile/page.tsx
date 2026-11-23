import { CollapsibleSection } from "@/components/layout/CollapsibleSection";
import { UpdatePasswordForm } from "@/components/user/UpdatePasswordForm";
import { UpdateUserForm } from "@/components/user/UpdateUserForm";
import { getMyProfile } from "@/lib/user/queries/profile";
import { formatDate } from "@/utils/format-datetime";
import {
  CalendarClockIcon,
  CalendarPlusIcon,
  FileTextIcon,
  MailIcon,
  ShieldIcon,
  UserIcon,
} from "lucide-react";

export default async function UserProfilePage() {
  const result = await getMyProfile();
  if (!result.success) {
    throw new Error("Não foi possível carregar o perfil");
  }
  const profile = result.data;

  return (
    <main className="mx-auto mb-16 w-full max-w-5xl px-4">
      <h1 className="mb-8 text-3xl font-bold">Meu perfil</h1>
      <CollapsibleSection
        toggleBtnContent={<>Dados do perfil</>}
        className="grid grid-cols-1 gap-5 p-4 md:grid-cols-2"
        toggleBtnClassName="text-2xl font-semibold"
        defaultOpen
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
      </CollapsibleSection>
      <CollapsibleSection
        toggleBtnContent={<>Editar dados</>}
        className="p-4"
        toggleBtnClassName="text-2xl font-semibold"
      >
        <UpdateUserForm name={profile.name} email={profile.email} />
      </CollapsibleSection>
      <CollapsibleSection
        toggleBtnContent={<>Alterar senha</>}
        className="p-4"
        toggleBtnClassName="text-2xl font-semibold"
      >
        <UpdatePasswordForm />
      </CollapsibleSection>
    </main>
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
