import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { ImageWithFallback } from "@/components/ui/ImageFallback";

type SafeMarkdownProps = {
  markdown: string;
};

export function SafeMarkdown({ markdown }: SafeMarkdownProps) {
  return (
    <div
      className={clsx(
        "prose prose-slate dark:prose-invert",
        "w-full max-w-none",
        "overflow-hidden",
        "prose-a:transition",
        "prose-a:no-underline",
        "prose-a:hover:underline",
        "prose-a:text-blue-500",
        "prose-a:hover:text-blue-700",
        "prose-a:transition",
        "prose-img:mx-auto",
        "md:prose-lg",
      )}
    >
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ src, alt }) => (
            <ImageWithFallback
              src={typeof src === "string" ? src : undefined}
              alt={alt ?? ""}
              containerClassName="relative mx-auto w-full"
              imageClassName="object-contain"
              intrinsic
            />
          ),
            table: ({node, ...props}) => {
                if(!node?.children) return ''
                return(
                    <div className="overflow-x-auto">
                        <table className="max-w-full min-w-150" {...props}/>
                    </div>
                )
            }
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
