"use client";

import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";

import type { Dictionary } from "@/lib/i18n";

type ContactFormProps = {
  copy: Dictionary["contact"]["form"];
};

type Values = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm({ copy }: ContactFormProps) {
  const [values, setValues] = useState<Values>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const setField = (field: keyof Values) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: Errors = {};
    if (!values.name.trim()) nextErrors.name = copy.errors.required;
    if (!values.email.trim()) nextErrors.email = copy.errors.required;
    else if (!EMAIL_RE.test(values.email)) nextErrors.email = copy.errors.email;
    if (!values.message.trim()) nextErrors.message = copy.errors.required;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    // Mock submit — no API yet
    window.setTimeout(() => setStatus("success"), 900);
  };

  if (status === "success") {
    return (
      <div className="flex h-full flex-col items-start justify-center border border-line bg-white p-10 md:p-14">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-brass/15 text-brass">
          <Check size={26} aria-hidden="true" />
        </span>
        <h3 className="display-title mt-8 text-[1.6rem]">{copy.success.title}</h3>
        <p className="mt-4 max-w-sm text-[0.9rem] leading-8 text-stone">{copy.success.body}</p>
        <button
          type="button"
          className="text-link mt-9"
          onClick={() => {
            setValues({ name: "", email: "", subject: "", message: "" });
            setStatus("idle");
          }}
        >
          {copy.success.again}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="border border-line bg-white p-10 md:p-14">
      <h2 className="display-title text-[1.6rem]">{copy.title}</h2>

      <div className="mt-10 grid gap-7 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="contact-name">{copy.name} *</label>
          <input
            id="contact-name"
            className={`field-input ${errors.name ? "field-error" : ""}`}
            placeholder={copy.namePlaceholder}
            value={values.name}
            onChange={setField("name")}
            autoComplete="name"
          />
          {errors.name ? <p className="field-error-text">{errors.name}</p> : null}
        </div>
        <div>
          <label className="field-label" htmlFor="contact-email">{copy.email} *</label>
          <input
            id="contact-email"
            type="email"
            className={`field-input ${errors.email ? "field-error" : ""}`}
            placeholder={copy.emailPlaceholder}
            value={values.email}
            onChange={setField("email")}
            autoComplete="email"
          />
          {errors.email ? <p className="field-error-text">{errors.email}</p> : null}
        </div>
      </div>

      <div className="mt-7">
        <label className="field-label" htmlFor="contact-subject">{copy.subject}</label>
        <input
          id="contact-subject"
          className="field-input"
          placeholder={copy.subjectPlaceholder}
          value={values.subject}
          onChange={setField("subject")}
        />
      </div>

      <div className="mt-7">
        <label className="field-label" htmlFor="contact-message">{copy.message} *</label>
        <textarea
          id="contact-message"
          rows={6}
          className={`field-input resize-y ${errors.message ? "field-error" : ""}`}
          placeholder={copy.messagePlaceholder}
          value={values.message}
          onChange={setField("message")}
        />
        {errors.message ? <p className="field-error-text">{errors.message}</p> : null}
      </div>

      <button type="submit" disabled={status === "sending"} className="btn btn-gold mt-10 w-full disabled:opacity-60 sm:w-auto">
        {status === "sending" ? copy.sending : copy.submit}
        <ArrowRight size={16} aria-hidden="true" />
      </button>
    </form>
  );
}
