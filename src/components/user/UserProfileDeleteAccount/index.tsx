import { CollapsibleCard } from "@/components/layout/CollapsibleCard";
import { DeleteUserButton } from "../DeleteUserButton";

export function UserProfileDeleteAccount() {
  return (
    <CollapsibleCard toggleBtnContent={<>Zona de perigo</>}>
      <DeleteUserButton />
    </CollapsibleCard>
  );
}
