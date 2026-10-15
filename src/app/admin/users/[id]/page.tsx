import { UserAdminForm } from "@/components/admin/UserAdminForm";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { Heading } from "@/components/ui/Heading";
import { getUserById } from "@/lib/user/queries/admin";
import { AdminUserFormValuesSchema } from "@/lib/user/schemas";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Editar usuário",
};

type UserIdPageProps = {
  params: Promise<{ id: string }>;
};

export default function AdminUserIdPage({ params }: UserIdPageProps) {
  return (
    <>
      <Heading as="h2">Editar Usuário</Heading>
      <Suspense fallback={<SpinLoader />}>
        <UserEditPageContent params={params} />
      </Suspense>
    </>
  );
}

export async function UserEditPageContent({ params }: UserIdPageProps) {
  const { id } = await params;

  const res = await getUserById(id);

  if (!res.success) notFound();

  const parsedData = AdminUserFormValuesSchema.parse(res.data);

  console.log(parsedData);

  return <UserAdminForm initialData={parsedData} userId={id} />;
}
