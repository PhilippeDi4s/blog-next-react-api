import { getAuthenticatedUserOrRedirect } from "@/lib/auth/session";

export async function AuthCheck() {
  await getAuthenticatedUserOrRedirect();
  return null;
}
