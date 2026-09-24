"use client";

import { inputError } from "@/lib/input-styles";
import dynamic from "next/dynamic";
import { useId } from "react";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

type MarkdownEditorProps = {
  labelText?: string;
  value: string;
  setValue: (value: string) => void;
  textAreaName: string;
  disabled?: boolean;
  error?: string;
};

export function MarkdownEditor({
  labelText = "",
  value,
  setValue,
  textAreaName,
  disabled = false,
  error,
}: MarkdownEditorProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      {labelText && (
        <label className="text-sm" htmlFor={id}>
          {labelText}
        </label>
      )}

      <MDEditor
        className="whitespace-pre-wrap w-full"
        value={value}
        onChange={(value) => {
          if (value === undefined) return;
          setValue(value);
        }}
        height={400}
        preview="edit"
        hideToolbar={disabled}
        textareaProps={{
          id,
          name: textAreaName,
          disabled: disabled,
        }}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
          remarkPlugins: [[remarkGfm]],
        }}
      />
      <span className={inputError}>{error}</span>
    </div>
  );
}
