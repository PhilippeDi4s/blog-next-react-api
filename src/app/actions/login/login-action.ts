"use server";

import { createLoginSession, verifyPassword } from "@/lib/login/manage-login";
import { simulateDelay } from "@/utils/async-delay";
import { redirect } from "next/navigation";

type loginActionState = {
  userName: string;
  error: string;
};

export async function loginAction(state: loginActionState, formData: FormData) {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN || 1));

  if (!allowLogin) {
    return {
      userName: "",
      error: "Login not allowed",
    };
  }
  await simulateDelay(5000);

  if (!(formData instanceof FormData)) {
    return {
      userName: "",
      error: "Dados inválidos",
    };
  }

  const userName = formData.get("userName")?.toString().trim() || "";
  const password = formData.get("password")?.toString().trim() || "";

  const isUserNameValid = userName === process.env.LOGIN_USER;
  const isPasswordValid = await verifyPassword(
    password,
    process.env.LOGIN_PASS || "",
  );

  if (!isUserNameValid || !isPasswordValid) {
    return {
      userName,
      error: "Senha ou usuário inválidos",
    };
  }

  await createLoginSession(userName);
  redirect("/admin/post");
}
