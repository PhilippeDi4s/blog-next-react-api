import { getAuthenticatedUserOrRedirect } from "@/lib/auth/session";
import { Notice, redirectWithNotice } from "@/lib/notifications";

type AuthCheckProps = {
  children: React.ReactNode;
};

export async function AuthCheck({ children }: AuthCheckProps) {
  const currentUser = await getAuthenticatedUserOrRedirect();
  if(!currentUser){
    redirectWithNotice("login", Notice.AUTH_LOGIN_REQUIRED)
  }
  return <>{children}</>;
}
