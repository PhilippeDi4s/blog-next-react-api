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
        "gap-2",
      )}
      dateTime={createdAt}
    >
      {formatDateTime(createdAt)} | <RelativeDateTime date={createdAt} />
    </time>
  );
}
