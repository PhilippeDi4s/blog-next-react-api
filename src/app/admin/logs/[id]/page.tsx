import { LogDataAdmin } from "@/components/admin/adminLog/LogDataAdmin";
import { ErrorMessage } from "@/components/feedBack/ErrorMessage";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { BackButton } from "@/components/ui/BackButton";
import { getLogById } from "@/lib/logs/queries/admin-log";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Detalhes Log",
};

type AdminLogIdPageProps = {
  params: Promise<{ id: string }>;
};

export default function AdminLogIdPage({ params }: AdminLogIdPageProps) {
  return (
    <section className="flex flex-col gap-4">
      <BackButton pathLabel="Admin / Lista de Logs" />
      <Suspense fallback={<SpinLoader />}>
        <AdminLogIdPageContent params={params} />
      </Suspense>
    </section>
  );
}

export async function AdminLogIdPageContent({ params }: AdminLogIdPageProps) {
  const { id } = await params;
  const res = await getLogById(id);

  if (!res.success) {
    return (
      <ErrorMessage
        contentTitle="Não foi possível carregar o log"
        content={
           "Tente novamente em alguns instantes."
        }
      />
    );
  }

  console.log(res.data.data[0])
  return <LogDataAdmin log={res.data.data[0]} />;
}
