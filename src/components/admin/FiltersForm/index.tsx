"use client";

import { CollapsibleSection } from "@/components/layout/CollapsibleSection";
import { Button } from "@/components/ui/Button";
import {
  FilterXIcon,
  FunnelIcon,
  SlidersHorizontalIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SubmitEvent, ReactNode } from "react";

type FiltersFormProps = {
  id: string;
  basePath: string;
  filtersKey: string;
  children: ReactNode;
  submitLabel?: string;
  resetLabel?: string;
};

export function FiltersForm({
  id,
  basePath,
  filtersKey,
  children,
  submitLabel = "Filtrar",
  resetLabel = "Limpar filtros",
}: FiltersFormProps) {
  const router = useRouter();
  const [resetKey, setResetKey] = useState(0);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const params = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      if (typeof value !== "string") continue;

      const trimmed = value.trim();

      if (trimmed === "") continue;

      params.append(key, trimmed);
    }

    const query = params.toString();

    router.push(query ? `${basePath}?${query}` : basePath);
  }

  function handleReset() {
    setResetKey((previous) => previous + 1);
    router.push(basePath);
  }

  return (
    <CollapsibleSection
      toggleBtnContent={
        <>
          <SlidersHorizontalIcon />  Filtros 
        </>
      }
      toggleBtnClassName="max-w-60"
      btnVariant="default"
    >
      <div className="w-full min-w-0 overflow-x-auto admin-scrollbar">
        <form
          id={id}
          method="GET"
          key={`${filtersKey}-${resetKey}`}
          onSubmit={handleSubmit}
          className="flex w-max min-w-full flex-nowrap items-center justify-start gap-8 pt-0 p-3 *:shrink-0"
        >
          {children}
        </form>

        <div className="sticky left-0 flex w-full flex-wrap justify-center gap-2 md:gap-5 py-4">
          <Button
            type="submit"
            form={id}
            className="max-w-70 min-w-59 w-[40%] font-semibold whitespace-nowrap"
          >
            <FunnelIcon size={18} strokeWidth={2.5} className="shrink-0" />
            {submitLabel}
          </Button>

          <Button
            type="button"
            form={id}
            variant="danger"
            onClick={handleReset}
            className="max-w-70 min-w-59 w-[40%] font-semibold whitespace-nowrap"
          >
            <FilterXIcon size={18} strokeWidth={2.5} className="shrink-0" />
            {resetLabel}
          </Button>
        </div>
      </div>
    </CollapsibleSection>
  );
}
