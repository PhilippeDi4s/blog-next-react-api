import { cookies } from "next/headers";
import { PublicUserMenu } from "./PublicUserMenu";

type HeaderUser = { name: string; role: string; isLogged: boolean; isBlocked: boolean };

export async function PublicHeaderSession() {
  const cookieName = process.env.LOGIN_COOKIE_NAME || "loginSession";
  const token = (await cookies()).get(cookieName)?.value;
  if (!token) return <PublicUserMenu />;

  try {
    const response = await fetch(`${process.env.API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!response.ok) return <PublicUserMenu />;
    const user = (await response.json()) as HeaderUser;
    if (!user.isLogged || user.isBlocked) return <PublicUserMenu />;
    return <PublicUserMenu user={user} />;
  } catch {
    return <PublicUserMenu />;
  }
}
