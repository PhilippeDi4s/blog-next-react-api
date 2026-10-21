import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { UserResponseDto, UserSearchParamsDto } from "../schemas";
import { getLoginSessionOrRedirect } from "@/lib/auth/session";
import { PaginatedResponse } from "@/lib/shared/adminAction";

export async function findManyUsers(
  token: string,
  params?: UserSearchParamsDto,
) {
  const searchParams = new URLSearchParams();

  if (params?.id) {
    searchParams.set("id", params.id);
  } else {
    if (params?.name) {
      searchParams.set("name", params.name);
    }

    if (params?.email) {
      searchParams.set("email", params.email);
    }

    if (params?.role) {
      searchParams.set("role", params.role);
    }

    if (params?.isLogged !== undefined) {
      searchParams.set("isLogged", String(params.isLogged));
    }

    if (params?.isBlocked !== undefined) {
      searchParams.set("isBlocked", String(params.isBlocked));
    }

    if (params?.isDeleted !== undefined) {
      searchParams.set("isDeleted", String(params.isDeleted));
    }

    if (params?.startDate) {
      searchParams.set("startDate", params.startDate.toISOString());
    }

    if (params?.endDate) {
      searchParams.set("endDate", params.endDate.toISOString());
    }

    if (params?.page !== undefined) {
      searchParams.set("page", String(params.page));
    }

    if (params?.sessionStatus) {
      searchParams.set("sessionStatus", params.sessionStatus);
    }

    if (params?.sessionExpiresStartDate) {
      searchParams.set(
        "sessionExpiresStartDate",
        params.sessionExpiresStartDate.toISOString(),
      );
    }

    if (params?.sessionExpiresEndDate) {
      searchParams.set(
        "sessionExpiresEndDate",
        params.sessionExpiresEndDate.toISOString(),
      );
    }
  }

  const query = searchParams.toString();

  const res = await authenticatedApiRequest<PaginatedResponse<UserResponseDto>>(
    `/admin/users${query ? `?${query}` : ""}`,
    token,
    {},
  );

  return res;
}

export async function findUserById(token: string, id: string) {
  const res = await findManyUsers(token, { id });

  if (!res.success) return res;

  const user = res.data.data[0];

  if (!user) {
    return {
      success: false as const,
      status: 404,
      errors: [{ code: "404", message: "Usuário não encontrado" }],
    };
  }

  return { success: true as const, data: user };
}

export async function getUsers(params?: UserSearchParamsDto) {
  const jwtToken = await getLoginSessionOrRedirect();
  return findManyUsers(jwtToken, params);
}

export async function getUserById(id: string) {
  const jwtToken = await getLoginSessionOrRedirect();
  return findUserById(jwtToken, id);
}
