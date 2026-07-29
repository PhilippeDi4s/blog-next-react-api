import { AuthCheck } from "@/components/auth/AuthCheck";
import { UserMenu } from "@/components/user/UserMenu";
import { Suspense } from "react";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
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
