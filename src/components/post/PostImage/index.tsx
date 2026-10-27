import clsx from "clsx";
import { ImageWithFallback } from "@/components/ui/ImageFallback";

type PostImageProps = {
  src?: string | null;
  alt: string;
  containerClassName?: string;
  imageClassName?: string;
};

export function PostImage({
  src,
  alt,
  containerClassName,
  imageClassName,
}: PostImageProps) {
  return (
    <ImageWithFallback
      alt={alt}
      src={src}
      containerClassName={clsx(
        "relative",
        "w-full",
        "overflow-hidden",
        "rounded-2xl",
        containerClassName,
      )}
      imageClassName={clsx(
        "object-cover",
        "object-center",
        "group-hover:scale-105",
        "transition",
        "duration-500",
        imageClassName,
      )}
    />
  );
}
