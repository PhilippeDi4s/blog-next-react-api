"use client";

import { BtnSize, BtnVariants, getButtonClasses } from "@/lib/button-style";
import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

type CopyLinkButtonProps = {
  url: string;
  text: string;
  variant: BtnVariants;
  size?: BtnSize;
} & React.ComponentProps<"button">

export function CopyLinkButton({
  url,
  text,
  variant = "default",
  size="md",
  ...props
}: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  }

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={getButtonClasses({
        variant,
        size,
        className: props.className,
      })}
    >
      {copied ? (
        <>
          Copiado! <CopyCheckIcon className="size-[1.2em]" />
        </>
      ) : (
        <>
          {text} <CopyIcon className="size-[1.2em]" />
        </>
      )}
    </button>
  );
}
