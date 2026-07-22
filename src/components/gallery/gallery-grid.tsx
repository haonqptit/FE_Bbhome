"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { Lightbox } from "@/components/gallery/lightbox";
import type { GalleryCategory, GalleryItem } from "@/lib/gallery";

type GalleryGridProps = {
  items: GalleryItem[];
  filters: { all: string; rooms: string; spaces: string; details: string };
  hint: string;
  labels: { close: string; next: string; prev: string };
};

type Filter = "all" | GalleryCategory;

export function GalleryGrid({ items, filters, hint, labels }: GalleryGridProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((item) => item.category === filter)),
    [filter, items],
  );

  const lightboxImages = visible.map((item, index) => ({
    src: item.src,
    alt: `BB Homes — ${filters[item.category]} ${String(index + 1).padStart(2, "0")}`,
  }));

  const filterKeys: Filter[] = ["all", "rooms", "spaces", "details"];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {filterKeys.map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={filter === key}
            onClick={() => {
              setFilter(key);
              setOpen(null);
            }}
            className={`border px-6 py-3 text-[0.7rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
              filter === key
                ? "border-espresso bg-espresso text-ivory"
                : "border-line text-stone hover:border-espresso hover:text-espresso"
            }`}
          >
            {filters[key === "all" ? "all" : key]}
          </button>
        ))}
        <span className="ml-auto hidden text-[0.72rem] tracking-[0.1em] text-stone md:block">{hint}</span>
      </div>

      <div className="masonry mt-12" key={filter}>
        {visible.map((item, index) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setOpen(index)}
            className="img-zoom group relative block w-full overflow-hidden"
          >
            <span className={`relative block w-full ${item.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
              <Image
                src={item.src}
                alt={`BB Homes — ${filters[item.category]}`}
                fill
                sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 31vw"
              />
              <span className="absolute inset-0 bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/25" />
              <span className="absolute bottom-4 left-4 text-[0.6rem] font-medium uppercase tracking-[0.24em] text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {filters[item.category]}
              </span>
            </span>
          </button>
        ))}
      </div>

      {open !== null ? (
        <Lightbox images={lightboxImages} index={open} labels={labels} onClose={() => setOpen(null)} onNavigate={setOpen} />
      ) : null}
    </div>
  );
}
