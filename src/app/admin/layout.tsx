import { AdminMenu } from "@/components/admin/AdminMenu";
import { AuthCheckAdmin } from "@/components/auth/AuthCheckAdmin";
import { Header } from "@/components/layout/Header";
import { Suspense } from "react";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <>
      <Suspense fallback={null}>
        <AuthCheckAdmin>
          <Header section="Admin"/>
          <AdminMenu />
          {children}
        </AuthCheckAdmin>
      </Suspense>
    </>
  );
}
