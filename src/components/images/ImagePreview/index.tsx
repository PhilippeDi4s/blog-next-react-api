import { ModalOverlay } from "@/components/ui/ModalOverlay";
import Image from "next/image";

type ImagePreviewProps = {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
};

export function ImagePreview({ imageSrc, isOpen, onClose }: ImagePreviewProps) {
    if(!isOpen) return;
  return (
    <ModalOverlay onClose={onClose}>
      <div className="relative w-[60%] h-[80vh] mx-auto">
        <Image
          alt=""
          src={imageSrc}
          fill
          className="rounded-xl object-cover object-top"
        />
      </div>
    </ModalOverlay>
  );
}
