import { ManagePosts } from "@/components/post/ManagePosts";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Post Admin",
};

export default async function AdminPostsPage() {
  return (
    <Suspense fallback={<SpinLoader />}>
      <ManagePosts />
    </Suspense>
  );
}
