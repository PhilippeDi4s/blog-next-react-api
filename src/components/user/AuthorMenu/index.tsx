import { getAuthenticatedUserOrRedirect } from "@/lib/auth/session";
import { AuthorMenuClient } from "./AuthorMenuClient";

export async function AuthorMenu() {
  const user = await getAuthenticatedUserOrRedirect();
  if (!user) {
    return;
  }
  return <AuthorMenuClient isAdmin={user.role === "admin"} />;
}
