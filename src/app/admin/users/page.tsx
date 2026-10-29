import { AdminPagination } from "@/components/admin/AdminPagination";
import { AdminUserList } from "@/components/admin/adminUser/AdminUserList";
import { UserFiltersForm } from "@/components/admin/adminUser/UserFiltersForm";
import { ErrorMessage } from "@/components/feedBack/ErrorMessage";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { ToastOnMount } from "@/components/feedBack/ToastOnMount";
import { getUsers } from "@/lib/user/queries/admin-user";
import { UserSearchParamsSchema } from "@/lib/user/schemas";
import { getZodErrorMessages } from "@/utils/get-zod-error-message";
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
  if (!parsed.success) {
    const erros = getZodErrorMessages(parsed.error);

    return (
      <section className="w-full flex flex-col gap-6">
        <ToastOnMount errors={erros.map((e) => e.message)} />
        <UserFiltersForm filters={{}} />
        <ErrorMessage
          pageTitle="Usuários"
          contentTitle="Parâmetros inválidos"
          content="Não foi possível interpretar os filtros da URL. Limpe os filtros e tente novamente."
        />
      </section>
    );
  }
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
    <section className="w-full flex flex-col gap-6">
      <UserFiltersForm filters={parsed.data} />
      <AdminUserList users={data} />
      <AdminPagination
        currentPage={page}
        totalPages={totalPages}
        basePath="/admin/users"
        searchParams={raw}
      />
    </section>
  );
}
