import { AuthCheck } from "@/components/auth/AuthCheck";
import { Header } from "@/components/layout/Header";
import { AuthorMenu } from "@/components/user/AuthorMenu";
import { Suspense } from "react";

type AuthorLayoutProps = {
  children: React.ReactNode;
};

export default async function AuthorLayout({ children }: AuthorLayoutProps) {
  return (
    <>
      <Suspense fallback={null}>
        <AuthCheck>
          <Header section="Autor" />
          <AuthorMenu />
          {children}
        </AuthCheck>
      </Suspense>
    </>
  );
}
