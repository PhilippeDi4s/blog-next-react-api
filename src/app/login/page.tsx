import { LoginUserForm } from "@/components/user/LoginUserForm";
import { ErrorMessage } from "@/components/feedBack/ErrorMessage";
import { Metadata } from "next";
import { Suspense, useEffect } from "react";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { useSearchParams } from "next/navigation";
import { showMessage } from "@/adapters";

export const metadata: Metadata = {
  title: "Login",
};

export default async function AdminPostsPage() {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN || 1));
  const searchParams = useSearchParams();

  useEffect(() => {
    const search = searchParams.get("reason");

    if (search === "blocked") {
      showMessage.error("Usuário bloqueado");
    }

    if (search === "force-logout") {
      showMessage.info("Faça login Novamente");
    }
  }, [searchParams]);

  if (!allowLogin) {
    return (
      <ErrorMessage
        contentTitle="403"
        content="Libere o sistema de login usando ALLOW_LOGIN"
      />
    );
  }
  return (
    <Suspense fallback={<SpinLoader />}>
      <LoginUserForm />
    </Suspense>
  );
}
