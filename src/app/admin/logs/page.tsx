import { AdminPagination } from "@/components/admin/AdminPagination";
import { LogFiltersForm } from "@/components/admin/LogFiltersForm";
import { AdminLogList } from "@/components/admin/AdminLogList";
import { ErrorMessage } from "@/components/feedBack/ErrorMessage";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { ToastOnMount } from "@/components/feedBack/ToastOnMount";
import { getLogs } from "@/lib/logs/queries/admin";
import { LogSearchParamsSchema } from "@/lib/logs/schema";
import { getZodErrorMessages } from "@/utils/get-zod-error-message";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Admin Logs" };

type LogListPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default function LogListPage({ searchParams }: LogListPageProps) {
  return (
    <Suspense fallback={<SpinLoader />}>
      <LogListPageContent searchParams={searchParams} />
    </Suspense>
  );
}

async function LogListPageContent({ searchParams }: LogListPageProps) {
  const raw = await searchParams;
  const parsed = LogSearchParamsSchema.safeParse(raw);

  if (!parsed.success) {
    const erros = getZodErrorMessages(parsed.error);

    return (
      <section className="w-full flex flex-col gap-6">
        <ToastOnMount errors={erros.map((e) => e.message)} />
        <LogFiltersForm filters={{}} />
        <ErrorMessage
          pageTitle="Posts"
          contentTitle="Parâmetros inválidos"
          content="Não foi possível interpretar os filtros da URL. Limpe os filtros e tente novamente."
        />
      </section>
    );
  }

  const filters = parsed.success ? parsed.data : {};
  const res = await getLogs(filters);

  if (!res.success) {
    return (
      <ErrorMessage
        pageTitle="Logs"
        contentTitle="Não foi possível carregar os registros"
        contentTitleClassName="text-4xl/tight md:text-5xl"
        content={res.errors.map((error) => error.message).join(" ")}
      />
    );
  }

  const { data, total, limit, page } = res.data;
  const totalPages = Math.ceil(total / limit);

  return (
    <section className="flex w-full flex-col gap-6">
      <LogFiltersForm filters={filters} />
      <AdminLogList logs={data} />
      <AdminPagination
        currentPage={page}
        totalPages={totalPages}
        basePath="/admin/logs"
        searchParams={raw}
      />
    </section>
  );
}
