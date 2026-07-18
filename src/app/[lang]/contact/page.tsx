import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dictionary = await getDictionary(lang);
  return { title: dictionary.nav.contact };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dictionary = await getDictionary(lang);
  const { contact } = dictionary;

  const infoRows = [
    { icon: MapPin, label: contact.info.addressLabel, value: contact.info.address },
    { icon: Phone, label: contact.info.phoneLabel, value: contact.info.phone, href: `tel:${contact.info.phone.replace(/\s/g, "")}` },
    { icon: Mail, label: contact.info.emailLabel, value: contact.info.email, href: `mailto:${contact.info.email}` },
    { icon: Clock, label: contact.info.hoursLabel, value: contact.info.hours },
  ];

  return (
    <>
      <PageHero
        compact
        eyebrow={contact.hero.eyebrow}
        title={contact.hero.title}
        description={contact.hero.description}
        image="/ImageBbhomes/ImageRoom/Ngoaicanh_BBHotel_02_resize.jpg"
        imageAlt={contact.hero.eyebrow}
      />

      <section className="bg-ivory py-20 md:py-28">
        <div className="site-container grid gap-14 lg:grid-cols-[5fr_7fr] lg:gap-20">
          {/* Info column */}
          <div>
            <Reveal>
              <h2 className="display-title text-[clamp(1.9rem,3.4vw,2.6rem)]">{contact.info.title}</h2>
            </Reveal>
            <div className="mt-10 flex flex-col">
              {infoRows.map((row, index) => (
                <Reveal key={row.label} delay={index * 100}>
                  <div className="flex items-start gap-5 border-b border-line py-6">
                    <row.icon size={18} strokeWidth={1.4} className="mt-1 shrink-0 text-brass" aria-hidden="true" />
                    <div>
                      <p className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-stone">{row.label}</p>
                      {"href" in row && row.href ? (
                        <a href={row.href} className="mt-2 block text-[0.95rem] text-espresso transition-colors hover:text-brass">
                          {row.value}
                        </a>
                      ) : (
                        <p className="mt-2 text-[0.95rem] text-espresso">{row.value}</p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={300}>
              <figure className="img-zoom relative mt-10 aspect-[16/9] overflow-hidden">
                <Image
                  src="/ImageBbhomes/ImageRoom/Ngoaicanh_BBHotel_03_resize.jpg"
                  alt={contact.info.address}
                  fill
                  sizes="(max-width: 1023px) 92vw, 44vw"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-espresso/70 px-5 py-3.5 text-[0.72rem] tracking-[0.08em] text-ivory/85">
                  {contact.info.mapNote}
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* Form column */}
          <Reveal delay={150}>
            <ContactForm copy={contact.form} />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-sand/50 py-20 md:py-28">
        <div className="site-container grid gap-12 lg:grid-cols-[4fr_8fr]">
          <Reveal>
            <h2 className="display-title text-[clamp(1.9rem,3.4vw,2.6rem)]">{contact.faq.title}</h2>
          </Reveal>
          <div>
            {contact.faq.items.map((item, index) => (
              <Reveal key={item.q} delay={index * 110}>
                <details className="group border-b border-line py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-[1.15rem] text-espresso [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span aria-hidden="true" className="text-[1.4rem] font-light text-brass transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-5 max-w-2xl text-[0.9rem] leading-8 text-stone">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
