import Image from "next/image";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  /** hero height variant */
  compact?: boolean;
};

export function PageHero({ eyebrow, title, description, image, imageAlt, compact }: PageHeroProps) {
  return (
    <section className={`relative flex items-end overflow-hidden bg-espresso text-ivory ${compact ? "min-h-[52svh]" : "min-h-[68svh]"}`}>
      <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,16,9,0.45)_0%,rgba(17,16,9,0.25)_45%,rgba(17,16,9,0.78)_100%)]" />
      <div className="site-container relative z-10 pb-16 pt-44 md:pb-24">
        <p className="eyebrow hero-stage text-brass-light" style={{ "--stage-delay": "100ms" } as React.CSSProperties}>
          {eyebrow}
        </p>
        <h1
          className="display-title hero-stage mt-6 max-w-3xl text-[clamp(2.6rem,6vw,4.8rem)]"
          style={{ "--stage-delay": "280ms" } as React.CSSProperties}
        >
          {title}
        </h1>
        {description ? (
          <p
            className="hero-stage mt-7 max-w-xl text-[0.98rem] leading-8 text-ivory/80"
            style={{ "--stage-delay": "460ms" } as React.CSSProperties}
          >
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
