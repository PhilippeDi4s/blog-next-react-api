import { UserMenu } from "@/components/user/UserMenu";

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
