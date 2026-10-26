"use client";

import { FiltersForm } from "@/components/admin/FiltersForm";
import { InputDate } from "@/components/ui/InputDate";
import { InputText } from "@/components/ui/InputText";
import type { ImageSearchParamsDto } from "@/lib/image/schema";
import { formatDate } from "@/utils/format-datetime";
import {
  LinkIcon,
  MailIcon,
  TagIcon,
  UserIcon,
} from "lucide-react";

export function ImageFiltersForm({
  filters,
}: {
  filters: ImageSearchParamsDto;
}) {
  return (
    <FiltersForm
      basePath="/admin/images"
      filtersKey={JSON.stringify(filters)}
      id="image-filters-form"
    >
      <InputText
        name="id"
        labelText="ID da imagem"
        type="text"
        icon={TagIcon}
        placeholder="ID da imagem"
        defaultValue={filters.id ?? ""}
      />
      <InputText
        name="url"
        labelText="URL da imagem"
        type="text"
        icon={LinkIcon}
        placeholder="URL da imagem"
        defaultValue={filters.url ?? ""}
      />
      <InputText
        name="userId"
        labelText="ID do usuário"
        type="text"
        icon={TagIcon}
        placeholder="ID do usuário"
        defaultValue={filters.userId ?? ""}
      />
      <InputText
        name="userName"
        labelText="Nome do usuário"
        type="text"
        icon={UserIcon}
        placeholder="Nome do usuário"
        defaultValue={filters.userName ?? ""}
      />
      <InputText
        name="userEmail"
        labelText="E-mail do usuário"
        type="text"
        icon={MailIcon}
        placeholder="E-mail do usuário"
        defaultValue={filters.userEmail ?? ""}
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
