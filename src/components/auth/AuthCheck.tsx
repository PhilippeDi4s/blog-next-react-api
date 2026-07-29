import { requireLoginSessionOrRedirect } from "@/lib/login/manage-login";

export async function AuthCheck() {
  await requireLoginSessionOrRedirect();
  return null;
}
