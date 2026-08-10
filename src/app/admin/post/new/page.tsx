import { ManagePostForm } from "@/components/user/ManagePostForm";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { Suspense } from "react";
import { getCurrentUser } from "@/lib/user/get-current-user";
import { redirect } from "next/navigation";

export default async function AdminPostsNewPage() {

  const currentUser = await getCurrentUser()

  if(!currentUser) redirect("/login")

  return (
    <div className="flex flex-col gap-6">
      <Suspense fallback={<SpinLoader />}>
        <ManagePostForm mode="create" currentUserName={currentUser.name}/>
      </Suspense>
    </div>
  );
}
