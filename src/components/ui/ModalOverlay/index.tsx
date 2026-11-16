"use client";
import { XIcon } from "lucide-react";
import styles from "./styles.module.css";
import { useLockBodyScroll } from "@/lib/shared/hooks/useLockBodyScroll";

type ModalOverlayProps = {
  children: React.ReactNode;
  onClose: () => void;
  isDismissible?: boolean;
};

export function ModalOverlay({
  children,
  isDismissible = true,
  onClose,
}: ModalOverlayProps) {
  useLockBodyScroll();

  function handleCloseModal(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (isDismissible) {
      onClose();
    }
  }

  return (
    <div className={styles.overlay} onClick={(e) => handleCloseModal(e)}>
      <button
        type="button"
        aria-label="Fechar"
        className="mt-2 ml-0 md:mt-5 md:ml-5 bg-mauve-800 p-2 rounded-full cursor-pointer transition hover:scale-105"
        onClick={handleCloseModal}
      >
        <XIcon />
      </button>
      <div className="contents" onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}