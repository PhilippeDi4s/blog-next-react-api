import { findPublicPostBySlugCached } from "@/lib/post/queries/public";
import { ImageWithFallback } from "@/components/ui/ImageFallback";
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
        <ImageWithFallback
          src={post.coverImage?.url}
          alt={post.title}
          containerClassName="relative aspect-video max-h-[28rem] w-full overflow-hidden rounded-xl"
          imageClassName="rounded-xl object-cover"
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
