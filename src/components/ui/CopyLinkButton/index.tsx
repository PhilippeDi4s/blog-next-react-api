"use client";

import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

interface CopyLinkButtonProps {
  url: string;
  text: string;
}

export function CopyLinkButton({ url, text }: CopyLinkButtonProps) {
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
      className="cursor-pointer hover:brightness-50 flex items-center gap-2 transition"
    >
      {copied ? (
        <>
          Copiado! <CopyCheckIcon className="size-[1.2em]"/>
        </>
      ) : (
        <>
          {text} <CopyIcon className="size-[1.2em]"/>
        </>
      )}
    </button>
  );
}
