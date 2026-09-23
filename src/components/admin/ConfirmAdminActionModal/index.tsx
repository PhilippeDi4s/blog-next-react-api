"use client";

import { useState } from "react";
import { ModalOverlay } from "@/components/ui/ModalOverlay";
import clsx from "clsx";
import { InputTextArea } from "@/components/ui/InputTextArea";
import { InputPassword } from "@/components/ui/InputPassword";
import { Button } from "@/components/ui/Button";
import { PostHeading } from "@/components/post/PostHeading";
import { AlertCircleIcon } from "lucide-react";
import { PendingAction } from "@/lib/shared/adminAction";
import { InfoMessage } from "@/components/ui/InfoMessage";

type ConfirmAdminActionsModalBaseProps = {
  open: boolean;
  submitting: boolean;

  reasonErrors: Record<string, string>;
  pendingActions: PendingAction[];
  reasons: Record<string, string>;

  onReasonChange: (key: string, value: string) => void;
  onCancel: () => void;
};

type ConfirmAdminActionsWithPasswordProps = {
  needAdminPassword: true;
  passwordError: string | null;
  canConfirm: (password: string) => boolean;
  onConfirm: (password: string) => void;
};

type ConfirmAdminActionsWithoutPasswordProps = {
  needAdminPassword: false;
  onConfirm: () => void;
};

type ConfirmAdminActionsModalProps = ConfirmAdminActionsModalBaseProps &
  (
    | ConfirmAdminActionsWithPasswordProps
    | ConfirmAdminActionsWithoutPasswordProps
  );

export function ConfirmAdminActionModal(props: ConfirmAdminActionsModalProps) {
  const [password, setPassword] = useState("");

  if (!props.open) return null;

  return (
    <ModalOverlay onClose={props.onCancel}>
      <div
        className={clsx(
          "fixed",
          "top-1/2",
          "left-1/2",
          "-translate-x-1/2",
          "-translate-y-1/2",
          "bg-gray-900",
          "rounded-2xl",
          "w-[90%]",
          "md:w-[75%]",
          "lg:w-[60%]",
          "flex",
          "flex-col",
          "gap-5",
          "p-4",
          "md:p-10",
        )}
      >
        <PostHeading as="h2" className="text-center">
          Ação sensível detectada
        </PostHeading>

        <InfoMessage>
          {props.needAdminPassword
            ? "Informe sua senha e o motivo de cada alteração para continuar."
            : "Informe o motivo de cada alteração para continuar."}
        </InfoMessage>

        {props.pendingActions.map((action) => (
          <InputTextArea
            key={action.key}
            labelText={action.label}
            value={props.reasons[action.key]}
            onChange={(e) => props.onReasonChange(action.key, e.target.value)}
            disabled={props.submitting}
            error={props.reasonErrors[action.key] ?? ""}
          />
        ))}

        {props.needAdminPassword && (
          <InputPassword
            labelText="Digite sua senha"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={props.submitting}
            error={props.passwordError ?? ""}
          />
        )}

        <div className="flex items-center justify-center gap-5 flex-wrap">
          <Button
            variant="danger"
            type="button"
            onClick={() => {
              if (props.needAdminPassword) {
                props.onConfirm(password);
              } else {
                props.onConfirm();
              }
            }}
            disabled={
              props.submitting ||
              (props.needAdminPassword && !props.canConfirm(password))
            }
          >
            {props.submitting ? "Verificando..." : "Confirmar"}
          </Button>

          <Button
            variant="default"
            type="button"
            onClick={props.onCancel}
            disabled={props.submitting}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </ModalOverlay>
  );
}
