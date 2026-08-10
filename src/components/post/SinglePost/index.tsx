import { findPublicPostBySlugCached } from "@/lib/post/queries/public";
import Image from "next/image";
import { PostHeading } from "../PostHeading";
import { PostDate } from "../PostDate";
import { SafeMarkdown } from "@/components/SafeMarkDown";
import { ErrorMessage } from "@/components/feedBack/ErrorMessage";

type SinglePostProps = {
  slug: string;
};

export async function SinglePost({ slug }: SinglePostProps) {
  const postRes = await findPublicPostBySlugCached(slug);

  if (!postRes.success) {
    console.log(postRes.errors);
    return (
      <ErrorMessage
        contentTitle="Ops 😅"
        content="Não foi possível carregar esse post. Tente novamente em alguns instantes"
      />
    );
  }

  const post = postRes.data;

  return (
    <article>
      <div className="flex flex-col gap-4 mb-4">
        <Image
          className="rounded-xl"
          src={post.coverImageUrl}
          width={1200}
          height={720}
          alt={post.title}
        />
        <PostHeading>{post.title}</PostHeading>

        <p>
          {post.author.name} | {<PostDate createdAt={post.createdAt} />}
        </p>

        <p className="mb-8 text-xl italic">{post.excerpt}</p>

        <SafeMarkdown markdown={post.content} />
      </div>
    </article>
  );
}
