"use client";

import Image from "next/image";
import { useState } from "react";

import { Lightbox } from "@/components/gallery/lightbox";

type RoomGalleryProps = {
  images: { src: string; alt: string }[];
  labels: { close: string; next: string; prev: string };
};

export function RoomGallery({ images, labels }: RoomGalleryProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setOpen(index)}
            className={`img-zoom relative shrink-0 snap-start overflow-hidden ${
              index % 3 === 0 ? "aspect-[4/3] w-[min(78vw,560px)]" : "aspect-[3/4] w-[min(58vw,340px)]"
            }`}
          >
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 767px) 78vw, 560px" />
          </button>
        ))}
      </div>

      {open !== null ? (
        <Lightbox images={images} index={open} labels={labels} onClose={() => setOpen(null)} onNavigate={setOpen} />
      ) : null}
    </>
  );
}
