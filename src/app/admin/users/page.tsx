import { UserList } from "@/components/admin/UserList";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Usuários",
};

export default function UserListPage() {
  return (
    <Suspense fallback={<SpinLoader />}>
      <UserList />
    </Suspense>
  );
}
