import { verifyJwt } from "@/lib/login/manage-login";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const jwt = request.cookies.get(process.env.LOGIN_SESSION_NAME || "loginSession")?.value;
  const isValid = await verifyJwt(jwt);

  if (!isValid) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};