import { getAuthenticatedUserOrRedirect } from "@/lib/auth/session";
import { Roles } from "@/lib/user/roles";

export async function AuthCheckAdmin() {
  const user = await getAuthenticatedUserOrRedirect();
  if (user.role !== Roles.ADMIN) {
    throw new Error("Usuário não tem permissão para acessar essa rota");
  }
  return null;
}
