import { ErrorMessage } from "@/components/feedBack/ErrorMessage";
import Link from "next/link";
import { ReactNode } from "react";

type Column<T> = {
  header: string;
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
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.header} className={col.className}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={getRowKey(item)} className="relative">
            {columns.map((col) => (
              <td key={col.header} className={col.className}>
                <Link
                  href={getRowHref(item)}
                  className="block px-4 py-2 hover:bg-muted/50"
                >
                  {col.cell(item)}
                </Link>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
