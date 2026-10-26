"use client";

import { FiltersForm } from "@/components/admin/FiltersForm";
import { InputDate } from "@/components/ui/InputDate";
import { InputSelect } from "@/components/ui/InputSelect";
import { InputText } from "@/components/ui/InputText";
import { actionTypeOptions } from "@/lib/logs/enums/actionType";
import { entityTypeOptions } from "@/lib/logs/enums/entityType";
import type { LogSearchParamsDto } from "@/lib/logs/schema";
import { formatDate } from "@/utils/format-datetime";
import { IdCardIcon, LayersIcon, TagIcon } from "lucide-react";

export function LogFiltersForm({ filters }: { filters: LogSearchParamsDto }) {
  return (
    <FiltersForm
      basePath="/admin/logs"
      filtersKey={JSON.stringify(filters)}
      id="log-filters-form"
    >
      <InputText
        name="id"
        labelText="ID"
        type="text"
        icon={TagIcon}
        placeholder="ID do log"
        defaultValue={filters.id ?? ""}
      />
      <InputSelect
        name="action"
        labelText="Ação"
        defaultValue={filters.action ?? ""}
        className="w-48! min-w-48!"
        options={actionTypeOptions}
      />
      <InputText
        name="userId"
        labelText="ID do Ator"
        type="text"
        icon={IdCardIcon}
        placeholder="ID do ator"
        defaultValue={filters.userId ?? ""}
      />
      <InputSelect
        name="entityType"
        labelText="Tipo de entidade"
        defaultValue={filters.entityType ?? ""}
        className="w-48! min-w-48!"
        options={entityTypeOptions}
      />
      <InputText
        name="entityId"
        labelText="ID da entidade"
        type="text"
        icon={LayersIcon}
        placeholder="ID da entidade"
        defaultValue={filters.entityId ?? ""}
      />
      <InputDate
        name="startDate"
        labelText="Criado a partir de"
        placeholder="DD/MM/AAAA"
        defaultValue={
          filters.startDate
            ? formatDate(filters.startDate.toISOString().slice(0, 10))
            : ""
        }
      />
      <InputDate
        name="endDate"
        labelText="Criado até"
        placeholder="DD/MM/AAAA"
        defaultValue={
          filters.endDate
            ? formatDate(filters.endDate.toISOString().slice(0, 10))
            : ""
        }
      />
    </FiltersForm>
  );
}
