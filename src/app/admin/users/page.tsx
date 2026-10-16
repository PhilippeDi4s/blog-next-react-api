import { AdminPagination } from "@/components/admin/AdminPagination";
import { UserList } from "@/components/admin/UserList";
import { ErrorMessage } from "@/components/feedBack/ErrorMessage";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { getUsers } from "@/lib/user/queries/admin";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin Usuários",
};

type UserListPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default function UserListPage({ searchParams }: UserListPageProps) {
  return (
    <Suspense fallback={<SpinLoader />}>
      <UserListPageContent searchParams={searchParams} />
    </Suspense>
  );
}

async function UserListPageContent({ searchParams }: UserListPageProps) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const res = await getUsers({ page: currentPage });

  if (!res.success) {
    return (
      <ErrorMessage
        pageTitle="Usuários"
        contentTitle="Não foi possível carregar os usuários"
        contentTitleClassName="text-4xl/tight md:text-5xl"
        content={res.errors.map((e) => e.message).join(" ")}
      />
    );
  }

  const { data, total, limit, page: apiPage } = res.data;
  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <UserList users={data} />
      <AdminPagination
        currentPage={apiPage}
        totalPages={totalPages}
        basePath="/admin/users"
      />
    </>
  );
}