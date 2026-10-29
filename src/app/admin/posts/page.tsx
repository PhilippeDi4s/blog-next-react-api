import { AdminPagination } from "@/components/admin/AdminPagination";
import { PostFiltersForm } from "@/components/admin/PostFiltersForm";
import { AdminPostList } from "@/components/admin/AdminPostList";
import { ErrorMessage } from "@/components/feedBack/ErrorMessage";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { ToastOnMount } from "@/components/feedBack/ToastOnMount";
import { getPosts } from "@/lib/post/queries/admin-post";
import { PostSearchParamsSchema } from "@/lib/post/schemas";
import { getZodErrorMessages } from "@/utils/get-zod-error-message";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Admin Posts" };

type PostListPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default function PostListPage({ searchParams }: PostListPageProps) {
  return (
    <Suspense fallback={<SpinLoader />}>
      <PostListPageContent searchParams={searchParams} />
    </Suspense>
  );
}

async function PostListPageContent({ searchParams }: PostListPageProps) {
  const raw = await searchParams;
  const parsed = PostSearchParamsSchema.safeParse(raw);
  if (!parsed.success) {
    const erros = getZodErrorMessages(parsed.error);

    return (
      <section className="w-full flex flex-col gap-6">
        <ToastOnMount errors={erros.map((e) => e.message)} />
        <PostFiltersForm filters={{}} />
        <ErrorMessage
          pageTitle="Posts"
          contentTitle="Parâmetros inválidos"
          content="Não foi possível interpretar os filtros da URL. Limpe os filtros e tente novamente."
        />
      </section>
    );
  }

  const filters = parsed.data;
  const res = await getPosts(filters);

  if (!res.success) {
    return (
      <ErrorMessage
        pageTitle="Posts"
        contentTitle="Não foi possível carregar os posts"
        contentTitleClassName="text-4xl/tight md:text-5xl"
        content={res.errors.map((error) => error.message).join(" ")}
      />
    );
  }

  const { data, total, limit, page } = res.data;
  const totalPages = Math.ceil(total / limit);

  return (
    <section className="flex w-full flex-col gap-6">
      <PostFiltersForm filters={filters} />
      <AdminPostList posts={data} />
      <AdminPagination
        currentPage={page}
        totalPages={totalPages}
        basePath="/admin/posts"
        searchParams={raw}
      />
    </section>
  );
}
