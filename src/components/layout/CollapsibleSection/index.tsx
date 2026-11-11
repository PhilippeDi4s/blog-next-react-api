"use client";

import { Button } from "@/components/ui/Button";
import { BtnVariants } from "@/lib/styles/button-style";
import clsx from "clsx";
import { ChevronUpIcon } from "lucide-react";
import { useState } from "react";

type CollapsibleSectionProps = {
  className?: string;
  children: React.ReactNode;
  toggleBtnContent: React.ReactNode;
  toggleBtnClassName?: string;
  btnVariant?: BtnVariants;
};

export function CollapsibleSection({
  className,
  children,
  toggleBtnContent,
  toggleBtnClassName,
  btnVariant = "unstyled",
}: CollapsibleSectionProps) {
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  return (
    <>
      <Button
        type="button"
        variant={btnVariant}
        onClick={() => setIsSectionOpen(!isSectionOpen)}
        className={toggleBtnClassName}
      >
        {toggleBtnContent}
        <ChevronUpIcon
          className={clsx(
            "transition duration-500",
            isSectionOpen ? "rotate-0" : "rotate-180",
          )}
        />
      </Button>
      <div
        className={clsx(
          "grid transition-[grid-template-rows,opacity,visibility] duration-300 ease-in-out",
          isSectionOpen
            ? "grid-rows-[1fr] opacity-100 visible"
            : "grid-rows-[0fr] opacity-0 invisible",
        )}
        aria-hidden={!isSectionOpen}
      >
        <div className="min-h-0 overflow-hidden">
          <div className={className}>{children}</div>
        </div>
      </div>
    </>
  );
}
