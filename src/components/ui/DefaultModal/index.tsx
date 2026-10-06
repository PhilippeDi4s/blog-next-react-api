"use client";

import clsx from "clsx";
import { FocusTrap } from "focus-trap-react";
import { ModalOverlay } from "../ModalOverlay";

type DefaultModalProps = {
  modalTitle?: React.ReactNode;
  modalQuestion: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export function DefaultModal({
  modalTitle,
  modalQuestion,
  children,
  isOpen,
  onClose,
}: DefaultModalProps) {
  if (!isOpen) return;
  return (
    <ModalOverlay onClose={onClose}>
      <div
        className={clsx(
          "p-6",
          "mt-8",
          "rounded-2xl",
          "max-w-4xl",
          "h-[70vh]",
          "md:h-[50vh]",
          "mx-auto",
          "bg-slate-200",
          "dark:bg-slate-800",
          "dark:text-slate-300",
          "flex",
          "flex-col",
          "items-center",
          "justify-center",
          "gap-6",
          "text-center",
          "shadow-xl/20",
        )}
        onClick={(e) => e.stopPropagation()}
      >
          <h3 className="font-bold text-xl">{modalTitle}</h3>
          <p>{modalQuestion}</p>
        <div className="mt-9 flex items-center justify-center gap-6 text-slate-100 flex-wrap">
          {children}
        </div>
      </div>
    </ModalOverlay>
  );
}
