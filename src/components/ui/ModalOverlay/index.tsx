"use client";
import { XIcon } from "lucide-react";

type ModalOverlayProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export function ModalOverlay({ children, onClose }: ModalOverlayProps) {
  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-black/8 backdrop-blur-sm"
      onClick={onClose}
    >
      <button className="cursor-pointer mr-auto mt-2 md:mt-5" onClick={onClose}>
        <XIcon size={1.3} />
      </button>
      <div onClick={(event) => event.stopPropagation()}>{children}</div>
    </div>
  );
}
