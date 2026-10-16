import { ErrorMessage } from "@/components/feedBack/ErrorMessage";
import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

type Column<T> = {
  header: string;
  headerIcon?: LucideIcon;
  cell: (item: T) => ReactNode;
  className?: string;
};

type NoDataMessage = {
  pageTitle: string;
  emptyMessageTitle: string;
  emptyMessage: string;
};

type AdminListProps<T> = {
  items: T[];
  columns: Column<T>[];
  getRowHref: (item: T) => string;
  getRowKey: (item: T) => string | number;
  noDataMessage: NoDataMessage;
};

export function AdminList<T>({
  items,
  columns,
  getRowHref,
  getRowKey,
  noDataMessage,
}: AdminListProps<T>) {
  if (items.length === 0) {
    return (
      <ErrorMessage
        pageTitle={noDataMessage.pageTitle}
        contentTitle={noDataMessage.emptyMessageTitle}
        content={noDataMessage.emptyMessage}
      />
    );
  }

  return (
    <div className="w-full overflow-x-auto admin-scrollbar">
      <table className="text-left w-full">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.header}
                className="py-2 px-3 bg-slate-700 whitespace-nowrap font-normal"
              >
                <div className="flex gap-2 items-center">
                  {col.headerIcon && <col.headerIcon size={20} strokeWidth={1.7} className="opacity-80"/>}
                  {col.header}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={getRowKey(item)}
              className="whitespace-nowrap cursor-pointer border-b-2 border-b-slate-500 last:border-b-0 transition hover:bg-slate-800"
            >
              {columns.map((col) => (
                <td
                  key={col.header}
                  className={clsx("pr-5 md:pr-10", col.className)}
                >
                  <Link
                    href={getRowHref(item)}
                    className="block px-4 py-3 hover:bg-muted/50 truncate"
                  >
                    {col.cell(item)}
                  </Link>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
