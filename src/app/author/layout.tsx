import { AuthCheck } from "@/components/auth/AuthCheck";
import { UserMenu } from "@/components/user/UserMenu";
import { Suspense } from "react";

type AuthorLayoutProps = {
  children: React.ReactNode;
};

export default async function AuthorLayout({ children }: AuthorLayoutProps) {
  return (
    <>
      <Suspense fallback={null}>
        <AuthCheck />
      </Suspense>
      <UserMenu />
      {children}
    </>
  );
}
