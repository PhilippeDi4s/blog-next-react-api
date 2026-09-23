"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { showMessage } from "@/lib/show-message";
import { NoticeKey, showNotice } from "../notifications";
import {
  CONFIRM_ERROR_MESSAGE,
  NETWORK_ERROR_MESSAGE,
} from "../notifications/adminFormMessages";
import { ActionResult, PendingAction, FieldError } from "./adminAction";
import { FieldDiff, getFormDiff } from "./getFormDiff";

type SettledResult = PromiseSettledResult<ActionResult>;

type UseAdminFormOptions<T> = {
  buildActions: (
    id: string,
    current: T,
    changed: FieldDiff<T>,
    password: string,
  ) => PendingAction[];
  getRedirectPath: (params: {
    results: SettledResult[];
    actions: PendingAction[];
  }) => string;
  notice: NoticeKey;
  formErrorMessage: string;
};

export function useAdminForm<T extends Record<string, unknown>>(
  entityId: string,
  original: T,
  {
    buildActions,
    getRedirectPath,
    notice,
    formErrorMessage,
  }: UseAdminFormOptions<T>,
) {
  const router = useRouter();

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
    return needsPassword()
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

    const errors: FieldError[] = results.flatMap((r) =>
      r.status === "fulfilled"
        ? r.value.errors
        : [{ code: "CONNECTION_ERROR", message: "Erro de rede inesperado" }],
    );

    const newReasonError: Record<string, string> = {};
    results.forEach((r, i) => {
      if (r.status !== "fulfilled" || r.value.success) return;
      const err = r.value.errors.find((e) => e.code === "INVALID_REASON");
      if (err) newReasonError[actions[i].key] = err.message;
    });
    setReasonError(newReasonError);

    const passwordFailed = errors.some((e) => e.code === "INVALID_PASSWORD");
    if (passwordFailed) setPasswordError("Senha incorreta. Tente novamente.");

    const hasConfirmError =
      Object.keys(newReasonError).length > 0 || passwordFailed;
    const hasNetworkError = errors.some((e) => e.code === "CONNECTION_ERROR");
    const hasFormError = errors.some(
      (e) =>
        e.code !== "INVALID_REASON" &&
        e.code !== "INVALID_PASSWORD" &&
        e.code !== "CONNECTION_ERROR",
    );

    if (hasFormError) showMessage.error(formErrorMessage);
    if (hasConfirmError) showMessage.error(CONFIRM_ERROR_MESSAGE);
    if (hasNetworkError) showMessage.error(NETWORK_ERROR_MESSAGE);

    if (passwordFailed) {
      setSubmitting(false);
      return;
    }

    setFieldErrors(errors);
    const allSucceeded = results.every(
      (r) => r.status === "fulfilled" && r.value.success,
    );
    setSubmitting(false);
    setModalOpen(false);

    if (allSucceeded) {
      showNotice(notice);
      router.push(getRedirectPath({ results, actions }));
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
