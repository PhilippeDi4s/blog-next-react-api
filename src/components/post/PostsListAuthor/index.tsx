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
        content={postsRes.errors[0]?.message ?? "Não foi possível carregar seus posts. Tente novamente em alguns instantes."}
      />
    );
  }

  const posts = postsRes.data;
  if (posts.length <= 0) {
    return (
      <ErrorMessage
        contentTitle="Ei 😅"
        content="Nenhum post encontrado. Bora criar algum post?"
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
              "gap-5",
              "transition",
              "duration-300",
              "hover:border-white/60",
              "hover:bg-white/10",
              "border",
              "border-white/10",
              "rounded-xl",
              "has-[button:hover]:bg-transparent",
              "has-[button:hover]:border-white/10",
              !post.published && "bg-slate-700 hover:bg-slate-800!",
            )}
          >
            <Link
              href={`/author/post/${post.id}`}
              className={clsx(
                "min-w-0 flex-1 py-2 px-2",
                "flex gap-2 items-center",
              )}
            >
              {!post.published && (
                <span className="shrink-0 text-xs text-slate-600 dark:text-slate-300 italic">
                  (Não publicado)
                </span>
              )}
              <span className="truncate max-w-full">{post.title}</span>
            </Link>
            <DeletePostButton id={post.id} title={post.title} />
          </div>
        );
      })}
    </div>
  );
}
