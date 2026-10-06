"use client";
import { XIcon } from "lucide-react";
import styles from "./styles.module.css";

type ModalOverlayProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export function ModalOverlay({ children, onClose }: ModalOverlayProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <button
        className="mt-2 ml-0 md:mt-5 md:ml-5 bg-mauve-800 p-2 rounded-full cursor-pointer transition hover:scale-105"
        onClick={onClose}
      >
        <XIcon />
      </button>
      <div onClick={(event) => event.stopPropagation()}>{children}</div>
    </div>
  );
}
