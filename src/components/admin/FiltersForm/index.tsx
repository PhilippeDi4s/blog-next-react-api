"use client";

import { Button } from "@/components/ui/Button";
import { FilterXIcon, FunnelIcon } from "lucide-react";
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
    <div className="w-full min-w-0 overflow-x-auto admin-scrollbar">
      <form
        id={id}
        method="GET"
        key={`${filtersKey}-${resetKey}`}
        onSubmit={handleSubmit}
        className="flex w-max min-w-full flex-nowrap items-center justify-start gap-8 p-3 *:shrink-0"
      >
        {children}
      </form>

      <div className="sticky left-0 flex w-full flex-wrap justify-center gap-6 py-4">
        <Button type="submit" form={id} className="w-[40%] font-semibold">
          <FunnelIcon size={18} strokeWidth={2.5} />
          {submitLabel}
        </Button>

        <Button
          type="button"
          form={id}
          variant="danger"
          onClick={handleReset}
          className="w-[40%] font-semibold"
        >
          <FilterXIcon size={18} strokeWidth={2.5} />
          {resetLabel}
        </Button>
      </div>
    </div>
  );
}
