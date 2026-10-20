import { Button } from "@/components/ui/Button";
import { InputDate } from "@/components/ui/InputDate";
import { InputSelect } from "@/components/ui/InputSelect";
import { InputText } from "@/components/ui/InputText";
import { blockedFilterOptions } from "@/lib/user/enums/isBlocked";
import { deletedFilterOptions } from "@/lib/user/enums/isDeleted";
import { roleOptions } from "@/lib/user/enums/roles";
import { sessionStatusOptions } from "@/lib/user/enums/sessionStatus";
import { UserSearchParamsDto } from "@/lib/user/schemas";
import { formatDate } from "@/utils/format-datetime";
import { FunnelIcon, MailIcon, TagIcon, UserIcon } from "lucide-react";

export function UserFiltersForm({ filters }: { filters: UserSearchParamsDto }) {
  return (
    <div className="w-full min-w-0 overflow-x-auto admin-scrollbar">
      <form
        id="user-filters-form"
        action="admin/users"
        method="GET"
        key={JSON.stringify(filters)}
        className="flex w-max min-w-full flex-nowrap items-center justify-start gap-8 p-3 *:shrink-0"
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
          type="email"
          icon={MailIcon}
          placeholder="E-mail"
          defaultValue={filters.email ?? ""}
        />
        <InputSelect
          name="role"
          labelText="Papel"
          defaultValue={filters.role ?? ""}
          options={roleOptions}
        />
        <InputSelect
          name="blocked"
          labelText="Bloqueio"
          defaultValue={String(filters.isBlocked ?? false)}
          options={blockedFilterOptions}
        />
        <InputSelect
          name="session"
          labelText="Status da sessão"
          options={sessionStatusOptions}
          placeholder="Sessão"
          defaultValue={filters.sessionStatus}
        />
        <InputSelect
          name="deleted"
          labelText="Status da conta"
          defaultValue={String(filters.isDeleted ?? false)}
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
      </form>
      <div className="sticky left-0 flex w-full justify-center py-4">
        <Button type="submit" form="user-filters-form" className="w-[40%] font-semibold">
           <FunnelIcon size={18} strokeWidth={2.5} /> Filtrar
        </Button>
      </div>
    </div>
  );
}
