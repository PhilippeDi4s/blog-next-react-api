import { cache } from "react";
import { PublicUserDto, PublicUserSchema } from "./schemas";
import { getLoginSession } from "../login/manage-login";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";

export const getCurrentUser = cache(async () => {
  const jwt = await getLoginSession();
  if (!jwt) return null;

  const res = await authenticatedApiRequest<PublicUserDto>("/user/me", jwt, {
    headers: { Authorization: `Bearer ${jwt}` },
    cache: "no-store",
  });

  if (!res.success) return null;

  const data = res.data;
  return PublicUserSchema.parse(data);
});
