"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

type ImageWithFallbackProps = {
  containerClassName?: string;
  imageClassName?: string;
  src?: string | null;
  alt: string;
  priority?: boolean;
  intrinsic?: boolean;
  onLoad?: () => void;
};

const FALLBACK_SRC = "/images/fallback.jpg";

export function ImageWithFallback({ src, ...props }: ImageWithFallbackProps) {
  return <ImageWithFallbackSource key={src ?? ""} src={src} {...props} />;
}

function ImageWithFallbackSource({
  containerClassName,
  imageClassName,
  src,
  alt,
  priority,
  intrinsic = false,
  onLoad,
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  const imageSrc = !src || hasError ? FALLBACK_SRC : src;

  return (
    <div className={clsx("relative", containerClassName)}>
      <Image
        src={imageSrc}
        alt={alt ? alt : ""}
        fill
        priority={priority}
        unoptimized={intrinsic}
        className={imageClassName}
        onLoad={onLoad}
        onError={() => {
          if (!hasError) setHasError(true);
        }}
      />
    </div>
  );
}
