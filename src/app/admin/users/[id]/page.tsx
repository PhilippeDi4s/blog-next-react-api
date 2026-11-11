import { UserAdminForm } from "@/components/admin/adminUser/UserAdminForm";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { BackButton } from "@/components/ui/BackButton";
import { Heading } from "@/components/ui/Heading";
import { getUserById } from "@/lib/user/queries/admin-user";
import { AdminUserFormValuesSchema } from "@/lib/user/schemas";
import { Metadata } from "next";
import { Suspense } from "react";
import { ErrorMessage } from "@/components/feedBack/ErrorMessage";
import { UserProfileDataAdmin } from "@/components/admin/adminUser/UserProfileDataAdmin";

export const metadata: Metadata = {
  title: "Editar usuário",
};

type UserIdPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminUserIdPage({ params }: UserIdPageProps) {
  return (
    <section className="flex flex-col gap-4">
      <BackButton pathLabel="Admin / Lista de Usuários" />
      <Suspense fallback={<SpinLoader />}>
        <UserEditPageContent params={params} />
      </Suspense>
    </section>
  );
}

export async function UserEditPageContent({ params }: UserIdPageProps) {
  const { id } = await params;

  const res = await getUserById(id);

  if (!res.success) {
    return (
      <ErrorMessage
        contentTitle="Não foi possível carregar o usuário"
        content={
          res.errors[0]?.message ?? "Tente novamente em alguns instantes."
        }
      />
    );
  }

  const parsedData = AdminUserFormValuesSchema.parse(res.data);

  return (
    <>
      <UserProfileDataAdmin userId={id} />
      <Heading as="h1">Editar Usuário</Heading>
      <UserAdminForm initialData={parsedData} userId={id} />
    </>
  );
}
