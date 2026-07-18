import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { galleryItems } from "@/lib/gallery";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/gallery">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dictionary = await getDictionary(lang);
  return { title: dictionary.nav.gallery };
}

export default async function GalleryPage({ params }: PageProps<"/[lang]/gallery">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dictionary = await getDictionary(lang);
  const { gallery, common } = dictionary;

  return (
    <>
      <PageHero
        compact
        eyebrow={gallery.hero.eyebrow}
        title={gallery.hero.title}
        description={gallery.hero.description}
        image="/ImageBbhomes/ImageRoom/802_BBHotel_09_resize.jpg"
        imageAlt={gallery.hero.eyebrow}
      />

      <section className="bg-ivory py-20 md:py-28">
        <div className="site-container">
          <Reveal>
            <GalleryGrid
              items={galleryItems}
              filters={gallery.filters}
              hint={gallery.hint}
              labels={{ close: common.close, next: common.next, prev: common.prev }}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
