"use client";

import { useState } from "react";
import { ImageUploader } from "@/components/post/ImageUploader";
import { InfiniteImageGallery } from "@/components/images/InfiniteImageGallery";

export function ImageGallerySection() {
  const [galleryKey, setGalleryKey] = useState(0);

  return (
    <>
      <ImageUploader
        showPreview={false}
        onUploaded={() => setGalleryKey((k) => k + 1)}
      />
      <InfiniteImageGallery key={galleryKey} />
    </>
  );
}