"use client";

import { BtnSize, BtnVariants, getButtonClasses } from "@/lib/styles/button-style";
import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

type CopyTextButtonProps = {
  textToCopy: string;
  buttonText: string;
  variant: BtnVariants;
  size?: BtnSize;
} & React.ComponentProps<"button">;

export function CopyTextButton({
  textToCopy,
  buttonText,
  variant = "default",
  size = "md",
  ...props
}: CopyTextButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 800);
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
      <span className="grid">
        <span
          className={`col-start-1 row-start-1 flex gap-2 ${copied ? "invisible" : "visible"}`}
        >
          {buttonText} <CopyIcon className="size-[1.2em]" />
        </span>
        <span
          className={`col-start-1 row-start-1 flex gap-2 ${copied ? "visible" : "invisible"}`}
        >
          Copiado! <CopyCheckIcon className="size-[1.2em]" />
        </span>
      </span>
    </button>
  );
}
