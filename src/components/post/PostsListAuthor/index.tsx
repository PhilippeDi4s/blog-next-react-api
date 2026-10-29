import clsx from "clsx";
import Link from "next/link";
import { DeletePostButton } from "../../user/DeletePostButton";
import { getAuthorPosts } from "@/lib/post/queries/author";
import { ErrorMessage } from "@/components/feedBack/ErrorMessage";

export async function PostsListAuthor() {
  const postsRes = await getAuthorPosts();

  if (!postsRes.success) {
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
      <ErrorMessage
        contentTitle="Ei 😅"
        content="Bora criar algum post??"
        pageTitle=" "
      />
    );
  }

  return (
    <div className="mb-16 flex flex-col gap-2">
      {posts.map((post) => {
        return (
          <div
            key={post.id}
            className={clsx(
              "py-2",
              "px-4",
              "flex",
              "items-center",
              "justify-between",
              "transition",
              "duration-300",
              "hover:border-white/60",
              "hover:bg-white/10",
              "border",
              "border-white/10",
              "rounded-xl",
              "has-[button:hover]:bg-transparent",
              "has-[button:hover]:border-white/10",
            )}
          >
            <Link
              href={`/author/post/${post.id}`}
              className={clsx(
                "w-full py-2 px-2",
                !post.published && "bg-slate-300 dark:bg-slate-600",
                "flex gap-2 items-center justify-between",
              )}
            >
              {!post.published && (
                <span className="text-xs text-slate-600 dark:text-slate-300 italic">
                  (Não publicado)
                </span>
              )}
              {post.title}
            </Link>
            <DeletePostButton id={post.id} title={post.title} />
          </div>
        );
      })}
    </div>
  );
}
