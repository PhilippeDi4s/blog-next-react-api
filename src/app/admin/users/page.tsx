import { AdminPagination } from "@/components/admin/AdminPagination";
import { UserList } from "@/components/admin/UserList";
import { ErrorMessage } from "@/components/feedBack/ErrorMessage";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { getUsers } from "@/lib/user/queries/admin";
import { AdminUserSearchSchema, UserSearchParamsSchema } from "@/lib/user/schemas";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin Usuários",
};

type UserListPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default function UserListPage({ searchParams }: UserListPageProps) {
  return (
    <Suspense fallback={<SpinLoader />}>
      <UserListPageContent searchParams={searchParams} />
    </Suspense>
  );
}

async function UserListPageContent({ searchParams }: UserListPageProps) {
  const raw = await searchParams;
  const parsed = UserSearchParamsSchema.safeParse(raw);
  const filters = parsed.success ? parsed.data : {};

  const res = await getUsers(filters);

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

  const { data, total, limit, page } = res.data;
  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <UserList users={data} />
      <AdminPagination
        currentPage={page}
        totalPages={totalPages}
        basePath="/admin/users"
        searchParams={raw}
      />
    </>
  );
}
