"use client";

import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { Dictionary, Locale } from "@/lib/i18n";
import { formatPrice, roomOrder, rooms, type RoomId } from "@/lib/rooms";

type BookingFormProps = {
  locale: Locale;
  copy: Dictionary["booking"]["form"];
  roomNames: Record<RoomId, { name: string; tagline: string }>;
  commonCopy: Pick<Dictionary["common"], "from" | "perNight">;
  preselectedRoom?: RoomId;
};

type Values = {
  checkin: string;
  checkout: string;
  guests: string;
  room: RoomId | "";
  name: string;
  email: string;
  phone: string;
  notes: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function BookingForm({ locale, copy, roomNames, commonCopy, preselectedRoom }: BookingFormProps) {
  const [values, setValues] = useState<Values>({
    checkin: "",
    checkout: "",
    guests: "2",
    room: preselectedRoom ?? "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const setField = (field: keyof Values) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: Errors = {};
    if (!values.checkin) nextErrors.checkin = copy.errors.required;
    if (!values.checkout) nextErrors.checkout = copy.errors.required;
    if (values.checkin && values.checkout && values.checkout <= values.checkin) {
      nextErrors.checkout = copy.errors.dates;
    }
    if (!values.name.trim()) nextErrors.name = copy.errors.required;
    if (!values.email.trim()) nextErrors.email = copy.errors.required;
    else if (!EMAIL_RE.test(values.email)) nextErrors.email = copy.errors.email;
    if (!values.phone.trim()) nextErrors.phone = copy.errors.required;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    // Mock submit — no API yet
    window.setTimeout(() => setStatus("success"), 1100);
  };

  if (status === "success") {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center border border-line bg-white px-8 py-20 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-brass/15 text-brass">
          <Check size={30} aria-hidden="true" />
        </span>
        <h2 className="display-title mt-9 text-[1.8rem]">{copy.success.title}</h2>
        <p className="mt-5 max-w-sm text-[0.92rem] leading-8 text-stone">{copy.success.body}</p>
        <Link href={`/${locale}`} className="btn btn-outline-dark mt-10">
          {copy.success.back}
        </Link>
      </div>
    );
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-16 lg:grid-cols-[7fr_5fr] lg:gap-20">
      <div>
        {/* Stay dates */}
        <fieldset>
          <legend className="display-title text-[1.5rem]">{copy.stayTitle}</legend>
          <div className="mt-8 grid gap-7 sm:grid-cols-3">
            <div>
              <label className="field-label" htmlFor="booking-checkin">{copy.checkin} *</label>
              <input
                id="booking-checkin"
                type="date"
                min={today}
                className={`field-input ${errors.checkin ? "field-error" : ""}`}
                value={values.checkin}
                onChange={setField("checkin")}
              />
              {errors.checkin ? <p className="field-error-text">{errors.checkin}</p> : null}
            </div>
            <div>
              <label className="field-label" htmlFor="booking-checkout">{copy.checkout} *</label>
              <input
                id="booking-checkout"
                type="date"
                min={values.checkin || today}
                className={`field-input ${errors.checkout ? "field-error" : ""}`}
                value={values.checkout}
                onChange={setField("checkout")}
              />
              {errors.checkout ? <p className="field-error-text">{errors.checkout}</p> : null}
            </div>
            <div>
              <label className="field-label" htmlFor="booking-guests">{copy.guests}</label>
              <select id="booking-guests" className="field-input" value={values.guests} onChange={setField("guests")}>
                {["1", "2", "3", "4"].map((count) => (
                  <option key={count} value={count}>
                    {count} {copy.guestsSuffix}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        {/* Contact info */}
        <fieldset className="mt-14">
          <legend className="display-title text-[1.5rem]">{copy.contactTitle}</legend>
          <div className="mt-8 grid gap-7 sm:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="booking-name">{copy.name} *</label>
              <input
                id="booking-name"
                className={`field-input ${errors.name ? "field-error" : ""}`}
                placeholder={copy.namePlaceholder}
                value={values.name}
                onChange={setField("name")}
                autoComplete="name"
              />
              {errors.name ? <p className="field-error-text">{errors.name}</p> : null}
            </div>
            <div>
              <label className="field-label" htmlFor="booking-phone">{copy.phone} *</label>
              <input
                id="booking-phone"
                type="tel"
                className={`field-input ${errors.phone ? "field-error" : ""}`}
                placeholder={copy.phonePlaceholder}
                value={values.phone}
                onChange={setField("phone")}
                autoComplete="tel"
              />
              {errors.phone ? <p className="field-error-text">{errors.phone}</p> : null}
            </div>
          </div>
          <div className="mt-7">
            <label className="field-label" htmlFor="booking-email">{copy.email} *</label>
            <input
              id="booking-email"
              type="email"
              className={`field-input ${errors.email ? "field-error" : ""}`}
              placeholder={copy.emailPlaceholder}
              value={values.email}
              onChange={setField("email")}
              autoComplete="email"
            />
            {errors.email ? <p className="field-error-text">{errors.email}</p> : null}
          </div>
          <div className="mt-7">
            <label className="field-label" htmlFor="booking-notes">{copy.notes}</label>
            <textarea
              id="booking-notes"
              rows={4}
              className="field-input resize-y"
              placeholder={copy.notesPlaceholder}
              value={values.notes}
              onChange={setField("notes")}
            />
          </div>
        </fieldset>

        <button type="submit" disabled={status === "sending"} className="btn btn-gold mt-12 w-full disabled:opacity-60 sm:w-auto">
          {status === "sending" ? copy.sending : copy.submit}
          <ArrowRight size={16} aria-hidden="true" />
        </button>
        <p className="mt-6 max-w-md text-[0.78rem] leading-6 text-stone">{copy.disclaimer}</p>
      </div>

      {/* Room selection */}
      <fieldset>
        <legend className="display-title text-[1.5rem]">{copy.roomTitle}</legend>
        <div className="mt-8 flex flex-col gap-4">
          <label
            className={`flex cursor-pointer items-center gap-5 border p-5 transition-colors duration-300 ${
              values.room === "" ? "border-brass bg-brass/8" : "border-line bg-white hover:border-stone"
            }`}
          >
            <input
              type="radio"
              name="room"
              value=""
              checked={values.room === ""}
              onChange={() => setValues((prev) => ({ ...prev, room: "" }))}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                values.room === "" ? "border-brass" : "border-line"
              }`}
            >
              {values.room === "" ? <span className="h-2.5 w-2.5 rounded-full bg-brass" /> : null}
            </span>
            <span className="text-[0.9rem] text-espresso">{copy.roomAny}</span>
          </label>

          {roomOrder.map((id) => {
            const room = rooms[id];
            const selected = values.room === id;
            return (
              <label
                key={id}
                className={`flex cursor-pointer items-center gap-5 border p-4 transition-colors duration-300 ${
                  selected ? "border-brass bg-brass/8" : "border-line bg-white hover:border-stone"
                }`}
              >
                <input
                  type="radio"
                  name="room"
                  value={id}
                  checked={selected}
                  onChange={() => setValues((prev) => ({ ...prev, room: id }))}
                  className="sr-only"
                />
                <span className="relative h-20 w-24 shrink-0 overflow-hidden">
                  <Image src={room.cover} alt={roomNames[id].name} fill sizes="96px" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.62rem] font-medium uppercase tracking-[0.2em] text-brass">
                    {roomNames[id].tagline}
                  </span>
                  <span className="mt-1 block font-display text-[1.05rem] text-espresso">{roomNames[id].name}</span>
                  <span className="mt-1 block text-[0.78rem] text-stone">
                    {commonCopy.from} {formatPrice(room.priceFrom, locale)}
                    {commonCopy.perNight}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                    selected ? "border-brass" : "border-line"
                  }`}
                >
                  {selected ? <span className="h-2.5 w-2.5 rounded-full bg-brass" /> : null}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
    </form>
  );
}
