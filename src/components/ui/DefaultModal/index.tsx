"use client";

import clsx from "clsx";
import { FocusTrap } from "focus-trap-react";

type DefaultModalProps = {
  modalTitle?: React.ReactNode;
  modalQuestion: React.ReactNode;
  children: React.ReactNode;
  isPending: boolean;
  isOpen: boolean;
  onClose: () => void;
};

export function DefaultModal({
  modalTitle,
  modalQuestion,
  children,
  isPending,
  isOpen,
  onClose,
}: DefaultModalProps) {
  if (!isOpen) return;
  return (
    <div
      className="bg-black/50 backdrop-blur-sm fixed z-50 inset-0 flex items-center justify-center"
      onClick={isPending ? undefined : onClose}
    >
      <FocusTrap
        focusTrapOptions={{
          clickOutsideDeactivates: true,
        }}
      >
        <div
          className={clsx(
            "p-6",
            "rounded-2xl",
            "max-w-2xl",
            "mx-6",
            "bg-slate-200",
            "dark:bg-slate-800",
            "dark:text-slate-300",
            "flex",
            "items-center",
            "flex-col",
            "gap-6",
            "shadow-xl/20",
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {modalTitle}
          {modalQuestion}
          <div className="mt-9 flex items-center justify-center gap-6 text-slate-100 flex-wrap">
            {children}
          </div>
        </div>
      </FocusTrap>
    </div>
  );
}
