"use client";

import { useEffect } from "react";
import { showMessage } from "@/lib/show-message";

type ToastOnMountProps = {
  errors: string[];
};

export function ToastOnMount({ errors }: ToastOnMountProps) {
  useEffect(() => {
    showMessage.dismiss();
    errors.forEach((msg) => showMessage.error(msg));
  }, [errors]);

  return null;
}
