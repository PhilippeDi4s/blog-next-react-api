import { getAuthenticatedUserOrRedirect } from "@/lib/auth/session";
import { AuthorMenuClient } from "./AuthorMenuClient";

export async function AuthorMenu() {
  const user = await getAuthenticatedUserOrRedirect();
  return <AuthorMenuClient isAdmin={user.role === "admin"} />;
}
