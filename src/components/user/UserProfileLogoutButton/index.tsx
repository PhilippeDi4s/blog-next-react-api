"use client";

import { logoutAction } from "@/app/actions/login/logout-action";
import { Button } from "@/components/ui/Button";
import { showMessage } from "@/lib/notifications/toast/show-message";
import { LogOutIcon } from "lucide-react";
import { useTransition } from "react";

export function UserProfileLogoutButton() {
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      showMessage.dismiss();
      const result = await logoutAction();
      if (!result.success) {
        result.errors.forEach((error) => showMessage.error(error.message));
      }
    });
  }

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={handleLogout}
      disabled={isPending}
      className="border-slate-400 text-slate-700 dark:border-slate-500 dark:text-slate-200"
    >
      <LogOutIcon />
      {isPending ? "Saindo..." : "Sair"}
    </Button>
  );
}
