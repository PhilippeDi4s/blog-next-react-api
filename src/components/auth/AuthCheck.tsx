import { getAuthenticatedUserOrRedirect } from "@/lib/auth/session";

type AuthCheckProps = {
  children: React.ReactNode;
};

export async function AuthCheck({ children }: AuthCheckProps) {
  await getAuthenticatedUserOrRedirect();
  return <>{children}</>;
}
