"use server";

import { deleteLoginSession } from "@/lib/login/manage-login";
import { simulateDelay } from "@/utils/async-delay";
import { redirect } from "next/navigation";

export async function logoutAction() {
  await simulateDelay(5000); // Vou manter
  await deleteLoginSession();
  redirect("/");
}
