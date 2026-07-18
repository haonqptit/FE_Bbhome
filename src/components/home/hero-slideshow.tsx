"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore, type CSSProperties } from "react";

import type { Dictionary, Locale } from "@/lib/i18n";

const SLIDE_DURATION = 6000;

type HeroSlideshowProps = {
  locale: Locale;
  hero: Dictionary["hero"];
  scrollLabel: string;
  slides: { src: string; alt: string }[];
};

function subscribeReducedMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

export function HeroSlideshow({ locale, hero, scrollLabel, slides }: HeroSlideshowProps) {
  const [active, setActive] = useState(0);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(() => {
      setActive((index) => (index + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [reducedMotion, slides.length]);

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-espresso text-ivory" id="top">
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          aria-hidden={index !== active}
          className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${
            index === active ? "hero-slide-active opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,16,9,0.72)_0%,rgba(17,16,9,0.42)_48%,rgba(17,16,9,0.18)_100%),linear-gradient(0deg,rgba(17,16,9,0.55)_0%,transparent_45%)]" />

      <div className="site-container relative z-10 pb-28 pt-40">
        <p className="eyebrow hero-stage text-brass-light" style={{ "--stage-delay": "200ms" } as CSSProperties}>
          {hero.eyebrow}
        </p>
        <h1
          className="display-title hero-stage mt-7 max-w-4xl text-[clamp(2.9rem,7vw,5.6rem)]"
          style={{ "--stage-delay": "420ms" } as CSSProperties}
        >
          {hero.title}
        </h1>
        <p
          className="hero-stage mt-8 max-w-xl text-[clamp(0.95rem,1.1vw,1.05rem)] leading-8 text-ivory/80"
          style={{ "--stage-delay": "700ms" } as CSSProperties}
        >
          {hero.description}
        </p>
        <div
          className="hero-stage mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10"
          style={{ "--stage-delay": "950ms" } as CSSProperties}
        >
          <Link href={`/${locale}/rooms`} className="btn btn-gold">
            {hero.primary}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link href={`/${locale}/about`} className="text-link text-ivory">
            {hero.secondary}
          </Link>
        </div>
      </div>

      {/* Slide indicators with progress */}
      <div
        className="hero-stage absolute bottom-12 left-1/2 z-10 flex w-[min(88vw,1320px)] -translate-x-1/2 items-center gap-3"
        style={{ "--stage-delay": "1200ms" } as CSSProperties}
      >
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Slide ${index + 1}`}
            aria-current={index === active}
            onClick={() => setActive(index)}
            className="group flex h-6 flex-1 max-w-24 items-center"
          >
            <span className="relative h-px w-full overflow-hidden bg-ivory/30">
              {index === active && !reducedMotion ? (
                <span
                  key={`progress-${active}`}
                  className="hero-progress-fill absolute inset-0 bg-brass-light"
                  style={{ "--slide-duration": `${SLIDE_DURATION}ms` } as CSSProperties}
                />
              ) : index === active ? (
                <span className="absolute inset-0 bg-brass-light" />
              ) : null}
            </span>
          </button>
        ))}
        <span className="ml-4 hidden text-[0.62rem] font-medium tracking-[0.24em] text-ivory/60 md:block">
          0{active + 1} / 0{slides.length}
        </span>
        <span className="ml-auto hidden items-center gap-3 text-[0.62rem] font-medium uppercase tracking-[0.24em] text-ivory/60 md:flex">
          {scrollLabel}
          <span className="block h-10 w-px animate-pulse bg-ivory/40" />
        </span>
      </div>
    </section>
  );
}
