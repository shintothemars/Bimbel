"use client";

import { Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { programs } from "@/lib/programs";
import {
  contactTopics,
  emptyContactForm,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from "@/lib/contact-form";

type SubmissionState = "idle" | "sending" | "pending" | "error" | "success";

const errorKeys = [
  "name",
  "email",
  "whatsapp",
  "topic",
  "program",
  "message",
  "consent",
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readFieldErrors(value: unknown): ContactFormErrors {
  if (!isRecord(value)) {
    return {};
  }

  const fieldErrors: ContactFormErrors = {};

  for (const key of errorKeys) {
    if (typeof value[key] === "string") {
      fieldErrors[key] = value[key];
    }
  }

  return fieldErrors;
}

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(emptyContactForm);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle");

  function updateField<Key extends keyof ContactFormValues>(
    key: Key,
    value: ContactFormValues[Key],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));

    if (submissionState !== "idle") {
      setSubmissionState("idle");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateContactForm(values);
    setErrors(result.errors);
    setSubmissionState("idle");

    if (Object.keys(result.errors).length > 0) {
      document
        .getElementById(Object.keys(result.errors)[0])
        ?.focus();
      return;
    }

    setSubmissionState("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.values),
      });
      const payload: unknown = await response.json();
      const responseBody = isRecord(payload) ? payload : {};

      if (
        response.status === 503 &&
        responseBody.code === "delivery_not_configured"
      ) {
        setSubmissionState("pending");
        return;
      }

      if (
        response.status === 400 &&
        responseBody.code === "validation_failed" &&
        isRecord(responseBody.errors)
      ) {
        setErrors(readFieldErrors(responseBody.errors));
        setSubmissionState("idle");
        return;
      }

      if (!response.ok || responseBody.code !== "accepted") {
        setSubmissionState("error");
        return;
      }

      setValues(emptyContactForm);
      setErrors({});
      setSubmissionState("success");
    } catch {
      setSubmissionState("error");
    }
  }

  const isSending = submissionState === "sending";

  return (
    <form className="contact-form" noValidate onSubmit={handleSubmit}>
      <div aria-live="polite" className="contact-form__announcements">
        {submissionState === "pending" && (
          <p className="contact-form__notice" role="status">
            Formulir sudah divalidasi, tetapi pesan belum dikirim. Tim belum
            mengaktifkan layanan penerimaan pesan. Silakan hubungi kami setelah
            kanal kontak dikonfigurasi.
          </p>
        )}
        {submissionState === "success" && (
          <p className="contact-form__success" role="status">
            Pesan berhasil diterima oleh layanan kontak.
          </p>
        )}
        {submissionState === "error" && (
          <p className="contact-form__error-banner" role="alert">
            Pesan belum dapat dikirim karena terjadi kendala. Isi formulir tetap
            tersimpan di halaman ini; silakan coba kembali nanti.
          </p>
        )}
      </div>

      <div className="contact-form__grid">
        <div className="contact-field">
          <label htmlFor="name">Nama lengkap</label>
          <input
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-invalid={Boolean(errors.name)}
            autoComplete="name"
            id="name"
            maxLength={100}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Nama kamu"
            required
            value={values.name}
          />
          {errors.name && (
            <p className="contact-field__error" id="name-error">
              {errors.name}
            </p>
          )}
        </div>

        <div className="contact-field">
          <label htmlFor="email">Email</label>
          <input
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
            id="email"
            maxLength={254}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="nama@email.com"
            required
            type="email"
            value={values.email}
          />
          {errors.email && (
            <p className="contact-field__error" id="email-error">
              {errors.email}
            </p>
          )}
        </div>

        <div className="contact-field">
          <label htmlFor="whatsapp">
            Nomor WhatsApp <span>(opsional)</span>
          </label>
          <input
            aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined}
            aria-invalid={Boolean(errors.whatsapp)}
            autoComplete="tel"
            id="whatsapp"
            maxLength={30}
            onChange={(event) => updateField("whatsapp", event.target.value)}
            placeholder="+62 ..."
            type="tel"
            value={values.whatsapp}
          />
          {errors.whatsapp && (
            <p className="contact-field__error" id="whatsapp-error">
              {errors.whatsapp}
            </p>
          )}
        </div>

        <div className="contact-field">
          <label htmlFor="topic">Topik pertanyaan</label>
          <select
            aria-describedby={errors.topic ? "topic-error" : undefined}
            aria-invalid={Boolean(errors.topic)}
            id="topic"
            onChange={(event) => updateField("topic", event.target.value)}
            required
            value={values.topic}
          >
            <option disabled value="">
              Pilih topik
            </option>
            {contactTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
          {errors.topic && (
            <p className="contact-field__error" id="topic-error">
              {errors.topic}
            </p>
          )}
        </div>

        <div className="contact-field contact-field--full">
          <label htmlFor="program">
            Program yang diminati <span>(opsional)</span>
          </label>
          <select
            aria-describedby={errors.program ? "program-error" : undefined}
            aria-invalid={Boolean(errors.program)}
            id="program"
            onChange={(event) => updateField("program", event.target.value)}
            value={values.program}
          >
            <option value="">Belum menentukan program</option>
            {programs.map((program) => (
              <option key={program.id} value={program.slug}>
                {program.name}
              </option>
            ))}
          </select>
          {errors.program && (
            <p className="contact-field__error" id="program-error">
              {errors.program}
            </p>
          )}
        </div>

        <div className="contact-field contact-field--full">
          <label htmlFor="message">Pesan</label>
          <textarea
            aria-describedby={
              errors.message ? "message-error message-hint" : "message-hint"
            }
            aria-invalid={Boolean(errors.message)}
            id="message"
            maxLength={2000}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="Ceritakan pertanyaan atau informasi yang kamu butuhkan."
            required
            rows={5}
            value={values.message}
          />
          <span className="contact-field__hint" id="message-hint">
            10–2.000 karakter.
          </span>
          {errors.message && (
            <p className="contact-field__error" id="message-error">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <div className="contact-honeypot" aria-hidden="true">
        <label htmlFor="website">Jangan isi kolom ini</label>
        <input
          autoComplete="off"
          id="website"
          name="website"
          onChange={(event) => updateField("website", event.target.value)}
          tabIndex={-1}
          value={values.website}
        />
      </div>

      <div className="contact-consent">
        <input
          aria-describedby={errors.consent ? "consent-error" : undefined}
          aria-invalid={Boolean(errors.consent)}
          checked={values.consent}
          id="consent"
          onChange={(event) => updateField("consent", event.target.checked)}
          type="checkbox"
        />
        <label htmlFor="consent">
          Saya setuju informasi ini digunakan untuk menanggapi pertanyaan saya.
          Formulir ini tidak menyimpan atau mengirim data selama layanan
          penerimaan pesan belum dikonfigurasi.
        </label>
      </div>
      {errors.consent && (
        <p className="contact-field__error" id="consent-error">
          {errors.consent}
        </p>
      )}

      <button
        className="contact-form__submit"
        disabled={isSending}
        type="submit"
      >
        <Send size={16} aria-hidden="true" />
        {isSending ? "Memeriksa pesan..." : "Kirim Pesan"}
      </button>
      <p className="contact-form__delivery-note">
        Pesan baru dapat dikirim setelah layanan email atau penerimaan pesan
        dikonfigurasi oleh pengelola.
      </p>
    </form>
  );
}
