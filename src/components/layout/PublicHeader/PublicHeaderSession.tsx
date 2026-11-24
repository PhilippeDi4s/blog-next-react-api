import { getLoginSession } from "@/lib/auth/session";
import { PublicUserMenu } from "./PublicUserMenu";
import { ErrorMessage } from "@/components/feedBack/ErrorMessage";

export async function PublicHeaderSession() {
  const res = await getLoginSession();
  if (!res.jwt) return <PublicUserMenu />;

  if (!res.success && res.jwt) {
    return (
      <ErrorMessage
        content={
          "Não foi possível verificar sua sessão. Tente entrar novamente."
        }
        contentTitle="Erro na sessão"
        pageTitle="Erro ao verificar sessão"
      />
    );
  }
  
  return <PublicUserMenu user={res.data} />;
}
