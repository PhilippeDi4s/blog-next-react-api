"use client";

import clsx from "clsx";

type ErrorMessageProps = {
  pageTitle?: string;
  contentTitle: string;
  contentTitleClassName?: string;
  content: React.ReactNode;
};

export function ErrorMessage({
  pageTitle = " ",
  contentTitle,
  contentTitleClassName,
  content,
}: ErrorMessageProps) {
  return (
    <>
      <title>{pageTitle ? pageTitle : "Error"}</title>
      <section
        className={clsx(
          "min-h-87.5",
          "bg-slate-900",
          "text-slate-100",
          "mb-16",
          "p-8",
          "rounded-xl",
          "dark:bg-slate-600",
          "flex items-center justify-center",
          "text-center",
        )}
      >
        <div>
          <h3
            className={clsx(
              "mb-4 font-bold text-2xl/tight",
              contentTitleClassName,
            )}
          >
            {contentTitle}
          </h3>
          <div className="mt-16">{content}</div>
        </div>
      </section>
    </>
  );
}
