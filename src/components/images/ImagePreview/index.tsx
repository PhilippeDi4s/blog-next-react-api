import { ModalOverlay } from "@/components/ui/ModalOverlay";
import { ImageWithFallback } from "@/components/ui/ImageFallback";

type ImagePreviewProps = {
  isOpen: boolean;
  onClose: () => void;
  imageSrc?: string | null;
};

export function ImagePreview({ imageSrc, isOpen, onClose }: ImagePreviewProps) {
  if (!isOpen) return;
  return (
    <ModalOverlay onClose={onClose}>
      <ImageWithFallback
        alt=""
        src={imageSrc}
        containerClassName=" w-[60%] h-[80vh] mx-auto"
        imageClassName="rounded-xl object-cover object-top"
      />
    </ModalOverlay>
  );
}
