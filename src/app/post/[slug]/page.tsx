import { SinglePost } from "@/components/post/SinglePost";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { findPublicPostBySlugCached } from "@/lib/post/queries/public";
import { Metadata } from "next";
import { Suspense } from "react";

type PostsSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;

  const post = await findPublicPostBySlugCached(slug);

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function PostsSlugPage({ params }: PostsSlugPageProps) {

  return (
    <Suspense fallback={<SpinLoader />}>
      <PostContent params={params} />
    </Suspense>
  );
}

async function PostContent({ params }: PostsSlugPageProps) {
  const { slug } = await params;

  return <SinglePost slug={slug}/>
}
