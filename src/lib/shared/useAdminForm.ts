"use client";

import { useState } from "react";
import { FieldError, PendingAction } from "./adminAction";
import { FieldDiff, getFormDiff } from "./getFormDiff";
import { NoticeKey, redirectWithNotice } from "../notifications";

type UseAdminFormOptions<T> = {
  buildActions: (
    id: string,
    current: T,
    changed: FieldDiff<T>,
    password: string,
  ) => PendingAction[];
  redirectPath: string;
  notice: NoticeKey;
};

export function useAdminForm<T extends Record<string, unknown>>(
  entityId: string,
  original: T,
  { buildActions, redirectPath, notice }: UseAdminFormOptions<T>,
) {
  const [current, setCurrent] = useState<T>(original);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingActions, setPendingActions] = useState<PendingAction[]>([]);
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const [reasonError, setReasonError] = useState<Record<string, string>>({});
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);

  function handleSubmit() {
    const changed = getFormDiff(original, current);
    if (Object.keys(changed).length === 0) return;

    setPendingActions(buildActions(entityId, current, changed, ""));
    setReasons({});
    setModalOpen(true);
  }

  function needsPassword(): boolean {
    return pendingActions.some((action) => action.needsPassword);
  }

  function setReason(key: string, value: string) {
    setReasons((prev) => ({ ...prev, [key]: value }));
  }

  function canConfirm(password?: string): boolean {
    const reasonsFilled = pendingActions.every(
      (a) => (reasons[a.key] ?? "").trim().length > 0,
    );
    const needsPasswordFilled = needsPassword();

    return needsPasswordFilled
      ? (password ?? "").trim().length > 0 && reasonsFilled
      : reasonsFilled;
  }

  async function handlePasswordConfirm(password: string) {
    setSubmitting(true);
    setPasswordError(null);

    const changed = getFormDiff(original, current);
    const actions = buildActions(entityId, current, changed, password);
    const results = await Promise.allSettled(
      actions.map((a) => a.run(reasons[a.key] ?? "")),
    );

    const newReasonError: Record<string, string> = {};
    results.forEach((r, i) => {
      if (r.status !== "fulfilled" || r.value.success) return;
      const err = r.value.errors.find((e) => e.code === "INVALID_REASON");
      if (err) newReasonError[actions[i].key] = err.message;
    });

    setReasonError(newReasonError);

    const passwordFailed = results.some(
      (r) =>
        r.status === "fulfilled" &&
        !r.value.success &&
        r.value.errors.some((e) => e.code === "INVALID_PASSWORD"),
    );

    if (passwordFailed) {
      setPasswordError("Senha incorreta. Tente novamente.");
      setSubmitting(false);
      return;
    }

    const errors: FieldError[] = results.flatMap((r) =>
      r.status === "fulfilled"
        ? r.value.errors
        : [{ code: "CONNECTION_ERROR", message: "Erro de rede inesperado" }],
    );

    setFieldErrors(errors);

    const allSucceeded = results.every(
      (r) => r.status === "fulfilled" && r.value.success,
    );

    setSubmitting(false);
    setModalOpen(false);

    if (allSucceeded) {
      redirectWithNotice(redirectPath, notice);
    }
  }

  function handleModalCancel() {
    setModalOpen(false);
    setPasswordError(null);
    setPendingActions([]);
    setReasons({});
  }

  return {
    current,
    setCurrent,
    modalOpen,
    pendingActions,
    needsPassword,
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
