import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type AdminPaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string; 
};

export function AdminPagination({
  currentPage,
  totalPages,
  basePath,
}: AdminPaginationProps) {
  if (totalPages <= 1) return null;

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const getHref = (page: number) => `${basePath}?page=${page}`;

  const linkClass =
    "flex items-center gap-1 px-3 py-2 rounded transition hover:bg-slate-800";
  const disabledClass = "opacity-40 pointer-events-none";

  return (
    <nav
      aria-label="Paginação"
      className="flex items-center justify-between gap-4 mt-4"
    >
      <Link
        href={getHref(currentPage - 1)}
        aria-disabled={!hasPrev}
        tabIndex={hasPrev ? undefined : -1}
        className={clsx(linkClass, !hasPrev && disabledClass)}
      >
        <ChevronLeft size={18} /> Anterior
      </Link>

      <span className="text-sm opacity-80">
        Página {currentPage} de {totalPages}
      </span>

      <Link
        href={getHref(currentPage + 1)}
        aria-disabled={!hasNext}
        tabIndex={hasNext ? undefined : -1}
        className={clsx(linkClass, !hasNext && disabledClass)}
      >
        Próxima <ChevronRight size={18} />
      </Link>
    </nav>
  );
}
