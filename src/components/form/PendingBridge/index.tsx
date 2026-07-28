"use client";

import { useFormStatus } from "react-dom";
import { useEffect } from "react";

type PendingBridgeProps = {
  setPending: (value: boolean) => void;
};

export function PendingBridge({ setPending }: PendingBridgeProps) {
  const { pending } = useFormStatus();

  useEffect(() => {
    setPending(pending);
  }, [pending, setPending]);

  return null;
}
