import { getAuthenticatedUserOrRedirect } from "@/lib/auth/session";
import { Roles } from "@/lib/user/roles";
import { notFound } from "next/navigation";

type AuthCheckAdminProps = {
  children: React.ReactNode;
};

export async function AuthCheckAdmin({ children }: AuthCheckAdminProps) {
  const currentUser = await getAuthenticatedUserOrRedirect();
  if (currentUser.role !== Roles.ADMIN) {
    notFound();
  }
  return <>{children}</>;
}
