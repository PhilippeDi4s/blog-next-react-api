import { PostFeatured } from "@/components/post/PostFeatured";
import { PostsList } from "@/components/post/PostsList";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<SpinLoader className="min-h-20 mb-16" />}>
        <PostFeatured />
        <PostsList />
      </Suspense>
    </>
  );
}
