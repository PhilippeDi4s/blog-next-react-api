"use client";

import clsx from "clsx";
import { ArrowBigLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type BackButtonProps = {
  className?: string;
  pathLabel?: string;
};

export function BackButton({ className, pathLabel }: BackButtonProps) {
  const router = useRouter();
  function handleButtonClick() {
    router.back();
  }
  return (
    <div className="flex gap-3 items-center">
      <button
        className={clsx(
          "w-fit flex items-center gap-3 py-2 px-4 rounded-xl border border-white/50 cursor-pointer transition hover:scale-105 hover:bg-white/20",
          className,
        )}
        onClick={handleButtonClick}
      >
        <ArrowBigLeftIcon fill="white" size={18} />
        Voltar
      </button>
      {pathLabel && <span className="opacity-70">{pathLabel}</span>}
    </div>
  );
}
