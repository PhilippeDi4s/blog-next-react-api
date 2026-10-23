"use client";

import { InputDate } from "@/components/ui/InputDate";
import { InputSelect } from "@/components/ui/InputSelect";
import { InputText } from "@/components/ui/InputText";
import { blockedFilterOptions } from "@/lib/user/enums/isBlocked";
import { deletedFilterOptions } from "@/lib/user/enums/isDeleted";
import { roleOptions } from "@/lib/user/enums/roles";
import { sessionStatusOptions } from "@/lib/user/enums/sessionStatus";
import { UserSearchParamsDto } from "@/lib/user/schemas";
import { formatDate } from "@/utils/format-datetime";
import {
  MailIcon,
  TagIcon,
  UserIcon,
} from "lucide-react";
import { FiltersForm } from "../FiltersForm";

export function UserFiltersForm({ filters }: { filters: UserSearchParamsDto }) {
  return (
    <FiltersForm
      basePath="/admin/users"
      filtersKey={JSON.stringify(filters)}
      id="user-filters-form"
    >
      <InputText
        name="id"
        labelText="ID"
        type="text"
        icon={TagIcon}
        placeholder="ID"
        defaultValue={filters.id ?? ""}
      />

      <InputText
        name="name"
        labelText="Nome"
        type="text"
        icon={UserIcon}
        placeholder="Nome"
        defaultValue={filters.name ?? ""}
      />
      <InputText
        name="email"
        labelText="E-mail"
        type="text"
        icon={MailIcon}
        placeholder="E-mail"
        defaultValue={filters.email ?? ""}
      />
      <InputSelect
        name="role"
        labelText="Papel"
        defaultValue={filters.role ?? ""}
        className="w-48! min-w-48!"
        options={roleOptions}
      />
      <InputSelect
        name="isBlocked"
        labelText="Bloqueio"
        defaultValue={String(filters.isBlocked ?? "all")}
        className="w-48! min-w-48!"
        options={blockedFilterOptions}
      />
      <InputSelect
        name="sessionStatus"
        labelText="Status da sessão"
        placeholder="Sessão"
        defaultValue={filters.sessionStatus}
        className="w-48! min-w-48!"
        options={sessionStatusOptions}
      />
      <InputSelect
        name="isDeleted"
        labelText="Status da conta"
        defaultValue={String(filters.isDeleted ?? "all")}
        className="w-48! min-w-48!"
        options={deletedFilterOptions}
      />
      <InputDate
        name="startDate"
        labelText="Criado a partir de"
        placeholder="DD/MM/AAAA"
        defaultValue={
          filters.startDate ? formatDate(String(filters.startDate)) : ""
        }
      />
      <InputDate
        name="endDate"
        labelText="Criado até"
        placeholder="DD/MM/AAAA"
        defaultValue={
          filters.endDate ? formatDate(String(filters.endDate)) : ""
        }
      />
      <InputDate
        name="sessionExpiresStartDate"
        labelText="Sessão expira a partir de"
        placeholder="DD/MM/AAAA"
        defaultValue={
          filters.sessionExpiresStartDate
            ? formatDate(String(filters.sessionExpiresStartDate))
            : ""
        }
      />
      <InputDate
        name="sessionExpiresEndDate"
        labelText="Sessão expira até"
        placeholder="DD/MM/AAAA"
        defaultValue={
          filters.sessionExpiresEndDate
            ? formatDate(String(filters.sessionExpiresEndDate))
            : ""
        }
      />
    </FiltersForm>
  );
}
