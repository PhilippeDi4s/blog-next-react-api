import { Suspense } from "react";
import { ManagePostForm } from "@/components/post/ManagePostForm";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { getAuthenticatedUserOrRedirect } from "@/lib/auth/session";
import { Notice, redirectWithNotice } from "@/lib/notifications";
import { Heading } from "@/components/ui/Heading";

export default function NewPostPage() {
  return (
    <section className="flex flex-col gap-6">
      <Heading as="h1">Criar post</Heading>
      <Suspense fallback={<SpinLoader />}>
        <NewPostForm />
      </Suspense>
    </section>
  );
}

async function NewPostForm() {
  const currentUser = await getAuthenticatedUserOrRedirect();
  if(!currentUser){
    redirectWithNotice("login", Notice.AUTH_LOGIN_REQUIRED)
  }

  return <ManagePostForm mode="create" currentUserName={currentUser.name} />;
}
