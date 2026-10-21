import { CopyTextButton } from "@/components/ui/CopyTextButton";
import { PostResponseDto } from "@/lib/post/schemas";
import { formatDate } from "@/utils/format-datetime";
import {
  ArchiveIcon,
  Calendar1Icon,
  CalendarIcon,
  CheckIcon,
  FileTextIcon,
  IdCardIcon,
  UserIcon,
} from "lucide-react";
import { AdminList } from "../AdminList";

type PostListProps = {
  posts: PostResponseDto[];
};

export function PostList({ posts }: PostListProps) {
  return (
    <AdminList
      items={posts}
      getRowKey={(post) => post.id}
      getRowHref={(post) => `/admin/posts/${post.id}`}
      noDataMessage={{
        pageTitle: "Posts",
        emptyMessageTitle: "Nenhum post encontrado",
        emptyMessage: "Ainda não há posts cadastrados.",
      }}
      columns={[
        {
          header: "ID",
          headerIcon: IdCardIcon,
          cell: (post) => (
            <CopyTextButton
              buttonText="Copiar id"
              textToCopy={post.id}
              variant="ghost"
              size="sm"
            />
          ),
        },
        {
          header: "Post",
          headerIcon: FileTextIcon,
          cell: (post) => (
            <div className="flex flex-col">
              <span className="truncate">{post.title}</span>
              <span className="truncate text-sm opacity-70">{post.slug}</span>
            </div>
          ),
          className: "max-w-60",
        },
        {
          header: "Autor",
          headerIcon: UserIcon,
          cell: (post) => (
            <div className="flex flex-col">
              <span className="truncate">{post.author.name}</span>
              <span className="truncate text-sm opacity-70">
                {post.author.email}
              </span>
            </div>
          ),
          className: "max-w-60",
        },
        {
          header: "Status",
          headerIcon: CheckIcon,
          cell: (post) => {
            const status = post.deletedAt
              ? {
                  label: "Excluído",
                  Icon: ArchiveIcon,
                  className: "text-amber-700",
                }
              : post.published
                ? {
                    label: "Publicado",
                    Icon: CheckIcon,
                    className: "text-green-700",
                  }
                : {
                    label: "Rascunho",
                    Icon: FileTextIcon,
                    className: "text-orange-700",
                  };

            return (
              <div className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1">
                <status.Icon
                  size={15}
                  aria-hidden="true"
                  className={status.className}
                />
                <span>{status.label}</span>
              </div>
            );
          },
        },
        {
          header: "Criado em",
          headerIcon: Calendar1Icon,
          cell: (post) => formatDate(post.createdAt),
        },
        {
          header: "Atualizado em",
          headerIcon: CalendarIcon,
          cell: (post) => formatDate(post.updatedAt),
        },
      ]}
    />
  );
}
