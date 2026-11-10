import { ImageUploader } from "@/components/user/ImageUploader";
import { InfiniteImageGallery } from "@/components/images/InfiniteImageGallery";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Gallery",
};

export default function ImageGalleryPage() {
  return (
    <>
      <ImageUploader showPreview={false} />
      <InfiniteImageGallery />
    </>
  );
}
