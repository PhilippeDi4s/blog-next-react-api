import { UserMenu } from "@/components/user/MenuAdmin";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <>
      <UserMenu />
      {children}
    </>
  );
}
