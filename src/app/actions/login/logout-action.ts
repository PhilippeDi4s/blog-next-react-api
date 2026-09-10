"use server";

import { getLoginSession } from "@/lib/auth/session";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const jwtToken = await getLoginSession();

  if (!jwtToken) {
    return {
      error: "Faça login novamente em outra aba",
    };
  }

  const res = await authenticatedApiRequest("auth/logout", jwtToken, {
    method: "POST",
  });

  if (!res.success) {
    return {
      error: res.errors,
    };
  }

  redirect("login?force-logout=1");
}
