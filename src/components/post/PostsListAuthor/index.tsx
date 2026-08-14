import clsx from "clsx";
import Link from "next/link";
import { DeletePostButton } from "../../user/DeletePostButton";
import { getAuthorPosts } from "@/lib/post/queries/author";
import { ErrorMessage } from "@/components/feedBack/ErrorMessage";

export async function PostsListAuthor() {
  const postsRes = await getAuthorPosts();

  if (!postsRes.success) {
    console.log(postsRes.errors);
    return (
      <ErrorMessage
        contentTitle="Ei 😅"
        content="Tente fazer login novamente"
      />
    );
  }

  const posts = postsRes.data;
  if (posts.length <= 0) {
    return (
      <ErrorMessage contentTitle="Ei 😅" content="Bora criar algum post??" />
    );
  }

  return (
    <div className="mb-16">
      {posts.map((post) => {
        return (
          <div
            className={clsx(
              "py-2 px-2",
              !post.published && "bg-slate-300 dark:bg-slate-600",
              "flex gap-2 items-center justify-between",
            )}
            key={post.id}
          >
            <Link href={`/author/post/${post.id}`}>{post.title}</Link>
            {!post.published && (
              <span className="text-xs text-slate-600 dark:text-slate-300 italic">
                (Não publicado)
              </span>
            )}
            <DeletePostButton id={post.id} title={post.title} />
          </div>
        );
      })}
    </div>
  );
}
