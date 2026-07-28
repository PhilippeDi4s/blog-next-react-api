import { PostImage } from "../PostImage";
import clsx from "clsx";
import { PostSummary } from "../PostSummary";
import { findAllPublicPostsCached } from "@/lib/post/queries/public";
import Link from "next/link";

export async function PostsList() {
  const posts = await findAllPublicPostsCached();

  return (
    <section
      className={clsx(
        "grid",
        "grid-cols-1",
        "gap-8",
        "justify-center",
        "mb-16",
        "sm:grid-cols-2",
        "lg:grid-cols-3",
      )}
    >
      {posts.slice(1).map((post) => {
        const postLink = `post/${post.slug}`;
        return (
          <div key={post.id}>
            <Link href={postLink} className={clsx("flex flex-col gap-4 group")}>
              <PostImage
                imageProps={{
                  src: post.coverImageUrl,
                  alt: `Imagem do Post ${post.title}`,
                }}
                imageHeight={12.5}
              />

              <PostSummary
                createdAt={post.createdAt}
                titleTag="h2"
                postTitle={post.title}
                excerpt={post.excerpt}
              />
            </Link>
          </div>
        );
      })}
    </section>
  );
}
