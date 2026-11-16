import { ImageGallerySection } from "@/components/images/ImageGallerySection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeria de imagens",
};

export default function ImageGalleryPage() {
  return <ImageGallerySection />;
}