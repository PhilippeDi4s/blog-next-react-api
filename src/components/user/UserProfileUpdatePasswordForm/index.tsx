import { CollapsibleCard } from "@/components/layout/CollapsibleCard";
import { UpdatePasswordForm } from "../UpdatePasswordForm";

export function UserProfileUpdatePasswordForm({}) {
  return (
    <CollapsibleCard toggleBtnContent={<>Alterar senha</>} >
      <UpdatePasswordForm />
    </CollapsibleCard>
  );
}
