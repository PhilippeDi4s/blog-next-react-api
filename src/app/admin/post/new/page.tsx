import { ManagePostForm } from "@/components/admin/ManagePostForm";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { Suspense } from "react";

export default async function AdminPostsNewPage() {
  return (
    <div className="flex flex-col gap-6">
      <Suspense fallback={<SpinLoader />}>
        <ManagePostForm mode="create" />
      </Suspense>
    </div>
  );
}
