import { Suspense } from "react";
import { ManagePostForm } from "@/components/post/ManagePostForm";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { getAuthenticatedUserOrRedirect } from "@/lib/auth/session";
import { Notice, redirectWithNotice } from "@/lib/notifications";

export default function NewPostPage() {
  return (
    <div className="flex flex-col gap-6">
      <Suspense fallback={<SpinLoader />}>
        <NewPostForm />
      </Suspense>
    </div>
  );
}

async function NewPostForm() {
  const currentUser = await getAuthenticatedUserOrRedirect();
  if(!currentUser){
    redirectWithNotice("login", Notice.AUTH_LOGIN_REQUIRED)
  }

  return <ManagePostForm mode="create" currentUserName={currentUser.name} />;
}
