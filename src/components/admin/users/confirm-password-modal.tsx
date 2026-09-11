// components/admin/users/confirm-password-modal.tsx
"use client";

import { useState } from "react";
import { PendingAction } from "@/lib/user/build-user-actions";

type ConfirmPasswordModalProps = {
  open: boolean;
  submitting: boolean;
  error: string | null;
  pendingActions: PendingAction[];
  reasons: Record<string, string>;
  onReasonChange: (key: string, value: string) => void;
  canConfirm: (password: string) => boolean;
  onConfirm: (password: string) => void;
  onCancel: () => void;
};

export function ConfirmPasswordModal({
  open,
  submitting,
  error,
  pendingActions,
  reasons,
  onReasonChange,
  canConfirm,
  onConfirm,
  onCancel,
}: ConfirmPasswordModalProps) {
  const [password, setPassword] = useState("");

  if (!open) return null;

  const actionsNeedingReason = pendingActions.filter((a) => a.requiresReason);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold">Ação sensível detectada</h2>
        <p className="mt-1 text-sm text-gray-600">
          Informe sua senha e o motivo de cada alteração para continuar.
        </p>

        <div className="mt-4 space-y-3">
          {actionsNeedingReason.map((action) => (
            <div key={action.key}>
              <label className="text-sm font-medium">{action.label}</label>
              <textarea
                value={reasons[action.key] ?? ""}
                onChange={(e) => onReasonChange(action.key, e.target.value)}
                disabled={submitting}
                rows={2}
                className="mt-1 w-full rounded border px-3 py-2 text-sm"
                placeholder="Motivo desta ação"
              />
            </div>
          ))}
        </div>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={submitting}
          className="mt-4 w-full rounded border px-3 py-2"
          placeholder="Sua senha"
        />

        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="rounded px-4 py-2 text-sm text-gray-600"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => onConfirm(password)}
            disabled={submitting || !canConfirm(password)}
            className="rounded bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            {submitting ? "Verificando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}
