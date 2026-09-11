// hooks/use-user-admin-form.ts
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  UserFormData,
  getUserFormDiff,
  hasSensitiveChanges,
} from "@/lib/user/user-form-diff";
import {
  buildUserActions,
  ActionResult,
  PendingAction,
} from "@/lib/user/build-user-actions";

type SettledResult = PromiseSettledResult<ActionResult>;

export function useUserAdminForm(userId: string, original: UserFormData) {
  const router = useRouter();

  const [current, setCurrent] = useState<UserFormData>(original);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingActions, setPendingActions] = useState<PendingAction[]>([]);
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);

  function handleSubmit() {
    const changed = getUserFormDiff(original, current);
    if (Object.keys(changed).length === 0) return;

    if (hasSensitiveChanges(changed)) {
      // monta a lista só pra exibição (sem senha ainda) — run() não é chamado aqui
      const preview = buildUserActions(userId, current, changed);
      setPendingActions(preview);
      setReasons({});
      setModalOpen(true);
      return;
    }

    const actions = buildUserActions(userId, current, changed);
    void runActions(actions.map((a) => () => a.run("")));
  }

  function canConfirm(password: string): boolean {
    const reasonsFilled = pendingActions
      .filter((a) => a.requiresReason)
      .every((a) => (reasons[a.key] ?? "").trim().length > 0);

    return password.trim().length > 0 && reasonsFilled;
  }

  async function handlePasswordConfirm(password: string) {
    setSubmitting(true);
    setPasswordError(null);

    const changed = getUserFormDiff(original, current);
    const actions = buildUserActions(userId, current, changed, password);

    const results = await Promise.allSettled(
      actions.map((a) => a.run(reasons[a.key] ?? "")),
    );

    const passwordFailed = results.some(
      (r) =>
        r.status === "fulfilled" &&
        !r.value.success &&
        r.value.errors.includes("INVALID_PASSWORD"),
    );

    if (passwordFailed) {
      setPasswordError("Senha incorreta. Tente novamente.");
      setSubmitting(false);
      return;
    }

    finishRun(results);
    setModalOpen(false);
  }

  async function runActions(runners: (() => Promise<ActionResult>)[]) {
    setSubmitting(true);
    const results = await Promise.allSettled(runners.map((run) => run()));
    finishRun(results);
  }

  function finishRun(results: SettledResult[]) {
    const allSucceeded = results.every(
      (r) => r.status === "fulfilled" && r.value.success,
    );

    const errors = results.flatMap((r) =>
      r.status === "fulfilled" ? r.value.errors : ["Erro de rede inesperado"],
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
