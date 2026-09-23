import { ManagePostForm } from "@/components/post/ManagePostForm";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getAuthenticatedUserOrRedirect } from "@/lib/auth/session";

export default async function NewPostPagePage() {

  const currentUser = await getAuthenticatedUserOrRedirect()

  return (
    <div className="flex flex-col gap-6">
      <Suspense fallback={<SpinLoader />}>
        <ManagePostForm mode="create" currentUserName={currentUser.name}/>
      </Suspense>
    </div>
  );
}
