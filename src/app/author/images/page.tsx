import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { ImageList } from "@/components/images/ImageList";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Galeria de imagens",
};

export default function imageGallery(){
    return(
      <Suspense fallback={<SpinLoader/>}>
        <ImageList/>
      </Suspense>
    )
}