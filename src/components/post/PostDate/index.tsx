import { formatDateTime } from "@/utils/format-datetime";
import clsx from "clsx";
import { RelativeDateTime } from "../RelativeDateTime";

type PostDateProps = {
  createdAt: string;
};

export function PostDate({ createdAt }: PostDateProps) {
  return (
    <time
      className={clsx(
        "text-slate-600",
        "text-sm",
        "dark:text-slate-400",
        "flex",
        "flex-wrap",
        "gap-x-2",
      )}
      dateTime={createdAt}
    >
      <span className="whitespace-nowrap">{formatDateTime(createdAt)}</span>
      <span aria-hidden="true">|</span>
      <span className="whitespace-nowrap">
        <RelativeDateTime date={createdAt} />
      </span>
    </time>
  );
}
