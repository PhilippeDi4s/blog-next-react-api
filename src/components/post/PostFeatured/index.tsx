import clsx from "clsx";
import { PostImage } from "../PostImage";
import { PostSummary } from "../PostSummary";
import { findAllPublicPostsCached } from "@/lib/post/queries/public";
import Link from "next/link";
import { ErrorMessage } from "../../feedBack/ErrorMessage";

export async function PostFeatured() {
  const posts = await findAllPublicPostsCached();
  const post = posts[0];

  if (!post || posts.length <= 0) {
    return (
      <ErrorMessage
        contentTitle="Ops 😅"
        content={<p>Nenhum Post foi criado ainda</p>}
      />
    );
  }
  return (
    <section>
      <Link
        href={`post/${post.slug}`}
        className={clsx("grid grid-cols-1 gap-8 mb-16 group", "sm:grid-cols-2")}
      >
        <PostImage
          imageProps={{
            width: 1200,
            height: 720,
            src: post.coverImageUrl,
            alt: post.title,
            priority: true,
          }}
          imageHeight={17}
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
