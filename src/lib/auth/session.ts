import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserResponseDto } from "../user/schemas";

const loginCookieName = process.env.LOGIN_COOKIE_NAME || "loginSession";

export async function getLoginSession() {
  const cookieStore = await cookies();

  const jwt = cookieStore.get(loginCookieName)?.value;

  if (!jwt) return false;

  const res = await fetch(`${process.env.API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${jwt}` },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Não foi possível verificar o usuário");
  }

  const user = await res.json();

  if (user.isBlocked) redirect("/login?reason=blocked");
  if (user.forceLogout) redirect("/login?reason=force-logout");

  return jwt;
}

export async function getLoginSessionOrRedirect(){
  const token = await getLoginSession()
  if(!token){
    redirect("/login");
  }
  return token;
}

export async function getAuthenticatedUserOrRedirect() {
  const cookieStore = await cookies();

  const token = cookieStore.get(loginCookieName)?.value;

  if (!token) {
    redirect("/login");
  }

  const res = await fetch(`${process.env.API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Não foi possível verificar o usuário");
  }

  const user: UserResponseDto = await res.json();

  if (user.isBlocked) redirect("/login?reason=blocked");
  if (user.forceLogout) redirect("/login?reason=force-logout");

  return user;
}
