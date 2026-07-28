import { LoginForm } from "@/components/admin/LoginForm";
import { ErrorMessage } from "@/components/feedBack/ErrorMessage";
import { Metadata } from "next";

export const metadata: Metadata ={
  title: 'Login'
}

export default async function AdminPostsPage() {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN || 1));

  if (!allowLogin) {
    return (
      <ErrorMessage
        contentTitle="403"
        content="Libere o sistema de login usando ALLOW_LOGIN"
      />
    );
  }
  return <LoginForm />;
}
