import { CollapsibleCard } from "@/components/layout/CollapsibleCard";
import { UpdateUserForm } from "../UpdateUserForm";
import { UserResponseDto } from "@/lib/user/schemas";

type UserProfileUpdateDataFormProps = {
  profile: UserResponseDto;
};

export function UserProfileUpdateDataForm({
  profile,
}: UserProfileUpdateDataFormProps) {
  return (
    <CollapsibleCard toggleBtnContent={<>Editar dados</>}>
      <UpdateUserForm name={profile.name} email={profile.email} />
    </CollapsibleCard>
  );
}
