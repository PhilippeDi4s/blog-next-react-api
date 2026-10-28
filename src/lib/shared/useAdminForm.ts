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
import { ConfirmActionAdminSchema } from "../sharedSchemas/schemas";
import { ZodType } from "zod";
import { getZodErrorMessages } from "@/utils/get-zod-error-message";

type SettledResult = PromiseSettledResult<ActionResult<unknown>>;

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
  schema?: ZodType;
};

const CONFIRM_FIELDS = ["reason", "password"];
const isConfirmError = (e: FieldError) =>
  !!e.field && CONFIRM_FIELDS.includes(e.field);

export function useAdminForm<T extends Record<string, unknown>>(
  entityId: string,
  original: T,
  {
    buildActions,
    getRedirectPath,
    notice,
    formErrorMessage,
    schema,
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

  const needAdminPassword = pendingActions.some((a) => a.needsPassword);

  const hasChanges = Object.keys(getFormDiff(original, current)).length > 0;

  function handleSubmit() {
    if (!hasChanges) return;

    if (schema) {
      const parsed = schema.safeParse(current);
      if (!parsed.success) {
        console.log(current);
        setFieldErrors(
          parsed.error.issues.map((issue) => ({
            field: issue.path.map(String).join("."),
            code: "INVALID_VALIDATION",
            message: issue.message,
          })),
        );
        getZodErrorMessages(parsed.error).map((error) =>
          showMessage.error(error.message),
        );
        return;
      }
    }

    const changed = getFormDiff(original, current);
    setFieldErrors([]);
    setReasonError({});
    setPasswordError(null);
    setReasons({});
    setPendingActions(buildActions(entityId, current, changed, ""));
    setModalOpen(true);
  }

  function getFieldError(field: string) {
    return fieldErrors.find((e) => e.field === field)?.message;
  }

  function clearFieldError(field: string) {
    setFieldErrors((prev) => prev.filter((e) => e.field !== field));
  }

  function setReason(key: string, value: string) {
    setReasons((prev) => ({ ...prev, [key]: value }));
  }

  function canConfirm(password?: string): boolean {
    const reasonsValid = pendingActions.every(
      (a) =>
        ConfirmActionAdminSchema.shape.reason.safeParse(reasons[a.key] ?? "")
          .success,
    );

    if (!needAdminPassword) return reasonsValid;

    const passwordValid =
      ConfirmActionAdminSchema.shape.password.safeParse(password).success;

    const isValidForm = reasonsValid === true && passwordValid === true;

    if (isValidForm) {
      return true;
    }
    return false;
  }

  async function handlePasswordConfirm(password: string) {
    setSubmitting(true);
    setPasswordError(null);
    setReasonError({});
    setFieldErrors([]);

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

    console.log(JSON.stringify(errors, null, 2));

    const networkErrors = errors.filter((e) => e.code === "CONNECTION_ERROR");
    const confirmErrors = errors.filter(isConfirmError);
    const formErrors = errors.filter(
      (e) => e.code !== "CONNECTION_ERROR" && !isConfirmError(e),
    );

    const newReasonError: Record<string, string> = {};
    results.forEach((r, i) => {
      if (r.status !== "fulfilled" || r.value.success) return;
      const err = r.value.errors.find((e) => e.field === "reason");
      if (err) newReasonError[actions[i].key] = err.message;
    });
    setReasonError(newReasonError);

    const passwordErr = errors.find((e) => e.field === "password");
    if (passwordErr) {
      setPasswordError(
        passwordErr.message || "Senha incorreta. Tente novamente.",
      );
    }

    setFieldErrors(formErrors);
    setSubmitting(false);

    const allSucceeded = results.every(
      (r) => r.status === "fulfilled" && r.value.success,
    );

    if (allSucceeded) {
      showNotice(notice);
      setModalOpen(false);
      router.push(getRedirectPath({ results, actions }));
      return;
    }

    if (networkErrors.length) showMessage.error(NETWORK_ERROR_MESSAGE);

    if (confirmErrors.length) {
      showMessage.error(CONFIRM_ERROR_MESSAGE);
      return;
    }

    if (formErrors.length) {
      showMessage.error(formErrorMessage);
    }
  }

  function handleModalCancel() {
    setModalOpen(false);
    setPasswordError(null);
    setPendingActions([]);
    setReasons({});
    setReasonError({});
  }

  const modalProps = {
    open: modalOpen,
    submitting,
    pendingActions,
    reasons,
    reasonErrors: reasonError,
    passwordError,
    needAdminPassword,
    onReasonChange: setReason,
    canConfirm,
    onConfirm: handlePasswordConfirm,
    onCancel: handleModalCancel,
  };

  return {
    current,
    setCurrent,
    fieldErrors,
    hasChanges,
    handleSubmit,
    getFieldError,
    clearFieldError,
    modalProps,
  };
}
