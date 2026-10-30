"use client";
import { XIcon } from "lucide-react";
import { useEffect } from "react";
import styles from "./styles.module.css";

type ModalOverlayProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export function ModalOverlay({ children, onClose }: ModalOverlayProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);
  return (
    <div
      className={styles.overlay}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClose();
      }}
    >
      <button
        className="mt-2 ml-0 md:mt-5 md:ml-5 bg-mauve-800 p-2 rounded-full cursor-pointer transition hover:scale-105"
        onClick={onClose}
      >
        <XIcon />
      </button>
      <div className="contents" onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
