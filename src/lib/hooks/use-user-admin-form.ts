"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getUserFormDiff } from "@/lib/user/user-form-diff";
import { AdminUpdateUserPayloadDto } from "@/lib/user/schemas";

import { buildUserActions, PendingAction } from "@/lib/user/build-user-actions";
import { ActionResult, FieldError } from "../shared/action-result";

type SettledResult = PromiseSettledResult<ActionResult>;

export function useUserAdminForm(
  userId: string,
  original: AdminUpdateUserPayloadDto,
) {
  const router = useRouter();

  const [current, setCurrent] = useState<AdminUpdateUserPayloadDto>(original);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingActions, setPendingActions] = useState<PendingAction[]>([]);
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const [reasonError, setReasonError] = useState<Record<string, string>>({});
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);

  function handleSubmit() {
    const changed = getUserFormDiff(original, current);
    if (Object.keys(changed).length === 0) return;

    const actions = buildUserActions(userId, current, changed, "");
    setPendingActions(actions);
    setReasons({});
    setModalOpen(true);
  }

  function canConfirm(password: string): boolean {
    const reasonsFilled = pendingActions.every(
      (a) => (reasons[a.key] ?? "").trim().length > 0,
    );

    return password.trim().length > 0 && reasonsFilled;
  }

  async function handlePasswordConfirm(password: string) {
    setSubmitting(true);
    setPasswordError(null);

    const changed = getUserFormDiff(original, current);
    const actions = buildUserActions(userId, current, changed, password);

    const results = await runActions(actions, (key) => reasons[key] ?? "");

    const newReasonError: Record<string, string> = {};

    results.forEach((r, i) => {
      if (r.status !== "fulfilled" || r.value.success) return;

      const reasonError = r.value.errors.find(
        (error) => error.code === "INVALID_REASON",
      );

      if (reasonError) {
        newReasonError[actions[i].key] = reasonError.message;
      }
    });

    setReasonError(newReasonError);

    const passwordFailed = results.some(
      (r) =>
        r.status === "fulfilled" && r.value.success &&
        r.value.errors.some((error) => error.code === "INVALID_PASSWORD"),
    );

    if (passwordFailed) {
      setPasswordError("Senha incorreta. Tente novamente.");
      setSubmitting(false);
      return;
    }

    finishRun(results);
    setModalOpen(false);
  }

  async function runActions(
    actions: PendingAction[],
    getReason: (key: string) => string,
  ): Promise<SettledResult[]> {
    setSubmitting(true);
    return Promise.allSettled(actions.map((a) => a.run(getReason(a.key))));
  }

  function finishRun(results: SettledResult[]) {
    const allSucceeded = results.every(
      (r) => r.status === "fulfilled" && r.value.success,
    );

    const errors: FieldError[] = results.flatMap((r) =>
      r.status === "fulfilled"
        ? r.value.errors
        : [
            {
              code: "CONNECTION_ERROR",
              message: "Erro de rede inesperado",
            },
          ],
    );

    setFieldErrors(errors);
    setSubmitting(false);

    if (allSucceeded) {
      router.push(`/admin/users/${userId}`);
    }
  }

  function handleModalCancel() {
    setModalOpen(false);
    setPasswordError(null);
    setPendingActions([]);
    setReasons({});
  }

  function setReason(key: string, value: string) {
    setReasons((prev) => ({ ...prev, [key]: value }));
  }

  return {
    current,
    setCurrent,
    modalOpen,
    pendingActions,
    reasons,
    reasonError,
    setReason,
    canConfirm,
    passwordError,
    submitting,
    fieldErrors,
    handleSubmit,
    handlePasswordConfirm,
    handleModalCancel,
  };
}
