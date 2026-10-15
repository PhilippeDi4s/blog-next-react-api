import { cookies } from "next/headers";
import { UserResponseDto } from "../user/schemas";
import { Notice, redirectWithNotice } from "../notifications";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { ActionResult } from "../shared/adminAction";
import { cache } from "react";
import { notFound } from "next/navigation";

type LoginSessionResult = { jwt: string } & ActionResult;

const loginCookieName = process.env.LOGIN_COOKIE_NAME || "loginSession";

export async function createLoginSession(
  cookieValue: string,
  expiresIn: number,
) {
  const cookieStore = await cookies();

  cookieStore.set(loginCookieName, cookieValue, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: expiresIn,
  });
}

export async function getLoginSession(): Promise<LoginSessionResult> {
  const cookieStore = await cookies();

  const jwt = cookieStore.get(loginCookieName)?.value;

  if (!jwt)
    return {
      success: false,
      errors: [
        {
          code: "SESSION_EXPIRED",
          message: "Sua sessão expirou. Faça login novamente.",
        },
      ],
      jwt: "",
    };

  const res = await authenticatedApiRequest<UserResponseDto>(`/auth/me`, jwt, {
    cache: "no-cache",
  });

  if (!res.success) {
    return {
      success: false,
      errors: res.errors,
      jwt: "",
    };
  }

  const user = await res.data;

  if (user.isBlocked) redirectWithNotice("login", Notice.USER_BLOCKED);
  if (!user.isLogged) redirectWithNotice("login", Notice.SESSION_REVOKED);

  return {
    success: true,
    errors: [],
    jwt,
  };
}

export async function getLoginSessionOrRedirect() {
  const token = await getLoginSession();
  if (!token.jwt) {
    redirectWithNotice("login", Notice.AUTH_LOGIN_REQUIRED);
  }
  return token.jwt;
}

async function redirectOnUnauthorized(res: Response) {
  const body = await res.json().catch(() => null);

  if (body?.code === "USER_BLOCKED") {
    redirectWithNotice("login", Notice.USER_BLOCKED);
  }
  if (body?.code === "SESSION_REVOKED") {
    redirectWithNotice("login", Notice.SESSION_REVOKED);
  }

  redirectWithNotice("login", Notice.SESSION_EXPIRED);
}

export const getAuthenticatedUserOrRedirect = cache(async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get(loginCookieName)?.value;

  if (!token) {
    notFound()
  }

  const res = await fetch(`${process.env.API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (res.status === 401) await redirectOnUnauthorized(res);

  if (!res.ok) {
    throw new Error("Não foi possível verificar o usuário");
  }

  const user: UserResponseDto = await res.json();

  if (user.isBlocked) redirectWithNotice("login", Notice.USER_BLOCKED);
  if (!user.isLogged) redirectWithNotice("login", Notice.SESSION_REVOKED);

  return user;
});
