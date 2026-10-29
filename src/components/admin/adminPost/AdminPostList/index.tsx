"use client";

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
  ImageIcon,
  UserIcon,
} from "lucide-react";
import { AdminList } from "../../AdminList";
import { ImageWithFallback } from "@/components/ui/ImageFallback";
import { ImagePreview } from "@/components/images/ImagePreview";
import { useState } from "react";

type AdminPostListProps = {
  posts: PostResponseDto[];
};

export function AdminPostList({ posts }: AdminPostListProps) {
  const [isOpen, setIsOpen] = useState<string | null>(null);

  function openPreview(e: React.MouseEvent<HTMLButtonElement>, id: string) {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(id);
  }

  function closePreview() {
    setIsOpen(null);
  }
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
          header: "Imagem Capa",
          headerIcon: ImageIcon,
          cell: (post) => {
            const cover = post.coverImage;
            const coverUrl = cover?.url ?? null;

            return (
              <div className="relative w-[6rem] h-[6rem]">
                <button
                  className="cursor-zoom-in h-full w-full disabled:cursor-default"
                  onClick={(e) => cover && openPreview(e, cover.id)}
                  disabled={!coverUrl}
                  data-no-row-hover
                >
                  <ImageWithFallback
                    alt=""
                    src={coverUrl}
                    containerClassName="w-full h-full"
                    imageClassName="rounded-xl object-cover object-top transition hover:scale-105 hover:ring-2 hover:ring-blue-500"
                  />
                </button>

                {cover && coverUrl && (
                  <ImagePreview
                    imageSrc={coverUrl}
                    isOpen={isOpen === cover.id}
                    onClose={closePreview}
                  />
                )}
              </div>
            );
          },
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
          header: "ID Autor",
          headerIcon: IdCardIcon,
          cell: (post) => (
            <CopyTextButton
              buttonText="Copiar id"
              textToCopy={post.author.id}
              variant="ghost"
              size="sm"
            />
          ),
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
