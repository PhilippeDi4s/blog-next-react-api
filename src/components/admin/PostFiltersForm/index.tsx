"use client";

import { FiltersForm } from "@/components/admin/FiltersForm";
import { InputDate } from "@/components/ui/InputDate";
import { InputSelect } from "@/components/ui/InputSelect";
import { InputText } from "@/components/ui/InputText";
import { publishedFilterOptions } from "@/lib/post/enums/publishedFilter";
import type { PostSearchParamsDto } from "@/lib/post/schemas";
import { formatDate } from "@/utils/format-datetime";
import {
  AtSignIcon,
  FileTextIcon,
  HashIcon,
  Heading1Icon,
  IdCardIcon,
  LinkIcon,
  MailIcon,
  TagIcon,
  UserIcon,
} from "lucide-react";

export function PostFiltersForm({
  filters,
}: {
  filters: PostSearchParamsDto;
}) {
  return (
    <FiltersForm
      basePath="/admin/posts"
      filtersKey={JSON.stringify(filters)}
      id="post-filters-form"
    >
      <InputText
        name="id"
        labelText="ID"
        type="text"
        icon={TagIcon}
        placeholder="ID do post"
        defaultValue={filters.id ?? ""}
      />
      <InputText
        name="title"
        labelText="Título"
        type="text"
        icon={Heading1Icon}
        placeholder="Título"
        defaultValue={filters.title ?? ""}
      />
      <InputText
        name="slug"
        labelText="Slug"
        type="text"
        icon={LinkIcon}
        placeholder="Slug"
        defaultValue={filters.slug ?? ""}
      />
      <InputText
        name="authorId"
        labelText="ID do autor"
        type="text"
        icon={IdCardIcon}
        placeholder="ID do autor"
        defaultValue={filters.authorId ?? ""}
      />
      <InputText
        name="authorName"
        labelText="Nome do autor"
        type="text"
        icon={UserIcon}
        placeholder="Nome do autor"
        defaultValue={filters.authorName ?? ""}
      />
      <InputText
        name="authorEmail"
        labelText="E-mail do autor"
        type="text"
        icon={MailIcon}
        placeholder="E-mail do autor"
        defaultValue={filters.authorEmail ?? ""}
      />
      <InputSelect
        name="published"
        labelText="Publicação"
        defaultValue={String(filters.published ?? "all")}
        className="w-48! min-w-48!"
        options={publishedFilterOptions}
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
