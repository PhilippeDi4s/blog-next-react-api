import { getAuthenticatedUserOrRedirect } from "@/lib/auth/session";
import { Roles } from "@/lib/user/roles";

export async function AuthCheckAdmin() {
  const currentUser = await getAuthenticatedUserOrRedirect();
  if (currentUser.role !== Roles.ADMIN) {
    throw new Error("Usuário não tem permissão para acessar essa rota");
  }
  return null;
}
