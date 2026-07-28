import { MenuAdmin } from "@/components/admin/MenuAdmin";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <>
      <MenuAdmin />
      {children}
    </>
  );
}
