import { PostsListAuthor } from "@/components/post/PostsListAuthor";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Author Posts",
};

export default async function AuthorPostsPage() {
  return (
    <Suspense fallback={<SpinLoader />}>
      <PostsListAuthor />
    </Suspense>
  );
}
