import { AdminPagination } from "@/components/admin/AdminPagination";
import { ImageFiltersForm } from "@/components/admin/ImageFiltersForm";
import { AdminImageList } from "@/components/admin/AdminImageList";
import { ErrorMessage } from "@/components/feedBack/ErrorMessage";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { ToastOnMount } from "@/components/feedBack/ToastOnMount";
import { getImages } from "@/lib/image/queries/admin-image";
import { ImageSearchParamsSchema } from "@/lib/image/schema";
import { getZodErrorMessages } from "@/utils/get-zod-error-message";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Admin Imagens" };

type ImageListPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default function ImageListPage({ searchParams }: ImageListPageProps) {
  return (
    <Suspense fallback={<SpinLoader />}>
      <ImageListPageContent searchParams={searchParams} />
    </Suspense>
  );
}

async function ImageListPageContent({ searchParams }: ImageListPageProps) {
  const raw = await searchParams;
  const parsed = ImageSearchParamsSchema.safeParse(raw);

  if (!parsed.success) {
    const erros = getZodErrorMessages(parsed.error);

    return (
      <section className="w-full flex flex-col gap-6">
        <ToastOnMount errors={erros.map((e) => e.message)} />
        <ImageFiltersForm filters={{}} />
        <ErrorMessage
          pageTitle="Posts"
          contentTitle="Parâmetros inválidos"
          content="Não foi possível interpretar os filtros da URL. Limpe os filtros e tente novamente."
        />
      </section>
    );
  }

  const filters = parsed.success ? parsed.data : {};
  const res = await getImages(filters);

  if (!res.success) {
    return (
      <ErrorMessage
        pageTitle="Imagens"
        contentTitle="Não foi possível carregar as imagens"
        contentTitleClassName="text-4xl/tight md:text-5xl"
        content={res.errors.map((error) => error.message).join(" ")}
      />
    );
  }

  const { data, total, limit, page } = res.data;
  const totalPages = Math.ceil(total / limit);

  return (
    <section className="flex w-full flex-col gap-6">
      <ImageFiltersForm filters={filters} />
      <AdminImageList images={data} />
      <AdminPagination
        currentPage={page}
        totalPages={totalPages}
        basePath="/admin/images"
        searchParams={raw}
      />
    </section>
  );
}
