import { getLoginSessionOrRedirect } from "@/lib/auth/session";
import type { QueryResult } from "@/lib/shared/types/query";
import type { UserProfileResponseDto } from "@/lib/user/schemas";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { toQueryResult } from "@/utils/to-query-result";

export async function findMyProfile(
  token: string,
): Promise<QueryResult<UserProfileResponseDto>> {
  const result = await authenticatedApiRequest<UserProfileResponseDto>(
    "/user/me/profile",
    token,
    { cache: "no-store" },
  );

  return toQueryResult(result);
}

export async function getMyProfile(): Promise<
  QueryResult<UserProfileResponseDto>
> {
  const jwtToken = await getLoginSessionOrRedirect();
  return findMyProfile(jwtToken);
}
