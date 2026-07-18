"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect } from "react";

type LightboxProps = {
  images: { src: string; alt: string }[];
  index: number;
  labels: { close: string; next: string; prev: string };
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function Lightbox({ images, index, labels, onClose, onNavigate }: LightboxProps) {
  const count = images.length;

  const goNext = useCallback(() => onNavigate((index + 1) % count), [index, count, onNavigate]);
  const goPrev = useCallback(() => onNavigate((index - 1 + count) % count), [index, count, onNavigate]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [goNext, goPrev, onClose]);

  const image = images[index];
  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-espresso/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label={labels.close}
        onClick={onClose}
        className="absolute right-5 top-5 z-10 grid h-12 w-12 place-items-center text-ivory/80 transition-colors hover:text-brass"
      >
        <X size={26} aria-hidden="true" />
      </button>

      <button
        type="button"
        aria-label={labels.prev}
        onClick={(event) => {
          event.stopPropagation();
          goPrev();
        }}
        className="absolute left-3 z-10 grid h-14 w-14 place-items-center text-ivory/70 transition-colors hover:text-brass md:left-8"
      >
        <ChevronLeft size={32} aria-hidden="true" />
      </button>

      <figure
        className="relative h-[78svh] w-[min(92vw,1240px)]"
        onClick={(event) => event.stopPropagation()}
      >
        <Image key={image.src} src={image.src} alt={image.alt} fill sizes="92vw" className="object-contain" />
      </figure>

      <button
        type="button"
        aria-label={labels.next}
        onClick={(event) => {
          event.stopPropagation();
          goNext();
        }}
        className="absolute right-3 z-10 grid h-14 w-14 place-items-center text-ivory/70 transition-colors hover:text-brass md:right-8"
      >
        <ChevronRight size={32} aria-hidden="true" />
      </button>

      <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[0.72rem] font-medium tracking-[0.3em] text-ivory/60">
        {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
      </span>
    </div>
  );
}
