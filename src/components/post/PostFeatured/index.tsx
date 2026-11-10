import clsx from "clsx";
import { PostImage } from "../PostImage";
import { PostSummary } from "../PostSummary";
import { findAllPublicPostsCached } from "@/lib/post/queries/public";
import Link from "next/link";

export async function PostFeatured() {
  const postsRes = await findAllPublicPostsCached();

  if (!postsRes.success) {
    return;
  }

  const posts = postsRes.data;

  const post = posts[0];

  return (
    <section>
      <Link
        href={`post/${post.slug}`}
        className={clsx("grid grid-cols-1 gap-8 mb-16 group", "sm:grid-cols-2")}
      >
        <PostImage
          src={post.coverImage?.url}
          alt={post.title}
          containerClassName="h-80"
        />

        <PostSummary
          createdAt={post.createdAt}
          titleTag="h1"
          postTitle={post.title}
          excerpt={post.excerpt}
        />
      </Link>
    </section>
  );
}
